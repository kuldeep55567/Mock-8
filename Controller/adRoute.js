const express = require("express");
const { AdModel } = require("../Model/AdModel")
const adRouter = express.Router();
require("dotenv").config()

adRouter.post("/add", async (req, res) => {
    try {
        const data = new AdModel(req.body);
        await data.save();
        return res.status(200).json({ "ok": true, "mssg": "Data Posted Successfully" })
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
adRouter.get("/products", async (req, res) => {
    const { name, category, sort, page } = req.query;
    let filtered = []
    try {
        const query = {};
        if (name) {
            query.name = { $regex: name, $options: 'i' }
        }
        if (category) {
            query.category = category
        }
        const sorting = sort === 'date' ? { date: 1 } : {};
        const pageSize = 4;
        const startIndex = (page - 1) * pageSize;
        filtered = await AdModel.find(query)
            .sort(sorting)
            .skip(startIndex)
            .limit(pageSize)
        res.status(200).json({
            filtered
        })
    } catch (error) {
        res.send(error.message)
    }
})
adRouter.delete("/products/:id", async (req, res) => {
    let ids = req.params.id;
    try {
        await AdModel.findByIdAndDelete(ids)
        res.status(200).json({ "mssg": "Product Deleted " })
    } catch (error) {
        res.status(400).json({ "mssg": error.message })
    }
})
adRouter.patch("/products/:id", async (req, res) => {
    let ids = req.params.id;
    try {
        await AdModel.findByIdAndUpdate(ids,req.body)
        res.status(200).json({ "mssg": "Product Updated Successfully" })
    } catch (error) {
        res.status(400).json({ "mssg": error.message })
    }
})
module.exports = { adRouter }