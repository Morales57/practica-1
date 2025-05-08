import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { DbzComponent } from './pages/dbz/dbz.component';
import { error } from 'console';
import { ErrorComponent } from './pages/error/error.component'
import { LibroComponent } from './pages/libro/libro.component';

export const routes: Routes = [
    { path: '', redirectTo: "home", pathMatch: "full"},
    { path: "home", component: HomeComponent},
    { path: "pokemon", component: PokemonComponent},
    { path: "dbz", component: DbzComponent},
    { path: 'miapi', loadChildren: () => import("./pages/miapi/miapi-routing.module").then(m => m.MiapiRoutingModule)},
    { path: "libro",component:LibroComponent},
    { path: "**", component: ErrorComponent}


];
