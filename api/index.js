const express = require('express');
const cors = require('cors');
const pool = require('./db')

// csv export
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
var dateTime = "./downloads/" + date + time + '.csv';
var path = require('path');
const xlsxFile = require('read-excel-file/node');

const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");
const fastcsv = require("fast-csv");

const nodemailer = require('nodemailer')


const fileUpload = require('express-fileupload');

const app = express();
const wbm = require('wbm');


// use cors as middleware for data

app.use(cors())
app.use(express.json())
app.use(fileUpload());





// add a person on db
app.post('/person', async (req, res) => {
    try {
        const { name, lastname, email, phone } = req.body
        const newPerson = await pool.query('INSERT INTO person (name, lastname ,email,phone) VALUES($1,$2,$3,$4) RETURNING *', [name, lastname, email, phone]);

        res.json(newPerson.rows)
    } catch (err) {
        console.error(err.message)
    }
})


//get all persons from db

app.get('/person', async (req, res) => {
    try {
        const allPerson = await pool.query('SELECT * FROM person')
        res.json(allPerson.rows)
    } catch (err) {
        console.error(err.message);
    }
})

//get a specific person by id( need to use for editing )

app.get('/person/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const person = await pool.query('SELECT * FROM person WHERE person_id = $1', [pid]);

        res.json(person.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// edit by id 

app.put('/person/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const { name, lastname, email, phone } = req.body
        // console.log(pid, name , lastname, email, phone)
        const person = await pool.query('UPDATE person SET name = $1 , lastname = $2 , email = $3 , phone = $4 WHERE person_id = $5', [name, lastname, email, phone, pid]);
        res.json('Person data was updated')
    } catch (err) {
        console.error(err.message)
    }
})

app.delete('/person/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const dPerson = await pool.query('DELETE FROM person WHERE person_id = $1', [pid])
        res.json('Person was deleted from db.')
    } catch (err) {
        console.error(err.message)
    }
})

app.get('/persons', async (req, res) => {
    try {

        const { name } = req.query

        const persons = await pool.query("SELECT * FROM person WHERE name || ' ' || lastname LIKE $1", [`%${name}%`])
        res.json(persons.rows)
    } catch (err) {
        console.error(err.message)

    }
})

app.get('/download/all', async (req, res) => {
    try {

        const d = await pool.query('SELECT * FROM person')
        const jsonD = await JSON.parse(JSON.stringify(d.rows))

        console.log(jsonD)
        // const t = fastcsv
        //     .write(jsonD, { headers: true })
        //     .on("finish", function () {
        //         console.log("Write to csv successfully!");
        //     })
        //     .pipe(ws);

        const json2csvParser = new Json2csvParser({ header: true });
        const csv = json2csvParser.parse(jsonD);
        const file = `${__dirname}/${dateTime}`;

        (async () => {
            fs.writeFile(dateTime, csv, function (error) {
                if (error) throw error;
                console.log("Write to csv successfully!");
            })
        })()


        function sleep(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        }


        sleep(10).then(() => {
            res.download(file)
        });




    } catch (err) {
        console.error(err.message)

    }
})


app.post('/upload', async (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    var filename = Date.now() + file.name
    let persons = [];

    var filePaths = path.join(__dirname, 'uploads', filename)



    await file.mv(filePaths, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);

        }
        else {
            res.json({ fileName: filename, filePath: `/uploads/${filename}` });
        }
    })

    setTimeout(() => {

        fs.createReadStream(filePaths)
            .pipe(fastcsv.parse({ headers: true }))
            .on("error", (error) => {
                throw error.message;
            })
            .on("data", (row) => {
                persons.push(row);
            })
            .on("end", () => {
                //remove head
                persons.shift();

                const q = "INSERT INTO person (name, lastname, email, phone) VALUES ($1, $2, $3, $4) RETURNING *";

                pool.connect((err, client, done) => {
                    if (err) throw err;

                    try {
                        persons.forEach(row => {
                            console.log(typeof row)
                            var obj = JSON.parse(JSON.stringify(row));
                            var values = Object.keys(obj).map(function (key) { return obj[key]; });
                            console.log(values)
                            client.query(q, values, (err, res) => {

                                if (err) {
                                    console.log(err.stack);
                                } else {
                                    console.log("inserted " + res.rowCount + " row:", row);
                                }
                            });
                        });
                    } finally {
                        done();
                    }
                });
            });

        console.log(filePaths)

    }, 20000)


});
app.post('/uploadexcel', async (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    var filename = Date.now() + file.name
    let persons = [];
    const q = "INSERT INTO person (name, lastname, email, phone) VALUES ($1, $2, $3, $4) RETURNING *";

    var filePaths = path.join(__dirname, 'uploads', filename)



    await file.mv(filePaths, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);

        }
        else {
            res.json({ fileName: filename, filePath: `/uploads/${filename}` });
        }
    })

    try {

        setTimeout(()=>{
            xlsxFile(filePaths)
            .then((rows) => {
                rows.shift()
                console.log(typeof rows, rows);

                pool.connect((err, client, done) => {
                    if (err) throw err;


                    try {
                        for (i in rows) {
                            client.query(q, rows[i], (err, res) => {

                                if (err) {
                                    console.log(err.stack);
                                } else {
                                    console.log("inserted " + res.rowCount + " row:", rows[i]);
                                }
                            });

                        };
                    } finally {
                        done();
                    }
                });
            }).catch((error) => {
                console.error(error.message);
            })

        },2000) 
        

    } catch (error) {
        console.log(error)
    }


});

let transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'dummy@gmail.com',
        pass: '12345678'
    }
})


app.post('/sendmail', async (req, res) => {
    try {

        const { html } = req.body

        const mails = await pool.query('SELECT DISTINCT email FROM person')
        const d = (mails.rows).map((b) => b.email);


        const m = d.join()

        //res.json(m)
        console.log(m)

        const message = {
            from: 'marjancangollari6@gmail.com',
            bcc: `${m}`,
            subject: 'Oferte nga American Computers',
            html: html
        };

        const sendEmails = () => {
            transport.sendMail(message, function (err, info) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(info);
                }
            });
        }
        sendEmails()

        console.log("Emails sent successfully.")
        res.json("Emails sent successfully.")

    } catch (error) {
        console.log(error)
    }
})

app.all('/sendmessage', async (req, res) => {

    try {
        wbm.start({ showBrowser: false, qrCodeData: true, session: true })
            .then(async qrCodeData => {
                console.log(qrCodeData); // show data used to generate QR Code
                res.json({ authd: qrCodeData })
                await wbm.waitQRCode();

                const contacts = await pool.query('SELECT * FROM person')
                const { mesazh } = req.body
                await wbm.send(contacts.rows, mesazh);
                await wbm.end();
            }).catch(err => { console.log(err); });

    } catch (error) {
        console.log(error)
    }
})


app.listen(5001, () => {
    console.log("Server has started");
})