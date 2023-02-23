import { createEmpresa } from "./empresa.service"
import * as amqp from 'amqplib'
import config from "../../config/config";

export const recieverNewAccountEmpresa = async () =>{
    try {
      const exchangeName = 'newCuenta'
      const exchangeType = 'topic'
      const queue = 'securityEmpresa'
      const pattern = 'cuenta.empresa'

      const conn = await amqp.connect(config.amqp)   
      const channel = await conn.createChannel()
      await channel.assertExchange(exchangeName,exchangeType)
      await channel.assertQueue(queue)
      await channel.bindQueue(queue,exchangeName,pattern)
  
      channel.consume(queue, async (message: amqp.ConsumeMessage | null) => {
        try {
          if(message){
            const empresa = JSON.parse(message.content.toString())
            console.log(empresa)
            delete empresa.__v
            createEmpresa(empresa)
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
 

