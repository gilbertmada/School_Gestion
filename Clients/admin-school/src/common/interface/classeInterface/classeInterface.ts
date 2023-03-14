import { IProfessor } from './professorClasse';
export interface IClasseName {
    className: string;
    schoolName: string;
}
export interface IClasse {
    _id: string;
    dataClasse: IClasseName;
    prof: IProfessor;
    deleted: boolean;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    urlPlus?: string;
}
  
  