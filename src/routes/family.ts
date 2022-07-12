import { Router } from 'express';
import familyController from '../controller/family';

const router = Router();

router.get('/', familyController.getFamilyMembers);

export default router;
