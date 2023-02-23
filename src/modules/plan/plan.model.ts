import mongoose, { Schema } from 'mongoose';
import { toJSON } from '../toJSON';
import { IPlan,  IPlanModel } from './plan.interface'; 

    // created:Date;
    // cantidadUsuarios: Number,
    // cantidadEmpresas: Number,
    // cantidadLegajos: Number,
    // cantidadTransacciones: Number,
    // precio: Number,
    // name:String
    // menus:Array<mongoose.Types.ObjectId>

const PlanSchema = new mongoose.Schema<IPlan, IPlanModel>(
    {
        cantidadUsuarios:{
            type:Number,
            required:true
        },
        cantidadEmpresas:{
            type:Number,
            required:true
        },
        cantidadLegajos:{
            type:Number,
            required:true
        },
        cantidadTransacciones:{
            type:Number,
            required:true
        },
        menus:[{
            type:Schema.Types.ObjectId,
            ref:'Menu'
        }],
        created:{
            type:Date,
            required:true
        },
    },
    {
        timestamps: true,
    }
);

PlanSchema.plugin(toJSON)
/**
 * Check if email is taken
 * @param {ObjectId} cuentaId - The user's email
 * @returns {Promise<boolean>}
 */
PlanSchema.static('existsPlan', async function (planId: mongoose.Types.ObjectId): Promise<boolean> {
    const plan = await this.findOne({ _id:planId });
    return !!plan;
});

const Plan = mongoose.model<IPlan,IPlanModel>('Plan',PlanSchema)

export default Plan
