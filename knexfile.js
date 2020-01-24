// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/users.db3'
    },
    migrations: {
      directory:'./data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
     afterCreate: (conn, done) => {
       conn.run('Pragma foreign_keys = ON', done)
     }
    }
 }
}
