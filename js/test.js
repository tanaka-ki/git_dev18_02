// jsを記述する際はここに記載していく
"use strict";

{
    class User{ 
        constructor(tag,type){
            this.tag=tag;
            this.type=type;
            this._img=document.createElement("img");

            this._img.addEventListener("click",()=>{
                this.click();
            });
        }

        addImage(){ 
            this._img.src="img/"+this.type+".png";
        
        }

        addHTML(){ 
            this.tag.appendChild(this._img);
        }

        click(){ 
            if(!RESET_BUTTON.classList.contains("hidden")){ 
                return;
            }

            clearTimeout(dealer._timeoutId);
            RESET_BUTTON.classList.remove("hidden");
            this.result();
        }

        result(){ 
            let _dealerType=dealer.type[dealer._rdNum];

            switch(this.type){
                case "rock": //グーをクリックした場合
                    if(_dealerType === "rock"){
                        RESULT.textContent="引き分け";
                    }else if(_dealerType === "scissors"){
                        RESULT.textContent="勝ち！";
                    }else{
                        RESULT.textContent="負け";
                    }
                    break;

                case "scissors": //チョキをクリックした場合
                    if(_dealerType === "rock"){
                        RESULT.textContent="負け";
                    }else if(_dealerType === "scissors"){
                        RESULT.textContent="引き分け";
                    }else{
                        RESULT.textContent="勝ち！";
                    }
                    break;

                case "paper": //パーをクリックした場合
                    if(_dealerType === "rock"){
                        RESULT.textContent="勝ち！";
                    }else if(_dealerType === "scissors"){
                        RESULT.textContent="負け";
                    }else{
                        RESULT.textContent="引き分け";
                    }
                    break;

                default:
                    console.log("タイプなし");
                    break;
            }
        }
    }

    class Dealer extends User{ 
        constructor(tag,type){
            super(tag,type);

            this._rdNum=Math.floor(Math.random()*type.length);
            this._timeoutId;

            this.addImage();
            this.addHTML();
        }

        
        addImage(){ 
            this._img.src="img/"+this.type[this._rdNum]+".png";
        }

        shuffleImage(){ 
            this._rdNum=Math.floor(Math.random()*this.type.length);
            this.addImage();

            this._timeoutId = setTimeout(()=>{
                this.shuffleImage();
            },20); //50fps

        }

       
        click(){return;} 
    }

    class Player extends User{ 
        constructor(tag,type){
            super(tag,type);

            this.addImage();
            this.addHTML();
        }
    }

    const DEALER_TAG=document.querySelector(".dealer"); 
    const PLAYER_TAG=document.querySelector(".player"); 
    const RESET_BUTTON=document.getElementById("resetButton"); 
    const RESULT=document.querySelector(".result"); 

    const JANKEN_TYPE=["rock","scissors","paper"]; 

    init();

    const dealer=new Dealer(DEALER_TAG,JANKEN_TYPE) 

    let player=new Array(3);
    for(let i=0;i<player.length;i++){
        player[i]=(new Player(PLAYER_TAG,JANKEN_TYPE[i])); 
    }

    dealer.shuffleImage();

    RESET_BUTTON.addEventListener("click",()=>{ 
        dealer.shuffleImage();
        init();
    });

    function init(){ 
        RESULT.textContent="";
        RESET_BUTTON.classList.add("hidden");
    }
}