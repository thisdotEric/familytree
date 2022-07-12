import { Request, Response } from 'express';
import FamilyService from '../modules/family/family.service';

const familyService = new FamilyService();

const getAllFamilyMembers = async (_req: Request, res: Response) => {
  const familyMembers = await familyService.getAllFamilyMembers(1);

  res.status(200).send(familyMembers);
};

export { getAllFamilyMembers };
