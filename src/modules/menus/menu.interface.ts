import  { Model, Document } from 'mongoose';
import { QueryResult } from "../paginate/paginate";



export interface IMenu {
        
        title: string;
        subtitle: string;
        type:string;
        hidden:boolean;
        active: boolean;
        disabled: boolean;
        tooltip: string;
        link: string;
        fragment: string;
        preserveFragment: boolean;
        externalLink: boolean;
        target: string;
        classes: {
            title: string;
            subtitle: string;
            icon: string;
            wrapper: string;
        };
        icon: string;
        badge: {
            title: string;
            classes: string;
        };
        children: Array<any>;
        created:Date
}


export interface IMenuDoc extends IMenu, Document {
    isPasswordMatch(password: string): Promise<boolean>;
  }
  
  export interface IMenuModel extends Model<IMenuDoc> {
    paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
  }
export type NewCreatedMenu= IMenu
