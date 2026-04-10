import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorsService } from './authors.service';
import { Author } from '../../interfaces/authors.interface';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let httpMock: HttpTestingController;

  const mockAuthor: Author = {
    id: 1,
    name: 'Gabriel García Márquez',
    nationality: 'Colombiano',
    birthDate: 467587200,
    biography: 'Escritor y periodista colombiano'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorsService]
    });

    service = TestBed.inject(AuthorsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all authors', () => {
    const mockAuthors: Author[] = [mockAuthor];

    service.getAllAuthors(1).subscribe(authors => {
      expect(authors.length).toBe(1);
      expect(authors[0].name).toBe('Gabriel García Márquez');
    });

    const req = httpMock.expectOne('api/authors/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockAuthors);
  });

  it('should fetch an author by ID', () => {
    service.getAuthorById(1).subscribe(author => {
      expect(author.id).toBe(1);
      expect(author.name).toBe('Gabriel García Márquez');
    });

    const req = httpMock.expectOne('api/authors/detail/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockAuthor);
  });

  it('should create an author', () => {
    service.createAuthor(mockAuthor).subscribe(author => {
      expect(author.id).toBe(1);
      expect(author.name).toBe('Gabriel García Márquez');
    });

    const req = httpMock.expectOne('api/authors');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockAuthor);
    req.flush(mockAuthor);
  });

  it('should update an author', () => {
    const updatedAuthor: Partial<Author> = { biography: 'Nueva biografía' };

    service.updateAuthor(1, updatedAuthor).subscribe(author => {
      expect(author.id).toBe(1);
    });

    const req = httpMock.expectOne('api/authors/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedAuthor);
    req.flush({ ...mockAuthor, ...updatedAuthor });
  });

  it('should delete an author', () => {
    service.deleteAuthor(1).subscribe(author => {
      expect(author.id).toBe(1);
    });

    const req = httpMock.expectOne('api/authors/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockAuthor);
  });
});
