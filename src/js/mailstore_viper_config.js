/*mailstore_viper_config.js*/
/*v0.01*/


/*Snowplow
v1.0
This file contains all of the site-specific code for Mailstore.com.  This information may contain conversion events,
*/

//Snowplow Conversions

    //Trial Download Conversion
    if (~viper.dom["pathname"].indexOf("/de/mailstore-server-trial-start.aspx")){
        window.snowplow("trackUnstructEvent", [{
                schema : "iglu:com.carbonite/event/trial_download/jsonschema/1-0-0",
                data : {
                    timeStamp: new Date()
                }
            },
            {
                schema: "iglu:com.carbonite/context/user/jsonschema/1-0-0",
                data: {
                    locale: "German"
                }
            },
            {
                schema: "iglu:com.carbonite/context/user/jsonschema/1-0-0",
                data: {
                    product_name: "server",
                    product_group: "mailstore",
                    lob: "smb",
                    category: "",
                    product_flavor: ""
                }
            }
            ])
    };

if (~viper.dom["pathname"].indexOf("/en/mailstore-server-trial-start.aspx")){
    window.snowplow("trackUnstructEvent", [{
        schema : "iglu:com.carbonite/event/trial_download/jsonschema/1-0-0",
        data : {
            timeStamp: new Date()
            }
        },
        {
            schema: "iglu:com.carbonite/context/user/jsonschema/1-0-0",
            data: {
                locale: "English"
            }
        },
        {
            schema: "iglu:com.carbonite/context/user/jsonschema/1-0-0",
            data: {
                product_name: "server",
                product_group: "mailstore",
                lob: "smb",
                category: "",
                product_flavor: ""
            }
        }
    ])
};