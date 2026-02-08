---
title: "Python SFTP File Transfer"
date: 2018-09-26
category: Python
tags: [python, scripting, automation]
summary: "A CSV File is dumped into a folder and needs to be sent over a SFTP server."
---

# Python SFTP File Transfer

## Problem

A CSV File is dumped into a folder and needs to be sent over a SFTP server.

**Solutions:**

Instead of using a file management system like FileZilla use a Python Script to watch the folder where new files are generate and move them to the SFTP server.

* * *

```
    import pysftp
    import os
    import win32file
    import win32event
    import win32con
    path_to_watch = os.path.abspath(
        "\\\\ent.core.company.com/mit-city01/City Public/Folder/Folder")
    # FindFirstChangeNotification sets up a handle for watching
    #  file changes. The first parameter is the path to be
    #  watched; the second is a boolean indicating whether the
    #  directories underneath the one specified are to be watched;
    #  the third is a list of flags as to what kind of changes to
    #  watch for. We're just looking at file additions / deletions.
    print('Proponisi WatchDog Running')
    change_handle = win32file.FindFirstChangeNotification(
        path_to_watch, 0, win32con.FILE_NOTIFY_CHANGE_FILE_NAME
    )
    # Loop forever, listing any file changes. The WaitFor... will time out every 60 seconds allowing for keyboard interrupts to terminate the loop.
    try:
        old_path_contents = dict([(f, None) for f in os.listdir(path_to_watch)])
        while 1:
            result = win32event.WaitForSingleObject(change_handle, 500)
            print("FilesCheked")
            # If the WaitFor... returned because of a notification (as opposed to timing out or some error) then look for the changes in the directory contents.
            if result == win32con.WAIT_OBJECT_0:
                # print('somechange')
                new_path_contents = dict([(f, None)
                                          for f in os.listdir(path_to_watch)])
                added = [f for f in new_path_contents if not f in old_path_contents]
                deleted = [
                    f for f in old_path_contents if not f in new_path_contents]
                if added:
                    print("Added: ", ", ".join(added))
                    # Defines the name of the file for download / upload
                    remote_file = path_to_watch + "\\" + added[0]
                    print(remote_file, 'Identified For Transfer')
                    host = "www.somewebsite.com"
                    username = "UserName"
                    password = "P@ssword1"
                    port = 22
                    cnopts = pysftp.CnOpts()
                    cnopts.hostkeys = None
                    with pysftp.Connection(host=host, username=username, password=password, cnopts=cnopts, port=port) as sftp:
                        sftp.put(remote_file)
                        print(remote_file, "Moved")
                    sftp.close()
                if deleted:
                    print("Deleted: ", ", ".join(deleted))
                old_path_contents = new_path_contents
                win32file.FindNextChangeNotification(change_handle)
    finally:
        win32file.FindCloseChangeNotification(change_handle)
```
