

import mongoose from 'mongoose';
import { toJSON } from '../toJSON';
import { IEmpresa, IEmpresaModel } from './empresa.interface'; 
const { Schema } = mongoose


const EmpresaSchema = new mongoose.Schema<IEmpresa, IEmpresaModel>(
    {
        user:{ 
            type: Schema.Types.ObjectId, ref: 'User',
            required:true
        },
        cuit:{
            type:Number,
            required:true
        },
        tipoEmpresa:{
            type:String,
            required:true
        },
        domicilio:{
            type:String,
            required:true
        },
        mail:{
            type:String,
            required:true
        },
        cuenta:{
            type:Schema.Types.ObjectId,
            ref:'Cuenta'
        },
        name:{
            type:String,
            required:true
        },
        created:{
            type:Date,
            required:true
        },
    },
    {
        timestamps: true,
    }
);

EmpresaSchema.plugin(toJSON)
/**
 * Check if email is taken
 * @param {ObjectId} cuentaId - The user's email
 * @returns {Promise<boolean>}
 */
EmpresaSchema.static('existsEmpresa', async function (empresaId: mongoose.Types.ObjectId): Promise<boolean> {
    const empresa = await this.findOne({ _id:empresaId });
    return !!empresa;
});

const Empresa = mongoose.model<IEmpresa,IEmpresaModel>('Empresa',EmpresaSchema)

export default Empresa
