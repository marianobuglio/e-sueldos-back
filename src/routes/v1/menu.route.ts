import { menuController } from "../../modules/menus";
import express, { Router } from 'express';
import { auth } from '../../modules/auth';

const router: Router = express.Router();

router
  .route('/')
  .get(auth('getMenus'),menuController.getMenus);

export default router;
