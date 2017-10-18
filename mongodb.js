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

    /**
     * I use this for susequent requests
     */
    selectTweet: function (user_id) {
        return _tweets.find({'votes.2': {$exists: false},'votes.source': { $ne: user_id }}).sort({importance:-1}).limit(1).toArray();
    },
    
    /**
     * I use this function ONLY for the initial rendering of the app.
     */
    selectFourTweets: function (user_id) {
        return _tweets.find({'votes.2': {$exists: false},'votes.source': { $ne: user_id }}).sort({importance:-1}).limit(4).toArray();
    },

    addVote: function (tweetId, vote, source) {
        _tweets.updateOne(
            {"id":parseInt(tweetId)},
            {$addToSet : {"votes" : {"vote" : vote, 'source' : source, 'date' : new Date() } } }, function(err, res) {
                if (err) throw err;
                console.log(res.result.nModified + " document(s) updated \n\ttweetId: ",tweetId,"\n\tvote: ",vote,"\n\t source: ",source);
            });

    },

    hardCodedAddVote: function () {
        console.log('yeah hitting the function');
        _tweets.update(
            
            {id: 914160356343386112},
            {$addToSet : {"votes" : {"vote" : 1, 'source' : 'areallylongstring', 'date' : '12 september' } } },
                        false,
                        true
            )
    }
};