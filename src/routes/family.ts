import { Router } from 'express';
import {
  deleteFamilyMember,
  getAllFamilies,
  getAllFamilyMembers,
  getFamilyMemberDetails,
} from '../controller/family';

const router = Router();

router.get('/', getAllFamilies);
router.get('/:family_id', getAllFamilyMembers);
router.get('/member/:member_id', getFamilyMemberDetails);
router.delete('/member/:member_id', deleteFamilyMember);

export default router;
