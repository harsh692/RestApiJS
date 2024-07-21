const math = require('mathjs');
const calcmodel = require('../models/calc');

async function handleCalculation(req, res) {
    const expression = req.body.exp;

    // Add type check to ensure the expression is of an expected type
    if (typeof expression !== 'string') {
        return res.status(400).json({
            error: 'Invalid input type',
            expected: 'string',
            received: typeof expression
        });
    }

    try {
        // Evaluate the expression using math.js
        const result = math.evaluate(expression);

        // Retrieve the current calculation document
        let currentexp = await calcmodel.findOne();
        
        if (!currentexp) {
            // If no document is found, create a new one
            currentexp = new calcmodel();
        }

        // Update the current expression and result
        currentexp.currentExp = expression;
        currentexp.currentAns = result;
        
        // Save the updated document
        await currentexp.save();

        return res.status(200).json({ result: result });
    } catch (error) {
        console.error('Error evaluating expression:', error);
        return res.status(500).json({
            error: error.message
        });
    }
}

async function handleExp(req,res){
    const currentexp = await calcmodel.find({});
    return res.status(201).json(currentexp);
}

module.exports = {
    handleCalculation,
    handleExp,
};
