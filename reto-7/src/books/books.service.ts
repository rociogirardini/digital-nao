import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { BookDto } from './book.dto';
import { Book } from './book.class';
import { InjectRepository } from '@nestjs/typeorm'; 
import { FindOneOptions, Repository } from 'typeorm'; 

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>, 
  ) {}

  async findAll(params: any): Promise<Book[]> {
    return await this.booksRepository.find();
  }
  async findBook(bookId: string): Promise<Book> {
    return await this.booksRepository.findOne({ where: { id: parseInt(bookId) } })
  }
  createBook(newBook: BookDto): Promise<Book> {
    return this.booksRepository.save(newBook);
  }

  async deleteBook(bookId: string): Promise<any> {
    return await this.booksRepository.delete({ id: parseInt(bookId) });
  }

  async updateBook(bookId: string, newBook: BookDto): Promise<Book> { 
    const options: FindOneOptions<Book> = { where: { id: parseInt(bookId) } };
    let toUpdate = await this.booksRepository.findOne(options); 

    let updated = Object.assign(toUpdate, newBook); 

    return this.booksRepository.save(updated); 
  }
}
