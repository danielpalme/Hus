import { Component, Input, OnInit } from '@angular/core';
import { IGameRoot } from '../app.component';
import { Field } from '../game/game';

@Component({
    selector: 'field',
    template: `
    <div>
      <div class="index" title="Field number">{{ field.index + 1 }}</div>
      <div>
        <div class="numberofstones">{{ field.numberOfStones }}</div>
      </div>
      <table class="light" *ngIf="field.moveResult && field.moveResult.numberOfMoves > 0">
        <tr>
          <td title="Fields to win"><img src="assets/th-large.svg" width="12" height="12" /></td>
          <td title="Stones to win"><img src="assets/th.svg" width="12" height="12" /></td>
          <td title="#Moves"><img src="assets/arrows-h.svg" width="12" height="12" /></td>
        </tr>
        <tr>
          <td title="Fields to win" [ngClass]="{ 'maximum': field.moveResult.isMaximumOfWonOpponentFields }">{{ field.moveResult.numberOfWonOpponentFields }}</td>
          <td title="Stones to win" [ngClass]="{ 'maximum': field.moveResult.isMaximumOfWonOpponentStones }">{{ field.moveResult.numberOfWonOpponentStones }}</td>
          <td title="#Moves">{{ field.moveResult.numberOfMoves }}</td>
        </tr>
      </table>
      <div *ngIf="field.moveResult && field.moveResult.numberOfMoves > 0">
        <br />
        <a href="" (click)="makeMove($event)" [ngClass]="{ 'maximum': field.moveResult.isMaximumOfWonOpponentFields }">Move</a>
      </div>
    </div>
  `,
    styles: [],
    standalone: false
})
export class FieldComponent implements OnInit {
  @Input() field!: Field;

  @Input() game!: IGameRoot;

  constructor() { }

  ngOnInit() {
  }

  makeMove(event: Event) {
    event.preventDefault();
    
    this.game.makeMove(this.field);
  }
}
