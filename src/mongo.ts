import mongoose from 'mongoose';

export default () => {
    const db_url = process.env.DB_URL || 'mongodb://localhost:27017/dev';
    mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
};