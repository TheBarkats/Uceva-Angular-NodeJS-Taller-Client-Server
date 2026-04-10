import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorsPage } from './authors.page';
import { AuthorsService } from '../../services/authors/authors.service';
import { of } from 'rxjs';
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
      imports: [AuthorsPage],
      providers: [AuthorsService]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorsPage);
    component = fixture.componentInstance;
    authorsService = TestBed.inject(AuthorsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load authors on init', (done) => {
    spyOn(authorsService, 'getAllAuthors').and.returnValue(of(mockAuthors));

    component.ngOnInit();

    expect(component.state).toBe('success');
    expect(component.authors.length).toBe(2);
    expect(component.authors[0].name).toBe('Gabriel García Márquez');
    done();
  });

  it('should format date correctly', () => {
    const timestamp = 467587200; // Some date
    const formatted = component.formatDate(timestamp);
    expect(formatted).toBeTruthy();
    expect(typeof formatted).toBe('string');
  });
});
