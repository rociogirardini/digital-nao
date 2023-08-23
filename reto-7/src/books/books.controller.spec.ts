import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './book.class';
import { Request } from 'express';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookIdentity } from './book.entity';  // Asegúrate de importar la entidad correctamente
import { BookDto } from './book.dto';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;
  let repository: Repository<BookIdentity>; // Asegúrate de tener la entidad correcta aquí

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(BookIdentity), // Asegúrate de usar la entidad correcta
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<Repository<BookIdentity>>(getRepositoryToken(BookIdentity));
    controller = module.get<BooksController>(BooksController);
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result: Book[] = [new Book()]; 
      
      const mockRequest: Request = {
        query: {},
      } as Request;

      jest.spyOn(service, 'findAll').mockResolvedValue(result); 
      
      const books = await controller.findAll(mockRequest);
      
      expect(books).toBe(result);
    });
  });

  describe('findBook', () => {
    it('should return a book by ID', async () => {
      const bookId = 'someBookId';
      const result: Book = new Book();
      jest.spyOn(service, 'findBook').mockResolvedValue(result);

      const book = await controller.findBook(bookId);

      expect(book).toBe(result);
    });
  });


  describe('createBook', () => {
    it('should create a new book', async () => {
      const newBook: BookDto = {
        title: '',
        genre: '',
        description: '',
        author: '',
        publisher: '',
        pages: 0,
        image_url: ''
      };
      const createdBook: Book = new Book();
      jest.spyOn(service, 'createBook').mockResolvedValue(createdBook);

      const book = await controller.createBook(newBook);

      expect(book).toBe(createdBook);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book by ID', async () => {
      const bookId = 'someBookId';
      const deletedBook: Book = new Book();
      jest.spyOn(service, 'deleteBook').mockResolvedValue(deletedBook);

      const book = await controller.deleteBook(bookId);

      expect(book).toBe(deletedBook);
    });
  });

  describe('updateBook', () => {
    it('should update a book', async () => {
      const bookId = 'someBookId';
      const updatedBook: Book = new Book();
      const newBookData: BookDto = {
        title: '',
        genre: '',
        description: '',
        author: '',
        publisher: '',
        pages: 0,
        image_url: ''
      };
      jest.spyOn(service, 'updateBook').mockResolvedValue(updatedBook);

      const book = await controller.updateBook(bookId, newBookData);

      expect(book).toBe(updatedBook);
    });
  });

});