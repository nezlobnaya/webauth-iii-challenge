
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
      users.increments()
      users.string('username', 128)
      .notNullable()
      .unique()
      users.string('password', 280).notNullable()
      users.string('role', 128).notNullable().defaultTo('user')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
