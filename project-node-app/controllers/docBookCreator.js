var fs = require("fs");

var builder = require("xmlbuilder");

//Aici trebuie puse informatiile ce vor sa fie in docBook, poate fi modficat ulterior
// var no_views = ["200", "500", "5000"];
// var times_upl = ["3", "10", "8"];
// var params = ["Romania", "Italia", "Spania"];
// var col = "Country"; // type , brand

exports.getDoc = async function (no_views, times_upl, params, col, res) {
  var obj = {
    table: {
      "@frame": "all",
      title: { "#text": "Statistics" },
      tgroup: {
        "@cols": "3",
        colspec: [
          { "@colname": "c1" },
          { "@colname": "c2" },
          { "@colname": "c3" },
        ],
        thead: {
          row: {
            entry: [
              { "#text": col },
              { "#text": "Number_views" },
              { "#text": "Times_uploaded" },
            ],
          },
        },
        tbody: {},
      },
    },
  };
  var xml = builder.create(obj);

  for (i = 0; i < no_views.length; i++) {
    var row = {
      row: {
        entry: [
          { "#text": params[i] },
          { "#text": no_views[i] },
          { "#text": times_upl[i] },
        ],
      },
    };
    var xml = xml.ele(row).up();
  }

  var xml = xml.end({ pretty: true });

  console.log(xml);
  res.writeHead(200, {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(xml);

  // fs.writeFile("./xml/docBook.xml", xml, function (err, data) {
  //   if (err) {
  //     console.log(err);
  //   }

  //   console.log("successfully created docBook file");
  // });
};
