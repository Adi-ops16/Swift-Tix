const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

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


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    } finally {
    }
}
run().catch(console.dir);







app.listen(port, (req, res) => {
    console.log("Swift-Tix server is running on port:", port)
})
