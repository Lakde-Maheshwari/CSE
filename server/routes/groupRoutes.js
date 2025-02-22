
const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');
const Group = require('../models/Group');

router.post('/create', authenticateJWT, async (req, res) => {
  const { name, description } = req.body;
  const group = new Group({
    name,
    description,
    members: [req.user.userId], 
    createdBy: req.user.userId
  });
  await group.save();
  res.status(201).send(group);
});


router.get('/', authenticateJWT, async (req, res) => {
  const groups = await Group.find({ members: req.user.userId });
  res.status(200).send(groups);
});

module.exports = router;