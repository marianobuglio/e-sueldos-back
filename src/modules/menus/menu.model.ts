
import mongoose from 'mongoose';
import paginate from '../paginate/paginate';
// import paginate from '../paginate/paginate';
import { toJSON } from '../toJSON';
import { IMenuDoc, IMenuModel } from './menu.interface';


const MenuSchema: mongoose.Schema<IMenuDoc,IMenuModel> = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        subtitle:{
            type:String,
        },
        type:{
            type:String,
            required:true,
            enum:[ 'aside', 'basic', 'collapsable', 'divider', 'group', 'spacer']
        },
        hidden:{
            type:Boolean,
            default:false,
        },
        active:{
            type:Boolean,
        },
        disabled:{
            type:Boolean,
        },
        tooltip:{
            type:String
        },
        link:{
            type:String,
            required:true
        },
        externalLink:{
            type:Boolean
        },
        target:{
            type:String,
            enum:[ '_blank', '_self', '_parent', '_top']
        },
        created:{
            type:Date,
            required:true
        },
        classes: {
            title: String,
            subtitle: String,
            icon: String,
            wrapper: String
        },
        icon:{
            type:String,
            required:true
        },
        children:[{
            type:Object
        }]
    },
    {
        timestamps: true,
    }
);

MenuSchema.plugin(toJSON)
MenuSchema.plugin(paginate)

const Menu = mongoose.model<IMenuDoc,IMenuModel>('Menu',MenuSchema)

export default Menu
