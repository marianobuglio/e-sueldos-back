import catchAsync from "../utils/catchAsync";
import pick from "../utils/pick";
import { Request, Response } from 'express';
import { IOptions } from "../paginate/paginate";
import { menuService } from ".";



export const getMenus = catchAsync(async (req: Request, res: Response) => {

    const filter = pick(req.query, ['name', 'role']);
    const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
    const result = await menuService.queryUsers(filter, options);
    const  menus = {
      compact:result.results,
      default:result.results,
      futuristic:result.results,
      horizontal:result.results
    }
    res.send(menus);
    
  });