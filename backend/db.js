const mongoose = require('mongoose');
const mongo_url = 'mongodb+srv://umagarhwa3:6NR3uaPAmcgy26dl@cluster0.t48hr.mongodb.net/foodMERN';

const mongodb = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        // Fetch data from the FOOD collection
        const fetch_food_data = mongoose.connection.db.collection("FOOD");
        const food_data = await fetch_food_data.find({}).toArray();

        // Fetch data from the FOOD_categ collection
        const fetch_food_categ_data = mongoose.connection.db.collection("FOOD_categ");
        const food_categ_data = await fetch_food_categ_data.find({}).toArray();

        // Check if any data is found in FOOD collection
        if (food_data.length === 0) {
            console.log("No data found in the FOOD collection.");
        } else {
            console.log("FOOD data fetched successfully.");
            global.food_items = food_data;  // Store globally, consider refactoring later
        }

        // Check if any data is found in FOOD_categ collection
        if (food_categ_data.length === 0) {
            console.log("No data found in the FOOD_categ collection.");
        } else {
            console.log("FOOD_categ data fetched successfully.");
            global.food_categories = food_categ_data;  // Store globally, consider refactoring later
        }
    } catch (error) {
        console.error('Error connecting to MongoDB or  fetching data:', error.message);
    }
};

module.exports = mongodb;
