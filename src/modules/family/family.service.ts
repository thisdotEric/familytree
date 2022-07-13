import FamilyRepository from './family.repository';

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
}
