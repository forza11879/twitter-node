import express from 'express';
import { getResume, setSearchTerm, getPause } from '../controllers/tweets.js';

const router = express.Router();

router.post('/resume', getResume);
router.post('/setsearchterm', setSearchTerm);
router.post('/pause', getPause);

export default router;
