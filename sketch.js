let table;

function preload() {
  // put preload code here
  table = loadTable("assets/dataset.csv", "csv", "header"); //la variabile tbale deve contenere tutto ciò che arriva dal dataset
}


function setup() {
  //controllo se ho caricato i dati
  //console.log(table); //scrivi sulla console del browser il contenuto della variabile table

  let outerPadding = 20;
  let padding = 10;
  let itemSize = 30;

  //calcolo numero colonne
  let cols = floor((windowWidth - outerPadding * 2)/(itemSize + padding)); //floor serve per arrotondare per difetto
 
  let rows = ceil(table.getRowCount() / cols); //ceil arrotonda per eccesso

  let totalHeight = outerPadding * 2 + rows *itemSize + (rows - 1)* padding;

  //creo il Canvas
  createCanvas(windowWidth, totalHeight);
  
  background('coral');

  console.log("colonne:", cols, "rows:", rows);

  let colCount = 0;
  let rowCount = 0;

  for(let rowNumber=0; rowNumber < table.getRowCount(); rowNumber++){
    console.log("riga numero:", rowNumber);

    //carico i dati della riga
    let data = table.getRow (rowNumber).obj;
    console.log(data);

    let myValue = data("column0");

    let allValues = table.getColumn("column0");
    let minValue = min(allValues);
    let maxValue = max(allValues);

    let scaledValue = map(myValue, minValue, maxValue, 1, itemSize);

    let value2 = data["column2"];
    let allValues2 = table.getColumn("column2");
    let minValue2 = min(allValues2);
    let maxValue2 = max(allValues2);
    let value2Mapped = map(value2, minValue2, maxValue2, 0, 1);

    let c1 = color('red');
    let c2 = color('blue');

    let mappedColor = lerpColor(c1, c2, value2Mapped);

    fill(mappedColor);
    //rect(50, 50, scaledValue, scaledValue);
    //calcolo posizione


    let xPos = outerPadding + colCount * (itemSize + padding);
    let yPos = outerPadding + rowCount * (itemSize + padding);

    rect(xPos, yPos, scaledValue, scaledValue);

    //aumento colCount
    colCount++;

    //controllo se siamo a fine riga
    // == fa delle comparazioni
    if(colCount == cols) {
      colCount = 0;
      rowCount++;
    }

  } 


}

function draw() {
  // put drawing code here
}