var fs = require("fs");
var builder = require("xmlbuilder");
const { resolve } = require("path");
const { rejects } = require("assert");
const { connection } = require("../server");
const { url } = require("inspector");

exports.getRss = async function (title, link, description, res) {
  var obj = {
    rss: {
      "@version": "2.0",
      channel: {
        title: { "#text": "Statistics Channel" },
        link: { "#text": "link Channel" },
        description: { "#text": "Description Channel" },
      },
    },
  };
  var xml = builder.create(obj);

  for (i = 0; i < title.length; i++) {
    var item = {
      item: {
        title: { "#text": title[i] },
        link: { "#text": link[i] },
        description: { "#text": description[i] },
      },
    };
    var xml = xml.ele(item).up();
  }

  var xml = xml.end({ pretty: true });

  console.log(xml);

  fs.writeFile("./xml/rss.xml", xml, function (err, data) {
    if (err) console.log(err);

    console.log("successfully created rss file");
  });
};
