//code to extract catid from href query string an place in a cookie
var catid,
    qs = [],
    query,
    href = [];
viper.pardot = {};

var buttons = document.getElementsByClassName("btn");
for (i = 0; i < buttons.length; i++) {
    query = buttons[i].href.split("?")[1];
    if (query != undefined && query.indexOf("cat") > -1) {
        qs.push(query.split("=")[1]);
    }
}
viper.pardot["catid"] = qs[0];
if (viper.pardot.catid != "" && viper.pardot.catid != undefined) {
    viper.setCookie("pardot_catid", viper.pardot.catid);
}

//code to inject information into Hidden Form Field
if (viper.qp.utm_medium) {
    if (document.getElementsByClassName("Viper_Test_Medium")[0]) {
        document.getElementsByClassName("Viper_Test_Medium")[0].firstElementChild.value = viper.qp.utm_medium;
    }
}