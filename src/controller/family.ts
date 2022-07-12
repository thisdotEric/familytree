import { Request, Response } from 'express';

class FamilyController {
  async getFamilyMembers(req: Request, res: Response) {
    res.send('Get all family members');
  }
}

export default new FamilyController();
