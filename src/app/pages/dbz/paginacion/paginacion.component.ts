import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { DbzService } from '../services/dbz.service';
import { DB } from '../interfaces/db';

@Component({
  selector: 'dbz-paginacion',
  standalone: true,
  imports: [NgClass,CommonModule],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
  @Output() public eventNewdbz = new EventEmitter<DB>();
  public loading: boolean = false; // Para mostrar "Cargando..."

  constructor(public _srvDB: DbzService) {}

  nextPage() {
    if (!this.isLastPage) {
      this.loading = true;
      this._srvDB.nextPage().subscribe((dbzAll) => {
        this.loading = false;
        this.eventNewdbz.emit(dbzAll);
      });
    }
  }

  previousPage() {
    if (!this.isFirstPage) {
      this.loading = true;
      this._srvDB.previousPage().subscribe((dbzAll) => {
        this.loading = false;
        this.eventNewdbz.emit(dbzAll);
      });
    }
  }

  get isFirstPage(): boolean {
    return this._srvDB.currentPage <= 1;
  }

  get isLastPage(): boolean {
    return this._srvDB.currentPage >= this._srvDB.totalPages;
  }
}
