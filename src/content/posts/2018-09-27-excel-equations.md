---
title: "Excel Equations"
date: 2018-09-27
category: Excel
tags: [excel, powerquery, vba]
summary: "Example of Bracket Equation"
---

# BracketIndexMatch

---

Example of Bracket Equation

```
    =IFERROR(INDEX(Pvt!$G1:$Z$5000,MATCH($F$3&$H5,Pvt!$A1:$A$5000&Pvt!$F1:$F$5000,0),MATCH(I$4,Pvt!$G$1:$Z$1,0)),"-")
```

# DefineRange Equation

---

Range OffSet for Dynamic Range

```
    =OFFSET(Sheet1!$A$1,0,0,COUNTA(Sheet1!$A:$A),COUNTA(Sheet1!$1:$1))
```
