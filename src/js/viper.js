
//read cookie and creates readable, individual cookie key:value pairs
(function(){
    var cookies;

    function readCookie(name,c,C,i){
        if(cookies){ return cookies[name]; }

        c = document.cookie.split('; ');
        cookies = {};

        for(i=c.length-1; i>=0; i--){
           C = c[i].split('=');
           cookies[C[0]] = C[1];
        }

        return cookies[name];
    }

    window.readCookie = readCookie; // or expose it however you want
})();

//Global Variables
var vipProfile = "", //Tealium Profile name
    vipEnv = "prod",  //Tealium version - defaults to Prod and is changed below
    vipCookie = readCookie("viper");

//Checks query string and cookie.  Manipulates cookie and sets environment as required
if (location.search.indexOf("viper=dev") && (!vipCookie)){
	vipEnv = "dev";
	document.cookie="viper=dev;";
} else if (vipCookie === "dev"){
	vipEnv = "dev";
}
if (location.search.indexOf("viper=prod") && (vipCookie === "dev" || vipCookie === "" || (!vipCookie))){
	vipEnv = "prod";
	document.cookie="viper=prod;";
} else if (vipCookie === "prod"){
	vipEnv = "prod";
}


//Adds "utag_data" if none exists and attaches script tag to page just before </body> tag to fire utag.js
window.onload = function() {  
    if (!utag_data){var utag_data = {};};
    div = document.createElement("div"); div.setAttribute('id', 'viper'); div.style.visibility='hidden'; div.style.display = 'none';
    document.body.appendChild(div);
	a = '//tags.tiqcdn.com/utag/carb/'+ vipProfile + '/' + vipEnv + '/utag.js';
	b = document.createElement("script"); b.src = a; b.type = 'text/javascript'; b.async = true;
	document.getElementById('viper').appendChild(b);
}