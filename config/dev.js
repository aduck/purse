module.exports = {
  // mysql
  mysql: {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'purse',
    multipleStatements: true
  },
  // redis
  redis: {
    port: 6379,
    host: '127.0.0.1',
    family: 4,
    password: ''
  },
  // jwt
  token: {
    secret: 'hello world',
    expiresIn: 2 * 60 * 60
  },
  // mail
  mail: {
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
      user: 'test@qq.com',
      pass: '123456'
    }
  },
  // mongodb
  mongodb: {
    address: 'localhost:27017/agenda',
    collection: 'agendaJobs'
  }
}