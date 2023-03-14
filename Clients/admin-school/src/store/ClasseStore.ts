import axios from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import config from '../config';
import { parseError } from '../services/utils';
import { IClasse } from '../common/interface/classeInterface/classeInterface';
import {IProfessor} from '../common/interface/classeInterface/professorClasse';
import rootStore from './AppStore';

export interface ClasseStoreInterface {
    isLoading: boolean;
    allClass: IClasse[];
    prof: IProfessor | null;
    class: IClasse | null;
    isFromBooking: boolean;
    setIsFromBooking: (val: boolean) => void;
    setClass: (cla: IClasse | null) => void;
    setProf: (professor: IProfessor | null) => void;
    getAllClass: () => Promise<any>;
    createClasses: (data: IClasse) => void;
}

class Classes implements ClasseStoreInterface {

    @observable isLoading = false;

    @observable class: IClasse | null = null;

    @observable prof: IProfessor | null = null;

    @observable isFromBooking = false;

    @observable allClass: IClasse[] = [];

    @action setClass = (data: IClasse | null) => {
        this.class = data;
    };


    @action setProf = (data: IProfessor | null) => {
        this.prof = data;
    };

    @action setIsFromBooking = (val: boolean) => {
        this.isFromBooking = val;
    };

    constructor() {
        makeObservable(this)
    }

    @action createClasses = async (data: IClasse) => {
        try {

            const add = await axios.post(`${config.servers.apiUrl}classes`, data);
             
            rootStore.succesSnackBar(true, 'Classe ajouter avec succès');
            return add;           
          
        } catch (err: any) {
            if (err.message.includes('code 400')) {
                rootStore.updateSnackBar(true, 'Le type ');
                return;
            }
       
            rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
        }
       
    };

    @action getAllClass = async () => {
        this.isLoading = true;
        try {
            const classes = await axios.get(`${config.servers.apiUrl}classes/get`);
            this.allClass = classes.data;
            this.isLoading = false;
    

        } catch (error) {
            parseError(
                error,
                "Une erreur s'est produite lors de la requête de vos infos. Veuillez réessayer"
            );
            this.isLoading = false;
        } finally {
            this.isLoading = false;
        }
    };
}
export default new Classes();