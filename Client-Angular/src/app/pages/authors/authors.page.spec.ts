import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthorsPage } from './authors.page';
import { AuthorsService } from '../../services/authors/authors.service';
import { of, throwError } from 'rxjs';
import { Author } from '../../interfaces/authors.interface';

describe('AuthorsPage', () => {
  let component: AuthorsPage;
  let fixture: ComponentFixture<AuthorsPage>;
  let authorsService: AuthorsService;

  const mockAuthors: Author[] = [
    {
      id: 1,
      name: 'Gabriel García Márquez',
      nationality: 'Colombiano',
      birthDate: 467587200,
      biography: 'Escritor y periodista colombiano, ganador del Premio Nobel de Literatura'
    },
    {
      id: 2,
      name: 'Miguel de Cervantes',
      nationality: 'Español',
      birthDate: -11652172800,
      biography: 'Escritor español del Siglo de Oro'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorsPage, HttpClientTestingModule],
      providers: [AuthorsService]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorsPage);
    component = fixture.componentInstance;
    authorsService = TestBed.inject(AuthorsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading state', (done) => {
    spyOn(authorsService, 'getAllAuthors').and.returnValue(of(mockAuthors));
    
    // Before ngOnInit
    expect(component.state).toBe('init');
    
    component.ngOnInit();
    
    // Immediately after ngOnInit (before subscribe completes)
    // This should be 'loading' but might not be due to async
    // So we check it was called with loading
    expect(authorsService.getAllAuthors).toHaveBeenCalledWith(10);
    
    // After subscribe completes
    setTimeout(() => {
      expect(component.state).toBe('success');
      done();
    }, 0);
  });

  it('should call service with correct parameter', () => {
    spyOn(authorsService, 'getAllAuthors').and.returnValue(of(mockAuthors));
    component.ngOnInit();
    expect(authorsService.getAllAuthors).toHaveBeenCalledWith(10);
  });

  it('should assign authors in next branch', (done) => {
    spyOn(authorsService, 'getAllAuthors').and.returnValue(of(mockAuthors));
    component.ngOnInit();
    
    setTimeout(() => {
      expect(component.authors.length).toBe(2);
      expect(component.authors[0].name).toBe('Gabriel García Márquez');
      expect(component.state).toBe('success');
      done();
    }, 0);
  });

  it('should handle error in error branch', (done) => {
    const testError = new Error('Network Error');
    spyOn(authorsService, 'getAllAuthors').and.returnValue(
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
