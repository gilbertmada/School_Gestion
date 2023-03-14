import {
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { ImportantDevices, SearchOutlined } from "@material-ui/icons";
import SaveListIcon from "@material-ui/icons/Save";
import { inject, observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import EditFooter from "../../common/EditFooter";
import FormSelect from "../../common/FormSelect/FormSelect";
import HeaderPath from "../../common/HeaderPath";
import { useHistory } from "react-router-dom";
import { FooterIcon } from "../../common/interface";
import { ConfirmModal } from "../../common/Modal";
import { ClasseStoreInterface } from "../../store/ClasseStore";
import { IClasse } from '../../common/interface/classeInterface/classeInterface';
import { ProfessorStoreInterface } from "../../store/ProfessorStore";
import { AbstractEmptyInterface } from "../../types";
import SearchProfessorModal from "../../common/SearchModal/SearchProfessorModal";
import { toJS } from "mobx";
import rootStore from '../../store/AppStore';
import useStyles from "./style";

interface CreateClassProps extends AbstractEmptyInterface {
    classeStore: ClasseStoreInterface;
    professorStore: ProfessorStoreInterface;
}
const CreateClass: FC<AbstractEmptyInterface> = (props: any) => {
    const { classeStore, professorStore } = props as CreateClassProps;

    const classes = useStyles();
    const history = useHistory();
    const HideBtn = classeStore.isFromBooking ? "block" : "none"
    const disableIt = !!classeStore.class?.prof;
    const [dataClasse, setDataClasse] = useState<any>({});
    const [prof, setProf] = useState<any>({});
    const [enabled, setItEnabled] = useState(disableIt);
    const [isStorage, setIsStorage] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [pathRedirect, setPathRedirect] = useState("");
    const [modalStateProfessor, setModalProfessor] = useState(false);

    useEffect(() => {
        classeStore.getAllClass();
    }, [classeStore]);



    const toggleProfessor = () => {
        setModalProfessor(!modalStateProfessor);
        classeStore.setIsFromBooking(false);
    };

    const ChangeIt = () => {
        setItEnabled(!enabled)
    }
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setDataClasse({ ...dataClasse, [name]: value });

    };

    const handleChangeProfessor = (e: any) => {
        const { name, value } = e.target;
        setProf({ ...prof, [name]: value });
        classeStore.setProf({ ...prof, [name]: value });
    };

    const handleUpdateProfessor = (dataProf: any) => {
        setProf({ ...prof, ...dataProf });


        classeStore.setProf({ ...prof, ...dataProf });

    };

    const handleCloseConfirmModal = () => {
        setOpenModal(false);
    };


    const onSubmit = (e: any) => {
        e.preventDefault();

        const newValue = { ...dataClasse, ...prof }
        props.classeStore.createClasses(newValue).then((addClasse: any) => {
            if (addClasse) {
              history.push("/");          
            }
          })

    }
    const footerIcons: FooterIcon[] = [
        {
            id: 0,
            ItemIcon: SaveListIcon,
            label: "Ajouter",
            type: "submit",
            onClick: onSubmit,
            title: "Sauvegarder",
        },

    ];

    return (
        <div>
            <div>
                <ConfirmModal
                    isOpen={openModal}
                    handleCloseConfirmModal={handleCloseConfirmModal}
                    path={pathRedirect}
                />
                <SearchProfessorModal
                    handleClose={toggleProfessor}
                    openModal={modalStateProfessor}
                    setProfessor={handleUpdateProfessor}
                />
            </div>
            <form onSubmit={onSubmit}>
                <Grid container={true} spacing={2}>
                    <Grid item={true} md={6}>
                        <TextField
                            label="Nom de classe"
                            required={true}
                            name="className"
                            fullWidth={true}
                            value={dataClasse.className || ""}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item={true} xs={12} md={6}>
                        <TextField
                            label="Ecole"
                            name="schoolName"
                            fullWidth={true}
                            value={dataClasse.schoolName || ""}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid item={true} sm={12} xs={12}>
                    <div className={classes.title}>PROFESSEUR  <EditIcon onClick={ChangeIt} className={classes.iconStyle} style={{ display: HideBtn }} /></div>
                    <div className={classes.item}>
                        <Grid container={true} direction="row" spacing={1}>
                            <Grid item={true} sm={4} xs={12}>
                                <TextField
                                    label="Choix du professeur"
                                    name="number"
                                    required={true}
                                    value={
                                        classeStore.prof?.IM || ""
                                    }
                                    disabled={true}
                                    InputProps={{
                                        endAdornment: !classeStore.isFromBooking ? (
                                            <SearchOutlined onClick={toggleProfessor} />
                                        ) : (
                                            ""
                                        ),
                                        classes: {
                                            input: classes.resizeTextField,
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item={true} sm={4} xs={12}>
                                <TextField
                                    label="Prénom"
                                    name="lastName"
                                    disabled={true}
                                    onChange={handleChangeProfessor}
                                    value={classeStore.prof?.lastName || ""}
                                    InputProps={{
                                        classes: {
                                            input: classes.resizeTextField,
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item={true} sm={4} xs={12}>
                                <TextField
                                    label="Nom"
                                    name="firstName"
                                    disabled={true}
                                    onChange={handleChangeProfessor}
                                    value={classeStore.prof?.firstName || ""}
                                    InputProps={{
                                        classes: {
                                            input: classes.resizeTextField,
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container={true} direction="row" spacing={1}>
                            <Grid item={true} sm={4} xs={12}>
                                <TextField
                                    label="Matière"
                                    name="matiere"
                                    disabled={true}
                                    onChange={handleChangeProfessor}
                                    value={classeStore.prof?.matiere || ""}
                                    InputProps={{
                                        classes: {
                                            input: classes.resizeTextField,
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item={true} sm={4} xs={12}>
                                <TextField
                                    label="E-mail"
                                    name="email"
                                    disabled={true}
                                    onChange={handleChangeProfessor}
                                    value={classeStore.prof?.email || ""}
                                    InputProps={{
                                        classes: {
                                            input: classes.resizeTextField,
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <EditFooter icons={footerIcons} />
            </form>

        </div>
    );
}
export default inject("classeStore")(observer(CreateClass))