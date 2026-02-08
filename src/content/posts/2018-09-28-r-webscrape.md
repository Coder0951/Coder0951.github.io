---
title: "R WebScrape"
date: 2018-09-28
category: R Script
tags: [r, statistics, data-analysis]
summary: "Webscrape Tables of information , combine and ensure no duplicates."
---

# R WebScrape

## Problem

Webscrape Tables of information , combine and ensure no duplicates.

## Solution

```
    library(XML)
    library(RCurl)
    theurl1 <- getURL("https://Website.com/",.opts = list(ssl.verifypeer = TRUE) )
    theurl2 <- getURL("https://Website.com/",.opts = list(ssl.verifypeer = TRUE) )
    theurl3 <- getURL("https://Website.com/",.opts = list(ssl.verifypeer = TRUE) )
    doc1 = htmlParse(theurl1)
    doc2 = htmlParse(theurl2)
    doc3 = htmlParse(theurl3)
    tableNodes1 = getNodeSet(doc1, "//table")
    tableNodes2 = getNodeSet(doc2, "//table")
    tableNodes3 = getNodeSet(doc3, "//table")
    tables1 <- readHTMLTable(tableNodes1[[2]],colClasses = c("character","factor","factor",
                                                             "numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric"))
    tables2 <- readHTMLTable(tableNodes2[[2]],colClasses = c("character","factor","factor",
                                                             "numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric"))
    tables3 <- readHTMLTable(tableNodes3[[2]],colClasses = c("character","factor","factor",
                                                             "numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric","numeric"))                                              
    Join1 <- rbind(tables1, tables2)
    Join2 <- rbind(Join1, tables3)
    tables <- Join2[!duplicated(Join2),]
    tables
```
