import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BooksService } from './books.service';
import { Book } from '../../interfaces/books.interface';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  const mockBook: Book = {
    id: 1,
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    genre: 'Realismo mágico',
    price: 45000,
    pages: 417,
    isbn: '978-3-16-148410-0'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService]
    });

    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all books', () => {
    const mockBooks: Book[] = [mockBook];

    service.getAllBooks(1).subscribe(books => {
      expect(books.length).toBe(1);
      expect(books[0].title).toBe('Cien años de soledad');
    });

    const req = httpMock.expectOne('api/books/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);
  });

  it('should fetch a book by ID', () => {
    service.getBookById(1).subscribe(book => {
      expect(book.id).toBe(1);
      expect(book.title).toBe('Cien años de soledad');
    });

    const req = httpMock.expectOne('api/books/detail/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockBook);
  });

  it('should create a book', () => {
    service.createBook(mockBook).subscribe(book => {
      expect(book.id).toBe(1);
      expect(book.title).toBe('Cien años de soledad');
    });

    const req = httpMock.expectOne('api/books');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockBook);
    req.flush(mockBook);
  });

  it('should update a book', () => {
    const updatedBook: Partial<Book> = { title: 'Nuevo Título' };

    service.updateBook(1, updatedBook).subscribe(book => {
      expect(book.id).toBe(1);
    });

    const req = httpMock.expectOne('api/books/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedBook);
    req.flush({ ...mockBook, ...updatedBook });
  });

  it('should delete a book', () => {
    service.deleteBook(1).subscribe(book => {
      expect(book.id).toBe(1);
    });

    const req = httpMock.expectOne('api/books/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockBook);
  });
});
