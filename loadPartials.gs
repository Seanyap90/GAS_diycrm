function loadPartialHTML_(partial) {
  const htmlServ = HtmlService.createTemplateFromFile(partial);
  return htmlServ.evaluate().getContent()
}

function loadProspectAdd(){
  return loadPartialHTML_("prospectadd");
}

function loadProspectSearch(){
  return loadPartialHTML_("prospectsearch");
}

function loadProspectEdit(){
  return loadPartialHTML_("prospectedit");
}

function loadLeadAdd(){
  return loadPartialHTML_("leadadd");
}

function loadLeadSearch(){
  return loadPartialHTML_("leadsearch");
}

function loadLeadEdit(){
  return loadPartialHTML_("leadEdit");
}

function loadQuoteTrack(){
  return loadPartialHTML_("quoteTracking");
}

function loadQuoteEdit(){
  return loadPartialHTML_("quoteDetailEdit");
}

function loadPartialRpaHTML_(partial){
  const htmlServ = HtmlService.createTemplateFromFile(partial);
  return htmlServ.evaluate().getContent()
}

function loadPDFLinks(){
  return loadPartialRpaHTML_('apiresult1');
}

function loadPartialCpqHTML_(partial){
  const htmlServ = HtmlService.createTemplateFromFile(partial);
  return htmlServ.evaluate().getContent();
}

function loadCPQselect(){
  return loadPartialCpqHTML_('prdselect');
}

function loadCPQquote(){
  return loadPartialCpqHTML_('quoteConfig');
}