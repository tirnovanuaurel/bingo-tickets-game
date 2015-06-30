//Extend Array with item randomizer
Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i === 0 ) { return this; }
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
};

//Add a play bingo button to body and register action
var btn = document.createElement('button');
var label = document.createTextNode('Play Bingo');
btn.setAttribute('id', 'playBingo');
btn.appendChild(label);
document.body.appendChild(btn);
