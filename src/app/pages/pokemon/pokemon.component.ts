import { Component, OnInit, OnDestroy, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CardComponent } from './card/card.component';
import { Pokemons } from './interfaces/pokemons';
import { PokemonService } from './services/pokemon.service';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-pokemon',
  imports: [CardComponent, PaginacionComponent, SearchComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
  standalone: true
})
export class PokemonComponent implements OnInit, OnDestroy {
  pokemons: Pokemons | undefined;

  constructor(
    private _srvpokemon: PokemonService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Agregar fondo
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(document.body, 'fondo-pokemon');
    }

    // Cargar pokemons
    this._srvpokemon.getpokemons().subscribe((pokemonsAll) => {
      pokemonsAll.results.forEach((pokemon) => {
        this._srvpokemon.getpokemon(pokemon.name).subscribe((pokemonData) => {
          pokemon.data = pokemonData;
          this._srvpokemon.nextURL = pokemonsAll.next;
          this._srvpokemon.previousURL = pokemonsAll.previous;
        });
      });
      this.pokemons = pokemonsAll;
    });
  }

  ngOnDestroy(): void {
    // Quitar fondo al salir del componente
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.removeClass(document.body, 'fondo-pokemon');
    }
  }

  setNewPokemon(pokemonsNews: Pokemons): void {
    this.pokemons = pokemonsNews;
  }

  searchPokemon(termino: string): void {
    if (termino) {
      this._srvpokemon.getpokemon(termino).subscribe((pokemon) => {
        this.pokemons = {
          count: 1,
          next: '',
          previous: null,
          results: [
            {
              name: pokemon.name,
              url: '',
              data: pokemon
            }
          ]
        };
        this._srvpokemon.nextURL = null;
        this._srvpokemon.previousURL = null;
      });
    } else {
      this.ngOnInit();
    }
  }
}
