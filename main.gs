function startForm() {
  var html = HtmlService.createHtmlOutputFromFile('interface')
  html.setWidth(600).setHeight(700);
  var ui = SpreadsheetApp.getUi();
  ui.showModalDialog(html, 'Manual Entry for CRM');
}

function addMenu() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('Custom');
  menu.addItem('Dropdown Form', 'startForm');
  menu.addToUi();
}

function onOpen(e){
  addMenu();
}

function addProspect(prospectInfo){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("PS - From Outbound");
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow+1,1).activate();
  sheet.appendRow([
                 prospectInfo.id,
                 prospectInfo.company,
                 prospectInfo.name,
                 prospectInfo.firstName,
                 prospectInfo.lastName,
                 prospectInfo.email,
                 null,
                 null,
                 prospectInfo.ownUrl
                 ]);
}

function addLead(leadInfo){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("LQ - Inbound Leads or RFQ");
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow+1,1).activate();
  sheet.appendRow([
                 null,
                 leadInfo.company,
                 leadInfo.name,
                 leadInfo.firstName,
                 leadInfo.lastName,
                 leadInfo.email,
                 leadInfo.contact,
                 leadInfo.leadProject,
                 leadInfo.leadDetails,
                 null,
                 null
                 ]);
}

function getProspectDataForSearch(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  var wsonly = ["PS - Existing Accounts", "PS - From Outbound"];
  var rowData2 = [];
  wsonly.forEach(function(name){
    var ws = ss.getSheetByName(name);
    var data =  ws.getRange(2, 1, ws.getLastRow()-1, 3).getValues();
    console.log(data);
    rowData2 = rowData2.concat(data);
  });
  console.log(rowData2);
  return rowData2;
}

function getLeadDataForSearch(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  var wsonly = ["LQ - From Screening", "LQ - Inbound Leads or RFQ"];
  var rowData = [];
  wsonly.forEach(function(name){
    var ws = ss.getSheetByName(name);
    var data =  ws.getRange(2, 1, ws.getLastRow()-1, 3).getValues();
    console.log(data);
    rowData = rowData.concat(data);
  });
  console.log(rowData);
  return rowData;
}

function getProspectById(id){
  var id = id.toLowerCase();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  var wsonly = ["PS - Existing Accounts", "PS - From Outbound"];
  var prsptInforow = [];
  wsonly.forEach(function(name){
    var ws = ss.getSheetByName(name);
    const prsptIds = ws.getRange(2, 1, ws.getLastRow()-1, 1).getValues().map(r => r[0].toString().toLowerCase());
    console.log(prsptIds);
    if (prsptIds.indexOf(id)!== -1){
      console.log("exists in " + ws.getName());
      const posIndex = prsptIds.indexOf(id.toString().toLowerCase());
      const rowNumber = posIndex === -1 ? 0 : posIndex + 2;
      const prsptInfo = ws.getRange(rowNumber, 1, 1, 8).getValues()[0];
      console.log(prsptInfo);
      prsptInforow = {searchprospectID: prsptInfo[0], searchprospectcompany: prsptInfo[1], searchprospectname: prsptInfo[2], searchprospectfirstname: prsptInfo[3],
                      searchprospectlastname: prsptInfo[4], serchprospectemail: prsptInfo[5], searchprospectphone: prsptInfo[6], searchprospecttopic: prsptInfo[7]} 
    };
  });
  console.log(prsptInforow);
  return prsptInforow
}

function getLeadById(id){
  var id = id.toLowerCase();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  var wsonly = ["LQ - From Screening", "LQ - Inbound Leads or RFQ"];
  var LeadInforow = [];
  wsonly.forEach(function(name){
    var ws = ss.getSheetByName(name);
    const LeadIds = ws.getRange(2, 1, ws.getLastRow()-1, 1).getValues().map(r => r[0].toString().toLowerCase());
    if (LeadIds.indexOf(id)!== -1){
      const posIndex = LeadIds.indexOf(id.toString().toLowerCase());
      const rowNumber = posIndex === -1 ? 0 : posIndex + 2;
      const LeadInfo = ws.getRange(rowNumber, 1, 1, 9).getValues()[0];
      console.log(LeadInfo);
      LeadInforow = {searchLeadID: LeadInfo[0], searchleadcompany: LeadInfo[1], searchleadname: LeadInfo[2], searchleadfirstname: LeadInfo[3],
                     searchleadlastname: LeadInfo[4], searchleademail: LeadInfo[5], searchleadphone: LeadInfo[6], searchleadproject: LeadInfo[7],
                     searchleadprojectdetail: LeadInfo[8]} 
    };
  });
  console.log(LeadInforow);
  return LeadInforow
}

function editProspectById(id, prsptInfo){
  var id = id.toLowerCase();
  var prsptInfo = prsptInfo;
  console.log(prsptInfo);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  var wsonly = ["PS - Existing Accounts", "PS - From Outbound"];
  wsonly.forEach(function(name){
    var ws = ss.getSheetByName(name);
    const prsptIds = ws.getRange(2, 1, ws.getLastRow()-1, 1).getValues().map(r => r[0].toString().toLowerCase());
    console.log(prsptIds);
    if (prsptIds.indexOf(id)!== -1){
      console.log("exists in " + ws.getName());
      console.log(prsptInfo);
      const posIndex = prsptIds.indexOf(id.toString().toLowerCase());
      const rowNumber = posIndex === -1 ? 0 : posIndex + 2;
      ws.getRange(rowNumber, 2, 1, 7).setValues([[
                                                  prsptInfo.searchprospectcompany,
                                                  prsptInfo.searchprospectname,
                                                  prsptInfo.searchprospectfirstname,
                                                  prsptInfo.searchprospectlastname,
                                                  prsptInfo.searchprospectemail,
                                                  prsptInfo.searchprospectphone,
                                                  prsptInfo.searchprospecttopic,
                                               ]]);
    }
  });
  return true;                                               
}

function editLeadById(id, LeadInfo){
  var id = id.toLowerCase();
  var LeadInfo = LeadInfo;
  console.log(LeadInfo);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  var wsonly = ["LQ - From Screening", "LQ - Inbound Leads or RFQ"];
  wsonly.forEach(function(name){
    var ws = ss.getSheetByName(name);
    const LeadIds = ws.getRange(2, 1, ws.getLastRow()-1, 1).getValues().map(r => r[0].toString().toLowerCase());
    console.log(LeadIds);
    if (LeadIds.indexOf(id)!== -1){
      console.log("exists in " + ws.getName());
      console.log(LeadInfo);
      const posIndex = LeadIds.indexOf(id.toString().toLowerCase());
      const rowNumber = posIndex === -1 ? 0 : posIndex + 2;
      ws.getRange(rowNumber, 2, 1, 8).setValues([[
                                                  LeadInfo.searchleadcompany,
                                                  LeadInfo.searchleadname,
                                                  LeadInfo.searchleadfirstname,
                                                  LeadInfo.searchleadlastname,
                                                  LeadInfo.searchleademail,
                                                  LeadInfo.searchleadphone,
                                                  LeadInfo.searchleadproject,
                                                  LeadInfo.searchleadprojectdetail
                                               ]]);
    }
  });
  return true;                                               
} 

