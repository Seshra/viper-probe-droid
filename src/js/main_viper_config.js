/*main_viper_config.js*/
/*v0.01*/


/*Snowplow
v1.0
*/

/*
 This file contains all of the site-specific code for Carbonite.com.  This information may contain conversion events,
 */

//Starting the Snowplow tracking script

window.snowplow('newTracker', 'co', 's-threads.analytics.carbonite.com', {
appId: 'observepoint-tests',
platform: 'web',
cookieDomain: ".carbonite.com",
cookieName: "_holocron_"
});

 window.snowplow('enableActivityTracking', 30, 30);
 window.snowplow('enableLinkClickTracking');
 window.snowplow('trackPageView', false, null);

 window.onerror = function(errorMsg, url, lineNumber){
    window.snowplow("trackUnstructEvent", {
                schema : "iglu:com.carbonite/js_error/jsonschema/1-0-0",
                data : {
                    timeStamp: new Date(),
                    js_url: url,
                    line_number: lineNumber,
                    error_msg: errorMsg
                }
            })
    }


//Snowplow Conversions

//Trial Download Conversion OP Consumer
if (~viper.dom["pathname"].indexOf("observepoint-test-pages/trial_page_consumer")) {
    window.snowplow("trackUnstructEvent", {
            schema: "iglu:com.carbonite/trial_download/jsonschema/1-0-0",
            data: {
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
                    brand: "Test",
                    lob: "Test",
                    product: "OP Test",
                    product_level: "Personal Test"
                }
            }]
    )
};

//Trial Download Conversion OP SMB
if (~viper.dom["pathname"].indexOf("observepoint-test-pages/trial_page_smb")){
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
                    brand: "Test",
                    lob: "Test",
                    product: "OP Test",
                    product_level: "SMB Test"
                }
            }]
    )
};