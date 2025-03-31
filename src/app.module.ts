import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { BindingModule } from './binding/binding.module';
import { CategoryModule } from './category/category.module';
import { BorrowersModule } from './borrowers/borrowers.module';
import { ShelfModule } from './shelf/shelf.module';
import { WishlistModule } from './whishlist/wishlist.module';
import { PublisherModule } from './publisher/publisher.module';
import { RatingsModule } from './ratings/ratings.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import {SubcategoryModule} from './subcategory/subcategory.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    ConfigModule.forRoot({
      // validationSchema: ConfigValidationSchema,
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      isGlobal: true,
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
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: configService.get('MAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASS'),
          },
        },
      }),
    }),
    BooksModule,
    AuthModule,
    AuthorModule,
    BindingModule,
    CategoryModule,
    BorrowersModule,
    ShelfModule,
    WishlistModule,
    PublisherModule,
    RatingsModule,
    SubcategoryModule,
  ],
})
export class AppModule {}
