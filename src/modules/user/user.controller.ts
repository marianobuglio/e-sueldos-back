import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as userService from './user.service';
import * as amqp  from 'amqplib';
import config from '../../config/config';




export const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['userId'] === 'string') {
    const user = await userService.getUserById(new mongoose.Types.ObjectId(req.params['userId']));
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
  }
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['userId'] === 'string') {
    const user = await userService.updateUserById(new mongoose.Types.ObjectId(req.params['userId']), req.body);
    res.send(user);
  }
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['userId'] === 'string') {
    await userService.deleteUserById(new mongoose.Types.ObjectId(req.params['userId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});

const recieverNewAccountUser = async () =>{
  try {
    
    const exchangeName = 'newCuenta'
    const exchangeType = 'topic'
    const queue = 'securityUser'
    const pattern = 'cuenta.user'
    const conn = await amqp.connect(config.amqp)   
    const channel = await conn.createChannel()
    await channel.assertExchange(exchangeName,exchangeType)
    await channel.assertQueue(queue)
    await channel.bindQueue(queue,exchangeName,pattern)

    channel.consume(queue, async (message: amqp.ConsumeMessage | null) => {
      try {
        if(message){
          const user = JSON.parse(message.content.toString())
          console.log(user)
          delete user.__v
          await userService.updateUserById(user._id,user)
          channel.ack(message)
        }
      } catch (error) {
        console.log(error)
      }
    })
    
  } catch (error) {
    console.log(error)
  }
}

 recieverNewAccountUser()



