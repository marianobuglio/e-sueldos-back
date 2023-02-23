import { IOptions, QueryResult } from "../paginate/paginate";
import Menu from "./menu.model";

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryUsers = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
    const users = await Menu.paginate(filter, options);
    return users;
};