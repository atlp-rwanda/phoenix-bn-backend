import app from './app';

const port = process.env.PORT || 5000;

// listerning the server

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is listerning on ${port}`);
  }
});
