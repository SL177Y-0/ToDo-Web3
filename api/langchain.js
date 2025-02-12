const axios = require('axios');
const { GEMINI_API_KEY } = require('./config');

const prioritizeTasks = async (tasks) => {
  const taskDescriptions = tasks.map(task => `${task.name} due on ${task.date}`).join('\n');
  const prompt = `Prioritize the following tasks:\n${taskDescriptions}`;

  try {
    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      contents: [{
        parts: [{ text: prompt }]
      }]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.trim();
    } else {
      throw new Error('No choices returned from API');
    }
  } catch (error) {
    console.error('Error prioritizing tasks:', error);
    throw new Error('Error prioritizing tasks');
  }
};

const predictTaskCompletion = async (taskDescription) => {
  const prompt = `Predict the likelihood of completing the following task: ${taskDescription}`;

  try {
    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      contents: [{
        parts: [{ text: prompt }]
      }]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.trim();
    } else {
      throw new Error('No choices returned from API');
    }
  } catch (error) {
    console.error('Error predicting task completion:', error);
    throw new Error('Error predicting task completion');
  }
};

module.exports = { prioritizeTasks, predictTaskCompletion };