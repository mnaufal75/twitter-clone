const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = require('../app');
const { connect } = require('../index');
const User = require('../models/User');

describe('Tweet test', () => {
  beforeAll((done) => {
    connect(process.env.MONGODB_URI_TEST);
    return done();
  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
  });

  describe('GET tweet/timeline/', () => {
    beforeAll(async () => {
      await User.findOneAndDelete({ username: 'test' });

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash('test', salt);

      const user = new User({
        username: 'test',
        password: hashPassword,
        userFullname: 'Test'
      });
      user.save();
    });

    afterAll(async () => {
      await User.findOneAndDelete({ username: 'test' });
    });

    test('Get details of a user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'test',
          password: 'test'
        });
      const token = res.text;

      await request(app)
        .get('/api/tweet/timeline')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(res => {
          expect(Array.isArray(res.body.timeline)).toBeTruthy();
        });
    });
  });

  describe('POST tweet/', () => {
    beforeAll(async () => {
      await User.findOneAndDelete({ username: 'test' });
      await User.findOneAndDelete({ username: 'test2' });

      const salt = await bcrypt.genSalt(10);

      const hashPassword = await bcrypt.hash('test', salt);
      const user = new User({
        username: 'test',
        password: hashPassword,
        userFullname: 'Test'
      });

      const hashPassword2 = await bcrypt.hash('test2', salt);
      const user2 = new User({
        username: 'test2',
        password: hashPassword2,
        userFullname: 'Test2'
      });

      user.followers.push(user2);
      user2.following.push(user);

      user.save();
      user2.save();
    });

    afterAll(async () => {
      await User.findOneAndDelete({ username: 'test' });
      await User.findOneAndDelete({ username: 'test2' });
    });

    test('Post a tweet', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'test',
          password: 'test'
        });
      const token = res.text;

      await request(app)
        .post('/api/tweet/')
        .set('Authorization', `Bearer ${token}`)
        .send({
          tweetText: 'Test post a tweet',
          parentTweet: undefined,
        })
        .expect(200)
        .then(res => {
          const { username, tweetText } = res.body;
          expect(username).toBe('test');
          expect(tweetText).toBe('Test post a tweet');
        });

      const user2 = await User.findOne({ username: 'test2' });
      expect(user2.timeline.length).toBe(1);
    });

    test('Reply a tweet', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'test',
          password: 'test'
        });
      const token = res.text;

      let tweet = {};

      await request(app)
        .post('/api/tweet/')
        .set('Authorization', `Bearer ${token}`)
        .send({
          tweetText: 'Test post a tweet',
          parentTweet: undefined,
        })
        .expect(200)
        .then(res => tweet = res.body);

      await request(app)
        .post('/api/tweet/')
        .set('Authorization', `Bearer ${token}`)
        .send({
          tweetText: 'Test reply a tweet',
          parentTweet: tweet._id,
        })
        .expect(200)
        .then(res => {
          const { username, tweetText, parentTweet } = res.body;
          expect(username).toBe('test');
          expect(tweetText).toBe('Test reply a tweet');
          expect(parentTweet).toBe(tweet._id);
        });
    });
  });

  describe('POST tweet/:tweetId/retweet', () => {
    beforeAll(async () => {
      await User.findOneAndDelete({ username: 'test' });

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash('test', salt);

      const user = new User({
        username: 'test',
        password: hashPassword,
        userFullname: 'Test'
      });
      user.save();
    });

    afterAll(async () => {
      await User.findOneAndDelete({ username: 'test' });
    });

    test('Retweet a tweet', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'test',
          password: 'test'
        });
      const token = res.text;

      const tweet = await request(app)
        .post('/api/tweet/')
        .set('Authorization', `Bearer ${token}`)
        .send({
          tweetText: 'Test Retweet',
          parentTweet: undefined,
        })

      await request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(res => {
          expect(res.body.retweetList.length).toBe(0);
        });

      await request(app)
        .post(`/api/tweet/${tweet.body._id}/retweet`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          tweetText: 'Retweet',
          parentTweet: undefined,
        })
        .expect(200)
        .then(res => {
          expect(res).toBeDefined();
        });

      await request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(res => {
          expect(res.body.retweetList.length).toBe(1);
        });
    });
  });

  describe('GET tweet/:username/:tweetId', () => {
    beforeAll(async () => {
      await User.findOneAndDelete({ username: 'test' });

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash('test', salt);

      const user = new User({
        username: 'test',
        password: hashPassword,
        userFullname: 'Test'
      });
      user.save();
    });

    afterAll(async () => {
      await User.findOneAndDelete({ username: 'test' });
    });

    test('Get a tweet from tweetId', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'test',
          password: 'test'
        });
      const token = res.text;

      const tweet = await request(app)
        .post('/api/tweet/')
        .set('Authorization', `Bearer ${token}`)
        .send({
          tweetText: 'Test Get a tweet from tweetId',
          parentTweet: undefined,
        })

      await request(app)
        .get(`/api/tweet/test/${tweet.body._id}`)
        .expect(200)
        .then(res => {
          const { username, tweetText } = res.body;
          expect(username).toBe('test');
          expect(tweetText).toBe('Test Get a tweet from tweetId');
        });
    });
  });
});
