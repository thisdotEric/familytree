import { FamilyMember } from 'src/interfaces/family';
import FamilyRepository, { FamilyMemberWithID } from './family.repository';

export default class FamilyService {
  private readonly familyRepo: FamilyRepository;

  constructor() {
    this.familyRepo = new FamilyRepository();
  }

  async getAllFamilies() {
    return this.familyRepo.getAllFamilies();
  }

  async getAllFamilyMembers(family_id: number) {
    return this.familyRepo.getAllFamilyMembers(family_id);
  }

  async getFamilyMemberDetails(member_id: number) {
    return this.familyRepo.getMemberDetails(member_id);
  }

  async deleteFamilyMember(member_id: number) {
    return this.familyRepo.deleteFamilyMember(member_id);
  }

  async addNewFamilyMember(
    family_id: number,
    newMember: Partial<FamilyMember>
  ) {
    return this.familyRepo.addNewFamilyMember(family_id, newMember);
  }

  async getFamilyDetails(family_id: number) {
    return this.familyRepo.getFamilyDetails(family_id);
  }

  async updateFamilyMemberDetails(
    updatedMemberInfo: Partial<FamilyMemberWithID>
  ) {
    return this.familyRepo.updateMemberInformation(updatedMemberInfo);
  }
}
