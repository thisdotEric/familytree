import { Router } from 'express';
import {
  addNewFamilyMember,
  deleteFamilyMember,
  getAllFamilies,
  getAllFamilyMembers,
  getFamilyMemberDetails,
  updateFamilyMemberDetails,
} from '../controller/family';

const router = Router();

router.get('/', getAllFamilies);
router.get('/:family_id', getAllFamilyMembers);
router.get('/member/:member_id', getFamilyMemberDetails);
router.delete('/member/:member_id', deleteFamilyMember);
router.post('/member', addNewFamilyMember);
router.patch('/member', updateFamilyMemberDetails);

export default router;
