###pardot_viper_config.js Technical Documentation###
####v0.01####
<br>

The purpose of this document is to provide an overall explanation of the following Javascript code and provide an explanation of each function and code block.
<br><br>

**Overview:**
This is version 0.01 of the Pardot specific Viper Config JS helper file.  This file is used to contain and run all of the Pardot site-specific code, such as lookup tables, page load code, event functions, etc... 


This first section is the call to launch the Snowplow Analytics tracker.

```
window.snowplow('newTracker', 'co', 's-threads.analytics.carbonite.com', {
 appId: 'pardot-prod',
 platform: 'web',
 cookieDomain: ".carbonite.com",
 cookieName: "_holocron_"
 });
```
```
 window.snowplow('enableActivityTracking', 30, 10);
 window.snowplow('enableLinkClickTracking');
 window.snowplow('trackPageView', false, null);
```

```
//Code to enable Form Tracking and enabling BlackLists for Form Tracking
var bl = {
    forms: {
        blacklist: []
    },
    fields: {
        blacklist: []
    }
};
window.snowplow('enableFormTracking', bl);
```

This second section of code is used to set a cooki named "catid" with the information found in the query string parameter called "catid".

```
if (viper.qp.catid){
    viper.setCookie("catid", viper.qp.catid);
}
```

This third section of code is used to populate the "value" parameter of hidden fields in Pardot forms.  This data is used to pass PCT values into the Pardot system.

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
if (viper.spCookieParams[1]) {
    if (document.getElementsByClassName("pct_user_id")[0]) {
        document.getElementsByClassName("pct_user_id")[0].firstElementChild.value = viper.spCookieParams[1];
    }
}
if (viper.spCookieParams[3]) {
    if (document.getElementsByClassName("pct_session_id")[0]) {
        document.getElementsByClassName("pct_session_id")[0].firstElementChild.value = viper.spCookieParams[3];
    }
}
```

This fourth section is used to determine the Environment that will be used for Tealium, by using the Domain, URL, query string parameters and cookie values.  One the Environment is determined, this function fires the Tealium function decalred in the Viper file.

```
(function () {
    if (viper.environment){
    }else{
        viper.environment = "prod";
    }

    //Check to see if a viper cookie exists and use its contents if it does
    if (viper.cp.viper) {
        viper.environment = viper.cp.viper;
    }

    //Check query string parameter for "viper=" to set environment
    if (viper.qp.viper) {
        viper.environment = viper.qp.viper;
    }
    //Set Cookie to the environment value
    if (viper.cp.viper !== viper.environment) {
        viper.setCookie("viper", viper.environment);
    }
    viper.tealium();
}());
```