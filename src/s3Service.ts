import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  // constructor(private readonly configService: ConfigService) {
  //   this.s3Client = new AWS.S3({
  //     accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
  //     secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
  //     region:
  //   });
  //   this.bucketName = configSconfigService.get('AWS_REGION'),
  //   ervice.get('AWS_S3_BUCKET_NAME');
  // }

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = configService.get('AWS_S3_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `book-images/${uuidv4()}-${file.originalname}`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    const result = await this.s3Client.send(command);
    return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }
}
