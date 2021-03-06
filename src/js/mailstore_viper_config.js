/*mailstore_viper_config.js*/
/*v0.01*/


/*
 This file contains all of the site-specific code for Mailstore.com.  This information may contain conversion events,
 */

//Starting the Snowplow tracking script
window.snowplow('newTracker', 'co', 's-threads.analytics.carbonite.com', {
    appId: 'mailstore-prod',
    platform: 'web',
    cookieDomain: ".mailstore.com",
    cookieName: "_holocron_"
});

window.snowplow('enableActivityTracking', 30, 30);
window.snowplow('enableLinkClickTracking');
window.snowplow('trackPageView', false, null);

 window.onerror = function(errorMsg, url, lineNumber){
     alert("Error found");
    window.snowplow("trackUnstructEvent", {
                schema : "iglu:com.carbonite/js_error/jsonschema/1-0-0",
                data : {
                    time_stamp: new Date(),
                    js_url: url,
                    line_number: lineNumber,
                    error_msg: errorMsg
                }
            })
    }


//Snowplow Conversions

//Trial Download Conversion Deutsch
if (viper.dom.pathname.indexOf("/de/mailstore-server-trial-start.aspx")>-1) {
    viper.igluEvent("trial_download", "1-0-0", {timeStamp: new Date()}, {locale: "Deutsch"}, {brand: "Mailstore", lob: "SMB", product: "Mailstore", product_level: "Server"});
}

//Trial Download Conversion English
if (viper.dom.pathname.indexOf("/en/mailstore-server-trial-start.aspx")>-1) {
    viper.igluEvent("trial_download", "1-0-0", {timeStamp: new Date()}, {locale: "English"}, {brand: "Mailstore", lob: "SMB", product: "Mailstore", product_level: "Server"});
}

//Quote Conversion Deutsch
if (viper.dom.pathname.indexOf("/de/mailstore-kaufen-angebot-thankyou.aspx")>-1) {
    viper.igluEvent("quote_requested", "1-0-0", {timeStamp: new Date()}, {locale: "Deutsch"}, {brand: "Mailstore", lob: "SMB", product: "Mailstore", product_level: "Server"});
}

//Quote Conversion English
if (viper.dom.pathname.indexOf("/en/mailstore-how-to-buy-quote-thankyou.aspx")>-1) {
    viper.igluEvent("quote_requested", "1-0-0", {timeStamp: new Date()}, {locale: "English"}, {brand: "Mailstore", lob: "SMB", product: "Mailstore", product_level: "Server"});
}

//Resource Download Deutsch
if (viper.dom.pathname.indexOf("/de/mailstore-server-thankyou-inbox.aspx")>-1) {
    viper.igluEvent("resource_download", "1-0-0", {timeStamp: new Date()}, {locale: "Deutsch"}, {brand: "Mailstore", lob: "SMB", product: "Mailstore", product_level: "Server"});
}

//Resource Download English
if (viper.dom.pathname.indexOf("/en/mailstore-server-thankyou-inbox.aspx")>-1) {
    viper.igluEvent("resource_download", "1-0-0", {timeStamp: new Date()}, {locale: "English"}, {brand: "Mailstore", lob: "SMB", product: "Mailstore", product_level: "Server"});
}

//Determining Tealium Environment and launching Tealium
(function () {
    if (viper.environment) {
    } else if ((!viper.environment) && (document.domain === "www.mailstore.com" || document.domain === "mailstore.com")) {
        viper.environment = "prod";
    } else if ((!viper.environment) && document.domain === "dev.mailstore.com") {
        viper.environment = "dev";
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
    //Requeue this task at the end of the execution queue to allow page to finish loading.
    setTimeout(viper.tealium, 500);
}());
