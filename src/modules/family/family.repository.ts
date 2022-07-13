import knex, { Knex } from 'knex';
import config from '../../database/knexfile';
import { FAMILY, FAMILY_MEMBERS } from '../../database/constants/table';
import { FamilyMember } from '../../interfaces/family';

export type FamilyMemberWithID = FamilyMember & { member_id: number };

export default class FamilyRepository {
  private readonly db: Knex;

  constructor() {
    const env =
      process.env.NODE_ENV == undefined ? 'development' : process.env.NODE_ENV;

    this.db = knex(config[env]);
  }

  async getAllFamilyMembers(family_id: number): Promise<FamilyMemberWithID[]> {
    const familyMembers_rows = await this.db
      .raw(`select m.member_id, m.first_name, m.middle_name, f.family_name, m.relationship, f.address from members m 
    join family f on m.family_id = f.family_id where m.family_id = ${family_id};`);

    const familyMembers: FamilyMemberWithID[] = familyMembers_rows.rows.map(
      (member: any) => ({
        member_id: member.member_id,
        firstName: member.first_name,
        middleName: member.middle_name,
        lastName: member.family_name,
        relationship: member.relationship,
        address: member.address,
      })
    );

    return familyMembers;
  }

  async getAllFamilies() {
    const families = await this.db(FAMILY).select('*');
    return families;
  }

  async getMemberDetails(member_id: number): Promise<FamilyMemberWithID> {
    const member_row = await this.db.raw(
      `select m.member_id, m.first_name, m.middle_name, f.family_name, m.relationship, f.address from members m 
      join family f on m.family_id = f.family_id  where member_id = ${member_id};`
    );

    const memberDetails: FamilyMemberWithID = {
      member_id: member_row.rows[0].member_id,
      firstName: member_row.rows[0].first_name,
      middleName: member_row.rows[0].middle_name,
      lastName: member_row.rows[0].family_name,
      relationship: member_row.rows[0].relationship,
      address: member_row.rows[0].address,
    };

    return memberDetails;
  }

  async deleteFamilyMember(member_id: number) {
    console.log('Sdfkbsdflabsdf');

    await this.db(FAMILY_MEMBERS).where({ member_id }).delete();
  }

  async addNewFamilyMember(
    family_id: number,
    { firstName, middleName, relationship }: FamilyMember
  ) {
    const addedMember = await this.db(FAMILY_MEMBERS)
      .insert({
        first_name: firstName,
        middle_name: middleName,
        relationship,
        family_id,
      })
      .returning('member_id');

    const details = await this.getMemberDetails(addedMember[0].member_id);

    return details;
  }

  async updateMemberInformation({
    member_id,
    middleName,
    firstName,
    relationship,
  }: Partial<FamilyMemberWithID>) {
    await this.db(FAMILY_MEMBERS)
      .update({
        first_name: firstName,
        middle_name: middleName,
        relationship,
      })
      .where({
        member_id,
      });
  }
}
