import mongoose, { Model } from "mongoose";

export interface IPlan {
    created:Date;
    cantidadUsuarios: Number,
    cantidadEmpresas: Number,
    cantidadLegajos: Number,
    cantidadTransacciones: Number,
    precio: Number,
    name:String
    menus:Array<mongoose.Types.ObjectId>
}

export interface IPlanModel extends IPlan, Document ,Model<IPlan>{
      existsPlan(planId:mongoose.Types.ObjectId | null):Promise<boolean>
}
export type NewPlanCuenta = IPlan
