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
  background("lightblue");

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
  let scaledValue = map(myValue,minValue,maxValue,1,itemSize);


  let value2 = table.getNum(rowNumber, "column2");

  let allValues2 = table.getColumn("column2");
  let minValue2 = min(allValues2);
  let maxValue2 = max(allValues2);
  let value2Mapped = map(value2,minValue2,maxValue2,0,1);

  let c1 = color("red");
  let c2 = color("blue");

  let mappedColor = lerpColor(c1,c2,value2Mapped); 

  let xPos = outerPadding + colCount * (itemSize + padding);
  let yPos = outerPadding + rowCount * (itemSize + padding);
  
  fill(mappedColor);  
  rect(xPos,yPos,scaledValue,scaledValue);
 

  colCount++; //aumenta colCount

  //controllo se siamo a fine riga
  if(colCount == cols) {
    colCount = 0;
    rowCount++;
    }
  }


}

function draw() {
  // put drawing code here
}