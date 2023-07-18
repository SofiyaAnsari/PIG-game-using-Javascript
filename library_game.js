"use strict";
const game = {
    player1: new Pig(),  
    player2: new Pig(), 
    currentPlayer: null, 
    get isValid() {
        if ( this.player1.name === "" || this.player2.name === "" ) {
            return false;
        } else { 
            return true; 
        }
    },
	start(name1, name2) {
        this.player1.name = name1;
        this.player2.name = name2;
        this.currentPlayer = this.player1;
        return this;
    },
    reset() {
        // call the reset() method on each of the player Pig objects
        this.player1.reset();
		this.player2.reset();
		this.currentPlayer = null; 
    },
    changePlayer() {
        //switching between two players
        this.currentPlayer =
        this.currentPlayer === this.player1 ? this.player2 : this.player1;

    },
    hold( score1, score2 ) {
        // call the hold() method of the current player
        this.currentPlayer.hold();

        
        // determining whether player1 or player2 is the current player, then
        // updating that player's score with the current total
        if (this.currentPlayer === this.player1) {
			// Updates the UI element for player1's score.
			score1.val(this.player1.total);
		} else {
			// Updates the UI element for player2's score.
			score2.val(this.player2.total);
		}
    },
    checkWinner() {
        // checking the players' totals to see if either is at or above 100
        // points. If so, returning that player's name. Otherwise, returning 
        // the string "none".
        if (this.player1.total >= 100) {
			return this.player1.name;
		} else if (this.player2.total >= 100) {
			return this.player2.name;
		} else {
			return "none";
		}
    }
};