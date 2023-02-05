// import { Triangle } from "./Triangle";

function setup() {
  angleMode(DEGREES);
  createCanvas(600, 400);
  fill("#ffeeff")
  strokeWeight(1)
  frameRate(60)
  rectMode(CENTER)

  a = new Tower(5, createVector(100,200))
  // a.push(4)
  // a.push(3)
  // a.push(2)
  // a.push(1)

  a.initialise(4)

  b = new Tower(5, createVector(250,200))

  c = new Tower(5, createVector(400,200))

  // Tower.move(a,c)
  // Tower.move(a,b)
  // Tower.move(c,b)

  selected = null
  moveCount  = 1
  binString = "00000000"

}
  
function draw() {
  background(220)

  textSize(32);
  fill(0, 102, 153);
  text(binString, 400, 50);
  
   
  
  a.show()
  b.show()
  c.show()
  
}

function counter(n){
    binaryStr = n.toString(2);

    while(binaryStr.length < 8) {
      binaryStr = "0" + binaryStr;
  }
  return binaryStr

}


function mouseClicked(){
  var clicked = null
  console.log(selected)
  if (mouseX>50 &&mouseX<150 && mouseY<220 && mouseY>(200 - 10 - (a.top+1)*a.discHeight))
    clicked = a

  if (mouseX>200 &&mouseX<300 && mouseY<220 && mouseY>(200 - 10 - (b.top+1)*b.discHeight))
    clicked = b

  if (mouseX>350 &&mouseX<450 && mouseY<220 && mouseY>(200 - 10 - (c.top+1)*c.discHeight))
    clicked = c

  if (clicked==null){
    selected=null;
    return;
  }

  if (selected == null){
    selected = clicked;
    return;
  }

  if (clicked == selected){
    selected=null
    return;
  }

  let retval = Tower.move(selected, clicked);
  
  if(retval == 1){ //Move successful
    binString = counter(moveCount++)
    
    selected = null
    return;
  }

  if(retval == 0){ //First selection was empty tower
    selected = clicked
    return
  }

  if (retval == -1){ //Cant move because of precedence
    selected = null
    return
  }


  //can move coz empty
  //can move coz precedence

  //cant move coz precedence
  //cant move coz selected is empty

//CHANGE BASE COULOUR OF SELECTED ONE. unselect option. tidy the function up

}

class Tower{
  constructor(discCount, position){
    this.DISCCOUNT = discCount
    this.MAXWIDTH = 50
    this.MAXHEIGHT = 100
    this.discHeight = this.MAXHEIGHT/this.DISCCOUNT;


    this.position = position
   
    this.discs =[]
    this.top = -1;
  }

  push(n){
    this.discs[++ this.top] = n
  }

  pop(){
    return this.discs[this.top--]
  }

  show(){
    fill("#854120")
    if (this==selected)
      fill("#000000")
    rect(this.position.x, this.position.y + 10, this.MAXWIDTH + 40 , 20)
    for(let i=0; i<this.top + 1; i++){
      let disc = this.discs[i]
      let col = 255/this.DISCCOUNT

      fill(255 - disc*col, 0,  disc*col)
      let height = this.discHeight
      let width = disc* this.MAXWIDTH/this.DISCCOUNT
      
      rect(this.position.x, this.position.y - height/2 - (i*height), width , height)
    }
  }

  static move(A, B){
    console.log(A,B)
    if(A.top == -1)
      return 0;
    
    if(B.top == -1){
      B.push(A.pop())
      return 1
    }

    if(A.discs[A.top] < B.discs[B.top]){
      B.push(A.pop())
      return 1;
    }

    if(A.discs[A.top] > B.discs[B.top]){
      return -1;
    }
  }

  initialise(n){
    for(let i=n; i>0; i--)
      this.push(i)
  }
}

