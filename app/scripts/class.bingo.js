/**
 * goBingo constructor
 */
 var goBingo = function(ticketString, element) {
   this._tString = ticketString;
   this._elem = element;
};

goBingo.prototype = {
  init: function() {
    var tString = this._tString;
    var container = document.getElementById(this._elem);
    var tickets = this.parseString(tString);
    this.displayTickets(tickets, container);
  },


  /**
  * parseString (@string)
  * @string - the string of data with numbers from where we create tickets
  * return: tickets array
  */
  parseString: function(string) {
    var tickArr = [],
        rTickets = [],
        nrTick = 0;
    for (var i = 0; i < string.length; i=i+2) //every 2
    {
      tickArr.push(parseInt(string.substr(i,2))); //pair of 2
      //now according to description, each ticket got 30 numbers, therefore when we reach 30, we create new ticket object
      if ((i + 2) % 30 === 0) {
        rTickets[nrTick] = tickArr;
        tickArr = []; //empty array
        nrTick++;
      }
    }
    return rTickets;
  },


  /**
   * displayTickets (@array, @element obj)
   * @array - the array with tickets
   * @element - element where to add the tickets (container)
   */
  displayTickets: function(tickets, element){
    var addLine = '',
        nrColumn = 0,
        count = 0,
        tickId = 0,
        ordColumns = 0;

    for (tick of tickets) {  //ES6
      //we already know he got 15 items inside
      addLine += '<div class="ticket" data-id="' + tickId + '">';
      addLine += '<div class="ticket__row">';

      for (i = 0; i < 27; i += 1) {
          ordColumns = Math.floor(tickets[tickId][count] / 10);
          //console.log(tickets[tickId][count] + ' OrdordColumns: ' + ordColumns + ' - nrColumn: ' + nrColumn);

          if (ordColumns === nrColumn) {
              addLine += '<div class="ticket__cell" data-nr="' + tickets[tickId][count] + '">' + tickets[tickId][count] + '</div>';
              count += 1;
          } else if (tickets[tickId][count] === 90 && nrColumn === (ordColumns - 1)) {
              addLine += '<div class="ticket__cell" data-nr="' + tickets[tickId][count] + '">' + tickets[tickId][count] + '</div>';
              count += 1;
          } else {
              addLine += '<div class="ticket__cell">&nbsp;</div>';
          }

          nrColumn += 1;
          if (i === 8 || i === 17) {
              addLine += '</div>';
              addLine += '<div class="ticket__row">';
              nrColumn = 0;
          } else if (i === 26) {
              addLine += '</div>';
          }
      }

      //add right box
      addLine += '<div class="remaining"><h3 id="toGo' + tickId + '" class="toGo">15</h3><p>TO GO</p></div>';

      addLine += '</div>';//close ticket
      tickId += 1;
      //reinitialize for new run
      nrColumn = 0;
      count = 0;
    }

    element.innerHTML = addLine;
  },


  /**
   * play function
   * simulates called numbers / we randomize ticket numbers then select winning ones
   */
  play: function() {
    var tString = this._tString;
    var container = document.getElementById(this._elem);
    var tickets = this.parseString(tString);
    var randomNumbers = this.randomize(tString);
    var newNumbers = [];
    var paint;

    //clear contents in order to reinit all
    while(container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }

    //first we display tickets
    this.displayTickets(tickets, container);

    //will do in here the logic for selecting extracted numbers
    //instead of creating other function
    //on the other side doins so many quesies in DOM isnt performance wise

    //console.log(randomNumbers);
    var idx = 0;
    paint = setInterval(function() {
      var elem = randomNumbers[idx];

      document.querySelector('div[data-nr="' + elem[1] + '"]').classList.add('marked');
      var toGo = parseInt(document.getElementById('toGo' + elem[0]).innerText);
      toGo--;
      document.getElementById('toGo' + elem[0]).innerText = toGo;

      //if winner
      if (toGo === 0) {
        var winner = document.createElement('h2');

        winner.setAttribute('class', 'winner');
        var tickNr = parseInt(elem[0]) + 1;
        winner.innerHTML = 'Ticket nr. ' + tickNr + ' is a winner !';
        container.appendChild(winner);
        clearInterval(paint);
      }


      idx++;

      if (idx === randomNumbers.length) {
        clearInterval(paint);
      }
    }, 50);


  },

  /**
   * randomize main array (@string)
   * @string - default tickets string
   * returns array
   */
  randomize: function(string) {
    var newArray = [];
    var mainIdx = 0;
    var tickArr = [];
    var rTickets = [];

    //convert string to array, adding ticket index
    for (var i = 0; i < string.length; i=i+2) //every 2
    {
      tickArr.push(new Array(mainIdx, parseInt(string.substr(i,2)))); //pair of 2

      if ((i + 2) % 30 === 0) {
        rTickets[mainIdx] = tickArr;
        //console.log(rTickets);
        tickArr = []; //empty array
        mainIdx++;
      }
    }
    //1-lvl flattern
    for (arrItem of rTickets) {
      for (var i = 0; i < arrItem.length; i++) {
        //console.log(arrItem[i]);
        newArray.push(arrItem[i]);
      }
    }
    return newArray.shuffle();
  }

};
