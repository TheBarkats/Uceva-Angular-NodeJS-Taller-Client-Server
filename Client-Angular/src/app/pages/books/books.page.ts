import { Component, inject } from '@angular/core';
import { Book } from '../../interfaces/books.interface';
import { BooksService } from '../../services/books/books.service';
import { State } from '../../interfaces/state.interface';
import { AlertComponent } from '../../components/alert/alert.component';
import { CommonModule } from '@angular/common';

/**
 * Componente página de libros.
 *
 * Se utiliza para gestionar y mostrar un listado de libros
 * y permitir operaciones CRUD básicas.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `BooksService`
 * para obtener los libros y mostrarlos en una tabla.
 * Forma parte de la capa de presentación de la aplicación.
 */
@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
  imports: [CommonModule, AlertComponent],
  standalone: true
})
export class BooksPage {
  /**
   * Listado de libros obtenidos desde el servicio.
   * @type {Book[]}
   */
  books: Book[] = [];

  /**
   * Estado actual del componente.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Servicio para obtener libros.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private booksService = inject(BooksService);

  /**
   * Inicializa el componente y carga los libros.
   * @remarks
   * Se suscribe al método `getAllBooks()` del servicio y
   * asigna los datos recibidos a la propiedad `books`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.booksService.getAllBooks(10).subscribe({
      next: (books) => {
        this.books = books;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }
}
