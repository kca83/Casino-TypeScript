import {Game} from './Game';
import {CardPile} form './CardPile';

export abstract class CardGame<T extends Game<T>> extends Game<T> {

    private numStandardDecks:number;
    private  setOfAllCards = new CardPile();

    private  stockPile = new CardPile();
    private  discardPile = new CardPile();


    constructor( numStandardDecks:number) {
      super();
        this.numStandardDecks = numStandardDecks;
        for(let i = 0; i < numStandardDecks; i++) {
            let deck = new StandardDeck();
            this.setOfAllCards.addCardsToPile(deck);
        }
        this.stockPile.addCardsToPile(this.setOfAllCards);
        this.stockPile.shuffle();
    }

    public shuffleDiscardPileBackToStock() {
        this.discardPile.shuffle();
        this.stockPile.addCardsToPile(this.discardPile);
        this.clearDiscardPile();
    }

    private  clearDiscardPile() {
        this.discardPile=new CardPile();
    }

    public  getStockPile():CardPile {
        return this.stockPile;
    }

    public  drawFromStock():Card {
        let topCard = this.stockPile.shift();
        return topCard;
    }

    public discardCards(cards: CardPile) {
        this.discardPile.addCardsToPile(cards);
        cards.getCards().clear();
    }

    public getDiscardPile():CardPile {
        return this.discardPile;
    }

  }