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
}
