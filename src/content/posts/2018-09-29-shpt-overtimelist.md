---
title: "SharePoint OvertimeList"
date: 2018-09-29
category: Sharepoint
tags: [sharepoint, css, web-development]
summary: "Create a sign up list with a set number of seats per session."
---

# SharePoint OvertimeList

## Problem

Create a sign up list with a set number of seats per session.

## Solution

Two interconnected lists that update seat numbers

```
    =IF(Closed=TRUE,"Closed for registration",IF(RemainingSeats>0,"<a href='http://sitebuilder2/diabetes/Operations_Group/WFMPortal/Lists/Helpline%20OT%20Sign%20Up%20Attendees%20List/Item/newifs.aspx?List=7abad2c0%2Da4a1%2D4585%2D8214%2D69f7011d38ab&RootFolder=&Web=e9a06336%2D6c38%2D4070%2Daa35%2D924aeb8ff85c&meeting_id="&StaticID&"&Source=http://sitebuilder2/diabetes/Operations_Group/WFMPortal/Lists/Helpline%20OT%20Sign%20Up' onclick='OpenLandLRegistration("&StaticID&")'>Register</a>","Class is Full"))
```

```
    =IF(ISBLANK(Seats-FilledSeats),Seats,Seats-FilledSeats)
```

![](/images/SHPT1.png)

![](/images/ShPT2.png)

![](/images/ShPt3.png)
