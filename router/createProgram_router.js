const express = require('express');
const router = express.Router();
const { getAllPrograms, getProgramById, createProgram, updateProgram, deleteProgram } = require('../controller/program_controller');
const authMiddleware = require('../middlewares/auth');

router.post('/', createProgram);


// *******  Private Routes After Creating Program ******
//router.use(authMiddleware);
router.get('/', getAllPrograms);
router.get('/:id', getProgramById);
router.put('/:id', updateProgram);
router.delete('/:id', deleteProgram);

module.exports = router;

