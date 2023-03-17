const mongoDb = require("mongodb");
const MongoClient = mongoDb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://anujkaushik:kaushik@cartcluster.899dkup.mongodb.net/Shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connected!");
      _db = client.db(); // we are storing access to the database here,here it will connect to the Shop database by default which has been specified in the connection string
      callback();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const getDb = () => {
  // here we are returning access to that connected database! if it exists.
  if (_db) {
    return _db; // _db is the database instance we connected to!
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
