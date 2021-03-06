import {Console} from './Console';
import {BlackJackConsole} from './BlackJackConsole';
import {CrapsConsole} from './CrapsConsole';
import {GoFishConsole} from './GoFishConsole';
import {SlotsConsole} from './SlotsConsole';
import {Utilities} from './Utilities';

export class Casino {

  gameConsoles: Console[];

  constructor() {
    this.gameConsoles = [];
  }

  startCasino() {
    this.gameConsoles.push(new BlackJackConsole());
    this.gameConsoles.push(new CrapsConsole());
    this.gameConsoles.push(new GoFishConsole());
    // this.gameConsoles.push(new SlotsConsole());

    // while(true) {
        this.selectGameToPlay();
    // }
  }

  selectGameToPlay() {
    var gameNames: string[] = [];
    for(let consoleKey in this.gameConsoles) {
      gameNames.push(this.gameConsoles[consoleKey].getNameOfGame());
    }
    Utilities.printMenuName("Select a game to play");
    Utilities.printMenuOptions(gameNames);
    var _this = this;
    Utilities.buttonEle.addEventListener("click", function getChoice() {
      var choice: string = Utilities.userInputEle.value.toUpperCase();
      Utilities.userInputEle.value = "";
      _this.goToGame(choice);
      this.removeEventListener("click", getChoice);
    })
  }

  goToGame(gameName: string) {
    switch (gameName) {
        case "BLACKJACK":
            this.startBlackJack();
            break;
        case "CRAPS":
            this.startCraps();
            break;
        case "GO FISH":
            this.startGoFish();
            break;
        case "SLOTS":
            Utilities.printLine("Coming Soon!");
            break;
    }
  }

  startBlackJack() {
      this.gameConsoles[0].start();
  }

  startCraps() {
      this.gameConsoles[1].start();
  }

  startGoFish() {
      this.gameConsoles[2].start();
  }

  startSlots() {
      this.gameConsoles[3].start();
  }
}
