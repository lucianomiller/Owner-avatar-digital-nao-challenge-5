import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookDto } from './book.dto';

describe('BooksService', () => {
  let service: BooksService;

  const mockBooksService = {
    createBook: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((book) => Promise.resolve({ id: 1, ...book })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBooksService,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    const bookDto: BookDto = {
      title: 'Test Book',
      description: 'Test Description',
      author: 'Test Author',
      genre: 'Test Genre',
      pages: 100,
      publisher: 'Test Publisher',
      image_url: 'Test Image URL',
    };
    expect(await service.createBook(bookDto)).toEqual({
      id: 1,
      ...bookDto,
    });
  });
});
