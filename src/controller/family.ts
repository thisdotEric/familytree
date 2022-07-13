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

const addNewFamilyMember = async (req: Request, res: Response) => {
  const family_id = parseInt(`${req.params.family_id}`);

  const { firstName, middleName, relationship } = req.body;
  const newMember = await familyService.addNewFamilyMember(family_id, {
    firstName,
    middleName,
    relationship,
  });

  res.status(201).send(newMember);
};

const updateFamilyMemberDetails = async (req: Request, res: Response) => {
  const { firstName, middleName, relationship, member_id } = req.body;

  await familyService.updateFamilyMemberDetails({
    member_id,
    firstName,
    middleName,
    relationship,
  });

  res.status(200).send('Ok');
};

const getFamilyDetails = async (req: Request, res: Response) => {
  const family_id = parseInt(`${req.params.family_id}`);

  const familyDetails = await familyService.getFamilyDetails(family_id);
  res.status(200).send(familyDetails);
};

export {
  getAllFamilyMembers,
  getAllFamilies,
  getFamilyMemberDetails,
  deleteFamilyMember,
  addNewFamilyMember,
  updateFamilyMemberDetails,
  getFamilyDetails,
};
