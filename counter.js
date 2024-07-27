// api/counter.js
const { MongoClient } = require('mongodb');

const uri = 'your_mongodb_connection_string'; // Replace with your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = async (req, res) => {
    try {
        await client.connect();
        const db = client.db('user_count_db'); // Replace with your database name
        const collection = db.collection('user_count');

        // Increment the user count
        await collection.updateOne({ id: 1 }, { $inc: { count: 1 } }, { upsert: true });

        // Retrieve the current count
        const result = await collection.findOne({ id: 1 });
        const current_count = result ? result.count : 0;

        res.status(200).json({ count: current_count });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
};
