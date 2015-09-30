###mailstore_viper_config.js Technical Documentation###
####v0.01####
<br>

The purpose of this document is to provide an overall explanation of the following Javascript code and provide an explanation of each function and code block.
<br><br>

Overview:
This is version 0.01 of the mailstore specific Viper Config JS helper file.  This file is used to contain and run all of the mailstore site-specific code, such as lookup tables, page load code, event functions, etc...  


This first set of code is to fire a Snowplow Analytics event function for tracking the Trial Download event on the site.  It uses a number of parameters set in Snowplow to send the necessary criteria for the event.

    
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


The above section will be expanded as more event tracking is added to the JS file.