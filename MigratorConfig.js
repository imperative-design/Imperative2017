var process = require('process');

module.exports = {
    database: {
        client: 'mysql',
        connection: {
            host: "us-cdbr-iron-east-05.cleardb.net",
            user: "b5d1e148a9ba84",
            password: "48a7d98b",
            database: "heroku_d6140dbbff83350"
        }
    },
    migrationPath: process.cwd() + '/current/core/server/data/migrations',
    currentVersion: 'your-current-database/project-version',
    subfolder: 'upgrades'
}