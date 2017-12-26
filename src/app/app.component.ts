import { Component } from '@angular/core';
import { Game, Field } from './game/game';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hus (Mancala, Kalaha)</h1>
    <table>
      <tr>
        <th rowspan="2" class="rotate"><div>Player 1</div></th>
        <td class="field"><field [field]="game.boardPlayer1.fields[8]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer1.fields[9]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer1.fields[10]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer1.fields[11]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer1.fields[12]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer1.fields[13]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer1.fields[14]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer1.fields[15]" [game]="that"></field></td>
      </tr>
      <tr>
        <td class="field"><field [field]="game.boardPlayer1.fields[7]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer1.fields[6]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer1.fields[5]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer1.fields[4]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer1.fields[3]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer1.fields[2]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer1.fields[1]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer1.fields[0]" [game]="that"></field></td>
      </tr>
      <tr><td colspan="9" style="background-color: #333;"></td></tr>
      <tr>
        <th rowspan="2" class="rotate"><div>Player 2</div></th>
        <td class="field"><field [field]="game.boardPlayer2.fields[0]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer2.fields[1]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer2.fields[2]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer2.fields[3]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer2.fields[4]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer2.fields[5]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer2.fields[6]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer2.fields[7]" [game]="that"></field></td>
      </tr>
      <tr>
        <td class="field"><field [field]="game.boardPlayer2.fields[15]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer2.fields[14]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer2.fields[13]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer2.fields[12]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer2.fields[11]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer2.fields[10]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer2.fields[9]" [game]="that"></field></td>
        <td class="field"><field [field]="game.boardPlayer2.fields[8]" [game]="that"></field></td>
      </tr>
  </table>
  <br />
  <button (click)="newGame()">New game</button>
  `,
  styles: []
})
export class AppComponent implements IGameRoot {
  that = this;
  game = new Game(true);

  newGame() {
    this.game = new Game(true);
  }

  makeMove(field: Field) {
    this.game = this.game.makeMove(field);
  }
}

export interface IGameRoot {
  makeMove(field: Field);
}