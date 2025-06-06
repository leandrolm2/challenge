import { Router } from "express";

const router = Router();

router.get('/ping', (req, res) => {
  res.send('pong!');
});

router.get('/hello', (req, res) => {
  res.send('world!');
});

export default router;
