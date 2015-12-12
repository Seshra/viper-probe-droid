/*
 This file contains all of the site-specific code for main pages.  This information may contain conversion events
 */

//Starting the Snowplow tracking script

if (viper.dom.domain.indexOf("carbonite.com")>-1 && viper.dom.domain.indexOf("dev")===-1)){
    viper.sp_appId = 'main-prod';
    viper.sp_platform = 'web';
    viper.sp_cookieDomain = ".carbonite.com";
    viper.sp_cookieName = "_holocron_";
    viper.environment = viper.environment || "prod";
}else if (viper.dom.domain.indexOf("dev")>-1 || viper.dom.domain.indexOf("carboniteinc")>-1 || viper.dom.domain.indexOf("carbonitedev")>-1 || viper.dom.domain.indexOf("carbonitestage")>-1){
    viper.sp_appId = 'tealium-dev';
    viper.sp_platform = 'web';
    viper.sp_cookieDomain = ".carboniteinc.com";
    viper.sp_cookieName = "sp";
    viper.environment = viper.environment || "dev";
}else if (viper.url.indexOf("observepoint-test-pages")>-1){
    viper.sp_appId = 'observepoint-tests';
    viper.sp_platform = 'web';
    viper.sp_cookieDomain = ".carboniteinc.com";
    viper.sp_cookieName = "sp";
    viper.environment = viper.environment || "dev";
}else if(viper.dom.domain.indexOf("ww2")>-1){
    viper.sp_appId = 'main-prod2015';
    viper.sp_platform = 'web';
    viper.sp_cookieDomain = ".carbonite.com";
    viper.sp_cookieName = "_holocron_";
    viper.environment = viper.environment || "prod";
}else if(viper.dom.domain.indexOf(".de")>-1){
    viper.sp_appId = 'main-prod-de';
    viper.sp_platform = 'web';
    viper.sp_cookieDomain = ".carbonite.de";
    viper.sp_cookieName = "_holocron_";
    viper.environment = viper.environment || "prod";
}

//Fire Snowplow Tag
    window.snowplow('newTracker', 'co', 's-threads.analytics.carbonite.com', {
        appId: viper.sp_appId,
        platform: viper.sp_platform,
        cookieDomain: viper.sp_cookieDomain,
        cookieName: viper.sp_cookieName
    });

    window.snowplow('enableActivityTracking', 30, 10);
    window.snowplow('enableLinkClickTracking');
    window.snowplow('trackPageView', false, null);

/*
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


//Snowplow Conversions
//Trial Download - Personal
if (viper.dom.pathname.toLowerCase().indexOf("/install/download")>-1){
    viper.igluEvent("trial_download", "1-0-0", {timeStamp: new Date(),event_points: "80"}, {}, {brand: "Carbonite", lob: "Personal", product: "Personal Trial", product_level: "Trial"});
}
//Trial Download - SMB
if (viper.dom.url.toLowerCase().indexOf("account.carbonite.com/smb/dashboard") && viper.qp.newacct === 1){
    viper.igluEvent("trial_download", "1-0-0", {timeStamp: new Date(),event_points: "400"}, {}, {brand: "Carbonite", lob: "SMB", product: "SMB Trial", product_level: "Trial"});
}


//Determining Tealium Environment and launching Tealium
(function () {
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


//Process and send transaction data to Snowplow
if (viper.dom.pathname.toLowerCase("/buy/ordercomplete").indexOf("/buy/completeorder")>-1 || viper.dom.pathname.toLowerCase("/buy/confirmation").indexOf()>-1){
    if (viper.dom.pathname.indexOf("/buy/ordercomplete")>-1 || viper.dom.pathname.indexOf("/buy/completeorder")>-1){
        viper.spStore = "Direct";
    }
    if (viper.dom.pathname.indexOf("/buy/confirmation")>-1){
        viper.spStore = "Reseller";
    }

    typeof utag_data.trans_type == "string" ? [utag_data.trans_type] : utag_data.trans_type;

    if(utag_data.order_id && utag_data.skus.length > 1){
        utag_data.trans_type = utag_data.trans_type || [];
        for(var i=0; i<utag_data.skus.length; i++){
            if(typeof utag_data.trans_type[i] === "undefined" || utag_data.trans_type[i] === "")
                utag_data.trans_type[i] = "MultiSubscriptions";
        }
    }

    if(viper.cp.viper_order_id === utag_data.order_id){
        b._corder = "";
    }

    if (utag_data.order_id && utag_data.order_id !== ""){
        viper.setCookie("viper_order_id",utag_data.order_id);
    }

//mapping Commerce variables in to Viper
    viper.spOrderId = utag_data.order_id;
    viper.spStore = viper.spStore || "";
    viper.spOrderTotal = utag_data.transaction_total;
    viper.spOrderTax = "0.00";
    viper.spOrderShipping = "0.00";
    viper.spOrderCity = "";
    viper.spOrderState = "";
    viper.spOrderCountry = "";
    viper.spOrderCurrency = "USD";

//Adding Commerce Transaction
    if (utag_data.order_id) {
        window.snowplow('addTrans',
            viper.spOrderId,
            viper.spStore,
            viper.spOrderTotal,
            viper.spOrderTax,
            viper.spOrderShipping,
            viper.spOrderCity,
            viper.spOrderState,
            viper.spOrderCountry,
            viper.spOrderCurrency
        );
        for (var t = 0; t < utag_data.product_names.length; t++) {
            window.snowplow('addItem',
                viper.spOrderId,
                utag_data.skus[t],
                utag_data.product_names[t] || "",
                utag_data.trans_type[t] || "",
                utag_data.unit_price[t],
                utag_data.quantities[t]
            );
        }
        window.snowplow('trackTrans');
    }
}