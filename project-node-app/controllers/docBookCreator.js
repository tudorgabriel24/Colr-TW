var fs = require("fs");

var builder = require("xmlbuilder");

//Aici trebuie puse informatiile ce vor sa fie in docBook, poate fi modficat ulterior
var no_views = ["200", "500", "5000"];
var times_upl = ["3", "10", "8"];

var obj = {
  table: {
    "@frame": "all",
    title: { "#text": "Statistics" },
    tgroup: {
      "@cols": "2",
      colspec: [{ "@colname": "c1" }, { "@colname": "c2" }],
      thead: {
        row: {
          entry: [{ "#text": "Number_views" }, { "#text": "Times_uploaded" }],
        },
      },
      tbody: {},
    },
  },
};
var xml = builder.create(obj);

for (i = 0; i < no_views.length; i++) {
  var row = {
    row: { entry: [{ "#text": no_views[i] }, { "#text": times_upl[i] }] },
  };
  var xml = xml.ele(row).up();
}

var xml = xml.end({ pretty: true });

console.log(xml);

fs.writeFile("./xml/docBook.xml", xml, function (err, data) {
  if (err) console.log(err);

  console.log("successfully created docBook file");
});
