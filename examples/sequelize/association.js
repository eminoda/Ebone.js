const User = require('./model/user');
const Book = require('./model/book');

// // foreign key 在 User 表中（默认：book.id），外键在 Target
// Book.hasOne(User);
// // SELECT * FROM `book` AS `book` LEFT OUTER JOIN `user` AS `user` ON `book`.`id` = `user`.`book_id`;
// Book.findAll({
//   include: [
//     {
//       model: User,
//     },
//   ],
// })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // foreign key 在 Book 表中（默认：user.id），外键在 Source
// Book.belongsTo(User, {
//   foreignKey: 'authorId', // 自定义外键名称
// });
// // SELECT * FROM `book` AS `book` LEFT OUTER JOIN `user` AS `user` ON `book`.`author_id` = `user`.`id`;
// Book.findAll({
//   include: [
//     {
//       model: User,
//     },
//   ],
// })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
