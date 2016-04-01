###Viper.js Technical Documentation###
####v0.04####
<br>

###The purpose of this document is to provide an overall explanation of the following Javascript code and provide an explanation of each function and code block.###
<br><br>

**Overview:**
Viper.js is designed to be an analytics platform, requiring the end user place only one script tag to call the file, and one script tag to fire the one required function in the Viper code.  All other functionality is performed autonomously from wihin the base code, or the supporting config files.

All of the functions and variables are stored in a JSON object called "viper".  Placing all of the elements inside of this object helps to eliminate the possibility of variable and function collisions, and keeps all elements compartmentalized and in one place for easy access.


This first line line creates the JSON object which will contain all of the functions and variables:

```
var viper = {
```

This second line is a timestamp and version number:

```
version: "v0.04 : Mon Nov 09 2015 10:00:36 GMT-0800 (PST)",
```

This setCookie function takes three parameters and writes a cookie in the users browser.  The values are:<br>
*	"cname" -- Cookie Name<br>
*	"cvalue" -- the Value (text) to be placed into the cookie<br>
*	"days" -- How many days do you want the cookie to persist.  This value is not required.  If not provided, the cookie defaults to session.<br>
	<p>example: `viper.setCookie("userName","Joe",15);`</p>
   
```
"setCookie": function (cname, cvalue, days) {
	var d = new Date();
	d.setTime(d.getTime() + (days * 86400000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
	},
```

This contains function takes two parameters and allows a following function to check a WhiteList to determine if a variable should be allowed to be set in the viper object, and subsequently written to a cookie.  This function returns true or false.  
* "array" -- The array used to caompare against
* "obj" -- The object to campare against the array
<p>example: `viper.contains("viper.wl","utm_source");` or if `(viper.contains("viper.wl","utm_source") === true){do something};`

```
contains : function(array, obj){
    var i = array.length;
    while (i--) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
    },
```

This cookieToObj function requires no parameters and takes any readable cookies from the browser and places the key : value pair into the viper object.
<p> exmample: This cookie visitorId = "148159" will be placed into the viper object as viper.cp.visitorId : "148159"</p>

```
cookieToObj : function() {
	if (document.cookie) {
    	var cookies = document.cookie.split(';');
        var cookie;
        viper.cp = {};
        for (var i = 0; i < cookies.length; i++) {
        	while (cookies[i].charAt(0) === ' ') {cookies[i] = cookies[i].substring(1);}
            cookie = cookies[i].split('=');
            viper.cp[cookie[0]] = cookie[1];
            }
        }
    },
```

This qpToObj requires no parameters and takes an query string parameters from the browser, runs them through a White List check using the contains() function, and places any allowed parameters in the viper object.  This function also takes those allowed parameters and writes them into a cookie.
<p> example: object -- utm_source=pfeffer will be inserted into the viper object as **"viper.qp.utm_source : "pfeffer""**    cookie -- utm_source=pfeffer will generate a cookie called **"viper_utm_source"** with a value of **"pfeffer"**  </p>

```
    //Adds any query string parameters to the viper object as viper.qp.xx
    qpToObj : function() {
        if (location.search) {
            var qs = location.search.slice(1).split('&');
            var qsp;
            viper.qp = {};
            for (var i = 0; i < qs.length; i++) {
                qsp = qs[i].split('=');
                if (viper.contains(viper.wl, qsp[0]) === true) {
                viper.qp[qsp[0]] = qsp[1];
                viper.setCookie("viper_"+qsp[0], qsp[1]);
            }
            }
        }
    },
```

This metaToObj function requires no parameters and looks for any meta tags from the page, which contain a name or property attribute, and have a corresponding content attribute, and add that meta tag data to the viper object.
<p> example: On a page containing a meta tag such as this: `<meta name="viewport" content="width=1024">` will result in **"viper.meta.viewport: "width=1024""**</p>


```
metaToObj : function(){
        if (document.getElementsByTagName("meta")) {
            var tags = document.getElementsByTagName("meta");
            viper.meta = {};
            for (var i = 0; i < tags.length; i++) {
                var data = tags[i].name || tags[i].getAttribute("property") || "";
                if (data !== "") {
                    viper.meta[data] = tags[i].content;
                }
            }
        }
    },
```   

The retrieve() function accepts two parameters, and allows the retrieval of any of the data within the viper object without actually interacting directly with the viper object.
* type -- The type of data to be retrieved.  Acceptable parameters are base, cookie, meta or querystring.  Note: The base type is used for the variable directly off of the viper object (i.e. "application" or "environment".
* name -- The name of the variable to be returned.
<p>example: `viper.retrieve("cookie","userId")` would return the value of the viper object **"viper.cp.userId"**</p>
   
```   
   retrieve : function (type, name) {
        var t = "";
        if (type.match(/(^)(base)($)/i)){t = "";}
        if (type.match(/(^)(cookie)($)/i)){t = "cp";}
        if (type.match(/(^)(meta)($)/i)){t = "meta";}
        if (type.match(/(^)(qp|querystring|query\ string)($)/i)){t = "qp";}
        if (type.match(/(^)(dom)($)/i)){t = "dom";}
        if (t === ""){return viper[name];}else{return viper[t][name];}
    },
```

This tealium() function requires no parameters and sets up the Tealium script on the page and subsequently calls the Tealium script.  This script is called from the config files once the environment (dev or prod) is determined.

```
tealium: function () {
        var b = document.createElement("script");
        b.setAttribute("id", "viper_tealium");
        b.src = '//tags.tiqcdn.com/utag/carb/' + viper.application + '/' + viper.environment + '/utag.js';
        b.type = 'text/javascript';
        b.async = true;
        document.getElementById('viper').appendChild(b);
    },
```

This snowplow() function requires no parameters and calls the Snowplow's code base.  This function sets up the code for Snowplow to be rendered on the page.  The actual rendering process is called from within the launch() function later on.  The actual calling of the snowplow tag and starting of the Snowplow analytics is done from within the config files.

```
snowplow: function (p, l, o, w, i, n, g) {
        if (!p[i]) {
            p.GlobalSnowplowNamespace = p.GlobalSnowplowNamespace || [];
            p.GlobalSnowplowNamespace.push(i);
            p[i] = function () {
                (p[i].q = p[i].q || []).push(arguments);
            };
            p[i].q = p[i].q || [];
            n = l.createElement(o);
            g = l.getElementsByTagName(o)[0];
            n.async = 1;
            n.src = w;
            g.parentNode.insertBefore(n, g);
        }
    },
```

This spCookie() function is used to retrieve the visitor and session data from Snowplow Analytics, and return it in to a variable called spCookieParams.

```
 spCookie: function(){
        window.snowplow(function () {
            viper.spCookieParams = this.co.getDomainUserInfo();
        });
    },
```

These next two functions are for checking jQuery.
The first one, called jqueryTest() checks the page to see if jQuery exists.  The second one, called jqueryVersion returns the version of the jQuery.

```
jqueryTest: function(){
      if (typeof jQuery === "function"){return true;}
    },
```
```
jqueryVersion: function(){
      if (viper.jqueryTest() === true){
          return jQuery.fn.jquery;
    }else{
          return "jQuery Not Installed";
        }
    },
```

These are the **dom** elements, imported into Viper for convenient access.

```
    dom : {
        url : document.URL,
        domain : document.domain,
        query_string : location.search,
        referrer: document.referrer,
        pathname : location.pathname,
        title : document.title,
    },
```

These are the browser elements, imported into Viper for convenient access.

```
browser: {
        cookies_enabled: navigator.cookieEnabled,
        browser_language: navigator.language,
        browser_version: navigator.appVersion,
        java_enabled: navigator.javaEnabled()
     },
```

The "application" and "environment" properties are only for use in the Tealium code at this point, and are only used in the `viper.launch()` function.  The **application** property equates to the Profile parameter in Tealium where the **environment** property equates to the environments parameter in Tealium.  These two parameters are to be set via page code prior to the `viper.launch();` call being made.<br>
<p>example: `viper.application = "main"; viper.environment = "prod";`</p>
    	
```
application: "",
environment: "",
```

The next two elements are whitelists used by Viper functions. The **qs_wl** is used to determine what query string parameters can be imported into Viper.  The **app_wl** limits what can be passed trough the **Application** variable and into Tealium.  This prevents someone from loading non-whitelisted Tealium code on to the pages.

```
qs_wl: ["environment", "utm_source", "utm_medium", "utm_campaign", "utm_content", "Category", "Page_ID"],
app_wl: ["mailstore", "pardot", "test-pardot", "landing-pages","main"],
```

    	
This launch function is what calls a number of utility functions as well as setting up the necessary div tags to contain Snowplow and Tealium script tagsultimately makes the call to Tealium to fire the utag.js Javascript code.  This function contains 5 main code blocks.<br>
1. The firing of the functions above to gather and insert the query string, cookie and meta tag data into the **viper** object.
2. Code to declare a utag_data object.  If one already exists, it uses the existing value.  If one does not exist, it creates an empty object.<br>
3. Code to call the Snowplow Analytics script.<br>
4. Code to add a `<div>` tag into the page, just above the closing `</body>` tag.<br>
5. Code to add a `<script>` tag into the page above the closing body tag, that fires the secondary **x_viper_config.js** file.<br>
   	
    	
```
launch: function (app) {
```

1. This first section fires the five functions that gather the query string, cookie, meta tag and jQuery data, and insert it into the viper object.  

    ```
        viper.qpToObj();
        viper.cookieToObj();
        viper.metaToObj();
        viper.browser["jquery_enabled"] = viper.jqueryTest();
        viper.browser["jquery_version"] = viper.jqueryVersion();
    ```           

2. This code declares an object named **utag_data**, if none exists.  If a utag_data object already exists, then the existing object is used.  If there is no existing utag_data object, and empty object is created.  This utag_data object is required for Tealium to function properly.        	

     ```
        var utag_data = utag_data || {};
     ```

3. This line of code calls the snowplow script.  The actual script is called from the config file for the specific site or site section.
    
    ```
            viper.snowplow(window, document, "script", "//d1qbbgtcslwdbx.cloudfront.net/2.2.0/sp.js", "snowplow");
    ```
    
4. This code block creates a `<div>` tag with and "id" of **viper**, and a visibiulity setting of "hidden as well as a display setting of "none".  With the combination of the visibility and display parameters, the `<div>` tag will not be visible on the page and will not take up any space on the page.  The last part of this code appends this newly created `<div>` tag into the `<body>` section of the page, just above the closing `</body>` tag. 

    ```
        var div = document.createElement("div");
        div.setAttribute('id', 'viper');
        div.style.visibility = 'hidden';
        div.style.display = 'none';
        document.body.appendChild(div);
    ```

5. This code block calls the config files (helper files) for the specific sites or sub-sites.  It calls the *_viper_config.js file based on viper.application value.  The code only runs if the value in the **_application_** variable matches what is in the **_app_wl_** (application whitelist.  
   This whitelist determines which sites or sub-sites have a config file, and can access them. 
            
    ```
    if (viper.contains(viper.app_wl, viper.application) === true) {
       var conf = document.createElement("script");
       conf.setAttribute("id", "viper_config");
       conf.src = '//viper.analytics.carbonite.com/' + viper.application + '_viper_config.js';
       conf.type = 'text/javascript';
       document.body.appendChild(conf);
            }
    };
    ```
