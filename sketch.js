function setup() {
  angleMode(DEGREES);
  canvasHeight = windowHeight
  canvasWidth = windowWidth
  createCanvas(600, 400);
  strokeWeight(1)
  frameRate(1) ///Drop to see it solve
  rectMode(CENTER)

  numDiscs = 10;
  a = new Tower(numDiscs, createVector(100,200))
  a.initialise(numDiscs)
  b = new Tower(numDiscs, createVector(250,200))
  c = new Tower(numDiscs, createVector(400,200))
  towers = [a,b,c]
  selected = null
  moveCount  = 0
  binString = ""
  solve = 0
}
  
function draw() {
  background(220)

  binString = getBinary(moveCount)

  textSize(32);
  fill(0, 102, 153);
  text(binString, 400, 50);
  textSize(16);
  fill("#000000");
  text("Made with ❤️ by Shishira Iyar", 370, 385);

  nextMove()
  
  a.show()
  b.show()
  c.show()
  
}

function getBinary(n){
    binaryStr = n.toString(2);

    while(binaryStr.length < numDiscs) {
      binaryStr = "0" + binaryStr;
  }
  return binaryStr

}

function mouseClicked(){
  var clicked = null
  console.log(selected)
  if (mouseX>50 &&mouseX<150 && mouseY<230 && mouseY>(200 - 10 - (a.top+1)*a.discHeight))
    clicked = a

  if (mouseX>200 &&mouseX<300 && mouseY<230 && mouseY>(200 - 10 - (b.top+1)*b.discHeight))
    clicked = b

  if (mouseX>350 &&mouseX<450 && mouseY<230 && mouseY>(200 - 10 - (c.top+1)*c.discHeight))
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
    binString = getBinary(moveCount++)
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
    this.MINWIDTH = 10
    this.MAXWIDTH = 50
    this.MAXHEIGHT = 80
    this.discHeight = this.MAXHEIGHT/this.DISCCOUNT;
    this.position = position

    //STACK
    this.discs = []
    this.top = -1;
    //STACK
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
      
      rect(this.position.x, this.position.y - height/2 - (i*height), this.MINWIDTH + width , height)
    }
  }

  static move(A, B){//Returns 1 for a legal move
    if(A.top == -1)
      return 0;
    
    if(B.top == -1){
      B.push(A.pop())
      return 1;  
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

function nextMove(){
  if (moveCount < (1<<numDiscs)){
    console.log(moveCount)
    //console.log((moveCount&(moveCount-1))%3, ((moveCount|(moveCount-1)) + 1)%3 )
    Tower.move(towers[(moveCount&(moveCount-1))%3], towers[((moveCount|(moveCount-1))+1)%3])
    if (moveCount != (1<<numDiscs) - 1) //Issue bcs there are 2^n states to be displayed. This fixes it.
      moveCount++
  }

}

function displayStuff(){}