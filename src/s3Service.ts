import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3: S3;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      region: configService.get('AWS_REGION'),
    });
    // this.bucketName = "college-library-management";
    this.bucketName = configService.get('AWS_S3_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `book-images/${uuidv4()}-${file.originalname}`; // Upload to the book-images folder

    const uploadResult = await this.s3
      .upload({
        Bucket: this.bucketName,
        Body: file.buffer,
        Key: key,
        ContentType: file.mimetype,
        ACL: 'public-read',  // This makes the file publicly accessible

      })
      .promise();

    return uploadResult.Location; // Returns the S3 file URL
  }
}
