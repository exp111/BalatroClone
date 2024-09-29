import {Component, inject} from '@angular/core';
import {Card} from "../../model/card";
import {GameService} from "../game.service";

@Component({
  selector: 'app-hand',
  standalone: true,
  imports: [],
  templateUrl: './hand.component.html',
  styleUrl: './hand.component.css'
})
export class HandComponent {
  Game = inject(GameService);

  constructor() {
    (window as any).hand = this;
  }

  onCardClicked(card: Card) {
    this.Game.onCardClicked(card);
  }
}
