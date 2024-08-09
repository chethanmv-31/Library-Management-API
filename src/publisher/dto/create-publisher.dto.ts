import { IsNotEmpty } from "class-validator";

export class CreatePublisherDto {
    @IsNotEmpty()
    publisher_name:string
}