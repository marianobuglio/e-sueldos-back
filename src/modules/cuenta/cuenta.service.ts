
import { ICuenta, NewCreatedCuenta } from "./cuenta.interface";
import Cuenta from "./cuenta.model";



/**
 * Create cuenta
 * @param {NewCreatedCuenta} cuenta
 * 
 */
export const createCuenta = async (cuenta : NewCreatedCuenta): Promise<ICuenta> => {
    if(await Cuenta.existsAcount(cuenta._id)){
        throw  new Error("La cuenta a crear ya existe")
    }
    return Cuenta.create(cuenta)
}


