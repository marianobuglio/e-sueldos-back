import mongoose from 'mongoose';
import { toJSON } from '../toJSON';
import { ICuenta, ICuentaModel } from './cuenta.interface'
const { Schema } = mongoose

const cuentaSchema = new mongoose.Schema<ICuenta, ICuentaModel>(
    {
        user:{ 
            type: Schema.Types.ObjectId, ref: 'User',
            required:true
        },
        plan:{
            type: Schema.Types.ObjectId, ref: 'Plan',
            required:true 
        },
        expiracionPrueba:{
            type:Date,
            required:true
        },
        fechaEstado:{
            type:Date,
            required:true
        },
        activa:{
            type:Boolean,
            required:true
        },
        created:{
            type:Date,
            required:true
        },
        empresas:[{
            type:Schema.Types.ObjectId,ref:'Empresas',
            required:true
        }]
        // users
    },
    {
        timestamps: true,
    }
);

cuentaSchema.plugin(toJSON)
/**
 * Check if email is taken
 * @param {ObjectId} cuentaId - The user's email
 * @returns {Promise<boolean>}
 */
cuentaSchema.static('existsAcount', async function (cuentaId: mongoose.Types.ObjectId): Promise<boolean> {
    const cuenta = await this.findOne({ _id:cuentaId });
    return !!cuenta;
});

const Cuenta = mongoose.model<ICuenta,ICuentaModel>('Cuenta',cuentaSchema)

export default Cuenta
