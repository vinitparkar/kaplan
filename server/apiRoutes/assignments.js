const router = require('express').Router();
const { Assignments } = require('../db/models');

router.param('assignmentId', (req, res, next, assignmentId) => {
  Assignments.findById(assignmentId)
      .then(function (assignment) {
          if (!assignment) {
              const err = new Error('Assignment not found!');
              err.status = 404;
              throw err;
          }
          req.assignment = assignment;
          next();
          return null;
      })
      .catch(next);
});

//Get all Assignments ( localhost:8080/assignments )
//Get all Assignments by tags ( localhost:8080/assignments/?tags=a&tags=b

router.get('/', (req, res, next) => {
  let tags = req.query.tags, filter;
  if (tags){
    if(tags instanceof Array)
      filter = tags;
    else
      filter = [tags];

    return Assignments.findAll({
      where: {
        tags: {
          $contains: filter
        }
      }
    })
    .then(assignment => res.json(assignment))
    .catch(next);
  }

  return Assignments.findAll()
          .then(assignment => res.json(assignment))
          .catch(next);
  });

//Create an Assignment
router.post('/', (req, res, next) => {
  Assignments.create(req.body)
      .then(assignment => res.json(assignment))
      .catch(next);
});

//Get a specific Assignment by id
router.get('/:assignmentId', (req, res, next) => {
  res.json(req.assignment);
});

module.exports = router;
