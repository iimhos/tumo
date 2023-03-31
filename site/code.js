let interval = setInterval(() => {
  Game.send_stats();
}, 5000);
class Game{
  static score = 0
  static culkasd = 0
  static culkas =  []
  static gcolor = 2;
  static culkasInfo = [];
  static f = 3;
  static Sspawn(x,y,c){
    let culk = new culka("magenta",50,x,y,c)
    this.culkas.unshift(culk)
  }
  static Yspawn(x,y,c){
    let culk = new Yculka("yellow",35,x,y,c)
    this.culkas.unshift(culk)
  }
  static Bspawn(x,y,c){
    let culk = new Bculka("black",50,x,y,c)
    this.culkas.unshift(culk)
  }
  static Rspawn(x,y,c){
    let culk = new Rculka("white",60,x,y,c)
    this.culkas.unshift(culk)
  }
  static Fspawn(x,y,c){
    let culk = new Fculka(255,55,x,y,c,3)
    this.culkas.unshift(culk)
  }
  static Gspawn(x,y,c){
    let culk = new Gculka(random(0,7),40,x,y,c)
    this.culkas.unshift(culk)
  }
  static noculkaD(){
    this.culkas.forEach((cul,index) => {
      let distance = dist(cul.x,cul.y,mouseX,mouseY)
      if(distance <= cul.size/2){
        cul.noculka(index)
      }
    })
  }
  static send_stats(){
    console.log("1");
    const stats = {
      score : this.score,
      ccount : this.culkasInfo,
    };
    fetch('/stats',{
      method: 'POST',
      headers:{
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(stats)
    })
  }
}
class culka{
  constructor(color,size,x,y,c){
    if(c == 1){
      this.x = x;
      this.y = y;
    }
    else{
    this.x = random(0,width);
    this.y = random(height-10,height+10);
    }
    this.size = size
    this.color = color
  }
  updateCulka(){
    fill(this.color)
    ellipse(this.x,this.y,this.size)
    line(this.x,this.y + this.size/2,this.x,this.y + this.size*1.5)
  }
  move(score){
    this.y-= Game.culkasd/50+1
  }
  noculka(index){
    Game.culkas.splice(index,1)
    Game.score++
    Game.culkasd++
    Game.culkasInfo[0]++;
  }
}
class Yculka extends culka{
  constructor(color,size,x,y,c){
    super(color,size,x,y,c)
  }
  noculka(index){
    Game.culkas.splice(index,1)
    Game.score+=5
    Game.culkasd++
    Game.culkasInfo[1]++;
  }
}
class Bculka extends culka{
  constructor(color,size,x,y,c){
    super(color,size,x,y,c)
  }
  noculka(index){
    Game.culkas.splice(index,1)
    Game.score-=20
    Game.culkasd+=30;
    Game.culkasInfo[2]++;
  }
  move(score){
    this.y-= Game.culkasd/130+1
  }
}
class Rculka extends culka{
  constructor(color,size,x,y,c){
    super(color,size,x,y,c)
  }
  noculka(index){
    Game.culkas.splice(index,1)
    Game.score+=6
    Game.culkasd+=1;
    Game.culkasInfo[3]++;
  }
  move(score){
    let a = abs(map(this.y,0,height,-100,100))
    this.y-= (Game.culkasd*1.5)/a
  }
}
class Gculka extends culka{
  constructor(color,size,x,y,c){
    super(color,size,x,y,c)
  }
  noculka(index){
    Game.culkas.splice(index,1)
    Game.score+=2
    let a = parseInt(random(0,101))
    if(a >= 0 && a <= 50){
      Game.Sspawn(this.x,this.y,1)
      console.log("normal");
    }
    if(a > 50 && a <= 60){
      Game.Rspawn(this.x,this.y,1)
      console.log("speed");
    }
    if(a > 60 && a <= 70){
      Game.Fspawn(this.x,this.y,1)
      console.log("teleport");
    }
    if(a > 70 && a <= 80){
      Game.Yspawn(this.x,this.y,1)
      console.log("Yellow");
    }
    if(a > 80 && a <= 90){
      Game.Bspawn(this.x,this.y,1)
      console.log("black");
    }
    if(a > 90 && a <= 100){
      Game.Gspawn(this.x,this.y,1)
      console.log("stupid");
    }
  }
  updateCulka(){
    fill(Game.gcolor/1.5,Game.gcolor,Game.gcolor/this.color)
    ellipse(this.x,this.y,this.size)
    line(this.x,this.y + this.size/2,this.x,this.y + this.size*1.5)
  }
}
class Fculka extends culka{
  constructor(color,size,x,y,c,hp){
    super(color,size,x,y,c)
    this.hp = hp
  }
  noculka(index){
    if(this.hp <= 1){
      Game.culkas.splice(index,1)
    }
    this.hp--
    this.x = random(width-this.x+20,this.x-20)
    Game.score+=3
    Game.culkasd++
    Game.culkasInfo[4]++;
  }
  updateCulka(){
    fill(this.color/3*this.hp,10,10)
    ellipse(this.x,this.y,this.size)
    line(this.x,this.y + this.size/2,this.x,this.y + this.size*1.5)
  }
}
function setup(){
  createCanvas(500,500)
  textAlign(CENTER,CENTER);
}


function draw(){
  background(250,200,230);
  if(frameCount % parseInt(100/(Game.culkasd/100+2.5)) == 0){
    let a = parseInt(random(0,101))
    if(a >= 0 && a <= 50){
      Game.Sspawn(0,0,0)
    }
    if(a > 50 && a <= 60){
      Game.Rspawn(0,0,0)
      console.log("speed");
    }
    if(a > 60 && a <= 70){
      Game.Fspawn(0,0,0)
    }
    if(a > 70 && a <= 80){
      Game.Yspawn(0,0,0)
    }
    if(a > 80 && a <= 90){
      Game.Bspawn(0,0,0)
    }
    if(a > 90 && a <= 100){
      Game.Gspawn(0,0,0)
    }
  }
  for(const culka of Game.culkas){
    culka.updateCulka()
    culka.move(Game.culkasd)
    if(culka.y <= culka.size/2 && culka.color !== 'black'){
      clearInterval(interval);
      noLoop();
      background(0);
      Game.culkas.length = 0;
      Game.culkasd = 0;
      let score = Game.score
      Game.score = ""

      textSize(60);
      fill(255);
      textAlign(CENTER,CENTER);
      text("YOU LOSE.. haha",250,150);
      textSize(30);
      text("Your Score : " + score,250,250);
      fill(200,140,140);
      rect(40,340,width-80,height-40-340);
      fill(255);
      text("click here to restart",250,400);
    }
  }
  
  if(Game.gcolor >= 255){
    Game.f = -3
  }
  if(Game.gcolor <= 10){
    Game.f = 3
  }
  Game.gcolor += Game.f;
  fill(255);
  textSize(20);
  text(Game.score,250,10);
}


function mouseClicked(){
  if(!isLooping() && mouseX > 40 && mouseX < width-40 && mouseY  > 340 && mouseY < height - 40){
    loop();
    let interval = setInterval(() => {
      Game.send_stats();
    }, 5000);
  }
  Game.noculkaD()
}