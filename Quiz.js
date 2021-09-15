class Quiz {
    constructor(){}
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        contestant = new Contestant();
        var contestantCountRef = await database.ref('contestantCount').once("value");
        if(contestantCountRef.exists()){
          contestantCount = contestantCountRef.val();
          contestant.getCount();
        }
        question = new Question()
        question.display();
      }
    }
  
    play(){
      question.hide();
      background(rgb(192, 227, 249));
      fill(0);
      textSize(30);
      textFont("Book Antiqua");
      text("Result of the Quiz",340, 50);
      text("----------------------------",320, 65);
      Contestant.getPlayerInfo();
      if(allContestants !== undefined){
        debugger;
        var display_Answers = 230;
        fill(rgb(0, 5, 160));
        textSize(20);
        textFont("Book Antiqua");
        text("NOTE: Contestant who answered correct are highlighted in green!",130,230);
  
        for(var plr in allContestants){
          debugger;
          var correctAns = "2";
          if (correctAns === allContestants[plr].answer)
            fill("green")
          else
            fill("red");
  
          display_Answers+=30;
          textSize(20);
          text(allContestants[plr].name + ": " + allContestants[plr].answer, 250,display_Answers)
        }
      }
    }
  }
  