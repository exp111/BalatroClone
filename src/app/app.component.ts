import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HandComponent} from "./hand/hand.component";
import {InfoComponent} from "./info/info.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HandComponent, InfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Balatro';

  constructor() {
    (window as any).app = this;
  }
}
