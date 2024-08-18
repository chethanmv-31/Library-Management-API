import { CreateBorrowersDto } from './dto/create-borrowers.dto';
import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Borrowers } from './entities/borrowers.entity';
import { BorrowersRepository } from './borrowers.repository';
import { UpdateBorrowerStatus } from './dto/update-borrower-status.dto';
import { User } from 'src/auth/entities/user.entity';
import { Cron } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { Between, LessThan, MoreThan } from 'typeorm';

@Injectable()
export class BorrowersService {
  private readonly logger = new Logger(BorrowersService.name);

  constructor(
    private readonly borrowersRepository: BorrowersRepository,
    private readonly mailerService: MailerService,
  ) {
    // this.scheduleTaskInThreeMinutes();
  }

  // private scheduleTaskInThreeMinutes() {
  //   const now = new Date();
  //   const delay = 1 * 60 * 1000; // 3 minutes in milliseconds
  //   const executionTime = new Date(now.getTime() + delay);

  //   const timeoutId = setTimeout(() => {
  //     this.handleTask();
  //   }, delay);

  //   this.logger.log(`Task scheduled to run at ${executionTime}`);
  // }

  // private handleTask() {
  //   // Your task logic here
  //   this.logger.log('Task is running!');
  //   this.sendDueDateReminderEmails();

  //   // If you want to reschedule every 3 minutes:
  //   this.scheduleTaskInThreeMinutes();
  // }

  async getAllBorrowers(): Promise<Borrowers[]> {
    return await this.borrowersRepository.getAllBorrowers();
  }

  async createBorrowers(
    createBorrowersDto: CreateBorrowersDto,
    user: User,
  ): Promise<Borrowers> {
    return await this.borrowersRepository.createBorrowers(
      createBorrowersDto,
      user,
    );
  }

  async getBorrowersById(id: number): Promise<Borrowers> {
    const found = await this.borrowersRepository.findOne({
      where: { id: id },
    });

    if (!found) {
      throw new NotFoundException(
        `Borrowers is not found with this id '${id}'`,
      );
    }
    return found;
  }

  async getBorrowDataByUserId(id: string): Promise<Borrowers[]> {
    const found = await this.borrowersRepository.find({
      where: { borrower: { id: id } },
      // relations: ['user'],
    });

    if (!found) {
      throw new NotFoundException(
        `Borrowers is not found with this id '${id}'`,
      );
    }
    return found;
  }

  async deleteBorrowersById(id: number): Promise<string> {
    const result = await this.borrowersRepository.delete({
      id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Borrowers not found with this id "${id}"`);
    }

    return 'Delete success';
  }

  async updateBorrowersById(
    id: number,
    createBorrowersDto: CreateBorrowersDto,
    user: User,
  ): Promise<Borrowers> {
    const borrowers = await this.getBorrowersById(id);
    const { actual_Return_Date, borrowed_From, borrowed_TO } =
      createBorrowersDto;
    borrowers.actual_Return_Date = actual_Return_Date;
    borrowers.borrowed_From = borrowed_From;
    borrowers.borrowed_TO = borrowed_TO;
    this.borrowersRepository.save(borrowers);
    return borrowers;
  }

  async updateBorrowerStatus(
    id: number,
    borrowerStatus: UpdateBorrowerStatus,
    user: User,
  ): Promise<Borrowers> {
    const borrowers = await this.getBorrowersById(id);
    const { status } = borrowerStatus;
    borrowers.status = status;
    borrowers.issued_by = user;
    this.borrowersRepository.save(borrowers);
    return borrowers;
  }

  async updateOverdueFines() {
    const borrowers = await this.borrowersRepository.find({
      where: { actual_Return_Date: null },
    });

    borrowers.forEach(async (borrower) => {
      const today = new Date();
      const dueDate = new Date(borrower.actual_Return_Date);

      if (today > dueDate) {
        const daysOverdue = Math.floor(
          (today.getTime() - dueDate.getTime()) / (1000 * 3600 * 24),
        );

        const fine = daysOverdue * this.calculateFinePerDay();
        borrower.days_overdue = daysOverdue;
        borrower.fine = fine;
        await this.borrowersRepository.save(borrower);
      }
    });
  }
  calculateFinePerDay(): number {
    return 10;
  }

  @Cron('0 0 * * *')
  handleCorn() {
    this.updateOverdueFines();
  }

  @Cron('0 8 * * *')
  async sendDueDateReminderEmails() {
    const today = new Date();
    const reminderDate = new Date(today);
    reminderDate.setDate(today.getDate() + 3);
    const startOfDay = new Date(reminderDate.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(reminderDate.setUTCHours(23, 59, 59, 999));

    const borrowers = await this.borrowersRepository.find({
      where: {
        borrowed_TO: Between(startOfDay, endOfDay),
      },
      relations: ['borrower', 'book'],
    });

    borrowers.forEach((borrower) => {
      this.sendReminderEmail(
        borrower.borrower.email,
        borrower.book.title,
        borrower.borrowed_TO,
        borrower.book.image,
      );
    });
  }

  async sendReminderEmail(
    email: string,
    bookTitle: string,
    dueDate: Date,
    imageUrl: string,
  ) {
    const formattedDueDate = dueDate.toDateString();

    await this.mailerService.sendMail({
      to: email,
      subject: 'Book Due Date Reminder',
      html: ` <h1 style="font-size: 24px; color: #333;">Book Due Date Reminder</h1>
              <p style="font-size: 16px; color: #555;">Dear Reader,</p>
               <div style="font-size: 16px; color: #555;">
               <p>This is a reminder that your borrowed book:</p>
               <div style="margin: 20px 0;">
               <p style="font-weight: 800; font-size: 18px; color: #333;">${bookTitle}</p>
               <img src="${imageUrl}" alt="Book Cover" style="max-width: 100%; height: auto;" />
              <p style="font-weight: 800; font-size: 18px; color: #333;">Due Date: ${formattedDueDate}</p>
             </div>
             <p>Please return it on time to avoid any overdue fines.</p>
             </div>`,
    });
  }
}
