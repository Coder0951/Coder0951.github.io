---
title: "Spotfire Accordion Menu"
date: 2018-09-25
category: Spotfire
tags: [spotfire, visualization, analytics]
summary: "Create a simplified Filtering Panel in a Text Area. Multiple spotfire controls in a jquery accordion. Some filter controls have some odd have some ..."
---

# Spotfire Accordion Menu

## Problem

Create a simplified Filtering Panel in a Text Area. Multiple spotfire controls in a jquery accordion. Some filter controls have some odd have some sizing issues and some Js is needed to ensure list boxes display correctly once deployed to webplayer.

## Solution

Use a Text Area and edit the HTML , Add Js for an accordion effect to save space.

Example #1 :

![](/images/SpotfireAccordian1.png)

Example #2 :

![](/images/SpotfireAccordian2.png)

* * *

**HTML Script :**
```
    <script src='//cdn.muicss.com/mui-0.4.6/js/mui.js'></script>
    ###First Control
    <p> ###Rest Button </p>
    <h1>Large Header</h1>
    <a style='text-align:left;color:Black'>label_1</a>
    ###DROP DOWN MENU
    <a style='text-align:left;color:Black'>label_2</a>
    ###DROP DOWN MENU
    <H2>Mid Header</H2>
    <div>
        <a style='text-align:left;color:Black'>Label_1</a>
        <p style='text-align:left;color:black'> ###Filter </p>
        <a style='text-align:left;color:Black'>Label_2</a>
        <p style='text-align:left;color:black'> ###Filter </p>
        <a style='text-align:left;color:Black'>Label_3</a>
        <p style='text-align:left;color:black'> ###Filter </p>
        <hr>
        </hr>
        <!--Begin Accordain-->
        <h1>Large Header</h1>
        <div id="accordion">
            <H3>Accordion Header 1</H3>
            <div>
                <p style='text-align:left;color:Black'>Label_1
                    <hr>###Filter</hr>
                </p>
                <p style='text-align:left;color:Black'>Label_2
                    <hr>###Filter</hr>
                </p>
            </div>
            <H3>Accordion Header 2</H3>
            <div>
                <p style='text-align:left;color:Black'>Label_1
                    <hr>###Filter</hr>
                </p>
                <p style='text-align:left;color:Black'>Label_2
                    <hr>###Filter</hr>
                </p>
            </div>
            <h3>Accordion Header 3</h3>
            <div>
                <p style='text-align:left;color:Black'>Label_1
                    <hr>###Filter</hr>
                </p>
                <p style='text-align:left;color:Black'>Label_2
                    <hr>###Filter</hr>
                </p>
            </div>
            <h3>Accordion Header 4</h3>
            <div>
                <p style='text-align:left;color:Black'>Label_1
                    <hr>###Filter</hr>
                </p>
                <p style='text-align:left;color:Black'>Label_2
                    <hr>###Filter</hr>
                </p>
            </div>
        </div>
    </div>
    ###Filter ###Filter
```

**Js**
```
        $("#accordion").accordion({
        active:false,
        collapsible:true,
        beforeActivate:function(event, hr ){
            $(".sf-input-with-placeholder").width("173px");
            $(".ListContainer").width("200px");
            $(".ListContainerScroll").width("194px");
            $(".Image").css("left","197px");        
            $(".sfc-scrollable").width("192px");
            $(".ListContainerScroll .HorizontalScrollbarContainer").width("178px");
            $(".ListContainerScroll .VerticalScrollbarContainer").css("left","180px");
            $(".ListContainerScroll .VerticalScrollbarContainer").css("top","0px");
            $(".sf-element-list-box .ScrollArea").width("178px");
            $(".ListItems .sf-element-list-box-item").width("166px");
        }
    });
    $("body").append("<style>\
    .ui-accordion-header{font-size:14px;font-weight:bold;color:Black}\
    .ui-accordion-content{font-size:10px;background:#C9C9C9;}\
    </style>")
            $(".sf-input-with-placeholder").width("173px");
            $(".ListContainer").width("200px");
            $(".ListContainerScroll").width("194px");
            $(".Image").css("left","197px");        
            $(".sfc-scrollable").width("192px");
            $(".ListContainerScroll .HorizontalScrollbarContainer").width("178px");
            $(".ListContainerScroll .VerticalScrollbarContainer").css("left","180px");
            $(".ListContainerScroll .VerticalScrollbarContainer").css("top","0px");
            $(".sf-element-list-box .ScrollArea").width("178px");
            $(".ListItems .sf-element-list-box-item").width("166px");
```
