---
title: "Spotfire Look Up Separte Table"
date: 2018-09-25
category: Spotfire
tags: [spotfire, visualization, analytics]
summary: "Look up drill down information from a table with no relationships to another. I often aggregated data such as survey or quality that will have mult..."
---

# Spotfire Look Up Separte Table

## Problem

Look up drill down information from a table with no relationships to another. I often aggregated data such as survey or quality that will have multiple instances each day, each instances has multiple questions. Using transformations I can get the drilled down data to match with a daily aggregate but having the drill down from the Drilled Up information proved challenging.

Solutions:

Use a python script to store a list of uniqueconcatennated ID's in a document property when items are marked. Then use the list of values to use a R script merge to produce a table with the drill down for the list of values.

![](/images/LookUpList_1.gif)

Filter Counter

```
    output <- input
```

Grab Values From Table to Document Property
```
    from System.Collections.Generic import List
    from Spotfire.Dxp.Data import *
    from Spotfire.Dxp.Application.Visuals import VisualContent
    from Spotfire.Dxp.Data import RowSelection
    from Spotfire.Dxp.Data import DataValueCursor
    from Spotfire.Dxp.Data import DataManager
    from Spotfire.Dxp.Data import IndexSet
    dataTable = Document.ActiveDataTableReference
    rows = Document.ActiveFilteringSelectionReference.GetSelection(
        dataTable).AsIndexSet()
    vc = vis.As[VisualContent]()
    dataTable = vc.Data.DataTableReference
    for filter in Document.FilteringSchemes[Document.ActiveFilteringSelectionReference]:
        filteredRows = filter.FilteredRows
        marking = vc.Data.MarkingReference
    marking.SetSelection(RowSelection(rows), dataTable)
    # Create a cursor for the table column to get the values from.
    # Add a reference to the data table in the script.
    dataTable = Document.Data.Tables["AllPossible"]
    cursor = DataValueCursor.CreateFormatted(dataTable.Columns["SurveyID"])
    # Retrieve the marking selection
    markings = Document.ActiveMarkingSelectionReference.GetSelection(dataTable)
    # Create a List object to store the retrieved data marking selection
    markedata = List[str]()
    # Iterate through the data table rows to retrieve the marked rows
    for row in dataTable.GetRows(markings.AsIndexSet(), cursor):
        # rowIndex = row.Index ##un-comment if you want to fetch the row index into some defined condition
        value = cursor.CurrentValue
        if value <> str.Empty and value <> "(Empty)":
            markedata.Add(value)
    # Get only unique values
    valData = List[str](set(markedata))
    # Store in a document property
    yourVariableName = ', '.join(valData)
    Document.Properties["ListofValues"] = yourVariableName
    # print(yourVariableName)
    marking = Application.GetService[DataManager]().Markings[markingName]
    selectRows = IndexSet(dataTable.RowCount, False)
    marking.SetSelection(RowSelection(selectRows), dataTable)
```

R Script Create New Table
```
    #SurveyID , SurveyData - Inputs (Document Property, Table)
    #MyData - Output (Table)
        df <- read.table(text=SurveyID, sep=",")
    #Change to Table
        df <- t(df)
    #Change Column Name to Match Look up Column
        colnames(df)[1] <- "SurveyID"
    #Load Table
        df2 <- SurveyData
    #Merge Two DataFrames
        Mydata<- merge(df,df2)
```

  1. Set Document Property with Filtered Row Count (I added PersonID to the count to account for people with same number of rows)

![](/images/ValueLookUp_1.png)

  2. Set Input

![](/images/ValueLookUp_2.png)

  3. Set Output

![](/images/ValueLookUp_3.png)

  4. Add Script to Document Property

![](/images/ValueLookUp_4.png)

  5. Add Python Script to Get Values from Table to Document Property

![](/images/ValueLookUp_5.png)

  6. Register R function for New Table

![](/images/ValueLookUp_6.png)
