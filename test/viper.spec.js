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


    describe("To test the contains function",function() {

        it("and verify that it is properly declared", function () {

            expect(viper.contains()).toBeDefined()
        })
    })

        it("and that it can correctly compare an array to a variable value with true return", function () {

            var array = ["abc", "def", "ghi"];
            var value = "def";
            expect(viper.compare(array, value)).toBe(true);
        })

        it("and that it can correctly compare an array to a variable value with false return", function () {

            var array = ["abc", "def", "ghi"];
            var value = "pqr";
            expect(viper.compare(array, value)).toBe(false);
        })

        describe("To test the cookieToObj function", function () {

            it("and verify that it is declared", function () {

                expect(viper.getCookie()).toBeDefined();

            })

            it("and that the code can properly extract cookie data and write to viper object", function () {

                document.cookie = "jasmine-test = test"
                viper.cookieToObj();
                expect(viper.cp.jasmine - test).toEqual("test");

            })

        })

        describe("To test the qpToObj function", function () {

            it("and verify that it is declared", function () {

                expect(viper.qpToObj()).toBeDefined();

            })

            it("and, if a query string exists, it properly places the data in the viper object", function () {

                //add "viper=test" to query string

                if (location.search.indexOf("viper") != -1) {
                    viper.qpToObj();
                }

                expect(viper.qp.viper).toBe("test")
            })
        })

        describe("To test the metaToObj function", function () {

            it("and verify that it is declared", function () {

                expect(viper.metaToObj()).toBeDefined();

            })

            it("and that the function properly adds meta tag information into the viper object", function () {

                var meta = document.addElement("meta")
                meta.name = "jasmine-test";
                meta.content = "jasmine test data";
                document.getElementsByTagName('head')[0].appendChild(meta);
                viper.metaToObj();

                expect(viper.meta.jasmine - test).toBe("jasmine test data")
            })
        })

        describe("To test the retrieve function", function () {

            it("and verify that it is declared", function () {

                expect(viper.retrieve()).toBeDefined()

            })

            it("and that it can read viper.cp values correctly", function () {

                expect(viper.retrieve("cookie", "jasmine-test")).toBe("test");

            })
            it("and that it can read viper.qp values correctly", function () {

                expect(viper.retrieve("querystring", "viper")).toBe("test");

            })
            it("and that it can read viper.meta values correctly", function () {

                expect(viper.retrieve("cookie", "jasmine-test")).toBe("jasmine test data");

            })

        })
        describe("To test the snowplow function", function () {

            it("and verify that it is declared", function () {

                expect(viper.snowplow()).toBeDefined()

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
})
