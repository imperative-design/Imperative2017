var config = require('./core/server/config'),
    ghostVersion = require('./core/server/utils/ghost-version');

console.log("================ config ================");
console.log(config);
/**
 * knex-migrator can be used via CLI or within the application
 * when using the CLI, we need to ensure that our global overrides are triggered
 */
require('./core/server/overrides');

module.exports = {
    currentVersion: ghostVersion.safe,
    database: config.get('database'),
    migrationPath: config.get('paths:migrationPath')
};
