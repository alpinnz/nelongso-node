const mongoose = require("mongoose");
const { Roles } = require("./../models");

const initial = () => {
  Roles.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      const roles = [
        "admin",
        "owner",
        "co-bisdev",
        "co-finance",
        "co-marketing",
        "co-hrd",
        "co-operasional",
        "co-produksi",
        "user",
      ];
      roles.forEach((item) => {
        new Roles({
          name: `${item}`,
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }

          console.log(`added ${item} to roles collection`);
        });
      });
    }
  });
};

exports.connect = async () => {
  const url = `${process.env.DB_URL}/${process.env.DB_NAME}`;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  mongoose.Promise = global.Promise;
  // Connecting to the database
  await mongoose
    .connect(url, options)
    .then(() => {
      console.log(`Successfully connected to ${process.env.DB_NAME}`);
      initial();
    })
    .catch((err) => {
      console.log("Could not connect to MongoDB." + err);
      return process.exit();
    });

  return mongoose;
};

exports.ObjectId = (string) => {
  return mongoose.mongo.ObjectId(string);
};
