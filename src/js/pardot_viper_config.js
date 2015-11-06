/*
 This file contains all of the site-specific code for Mailstore.com.  This information may contain conversion events,
 */

//Starting the Snowplow tracking script
 window.snowplow('newTracker', 'co', 's-threads.analytics.carbonite.com', {
 appId: 'pardot-prod',
 platform: 'web',
 cookieDomain: ".carbonite.com",
 cookieName: "_holocron_"
 });

 window.snowplow('enableActivityTracking', 30, 30);

 window.snowplow('enableLinkClickTracking');
 window.snowplow('trackPageView', false, null);

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
*/


//code to extract catid from href query string an place in a cookie
if (viper.qp.catid) {
    viper.setCookie("catid", viper.qp.catid);
}

//code to inject information into Hidden Form Field
if (viper.qp.utm_medium) {
    if (document.getElementsByClassName("pct_medium")[0]) {
        document.getElementsByClassName("pct_medium")[0].firstElementChild.value = viper.qp.utm_medium;
    }
}
if (viper.qp.utm_source) {
    if (document.getElementsByClassName("pct_source")[0]) {
        document.getElementsByClassName("pct_source")[0].firstElementChild.value = viper.qp.utm_source;
    }
}
if (viper.qp.utm_campaign) {
    if (document.getElementsByClassName("pct_placement_group")[0]) {
        document.getElementsByClassName("pct_placement_group")[0].firstElementChild.value = viper.qp.utm_campaign;
    }
}
if (viper.qp.utm_content) {
    if (document.getElementsByClassName("pct_placement")[0]) {
        document.getElementsByClassName("pct_placement")[0].firstElementChild.value = viper.qp.utm_content;
    }
}
if (viper.qp.Category) {
    if (document.getElementsByClassName("pct_categoryID")[0]) {
        document.getElementsByClassName("pct_categoryID")[0].firstElementChild.value = viper.qp.Category;
    }
}
if (viper.qp.Page_ID) {
    if (document.getElementsByClassName("pct_pageID")[0]) {
        document.getElementsByClassName("pct_pageID")[0].firstElementChild.value = viper.qp.Page_ID;
    }
}

//Determining Tealium Environment and launching Tealium
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