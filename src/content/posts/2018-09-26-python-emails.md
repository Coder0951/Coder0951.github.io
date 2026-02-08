---
title: "Python Emails"
date: 2018-09-26
category: Python
tags: [python, scripting, automation]
summary: "Various Excel sheets need to be opened , have data refreshed , screen shot taken of a tab , and screen shot and file emailed via Outlook."
---

# Python Emails

## Problem

Various Excel sheets need to be opened , have data refreshed , screen shot taken of a tab , and screen shot and file emailed via Outlook.

## Solution

Python program deployed on a Virtual Desktop with Task Scheduler set to run a .EXE version every hour.

* * *
```
    import win32com.client
    import time
    import win32process
    import win32gui
    import win32api
    import win32con
    import glob
    from pywintypes import com_error
    from datetime import datetime
    from datetime import timedelta
    import logging
    from logging.handlers import RotatingFileHandler
    import getpass
    import os
    import shutil
    import pandas as pd
    from PIL import ImageGrab
    # ############################## referenced in program ####################################
    def mycountchecker(AttachmentFlag, excelpath, pname, start_time, fname, path, mycount, Range1, Range2, Range3, Range4, SheetToSend, EmailTo1, EmailTo2):
        mycount = mycount + 1
        if mycount > 20:
            onErrorReplaceWorkBook(fname=fname, path=path,
                                   pname=pname, excelpath=excelpath)
            logger.debug("Failed More Than Twice Ending Program - " + pname)
            EndProgram()
        else:
            onErrorReplaceWorkBook(fname=fname, path=path,
                                   pname=pname, excelpath=excelpath)
            logger.debug("Failed Replacing and Re-attempting - " + pname)
            attemptToOpenSpreadSheet(
                AttachmentFlag=AttachmentFlag, pname=pname, start_time=start_time, fname=fname, path=path,
                mycount=mycount, Range1=Range1, Range2=Range2, Range3=Range3,
                Range4=Range4, SheetToSend=SheetToSend, EmailTo1=EmailTo1, EmailTo2=EmailTo2
            )
    def close_excel_by_force(excel):
        try:
            #  Get the window's process id's
            hwnd = excel.Hwnd
            t,  p = win32process.GetWindowThreadProcessId(hwnd)
            #  Ask window nicely to close
            win32gui.PostMessage(hwnd,  win32con.WM_CLOSE,  0,  0)
            #  Allow some time for app to close
            time.sleep(10)
            #  If the application didn't close,  force close
        except Exception as e:
            pass
        try:
            handle = win32api.OpenProcess(win32con.PROCESS_TERMINATE,  0,  p)
            if handle:
                win32api.TerminateProcess(handle,  0)
                win32api.CloseHandle(handle)
        except Exception as e:
            pass
    def savetempfileondesktop(fname, path, pname):
        logger.debug("Attempting to Save Back Up Files to Temp Location")
        try:
            mytempdirectory = "C:\\Users\\" + useranme + "\\Desktop\\"
            logger.debug('Temp Location - ' + mytempdirectory + " - " + pname)
            if not os.path.exists(mytempdirectory):
                os.makedirs(mytempdirectory)
                # time.sleep(1)
            shutil.copy2(fname, mytempdirectory)  # Copy to Temp Folder
            logger.debug("BackUp Filed Saved On Desktop - " + pname)
        except Exception as e:
            logger.debug(e)
            # ############################## start of program ####################################
    def onErrorReplaceWorkBook(fname, path, pname, excelpath):
        # logger.debug("Attempting to Files to Temp Location")
        try:
            mytempdirectory = "C:\\Users\\" + useranme + "\\Desktop\\"
            logger.debug(mytempdirectory)
            logger.debug(fname)
            logger.debug(pname)
            # Check if dir exist and if not create
            if not os.path.exists(mytempdirectory):
                os.makedirs(mytempdirectory)
                time.sleep(10)
            shutil.os.remove(fname)  # Delete SharePoint Version
            logger.debug("File Deleted From Orign")
            time.sleep(30)
            # Replace Now Missing SharePoint with Copy from Temp File
            shutil.copy2(mytempdirectory + pname, excelpath)
            logger.debug("File Replaced")
        except Exception as e:
            logger.debug(e)
    def locationoffiles(useranme):
        # Hardcode myptah variable#######################################################################################################################
        logger.debug('Getting Location of Files From Desktop txt file')
        orignpath = r"C:\Users\%s" % useranme + "\Desktop\HourlyEmailFeeder*.txt"
        for fname1 in glob.glob(orignpath):
            compiler1_df = pd.read_csv(fname1)
            listC1 = compiler1_df["LoctionofFile"].drop_duplicates().values
        mypath = listC1[0]
        for fname in glob.glob(mypath):
            compiler_df = pd.read_csv(fname)
            your_listC1 = compiler_df['filequery'].tolist()
            your_listC2 = compiler_df['filepath'].tolist()
            if fname.find('Text') >= 0:
                listTextPathsQuery = your_listC1
                listTextPaths = your_listC2
            elif fname.find('Excel') >= 0:
                listexcelpathSearchsQuery = your_listC1
                listexcelpathSearchs = your_listC2
        txtpathSearch = listTextPaths[0] + listTextPathsQuery[0]
        excelpathSearch = listexcelpathSearchs[0] + listexcelpathSearchsQuery[0]
        excelpath = listexcelpathSearchs[0]
        return txtpathSearch, excelpathSearch, excelpath
    def parameters_when_runfileDoWHour(txtpathSearch):
        logger.debug('Checking Parameter txt File')
        for filecount, fname in enumerate(glob.glob(txtpathSearch)):
            compiler_df = pd.read_csv(fname)
            filename_listC1 = compiler_df["filename"].tolist()
        return filename_listC1, compiler_df
    def SetFileLooping(filename_listC1, compiler_df, dayofweekinput, hourofdayinput, excelpathSearch, excelpath):
        # Starting Loop Through Iems
        for fname in glob.glob(excelpathSearch):
            pname = fname.replace(excelpath, "")
            logger.debug('Compiling File Paramters - ' + pname)
            starthour = ''
            endhour = ''
            startday = ''
            endday = ''
            SheetToSend = ''
            Range1 = ''
            Range2 = ''
            Range3 = ''
            Range4 = ''
            EmailTo1 = ''
            EmailTo2 = ''
            AttachmentFlag = ''
            df = compiler_df
            starthour = df.loc[df['filename'] == pname, 'starthour'].item()
            endhour = df.loc[df['filename'] == pname, 'endhour'].item()
            startday = df.loc[df['filename'] == pname, 'startday'].item()
            endday = df.loc[df['filename'] == pname, 'endday'].item()
            SheetToSend = df.loc[df['filename'] == pname, 'SheetToSend'].item()
            Range1 = df.loc[df['filename'] == pname, 'Range1'].item()
            Range2 = df.loc[df['filename'] == pname, 'Range2'].item()
            Range3 = df.loc[df['filename'] == pname, 'Range3'].item()
            Range4 = df.loc[df['filename'] == pname, 'Range4'].item()
            EmailTo1 = df.loc[df['filename'] == pname, 'EmailTo1'].item()
            EmailTo2 = df.loc[df['filename'] == pname, 'EmailTo2'].item()
            AttachmentFlag = df.loc[df['filename']
                                    == pname, 'AttachmentFlag'].item()
            if any(pname in s for s in filename_listC1):
                mycount = 0
                start_time = datetime.now()
                logger.debug(
                    "StartTime - " +
                    fname.replace(excelpath, ""))
                logger.debug('Dow and Hour Checker Section - ' + pname)
                if (dayofweekinput >= startday and dayofweekinput <= endday) and (hourofdayinput >= starthour and hourofdayinput <= endhour):
                    attemptToOpenSpreadSheet(
                        pname=pname, start_time=start_time, fname=fname,
                        path=excelpathSearch, mycount=mycount,
                        Range1=Range1, Range2=Range2, Range3=Range3, Range4=Range4,
                        SheetToSend=SheetToSend, EmailTo1=EmailTo1, EmailTo2=EmailTo2,
                        AttachmentFlag=AttachmentFlag
                    )
                else:
                    logger.debug('Not Ran as outside of HOOPS - ' + pname)
            else:
                logger.debug(pname + '- File Not in List')
    def attemptToOpenSpreadSheet(AttachmentFlag, pname, start_time, fname, path, mycount, Range1, Range2, Range3, Range4, SheetToSend, EmailTo1, EmailTo2):
        try:
            savetempfileondesktop(fname=fname, path=path, pname=pname)
            logger.debug("Opening SpreadSheet - " + pname)
            errorindicator_one = ", No Error"
            Application = win32com.client.Dispatch("Excel.Application")
            time.sleep(5)
            Application.Visible = True
            Application.DisplayAlerts = False
            Application.AskToUpdateLinks = False
            wb = Application.Workbooks.Open(r"\\" + fname)
            logger.debug("Refreshing SpreadSheet - " + pname)
            wb.RefreshAll()
            time.sleep(5)
            logger.debug("Saving SpreadSheet - " + pname)
            wb.SaveAs(r"\\" + fname)
            time.sleep(2)
            # ################  Save ScreenShot on Dekstop ###################
            logger.debug("Creating Temp SpreadSheet For ScreenShot - " + pname)
            r = wb.Sheets(SheetToSend)
            r.Range(r.Cells(Range1, Range2), r.Cells(Range3, Range4)).CopyPicture()
            time.sleep(2)
            temp_sheet = Application.Worksheets.Add()
            logger.debug('Sheet for  ScreeeShot Added - ' + pname)
            temp_sheet.Paste()
            logger.debug('Pasted ScreeeShot - ' + pname)
            time.sleep(1)
            temp_sheet.Shapes('Picture 1').Copy()
            img = ImageGrab.grabclipboard()
            img.save("C:\\Users\\" + useranme + "\\Desktop\\" +
                     pname.replace('.xlsx', "").replace('.xlsb', "") + ".png", 'PNG')
            time.sleep(1)
            temp_sheet.Delete()
            time.sleep(1)
            logger.debug('Saved ScreeeShot - ' + pname)
            # Old
            # wb1 = Application.Workbooks.Add()
            # ws = wb1.ActiveSheet
            # ws.Paste()
            # ws.Shapes('Picture 1').Copy()
            # img = ImageGrab.grabclipboard()
            # img.save("C:\\Users\\" + useranme + "\\Desktop\\" + pname.replace('.xlsx', "").replace('.xlsb', "") + ".png", 'PNG')
            logger.debug('Comleted ScreenShot - ' + pname)
            time.sleep(1)
            # wb1.Close()
            time.sleep(2)
            wb.Close()
            time.sleep(5)
            Application.Quit()
            logger.debug(
                "EndTime - "
                + fname.replace(excelpath, ""))
            end_time = datetime.now()
            CreateEmail(pname=pname, EmailTo1=EmailTo1, EmailTo2=EmailTo2,
                        AttachmentFlag=AttachmentFlag, attachment1=fname)
        except IOError:
            close_excel_by_force(Application)
            errorindicator_one = ", Failed Open Error"
            logger.debug("cannot open")
        except com_error as e:
            errorindicator_one = ";Data Fail Error"
            logger.debug(
                'Server Exception Thrown,  That Frown Face Though : ' + fname)
            logger.debug(e)
            close_excel_by_force(Application)
            mycountchecker(
                AttachmentFlag=AttachmentFlag, pname=pname, start_time=start_time, fname=fname, path=path,
                mycount=mycount, Range1=Range1, Range2=Range2, Range3=Range3,
                Range4=Range4, SheetToSend=SheetToSend, EmailTo1=EmailTo1, EmailTo2=EmailTo2, excelpath=excelpath
            )
        except Exception as e:
            close_excel_by_force(Application)
            errorindicator_one = ", Other Open Error"
            logger.debug("Other Exception on file :" + str(e))
        else:
            pass
        finally:
            end_time = datetime.now()
            totaltime = end_time - start_time
            logger.debug(
                "Completed, " +
                fname.replace(excelpath, "")
                + ", " + str(totaltime.seconds) + "Seconds" + errorindicator_one)
            close_excel_by_force(Application)
    def CreateEmail(pname, EmailTo1, EmailTo2, attachment1, AttachmentFlag):
        logger.debug("Starting Email Generation, " + pname)
        o = win32com.client.gencache.EnsureDispatch("Outlook.Application")
        nmail = o.CreateItem(0)
        attachment = nmail.Attachments.Add("C:\\Users\\" + useranme + "\\Desktop\\" + pname.replace(
            '.xlsx', "").replace('.xlsb', "") + ".png", win32com.client.constants.olEmbeddeditem, 0, pname)
        imageCid = pname + ".png"
        attachment.PropertyAccessor.SetProperty(
            "http://schemas.microsoft.com/mapi/proptag/0x3712001E",  imageCid)
        nmail.HTMLBody = "<body><img src=\"cid:{0}\"></body>".format(imageCid)
        nmail.To = EmailTo1
        # mysubject = pname.replace('.xlsx', "").replace('.xlsb', "").replace('_', ' ') + ' Report'
        if 'Hourly' in pname:
            d = datetime.today().strftime('%m-%d ') + datetime.today().strftime('@%I%p')
            mysubject = pname.replace('.xlsx', "").replace(
                '.xlsb', "").replace('_', ' ') + ' Report - ' + d
        else:
            d = datetime.today() - timedelta(days=1)
            d = d.strftime('%m-%d')
            print(d)
            mysubject = pname.replace('.xlsx', "").replace(
                '.xlsb', "").replace('_', ' ') + ' Report - ' + d
            print(mysubject)
        mysubject = mysubject.replace("  ", " ")
        nmail.Subject = mysubject
        if AttachmentFlag == 'y':
            nmail.Attachments.Add(Source=attachment1)
            nmail.Attachments.Add(Source="C:\\Users\\" + useranme + "\\Desktop\\" +
                                  pname.replace('.xlsx', "").replace('.xlsb', "") + ".png")
        else:
            nmail.Attachments.Add(Source="C:\\Users\\" + useranme + "\\Desktop\\" +
                                  pname.replace('.xlsx', "").replace('.xlsb', "") + ".png")
        nmail.SentOnBehalfOfName = "RS.Department@company.com"
        nmail.Send()
        logger.debug("EmailGenerated, " + pname)
        if type(EmailTo2) != float:
            # Email Generation
            o = win32com.client.gencache.EnsureDispatch("Outlook.Application")
            nmail = o.CreateItem(0)
            attachment = nmail.Attachments.Add("C:\\Users\\" + useranme + "\\Desktop\\" + pname.replace(
                '.xlsx', "").replace('.xlsb', "") + ".png", win32com.client.constants.olEmbeddeditem, 0, pname)
            imageCid = pname + ".png"
            attachment.PropertyAccessor.SetProperty(
                "http://schemas.microsoft.com/mapi/proptag/0x3712001E",  imageCid)
            nmail.HTMLBody = "<body><head><style>img{max-width: 100%;}</style></head><img src=\"cid:{0}\"></body>".format(
                imageCid)
            nmail.To = EmailTo2
            d = datetime.today().strftime('%m-%d ') + datetime.today().strftime('@%I%p')
            mysubject = pname.replace('.xlsx', "").replace(
                '.xlsb', "").replace('_', ' ') + ' Report'
            if 'Hourly' in pname:
                mysubject = pname.replace('.xlsx', "").replace(
                    '.xlsb', "").replace('_', ' ') + ' Report - ' + d
            else:
                d = datetime.today() - timedelta(days=1)
                d = d.strftime('%m-%d')
                print(d)
                mysubject = pname.replace('.xlsx', "").replace(
                    '.xlsb', "").replace('_', ' ') + ' Report - ' + d
                print(mysubject)
            mysubject = mysubject.replace("  ", " ")
            nmail.Subject = mysubject
            if AttachmentFlag == 'y':
                nmail.Attachments.Add(Source=attachment1)
            else:
                pass
            nmail.Subject = pname.replace('.xlsx', "").replace(
                '.xlsb', "").replace('_', ' ') + ' Report'
            nmail.SentOnBehalfOfName = "rs.Department@company.com"
            nmail.Send()
            logger.debug("EmailGenerated2, " + pname)
        else:
            logger.debug("No Secondary Email for - , " + pname)
    def EndProgram(self):
        if __name__ == __name__:
            logger.debug("Program Complete")
            pr_end_time = datetime.now()
            prtotaltime = pr_end_time - pr_start_time
            logger.debug("Completed In : " + str(prtotaltime.seconds) + " Seconds")
    if __name__ == __name__:
        useranme = getpass.getuser()  # Captures Useranme
        logger = logging.getLogger(__name__)
        logger.setLevel(logging.DEBUG)
        formatter = logging.Formatter(' %(message)s - %(asctime)s ')
        file_handler = RotatingFileHandler(
            "C:\\Users\\" + useranme + "\Desktop\Debuglog.txt", maxBytes=50000, backupCount=5)  # Sets LogFileLocation
        file_handler.setLevel(logging.DEBUG)
        file_handler.setFormatter(formatter)
        stream_handler = logging.StreamHandler()
        stream_handler.setLevel(logging.DEBUG)
        stream_handler.setFormatter(formatter)
        logger.addHandler(file_handler)
        logger.addHandler(stream_handler)
        pr_start_time = datetime.now()
        dayofweekinput = datetime.today().weekday()
        hourofdayinput = datetime.now().hour
        txtpathSearch, excelpathSearch, excelpath = locationoffiles(useranme)
        filename_listC1, compiler_df = parameters_when_runfileDoWHour(
            txtpathSearch)
        SetFileLooping(filename_listC1, compiler_df, dayofweekinput,
                       hourofdayinput, excelpathSearch, excelpath)
        EndProgram(__name__)
```

There are four feeder .txt files.

  1. Desktop File

     * LocationofFile - Header

     * \\\sitebuilder\dawwwroot\rootsite\subsite\Documents\Folder\\*_config_FileLocations*.txt

  2. _Config_FileLocations

     * filequery, filepath - Header(s)

     * *_config_DOWandHour*.txt, \\\sitebuilder\dawwwroot\rootsite\subsite\Documents\Folder\

  3. _Config_FileLocationsExcel

     * filequery,filepath

     * *.xls*,\\\sitebuilder\dawwwroot\rootsite\subsite\Documents\Folder\

  4. _HourlyReports_config_DOWandHour

     1. filename,attachmentflag,starthour,endhour,startday,endday,SheetToSend,Range1,Range2,Range3,Range4,EmailTo1,EmailTo2 -Header(s)

     2. Daily_FileName.xlsx,y,0,23,0,6,Email,1,4,92,89,Email@company.com
