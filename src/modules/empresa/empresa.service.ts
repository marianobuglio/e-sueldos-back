
import { IEmpresa, NewCreatedEmpresa } from "./empresa.interface";
import Empresa from "./empresa.model";


/**
 * Create cuenta
 * @param {NewCreatedCuenta} cuenta
 * 
 */
export const createEmpresa = async (empresa : NewCreatedEmpresa): Promise<IEmpresa> => {
    if(await Empresa.existsEmpresa(empresa._id)){
        throw  new Error("La cuenta a crear ya existe")
    }
    return Empresa.create(empresa)
}

