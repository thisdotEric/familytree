import { Router } from 'express';
import { getAllFamilyMembers } from '../controller/family';

const router = Router();

router.get('/', getAllFamilyMembers);

export default router;
