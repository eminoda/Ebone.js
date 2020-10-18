const { Sequelize } = require('sequelize');

// 数据库配置
const config = {
  database: 'ebone',
  username: 'root',
  password: 'root',
};

const options = {
  host: '127.0.0.1',
  dialect: 'mysql',
};

const sequelize = new Sequelize(config.database, config.username, config.password, options);

function test() {
  sequelize
    .authenticate()
    .then(() => {
      console.log('connection is ok');
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// test();

module.exports = sequelize;
