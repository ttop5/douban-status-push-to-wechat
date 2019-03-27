const convict = require('convict');


const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    arg: 'env',
    env: 'NODE_ENV'
  },
  userid: {
    doc: '豆瓣用户 id',
    format: 'int',
    default: 133283807,
    env: 'USERID'
  },
  sckey: {
    doc: 'Server 酱申请的 SCKEY',
    format: 'String',
    default: '',
    env: 'SCKEY'
  }
});

config.validate({ allowed: 'strict' });


module.exports = config;
