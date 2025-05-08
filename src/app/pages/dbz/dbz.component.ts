import { Component, OnInit, OnDestroy, ViewChild, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CardComponent } from './card/card.component';
import { DB, Item, Gender, Affiliation, Dbz } from './interfaces/db';
import { DbzService } from './services/dbz.service';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { SearchComponent } from './search/search.component';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-dbz',
  standalone: true,
  imports: [CardComponent, PaginacionComponent, SearchComponent, ModalComponent],
  templateUrl: './dbz.component.html',
  styleUrl: './dbz.component.css'
})
export class DbzComponent implements OnInit, OnDestroy {
  DB: DB | undefined;
  todosLosPersonajes: Item[] = [];

  @ViewChild(ModalComponent) modalComponent!: ModalComponent;

  constructor(
    private _srvDB: DbzService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(document.body, 'fondo-dbz');
    }

    this._srvDB.getCharacters().subscribe((dbzAll) => {
      this.DB = dbzAll;
    });
    this.cargarTodosLosPersonajes();
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.removeClass(document.body, 'fondo-dbz');
    }
  }

  setNewdb(DBNew: DB): void {
    this.DB = DBNew;
  }

  cargarTodosLosPersonajes(): void {
    this.todosLosPersonajes = [];
    const cargarPagina = (pagina: number) => {
      this._srvDB.getCharacters(pagina).subscribe((personajesPage) => {
        this.todosLosPersonajes.push(...personajesPage.items);
        if (pagina < personajesPage.meta.totalPages) {
          cargarPagina(pagina + 1);
        }
      });
    };
    cargarPagina(1);
  }

  searchPersonaje(termino: string): void {
    if (!termino) {
      this.ngOnInit();
      return;
    }

    if (!isNaN(Number(termino))) {
      this._srvDB.getdbz(Number(termino)).subscribe((personajeData) => {
        this.setSingleCharacter(personajeData);
      });
    } else {
      const encontrado = this.todosLosPersonajes.find(p =>
        p.name.toLowerCase().includes(termino.toLowerCase().trim())
      );

      if (encontrado) {
        this._srvDB.getdbz(encontrado.id).subscribe((personajeData) => {
          this.setSingleCharacter(personajeData);
        });
      } else {
        this.DB = {
          previous: null,
          next: null,
          items: [],
          meta: {
            totalItems: 0,
            itemCount: 0,
            itemsPerPage: 0,
            totalPages: 0,
            currentPage: 1
          },
          links: {
            first: '',
            previous: '',
            next: '',
            last: ''
          }
        };
      }
    }
  }

  setSingleCharacter(personajeData: Dbz): void {
    const personajeConvertido: Item = {
      id: personajeData.id,
      name: personajeData.name,
      ki: personajeData.ki,
      maxKi: personajeData.maxKi,
      race: personajeData.race,
      gender: personajeData.gender as Gender,
      description: personajeData.description,
      image: personajeData.image,
      affiliation: personajeData.affiliation as Affiliation,
      deletedAt: personajeData.deletedAt,
      data: personajeData
    };

    this.DB = {
      previous: null,
      next: null,
      items: [personajeConvertido],
      meta: {
        totalItems: 1,
        itemCount: 1,
        itemsPerPage: 1,
        totalPages: 1,
        currentPage: 1
      },
      links: {
        first: '',
        previous: '',
        next: '',
        last: ''
      }
    };
  }

  onCharacterSelected(item: Item): void {
    if (item.data) {
      this.modalComponent.open(item.data);
    } else {
      this._srvDB.getdbz(item.id).subscribe((personajeData) => {
        this.modalComponent.open(personajeData);
      });
    }
  }
  
  
}
