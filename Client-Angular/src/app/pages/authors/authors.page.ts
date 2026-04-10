import { Component, inject } from '@angular/core';
import { Author } from '../../interfaces/authors.interface';
import { AuthorsService } from '../../services/authors/authors.service';
import { State } from '../../interfaces/state.interface';
import { AlertComponent } from '../../components/alert/alert.component';
import { CommonModule } from '@angular/common';

/**
 * Componente página de autores.
 *
 * Se utiliza para gestionar y mostrar un listado de autores
 * y permitir operaciones CRUD básicas.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `AuthorsService`
 * para obtener los autores y mostrarlos en una tabla.
 * Forma parte de la capa de presentación de la aplicación.
 */
@Component({
  selector: 'app-authors',
  templateUrl: './authors.page.html',
  styleUrls: ['./authors.page.scss'],
  imports: [CommonModule, AlertComponent],
  standalone: true
})
export class AuthorsPage {
  /**
   * Listado de autores obtenidos desde el servicio.
   * @type {Author[]}
   */
  authors: Author[] = [];

  /**
   * Estado actual del componente.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Servicio para obtener autores.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private authorsService = inject(AuthorsService);

  /**
   * Inicializa el componente y carga los autores.
   * @remarks
   * Se suscribe al método `getAllAuthors()` del servicio y
   * asigna los datos recibidos a la propiedad `authors`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.authorsService.getAllAuthors(10).subscribe({
      next: (authors) => {
        this.authors = authors;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }

  /**
   * Convierte timestamp a fecha legible.
   * @param timestamp Timestamp en segundos
   * @returns Fecha formateada
   */
  formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
