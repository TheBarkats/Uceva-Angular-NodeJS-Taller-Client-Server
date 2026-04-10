import { Component, inject } from '@angular/core';
import { Category } from '../../interfaces/categories.interface';
import { CategoriesService } from '../../services/categories/categories.service';
import { State } from '../../interfaces/state.interface';
import { AlertComponent } from '../../components/alert/alert.component';
import { CommonModule } from '@angular/common';

/**
 * Componente página de categorías.
 *
 * Se utiliza para gestionar y mostrar un listado de categorías
 * de libros y permitir operaciones CRUD básicas.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `CategoriesService`
 * para obtener las categorías y mostrarlas en una tabla.
 * Forma parte de la capa de presentación de la aplicación.
 */
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  imports: [CommonModule, AlertComponent],
  standalone: true
})
export class CategoriesPage {
  /**
   * Listado de categorías obtenido desde el servicio.
   * @type {Category[]}
   */
  categories: Category[] = [];

  /**
   * Estado actual del componente.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Servicio para obtener categorías.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private categoriesService = inject(CategoriesService);

  /**
   * Inicializa el componente y carga las categorías.
   * @remarks
   * Se suscribe al método `getAllCategories()` del servicio y
   * asigna los datos recibidos a la propiedad `categories`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.categoriesService.getAllCategories(10).subscribe({
      next: (categories) => {
        this.categories = categories;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }
}
