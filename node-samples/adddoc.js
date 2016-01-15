// Simple document query for a given movie

var DocumentDBClient = require('documentdb').DocumentClient
  , config = require('./config')
  , databaseId = config.names.database
  , collectionId = config.names.collection
  , host = config.connection.endpoint
  , masterKey = config.connection.authKey


if (process.argv.length <= 2) {
    console.log("Usage: adddoc <document>");
    process.exit(-1);
}
var newDocument = JSON.parse(process.argv[2]);

var client = new DocumentDBClient(host, {masterKey: masterKey});

// Remember the resource model?
// Path to collection: dbs/databasename/colls/collectionname
var collLink = 'dbs/' + databaseId+ '/colls/'+ collectionId;

console.log('\nwriting to collection path: '  + collLink + '\n');

//var newDocument = { location: "makattak", attempt: 1 };

client.createDocument(collLink, newDocument, function (err, doc, headers) {
  if (err) {
      callback(err);

  } else {
      console.log('Success writing. Cost: ' + headers['x-ms-request-charge']);
  }
});
