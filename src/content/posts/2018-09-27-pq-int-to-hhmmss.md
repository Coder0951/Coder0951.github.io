---
title: "Power Query Int to Time Format"
date: 2018-09-27
category: Excel
tags: [excel, powerquery, vba]
summary: "Pass an integer to a SQL Query in Excel Power Query."
---

# Power Query Int to Time Format

## Problem

Pass an integer to a SQL Query in Excel Power Query.

## Solution

How to Calculate Duration by Interval (IE : 10/3 = 3 instead of 3.3333) to calculate seconds without decimals.

```
      #"Added Custom" = Table.AddColumn(Source, "AWTMeasure", each if [CallsAnswered] = 0 then 0  else [AnswerWaitTimeSeconds]/[CallsAnswered]),
        #"Added Custom1" = Table.AddColumn(#"Added Custom", "Custom", each Text.From([AWTMeasure])),
        #"Changed Type1" = Table.TransformColumnTypes(#"Added Custom1",{{"Custom", type text}}),
        #"Added Custom2" = Table.AddColumn(#"Changed Type1", "Custom.1", each if [CallsAnswered] = 0 then "0"
    else if Text.PositionOf([Custom],".") > 0 then
    Text.Start([Custom],Text.PositionOf([Custom],".")) else
    [Custom]),
        #"Changed Type2" = Table.TransformColumnTypes(#"Added Custom2",{{"Custom.1", Int64.Type}}),
        AWT = Table.AddColumn(#"Changed Type2", "AWT", each [Custom.1] / (60*60*24)),
```
