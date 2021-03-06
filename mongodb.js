var MongoClient = require( 'mongodb' ).MongoClient;
var Long = require('mongodb').Long;
var _db;

var _tweets;

module.exports = {

    connectToServer: function( callback ) {
        if (_db) {
            return;
        }
            MongoClient.connect( "mongodb://127.0.0.1:39378/arasense_db", function( err, db ) {
            _db = db;
            _tweets = db.collection( 'tweets' );
            return callback( err );
        } );
    },

    getDb: function() {
        return _db;
    },
    
    
    selectTweet: function (user_id) {
        return _tweets.find({'votes.3': {$exists: false},'votes.source.userid': { $ne: user_id }}, {votes: 0, importance:0}).sort({importance:-1}).limit(1).toArray();
    },

    getVotesCount: function (user_id) {
        return _tweets.find({'votes.source.userid': user_id}).count()
    },

    addVote: function (tweetId, vote, source, platform, ip) {
        return _tweets.updateOne(
            { tweetid: Long.fromString(tweetId) },
            { $addToSet : {
                "votes" : {
                    "vote" : parseInt(vote), 
                    'source' : {
                        'userid': source,
                        'platform': platform,
                        'ip': ip
                    }, 
                    'date' : new Date() 
                } 
            } 
        });

    }
};
