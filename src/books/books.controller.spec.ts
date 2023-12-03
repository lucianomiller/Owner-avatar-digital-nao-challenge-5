import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookDto } from './book.dto';

describe('BooksController', () => {
  let controller: BooksController;
  const mockBooksService = {
    createBook: jest.fn((dto: BookDto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
    updateBook: jest.fn((id: number, dto: BookDto) => {
      return {
        id,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(mockBooksService)
      .compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
    const createdBook = await controller.createBook(bookDto);
    expect(createdBook).toEqual({
      id: 1,
      ...bookDto,
    });
    expect(mockBooksService.createBook).toHaveBeenCalledWith(bookDto);
    expect(mockBooksService.createBook).toHaveBeenCalledTimes(1);
    expect(createdBook).toHaveProperty('id');
  });

  it('should update a book', async () => {
    const bookDto: BookDto = {
      title: 'Test Book',
      description: 'Test Description',
      author: 'Test Author',
      genre: 'Test Genre',
      pages: 100,
      publisher: 'Test Publisher',
      image_url: 'Test Image URL',
    };
    const updatedBook = await controller.updateBook(1, bookDto);
    expect(updatedBook).toEqual({
      id: 1,
      ...bookDto,
    });
    expect(mockBooksService.updateBook).toHaveBeenCalledWith(1, bookDto);
    expect(mockBooksService.updateBook).toHaveBeenCalledTimes(1);
    expect(updatedBook).toHaveProperty('id');
  });
});
