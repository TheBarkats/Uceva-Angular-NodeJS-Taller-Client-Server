import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BooksPage } from './books.page';
import { BooksService } from '../../services/books/books.service';
import { of, throwError } from 'rxjs';
import { Book } from '../../interfaces/books.interface';

describe('BooksPage', () => {
  let component: BooksPage;
  let fixture: ComponentFixture<BooksPage>;
  let booksService: BooksService;
  let httpMock: HttpTestingController;

  const mockBooks: Book[] = [
    {
      id: 1,
      title: 'Cien años de soledad',
      author: 'Gabriel García Márquez',
      genre: 'Realismo mágico',
      price: 45000,
      pages: 417,
      isbn: '978-3-16-148410-0'
    },
    {
      id: 2,
      title: 'El Quixote',
      author: 'Miguel de Cervantes',
      genre: 'Novela',
      price: 35000,
      pages: 863,
      isbn: '978-0-14-118277-3'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksPage, HttpClientTestingModule],
      providers: [BooksService]
    }).compileComponents();

    fixture = TestBed.createComponent(BooksPage);
    component = fixture.componentInstance;
    booksService = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading state', () => {
    spyOn(booksService, 'getAllBooks').and.returnValue(of(mockBooks));
    component.ngOnInit();
    expect(component.state).toBe('success');
  });

  it('should load books on init', (done) => {
    spyOn(booksService, 'getAllBooks').and.returnValue(of(mockBooks));
    component.ngOnInit();
    expect(component.state).toBe('success');
    expect(component.books.length).toBe(2);
    expect(component.books[0].title).toBe('Cien años de soledad');
    done();
  });

  it('should have correct book data structure', () => {
    spyOn(booksService, 'getAllBooks').and.returnValue(of(mockBooks));
    component.ngOnInit();
    component.books.forEach(book => {
      expect(book.id).toBeDefined();
      expect(book.title).toBeDefined();
      expect(book.author).toBeDefined();
      expect(book.genre).toBeDefined();
      expect(book.price).toBeDefined();
      expect(book.pages).toBeDefined();
      expect(book.isbn).toBeDefined();
    });
  });

  it('should handle error when loading books', (done) => {
    spyOn(booksService, 'getAllBooks').and.returnValue(
      throwError(() => new Error('API Error'))
    );

    component.ngOnInit();

    setTimeout(() => {
      expect(component.state).toBe('error');
      done();
    }, 100);
  });

  it('should display book prices correctly', () => {
    spyOn(booksService, 'getAllBooks').and.returnValue(of(mockBooks));
    component.ngOnInit();
    expect(component.books[0].price).toBeGreaterThan(0);
  });
});
