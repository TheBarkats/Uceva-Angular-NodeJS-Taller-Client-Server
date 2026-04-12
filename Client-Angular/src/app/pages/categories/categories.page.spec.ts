import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoriesPage } from './categories.page';
import { CategoriesService } from '../../services/categories/categories.service';
import { of, throwError } from 'rxjs';
import { Category } from '../../interfaces/categories.interface';

describe('CategoriesPage', () => {
  let component: CategoriesPage;
  let fixture: ComponentFixture<CategoriesPage>;
  let categoriesService: CategoriesService;

  const mockCategories: Category[] = [
    {
      id: 1,
      name: 'Ficción',
      description: 'Novelas, cuentos y relatos de ficción general',
      icon: 'book-heart'
    },
    {
      id: 2,
      name: 'No Ficción',
      description: 'Ensayos, biografías y textos informativos',
      icon: 'book-open'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesPage, HttpClientTestingModule],
      providers: [CategoriesService]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesPage);
    component = fixture.componentInstance;
    categoriesService = TestBed.inject(CategoriesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading state', (done) => {
    spyOn(categoriesService, 'getAllCategories').and.returnValue(of(mockCategories));
    
    // Before ngOnInit
    expect(component.state).toBe('init');
    
    component.ngOnInit();
    
    // Service should be called with 10
    expect(categoriesService.getAllCategories).toHaveBeenCalledWith(10);
    
    // After subscribe completes
    setTimeout(() => {
      expect(component.state).toBe('success');
      done();
    }, 0);
  });

  it('should call getAllCategories with count parameter', () => {
    spyOn(categoriesService, 'getAllCategories').and.returnValue(of(mockCategories));
    component.ngOnInit();
    expect(categoriesService.getAllCategories).toHaveBeenCalledWith(10);
  });

  it('should assign categories in next branch of subscribe', (done) => {
    spyOn(categoriesService, 'getAllCategories').and.returnValue(of(mockCategories));
    component.ngOnInit();
    
    setTimeout(() => {
      expect(component.categories.length).toBe(2);
      expect(component.categories[0].name).toBe('Ficción');
      expect(component.state).toBe('success');
      done();
    }, 0);
  });

  it('should handle error in subscribe error branch', (done) => {
    const testError = new Error('API Connection Error');
    spyOn(categoriesService, 'getAllCategories').and.returnValue(
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
