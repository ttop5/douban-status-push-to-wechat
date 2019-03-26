var convict = require('convict')

var config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        arg: 'env',
        env: "NODE_ENV"
    },
    userid: {
        doc: "豆瓣用户id",
        format: 'String',
        default: '',
        env: 'USERID'
    },
    sckey: {
        doc: "Server酱申请的SCKEY",
        format: 'String',
        default: '',
        env: 'SCKEY'
    }
})

config.validate({ allowed: 'strict' })

module.exports = config
