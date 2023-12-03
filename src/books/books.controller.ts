import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
  Res,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './book.dto';
import { Book } from './book.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

@Controller('books')
@ApiTags('book')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de libros' })
  @ApiResponse({
    status: 201,
    description: 'Lista de libros',
    type: Book,
  })
  async findAll(@Res() res): Promise<Book[]> {
    const data = await this.booksService.findAll();
    console.log('data', data);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: data,
    });
  }

  @Get(':bookId')
  @ApiOperation({ summary: 'Obtener un libro por su ID' })
  @ApiResponse({
    status: 200,
    description: 'Libro encontrado',
    type: Book,
  })
  findBook(@Param('bookId') bookId: number): Promise<Book> {
    return this.booksService.findBook(bookId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo libro' })
  @ApiResponse({
    status: 201,
    description: 'Libro creado',
    type: Book,
  })
  createBook(@Body() newBook: BookDto): Promise<Book> {
    return this.booksService.createBook(newBook);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Delete(':bookId')
  @ApiOperation({ summary: 'Eliminar un libro por su ID' })
  @ApiResponse({
    status: 200,
    description: 'Libro eliminado',
    type: Book,
  })
  deleteBook(@Param('bookId') bookId: string): Promise<Book> {
    return this.booksService.deleteBook(bookId);
  }

  @Put(':bookId')
  @ApiOperation({ summary: 'Actualizar un libro por su ID' })
  @ApiResponse({
    status: 200,
    description: 'Libro actualizado',
    type: Book,
  })
  updateBook(
    @Param('bookId') bookId: number,
    @Body() newBook: BookDto,
  ): Promise<Book> {
    return this.booksService.updateBook(bookId, newBook);
  }
}
