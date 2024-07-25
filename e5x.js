const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const e5x = (req, res) => {
    console.log("e5x");

    // Path to the uploaded file
    const filePath = req.file.path;
    const outputFilePath = filePath.replace('.xml', '_done.xml');

    // Read the XML file
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            console.log("Error reading the file");
            return;
        }

        // Parse the XML file
        xml2js.parseString(data, (err, result) => {
            if (err) {
                console.error("Error parsing the XML:", err);
                console.log("Error parsing the XML");
                return;
            }


            let main =result.SET.Occurrence[0]





            let attributes = main.ATTRIBUTES[0];
            let entities = main.ENTITIES[0];


            for (let narrative of entities.Narrative) {
                if (narrative.ATTRIBUTES[0].Narrative_Language[0] === '20') {
                    narrative.ATTRIBUTES[0].Narrative_Text[0].PlainText[0]._ = "Votre nouvelle description de l'accident ici.";
                    break;
                }
            }

            for (let narrative2 of entities.Narrative) {
                if (narrative2.ATTRIBUTES[0].Narrative_Language[0] === '16') {
                    narrative2.ATTRIBUTES[0].Narrative_Text[0].PlainText[0]._ = "Votre nouvelle description de l'accident ici mais en angais";
                    break;
                }
            }            

            // Convert the JSON back to XML
            const builder = new xml2js.Builder();
            const newXml = builder.buildObject(result);

            // Write the new XML to a file
            fs.writeFile(outputFilePath, newXml, (err) => {
                if (err) {
                    console.error("Error writing the file:", err);
                    console.log("Error writing the file");
                    return;
                }

                console.log("File successfully written:", outputFilePath);
                console.log("File successfully written");
            });
        });
    });
}

module.exports = { e5x };
