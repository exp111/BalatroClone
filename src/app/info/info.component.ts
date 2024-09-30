import {Component, inject} from '@angular/core';
import {GameService} from "../game.service";
import {enumToName} from "../../enumUtils";
import {HandType} from "../../model/hand-info";

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

  GetType() {
    return this.Game.handInfo ? enumToName(HandType, this.Game.handInfo.Type) : "";
  }
  GetBaseScore() {
    return this.Game.handInfo?.Score;
  }
  GetMult() {
    return this.Game.handInfo?.Mult;
  }
}
