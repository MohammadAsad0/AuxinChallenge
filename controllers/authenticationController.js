const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');

const userFile = path.join(__dirname, '../models/users.json');

const signup = (req, res) => {
    const {email, password} = req.body;

    fs.readFile(userFile, 'utf-8', async (err, jsonString) => {
        if (err) {
            res.status(500).json({message: "Unable to read file"});
        } else {
            let data = JSON.parse(jsonString);

            data.users.forEach(element => {
                if (element.email === email) {
                    res.status(400).json({message: "User already exists"});
                }
            });

            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
            
            data.users.push({email: email, password: hashedPassword});

            fs.writeFile(userFile, JSON.stringify(data), (err1) => {
                if(err1) {
                    res.status(500).json({message: "Unable to add user"});
                } else {
                    const token = jwt.sign({email: email}, process.env.SECRET_KEY);

                    res.status(200).json({email: email, token: token});
                }
            });

        }
    })

}

const signin = (req, res) => {
    const {email, password} = req.body;

    var flag = false;

    fs.readFile(userFile, 'utf-8', (err, jsonString) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: "Unable to read file"});
        } else {
            const data = JSON.parse(jsonString);

            data.users.forEach(async element => {
                if (element.email === email) {
                    flag = true;

                    const matchPassword = await bcrypt.compare(password, element.password);

                    if(!matchPassword) {
                        return res.status(400).json({message: "Invalid Password"});
                    }

                    const token = jwt.sign({email: element.email}, process.env.SECRET_KEY);

                    return res.status(200).json({email: element.email, token: token});
                }
            });

            if(!flag)
                res.status(400).json({message: "Invalid credentials"});
        }
    });
}

module.exports = {signin, signup};