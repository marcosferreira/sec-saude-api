import 'dotenv/config.js';
import './db.js';
import app from './app.js';

const PORT = process.env.PORT || 3333;
const LOGS = () => console.log(`Started server in http://127.0.0.1:${PORT}`);

app.listen(PORT, LOGS);
