
import * as amqp from 'amqplib'
import config from "../../config/config";
import { createCuenta } from './cuenta.service';

export const recieverNewAccountCuenta = async () =>{
    try {
      
      const exchangeName = 'newCuenta'
      const exchangeType = 'topic'
      const queue = 'securityCuenta'
      const pattern = 'cuenta.cuenta'

      const conn = await amqp.connect(config.amqp)   
      const channel = await conn.createChannel()
      await channel.assertExchange(exchangeName,exchangeType)
      await channel.assertQueue(queue)
      await channel.bindQueue(queue,exchangeName,pattern)
  
      channel.consume(queue, async (message: amqp.ConsumeMessage | null) => {
        try {
          if(message){
            const cuenta = JSON.parse(message.content.toString())
            console.log(cuenta)
            createCuenta(cuenta)
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

  recieverNewAccountCuenta()