import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import { ConfigValidationSchema } from './schema-validation';
import { AuthorModule } from './author/author.module';
import { BindingModule } from './binding/binding.module';
import { CategoryModule } from './category/category.module';

import { BorrowersModule } from './borrowers/borrowers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // validationSchema: ConfigValidationSchema,
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    BooksModule,
    AuthModule,
    AuthorModule,
    BindingModule,
    CategoryModule,
    BorrowersModule,
    // BorrowersModule,
    // BorrowModule,
  ],
})
export class AppModule {}
