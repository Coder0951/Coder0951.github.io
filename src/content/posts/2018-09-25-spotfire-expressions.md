---
title: "Spotfire Expressions"
date: 2018-09-25
category: Spotfire
tags: [spotfire, visualization, analytics]
summary: "How to use Over Intersect Expression with Two variables to view a moving total."
---

# MovingTotal

---

## Problem

How to use Over Intersect Expression with Two variables to view a moving total.

```
    TimeSpan(0,Integer(Floor(Sum([AnswerWaitTimeSeconds])
    OVER (Intersect([Date],AllPrevious([Axis.Columns]))) / Sum([CallsAnswered])
    OVER (Intersect([Date],AllPrevious([Axis.Columns]))) / 3600)),Integer(Floor(Mod(Sum([AnswerWaitTimeSeconds])
    OVER (Intersect([Date],AllPrevious([Axis.Columns]))) / Sum([CallsAnswered])
    OVER (Intersect([Date],AllPrevious([Axis.Columns]))),3600) / 60)),Integer(Mod(Mod(Sum([AnswerWaitTimeSeconds])
    OVER (Intersect([Date],AllPrevious([Axis.Columns]))) / Sum([CallsAnswered])
    OVER (Intersect([Date],AllPrevious([Axis.Columns]))),3600),60)),0) as [Moving AWT],
    Time(TimeSpan(0,Integer(Floor(Sum([AnswerWaitTimeSeconds]) / Sum([CallsAnswered]) / 3600)),Integer(Floor(Mod(Sum([AnswerWaitTimeSeconds]) / Sum([CallsAnswered]),3600) / 60)),Integer(Mod(Mod(Sum([AnswerWaitTimeSeconds]) / Sum([CallsAnswered]),3600),60)),0)) as [AWT],
    Sum([CallsOffered]) OVER (Intersect([Date],AllPrevious([Axis.Columns]))) as [Moving Calls Offered],
    Sum([CallsOffered]) as [Offered],
```

# CountIF

---

## Problem

How to use CountIF , SumIF ect in Spotfire.

```
    Count(IF [Column] = x , [Column], Null)) 
    UniqueCount(IF [Column] = x , [Column], Null))
    Sum(IF [Column] = x , [Column], Null))
```

# HHMMSS

---

## Problem

Change integer into HH:MM:SS format.

```
    Time(0,Integer(Sum([HandleTime]) / Sum([CallsHandled]) / 60),Integer(((Sum([HandleTime]) / Sum([CallsHandled]) / 60) - Integer(Sum([HandleTime]) / Sum([CallsHandled]) / 60)) * 60),0)
```
