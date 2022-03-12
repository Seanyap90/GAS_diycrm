function connectapi(url, userid, username, password){
  var ngorkurl = url
  var fullurl = ngorkurl + "/rpabot/";
  var formdata = {'userid': userid, 'username': username, 'password': password};
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(formdata)
  };
  var response = UrlFetchApp.fetch(fullurl,options);
  //var responseString = response.getContentText("UTF-8");
  var responseString = JSON.parse(response.getContentText());
  var responseCode = response.getResponseCode();
  var data = responseString["data"];
  var data2 = [];
  var originalheader = Object.keys(data[0]);
  var tableheader = [originalheader[1], originalheader[2], originalheader[12]];
  data2.push(tableheader);
  for (i=0; i<data.length; i++){
    var datarow = [data[i].RFQ_REF,data[i].DESCRIPTION,data[i].PDF]
    data2.push(datarow)
  };
  for (i=0; i<data.length; i++){
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("LQ - Inbound Leads or RFQ");
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow+1,1).activate();
    sheet.appendRow([
                      data[i].RFQ_REF,
                      "NUS",
                      data[i].REQUESTOR + String.fromCharCode(10) + data[i].REQUESTOR2,
                      null,
                      null,
                      data[i].CONTACT_EMAIL + String.fromCharCode(10) + data[i].CONTACT_EMAIL2,
                      data[i].CONTACT_NUMBER + String.fromCharCode(10) + data[i].CONTACT_NUMBER2,
                      data[i].DESCRIPTION,
                      data[i].RFQ_URL + String.fromCharCode(10) + "closing date: " + data[i].CLOSING
                    ]);
  };
  //THIS IS A GOOD CODE PRACTICE BELOW FOR NESTED OBJECTS WITH KEYS AND VALUES, YET TO FIGURE THE BUG THAT MESSING
  //OBJECT CONVERSION TO HTML TABLE
  //var datarow2 = {};
  //Logger.log(response);
  //Logger.log(responseString);
  //Logger.log(data[1]);
  //for (i=0; i<data.length; i++){
    //function subset(obj, propList) {
      //return propList.reduce(function(newObj, prop) {
        //obj.hasOwnProperty(prop) && (newObj[prop] = obj[prop]);
        //return newObj;
      //}, {});
    //}
    //var datarow2 = subset(data[i], ['RFQ_REF','DESCRIPTION','PDF'])
    //console.log(datarow2)
    //data2.push(datarow2)
  //}

  Logger.log(data2);
  return data2;
}

function downloadPDF(url, userid, username, password, pdfurl){
  var ngorkurl = url
  var fullurl = ngorkurl + "/rpabot_pdf/";
  var botdata = {'userid': userid, 'username': username, 'password': password, 'pdfurl': pdfurl};
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(botdata)
  };
  var response = UrlFetchApp.fetch(fullurl,options);
  var responseString = response.getContentText();
  Logger.log(responseString);
  return responseString;
}

function startapiform(){
  var html = HtmlService.createHtmlOutputFromFile('apiconnect')
  html.setWidth(700).setHeight(600);
  var ui = SpreadsheetApp.getUi();
  ui.showModalDialog(html, 'Retrieve data from public RFQs at sesami portal'); 
}