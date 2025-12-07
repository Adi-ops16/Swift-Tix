const express = require('express');
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 3000

// firebase service account
const admin = require("firebase-admin");

const decoded = Buffer.from(process.env.FIREBASE_ADMIN_KEY, 'base64').toString('utf8')
const serviceAccount = JSON.parse(decoded);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(cors())
app.use(express.json())

// verify FB token
const verifyFbToken = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }
    const token = authorization.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    try {
        const decoded = await admin.auth().verifyIdToken(token)
        req.decoded_email = decoded.email
        next()
    } catch {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@personal-hero.gxzvpbe.mongodb.net/?appName=Personal-Hero`;



const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const db = client.db("Swift_Tix_DB")
        const usersCollection = db.collection('users')

        // get role
        app.get('/role', verifyFbToken, async (req, res) => {
            const email = req.query.email
            const query = { email: email }
            const result = await usersCollection.findOne(query, { projection: { role: 1 } })

            res.send({ role: result.role || 'user' })
        })


        app.get('/', (req, res) => {
            res.send('Swift-Tix server is working')
        })

        app.get('/users', async (req, res) => {
            try {
                const query = {};
                const result = await usersCollection.find(query).toArray()
                res.send(result)
            } catch (err) {
                res.send({ message: "Could't get users" })
            }
        })

        // users related api
        app.post('/users', async (req, res) => {
            try {
                const user = req.body;
                const email = req.body.email
                user.created_at = new Date()
                user.role = 'user'

                const existingUser = await usersCollection.findOne({ email: email })

                if (existingUser) {
                    return res.send({ message: "User already exists in Database" })
                }

                const result = usersCollection.insertOne(user)
                res.send(result)
            }
            catch (err) {
                res.send("error while creating user in DB", err)
            }
        })

        // ticket related apis
        app.post('/tickets', async (req, res) => {
            const ticketInfo = req.body
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    } finally {
    }
}
run().catch(console.dir);







app.listen(port, (req, res) => {
    console.log("Swift-Tix server is running on port:", port)
})
