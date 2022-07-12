import { Router } from 'express';
import { getAllFamilies, getAllFamilyMembers } from '../controller/family';

const router = Router();

router.get('/', getAllFamilies);
router.get('/:family_id', getAllFamilyMembers);
router.get('/:family_id/member/:member_id', getAllFamilyMembers);

export default router;
