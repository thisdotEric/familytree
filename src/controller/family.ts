import { Request, Response } from 'express';
import FamilyService from '../modules/family/family.service';

const familyService = new FamilyService();

const getAllFamilyMembers = async (req: Request, res: Response) => {
  const familyId = parseInt(`${req.params.family_id}`);

  const familyMembers = await familyService.getAllFamilyMembers(familyId);

  res.status(200).send(familyMembers);
};

const getAllFamilies = async (_req: Request, res: Response) => {
  const families = await familyService.getAllFamilies();
  res.status(200).send(families);
};

const getFamilyMemberDetails = async (req: Request, res: Response) => {
  const member_id = parseInt(`${req.params.member_id}`);

  const memberDetails = await familyService.getFamilyMemberDetails(member_id);
  res.status(200).send(memberDetails);
};

const deleteFamilyMember = async (req: Request, res: Response) => {
  const member_id = parseInt(`${req.params.member_id}`);

  await familyService.deleteFamilyMember(member_id);
  res.status(200).send('Ok');
};

export {
  getAllFamilyMembers,
  getAllFamilies,
  getFamilyMemberDetails,
  deleteFamilyMember,
};
