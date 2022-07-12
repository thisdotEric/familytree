import FamilyRepository from './family.repository';

export default class FamilyService {
  private readonly familyRepo: FamilyRepository;

  constructor() {
    this.familyRepo = new FamilyRepository();
  }

  async getAllFamilyMembers(family_id: number) {
    return this.familyRepo.getAllFamilyMembers(family_id);
  }
}
