#Viper.js
###version 0.02
###Release Notes

**Overview:**<br>
In version 0.02 of viper.js, we are adding functionality to the 0.01 version of the viper.js.  The original version 0.01 was building a platform to launch the Tealium utag.js file using parameters supplied by the web page and/or user.  

**Release Date:**<br>
v0.01   August 9, 2015                                    <br>
v0.02   August 24, 2015

**Implementation Guide:**<br>
The Implementation Guide can be found on GitHub at [https://github.com/carbonite-analytics/viper-probe-droid/blob/master/README.md](https://github.com/carbonite-analytics/viper-probe-droid/blob/master/README.md)

**Technical Documentation:**
Technical Documentation can be found on GitHub at []()

**Additions:**<br>
In version 0.02, I added a number of functions to capture page level data from meta tags, query string parameters key:value pairs as well as cookie name:value pairs and placed that data into the viper object.  I've also included a function that allows for the retrieval of data from the viper objects and one that assists with the use of a whitelist.<br> 
The additions include:<br>
`contains()` -- Is used in conjunction with the White List to verify that Query String Parametrs are allowed to be placed in to the viper object, and associated cookies.<br>
`cookieToObj()` -- A function that pulls all available cookies into the viper object for later use.<br>
`qpToObj()` -- A function that takes the White Listed parameters and places them into the viper object, as well into associated cookies, for later use.<br>
`metaToObj()` -- A function that takes any Meta Tags that contain a "Name" or "Property" attribute, and insert those tags into the viper object for later use.<br>
`retrieve()` -- This function allows a user to retrieve data from the viper object without interacting directly with the object.<br>

In addition, I added some DOM level properties to capture category from the utag_data object, URL, Domain, Query String, Referrer, Pathname and Title.

In conjunction with the qpToObj() function, I have created a White List to only allow those Query String Parameters on the White List to be added to viper object and be placed in cookies in the browser.


**Removals:**<br>
readCookie() -- This function was removed as its functionality was replaced by the cookieToObj().

**Changes:**<br>
In the launch() function, the code block that is used to determine the environmental variables was changed from using ternary operators, to using "if" statements to determine the true or false condition of the statement.

**Fixes:**<br>
None


