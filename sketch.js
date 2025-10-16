let table;



function preload() {
  // put preload code here
  table = loadTable("dataset.csv","csv","header");

}

function setup() {
  console.log(table); //controllo se ho caricato i dati

  let outerPadding = 20; //padding a destra e a sinistra
  let padding = 10; //padding tra gli elementi
  let itemSize = 30;

  //calcolo il numero di colonne
  let cols = floor((windowWidth - outerPadding * 2) / (itemSize+padding)); //arrotonda x difetto
  let rows = ceil(table.getRowCount() / cols); //arrotonda x eccesso

  let totalHeight = outerPadding * 2 + rows * itemSize + (rows-1) * padding;
  
  console.log("colonne: ", cols, "righe: ", rows);


  //canvas
  createCanvas(windowWidth,totalHeight);
  background("darkblue");

  let colCount = 0;
  let rowCount = 0;

  for(let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++){
    console.log("riga numero: ", rowNumber);

  let data = table.getRow (rowNumber).obj;
  console.log(data);

  let myValue = table.getNum(rowNumber, "column0");
  let allValues = table.getColumn("column0");
  let minValue = min(allValues);
  let maxValue = max(allValues);
  let scaledValue = map(myValue,minValue,maxValue,10,itemSize);
  let value2 = table.getNum(rowNumber, "column2");
  let allValues2 = table.getColumn("column2");
  let minValue2 = min(allValues2);
  let maxValue2 = max(allValues2);
  let value2Mapped = map(value2,minValue2,maxValue2,0,1);

  let c1 = color("yellow");
  let c2 = color("light yellow");

  let mappedColor = lerpColor(c1,c2,value2Mapped); 

  let xPos = outerPadding + colCount * (itemSize + padding);
  let yPos = outerPadding + rowCount * (itemSize + padding);
  
  fill(mappedColor);
  noStroke();
  drawStar(xPos + itemSize / 2, yPos + itemSize / 2, scaledValue / 2, scaledValue, 5);
 

  colCount++; //aumenta colCount

  //controllo se siamo a fine riga
  if(colCount == cols) {
    colCount = 0;
    rowCount++;
    }
  }


}


// funzione per disegnare una stella
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

  function draw() {
  // put drawing code here
}
