var process = require('process');

module.exports = {
    database: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'user',
            password: 'password',
            charset: 'utf8',
            database: 'ghost'
        }
    },
    migrationPath: process.cwd() + '/current/core/server/data/migrations',
    currentVersion: 'your-current-database/project-version',
    subfolder: 'upgrades'
}

module.exports = {
    database: {
        client: 'sqlite3',
        connection: {
            filename: './content/data/ghost-test.db'
        }
    },
    migrationPath: process.cwd() + '/current/core/server/data/migrations',
    currentVersion: 'your-current-database-version'
}