const express = require('express');
const axios = require('axios');
const moment = require('moment');

const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json());

const scheduledJobs = {};

router.post('/scheduleJob', async (req, res) => {
  const { executionTime, webhookUrl } = req.body;

  if (!executionTime || !webhookUrl) {
    return res.status(400).json({ 
      status: 'ERROR',
      error: 'Missing required fields' 
    });
  }

  const executionMoment = moment(executionTime, 'YYYY-MM-DD HH:mm');

  if (!executionMoment.isValid()) {
    return res.status(400).json({ 
      status: 'ERROR',
      error: 'Invalid date format for executionTime' 
    });
  }

  const jobId = Date.now().toString();

  const currentMoment = moment();
  const delay = Math.max(0, executionMoment.diff(currentMoment));

  scheduledJobs[jobId] = setTimeout(async () => {
    try {
      const response = await axios.post(webhookUrl);
      console.log(`Job ID ${jobId} executed successfully`);
      res.status(200).json({ 
        status: 'SUCCESS',
        message: 'Job executed successfully',
        data: response.data || response 
      });
    } catch (error) {
      console.error(`Job ID ${jobId} failed to execute: ${error.message}`);
      res.status(500).json({ 
        status: 'ERROR',
        error: 'Job execution failed',
        message: error.message
      });
    }
  }, delay);
});

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
