const fs = require('fs');
const path = require('path');

const covidFile = path.join(__dirname, '../models/owid-covid-data.json');

const getDataByContinent = (req, res) => {
    const continent = req.params.continent;

    fs.readFile(covidFile, 'utf-8', (err, jsonString) => {
        if (err) {
            res.status(500).json({message: "Unable to read file"});
        } else {
            const data = JSON.parse(jsonString);

            let reqData = [];
            for(const [key, value] of Object.entries(data)) {
                if(value.continent === continent) {
                    reqData.push(value);
                }
            }

            res.status(200).json(reqData);
        }
    });
}

const getDataByCountry = (req, res) => {
    const country = req.params.country;

    fs.readFile(covidFile, 'utf-8', (err, jsonString) => {
        if (err) {
            res.status(500).json({message: "Unable to read file"});
        } else {
            const data = JSON.parse(jsonString);

            let reqData = [];
            for(const [key, value] of Object.entries(data)) {
                if(value.location === country) {
                    reqData.push(value);
                    break;
                }
            }

            res.status(200).json(reqData);
        }
    });
}

const getDataByCountryAndDate = (req, res) => {
    const country = req.params.country;
    const date = req.params.date;

    fs.readFile(covidFile, 'utf-8', (err, jsonString) => {
        if (err) {
            res.status(500).json({message: "Unable to read file"});
        } else {
            const data = JSON.parse(jsonString);

            let reqData = [];
            for(const [key, value] of Object.entries(data)) {
                if(value.location === country) {
                    value.data.forEach(element => {
                        if(element.date === date) {
                            reqData.push(element);
                        }
                    });
                    break;
                }
            }

            res.status(200).json(reqData);
        }
    });
}

module.exports = {getDataByContinent, getDataByCountry, getDataByCountryAndDate};