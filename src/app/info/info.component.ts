import {Component, inject} from '@angular/core';
import {GameService} from "../game.service";

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  Game = inject(GameService);

  constructor() {
    (window as any).info = this;
  }
}
