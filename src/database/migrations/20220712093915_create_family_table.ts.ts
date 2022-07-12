import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('family', (table) => {
      table.increments('family_id').notNullable().unique().unsigned();
      table.string('family_name').notNullable();
      table.string('address').nullable();
    })
    .createTable('members', (table) => {
      table.increments('member_id').notNullable().unique().unsigned();
      table.string('first_name').notNullable();
      table.string('middle_name').notNullable();
      table.string('relationship').notNullable();
      table.integer('family_id').notNullable();

      table
        .foreign('family_id')
        .references('family_id')
        .inTable('family')
        .onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('members').dropTableIfExists('family');
}
