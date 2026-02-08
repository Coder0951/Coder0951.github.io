---
title: "SharePoint CSSFile"
date: 2018-09-29
category: Sharepoint
tags: [sharepoint, css, web-development]
summary: "Code snippets and solutions"
---

# SharePoint CSSFile

Custom Site CSS

```
    /*   */ #s4-leftpanel {display:none;}
    .s4-ca     {margin-left:0px!important;}
    BODY #s4-leftpanel-content{background-color:transparent}
    /*#SRSB {display:none}*/
    .s4-help {DISPLAY: none !important}
    .s4-titletext{DISPLAY: none !important}
    .s4-titlelogo{text-align: Left; }
    .s4-socialdata-notif{DISPLAY: none !important}
    .s4-title{background: #004379;
        
    }
    .ms-cui-topBar2{border-bottom-color:#004379;
    }
    .ms-cui-TabRowRight{DISPLAY: none !important}
    BODY #s4-ribboncont{background: #004379}
        /*Quick Launch Update*/
        <style>
        .s4-ql UL.root UL {
            MARGIN-BOTTOM: 0px
        }
        .s4-ql UL.root > LI > .menu-item {
            PADDING-BOTTOM: 1px; MIN-HEIGHT: 30px; BACKGROUND: url(http://sitebuilder2/diabetes/Operations_Group/WFMPortal/PublishingImages/qlmenu.png) no-repeat 0px -10px; FONT-SIZE: 1em; PADDING-TOP: 1px
        }
        .s4-ql UL.root UL > LI > A {
            PADDING-BOTTOM: 1px; MIN-HEIGHT: 30px; BACKGROUND: url(http://sitebuilder2/diabetes/Operations_Group/WFMPortal/PublishingImages/qlmenu.png) no-repeat 0px -10px; PADDING-TOP: 1px
        }
        .s4-ql UL.root > LI > .menu-item:hover {
            BACKGROUND: url(http://sitebuilder2/diabetes/Operations_Group/WFMPortal/PublishingImages/qlmenu.png) no-repeat 0px -50px; TEXT-DECORATION: none
        }
        .s4-ql UL.root UL > LI > A:hover {
            BACKGROUND: url(http://sitebuilder2/diabetes/Operations_Group/WFMPortal/PublishingImages/qlmenu.png) no-repeat 0px -50px; TEXT-DECORATION: none
        }
        .menu-vertical .menu-item-text {
            TEXT-TRANSFORM: uppercase; COLOR: white; FONT-SIZE: 1em; FONT-WEIGHT: bold; PADDING-TOP: 5px
        }</style>
        
        
        
        
        
        
    /* Navigation list */
    .s4-tn{
    background-color:#004379;
    padding:0px; margin:0px;
    }
    /* Global navigation */
    .s4-tn li.static > .menu-item{
    color:#fff; white-space:nowrap;
    border:1px solid transparent;
    padding:4px 10px;
    background-color:#004379;
    line-height:25px;
    height:28px;
    }
    /* Hover */
    .s4-tn li.static > a:hover{
    background:url("/_layouts/Images/selbg.png") repeat-x left top;
    background-color:#0087C1;
    color:#fff; text-decoration:none;
    }
    /* Selected */
    .s4-toplinks .s4-tn a.selected{
    background:url("/_layouts/Images/selbg.png") repeat-x left top;
    background-color:#0087C1;
    color:#fff; text-decoration:none;
    border:1px transparent solid;
    padding-right:10px;
    padding-left:10px;
    margin:0px;
    }
    /* Position for search */
    .s4-search{
    padding-top:7px !important;
    }
    /* Remove dotted outlines */
    a:hover, a:active, a:focus  { outline:none }
    /*Change Color of Remainding Nav*/
    .s4-toplinks{background-color:#004379;}
    /*Remove Folder Break Crum*/
    .s4-breadcrumb-anchor{display:none;}
    /*Browse Tab Color and Border*/
    .ms-browseTab.ms-cui-tt-s >
    a.ms-cui-tt-a{
    /* [ReplaceColor(themeColor:"Light2")] */
    background-color:#004379;
    /* [ReplaceColor(themeColor:"Dark2")] */
    color:#fff !important;border-color:#004379;}
      /* Removes Site Actions Button Leaving the Drop Down Arrow*/
    .ms-siteactionsmenuinner .ms-menu-a,.ms-siteactionsmenuhover .ms-menu-a{
    display:none;
    }
    /* Removes Edit Button , Use the Drop Down Arrow to Edit Page*/
    .s4-breadcrumb-anchor,.ms-qatbutton{
    display:none;
    }
    /* Global Menu Drop Down Hover*/
    .s4-tn li.dynamic >
    a:hover{
    Background-color:#004379;Color:#fff}
    /* Web parts */
    /*rounded corners to web part header */
    .ms-WPHeader td { background: url(http://sitebuilder2/diabetes/Operations_Group/WFMPortal/PublishingImages/BorderRepeating_Blue.png) repeat-x; border-bottom: none !important;  }
    .ms-WPHeader td.ms-wpTdSpace { background: url(http://sitebuilder2/diabetes/Operations_Group/WFMPortal/PublishingImages/BorderCorners_Blue.jpg) top right; }
    .ms-WPHeader td:first-child.ms-wpTdSpace { background-position: top left; }
    .ms-WPHeader h3, .ms-WPHeader h3 a { color: #fff; }
    .ms-WPHeaderTdMenu { border: none !important; }
    .s4-wpcell:hover .ms-WPHeader .ms-WPHeaderTdMenu:hover { background: #c3e298; }
    .ms-dialog body #s4-workspace {padding:5px;overflow:auto !important;}
    .ms-dialog body #s4-ribbonrow {position:relative;}
    .ms-dialog #isb-wrapper {margin:5px;}
    /*
    BODY #s4-topheader2{border-top:#004379
    }
    /* Hide the ribbon when not in use
        .s4-ribbonrowhidetitle {
            display: none;
        }
        /* Show the ribbon on list and library view pages at all times
        form[action*="/Lists/"] .s4-ribbonrowhidetitle,
        form[action*="/Forms/"] .s4-ribbonrowhidetitle {
            display: inherit;
        }
        
        */
        
        
         
```
