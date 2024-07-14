const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const cycleFail = +(process.env.CYCLE_FAIL || 0);
const shouldFail = process.env.SHOULD_FAIL
  ? process.env.SHOULD_FAIL === 'true'
  : false;

let cycle = 0;

app.get('/', (req, res) => {
  if (shouldFail) {
    cycle = 0;
    res.status(404).send('Not Found');
    return;
  }

  console.log({ cycleFail, cycle });

  if (cycleFail > 0) {
    if (cycle % cycleFail === 0) {
      res.status(404).send('Not Found');
    } else {
      res.send('Hello, World!');
    }
    cycle++;
    return;
  }

  cycle = 0;
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
