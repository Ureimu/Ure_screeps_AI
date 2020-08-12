{
    var htmj_1 = {
        set: function (stringIn) {
            var a = '<!DOCTYPE html><html>';
            var b = '</html>';
            var stringOut = a + stringIn + b;
            Memory.consoleTest.x = stringOut;
        },
        head: function (stringIn, title) {
            var a = '<head><meta charset="utf-8"><title>' + title + '</title></head>';
            var stringOut = a + stringIn;
            Memory.consoleTest.x = stringOut;
        },
        body: function (stringIn) {
            var a = '<body>' + stringIn + '</body>';
            Memory.consoleTest.x = a;
        },
        css: function (stringIn) {
            var a = '<style type="text/css">\
        h1{color:red;}\
        p{\
            color:black;\
            font-family:"Times New Roman";\
            font-size:20px;\
            background-color:##99ccff;\
        }\
        </style>' + stringIn;
            Memory.consoleTest.x = a;
        },
        meset: function (stringIn, title) {
            if (!Memory.consoleTest) {
                Memory.consoleTest = {
                    x: ''
                };
            }
            this.body(stringIn);
            this.head(Memory.consoleTest.x, title);
            this.css(Memory.consoleTest.x);
            this.set(Memory.consoleTest.x);
        }
    };
    module.exports = htmj_1;
}
