const { Sequelize } = require('sequelize');

const config = {
  database: 'ebone',
  username: 'root',
  password: 'root',
};

const options = {
  host: '127.0.0.1',
  dialect: 'mysql',
};

const datasources = [
  {
    delegate: 'readme',
    config: { ...config, options },
  },
];
const framework = {};
function loader(app) {
  // 1. 解析多数据源
  const datasources = [];
  app.datasources.forEach((datasource) => {
    datasources.push(loadDatabase(datasource));
  });
}
function loadDatabase(datasource) {
  // 2. 获取 sequelize 实例
  const { delegate, config } = datasource;
  const sequelize = new Sequelize(config.database, config.username, config.password, config.options);
  // 3. 测试链接

  // 4. 挂载数据源
  Object.defineProperty(framework, delegate, {
    value: sequelize,
    writable: false,
    configurable: true,
  });
  // 5. 解析 model 文件
  // 6. 解析 association
}
loader({
  datasources,
});

framework.fin;
