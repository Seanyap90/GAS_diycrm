# Custom CRM based on GAS and Google Colab
As shown in Linkedin: https://www.linkedin.com/pulse/unified-custom-crm-off-commonly-used-digital-tools-google-sean-yap/?trackingId=XlpPNR6PkhLRlI7Yty84OA%3D%3D

Refer to this spreadsheet for reference when you start to understand the code: https://docs.google.com/spreadsheets/d/1jIRUT7RJFH_cmxnC_fb4EXs1h5w50IfiyFKLcdCVDDw/edit#gid=0

This project consists of building CRUD elements for entry additions, customer data search, mail merge and CPQ (Configure, Price, Quote) functions.

# Part 1: General Structure
This block diagram summarises breakdown of the application into its frontend, Google Apps Script backend and other google related srvices.
![Slide1](https://user-images.githubusercontent.com/34641712/158042226-aaccc079-be23-4d69-a88d-b3b51480ac72.PNG)

With this understanding, it will be easier to understand the role of the listed scripts:
![Slide2](https://user-images.githubusercontent.com/34641712/158043422-cc01917e-3716-4c77-9ee0-70fa53f9be92.PNG)

To explain further:

1. interface.html, prdconfigtogenquote.html, directmailmerge.html have functions that are linked to the respective Apps script functions in main.gs, cpq.gs, customfunc.gs and apifunc.gs.  The former functions can be identified with lines such as Google.script.run.withSuccessHandler or Google.script.run.

2. loadPartials.gs will load html according to the eventlisteners listed in the html files mentioned in point 1

3. Appscript.json shows the services that needs to be authenticated within the app script

4. apifunc.gs is custom to a very specific use case but the structure is similar to connecting to different API for post or get requests and login to various software platforms.  You can restructure the login parameters by manipulating the html code at apiconnect.html accordingly.


# Part 2: Required documents
Once you have an understanding of the scripts, you will know how to adapt the code to a customised amount of spreadsheets.  Please create those spreadsheets first.  They will work with main.gs in terms of updating and changing data.

To have the CPQ function (cpq.gs) to work, you need to create a product list first.

# Part 3: Running the TagUI code at rpa_procure.ipynb on Google Colab
Take note that this is equivalent to running a Jupyter notebook.

Part A - Initialisation

1. Run cells 1 and 2 first to install packages.
2. Run cell 3 to check whether the rpa runs.  If it is successful, you will see a tick function in status bar at the bottom of your screen
3. If step 2 is unsuccessful, stop the code from running and go to Runtime tab and restart runtime
4. Run cells 1, 2 and 3.  Step 3 should be successful.
5. Go to the file icon on the very left column of google colab, click to expand into a file directory.  Drag and drog rpabot_2.py and rpabot_3.py into that directory.  Please download these 2 python scripts prior to running this notebook.
6. Run cell 4 to get token
7. Run cell 5 to import libraries
8. Run cell 6 to launch API and then you will get URL of the endpoint for you to connect to the API from google spreadsheets later

Part B - Logging into the API

In this application, I added a button "RFQ Portal" in sheet titled "LQ - Inbound Leads or RFQ".  The RFQ portal is assigned the function startapiform from apifunc.gs.  This will launch a dialog box for you to input login details and the URL endpoint initally obtained from running rpa_procure.ipynb


