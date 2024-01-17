const asyncHandler = require('express-async-handler');
const { dbConnection } = require("../config/db");

const getAllPrograms = asyncHandler(async (req, res) => {
    const { Program } = await dbConnection();
    const programs = await Program.findAll();
    return res.status(200).json(programs);
});

const getProgramById = asyncHandler(async (req, res) => {
    const { Program } = await dbConnection();
    const programId = req.params.id;

    try {
        const program = await Program.findByPk(programId);
        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }

        return res.status(200).json(program);
    } catch (error) {
        console.error('Error retrieving program by ID:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


const createProgram = asyncHandler(async (req, res) => {
    const { Program } = await dbConnection();

    const learningHours = parseInt(req.body.duration);
    const price = parseFloat(req.body.selectedPrice.replace('INR ', ''));

    if (isNaN(learningHours) || isNaN(price)) {
        return res.status(400).json({ message: 'Invalid values for learningHours or price' });
    }

    const programData = {
        name: req.body.name,
        price: price,
        domain: req.body.selectedDomain,
        programType: req.body.program_type,
        registrations: req.body.registration_open === 'Yes' ? 'open' : 'closed',
        description: req.body.description,
        placementAssurance: req.body.placementAssurance === 'Yes' ? true : false,
        imageUrl: req.body.image_url,
        universityName: req.body.university,
        facultyProfile: req.body.faculty,
        learningHours: learningHours,
        duration: req.body.duration,
        certificateDiploma: req.body.certificate,
        eligibilityCriteria: req.body.eligible_criteria,
    };

    try {
        const createdProgram = await Program.create(programData);
        return res.status(201).json({message: "Program Created successfully"});
    } catch (error) {
        console.error('Error creating program:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

const updateProgram = asyncHandler(async (req, res) => {
    const { Program } = await dbConnection();
    const programId = req.params.id;

    try {
        const program = await Program.findByPk(programId);
        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }

        // Update program fields based on request body
        program.name = req.body.name || program.name;
        program.price = parseFloat(req.body.selectedPrice.replace('INR ', '')) || program.price;
        program.domain = req.body.selectedDomain || program.domain;
        program.programType = req.body.program_type || program.programType;
        program.registrations = req.body.registration_open === 'Yes' ? 'open' : 'closed';
        program.description = req.body.description || program.description;
        program.placementAssurance = req.body.placementAssurance === 'Yes' || false;
        program.imageUrl = req.body.image_url || program.imageUrl;
        program.universityName = req.body.university || program.universityName;
        program.facultyProfile = req.body.faculty || program.facultyProfile;
        program.learningHours = parseInt(req.body.duration) || program.learningHours;
        program.duration = req.body.duration || program.duration;
        program.certificateDiploma = req.body.certificate || program.certificateDiploma;
        program.eligibilityCriteria = req.body.eligible_criteria || program.eligibilityCriteria;

        await program.save();

        return res.status(200).json({ message: 'Program updated successfully' });
    } catch (error) {
        console.error('Error updating program:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


const deleteProgram = asyncHandler(async (req, res) => {
    const { Program } = await dbConnection();
    const programId = req.params.id;

    try {
        const program = await Program.findByPk(programId);
        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }

        await program.destroy();

        return res.status(200).json({ message: 'Program deleted successfully' });
    } catch (error) {
        console.error('Error deleting program:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = {
    getAllPrograms,
    getProgramById,
    createProgram,
    updateProgram,
    deleteProgram,
};
