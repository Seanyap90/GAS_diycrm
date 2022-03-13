import rpa as r
import pandas as pd
from time import sleep

def extractinfo(userid, username, password):
  r.init(visual_automation = True)
  r.url('https://sesami.online/nus/Login.jsp')
  r.click('/html/body/div[3]/div[1]/div/div[2]/div[1]/div/div[2]/form/div[1]/div/input')
  r.type('/html/body/div[3]/div[1]/div/div[2]/div[1]/div/div[2]/form/div[1]/div/input', userid)
  r.click('/html/body/div[3]/div[1]/div/div[2]/div[1]/div/div[2]/form/div[2]/div/input')
  r.type('/html/body/div[3]/div[1]/div/div[2]/div[1]/div/div[2]/form/div[2]/div/input', username)
  r.click('/html/body/div[3]/div[1]/div/div[2]/div[1]/div/div[2]/form/div[3]/div/input')
  r.type('/html/body/div[3]/div[1]/div/div[2]/div[1]/div/div[2]/form/div[3]/div/input', password)
  r.click('/html/body/div[3]/div[1]/div/div[2]/div[1]/div/div[2]/form/div[4]/div/button[1]')
  sleep(3)
  r.click('/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr[3]/td/ul/li[2]')
  r.click('/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr[3]/td/ul/li[2]/ul/li[1]/a')
  sleep(2)
  r.snap('page', 'results.png')
  leadcount = r.count('/html/body/table/tbody/tr[2]/td/center/div[2]/div/table/tbody/tr')
  print(leadcount)
  rfq_ref_2 = []
  description_2 = []
  closing_period = []
  status = []
  rfq_url = []
  primary_requestor = []
  primary_email = []
  primary_contact = []
  secondary_requestor = []
  secondary_email = []
  secondary_contact = []
  rfq_pdf_url = []
  nda = []
  print("acccess individual details")
  for n in range(1, leadcount+1):
      #Access individual opportunities from main table
      rfq_ref_2_line = r.read(f'(/html/body/table/tbody/tr[2]/td/center/div[2]/div/table/tbody/tr/td[2])[{n}]')
      print(rfq_ref_2_line)
      rfq_ref_2.append(rfq_ref_2_line)
      description_2_line = r.read(f'(/html/body/table/tbody/tr[2]/td/center/div[2]/div/table/tbody/tr/td[4])[{n}]')
      description_2.append(description_2_line)
      closing_period_line = r.read(f'(/html/body/table/tbody/tr[2]/td/center/div[2]/div/table/tbody/tr/td[6])[{n}]')
      closing_period.append(closing_period_line)
      status_line = r.read(f'(/html/body/table/tbody/tr[2]/td/center/div[2]/div/table/tbody/tr/td[7])[{n}]')
      status.append(status_line)
      rfq_url_line = r.read(f'(/html/body/table/tbody/tr[2]/td/center/div[2]/div/table/tbody/tr/td[11]/a/@href)[{n}]')
      rfq_url_line = 'https://sesami.online' + rfq_url_line
      print(rfq_url_line)
      rfq_url.append(rfq_url_line)
      
      # browse further details about that opportunity
      r.click(f'(/html/body/table/tbody/tr[2]/td/center/div[2]/div/table/tbody/tr/td[11]/a)[{n}]')
      
      if r.present('NON-DISCLOSURE AGREEMENT') == True:
          #check whether NDA has been initiated
          nda_line = 'NDA not signed'
          nda.append(nda_line)
          primary_requestor_line = ' '
          primary_requestor.append(primary_requestor_line)
          primary_email_line = ' '
          primary_email.append(primary_email_line)
          primary_contact_line = ' '
          primary_contact.append(primary_contact_line)
          secondary_requestor_line = ' '
          secondary_requestor.append(secondary_requestor_line)
          secondary_email_line = ' '
          secondary_email.append(secondary_email_line)
          secondary_contact_line = ' '
          secondary_contact.append(secondary_contact_line)
          rfq_pdf_url_line = ' '
          rfq_pdf_url.append(rfq_pdf_url_line)
          r.click('Source Key')
          r.click('View ITQ/ITT/RFI/PQ/RFQ')
      else:
          # scan table for relevant details
          for t in range (15,23):
            rowdetail = r.read(f'(/html/body/table/tbody/tr[2]/td/center/div[2]/form/table[1]/tbody/tr/td[1])[{t}]')
            # stop loop upon finding relevant detail
            if rowdetail.find("Primary Contact") != -1:
            # record relevant details  
              t1 = t+1
              t2 = t+3
              t3 = t+4
              primary_requestor_line = r.read(f'/html/body/table/tbody/tr[2]/td/center/div[2]/form/table[1]/tbody/tr[{t1}]/td[2]')
              primary_requestor.append(primary_requestor_line)
              primary_email_line = r.read(f'/html/body/table/tbody/tr[2]/td/center/div[2]/form/table[1]/tbody/tr[{t2}]/td[2]')
              primary_email.append(primary_email_line)
              primary_contact_line = r.read(f'/html/body/table/tbody/tr[2]/td/center/div[2]/form/table[1]/tbody/tr[{t3}]/td[2]')
              primary_contact.append(primary_contact_line)
              secondary_requestor_line = r.read(f'/html/body/table/tbody/tr[2]/td/center/div[2]/form/table[1]/tbody/tr[{t1}]/td[4]')
              secondary_requestor.append(secondary_requestor_line)
              secondary_email_line = r.read(f'/html/body/table/tbody/tr[2]/td/center/div[2]/form/table[1]/tbody/tr[{t2}]/td[4]')
              secondary_email.append(secondary_email_line)
              secondary_contact_line = r.read(f'/html/body/table/tbody/tr[2]/td/center/div[2]/form/table[1]/tbody/tr[{t3}]/td[4]')
              secondary_contact.append(secondary_contact_line)
              break

          rfq_pdf_url_line = r.read('/html/body/table/tbody/tr[2]/td/center/div[2]/form/table[3]/tbody/tr[4]/td[5]/a/@href')
          rfq_pdf_url_line = 'https://sesami.online' + rfq_pdf_url_line
          rfq_pdf_url.append(rfq_pdf_url_line)
          
          #go back to main page
          r.click('/html/body/table/tbody/tr[2]/td/center/div[1]/a[1]')
  #close and auto logout
  print("logout and close browser")
  r.close()

  print("build database")
  dict = {'RFQ_REF': rfq_ref_2, 'DESCRIPTION': description_2, 'CLOSING': closing_period,
          'STATUS': status, 'RFQ_URL': rfq_url, 'REQUESTOR': primary_requestor, 'CONTACT_EMAIL': primary_email,
          'CONTACT_NUMBER': primary_contact, 'REQUESTOR2': secondary_requestor, 'CONTACT_EMAIL2': secondary_email, 
          'CONTACT_NUMBER2': secondary_contact, 'PDF': rfq_pdf_url}   
  df = pd.DataFrame(dict)
  ##dict = {'RFQ_REF': rfq_ref_2, 'DESCRIPTION': description_2, 'PDF': rfq_pdf_url}
  ##df2 = pd.DataFrame(dict)
  return df

