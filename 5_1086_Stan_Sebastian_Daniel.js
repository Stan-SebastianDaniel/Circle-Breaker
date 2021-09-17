var hero = { // avatarul heroului
    left: 575,
    top: 700,
    seMisca:false,
    unghi: 0
};

//variabile pt canvas si context
var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');
// vector de rachete
var rachete = [];
//link pentru folosire SVG
const SVG = 'http://www.w3.org/2000/svg';


//vector de asteroizi
var asteroizi=[];
//verifica daca asteroizii au fost creati
let asteroiziiIsCreati=false;


//aici se programeaza controalele navei
document.onkeydown = function(e) {
    if (e.keyCode === 37) {
        // Left
        hero.left = hero.left - 25;
    }
    if (e.keyCode === 38) {
        // Up
        hero.top = hero.top - 25;
    }
    if (e.keyCode === 39) {
        // Right
        hero.left = hero.left + 25;
    }
    if (e.keyCode === 40) {
        // down
        hero.top = hero.top + 25;
    }
    if(e.keyCode===90){
        //z ca sa rotesti stanga
        hero.unghi-=45;
        hero.unghi =hero.unghi%360;
        document.getElementById('hero').style.transform = 'rotate(' + hero.unghi + 'deg)';
    }
    if(e.keyCode===67){
        //c ca sa rotesti dreapta
        hero.unghi+=45;
        hero.unghi =hero.unghi%360;
        document.getElementById('hero').style.transform = 'rotate(' + hero.unghi + 'deg)';
        
       
    
    }
    if (e.keyCode === 88) {
        //x pentru lansat rachete
        if(rachete.length<3){
            drawMissiles();
        }
    }
    deseneazahero();
}


//functie pentru setarea pozitiei rachetelor
function setPosition(el, x, y) {
    
    el.style.transform = `translate(${x}px, ${y}px)`;
    
}   



//functia de desenare a heroului
function deseneazahero() {
    document.getElementById('hero').style.left = hero.left + 'px';
    document.getElementById('hero').style.top = hero.top + 'px';
}
//functie de desenare a rachetelor
function drawMissiles() {
    //obtinem idul imaginii folosite pt rachete
    imagine =document.createElement("img");
    //luam sursa imaginii
    imagine.src = 'media/missile1.png';
    //folosim rotatie pentru a vedea directia navei
    let rotatie=hero.unghi%360;
    let rotat=false
    //luam pozitia heroului
    let x=hero.left;
    let y=hero.top;
    //setam pozitia lui pe canvas
    setPosition(imagine, x, y);
    //creeam numele clasei de rachete
    imagine.className = "racheta"
    //ne creeam obiectul racheta
    const racheta = {  x, y, imagine,rotatie};
    //il adaugam in divul pentru rachete ca nod copil
    document.getElementById('rachetute').appendChild(imagine);
    //adaugam obiectul racheta in vectorul de rachete
    rachete.push(racheta);
    
}



function moveMissiles() {
    //actualizam pozitia fiecarei rachete si le facem sa se miste
    for(var i = 0 ; i < rachete.length ; i++ ) {
        
       const racheta =rachete[i];
       //in functie de ungiul de rotatie al rachetei vom seta directia de deplasare a acesteia
       if (racheta.rotatie>=0 && racheta.rotatie<45){
       racheta.y-=3;
       }else if (racheta.rotatie>=45 && racheta.rotatie<90) {
        racheta.x+=3;   
        racheta.y-=3; 
       }
       else if (racheta.rotatie>=90 && racheta.rotatie<135) {
        racheta.x+=3;   
         
       }else if (racheta.rotatie>=135 && racheta.rotatie<180) {
        racheta.x+=3;   
        racheta.y+=3; 
       }else if (racheta.rotatie>=180 && racheta.rotatie<225) {
          
        racheta.y+=3; 
       }else if (racheta.rotatie>=225 && racheta.rotatie<270) {
        racheta.x-=3;   
        racheta.y+=3; 
       }else if (racheta.rotatie>=270 && racheta.rotatie<315) {
        racheta.x-=3;   
       }else if (racheta.rotatie>=315 && racheta.rotatie<360) {
        racheta.x-=3;   
        racheta.y-=3; 
       }else if (racheta.rotatie>=-45 && racheta.rotatie<0) {
         racheta.x-=3
        racheta.y-=3; 
       }else if (racheta.rotatie>=-90 && racheta.rotatie<-45) {
        racheta.x-=3;   
        
       }else if (racheta.rotatie>=-135 && racheta.rotatie<-90) {
        racheta.x-=3;   
        racheta.y+=3; 
       }else if (racheta.rotatie>=-180 && racheta.rotatie<-135) {
          
        racheta.y+=3; 
       }else if (racheta.rotatie>=-225 && racheta.rotatie<-180) {
        racheta.x+=3;   
        racheta.y+=3; 
       }else if (racheta.rotatie>=-270 && racheta.rotatie<-225) {
        racheta.x+=3;   
        
       }else if (racheta.rotatie>=-315 && racheta.rotatie<-270) {
        racheta.x+=3;   
        racheta.y-=3; 
       }else{
        racheta.y-=3; 
       }
       setPosition(rachete[i].imagine,racheta.x,racheta.y);
    }  
}


function creeazaDusman(){
    let dusman = document.createElementNS('http://www.w3.org/2000/svg', "circle");
    let HpDisplay= document.createElementNS('http://www.w3.org/2000/svg', "text");
    let hp=getRandomInt(4)+1;
    let cx=getRandomInt(900), cy=getRandomInt(700), cr=25*(hp/2), speedx=(getRandomInt(3)-1)*getRandomInt(5), speedy=(getRandomInt(3)-1)*getRandomInt(5);
    dusman.setAttribute('cx',cx);
    dusman.setAttribute('cy',cy);
    dusman.setAttribute('r',cr);
    dusman.className="dusmanul";
    HpDisplay.setAttribute('x',cx);
    HpDisplay.setAttribute('y',cy);
    HpDisplay.setAttribute('font',5*hp);
    HpDisplay.setAttribute('fill','white');
    HpDisplay.setAttribute('align','center');
    HpDisplay.setAttribute('text-anchor','middle');
    HpDisplay.textContent=hp;
    if (hp==1) {
        dusman.setAttribute('fill','blue');
    }else if (hp==2) {
        dusman.setAttribute('fill','green');
    }else if (hp==3) {
        dusman.setAttribute('fill','orange');
    }else {
        dusman.setAttribute('fill','red');
    }
    const navaDusman = {  hp,speedx,speedy, dusman,HpDisplay};
    asteroizi.push(navaDusman);
}

function deseneazaDusmani(){
    if (asteroiziiIsCreati == false){
    asteroizi.forEach(navaDusman => {
        document.querySelector('#spatiuDusmani').appendChild(navaDusman.dusman);
        document.querySelector('#spatiuDusmani').appendChild(navaDusman.HpDisplay);
    });
    asteroiziiIsCreati=true;
    }      
}

function miscaDusmani(){
    // asteroizi.forEach(navaDusman => {
    //     asteroizi.dusman.cx;
    //     navaDusman.dusman.setAttribute('cx',cx);
    //     navaDusman.dusman.setAttribute('cy',cy);
    // });
    for (let i = 0; i < asteroizi.length; i++) {
       let nx=asteroizi[i].dusman.cx.baseVal.value +asteroizi[i].speedx;
       let ny=asteroizi[i].dusman.cy.baseVal.value -asteroizi[i].speedy;
       asteroizi[i].dusman.setAttribute('cx',nx);
       asteroizi[i].dusman.setAttribute('cy',ny);
       asteroizi[i].HpDisplay.setAttribute('x',nx);
       asteroizi[i].HpDisplay.setAttribute('y',ny);
    // asteroizi[i].dusman.cx.baseVal.value +=asteroizi[i].speedx;
    // asteroizi[i].dusman.cy.baseVal.value +=asteroizi[i].speedy;
    }
}

function getRandomInt(max) {
return Math.floor(Math.random() * Math.floor(max));
}

// function drawEnemies() {
//     document.getElementById('enemies').innerHTML = ""
//     for(var i = 0 ; i < enemies.length ; i++ ) {
//         document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;
//     }
// }

function moveEnemies() {
    for(var i = 0 ; i < enemies.length ; i++ ) {
        enemies[i].top = enemies[i].top + 1;
    }
}

function setareCoordonate(imagine, x1, y1, x2, y2) {
    imagine.setAttribute('x', x1);
    imagine.setAttribute('y', y1);
    imagine.setAttribute('width', x2);
    imagine.setAttribute('height', y2);
}

function collisionDetection() {
    // if(enemies.length >= 1)
    //     for (var inmic = 0; inmic < enemies.length; inmic++) {
    //         for (var trase = 0; trase < rachete.length; trase++) {
    //             if ( 
    //                 rachete[trase].x >= (enemies[inmic].left-10)  &&
    //                 rachete[trase].x <= (enemies[inmic].left + 60)  &&
    //                 rachete[trase].y <= (enemies[inmic].top + 60)  &&
    //                 rachete[trase].y >= (enemies[inmic].top-10) 
    //             ) {
    //                 enemies.splice(inmic, 1);
    //                 if (rachete[trase].imagine.parentNode!=null) {
    //                     rachete[trase].imagine.parentNode.removeChild(imagine);
    //                  }
    //                 rachete.splice(trase, 1);
    //             }
                

    //         }
    //     }

        if(asteroizi.length >= 1){
            for (var inmic = 0; inmic < asteroizi.length; inmic++) {
                for (var trase = 0; trase < rachete.length; trase++) {
                    // if ( 
                    //     rachete[trase].x >= (asteroizi[inmic].dusman.cx.baseVal.value-asteroizi[inmic].dusman.r.baseVal.value)  &&
                    //     rachete[trase].x <= (asteroizi[inmic].dusman.cx.baseVal.value+asteroizi[inmic].dusman.r.baseVal.value)  &&
                    //     rachete[trase].y <= (asteroizi[inmic].dusman.cy.baseVal.value-asteroizi[inmic].dusman.r.baseVal.value)  &&
                    //     rachete[trase].y >= (asteroizi[inmic].dusman.cy.baseVal.value+asteroizi[inmic].dusman.r.baseVal.value)
                    // ) {
                    //     if (rasteroizi[inmic].dusman.parentNode!=null) {
                    //     asteroizi[inmic].dusman.parentNode.removeChild(dusman);
                    //     asteroizi[inmic].HpDisplay.parentNode.removeChild(HpDisplay);
                    //     }
                    //     asteroizi.splice(inmic, 1);
                    //     if (rachete[trase].imagine.parentNode!=null) {
                    //         rachete[trase].imagine.parentNode.removeChild(imagine);
                    //      }
                    //     rachete.splice(trase, 1);
                    // }
                    const r1 = asteroizi[inmic].dusman.getBoundingClientRect();
                    const r2 = rachete[trase].imagine.getBoundingClientRect();
                    
                    if(rectsIntersect(r1,r2)){
                        distrugeRacheta(trase);
                        if(asteroizi[inmic].hp>1){
                        reduMarimeAsteroid(inmic);
                        }else{
                            distrugeAsteroizi(inmic);
                        }
                        
                    }
                    
                }
            }

            // if (rachete.length >= 1){
            //     for (var i = 0; i < rachete.length; i++) {
            //         if(rachete[i].y <= 0 )
            //             {
            //                 if (rachete[i].imagine.parentNode!=null) {
            //                     var el=document.getElementById('')
            //                     rachete[i].imagine.parentNode.removeChild(imagine);
            //                 }
            //                 rachete.splice(i, 1);
            //                 }
        }
    
        
    
    const zid =canvas.getBoundingClientRect()
        
    if (rachete.length >= 1){
        for (var trase = 0; trase < rachete.length; trase++) {
            const r2 = rachete[trase].imagine.getBoundingClientRect();
            if(rectsIntersect(zid,r2)==false)
                 {
                     distrugeRacheta(trase);
                 }
        }
    }   

    // for (let i = 0; i < asteroizi.length; i++) {
    //     const p1=asteroizi[i].dusman.getBoundingClientRect();
    //     if (rectsIntersect(p1,zid)) {
    //         if (decteazaPunctColiziune(p1,zid)==1){
    //             asteroizi[i].speedx*=-1;
    //         }else if (decteazaPunctColiziune(p1,zid)==3){
    //             asteroizi[i].speedx*=-1;
    //         }else if (decteazaPunctColiziune(p1,zid)==2){
    //             asteroizi[i].speedy*=-1;
    //         }else{
    //             asteroizi[i].speedy*=-1;
    //         }
            
    //     }


    //     for (let j = 1; j < asteroizi.length-1; j++) {
    //         const p1=asteroizi[i].dusman.getBoundingClientRect();
    //         const p2=asteroizi[j].dusman.getBoundingClientRect();

    //     }
        
    // }
    
    
}

function reduMarimeAsteroid(inmic){
        asteroizi[inmic].hp -=1;
        const raza=25*(asteroizi[inmic].hp/2);   
        asteroizi[inmic].dusman.setAttribute('r',raza);
        asteroizi[inmic].dusman.className="dusmanul";
        asteroizi[inmic].HpDisplay.setAttribute('font',5*asteroizi[inmic].hp);
        asteroizi[inmic].HpDisplay.textContent=asteroizi[inmic].hp;
        if (asteroizi[inmic].hp==1) {
            asteroizi[inmic].dusman.setAttribute('fill','blue');
        }else if (asteroizi[inmic].hp==2) {
            asteroizi[inmic].dusman.setAttribute('fill','green');
        }else if (asteroizi[inmic].hp==3) {
            asteroizi[inmic].dusman.setAttribute('fill','orange');
        }else {
            asteroizi[inmic].dusman.setAttribute('fill','red');
        }
    }


    function distrugeAsteroizi(inmic){
        if (asteroizi[inmic].dusman.parentNode!=null) {
            asteroizi[inmic].HpDisplay.parentNode.removeChild(asteroizi[inmic].HpDisplay);
            asteroizi[inmic].dusman.parentNode.removeChild(asteroizi[inmic].dusman);  
            asteroizi.splice(inmic, 1);      
            }
            
    }
        
    function distrugeRacheta(trase){
        if (rachete[trase].imagine.parentNode!=null) {
            rachete[trase].imagine.parentNode.removeChild(rachete[trase].imagine);
                     }
            rachete.splice(trase, 1);
    }
    
    
    

    

//se verifica daca se face coliziune
        function rectsIntersect(r1, r2) {
        return !(
            r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top
            );
        }

        function decteazaPunctColiziune(r1, r2) {
        
           if (r1.right<r2.left){
               // r1 se loveste de r2 in dreapta
               return 1
           }
           if (r1.left<r2.right){
               // r1 se loveste de r2 in dreapta
               return 3
           }
           if (r1.top>r2.bottom){
               // r1 se loveste de r2 in sus
               return 2
           }
           if (r1.bottom<r2.top){
               // r1 se loveste de r2 in jos
               return 4
           }
            
        }

for (let i = 0; i < getRandomInt(30)+10; i++) {
    creeazaDusman();
}


function gameLoop() {
    setTimeout(gameLoop, 100)
    for(var j=0; j<25; j++){
        
        moveMissiles();
        collisionDetection();
        }
       
     
    
    deseneazaDusmani();
    miscaDusmani();

    // document.addEventListener("keydown", keyDown);
    // document.addEventListener("keyup", keyUp);
    }

 //gameLoop()
document.addEventListener('DOMContentLoaded', gameLoop);