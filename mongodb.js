var MongoClient = require( 'mongodb' ).MongoClient;

var _db;

var _tweets;

module.exports = {

    connectToServer: function( callback ) {
        MongoClient.connect( "mongodb://arasense.net:27017/arasense_db", function( err, db ) {
            _db = db;
            _tweets = db.collection( 'tweets' );
            return callback( err );
        } );
    },

    getDb: function() {
        return _db;
    },

    getTweets: function () {
        return _tweets;
    },

    getNextTweet: function () {
        _tweets.findOne();
    }
};