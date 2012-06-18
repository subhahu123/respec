describe("Core - Fix headers", function () {
    var MAXOUT = 5000
    ,   basicConfig = {
            editors:    [{ name: "Robin Berjon" }]
        ,   specStatus: "WD"
        };
    it("should have set the correct header level", function () {
        var doc;
        runs(function () {
            makeRSDoc({ config: basicConfig,
                        body: "<section id='turtles'><h1>ONE</h1><section><h1>TWO</h1><section><h1>THREE</h1><section><h1>FOUR</h1>" +
                              "<section><h1>FIVE</h1><section><h1>SIX</h1></section></section></section></section></section></section>"
                    }, function (rsdoc) { doc = rsdoc; });
        });
        waitsFor(function () { return doc; }, MAXOUT);
        runs(function () {
            var $s = $("#turtles", doc);
            expect($s.find("h1").length).toEqual(0);
            expect($s.find("h2").length).toEqual(1);
            expect($s.find("h2").text()).toEqual("ONE");
            expect($s.find("h3").length).toEqual(1);
            expect($s.find("h3").text()).toEqual("TWO");
            expect($s.find("h4").length).toEqual(1);
            expect($s.find("h4").text()).toEqual("THREE");
            expect($s.find("h5").length).toEqual(1);
            expect($s.find("h5").text()).toEqual("FOUR");
            expect($s.find("h6").length).toEqual(2);
            expect($s.find("h6").first().text()).toEqual("FIVE");
            expect($s.find("h6").last().text()).toEqual("SIX");
            flushIframes();
        });
    });
});