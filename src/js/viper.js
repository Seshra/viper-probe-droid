
var viper = {
    setCookie: function(cname, cvalue, days) {
                var d = new Date();
                d.setTime(d.getTime() + (days*86400000));
                var expires = "expires="+d.toUTCString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
                },
    getCookie: function(cname){
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i=0; i<ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1);
                    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
                }
                return "";
                },
    getQP: function(parameter){
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    if(pair[0] == parameter){return pair[1];}
                }
                return(false);
                },
    environment: "",
    application: "",
    launch: function(){
                if (!utag_data) {
                    var utag_data = {};
                }
                this.getCookie("viper")?this.environment = this.getCookie("viper"):this.environment;
                this.getQP("viper")?this.environment=this.getQP("viper"):this.environment;
                this.setCookie("viper",this.environment);
                div = document.createElement("div"); div.setAttribute('id', 'viper'); div.style.visibility='hidden';
                div.style.display = 'none'; document.body.appendChild(div);
                a = '//tags.tiqcdn.com/utag/carb/'+ this.application + '/' + this.environment + '/utag.js';
                b = document.createElement("script"); b.src = a; b.type = 'text/javascript'; b.async = true;
                document.getElementById('viper').appendChild(b);
                }
};