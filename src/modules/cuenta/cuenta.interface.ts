import mongoose, { Model, Types } from "mongoose";

export interface ICuenta {
      _id:Types.ObjectId;
      user:Types.ObjectId;
      plan:Types.ObjectId;
      expiracionPrueba:Date;
      fechaEstado:Date;
      activa:Boolean;
      created:Date;
      empresas:Array<Types.ObjectId>;
      users:Array<Types.ObjectId>;
}

export interface ICuentaModel extends ICuenta, Document ,Model<ICuenta>{
      existsAcount(cuentaId:mongoose.Types.ObjectId | null):Promise<boolean>
}
export type NewCreatedCuenta = ICuenta
