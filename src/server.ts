import express from 'express';
import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config()
const app = express();

const User = mongoose.model("User", new Schema<{ name: string }>({
    name: {
        type: String,
        required: true
    }
}))

mongoose.connect(process.env.MONGODB_URI || "").then(() => {
    console.log("🚀 ~ DB connected!")
}).catch((err) => {
    console.log("🚀 ~ mongoose.connect ~ err:", err)
})

app.get("/", (req, res) => res.send("<h1>Server is running.</h1>"))

app.get("/user", async (req, res) => {
    const user = await new User({ name: faker.person.firstName() }).save();
    res.send(user)
})

app.get("/user/get", async (req, res) => {
    const users = await User.find()
    res.send(users)
})

app.get("/user/delete", async (req, res) => {
    await User.deleteMany()
    res.send({ success: true })
})

app.listen(4000, () => {
    console.log("Server is running on port 4000")
})