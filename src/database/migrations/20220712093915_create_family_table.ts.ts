import { Knex } from 'knex';
import { FAMILY, FAMILY_MEMBERS } from '../constants/table';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(FAMILY, (table) => {
      table.increments('family_id').notNullable().unique().unsigned();
      table.string('family_name').notNullable();
      table.string('address').nullable();
    })
    .createTable(FAMILY_MEMBERS, (table) => {
      table.increments('member_id').notNullable().unique().unsigned();
      table.string('first_name').notNullable();
      table.string('middle_name').notNullable();
      table.string('relationship').notNullable();
      table.integer('family_id').notNullable();

      table
        .foreign('family_id')
        .references('family_id')
        .inTable(FAMILY)
        .onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists(FAMILY_MEMBERS)
    .dropTableIfExists(FAMILY);
}
