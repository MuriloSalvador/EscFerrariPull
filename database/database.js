
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import Sequelize from 'sequelize'
require('dotenv').config()

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {

    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '-03:00'
})

export default connection