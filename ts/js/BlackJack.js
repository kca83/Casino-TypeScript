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
var BlackJack = (function (_super) {
    __extends(BlackJack, _super);
    function BlackJack(numStandardDecks) {
        var _this = _super.call(this, numStandardDecks) || this;
        _this.MIN_NUMBER_OF_PLAYERS = 1;
        _this.MAX_NUMBER_OF_PLAYERS = 7;
        _this.pointValues = { TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, SIX: 6, SEVEN: 7, EIGHT: 8, NINE: 9, TEN: 10, JACK: 10, QUEEN: 10, KING: 10, ACE: 1 };
        _this.dealer = new BlackJackPlayer("Dealer");
        _this.bets = {};
        _this.winners = [];
        _this.push = [];
        return _this;
    }
    ;
    BlackJack.prototype.getPlayers = function () {
        return this.players;
    };
    BlackJack.prototype.getDealer = function () {
        return this.dealer;
    };
    BlackJack.prototype.dealInitialCards = function () {
        for (var i = 0; i < 2; i++) {
            for (var p in this.getPlayers()) {
                var player = this.getPlayers()[p];
                if (this.bets[player] != undefined) {
                    this.dealCardToHand(player);
                }
            }
            this.dealCardToHand(this.dealer);
        }
    };
    BlackJack.prototype.dealCardToHand = function (player) {
        this.shuffleCardsWhenStockIsEmpty();
        this.player.addCardToHand(this.drawFromStock());
    };
    BlackJack.prototype.putCardsInDiscardPile = function () {
        this.discardCards(this.dealer.getHand());
        for (var p in this.getPlayers()) {
            var player = this.getPlayers()[p];
            this.discardCards(player.getHand());
        }
    };
    BlackJack.prototype.shuffleCardsWhenStockIsEmpty = function () {
        if (this.getStockPile().numCards() == 0) {
            this.shuffleDiscardPileBackToStock();
        }
    };
    BlackJack.prototype.calculatePlayerScore = function (player) {
        var score = 0;
        for (var c in player.getHand().getCards()) {
            var card = player.getHand().getCards()[c];
            score += this.pointValues[card.getFaceValue()];
        }
        if (player.hasAceInHand() && score <= 11) {
            score += 10;
        }
        return score;
    };
    BlackJack.prototype.playerHasBust = function (player) {
        if (this.calculatePlayerScore(player) > 21) {
            return true;
        }
        else {
            return false;
        }
    };
    BlackJack.prototype.determineWinners = function () {
        if (this.playerHasBust(this.dealer)) {
            for (var p in this.getPlayers()) {
                var player = this.getPlayers()[p];
                if (this.bets[player] != undefined) {
                    if (!this.playerHasBust(player)) {
                        this.winners.push(player);
                    }
                }
            }
        }
        else {
            for (var p in this.getPlayers()) {
                var player = this.getPlayers()[p];
                if (this.bets[player] != undefined) {
                    if (!this.playerHasBust(player) && this.calculatePlayerScore(player) > this.calculatePlayerScore(this.dealer)) {
                        this.winners.push(player);
                    }
                    else if (this.calculatePlayerScore(player) == (this.calculatePlayerScore(this.dealer))) {
                        this.winners.push(player);
                    }
                }
            }
        }
    };
    BlackJack.prototype.takeBet = function (player, amount, index) {
        if (this.bets[player] == undefined)
            this.bets[player] = amount;
        else
            this.bets[player] += amount;
        player.bet(amount);
    };
    BlackJack.prototype.payOutBets = function () {
        for (var player in this.winners) {
            var amountWon = this.bets[player] * 2;
            this.winners[player].receiveWinnings(amountWon);
        }
        for (var player in this.push) {
            var amountWon = this.bets[this.push[player]];
            this.push[player].receiveWinnings(amountWon);
        }
        this.clearAllBets();
    };
    BlackJack.prototype.clearAllBets = function () {
        this.bets = {};
        this.winners = [];
        this.push = [];
    };
    BlackJack.prototype.getBets = function () {
        return this.bets;
    };
    BlackJack.prototype.getWinners = function () {
        return this.winners;
    };
    BlackJack.prototype.getPush = function () {
        return this.push;
    };
    return BlackJack;
}(CardGame));
//# sourceMappingURL=BlackJack.js.map