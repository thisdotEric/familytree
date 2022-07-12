import knex, { Knex } from 'knex';
import config from '../../database/knexfile';
import { FAMILY, FAMILY_MEMBERS } from '../../database/constants/table';
import { FamilyMember } from '../../interfaces/family';

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

  async getMemberDetails(member_id: number): Promise<FamilyMember> {
    const member_row = await this.db.raw(
      `select m.member_id, m.first_name, m.middle_name, f.family_name, m.relationship, f.address from members m 
      join family f on m.family_id = f.family_id  where member_id = ${member_id};`
    );

    const memberDetails: FamilyMember = {
      firstName: member_row.rows[0].first_name,
      middleName: member_row.rows[0].middle_name,
      lastName: member_row.rows[0].last_name,
      relationship: member_row.rows[0].relationship,
      address: member_row.rows[0].address,
    };

    return memberDetails;
  }
}
