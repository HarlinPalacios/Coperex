import { Schema, model } from "mongoose";

const empresaSchema = Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    tipo_empresa:{
        type: String
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    year_fundation:{
        type: Number,
    },
    nivel_impacto:{
        type: String,
        reqired: true
    },
    trayectoria:{
        type: Number,
        required: true
    },
    categoria:{
        type: String,
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Empresa", empresaSchema)