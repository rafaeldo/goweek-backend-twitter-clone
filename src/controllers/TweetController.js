const Tweet = require('../models/Tweet')

module.exports = {
  async index(req, res) {
    try {
      const tweets = await Tweet.find({}).sort('-createdAt')
      return res.json(tweets)
    } catch (error) {
      console.log(error)
    }
  },

  async store(req, res) {
    try {
      const tweet = await Tweet.create(req.body)

      req.io.emit('tweet', tweet)

      return res.json(tweet)
    } catch (error) {
      console.log(error)
    }
  }
}
