import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Request } from 'express';
import { BookDto } from './book.dto';
import { Book } from './book.class';
import { BookIdentity } from './book.entity'; 
import { 
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('books') 
@Controller('books')
@UseGuards(AuthGuard('jwt')) 
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de libros' }) 
  @ApiResponse({ 
    status: 201,
    description: 'Lista de libros',
    type: Book, 
  })
  findAll(@Req() request: Request): Promise<Book[]> { 
    return this.booksService.findAll(request.query);
  }
  @Get(':bookId')
  @ApiOperation({ summary: 'Obtener libro por ID' })
  @ApiResponse({
    status: 201,
    description: 'Libro en específico ubicado por ID',
    type: Book,
  })
  findBook(@Param('bookId') bookId: string): Promise<Book> {
    return this.booksService.findBook(bookId);
  }
  @Post()
  @ApiOperation({ summary: 'Agregar nuevo libro' })
  @ApiResponse({
    status: 201,
    description: 'Nuevo libro agregado',
    type: Book,
  })
  createBook(@Body() newBook: BookDto): Promise<Book> { 
    return this.booksService.createBook(newBook);
  }

  @Delete(':bookId')
  @ApiOperation({ summary: 'Eliminar libro por ID' })
  @ApiResponse({
    status: 201,
    description: 'Elimina libro por ID de la lista de libros',
    type: Book,
  })
  deleteBook(@Param('bookId') bookId: string): Promise<Book> {
    return this.booksService.deleteBook(bookId);
  }

  @Put(':bookId')
  @ApiOperation({ summary: 'Modifica un libro' })
  @ApiResponse({
    status: 201,
    description: 'Características del libro modificadas',
    type: Book,
  })
  updateBook(
    @Param('bookId') bookId: string,
    @Body() newBook: BookDto, 
  ): Promise<Book> {
    return this.booksService.updateBook(bookId, newBook);
  }
}
