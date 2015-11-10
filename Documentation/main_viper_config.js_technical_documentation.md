###main_viper_config.js Technical Documentation###
####v0.01####
<br>

The purpose of this document is to provide an overall explanation of the following Javascript code and provide an explanation of each function and code block.
<br><br>

**Overview:**
This is version 0.01 of the Main specific Viper Config JS helper file.  This file is used to contain and run all of the Main site-specific code, such as lookup tables, page load code, event functions, etc... 


This first section is to set the specific parameters for Snowplow on different pages/sites, and then launch the Snowplow Analytics tracker.

```
if (viper.dom.domain.indexOf(carbonite.com)>-1 && (viper.dom.domain.indexOf("dev")===-1 || viper.dom.domain.indexOf("carboniteinc")===-1)){
    viper.sp_appId = 'main-prod';
    viper.sp_platform = 'web';
    viper.sp_cookieDomain = ".carbonite.com";
    viper.sp_cookieName = "_holocron_";
}else if (viper.dom.domain.indexOf("dev")>-1 || viper.dom.domain.indexOf("carboniteinc")>-1 || viper.dom.domain..indexOf("carbonitedev")>-1){
    viper.sp_appId = 'tealium-dev';
    viper.sp_platform = 'web';
    viper.sp_cookieDomain = ".carboniteinc.com";
    viper.sp_cookieName = "sp";
}else if (viper.url.indexOf("observepoint-test-pages")>-1){
    viper.sp_appId = 'observepoint-tests';
    viper.sp_platform = 'web';
    viper.sp_cookieDomain = ".carboniteinc.com";
    viper.sp_cookieName = "sp";
}else if(viper.dom.domain.indexOf("ww2")>-1){
    viper.sp_appId = 'main-prod2015';
    viper.sp_platform = 'web';
    viper.sp_cookieDomain = ".carbonite.com";
    viper.sp_cookieName = "_holocron_";
}else if(viper.dom.domain.indexOf(".de")>-1){
    viper.sp_appId = 'main-prod-de';
    viper.sp_platform = 'web';
    viper.sp_cookieDomain = ".carbonite.com";
    viper.sp_cookieName = "_holocron_";
}
```
```
//Fire Snowplow Tag{
    window.snowplow('newTracker', 'co', 's-threads.analytics.carbonite.com', {
        appId: viper.sp_appId,
        platform: viper.sp_platform,
        cookieDomain: viper.sp_cookieDomain,
        cookieName: viper.sp_cookieName
    });
```
```
    window.snowplow('enableActivityTracking', 30, 10);
    window.snowplow('enableLinkClickTracking');
    window.snowplow('trackPageView', false, null);

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

This second section is used to determine the Environment that will be used for Tealium, by using the Domain, URL, query string parameters and cookie values.  Once the Environment is determined, this function fires the Tealium function decalred in the Viper file.

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