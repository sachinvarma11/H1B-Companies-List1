const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub');
    const $ = cheerio.load(response.data);
    
    // Extract the data from the webpage
    // This is a placeholder and needs to be adjusted based on the actual structure of the webpage
    const companies = $('.company-data').map((i, el) => {
      return {
        name: $(el).find('.company-name').text(),
        fiscalYear: $(el).find('.fiscal-year').text(),
        initialApprovals: $(el).find('.initial-approvals').text(),
        initialDenials: $(el).find('.initial-denials').text(),
        continuingApprovals: $(el).find('.continuing-approvals').text(),
        continuingDenials: $(el).find('.continuing-denials').text(),
      };
    }).get();

    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Error fetching companies' });
  }
});

router.route('/search').get((req, res) => {
  const { query } = req.query;
  Company.find({ name: { $regex: query, $options: 'i' } })
    .then(companies => res.json(companies))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
