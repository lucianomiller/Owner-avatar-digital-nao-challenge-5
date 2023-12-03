import { Injectable } from '@nestjs/common';
import { BookDto } from './book.dto';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
  ) {}

  async findAll(params): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  async findBook(bookId: number): Promise<Book> {
    return await this.booksRepository.findOne({ where: { id: bookId } });
  }

  createBook(newBook: BookDto): Promise<Book> {
    return this.booksRepository.save(newBook);
  }

  async deleteBook(bookId: string): Promise<any> {
    return await this.booksRepository.delete({ id: parseInt(bookId) });
  }

  async updateBook(bookId: number, newBook: BookDto): Promise<Book> {
    const toUpdate = await this.booksRepository.findOneBy({ id: bookId });

    const updated = Object.assign(toUpdate, newBook);

    return this.booksRepository.save(updated);
  }
}
