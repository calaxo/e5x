const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');


    const outputFilePath = "out.xml";

    // Read the XML file
    var obj = {name: "Super", Surname: "Man", age: {name: "Super", Surname: "Man", age: 23},};

var builder = new xml2js.Builder();
var xml = builder.buildObject(obj);

            // Write the new XML to a file
            fs.writeFile(outputFilePath, xml, (err) => {
                if (err) {
                    console.error("Error writing the file:", err);
                    console.log("Error writing the file");
                    return;
                }

                console.log("File successfully written:", outputFilePath);
                console.log("File successfully written");
            });

