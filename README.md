# Viper Probe Droid
[ ![Build Status] [travis-image] ] [travis]
[ ![License] [license-image] ] [license]

## The Vision
At Carbonite, the Digital Analytics team is responsible for handling the
management of our Tracking Beacons as well as our Event Analytics Platform. For
managing our tracking beacons we use [Tealium IQ](http://tealium.com). We use
the [Snowplow JavaScript Tracker](https://github.com/snowplow/snowplow-javascript-tracker)
to send events to our Event Analytics Platform. In addition to the standard
events provided by Snowplow, we include in this project a number of other
event types.

In order to keep the "ownership" of Analytics to our team, we have created this
project so that the various web teams in Carbonite don't have to be responsible
for managing the beacons and events themselves. We work with those teams to
make sure that the DOM has the proper markdown. Then upon their request, or
from other teams throughout the company we instrument the events.

  
## Implementation Guide  


This document describes the implementation process for the required configuration of your site to facilitate analytics tracking, as well as the process for adding a parameter to allow for proper link tracking.




####A. Implementation of the Viper Analytics Base Code:

The process of adding the Viper Analytics Base Code is broken down into four steps; the addition of the viper.js file in the head section, the addition of the Tealium utag_data object in the page code, the addition of the parameters to determine which Tealium profile and environment will be used, and the call to the function that ultimately loads the Tealium script.




#####**Step 1 - Adding the viper.js**

The addition of the viper.js must be done in the head section of your site to ensure that the necessary functions are loaded as soon as possible on your pages.  This addition is done by placing the following code on every page on your site, or wherever you want to track activity, and must be placed between the `<head>` and `</head>` tags, as shown here:

````bash
    <head>

        <script src="//viper.analytics.carbonite.com/viper.js" type="text/javascript"></script>

    </head>
````


#####**Step 2 - Adding the Tealium Data Layer**

In order for the Tealium code to function properly, an object is required to be placed on the page.  This object is used to pass page level data in to Tealium from the CMS system, and is also used as a repository where Tealium will place the data that it gathers automatically, such as cookie values, DOM element, meta tag data, etc.  

In order for this data object to be used, at a minimum, the data object must placed on the page empty, like this:

````bash
    <script type="text/javascript">
     
        var utag_data = {};

    </script>
````

Passing variables and data via this object can be accomplished using standard JSON formatting.  In this example, let's say that you would like to pass in the Page Name, Page Category, a Trial Key for a visitor who is evaluating the product, and their Visitor ID generated by your CMS system.  With the above variables, the utag_data object would look like this:

````bash
    <script type="text/javascript">

	    var utag_data =
		    "pageName" : "Start of Your Test Phase",
		    "pageType" : "Server Trial",
		    "trialKay" : "MBALM-DLPCL-SACEF-BHBNK-TRHCE",
		    "visitorId" : "20150715221005"
    </script>
````



#####**Step 3 - Adding the Viper Parameters for Tealium Functionality**

The addition of the Tealium parameters is required, and can be placed anywhere on the page as long as it is placed after the viper.js mentioned above, and before the "viper.launch()" code mentioned in the next section.  This is necessary because the parent object ("viper.xxx") is declared from within the viper.js file itself and is needed before the "viper.launch()" runs.  The addition of these parameters consists of the following code:

````bash
    <script type="text/javascript">

        viper.application = "mailstore";
        viper.environment = "dev/qa/prod";

    </script>
````

The "viper.application" will not change as that is the location in Tealium where all of the Mailstore analytics tags will be stored.

The viper.environment may change depending on the type of page where the code is to be placed.  For example, if you have a staging environment that you use for pre-production testing, you will want to use the "dev" or "qa" environment.  For the Production environment, you will want to use "prod".




#####**Step 4 - Calling the Tealium Script**

The code in this final step is what actually places the Tealium script on the page and makes the call to Tealium’s servers.  This is where the analytics code loads.  In the following code, there are no parameters that need to be set as all of the parameters were set prior to this code.  The launch code looks like this:

````bash
    <script type="text/javascript">

	    viper.launch();

    </script>
````

Alternately, you can combine step 3 and 4 into one set of code, which would look like this:

````bash
    <script type="text/javascript">

        viper.application = "mailstore";
        viper.environment = "prod";
        viper.launch();

    </script>
````

This "viper.launch()" will generate and place a `<div>` tag in the page code, just above the closing Body tag (`</body>`).  It will also create a `<script>` tag that calls the Tealium script from inside this new `<div>` tag.



####B.  Implementing Enhancements for Analytics Tracking:

In order for the Carbonite Analytics application to properly track links on your web pages, you will need to add a unique **"id"** attribute to each link.  This will allow the application to determine which links were clicked on a particular page.


# LICENSE
Copyright (c) 2015, Robert G. Johnson Jr. @Oakensoul, Apache Version 2.0
Copyright (c) 2015, Andrew C. Rose @RongWay, Apache Version 2.0
Copyright (c) 2015, [Carbonite](http://www.carbonite.com), Apache Version 2.0

[travis]: http://travis-ci.org/carbonite-analytics/viper-probe-droid
[travis-image]: https://travis-ci.org/carbonite-analytics/viper-probe-droid.png?branch=master

[license]: http://opensource.org/licenses/Apache-2.0
[license-image]: https://img.shields.io/hexpm/l/plug.svg
