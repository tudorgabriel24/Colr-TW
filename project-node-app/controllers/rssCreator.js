var fs = require("fs");
var builder = require("xmlbuilder");
const { resolve } = require("path");
const { rejects } = require("assert");
const { connection } = require("../server");
const { url } = require("inspector");

//Aici trebuie puse informatiile despre statistici sau statisticile in sine, primul element va fi cel mai nou
var title = ["News from today", "News from yesterday", "News from past"];
var link = ["link from today", "link from yesterday", "link from past"];
var description = ["what happened today", "what happened yesterday"];

exports.getRss = async function getRss(req, res) {
  var title = [];
  var link = [];
  var description = [];
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
