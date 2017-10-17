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
        return _tweets.findOne();
    },

    selectTweet: function () {
        return _tweets.find({'votes.2': {$exists: false}}).sort({importance:-1}).limit(1).toArray();
    },

    selectTweetForUser: function (user_id) {
        return _tweets.find({'votes.2': {$exists: false},'votes.source': { $ne: user_id }}).sort({importance:-1}).limit(1).toArray();
    }
};