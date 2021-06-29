const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = require('../app');
const { connect } = require('../index');
const User = require('../models/User');

describe('Auth test', () => {
  beforeAll((done) => {
    connect(process.env.MONGODB_URI_TEST);
    return done();
  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
  });

  describe('POST auth/signup', () => {
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
    });

    test('reject signup if username is already in DB', async () => {
      await request(app)
        .post('/api/auth/signup')
        .send({
          username: 'test',
        })
        .expect(400);
    });

    test('receive user._id if signup is successful', async () => {
      await request(app)
        .post('/api/auth/signup')
        .send({
          username: 'test2',
          password: 'test2',
          userFullname: 'Test2'
        })
        .expect(200)
        .then(res => {
          expect(res).toBeDefined();
        });
    });
  });

  describe('POST auth/login', () => {
    beforeAll(async () => {
      User.findOneAndDelete({ username: 'test' });

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash('test', salt);

      const user = new User({
        username: 'test',
        password: hashPassword,
        userFullname: 'Test'
      });
      user.save();
    });

    test('reject login if username is not in DB', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          username: '',
        })
        .expect(400);
    });

    test('reject login if password is wrong', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          username: 'test',
          password: '',
        })
        .expect(400);
    });

    test('token is defined in header if login is successful', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          username: 'test',
          password: 'test'
        })
        .expect(200)
        .then(res => {
          expect(res.header['auth-token']).toBeDefined();
          expect(res.text).toBeDefined();
        });
    });
  });
});
