import { Request, Response } from "express";
import { Classe } from "../entity/Classes";
import { getUserIdFromToken } from "../utils/user";
import { Professor } from "../entity/Professor";
export default class classesController {
    static createClasses = async (req: Request, res: Response) => {

        const token = <string>res.getHeader("token");
        const classe = req.body;       
        const findProfessor = await Professor.findOne({ _id: classe.professor })
        const newClasse = new Classe({
            className: classe.className,
            schoolName: classe.schoolName,
            professor: findProfessor,
            createdBy: getUserIdFromToken(token),
            deleted: false,
        });

        try {
            
            const saveClasse = await newClasse.save();
       

            res.send(saveClasse);
        } catch (error) {
            res.status(500).send("Failed to save Classe");
        }
    };


  static listClasses = async (req: Request, res: Response) => {
    const classes= await Classe.find({ deleted: false });

    const returnedClasses = [];

    for (let i = 0; i < classes.length; i++) {
        returnedClasses.push(classes[i].transform());
    }

    return res.status(200).send(returnedClasses);
  };
}