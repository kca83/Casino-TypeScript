var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./Game", "./CardPile", "./StandardDeck"], function (require, exports, Game_1, CardPile_1, StandardDeck_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CardGame = (function (_super) {
        __extends(CardGame, _super);
        function CardGame(numStandardDecks) {
            var _this = _super.call(this) || this;
            _this.setOfAllCards = new CardPile_1.CardPile();
            _this.stockPile = new CardPile_1.CardPile();
            _this.discardPile = new CardPile_1.CardPile();
            _this.numStandardDecks = numStandardDecks;
            for (var i = 0; i < numStandardDecks; i++) {
                var deck = new StandardDeck_1.StandardDeck();
                _this.setOfAllCards.addCardsToPile(deck);
            }
            _this.stockPile.addCardsToPile(_this.setOfAllCards);
            _this.stockPile.shuffle();
            return _this;
        }
        CardGame.prototype.shuffleDiscardPileBackToStock = function () {
            this.discardPile.shuffle();
            this.stockPile.addCardsToPile(this.discardPile);
            this.clearDiscardPile();
        };
        CardGame.prototype.clearDiscardPile = function () {
            this.discardPile = new CardPile_1.CardPile();
        };
        CardGame.prototype.getStockPile = function () {
            return this.stockPile;
        };
        CardGame.prototype.drawFromStock = function () {
            var topCard = this.stockPile.getCard(0);
            this.stockPile.removeCard(topCard);
            return topCard;
        };
        CardGame.prototype.discardCards = function (cards) {
            this.discardPile.addCardsToPile(cards);
            cards.clear();
        };
        CardGame.prototype.getDiscardPile = function () {
            return this.discardPile;
        };
        return CardGame;
    }(Game_1.Game));
    exports.CardGame = CardGame;
});
//# sourceMappingURL=CardGame.js.map