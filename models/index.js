// models/index.js
const { Sequelize } = require('sequelize');
const NoteModel = require('./note');
const UserModel = require('./user');

const sequelize = new Sequelize('mydb', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
});

const Note = NoteModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

User.hasMany(Note);
Note.belongsTo(User);

sequelize.sync();

module.exports = {
  sequelize,  // Exporting the Sequelize instance
  Note,
  User,
};
