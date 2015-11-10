###pardot_viper_config.js Technical Documentation###
####v0.01####
<br>

The purpose of this document is to provide an overall explanation of the following Javascript code and provide an explanation of each function and code block.
<br><br>

Overview:
This is version 0.01 of the Pardot specific Viper Config JS helper file.  This file is used to contain and run all of the Pardot site-specific code, such as lookup tables, page load code, event functions, etc... 

This first section of code is used to set a cooki named "catid" with the information found in the query string parameter called "catid".

```
if (viper.qp.catid){
    viper.setCookie("catid", viper.qp.catid);
}
```

This second section of code is used to populate the "value" parameter of hidden fields in Pardot forms.  This data is used to pass PCT values into the Pardot system.

```
if (viper.qp.utm_medium){
    if (document.getElementsByClassName("pct_medium")[0]) {
        document.getElementsByClassName("pct_medium")[0].firstElementChild.value = viper.qp.utm_medium;
    }
}
if (viper.qp.utm_source){
    if (document.getElementsByClassName("pct_source")[0]) {
        document.getElementsByClassName("pct_source")[0].firstElementChild.value = viper.qp.utm_source;
    }
}
if (viper.qp.utm_campaign){
    if (document.getElementsByClassName("pct_placement_group")[0]) {
        document.getElementsByClassName("pct_placement_group")[0].firstElementChild.value = viper.qp.utm_campaign;
    }
}
if (viper.qp.utm_content){
    if (document.getElementsByClassName("pct_placement")[0]) {
        document.getElementsByClassName("pct_placement")[0].firstElementChild.value = viper.qp.utm_content;
    }
}
if (viper.qp.Category){
    if (document.getElementsByClassName("pct_categoryID")[0]) {
        document.getElementsByClassName("pct_categoryID")[0].firstElementChild.value = viper.qp.Category;
    }
}
if (viper.qp.Page_ID){
    if (document.getElementsByClassName("pct_pageID")[0]) {
        document.getElementsByClassName("pct_pageID")[0].firstElementChild.value = viper.qp.Page_ID;
    }
}
```