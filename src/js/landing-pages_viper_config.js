var landingPagep_version = "v0.02 : Thu Nov 05 2015 19:08:03 GMT-0800 (PST)";
/*
 This file contains all of the site-specific code for landing-pages.  This information may contain conversion events,
 */

//Starting the Snowplow tracking script
if (document.domain === "dev.pancommunications.com") {
    window.snowplow('newTracker', 'co', 's-threads.analytics.carbonite.com', {
        appId: 'smb-grader-dev',
        platform: 'web',
        cookieDomain: ".carbonite.com",
        cookieName: "viper-grader"
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
            window.snowplow("trackUnstructEvent", {
                schema: "iglu:com.carbonite/grader_score/jsonschema/1-0-0",
                data: {
                    timeStamp: new Date(),
                    backup_score: backupNum,
                    recovery_score: recoveryNum,
                    operations_score: continuousNum,
                    business_continuity_score: businessNum
                }
            });
        })();
    }
}

//Determining Tealium Environment and launching Tealium
(function () {
    if (viper.environment){
    } else if ((!viper.environment) && (document.domain === "www.pancommunications.com" || document.domain === "pancommunications.com")) {
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