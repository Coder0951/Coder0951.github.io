---
title: "Spotfire Date Between"
date: 2018-09-25
category: Spotfire
tags: [spotfire, visualization, analytics]
summary: "With a list of Start and End Times calculate how many people and how many hours in total by day/hour accounting for the day boundary."
---

# Spotfire Date Between

## Problem

With a list of Start and End Times calculate how many people and how many hours in total by day/hour accounting for the day boundary.

## Solution

Label the Cross day boundaries, Make a Duplicate Table with only the cross day boundaries. Run the following Equations on both tables. (On the Cross Day Table calculate and replace the start date with the end date for calculations to work) Combine the two tables.

Person| StartTime| EndTime
---|---|---
1| 01/01/1999 8:30 AM| 01/01/1999 10:00 AM

Calculate if During Present During Hour

Person| Date| 7AM| 8AM| 9AM| 10AM| 11AM
---|---|---|---|---|---|---
1| 01.01.1999| False| True| True| True| False

Calculate Time

Person| Date| 7AM| 8AM| 9AM| 10AM| 11AM
---|---|---|---|---|---|---
1| 01.01.1999| 0| 1800| 3600| 3600| 0

```
    12A
    case  
    when (DateTime([Shift Start])<=DateTime(Year([Local Day]),Month([Local Day]),Day([Local Day]),0,0,0,0))
    and (DateTime([Shift End])>=DateTime(Year([Local Day]),Month([Local Day]),Day([Local Day]),0,59,59,0)) then True
    when (Hour([Shift End])=0) and (Minute([Shift End])>0) and (Date([Local Day])=Date([Shift End])) then True
    when (Hour([Shift Start])=0) and (Date([Local Day])=Date([Shift Start])) then True
    else False
    end
```

Calculate Hours
```
    (if([12A]=True,case  
    when (Date([Local Day])=Date([Shift Start])) and (Hour([Shift Start])=0) and (Minute([Shift Start])>0) then
          DateDiff("ss",[Shift Start],DateTime(Year([Local Day]),Month([Local Day]),Day([Local Day]),0,0,0,0)) + 3600
    when DateDiff("ss",DateTime(Year([Local Day]),Month([Local Day]),Day([Local Day]),0,0,0,0),[Shift End])>3600 then
         3600
    else
```

For day boundary consider making a duplicate sheet with cross days only info.

```
    a[a==''] <- NA
    tempTable <-a[which(a[,1]>0),]
    d<-tempTable
    b <- rbind(tempTable,c)
```
