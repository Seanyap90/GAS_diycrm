function quotePopUp(e){
  var active_range = e.range.getSheet().getActiveRange();
  if (active_range.getColumn() == 16){
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var ws = ss.getActiveSheet()
    var quoteOption = ws.getRange(active_range.getRowIndex(), 16).getValue().toString();
    var leadID = ws.getRange(active_range.getRowIndex(), 1).getValue().toString();
    if (quoteOption === 'Generate'){
      startCpqForm(leadID)
    };  
  }
}

function startCpqForm(leadID) {
  var html = HtmlService.createHtmlOutputFromFile('prdconfigtogenquote')
  html.setWidth(600).setHeight(700);
  var ui = SpreadsheetApp.getUi();
  ui.showModalDialog(html, 'Configure for Quote for ' + leadID);
}

function getPrdForSearch(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("Product List")
  var rowData = ws.getRange(2, 1, ws.getLastRow()-1, 3).getValues();
  return rowData;
}

function getPrdByIds(arr){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("Product List")
  var productsInfo = []
  arr.forEach(function(partNo){
    partNo = partNo.toString().toLowerCase()
    const partNoIds = ws.getRange(2, 2, ws.getLastRow()-1, 1).getValues().map(r => r[0].toString().toLowerCase());
    if (partNoIds.indexOf(partNo) !== -1){
      var posIndex = partNoIds.indexOf(partNo.toString().toLowerCase());
      var rowNumber = posIndex === -1 ? 0 : posIndex + 2;
      var productLineInfo = ws.getRange(rowNumber, 1, 1, 6).getValues()[0];
      productsInfo.push(productLineInfo);
    }
  })
  return productsInfo;  
}

function quoteCreate(quoteRef, arr){
  // Initialise lead sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  var ws = ss.getActiveSheet()

  // Initialise active row to get customer details
  var active_range = ws.getActiveRange();
  var quoteID = ws.getRange(active_range.getRowIndex(), 1).getValue().toString();
  var quoteCompany = ws.getRange(active_range.getRowIndex(), 2).getValue().toString();
  var quoteCustomer = ws.getRange(active_range.getRowIndex(), 3).getValue().toString();
  var quoteContact = ws.getRange(active_range.getRowIndex(), 7).getValue().toString().toLowerCase();
  var projectTitle = ws.getRange(active_range.getRowIndex(), 8).getValue().toString();
  
  // Create a copy of quote template
  var file = DriveApp.getFileById("1S1i943LvK7wIbbNbhnagIYugbOOK7EQwS57m0UnG2Dw").makeCopy()
  
  // Rename copied template file's name:
  var copyfileId = file.getId();
  var copiedfile = DriveApp.getFileById(copyfileId).setName(quoteID + ":" + quoteRef);
  Logger.log(copyfileId);
  
  // Find quotation subsection in copied template
  const ss2 = SpreadsheetApp.openById(copyfileId).getActiveSheet()
  const ws2 = ss2.getRange(8,1,ss2.getLastRow(), 7);
  const cellrow = ws2.createTextFinder("Extended Price").findNext().getRow();
  var startrow = cellrow + 1
  
  // Add required product data at quotation subsection
  // How it works: For single item quote, the code will automatically fill in the available row in the quotation subsection
  // For multiple item quote (at else loop), the code will fill in the available row, add a fresh row and create a fill handle for the respective
  // "extended price" cells
  // At the end of any quote, the code will configure a SUM formula for the cell beside "Grand Total" to determine the total deal value
  if(arr.length <=1){
    ss2.getRange(startrow, 1, 1, 6).setValues([[null,arr[0][1],arr[0][2],arr[0][7],"Ea",arr[0][6]]]);
  } else {
    for (i=0; i<arr.length; i++){
      ss2.getRange(startrow+i, 1, 1, 6).setValues([[null,arr[i][1],arr[i][2],arr[i][7],"Ea",arr[i][6]]]);
      var sellPriceCell = ss2.getRange(startrow+i, 6, 1, 1).getA1Notation()
      var qtyCell = ss2.getRange(startrow+i, 4, 1, 1).getA1Notation()
      ss2.getRange(startrow+i, 7, 1, 1).setFormula('='+ qtyCell + '*' + sellPriceCell)
      ss2.insertRowAfter(startrow+i)
    }
  }
  var cellrow2 = ws2.createTextFinder("Grand Total").findNext().getRow();
  var firstPriceCell = ss2.getRange(startrow, 7, 1, 1).getA1Notation()
  var lastPriceCell = ss2.getRange(cellrow2 - 1, 7, 1, 1).getA1Notation()
  ss2.getRange(cellrow2, 7, 1, 1).setFormula('=SUM('+firstPriceCell + ':' + lastPriceCell + ')')
  
  // Fill in customer details subsection
  var quoteRefcell = ss2.getRange("B8").setValue(quoteRef);
  var quoteProjectTitlecell = ss2.getRange("B9").setValue(projectTitle);
  var quoteAttncell = ss2.getRange("B11").setValue(quoteCustomer);
  var quoteCompanycell = ss2.getRange("B12").setValue(quoteCompany);
  var quoteContactcell = ss2.getRange("B16").setValue(quoteContact);
  
  return copyfileId;
}