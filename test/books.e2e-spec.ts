import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BooksModule } from '../src/books/books.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from '../src/books/book.entity';

describe('BooksController (e2e)', () => {
  let app: INestApplication;
  const mockBooks = [
    {
      id: 1,
      title: 'Test Book',
      description: 'Test Description',
      author: 'Test Author',
      genre: 'Test Genre',
      pages: 100,
      publisher: 'Test Publisher',
      image_url: 'Test Image URL',
    },
  ];

  const mockBooksService = {
    find: jest.fn().mockResolvedValue(mockBooks),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BooksModule],
    })
      .overrideProvider(getRepositoryToken(Book))
      .useValue(mockBooksService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect({ statusCode: 200, message: 'OK', data: mockBooks });
  });
});
