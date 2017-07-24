import express from 'express';
import fs from 'fs';
import path from 'path';
const router = express.Router();

const getFilePath = () => {
  return `${path.join(__dirname, 'data')}.json`;
};

const fileParse = () => {
  return JSON.parse(fs.readFileSync('data.json', {encoding: 'utf-8'}));
};

const updateFile = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2), {encoding: 'utf-8'});
};

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', (req, res, next) => {
  try {
    const data = fileParse();
    const requestData = req.body;

    requestData.email = requestData.email.toLowerCase().trim();

    const checkUserEmailExist = data.users.filter((user) => {
      return user.email === requestData.email;
    });

    if (checkUserEmailExist.length) {
      res.status(400);
      res.send('This email already exist');
    } else {
      data.users.push(requestData);
      updateFile(data);
    }
    res.end();
  } catch (err) {
    console.log(err);
  }
})

export default router;
