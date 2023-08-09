module.exports = {
    host: 'localhost',
    user: 'bootcamp',
    password: '123456',
    db: 'db_bootcamp',
    dialect: 'postgres',
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}