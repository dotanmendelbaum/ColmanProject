const Worker = require('../models/worker');

const addWorker = async (ID, name, age, role, experience, school) => {
    const newWorker = new Worker({
        ID : ID,
        name: name,
        age: age,
        role: role,
        experience: experience,
        school: school
        
    });
    return await newWorker.save();
};

const getWorkerById = async (ID) => {
    return await Worker.findById(ID);
};

const getWorkers = async () => {
    return await Worker.find({});
};

const editWorker = async (ID, name, age, role, experience, school) => {
    const tempWorker = await getWorkerById(id);
    if (!tempWorker)
        return null;

        tempWorker.name= name;
        tempWorker.age= age;
        tempWorker.role=role;
        tempWorker.experience= experience;
        tempWorker.school= school;
    await tempWorker.save();
    return tempWorker;
};

const deleteWorker = async (id) => {
    const tempWorker = await getWorkerById(id);
    if (!tempWorker)
        return null;

    await tempWorker.remove();
    return tempWorker;
};

module.exports = {
    addWorker,
    getWorkerById,
    getWorkers,
    editWorker,
    deleteWorker
}