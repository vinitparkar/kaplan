const Sequelize = require('sequelize');
const db = require('../db');

const Assignments = db.define('assignments', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
        len: {
            $gt: 0
        }
    }
},
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
        len: {
            $gt: 0
        }
    }
},
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
        len: {
            $gt: 0
        }
    }
},
  assignmentType: {
    type: Sequelize.TEXT,
  },
  duration: {
      type: Sequelize.BIGINT,
      allowNull: false,
      validate: {
          len: {
              $gt: 0
          }
      }
  },
  tags: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      defaultValue: []
  }
});

module.exports = Assignments;
