Vue.component('card',{
data: function () {
    return {
    cards: []
    }
  },
  props: ['card'],
  methods: {
    clickCard: function(card){
    this.$parent.$emit('sendToParent', card);
    }
    },
  
  
  template:`<div class='card'
                 v-on:click="clickCard(card)"
                 :class="[ card.clicked == true ? card.name : 
'background' ]">
            </div>`,      
});  


var Cards = [{clicked:false, name:"fish"},
             {clicked:false, name:"horse"},
             {clicked:false, name:"mouse"},
             {clicked:false, name:"chicken"},
             {clicked:false, name:"elephant"},
             {clicked:false, name:"bird"},
             {clicked:false, name:"cat"},
             {clicked:false, name:"dog"}
            ];
             
 var shuffleCards = function shuffleCards() {
    var cards = [].concat(_.cloneDeep(Cards),_.cloneDeep(Cards));
    return _.shuffle(cards);
    };            


new Vue({
  el: '#memory-game',
  data: {
   cards: shuffleCards(),
   showSplash: true,
   counter: 0
  },
  
  created() {
    this.$on('sendToParent', (card) => {
      this.clickCard(card);
    }) 
  },
  methods: {
    clickCard: function(card){
      var allClicked = this.numberOfCardClick();
      var brkl = allClicked.length;
      if (brkl < 2){
  	      card.clicked = true;
      } else {
      var firstCard = allClicked[0];
      var secondCard = allClicked[1];
  	    if (firstCard.name == secondCard.name){
          this.setCardFounds();
        }
  	      this.resetOfCardClick();
        } 
     },
     
     numberOfCardClick: function noOfCardClick() {
       return _.filter(this.cards, function (card) {
       return card.clicked == true && card.disabled != true;
       })
       
     },
  
     resetOfCardClick: function resetOfCardClick() {
       this.showSplash = false;
       this.cards = this.cards.map(function(card){
          if (card.disabled != true){
              card.clicked = false;
             }
            return card;
          }
         );
     },
      
    setCardFounds: function setCardFounds(){
       var allClicked = this.numberOfCardClick();
       var brkl = allClicked.length;
       var firstCard = allClicked[0];
       var secondCard = allClicked[1];
          if (firstCard.name == secondCard.name) {
              firstCard.disabled = true;
              secondCard.disabled = true; 
          }
      }
   },
})