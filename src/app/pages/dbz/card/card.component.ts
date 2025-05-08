import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { DB, Item } from '../interfaces/db';

@Component({
  selector: 'dbz-card',
  standalone: true,
  imports: [NgIf, NgFor,NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() public dbzAll: DB | undefined;
  @Output() public onCharacterSelected = new EventEmitter<Item>();

  selectCharacter(character: Item): void {
    this.onCharacterSelected.emit(character);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dbzAll']) {
      console.log('dbzAll', this.dbzAll);
    }
  }

  getRaceClass(race: string | undefined): string {
    if (!race) {
      return 'unknown';
    }

    switch (race.toLowerCase()) {
      case 'saiyan':
        return 'saiyan';
      case 'namekian':
        return 'namekian';
      case 'human':
        return 'human';
      default:
        return 'unknown';
    }
  }
  getKiClass(ki: number | string): string {
    const kiValue = Number(ki);
    if (kiValue >= 10000) {
      return 'high-ki';
    } else if (kiValue >= 5000) {
      return 'medium-ki';
    } else {
      return 'low-ki';
    }
  }
  
  
}