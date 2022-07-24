'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.hasMany(models.Video, {
        foreignKey: 'postId'
      });
      Post.hasMany(models.Image, {
        foreignKey: 'postId'
      });
      Post.hasMany(models.Like, {
        foreignKey: 'postId'
      });
      Post.hasMany(models.Comment, {
        foreignKey: 'postId'
      });
    }
  }
  Post.init({
    slika: DataTypes.STRING,
    video: DataTypes.STRING,
    ime: DataTypes.STRING,
    opis:DataTypes.TEXT,
    lng:{
      type:DataTypes.FLOAT,
    defaultValue:0},
    lat:{ 
      type:DataTypes.FLOAT,
    defaultValue:0.0},
    seen:{
      type:DataTypes.INTEGER,
      defaultValue: 0.0},

    odobreno:{
      type:DataTypes.BOOLEAN,
      defaultValue:false},
    kategorija:DataTypes.INTEGER,
    vrsta:DataTypes.STRING,
    naslov:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};