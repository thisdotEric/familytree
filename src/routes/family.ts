import { Router } from 'express';
import {
  addNewFamilyMember,
  deleteFamilyMember,
  getAllFamilies,
  getAllFamilyMembers,
  getFamilyDetails,
  getFamilyMemberDetails,
  updateFamilyMemberDetails,
} from '../controller/family';

const router = Router();

router.get('/', getAllFamilies);
router.get('/:family_id', getAllFamilyMembers);
router.post('/:family_id', addNewFamilyMember);
router.get('/member/:member_id', getFamilyMemberDetails);
router.delete('/member/:member_id', deleteFamilyMember);
router.patch('/member', updateFamilyMemberDetails);
router.get('/:family_id/details', getFamilyDetails);

export default router;
