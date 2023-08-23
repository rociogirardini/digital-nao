import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Book } from './book.class';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BooksService', () => {
  let service: BooksService;
  let repository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result: Book[] = [new Book()];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      const books = await service.findAll({});

      expect(books).toBe(result);
    });
  });

  describe('findBook', () => {
    it('should return a book by ID', async () => {
      const bookId = '1';
      const result: Book = new Book();
      jest.spyOn(repository, 'findOne').mockResolvedValue(result);

      const book = await service.findBook(bookId);

      expect(book).toBe(result);
    });
  });

  describe('createBook', () => {
    it('should create a new book', async () => {
      const newBook: Book = new Book();
      jest.spyOn(repository, 'save').mockResolvedValue(newBook);

      const createdBook = await service.createBook(newBook);

      expect(createdBook).toBe(newBook);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book by ID', async () => {
      const bookId = '1';
      const deleteResult = { affected: 1, raw: {} };
      jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);

      const deletionResult = await service.deleteBook(bookId);

      expect(deletionResult).toEqual({});
    });
  });

  describe('updateBook', () => {
    it('should update a book', async () => {
      const bookId = '1';
      const newBook: Book = new Book();
      const toUpdate: Book = new Book();
      const updatedBook: Book = new Book();

      jest.spyOn(repository, 'findOne').mockResolvedValue(toUpdate);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedBook);

      const updated = await service.updateBook(bookId, newBook);

      expect(updated).toBe(updatedBook);
    });
  });
});