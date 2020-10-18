# DEMO 示例

## sequelize

1. model 配置

   详见：[define options](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-init)

   ```js
   sequelize.define(
     'book',
     {},
     {
       freezeTableName: 'book', // 自定义 table 名称为 book，默认为 books
       timestamps: false, // 取消 `createdAt`, `updatedAt` 字段
       underscored: true, // 驼峰字段（camelCase）映射数据库中下划线的列名（snake_case）
     }
   );
   ```

2. 创建连接

   ./sequelize/connection.js

3. crud 示例

4. 表关联

   ./sequelize/association.js

5. 封装
