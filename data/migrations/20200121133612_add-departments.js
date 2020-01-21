
exports.up = function(knex) {
    return knex.schema.table('users', tbl => {
        tbl.string('department')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.table('users', tbl => {
        tbl.dropColumn
    })
  };
  