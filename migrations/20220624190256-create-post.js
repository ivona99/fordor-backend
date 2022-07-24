'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      slika: {
        type: Sequelize.STRING
      },
      video: {
        type: Sequelize.STRING
      },
      vrsta: {
        type: Sequelize.STRING
      },
      opis:{
          type:Sequelize.TEXT
      },
      ime: {
        type: Sequelize.STRING
      },
      lng: {
        type: Sequelize.FLOAT,
        defaultValue:0.0
      },
      lat: {
        type: Sequelize.FLOAT,
        defaultValue:0.0
      },
      seen:{
        type:Sequelize.INTEGER,
        defaultValue: 0,
      },
      odobreno:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      kategorija:{
          type:Sequelize.INTEGER
      },vrsta:{
        type:Sequelize.STRING
    },naslov:{
      type:Sequelize.STRING
  },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE 
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};