###Viper.js Technical Documentation###
####v0.02####
<br>

The purpose of this document is to provide an overall explanation of the following Javascript code and provide an explanation of each function and code block.
<br><br>

Overview:
In version 0.02 of viper.js, we are adding functionality to the 0.01 version of the viper.js.  The original version 0.01 was building a platform to launch the Tealium utag.js file using parameters supplied by the web page and/or user.  

All of the functions and variables are stored in a JSON object called "viper".  This helps to eliminate the possibility of variable and function collisions, and keeps all elements compartmentalized and in one place for easy access.


This line creates the JSON object which will contain all of the functions and variables:

```
var viper = {
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

This getCookie function takes one parameter and returns the value of the cookie matching the parameters name.<br>
*	"cname" -- Name of the cookie to be read.  The value of the cookie is returned.
<p>example: `viper.getCookie("userName");` or `var user = viper.getCookie("userName");`</p>

```
"getCookie": function (cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
       	var c = ca[i];
       	while (c.charAt(0) == ' ') c = c.substring(1);
       	if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
	}
       	return "";
},
```

This getQP function takes one parameter and returns the value of the query string parameter matching the function parameters name.<br>
*	"parameter" -- This is the name of the query string parameter to be read.  The value of this query string parameter will be returned.
<p>example: `viper.getQP("ref");` or `var referrer = viper.getQP("ref");`</p>
    	
```
    	"getQP": function (parameter) {
       		 var query = window.location.search.substring(1);
       		 var vars = query.split("&");
        	 for (var i = 0; i < vars.length; i++) {
            	var pair = vars[i].split("=");
            	if (pair[0] == parameter) {
                	return pair[1];
            	}
        	}
        	return (false);
    	},
```

This **category** variable is simply pulling the page level variable and placing it inside the viper object.

```
category : utag_data.category,
```   

This **dom** property 
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

The "application" and "environment" properties are only for use in the Tealium code at this point, and are only used in the `viper.launch()` function.  The **application** property equates to the Profile parameter in Tealium where the **environment** property equates to the environments parameter in Tealium.  These two parameters are to be set via page code prior to the `viper.launch();` call being made.<br>
<p>example: `viper.application = "main"; viper.environment = "prod";`</p>
    	
```
"application": "",
"environment": "",
```
    	
This launch function is what ultimately makes the call to Tealium to fire the utag.js Javascript code.  This function contains 5 main code blocks.<br>
1. The firing of the functions above to gather and insert the query string, cookie and meta tag data into the **viper** object.
2. Code to declare a utag_data object.  If one already exists, it uses the existing value.  If one does not exist, it creates an empty object.<br>
3. Statements to check and determine the correct Tealium environment<br>
4. Code to add a `<div>` tag into the page, just above the closing `</body>` tag.<br>
5. Code to add a `<script>` tag into the `<div>` tag created above.  This is what fires the utag.js file.    	
    	
```
"launch": function () {
```

1. This first section fires the three functions that gather the query string, cookie and meta tag data, and insert it into the viper object.  

    ```
        viper.qpToObj();
        viper.cookieToObj();
        viper.metaToObj();
    ```           

2. This code declares an object named **utag_data**, if none exists.  If a utag_data object already exists, then the existing object is used.  If there is no existing utag_data object, and empty object is created.  This utag_data object is required for Tealium to function properly.        	

     ```
        var utag_data = utag_data || {};
     ```

3. Tealium Environment 

    This if statement checks to see if there is a cookie property the name of **_viper_**.  If there is, then the value of the viper.environment is overwritten with the value of the **_viper_** cookie parameter.

    ```
        if (this.cp.viper){this.environment = this.cp.viper;}
    ```
   			
    This if statement checks the query string property (viper.qp) for **"viper="**.  If there is a query string property named **_viper_** (viper.qp.viper), then the value of the _viper.environment_ is overwritten with the value of the **_viper_** query string property.
        
    ```
        if (this.qp.viper){this.environment = this.qp.viper;}
    ```
            	
     This if statement compares the query string property **_viper_** (viper.cp.viper) to the current setting for the _viper.environment_ variable.  If they do not match, then a **_viper_** cookie is created/updated with the current _viper.environment_ value.  If the values do match, the operator simply returns the current value for _viper.environment_ and no cookie is written or updated.

    ```        	
        if (this.cp.viper !== this.environment){this.setCookie("viper", this.environment);}
    ```
    
4. This code block creates a `<div>` tag with and "id" of **viper**, and a visibiulity setting of "hidden as well as a display setting of "none".  With the combination of the visibility and display parameters, the `<div>` tag will not be visible on the page and will not take up any space on the page.  The last part of this code appends this newly created `<div>` tag into the `<body>` section of the page, just above the closing `</body>` tag. 

    ```
        var div = document.createElement("div");
        div.setAttribute('id', 'viper');
        div.style.visibility = 'hidden';
        div.style.display = 'none';
        document.body.appendChild(div);
    ```

5. This last piece of the `viper.launch()` function is the creation and insertion of the call to the Tealium utag.js file.  This code creates an asynch `<script>` tag that contains the call to the Tealium utag.js file.  The assembly of the **src** pulls the **viper.application** and **viper.environment** to build for the correct file location.  Once this `<script>` tag is inserted, the call to the utag.js occurs and starts the Analytics process.            	

    ```
        var b = document.createElement("script");
        b.src = '//tags.tiqcdn.com/utag/carb/' + this.application + '/' + this.environment + '/utag.js';
        b.type = 'text/javascript';
        b.async = true;
        document.getElementById('viper').appendChild(b);
    }
};
```