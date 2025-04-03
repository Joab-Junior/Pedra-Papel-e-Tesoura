import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage {

  victory: number = 0;
  tie: number = 0;
  defeat: number = 0;
  randomNumber: number | undefined;
  visibleVictory: number = this.victory;
  visibleDefeat: number = this.defeat;
  roundWon: number = 0;

  constructor() {

    this.victory = Number(localStorage.getItem('victory')) || 0;
    this.defeat = Number(localStorage.getItem('defeat')) || 0;

  }

  createRandomNumber(): number { return Math.floor(Math.random() * 3) + 1; }

  updateLocalStorage() {

    localStorage.setItem('victory', this.victory.toString());
    localStorage.setItem('defeat', this.defeat.toString());

  }

  play(playerChoice: number): void {

    this.randomNumber = this.createRandomNumber();

    if (this.randomNumber === playerChoice) {

      this.victory++;
      this.defeat++;
      this.tie++;

      setTimeout(() => {

        this.randomNumber = undefined;

      }, 3000);

    } else if (

      (this.randomNumber === 1 && playerChoice === 2) ||
      (this.randomNumber === 2 && playerChoice === 3) ||
      (this.randomNumber === 3 && playerChoice === 1)

    ) {

      this.defeat++;
      this.visibleDefeat++;

      setTimeout(() => {

        this.randomNumber = undefined;

      }, 3000);

    } else {

      this.victory++;
      this.visibleVictory++;
      this.roundWon++;

      setTimeout(() => {

        this.randomNumber = undefined;

      }, 3000);

    }

    this.updateLocalStorage();

  }

  @ViewChild('rounds', { static: false }) show!: ElementRef;

  showRoundWon(): void {

    this.show.nativeElement.innerText = `Rodadas vencidas: ${this.roundWon}`;

    setTimeout(() => {

      this.show.nativeElement.innerText = "";

    }, 3000);

  }

  clearAll():void {

    localStorage.clear();

    this.tie = 0;
    this.visibleVictory = 0;
    this.visibleDefeat = 0;
    this.roundWon = 0;

    this.show.nativeElement.innerText = "Encerrado!";

    setTimeout(() => {

      this.show.nativeElement.innerText = "";

    }, 2000);

  }

}