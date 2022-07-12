import { Knex } from 'knex';
import { FAMILY, FAMILY_MEMBERS } from '../constants/table';
import { Family, FamilyMember } from '../../interfaces/family';

type FamilyMemberDb = FamilyMember & { family_id: number };

const family: Family[] = [
  {
    familyName: 'Perez',
    address: 'Camarines Sur',
  },
  {
    familyName: 'Bryant',
    address: 'Laguna',
  },
];

export async function seed(knex: Knex): Promise<void> {
  await knex(FAMILY_MEMBERS).delete();
  await knex(FAMILY).del();

  // Insert a family
  const familyIDS = await knex(FAMILY)
    .insert(
      family.map(({ address, familyName }) => ({
        family_name: familyName,
        address,
      }))
    )
    .returning('family_id');

  const PerezFamilyMembersID = familyIDS[0].family_id as number;

  const PerezFamilyMembers: FamilyMemberDb[] = [
    {
      family_id: PerezFamilyMembersID,
      relationship: 'father',
      firstName: 'Nestor',
      middleName: 'Balana',
      lastName: '',
      address: '',
    },
    {
      family_id: PerezFamilyMembersID,
      relationship: 'mother',
      firstName: 'Maria',
      middleName: 'Achondo',
      lastName: '',
      address: '',
    },
    {
      family_id: PerezFamilyMembersID,
      relationship: 'child',
      firstName: 'Arlyn',
      middleName: 'Achondo',
      lastName: '',
      address: '',
    },
    {
      family_id: PerezFamilyMembersID,
      relationship: 'child',
      firstName: 'Miko',
      middleName: 'Achondo',
      lastName: '',
      address: '',
    },
  ];

  await knex(FAMILY_MEMBERS).insert(
    PerezFamilyMembers.map(
      ({ firstName, middleName, relationship, family_id }) => ({
        first_name: firstName,
        middle_name: middleName,
        relationship,
        family_id,
      })
    )
  );
}
