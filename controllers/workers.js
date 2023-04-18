const workerService = require('../services/worker');

const addWorker = async (req, res) => {
    const newWorker = await workerService.addWorker(req.body.ID && req.body.name && req.body.age && req.body.role && req.body.experience && req.body.school);
    res.json(newWorker);
};

const getWorkers = async (req, res) => {
    const retWorkers = await workerService.getWorkers();
    res.json(retWorkers);
};

const getWorker = async (req, res) => {
    const retWorker = await workerService.getWorkerById(req.params.id);
    if (!retWorker) {
        return res.status(404).json({ errors: ['Worker not found, make sure the ID is right'] });
    }

    res.json(retWorker);
};

const editWorker = async (req, res) => {
    if (!(req.body.ID && req.body.name && req.body.age && req.body.role && req.body.experience && req.body.school)) {
      res.status(400).json({
        message: "You missed one detail. Please, do not leave any blank spots",
      });
    }
  
    const tempWorker = await workerService.editWorker(req.params.id, req.body.ID);
    if (!tempWorker) {
      return res.status(404).json({ errors: ['Worker not found, make sure the ID is right'] });
    }
  
    res.json(tempWorker);
  };

  const deleteWorker = async (req, res) => {
    const tempWorker = await workerService.deleteWorker(req.params.id);
    if (!tempWorker) {
      return res.status(404).json({ errors: ['Worker not found, make sure the ID is right'] });
    }
  
    res.send();
  };

  module.exports = {
    addWorker,
    getWorkers,
    getWorker,
    editWorker,
    deleteWorker
  };
