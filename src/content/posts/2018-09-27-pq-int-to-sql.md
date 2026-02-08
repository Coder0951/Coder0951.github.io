---
title: "Power Query Int to SQL"
date: 2018-09-27
category: Excel
tags: [excel, powerquery, vba]
summary: "Pass an integer to a SQL Query in Excel Power Query."
---

# Power Query Int to SQL

## Problem

Pass an integer to a SQL Query in Excel Power Query.

## Solution

Create A Table and Define the Name :

Parameter| Value
---|---
DaysBack| 30

Create a Blank Query and Create a Function

```
    (ParameterName as text) =>
    let
    ParamSource = Excel.CurrentWorkbook(){[Name="Parameters"]}[Content],
    ParamRow = Table.SelectRows(ParamSource, each ([Parameter] = ParameterName)),
    Value=
    if Table.IsEmpty(ParamRow)=true
    then null
    else Record.Field(ParamRow{0},"Value")
    in
    Value
```

On the Next Query you do you can insert the parameter at the top of the list :
```
    let
        DaysBack = fnGetParameter("DaysBack")
```

The SQL Query Would Look like:
```
    Where datediff(day,  convert(date,CONVERT(DATETIME,CONVERT(CHAR(8),DATEADD(ss,-(al.LoginDuration), al.LogoutDateTime),1)),0),Convert(date,GetDate(),0))  <= ' " & Number.ToText(DaysBack) & " '
```
