/*
 This file contains all of the site-specific code for landing-pages.  This information may contain conversion events,
 */

//Starting the Snowplow tracking script

 window.snowplow('newTracker', 'co', 's-threads.analytics.carbonite.com', {
 appId: 'smb-grader-dev',
 platform: 'web',
 cookieDomain: ".amazonaws.com",
 cookieName: "viper-grader"
 });

 window.snowplow('enableActivityTracking', 10, 15);
 window.snowplow('enableLinkClickTracking');
 window.snowplow('trackPageView', false, null);


//runs javascript and snowplow code on "score" page
if (location.pathname === "/viper-test-pages/score.html") {

    var bl = {
        forms: {
            blacklist: []
        },
        fields: {
            blacklist: ['first_name','last_name']
        }
    };

    window.snowplow('enableFormTracking', bl);

    //code to extract grader scores and send them as an unstructured event
    (function () {

        //extract scores from "score" page on Grader site

        var backupNum = document.getElementById("circleBackup").getAttribute("data-value").substring(0, 4) * 100;
        var recoveryNum = document.getElementById("circleRecovery").getAttribute("data-value").substring(0, 4) * 100;
        var continuousNum = document.getElementById("circleContinuous").getAttribute("data-value").substring(0, 4) * 100;
        var businessNum = document.getElementById("circleBusiness").getAttribute("data-value").substring(0, 4) * 100;

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