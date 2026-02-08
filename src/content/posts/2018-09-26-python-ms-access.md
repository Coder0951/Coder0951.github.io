---
title: "Python Microsoft Access"
date: 2018-09-26
category: Python
tags: [python, scripting, automation]
summary: "Some applications (Spotfire) have trouble when publishing to the webplayer to connect to ODBC connections. When querying a Access Database if the q..."
---

# Python Microsoft Access

## Problem

Some applications (Spotfire) have trouble when publishing to the webplayer to connect to ODBC connections. When querying a Access Database if the query is connected to an ODBC connection to an SQL sever it will not work in the webplayer.

## Solution

Extract the data from the MS Access Database with a python query and save the results to a CSV to be read by other programs.

* * *
```
    import pypyodbc
    import csv
    d = "\\\\ent.core.company.com\mit-city01\City Public\Folder\Folder\FileName.accdb;"
    # MS ACCESS DB CONNECTION
    pypyodbc.lowercase = False
    conn = pypyodbc.connect(
        r"Driver={Microsoft Access Driver (*.mdb, *.accdb)};" +
        r"Dbq=" + d)
    # OPEN CURSOR AND EXECUTE SQL
    cur = conn.cursor()
    a = ' * '
    b = '"AQry"'
    c = "SELECT" + a + "FROM " + b
    print(c)
    cur.execute(c)
    res = cur.execute(c)
    columnList = [tuple[0] for tuple in res.description]
    print(columnList)
    # OPEN CSV AND ITERATE THROUGH RESULTS
    with open("\\\\ent.core.company.com\mit-city01\City Public\Folder\FileName.csv", 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['Eval Date/Time', 'Date', 'Agent', 'User ID'])
        for counter, row in enumerate(cur.fetchall()):
            print(counter)
            writer.writerow(row)
    cur.close()
    conn.close()
```
