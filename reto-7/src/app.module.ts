import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksService } from './books/books.service';
import { Book } from './books/book.class';
import { BooksController } from './books/books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Book]),
    BooksModule
  ],
  controllers: [AppController, BooksController], 
  providers: [AppService, BooksService], 
})
export class AppModule {}