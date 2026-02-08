---
title: "Spotfire SQL DataFrames"
date: 2018-09-25
category: Spotfire
tags: [spotfire, visualization, analytics]
summary: "Spotfire joins are based on exact matches and out of the box is not capable of date/datetime comparison when adding columns from another table. How..."
---

# Spotfire SQL DataFrames

## Problem

Spotfire joins are based on exact matches and out of the box is not capable of date/datetime comparison when adding columns from another table. How do you join two tables based on a date range?

Example: I have a table of metrics of an Employee and they change departments. Their assignment is on separate table.

* * *

Example Table #1 :

ID| Date| Metric
---|---|---
1| 02/02/2008| 100
1| 02/02/2009| 120
1| 02/02/2010| 110

Example Table #2 :

ID| Assignment| FromDate| ToDate
---|---|---|---
1| Sales| 01/01/2000| 12/31/2009
1| Billing| 01/01/2010| 12/31/2065

* * *

## Solution

Utilize R Script sqldf library! ([Full](https://cran.r-project.org/web/packages/sqldf/sqldf.pdf) [Documentation](https://cran.r-project.org/web/packages/sqldf/sqldf.pdf))

```

    # Define t_Metrics and t_Assignment as Input Parameter

    # Define output as Output Parameter

    #Change Date(s) to Text for SqlDF

    t_Metrics$Date <- as.character(t_Metrics$Date)

    t_Assignment$ToDate <- as.character(t_Assignment$ToDate)

    t_Assignment$FromDate <- as.character(t_Assignment$FromDate)

    #Query To Combine All Data

    output <- sqldf(" Select m.ID,

                             m.Date,

                             m.Metric,

                             a.Assignment

                        From   t_Metrics m ,  t_Assignment a                    

                        Where  m.Date Between a.FromDate and a.ToDate

                                and a.ID= m.ID ")
                

```

Example Table #3

ID |  Date |  Metric |  Assignment
---|---|---|---
1 |  02/02/2008 |  100 |  Sales
1 |  02/02/2009 |  120 |  Sales
1 |  02/02/2010 |  110 |  Billing

* * *

Example in Spotfire :

  1. Register Data Function

     * ![](/images/SQLDF_1.png)

  2. Define Inputs

     * ![](/images/SQLDF_2.png)

  3. Both inputs an outputs

     * ![](/images/SQLDF_3.png)

  4. Run the Function to specify what data tables to use and what columns

     * ![](/images/SQLDF_6.png)

     * ![](/images/SQLDF_7.png)

  5. Final Product

     * ![](/images/SQLDF_8.png)
