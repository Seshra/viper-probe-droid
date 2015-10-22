//Starting the Snowplow tracking script
/*
 window.snowplow('newTracker', 'co', 's-threads.analytics.carbonite.com', {
 appId: 'mailstore-prod',
 platform: 'web',

 });
 window.snowplow('enableActivityTracking', 30, 30);
 window.snowplow('enableLinkClickTracking');
 window.snowplow('enableFormTracking');
 window.snowplow('trackPageView', false, null);
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