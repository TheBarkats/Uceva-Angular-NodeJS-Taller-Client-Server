import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      imports: [CategoriesPage],
      providers: [CategoriesService]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesPage);
    component = fixture.componentInstance;
    categoriesService = TestBed.inject(CategoriesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', (done) => {
    spyOn(categoriesService, 'getAllCategories').and.returnValue(of(mockCategories));

    component.ngOnInit();

    expect(component.state).toBe('success');
    expect(component.categories.length).toBe(2);
    expect(component.categories[0].name).toBe('Ficción');
    done();
  });

  it('should handle error when loading categories', (done) => {
    spyOn(categoriesService, 'getAllCategories').and.returnValue(
      throwError(() => new Error('API Error'))
    );

    component.ngOnInit();

    setTimeout(() => {
      expect(component.state).toBe('error');
      done();
    }, 100);
  });
});
