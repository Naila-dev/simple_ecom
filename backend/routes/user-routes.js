import express from 'express';

const router = express.Router();

// Define user-related routes here  
router.get('/test', (req, res) => {
  res.send('User route');
});

export default router;