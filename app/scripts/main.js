var ticketString = '011722475204365360702637497481233455758302154058881928446789061241507324334876840738576186051132437816395663800818206590104559628214294664710935667287132130687703253151692742547985';

//init bingo. let's win !
require(['utils', 'class.bingo'], function(){
  'use strict';

  var bingo = new goBingo(ticketString, 'bingoTickets');
  bingo.init();

  //Play button - to simulate calling numbers
  btn.addEventListener('click', function() {
    bingo.play();
  }, false);

});
