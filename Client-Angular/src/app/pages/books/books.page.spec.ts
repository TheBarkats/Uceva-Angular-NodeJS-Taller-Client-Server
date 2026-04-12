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

  it('should initialize with loading state', (done) => {
    spyOn(booksService, 'getAllBooks').and.returnValue(of(mockBooks));
    
    // Before ngOnInit
    expect(component.state).toBe('init');
    
    component.ngOnInit();
    
    // Service should be called with 10
    expect(booksService.getAllBooks).toHaveBeenCalledWith(10);
    
    // After subscribe completes
    setTimeout(() => {
      expect(component.state).toBe('success');
      done();
    }, 0);
  });

  it('should call getAllBooks with count parameter', () => {
    spyOn(booksService, 'getAllBooks').and.returnValue(of(mockBooks));
    component.ngOnInit();
    expect(booksService.getAllBooks).toHaveBeenCalledWith(10);
  });

  it('should assign books in next branch of subscribe', (done) => {
    spyOn(booksService, 'getAllBooks').and.returnValue(of(mockBooks));
    component.ngOnInit();
    
    setTimeout(() => {
      expect(component.books.length).toBe(2);
      expect(component.books[0].title).toBe('Cien años de soledad');
      expect(component.state).toBe('success');
      done();
    }, 0);
  });

  it('should handle error in subscribe error branch', (done) => {
    const testError = new Error('Server Error');
    spyOn(booksService, 'getAllBooks').and.returnValue(
      throwError(() => testError)
    );
    spyOn(console, 'error');

    component.ngOnInit();

    setTimeout(() => {
      expect(component.state).toBe('error');
      expect(console.error).toHaveBeenCalledWith(testError);
      done();
    }, 0);
  });
});
