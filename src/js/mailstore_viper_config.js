/*mailstore_viper_config.js*/
/*v0.01*/


/*Snowplow
v1.0
*/

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
if (~viper.dom["pathname"].indexOf("/de/mailstore-server-trial-start.aspx")) {
    window.snowplow("trackUnstructEvent", {
            schema: "iglu:com.carbonite/trial_download/jsonschema/1-0-0",
            data: {
                timeStamp: new Date()
            }
        },
        [{
            schema: "iglu:com.carbonite/user/jsonschema/1-0-0",
            data: {
                locale: "Deutsch"
            }
        },
            {
                schema: "iglu:com.carbonite/product/jsonschema/2-0-0",
                data: {
                    brand: "Mailstore",
                    lob: "SMB",
                    product: "Mailstore",
                    product_level: "Server"
                }
            }]
    )
};

//Trial Download Conversion English
if (~viper.dom["pathname"].indexOf("/en/mailstore-server-trial-start.aspx")){
    window.snowplow("trackUnstructEvent", {
            schema : "iglu:com.carbonite/trial_download/jsonschema/1-0-0",
            data : {
                timeStamp: new Date()
            }
        },
        [{
            schema: "iglu:com.carbonite/user/jsonschema/1-0-0",
            data: {
                locale: "English"
            }
        },
            {
                schema: "iglu:com.carbonite/product/jsonschema/2-0-0",
                data: {
                    brand: "Mailstore",
                    lob: "SMB",
                    product: "Mailstore",
                    product_level: "Server"
                }
            }]
    )
};

//Quote Conversion Deutsch
if (~viper.dom["pathname"].indexOf("/de/mailstore-kaufen-angebot-thankyou.aspx")){
    window.snowplow("trackUnstructEvent", {
            schema : "iglu:com.carbonite/quote_requested/jsonschema/1-0-0",
            data : {
                timeStamp: new Date()
            }
        },
        [{
            schema: "iglu:com.carbonite/user/jsonschema/1-0-0",
            data: {
                locale: "Deutsch"
            }
        },
            {
                schema: "iglu:com.carbonite/product/jsonschema/2-0-0",
                data: {
                    brand: "Mailstore",
                    lob: "SMB",
                    product: "Mailstore",
                    product_level: "Server"
                }
            }]
    )
};

//Quote Conversion English
if (~viper.dom["pathname"].indexOf("/en/mailstore-how-to-buy-quote-thankyou.aspx")){
    window.snowplow("trackUnstructEvent", {
            schema : "iglu:com.carbonite/quote_requested/jsonschema/1-0-0",
            data : {
                timeStamp: new Date()
            }
        },
        [{
            schema: "iglu:com.carbonite/user/jsonschema/1-0-0",
            data: {
                locale: "English"
            }
        },
            {
                schema: "iglu:com.carbonite/product/jsonschema/2-0-0",
                data: {
                    brand: "Mailstore",
                    lob: "SMB",
                    product: "Mailstore",
                    product_level: "Server"
                }
            }]
    )
};

//Resource Download Deutsch
if (~viper.dom["pathname"].indexOf("/de/mailstore-server-thankyou-inbox.aspx")){
    window.snowplow("trackUnstructEvent", {
            schema : "iglu:com.carbonite/resource_download/jsonschema/1-0-0",
            data : {
                timeStamp: new Date()
            }
        },
        [{
            schema: "iglu:com.carbonite/user/jsonschema/1-0-0",
            data: {
                locale: "Deutsch"
            }
        },
            {
                schema: "iglu:com.carbonite/product/jsonschema/2-0-0",
                data: {
                    brand: "Mailstore",
                    lob: "SMB",
                    product: "Mailstore",
                    product_level: "Server"
                }
            }]
    )
};

//Resource Download English
if (~viper.dom["pathname"].indexOf("/en/mailstore-server-thankyou-inbox.aspx")){
    window.snowplow("trackUnstructEvent", {
            schema : "iglu:com.carbonite/resource_download/jsonschema/1-0-0",
            data : {
                timeStamp: new Date()
            }
        },
        [{
            schema: "iglu:com.carbonite/user/jsonschema/1-0-0",
            data: {
                locale: "English"
            }
        },
            {
                schema: "iglu:com.carbonite/product/jsonschema/2-0-0",
                data: {
                    brand: "Mailstore",
                    lob: "SMB",
                    product: "Mailstore",
                    product_level: "Server"
                }
            }]
    )
};