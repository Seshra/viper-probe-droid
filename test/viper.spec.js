var viper_lib = require('../src/js/viper');


describe("To test the function declarations",function(){

    describe("To test the setCookie function",function(){

        it("and verify that it is declared",function() {

            expect(viper.setCookie()).toBeDefined();

        })

        it("and that it can properly set a cookie",function(){

            viper.setCookie("jasmineTest","jasmineTest")
            expect(document.cookie.indexOf("jasmineTest=jasmineTest")).not.toEqual(-1)

        })

    })

    describe("To test the getCookie function",function(){

        it("and verify that it is declared",function(){

            expect(viper.getCookie()).toBeDefined();

        })

        it("and that the code can properly read a cookie",function(){

            var testCookie=viper.getCookie("jasmineTest");
            expect(testCookie).toBe("jasmineTest")

        })

    })

    describe("To test the getQP function",function(){

        it("and verify that it is declared",function(){

            expect(viper.getQP()).toBeDefined();

        })

        it("and, if a query string exists, read it properly",function(){

            if (location.search.indexOf("viper") != -1){
                expect(viper.getQP("viper")).toContain("prod" || "dev" || "qa")
            }

        })




    })
})

describe("To test whether or not the launch() function fired properly",function() {

    it("and the cookie was written by the launch function", function () {

        var cookie = document.cookie;
        expect(cookie.indexOf('viper')).not.toEqual(-1);

    })

    it("and the div tag is created", function () {

        expect(document.getElementById("viper")).not.toBeNull()

    })

    it("and the Tealium script is created and placed in the div tag", function () {

        expect(document.getElementById("viper_tealium")).not.toBeNull()

    })

    it("and test if the Tealium GET request was executed properly", function () {

        /*jasmine.Ajax.requests.            {
         "status": 200,
         "responseText": 'in spec response'*/


    })
})
