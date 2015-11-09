var viper = {
    version: "v0.04 : Thu Nov 05 2015 20:58:03 GMT-0800 (PST)",

    //Function used to set cookies
    setCookie: function (cname, cvalue, days) {
        var d = new Date();
        d.setTime(d.getTime() + (days * 86400000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },

    //used to compare variable values to white lists
    contains: function (array, obj) {
        var i = array.length;
        while (i--) {
            if (array[i] === obj) {
                return true;
            }
        }
        return false;
    },

    //Adds any readable cookies to the viper object as viper.cp.xx
    cookieToObj: function () {
        viper.cp = {};
        if (document.cookie) {
            var cookies = document.cookie.split(';');
            var cookie;
            for (var i = 0; i < cookies.length; i++) {
                while (cookies[i].charAt(0) === ' ') {
                    cookies[i] = cookies[i].substring(1);
                }
                cookie = cookies[i].split('=');
                viper.cp[cookie[0]] = cookie[1];
            }
        }
    },

    //Adds any query string parameters to the viper object as viper.qp.xx
    qpToObj: function () {
        viper.qp = {};
        if (location.search) {
            var qs = location.search.slice(1).split('&');
            var qsp;
            for (var i = 0; i < qs.length; i++) {
                qsp = qs[i].split('=');
                if (viper.contains(viper.qs_wl, qsp[0]) === true) {
                    viper.qp[qsp[0]] = qsp[1];
                    viper.setCookie("viper_" + qsp[0], qsp[1]);
                }
            }
        }
    },

    //Adds any meta tags with a name or property attribute, and corresponding content attribute to the viper object as
    //viper.meta.xx
    metaToObj: function () {
        viper.meta = {};
        if (document.getElementsByTagName("meta")) {
            var tags = document.getElementsByTagName("meta");
            for (var i = 0; i < tags.length; i++) {
                var data = tags[i].name || tags[i].getAttribute("property") || "";
                if (data !== "") {
                    viper.meta[data] = tags[i].content;
                }
            }
        }
    },

    //Function to retrieve any value from Cookies, Query String or Meta tags written to the viper object above.
    //proper types are "cookie", "meta",  "dom" or "querystring"
    retrieve: function (type, name) {
        var t = "";
        if (type.match(/(^)(base)($)/i)) {
            t = "";
        }
        if (type.match(/(^)(cookie)($)/i)) {
            t = "cp";
        }
        if (type.match(/(^)(meta)($)/i)) {
            t = "meta";
        }
        if (type.match(/(^)(qp|querystring|query\ string)($)/i)) {
            t = "qp";
        }
        if (type.match(/(^)(dom)($)/i)) {
            t = "dom";
        }
        if (t === "") {
            return viper[name];
        } else {
            return viper[t][name];
        }
    },

    //Adding Tealium inside div tag
    tealium: function () {
        var b = document.createElement("script");
        b.setAttribute("id", "viper_tealium");
        b.src = '//tags.tiqcdn.com/utag/carb/' + viper.application + '/' + viper.environment + '/utag.js';
        b.type = 'text/javascript';
        b.async = true;
        document.getElementById('viper').appendChild(b);
    },

    //Declares Snowplow function
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

    //Function to return Snowplow Cookie parameters
    spCookie: function(){
        window.snowplow(function () {
            viper.spCookieParams = this.co.getDomainUserInfo();
        });
    },

    //To check to see if jQuery is installed
    jqueryTest: function(){
      if (typeof jQuery === "function"){return true;}
    },

    //The get the jQuery version, if installed
    jqueryVersion: function(){
        if (viper.jqueryTest() === true){
            return jQuery.fn.jquery;
        }else{
            return "jQuery Not Installed";
        }
    },

    //DOM Elements
    dom: {
        url: document.URL,
        domain: document.domain,
        query_string: location.search,
        referrer: document.referrer,
        pathname: location.pathname,
        title: document.title
    },

    //Browser Information
    browser: {
        cookies_enabled: navigator.cookieEnabled,
        browser_language: navigator.language,
        browser_version: navigator.appVersion,
        java_enabled: navigator.javaEnabled()
     },

    application: "",
    environment: "",

    qs_wl: ["environment", "utm_source", "utm_medium", "utm_campaign", "utm_content", "Category", "Page_ID"],
    app_wl: ["mailstore", "pardot", "test-pardot", "landing-pages"],

//***************************************************************************************************************

    launch: function (app) {

        viper.application = app || viper.application;

        viper.qpToObj();
        viper.cookieToObj();
        viper.metaToObj();
        viper.browser["jquery_enabled"] = viper.jqueryTest();
        viper.browser["jquery_version"] = viper.jqueryVersion();

        //Checks to see if utag_data object exists, and if not, sets an empty object.
        var utag_data = utag_data || {};

        //creating the Snowplow script tag and inserting it at the bottom of the body tag
        viper.snowplow(window, document, "script", "//d1qbbgtcslwdbx.cloudfront.net/2.2.0/sp.js", "snowplow");

        //Adding div tag
        var div = document.createElement("div");
        div.setAttribute('id', 'viper');
        div.style.visibility = 'hidden';
        div.style.display = 'none';
        document.body.appendChild(div);

        //Calling the *_viper_config.js file based on viper.application value
        if (viper.contains(viper.app_wl, viper.application) === true) {
            var conf = document.createElement("script");
            conf.setAttribute("id", "viper_config");
            conf.src = '//viper.analytics.carbonite.com/' + viper.application + '_viper_config.js';
            //conf.src = '//viper-test-pages.s3-website-us-east-1.amazonaws.com/js/' + viper.application + '_viper_config.js';
            conf.type = 'text/javascript';
            document.body.appendChild(conf);
        }
    }
};