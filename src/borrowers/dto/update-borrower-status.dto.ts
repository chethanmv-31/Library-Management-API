import { IsEnum } from 'class-validator';
import { BorrowerStatus } from './status.model';

export class UpdateBorrowerStatus {
  @IsEnum(BorrowerStatus)
  status: BorrowerStatus;
}
