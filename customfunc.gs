function downloadtoCsv() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getActiveSheet();
  //const ws = ss.getSheetByName("PS - Existing Accounts");
  const coldata = ws.getRange(2,16,ws.getLastRow()-1, 1).getValues();
  var checkboxdata = [];
  for (let i = coldata.length-1; i >=0; i--){
    console.log(coldata[i][0]);
    if (coldata[i][0] === true){
      var rowdata = ws.getRange(i+2, 1, 1, 15).getValues();
      console.log(rowdata[0][2], rowdata[0][3], rowdata[0][5]);
      checkboxdata.push([rowdata[0][2] + "," + rowdata[0][3] + "," + rowdata[0][5]]);
      console.log(checkboxdata);
    };
  };
  var csvData = "";
  checkboxdata.forEach(function(rowArray){
    let row = rowArray.join(",");
    csvData += row+ "\r\n";
  }); 
  console.log(csvData);
  DriveApp.createFile("To Mailjet Campaign", csvData, MimeType.CSV);
}

function directMailMergePopUp(){
  var html = HtmlService.createHtmlOutputFromFile('directmailmerge')
  var ui = SpreadsheetApp.getUi();
  ui.showModalDialog(html, 'Mass Email Generation for Custom Campaigns');
}

function directMailmerge(val,title){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getActiveSheet();
  var doc = DocumentApp.openById("1ogy-Dvvlef8tUIA-3quqp4STeFb1LnRrP5YSiBpXX6w");
  
  var text = doc.getBody().getText();
  var body = doc.getBody();
  var table = body.getTables()[val];
  var finaldoc = DocumentApp.create(title);
  for (let r=1; r<table.getNumRows(); r++){
    finaldoc.getBody().appendParagraph(table.getRow(r).getCell(1).getText());
  };
  var finaldocPara = finaldoc.getBody().getParagraphs();
  
  const coldata = ws.getRange(2,16,ws.getLastRow()-1, 1).getValues();
  var checkboxdata = [];
  for (let i = coldata.length-1; i >=0; i--){
    if (coldata[i][0] === true){
      var rowdata = ws.getRange(i+2, 1, 1, 15).getValues();
      checkboxdata.push([rowdata[0][2], rowdata[0][3], rowdata[0][5]]);
    };
  };
  console.log(checkboxdata);

  checkboxdata.forEach(function(row){
    console.log(row);
    finaldocPara.forEach(function(p){
      finaldoc.getBody().appendParagraph(p.copy()
                                          .replaceText("{emailaddress}", row[2])
                                          .replaceText("{firstname}", row[1]))
    });
  });
  var finaldocID = finaldoc.getId();
  console.log(finaldocID);
  return finaldocID;
}

function uncheckallboxes(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getActiveSheet();
  ws.getRange(2,15,ws.getLastRow()-1, 1).setValue(false);
}

function prospectToLead(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var source = ss.getActiveSheet();
  var destination = ss.getSheetByName("LQ - From Screening");
  var leadstatus = source.getRange(2,14, source.getLastRow()-1, 1).getValues();
  console.log(leadstatus)
  for (i=0; i<=leadstatus.length-1; i++){
    console.log(leadstatus[i][0]);
    var length = leadstatus.length;
    if (leadstatus[i][0].toString() === 'Yes'){
      var rowdata = source.getRange(i+2, 1, 1, 7).getValues();
      console.log(rowdata);
      source.getRange(i+2, 1, 1, 7).copyTo(destination.getRange(destination.getLastRow()+1, 1, 1, 1));
      console.log(i);
    };
  };
};