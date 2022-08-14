// Declare game mdoes
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards are drawn";
var GAME_RESULTS_SHOWN = "results are shown";
var GAME_HIT_OR_STAND = "hit or stand";
var currentGameMode = GAME_START;

// Declare variable to store player and dealer hands
// We use arrays as each hand will be holding multiple card objects
var playerHand = [];
var dealerHand = [];

// Declare an empty variable to hold deck of cards
var gameDeck = [];

// Win Count
var playerWinCount = 0;
var dealerWinCount = 0;
var tieCount = 0;

/* ================================================== */
/* =========== DECK CREATION FUNCTIONS ============== */
/* ================================================== */

// Function that creates a deck of cards, used by createNewDeck function
var createDeck = function () {
  // deck array
  var deck = [];
  // for 'while loop' to create suits for cards
  var suits = ["Diamonds ♦", "Clubs ♣", "Hearts ♥", "Spades ♠"];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    // 13 ranks... ace to king - rank to define "card positions"
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      // define card value - differentiate from rank: 'ace' = 1 / 11, 'jack' & 'queen' & 'king' = 10
      if (cardName == 1) {
        cardName = "Ace";
        // define ace value as 11 all the way. if handValue > 10, -11 to total value
        // vs. coding a function to redefine the value for ace
      }
      if (cardName == 11) {
        cardName = "Jack";
      }
      if (cardName == 12) {
        cardName = "Queen";
      }
      if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currSuit,
        rank: indexRanks,
      };
      deck.push(card);
      indexRanks = indexRanks + 1;
    }
    indexSuits = indexSuits + 1;
  }
  return deck;
};

// Function that generates a random number, used by shuffle deck function
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// Function that shuffles a deck, used by createNewDeck function
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

// Function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

/* ================================================= */
/* ================ GAME FUNCTIONS ================ */
/* ================================================ */

// Function that checks a hand for black jack
var checkForBlackJack = function (handArray) {
  // Loop through player hand
  // if there is a blackjack return true
  // else return false
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;

  // Possible black jack scenerios
  // First card is Ace +  Second card is 10 or suits
  // Second card is Ace +  First card is 10 or suits
  if (
    (playerCardOne.name == "Ace" && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == "Ace" && playerCardOne.rank >= 10)
  ) {
    isBlackJack = true;
  }

  return isBlackJack;
};

// Function that calculates a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  // Counter to keep track of the number of aces found within the given hand
  var aceCounter = 0;

  // Loop through player or dealers hand and add up the ranks
  var index = 0;
  while (index < handArray.length) {
    var currCard = handArray[index];

    // In blackjack, the value of king, queen, and jack are counted as 10 by default
    if (
      currCard.name == "King" ||
      currCard.name == "Queen" ||
      currCard.name == "Jack"
    ) {
      totalHandValue = totalHandValue + 10;
    }
    // We count the value of ace as 11 by default
    else if (currCard.name == "Ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
      // Else, all other numbered cards are valued by their ranks
    } else {
      totalHandValue = totalHandValue + currCard.rank;
    }
    index = index + 1;
  }

  // Reset index for ace counter
  index = 0;
  // Loop for the number of aces found and only deduct 10 from total hand value
  // when totalHandValue is more than 21.
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }

  return totalHandValue;
};

// Function that displays the player and dealers hand in a message

var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = `Player Hand (Count = ${calculateTotalHandValue(
    playerHand
  )}):<br>`;
  var index = 0;
  if (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "1st Card = " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  if (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "2nd Card = " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  if (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "3rd Card = " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  if (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "4th Card = " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  if (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "5th Card = " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  if (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "6th Card = " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  if (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "7th Card = " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  if (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "8th Card = " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  index = 0;
  var dealerMessage = `Dealer Hand (Count = ${calculateTotalHandValue(
    dealerHand
  )}):<br>`;

  if (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "1st Card = " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  if (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "2nd Card = " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  if (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "3rd Card = " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  if (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "4th Card = " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  if (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "5th Card = " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  if (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "6th Card = " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  if (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "7th Card = " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  if (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "8th Card = " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  return playerMessage + "<br>" + dealerMessage;
};

// Function that displays the total hand values of the player and the dealer in a message
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br>Player total hand value: " +
    playerHandValue +
    "<br>Dealer total hand value: " +
    dealerHandValue;
  return totalHandValueMessage;
};

// Function that resets the game for new game loop
var resetGame = function () {
  playerHand = [];
  dealerHand = [];
  currentGameMode = GAME_START;
};

/* ================================================= */
/* ================= MAIN FUNCTION ================ */
/* ================================================ */

var main = function (input) {
  var outputMessage = "";

  // FIRST CLICK
  if (currentGameMode == GAME_START) {
    // create a deck of cards
    gameDeck = createNewDeck();

    // deal 2 cards to player and dealer
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    // check player and dealer cards
    console.log("Player Hand ==>");
    console.log(playerHand);
    console.log("Dealer Hand ==>");
    console.log(dealerHand);

    // update gameMode
    currentGameMode = GAME_CARDS_DRAWN;

    // reassign output message
    outputMessage = `<img src = "./images/letsplay.jpg"/ class = "center"><br>Everyone has been dealt a card. Click button to calculate cards!`;

    // return message
    return outputMessage;
  }

  // SECOND CLICK
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // check for blackjack
    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    console.log("Does Player have Black Jack? ==>", playerHasBlackJack);
    console.log("Does Dealer have Black Jack? ==>", dealerHasBlackJack);

    // Condition when either player or dealer has black jack
    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      // Condition where both have black jack
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        tieCount = tieCount + 1;
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br><img src = "./images/tiegame.jpg"/ class = "center"><br>Its a Black Jack Tie!<br><br>Player Wins: ${playerWinCount}<br>Dealer Wins: ${dealerWinCount}<br> Tie: ${tieCount} <br><br>Press Submit to Play Again!`;
        resetGame();
      }
      // Condition when only player has black jack
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        playerWinCount = playerWinCount + 1;
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br><img src = "./images/youwin.jpg"/ class = "center"><br>Player Wins by Black Jack!<br><br>Player Wins: ${playerWinCount}<br>Dealer Wins: ${dealerWinCount}<br> Tie: ${tieCount}<br><br>Press Submit to Play Again!`;

        resetGame();
      }
      // Condition when only dealer has black jack
      else {
        dealerWinCount = dealerWinCount + 1;
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br><img src = "./images/youlose.jpg"/ class = "center"><br>Dealer Wins by Black Jack!<br><br>Player Wins: ${playerWinCount}<br>Dealer Wins: ${dealerWinCount}<br> Tie: ${tieCount}<br><br>Press Submit to Play Again!`;

        resetGame();
      }
    }

    // Condition where neither player nor dealer has black jack
    // ask player to input 'hit' or 'stand'
    else {
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        '<br> There are no Black Jacks. <br><br>Please input "h" for hit or "s" for stand.';

      // update gameMode
      currentGameMode = GAME_HIT_OR_STAND;
    }

    // return message
    return outputMessage;
  }

  // THIRD CLICK
  if (currentGameMode == GAME_HIT_OR_STAND) {
    // Condition where player inputs 'hit'
    if (input == "h") {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        '<br> You drew another card. <br>Please input "h" for hit or "s" for stand.';
      // Calculate hands
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      // Dealer wins if player busts
      if (playerHandTotalValue > 21 && dealerHandTotalValue <= 21) {
        dealerWinCount = dealerWinCount + 1;
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br><img src = "./images/youlose.jpg"/ class = "center"><br>Player busted! Dealer wins!` +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          `<br><br>Player Wins: ${playerWinCount}<br>Dealer Wins: ${dealerWinCount}<br>Tie: ${tieCount}
          <br><br>Press Submit to Play Again!`;
        resetGame();
      }
    }
    // Condition where player inputs 'stand'
    else if (input == "s") {
      // Calculate hands
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      // Dealer's hit or stand logic
      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      // Conditions for tied game
      if (
        playerHandTotalValue == dealerHandTotalValue ||
        (playerHandTotalValue > 21 && dealerHandTotalValue > 21)
      ) {
        tieCount = tieCount + 1;
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br><img src = "./images/tiegame.jpg"/ class = "center"><br>Its a Tie!` +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          `<br><br>Player Wins: ${playerWinCount}<br>Dealer Wins: ${dealerWinCount}<br>Tie: ${tieCount}<br><br>Press Submit to Play Again!`;
      }

      // Conditions for player win
      else if (
        playerHandTotalValue > dealerHandTotalValue &&
        playerHandTotalValue <= 21
      ) {
        playerWinCount = playerWinCount + 1;
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br><img src = "./images/youwin.jpg"/ class = "center"><br>Player wins!` +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          `<br><br>Player Wins: ${playerWinCount}<br>Dealer Wins: ${dealerWinCount}<br>Tie: ${tieCount}<br><br>Press Submit to Play Again!`;
      } else if (playerHandTotalValue <= 21 && dealerHandTotalValue > 21) {
        playerWinCount = playerWinCount + 1;
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br><img src = "./images/youwin.jpg"/ class = "center"></img><br>Dealer busted! Player wins!` +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          `<br><br>Player Wins: ${playerWinCount}<br>Dealer Wins: ${dealerWinCount}<br>Tie: ${tieCount}<br><br>Press Submit to Play Again!`;
      }
      // Dealer wins when above two conditions are not met
      else {
        dealerWinCount = dealerWinCount + 1;
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br><img src = "./images/youlose.jpg"/ class = "center"><br>Dealer wins!` +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          `<br><br>Player Wins: ${playerWinCount}<br>Dealer Wins: ${dealerWinCount}<br>Tie: ${tieCount}<br><br>Press Submit to Play Again!`;
      }

      if ((currentGameMode = GAME_RESULTS_SHOWN)) {
        resetGame();
      }
    }

    // Input validation when player inputs anything outside of 'hit' or 'stand'
    else {
      outputMessage =
        '<img src = "./images/press.jpg"/ class = "center"><br>wrong input... only "h" for hit OR "s" for stand are valid.<br><br>' +
        displayPlayerAndDealerHands(playerHand, dealerHand);
    }

    // return output message
    return outputMessage;
  }
};
