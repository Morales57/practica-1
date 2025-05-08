import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavegaComponent } from './componestes/navega/navega.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavegaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practica-1';
}
