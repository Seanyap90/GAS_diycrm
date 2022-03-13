import rpa as r
import pandas as pd
from time import sleep
import glob
import os
from google.colab import files

def extractpdf(userid, username, password, pdfurl):
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
  r.url(pdfurl)
  sleep(3)
  r.close()
  list_of_files = glob.glob('/content/*') # * means all if need specific format then *.csv
  latest_file = max(list_of_files, key=os.path.getctime)
  print(latest_file)
  files.download(latest_file)
