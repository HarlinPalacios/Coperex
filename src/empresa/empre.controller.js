import Empresa from "./empre.model.js"
import { saveExcel } from "../export/excel.js";
import path from "path";

//Registro de la empresa
export const registroE = async (req, res) => {
    try{
        const {name, tipo_empresa, phone, year_fundation, nivel_impacto, trayectoria, categoria} = req.body;
        const empresa = new Empresa({
            name,
            tipo_empresa,
            phone,
            year_fundation,
            nivel_impacto,
            trayectoria,
            categoria
        })

        await empresa.save();

        return res.status(200).json({
            message: "Empresa registrada exitosamente",
            empresaDetails: { 
                uid: empresa._id,
                nombre: empresa.name,
                phone: empresa.phone,
                categoria
            }
        })
    }catch (err) {
        return res.status(500).json({
            message: "Error al registrar una empresa con el mismo nombre",
            error: err.message
        })
    }
}

//Listar todas las empresas 
export const getEmpresa = async (req, res) => {
    try {
        const empresa = await Empresa.find();

        if (empresa.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No hay empresas registradas."
            });
        }

        const currentYear = new Date().getFullYear(); 
        const cleanData = empresa.map(empresa => ({
            ...empresa.toObject(),
            _id: empresa._id.toString(),
            trayectoria: currentYear - empresa.fundation 
        }));

        const filename = "reporte_empresas.xlsx";
        const filePath = saveExcel(cleanData, filename);

        res.status(200).json({
            success: true,
            message: `Datos exportados a ${filename}`,
            companies: cleanData,
            downloadUrl: `/exports/${filename}`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las empresas",
            error: error.message
        });
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getEmpresas = async (req, res) => {
    try{
        const { order, categoria, trayectoria} = req.query
        const query = { status: true }

        if(categoria) {
            query.categoria = categoria//para la url en postman poner v1/empresa/listar?categoria="nombre de la categoria"
        }

        let sortOrder = {}

        if(order === "AZ"){
            sortOrder.name = 1 // para la url en postman poner v1/empresa/listar?order=AZ
        }else if(order === "ZA"){
            sortOrder.name = -1 // para la url en postman poner v1/empresa/listar?order=ZA
        }

        if(trayectoria === "mayor"){
            sortOrder.trayectoria = -1 // para la url en postman porner /v1/empresa/listar?trayectoria=mayor=50
        }else if(trayectoria === "menor"){
            sortOrder.trayectoria = 1 // para la url en postman poner /v1/empresa/listar?trayectoria=mayor=50
        }

        if(trayectoria && trayectoria.startsWith("mayor")){
            const years = parseInt(trayectoria.split("=")[1])
            if (!isNaN(years)) {
                query.trayectoria = { $gt: years }
            }
        }

        if (trayectoria && trayectoria.startsWith("menor")) {
            const years = parseInt(trayectoria.split("=")[1])
            if (!isNaN(years)) {
                query.trayectoria = { $lt: years }
            }
        }

        const empresas = await Empresa.find(query).sort(sortOrder)

        if(empresas.length === 0 ){
            return res.status(404).json({
                success: false,
                message: "No se pudo encontrar ninguna empresa"
            })
        }
        
        return res.status(200).json({
            success: true,
            message: "Empresas listadas correctamente",
            empresas
        })

    }catch (err) {
        return res.status(500).json({
            success: false,
            message : "Error al obtener las empresas",
            error: err.message
        })
    }
}

//Editar informacion de la empresa 
export const edittarEm = async (req, res) => {
    try{
        const { uid } = req.params
        const data = req.body;

        const empresa = await Empresa.findById(uid);
        

        if (!empresa) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }
        const edittarEm = await Empresa.findByIdAndUpdate(uid, data, {new: true})

        res.status(200).json({
            message: "Empresa actualizada correctamente",
                empresa: edittarEm
        })

        await empresa.save(); 
        
    }catch (err) {
        return res.status(500).json({
            message: "Error al actualizar los datos de la empresa",
            error: err.message
        })
    }
}