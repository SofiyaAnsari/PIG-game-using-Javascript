"use strict";
$(document).ready( () => {  
    $("#new_game").click( () => {
        // clear any previous data from the page
        $("#result").text( "" );
        $("#score1").val( "0" );  
        $("#score2").val( "0" );
        $("#die").val( "0" );
        $("#total").val( "0" );
        
        // reset the game object and then start a new game, passing in
        // the players' names
    	game.reset();
		game.start($("#player1").val(), $("#player2").val());
   // if the game object contains valid data...
        if (game.isValid) {
            // display the "turn" div, use the currentPlayer property of 
            // the game object to display the name of the player whose turn
            // it is, and set the focus on the Roll button
            $("#turn").removeClass("hide");
            $("#current").text( game.currentPlayer.name );
            $("#roll").focus();
        } else {
            // hide the "turn" div, notify the user to enter player names, 
            // and set the focus on the Player 1 text box
            $("#turn").addClass("hide");
            alert("Please enter two player names.");
            $("#player1").focus();
        }
    }); // end click()
    
    $("#roll").click( () => {
        // using the currentPlayer property of the game object to take a turn
        game.currentPlayer.takeTurn();
        
        // setting the value of the Die text box to the value of the roll 
        // property of the currentPlayer property
        $("#die").val(game.currentPlayer.roll);
        
        if (game.currentPlayer.isBust) {
			
			$("#total").val("0");
			game.changePlayer();
			$("#current").text(game.currentPlayer.name);
			$("#roll").focus();
		} else {
			
			$("#total").val(game.currentPlayer.turn);
		}
        
        
    }); // end click()
    
    $("#hold").click( () => {
        // using the game object to hold, passing in the Score1 and Score2 elements.
        game.hold($("#score1"), $("#score2"));
        
        
        // If the value of the winner variable is "none", setting the 
        // value of the Die and Total text boxes to zero, using the game object 
        // to change players, using the currentPlayer property of 
        // the game object to display the name of the player whose turn
        // it now is, and setting the focus on the Roll button.  Otherwise, set the 
        // value of the result span element to indicate the name of the winner.
        
        const winner = game.checkWinner();
		if (winner === "none") {
				$("#die").val("0");
			$("#total").val("0");
			game.changePlayer();
			$("#current").text(game.currentPlayer.name);
			$("#roll").focus();
		} else {
				$("#result").text(`Congratulations ${winner}! You win!`);
                $("#turn").addClass("hide");
		}  
    }); // end click()

    // set focus on initial page load
    $("#player1").focus();
}); // end ready()