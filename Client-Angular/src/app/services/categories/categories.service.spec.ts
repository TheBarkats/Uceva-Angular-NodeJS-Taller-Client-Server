import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoriesService } from './categories.service';
import { Category } from '../../interfaces/categories.interface';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let httpMock: HttpTestingController;

  const mockCategory: Category = {
    id: 1,
    name: 'Ficción',
    description: 'Novelas, cuentos y relatos de ficción general',
    icon: 'book-heart'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriesService]
    });

    service = TestBed.inject(CategoriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all categories', () => {
    const mockCategories: Category[] = [mockCategory];

    service.getAllCategories(1).subscribe(categories => {
      expect(categories.length).toBe(1);
      expect(categories[0].name).toBe('Ficción');
    });

    const req = httpMock.expectOne('api/categories/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should fetch a category by ID', () => {
    service.getCategoryById(1).subscribe(category => {
      expect(category.id).toBe(1);
      expect(category.name).toBe('Ficción');
    });

    const req = httpMock.expectOne('api/categories/detail/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategory);
  });

  it('should create a category', () => {
    service.createCategory(mockCategory).subscribe(category => {
      expect(category.id).toBe(1);
      expect(category.name).toBe('Ficción');
    });

    const req = httpMock.expectOne('api/categories');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCategory);
    req.flush(mockCategory);
  });

  it('should update a category', () => {
    const updatedCategory: Partial<Category> = { description: 'Nueva descripción' };

    service.updateCategory(1, updatedCategory).subscribe(category => {
      expect(category.id).toBe(1);
    });

    const req = httpMock.expectOne('api/categories/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCategory);
    req.flush({ ...mockCategory, ...updatedCategory });
  });

  it('should delete a category', () => {
    service.deleteCategory(1).subscribe(category => {
      expect(category.id).toBe(1);
    });

    const req = httpMock.expectOne('api/categories/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockCategory);
  });
});
