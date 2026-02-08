---
title: "Spotfire SideDrawer"
date: 2018-09-25
category: Spotfire
tags: [spotfire, visualization, analytics]
summary: "Normal views of the Dashboard are limited by screen size."
---

# Spotfire SideDrawer

## Problem

Normal views of the Dashboard are limited by screen size.

## Solution

Use the Javascript API to display multiple pages on a single Webpage. Also utilize addition HTML/Js to have a sidedrawer for Filters.

![](/images/SideBarNavSpotfire.gif)

```
    <!DOCTYPE html>
    <html>
    <head>
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <meta content="utf-8" http-equiv="encoding">
        <meta http-equiv="X-UA-Compatible" content="IE=10" />
        <title id="onetidTitle">Agent Metrics</title>
        <script type="text/javascript" src="https://spotfire-next.cloud.tibco.com/spotfire/wp/render/qpmxFRzaXJZBlrkOf0/GetJavaScriptApi.ashx?Version=7.5"></script>
        <Style>
            div {border: 1px none;padding: 00px;resize: both; overflow-y:hidden;}
                #ContentSideNave { padding:0px; margin:0 auto; width: 100%;height:2000px }
                #Content1  { padding:0px; margin:0 auto; width: 100%;height:450px }
                #Content2 { padding:0px; margin:0 auto; width: 100%;height:450px }
                #Content3 { padding:0px; margin:0 auto; width: 100%;height:400px }
                #Content4 { padding:0px; margin:0 auto; width: 100%;height:790px }
                #Availability { padding:0px; margin:0 auto; width: 100%;height:350px }
                table {font-family: effra, sans-serif; border-collapse: collapse;width: 100%;}
                .sidenav { height: 900px; width: 0;
                    position: fixed; z-index: 1;
                    top: 0;  left: 0; background-color: black;
                    overflow-x: hidden; transition: 0.5s;
                    padding-top: 60px;
                    overflow-y: visbile; }
                .sidenav a {padding: 8px 8px 8px 32px;
                            text-decoration: none; font-size: 25px;
                            color: #818181; display: block;transition: 0.3s;}
                .sidenav a:hover {color: #f1f1f1;}
                .sidenav .closebtn {position: absolute;top: 0;right: 25px;font-size: 36px; margin-left: 50px;}
                .navbar {overflow: hidden; background-color: #C9C9C9;
                        position: fixed; top: 0; width: 100%;}
                .navbar a {float: left; display: block;
                            color: #f2f2f2; text-align: center;
                            padding: 14px 16px; text-decoration: none; font-size: 17px;}
                .navbar a:hover {background: #ddd;color: black;}
            </style>
        <script>
            var c_serverUrl = "https://spotfire-next.cloud.tibco.com/spotfire/wp/";
                    var c_analysisPath = "/Users/PathToDXP";
                    var c_parameters = "";  //Optional configuration block
                    var customization = new spotfire.webPlayer.Customization()  //Optional configuration settings
                    var app;
                    var c_reloadAnalysisInstance = true;
                    window.onload = function()
                    {customization.showDodPanel = false;customization.showStatusBar = false;customization.showToolBar = false
                    customization.showPageNavigation = false;customization.showClose = false;customization.showAnalysisInfo = false;customization.showExportFile = false;
                    customization.showExportVisualization = false;customization.showUndoRedo = false;customization.showFilterPanel = false;
                    app = new spotfire.webPlayer.Application(c_serverUrl, customization, c_analysisPath, c_parameters, c_reloadAnalysisInstance);
                    //Variables for each Page
                    var viewOne2 = app.openDocument("Content1", "Content1", customization);
                    var viewOne = app.openDocument("ContentSideNave", "ContentSideNave", customization);
                    var viewOne1 = app.openDocument("Content2", "Content2", customization);
                    var viewOne3 = app.openDocument("Content3", "Content3", customization);
                    var viewOne4 = app.openDocument("Content4", "Content4", customization);
                    }
                </script>
    </head>
    <body style="background-color:#C9C9C9;">
        <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <div id="ContentSideNave"> </div>
        </div>
        <div class="navbar">
            <span style="font-size:25px;cursor:pointer" onclick="openNav()">&#9776; Filters</span>
        </div>
        <script>
            function openNav() {
                        document.getElementById("mySidenav").style.width = "450px";
                        document.getElementById("main").style.marginLeft = "450px";
                        document.getElementById("mySidenav").style.overflowY = "scroll";
                    }
                    function closeNav() {
                        document.getElementById("mySidenav").style.width = "0";
                        document.getElementById("main").style.marginLeft= "0";
                        document.getElementById("mySidenav").style.overflowY = "hidden";
                    }
                </script>
        <div id="main">
            
    <h1 align="center"><font color="Black">Text</font></h1>
            <p>
                <font color="White">Text</font>
            </p>
                <h2><font color="Black">text</font></h2>
                <div id="Content1"></div>
                <h2><font color="Black">Text</font></h2>
                <div id="Content2"></div>
                <h2><font color="Black">Text</font></h2>
                <p>
                    <font color="Black">Text</font>
                </p>
                <div id="Content3"></div>
                <!--    <h2><font color="Black">Text</font></h2>
            <div id="Content4"></div> -->
                
           </div>
    </body>
    </html>
```
