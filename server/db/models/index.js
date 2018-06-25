const Assignments = require('./assignments');
// const Tags = require('./tags');
const db = require('../db');

// Assignments.belongsToMany(Tags, { through: 'assignment_tags' });
// Tags.belongsToMany(Assignments, { through: 'assignment_tags' });

// module.exports = {
//   Assignments,
//   Tags
// };

module.exports = { Assignments };
