---
title: "Power Query Relative Date"
date: 2018-09-27
category: Excel
tags: [excel, powerquery, vba]
summary: "Find Today and Yesterday in Excel Power Query"
---

# Power Query Relative Date

## Problem

Find Today and Yesterday in Excel Power Query

Live Day
```
    if [LoginDate] = List.Max(#"Expanded Fiscal"[LoginDate]) then "TRUE" else "FALSE"
```

Previous Day
```
    if [LoginDate] =Date.AddDays(List.Max(#"Expanded Fiscal"[LoginDate]),-1) then "TRUE" else "FALSE"
```
