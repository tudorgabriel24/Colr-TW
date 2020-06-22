var fs = require("fs");

var builder = require("xmlbuilder");

//Aici trebuie puse informatiile ce vor sa fie in docBook, poate fi modficat ulterior
var countries = ["Romania", "Rusia", "Franta"];
var types = ["Capac", "Dop", "Eticheta"];
var price = ["200", "500", "5000"];

var obj = { book: { title: { "#text": "Statistics" } } };
var xml = builder.create(obj);

for (i = 0; i < countries.length; i++) {
  var chapter = {
    chapter: {
      title: { "#text": countries[i] },
      para: [{ "#text": types[i] }, { "#text": price[i] }],
    },
  };
  var xml = xml.ele(chapter).up();
}

var xml = xml.end({ pretty: true });

console.log(xml);

fs.writeFile("./xml/docBook.xml", xml, function (err, data) {
  if (err) console.log(err);

  console.log("successfully created docBook file");
});
