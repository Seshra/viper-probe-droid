viper.landingPage_version = "v0.02 : Thu Nov 05 2015 19:08:03 GMT-0800 (PST)";
/*
 This file contains all of the site-specific code for landing-pages.  This information may contain conversion events,
 */

//Starting the Snowplow tracking script
if (viper.dom.domain === "dev.pancommunications.com") {
    viper.sp_appId = 'smb-grader-dev';
    viper.sp_platform = 'web';
    viper.sp_cookieDomain = ".businesscontinuitycalc.com";
    viper.sp_cookieName = "viper-grader";
}else if(viper.dom.domain.indexOf("businesscontinuitycalc.com")>-1) {
    viper.sp_appId = 'smb-grader-prod';
    viper.sp_platform = 'web';
    viper.sp_cookieDomain = ".businesscontinuitycalc.com";
    viper.sp_cookieName = "viper-grader";
}

    window.snowplow('newTracker', 'co', 's-threads.analytics.carbonite.com', {
        appId: viper.sp_appId,
        platform: viper.sp_platform,
        cookieDomain: viper.sp_cookieDomain,
        cookieName: viper.sp_cookieName
    });

    window.snowplow('enableActivityTracking', 10, 15);
    window.snowplow('enableLinkClickTracking');
    window.snowplow('trackPageView', false, null);

    var bl = {
        forms: {
            blacklist: []
        },
        fields: {
            blacklist: ['first_name', 'last_name']
        }
    };

    window.snowplow('enableFormTracking', bl);

    //code to extract grader scores and send them as an unstructured event
    if (location.pathname === "/score") {
        (function () {

            //extract scores from "score" page on Grader site
            var backupNum = document.getElementById("circleBackup").getAttribute("data-value").substring(0, 4) * 100;
            backupNum = parseInt(backupNum);
            var recoveryNum = document.getElementById("circleRecovery").getAttribute("data-value").substring(0, 4) * 100;
            recoveryNum = parseInt(recoveryNum);
            var continuousNum = document.getElementById("circleContinuous").getAttribute("data-value").substring(0, 4) * 100;
            continuousNum = parseInt(continuousNum);
            var businessNum = document.getElementById("circleBusiness").getAttribute("data-value").substring(0, 4) * 100;
            businessNum = parseInt(businessNum);

            //Snowplow Event Tracking
            viper.igluEvent("grader_score", "1-0-0", {timeStamp: new Date(), backup_score: backupNum, recovery_score: recoveryNum, operations_score: continuousNum, business_continuity_score: businessNum}, {}, {});

        })();
    }

//Code to check for utag_data object and addit if it does not exist
var utag_data = utag_data || {};

//Determining Tealium Environment and launching Tealium
(function () {
    if (viper.environment){
    } else if ((!viper.environment) && document.domain.indexOf("businesscontinuitycalc.com")>-1) {
        viper.environment = "prod";
    } else if ((!viper.environment) && document.domain === "dev.pancommunications.com") {
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
    viper.tealium();
}());