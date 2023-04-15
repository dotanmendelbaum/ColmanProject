const express = require('express');
var router = express.Router();
const workerController = require('../controllers/worker');

router.route('/')
    .get(workerController.getWorkers)

router.route('/:ID')
    .get(workerController.getWorker)
    .delete(workerController.deleteWorker);

router.route('/:ID, name, age, role, experience, school')
    .put(workerController.editWorker)
    .post(workerController.addWorker);

module.exports = router;