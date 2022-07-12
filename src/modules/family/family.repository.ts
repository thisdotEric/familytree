import knex, { Knex } from 'knex';
import config from '../../database/knexfile';
import { FAMILY, FAMILY_MEMBERS } from '../../database/constants/table';

export default class FamilyRepository {
  private readonly db: Knex;

  constructor() {
    this.db = knex(config['development']);
  }

  async getAllFamilyMembers(family_id: number) {
    const familyMembers = await this.db(FAMILY_MEMBERS).where({ family_id });

    return familyMembers;
  }

  async getAllFamilies() {
    const families = await this.db(FAMILY).select('*');
    return families;
  }
}
