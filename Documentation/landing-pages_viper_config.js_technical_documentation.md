###landing-pages_viper_config.js Technical Documentation###
####v0.01####
<br>

The purpose of this document is to provide an overall explanation of the following Javascript code and provide an explanation of each function and code block.
<br><br>

**Overview:**
This is version 0.01 of the landing-pages specific Viper Config JS helper file.  This file is used to contain and run all of the landing-pages site-specific code, such as lookup tables, page load code, event functions, etc... 


This first section is the call to launch the Snowplow Analytics tracker.

This section specifically sets the Snowplow variables

```
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
```

```
    window.snowplow('newTracker', 'co', 's-threads.analytics.carbonite.com', {
        appId: viper.sp_appId,
        platform: viper.sp_platform,
        cookieDomain: viper.sp_cookieDomain,
        cookieName: viper.sp_cookieName
    });
```
```
    window.snowplow('enableActivityTracking', 10, 15);
    window.snowplow('enableLinkClickTracking');
    window.snowplow('trackPageView', false, null);
```

This section sets up the blacklist for form and field tracking, and then enables form tracking in Snowplow

```
    var bl = {
        forms: {
            blacklist: []
        },
        fields: {
            blacklist: ['first_name', 'last_name']
        }
    };
```
```
    window.snowplow('enableFormTracking', bl);
```

This second section sets up the unstructured Snowplow event to track the final score on the Grader site.
    
```    
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
```

This third section is used to determine the Environment that will be used for Tealium, by using the Domain, URL, query string parameters and cookie values.  One the Environment is determined, this function fires the Tealium function decalred in the Viper file.

```
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
```