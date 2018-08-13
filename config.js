/**
 * Exports config
 */
module.exports = {
    app: {
        id: process.env.MICROSOFT_APP_ID,
        password: process.env.MICROSOFT_APP_PASSWORD
    },
    message: {
        default_delay: process.env.MESSAGE_DELAY_MS || 2000
    },
    server: {
        local_dev: process.env.LOCAL_DEV || true,
        end_point: process.env.END_POINT || '/api/messages',
        port: process.env.port || process.env.PORT || 3978
    },
    stateDataBase: {
        db_host: process.env.STATE_DB_HOST,
        db_master_key: process.env.STATE_DB_MASTER_KEY,
        db_name: process.env.STATE_DB_NAME,
        db_collection: process.env.STATE_DB_COLLECTION,
    }
};
