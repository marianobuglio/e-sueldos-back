import mongoose, { Model, Types } from "mongoose";

export interface IEmpresa {
      _id:Types.ObjectId;
      cuit:Number;
      tipoEmpresa:string;
      domicilio:String;
      mail:string;
      cuenta:Types.ObjectId;
      user:Types.ObjectId;
      created:Date;
      name:string;
}

export interface IEmpresaModel extends IEmpresa, Document ,Model<IEmpresa>{
      existsEmpresa(empresaId:mongoose.Types.ObjectId | null):Promise<boolean>
}
export type NewCreatedEmpresa = IEmpresa
