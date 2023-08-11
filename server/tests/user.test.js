const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = require('../app');
const { connect } = require('../index');
const User = require('../models/User');

describe('User test', () => {
  beforeAll((done) => {
    connect(process.env.MONGODB_URI_TEST);
    return done();
  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
  });

  describe('GET user/', () => {
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
        .get('/api/user/')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(res => {
          expect(Array.isArray(res.body.tweets)).toBeTruthy();
          expect(Array.isArray(res.body.followers)).toBeTruthy();
          expect(Array.isArray(res.body.following)).toBeTruthy();
          expect(Array.isArray(res.body.timeline)).toBeTruthy();
        });
    });
  });

  describe('POST user/:username/follow', () => {
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
      user.save();

      const hashPassword2 = await bcrypt.hash('test2', salt);
      const user2 = new User({
        username: 'test2',
        password: hashPassword2,
        userFullname: 'Test2'
      });
      user2.save();
    });

    afterAll(async () => {
      await User.findOneAndDelete({ username: 'test' });
      await User.findOneAndDelete({ username: 'test2' });
    });

    test('follow and unfollow another username', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'test',
          password: 'test'
        });
      const token = res.text;

      await request(app)
        .post('/api/user/test2/follow')
        .send({
          follow: true
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(res => {
          expect(res).toBeDefined();
        });

      let userTest = await request(app).get('/api/user/test/follow');
      expect(userTest.body.following.length).toBe(1);

      let userTest2 = await request(app).get('/api/user/test2/follow');
      expect(userTest2.body.followers.length).toBe(1);

      await request(app)
        .post('/api/user/test2/follow')
        .send({
          unfollow: true
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(res => {
          expect(res).toBeDefined();
        });

      userTest = await request(app).get('/api/user/test/follow');
      expect(userTest.body.following.length).toBe(0);

      userTest2 = await request(app).get('/api/user/test2/follow');
      expect(userTest2.body.followers.length).toBe(0);
    });
  });

  describe('GET user/:username/follow', () => {
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
      user.save();

      const hashPassword2 = await bcrypt.hash('test2', salt);
      const user2 = new User({
        username: 'test2',
        password: hashPassword2,
        userFullname: 'Test2'
      });
      user2.save();
    });

    afterAll(async () => {
      await User.findOneAndDelete({ username: 'test' });
      await User.findOneAndDelete({ username: 'test2' });
    });

    test('fetch lists of follower and following of a username', async () => {
      await request(app)
        .get('/api/user/test/follow')
        .expect(200)
        .then(res => {
          expect(Array.isArray(res.body.followers)).toBeTruthy();
          expect(Array.isArray(res.body.following)).toBeTruthy();
          expect(res.body.followers.length).toBe(0);
          expect(res.body.following.length).toBe(0);
        });
    });
  });
});
