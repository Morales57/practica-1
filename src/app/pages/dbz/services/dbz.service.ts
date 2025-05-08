import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DB, Dbz } from '../interfaces/db';

@Injectable({
  providedIn: 'root'
})
export class DbzService {
  private apiURLBase: string = 'https://dragonball-api.com/api/characters';
  public currentPage: number = 1;
  public totalPages: number = 1; // <-- nuevo campo

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<DB> {
    return this.http.get<DB>(`${this.apiURLBase}?page=${page}`).pipe(
      tap((response) => {
        if (response.meta && response.meta.totalPages) {
          this.totalPages = response.meta.totalPages;
        }
      })
    );
  }
  getdbz(termino: string | number): Observable<Dbz> {
    return this.http.get<Dbz>(`${this.apiURLBase}/${termino}`);
  }

  nextPage(): Observable<DB> {
    this.currentPage++;
    return this.getCharacters(this.currentPage);
  }

  previousPage(): Observable<DB> {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    return this.getCharacters(this.currentPage);
  }
}
