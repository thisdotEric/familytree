import { Router } from 'express';
import {
  getAllFamilies,
  getAllFamilyMembers,
  getFamilyMemberDetails,
} from '../controller/family';

const router = Router();

router.get('/', getAllFamilies);
router.get('/:family_id', getAllFamilyMembers);
router.get('/member/:member_id', getFamilyMemberDetails);

export default router;
