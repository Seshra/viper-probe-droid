var viper = {
    //Function used to set cookies
    setCookie : function (cname, cvalue, days) {
        var d = new Date();
        d.setTime(d.getTime() + (days * 86400000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    //Adds any readable cookies to the viper object as viper.cp.xx
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
    //Adds any query string parameters to the viper object as viper.qp.xx
    qpToObj : function() {
        if (location.search) {
            var qs = location.search.slice(1).split('&');
            var qsp;
            viper.qp = {};
            for (var i = 0; i < qs.length; i++) {
                qsp = qs[i].split('=');
                viper.qp[qsp[0]] = qsp[1];
                viper.setCookie(qsp[0],qsp[1]);
            }
        }
    },
    //Adds any meta tags with a name or property attribute, and corresponding content attribute to the viper object as
    //viper.meta.xx
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
    //Function to retrieve any value from Cookies, Query String or Meta tags written to the viper object above.
    //proper types are "cookie", "meta" or "querystring"
    retrieve : function (type, name) {
        var t = "";
        if (type.match(/(^)(cookie)($)/i)){t = "cp";}
        if (type.match(/(^)(meta)($)/i)){t = "meta";}
        if (type.match(/(^)(qp|querystring|query\ string)($)/i)){t = "qp";}
        if (t === ""){return viper[name];}else{return viper[t][name];}
    },
    category : utag_data.category,
    url :
    application: "mailstore",
    environment: "",
    launch: function () {
        viper.qpToObj();
        viper.cookieToObj();
        viper.metaToObj();
        //Checks to see if utag_data object exists, and if not, sets an empty object.
        var utag_data = utag_data || {};
        //Check to see if a viper cookie exists and use its contents if it does
        if (this.cp.viper){this.environment = this.cp.viper;}
        //Check query string parameter for "viper=" to set environment
        if (this.qp.viper){this.environment = this.qp.viper;}
        //Set Cookie to the environment value
        if (this.cp.viper !== this.environment){this.setCookie("viper", this.environment);}

        //Adding div tag
        var div = document.createElement("div");
        div.setAttribute('id', 'viper');
        div.style.visibility = 'hidden';
        div.style.display = 'none';
        document.body.appendChild(div);

        //Adding Tealium inside div tag
        var b = document.createElement("script");
        b.setAttribute("id", "viper_tealium");
        b.src = '//tags.tiqcdn.com/utag/carb/' + this.application + '/' + this.environment + '/utag.js';
        b.type = 'text/javascript';
        b.async = true;
        document.getElementById('viper').appendChild(b);
    }
};