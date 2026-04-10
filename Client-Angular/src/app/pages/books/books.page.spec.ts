import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksPage } from './books.page';
import { BooksService } from '../../services/books/books.service';
import { of, throwError } from 'rxjs';
import { Book } from '../../interfaces/books.interface';

describe('BooksPage', () => {
  let component: BooksPage;
  let fixture: ComponentFixture<BooksPage>;
  let booksService: BooksService;

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
      imports: [BooksPage],
      providers: [BooksService]
    }).compileComponents();

    fixture = TestBed.createComponent(BooksPage);
    component = fixture.componentInstance;
    booksService = TestBed.inject(BooksService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load books on init', (done) => {
    spyOn(booksService, 'getAllBooks').and.returnValue(of(mockBooks));

    component.ngOnInit();

    expect(component.state).toBe('success');
    expect(component.books.length).toBe(2);
    expect(component.books[0].title).toBe('Cien años de soledad');
    done();
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
});
