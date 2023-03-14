import { Request, Response, NextFunction } from "express";
import JSPDF from 'jspdf';
import moment from 'moment';
import font from '../utils/font.json'
import fs from 'fs';
import { Student } from "~~/entity/Student";
import { page } from "pdfkit";
import Head from "./PDF/ListStudent/Head";
import HeadRecu from "./PDF/RecuDroit/HeadRecu";
import TableRecu from "./PDF/RecuDroit/TableRecu";
import HeadRecuEcolage from "./PDF/RecuEcolage/HeadRecuEcolage";
import TableRecuEcolage from "./PDF/RecuEcolage/TableRecuEcolage";
import HeadRecuFraisDivers from "./PDF/RecuFraisDivers/HeadRecuFraisDivers";
import TableRecuFraisDivers from "./PDF/RecuFraisDivers/TableRecuFraisDivers";
import { ListToClass } from "./PDF/ListStudent/ListToClass";
import { HeaderTable } from "./PDF/ListStudent/header"

export default class ExportPdfStudentController {

    static exportPdfList = async (req: Request, res: Response) => {

        const path = "./fichier/PDFFiles/";

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const jsPdfPrint = new JSPDF('p', 'mm', 'a4', true);
        jsPdfPrint.addFileToVFS('Roboto-Bold.ttf', font.font);
        jsPdfPrint.addFont('Roboto-Bold.ttf', 'custom', 'normal');
        jsPdfPrint.setFont('custom', 'normal');

        try {

            const data = req.body;


            Head(
                {
                    schoolName: `${data[0].schoolName}`,
                    class: `${data[0].class}`,
                    height: `${data[0].height}`,
                },
                jsPdfPrint
            );
            HeaderTable(50, jsPdfPrint);

            ListToClass(
                [
                    ...data.sort((a: any, b: any) => {
                        return a.matriculNumber - b.matriculNumber
                    })

                ],
                jsPdfPrint
            )

            const filename = `LISTES DES ELEVES AU CLASSE DE ${data[0].class}.pdf`;
            const pathPdf = `${path}${filename}`;
            fs.writeFileSync(pathPdf, jsPdfPrint.output())
            jsPdfPrint.save(pathPdf);

            return res.status(200).send({
                status: "success",
                message: "file successfully downloaded",
                path: pathPdf,
                filename: filename,
            });
        } catch (error) {
            console.log('this is an error', error);

            res.status(500).send({
                status: "error",
                message: "Something went wrong" + error,

            });
        }
    }

    static exportPdfRecuDroit = async (req: Request, res: Response) => {

        const path = "./fichier/PDFFiles/";

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const jsPdfPrint = new JSPDF('p', 'mm', 'a5', true);
        jsPdfPrint.addFileToVFS('Roboto-Bold.ttf', font.font);
        jsPdfPrint.addFont('Roboto-Bold.ttf', 'custom', 'normal');
        jsPdfPrint.setFont('custom', 'normal');

        try {

            const data = req.body;


            HeadRecu(
                {
                    schoolName: `${data.schoolName}`,
                    class: `${data.class}`,
                    height: `${data.height}`,
                },
                jsPdfPrint
            );

            TableRecu(
                {
                    firstName: `${data.firstName}`,
                    lastName: `${data.lastName}`,
                    address: `${data.address}`,
                    inscriptionDroit: `${data.inscriptionDroit}`,
                },
                jsPdfPrint
            )

            const filename = `Réçu de droit ${data.lastName}.pdf`;
            const pathPdf = `${path}${filename}`;
            fs.writeFileSync(pathPdf, jsPdfPrint.output())
            jsPdfPrint.save(pathPdf);

            return res.status(200).send({
                status: "success",
                message: "file successfully downloaded",
                path: pathPdf,
                filename: filename,
            });
        } catch (error) {
            console.log('this is an error', error);

            res.status(500).send({
                status: "error",
                message: "Something went wrong" + error,

            });
        }
    }

    static exportPdfRecuEcolage = async (req: Request, res: Response) => {

        const path = "./fichier/PDFFiles/";

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const jsPdfPrint = new JSPDF('p', 'mm', 'a5', true);
        jsPdfPrint.addFileToVFS('Roboto-Bold.ttf', font.font);
        jsPdfPrint.addFont('Roboto-Bold.ttf', 'custom', 'normal');
        jsPdfPrint.setFont('custom', 'normal');

        try {

            const data = req.body.ecolagePrive;
            const otherData = req.body.otherDataPrive;
            const index = data.length - 1;
            const dataFinally = data[index];



            HeadRecuEcolage(
                {
                    schoolName: `${otherData.schoolName}`,
                    class: `${otherData.class}`,
                    height: `${otherData.height}`,
                },
                jsPdfPrint
            );

            TableRecuEcolage(
                {
                    lastName: `${dataFinally.student}`,
                    matriculNumber: `${dataFinally.matriculNumber}`,
                    datePayEcolage: `${dataFinally.datePayEcolage}`,
                    ecolageMonth: `${dataFinally.ecolageMonth}`,
                    ecolage: `${dataFinally.ecolage}`,
                },
                jsPdfPrint
            )

            const filename = `Réçu d'écolage de ${dataFinally.student}.pdf`;
            const pathPdf = `${path}${filename}`;
            fs.writeFileSync(pathPdf, jsPdfPrint.output())
            jsPdfPrint.save(pathPdf);

            return res.status(200).send({
                status: "success",
                message: "file successfully downloaded",
                path: pathPdf,
                filename: filename,
            });
        } catch (error) {
            console.log('this is an error', error);

            res.status(500).send({
                status: "error",
                message: "Something went wrong" + error,

            });
        }
    }

    static exportPdfRecuFraisDivers = async (req: Request, res: Response) => {

        const path = "./fichier/PDFFiles/";

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const jsPdfPrint = new JSPDF('p', 'mm', 'a5', true);
        jsPdfPrint.addFileToVFS('Roboto-Bold.ttf', font.font);
        jsPdfPrint.addFont('Roboto-Bold.ttf', 'custom', 'normal');
        jsPdfPrint.setFont('custom', 'normal');

        try {

            const data = req.body.droit;
            const otherData = req.body.otherDataFraisDivers
            const index = data.length - 1;
            const dataFinally = data[index];


            HeadRecuFraisDivers(
                {
                    schoolName: `${otherData.schoolName}`,
                    class: `${otherData.class}`,
                    height: `${otherData.height}`,
                },
                jsPdfPrint
            );

            TableRecuFraisDivers(
                {
                    lastName: `${dataFinally.student}`,
                    matriculNumber: `${dataFinally.matriculNumber}`,
                    datePayDivers: `${dataFinally.datePayDivers}`,
                    frais: `${dataFinally.frais}`,
                },
                jsPdfPrint
            )

            const filename = `Réçu de frais divers de ${dataFinally.student}.pdf`;
            const pathPdf = `${path}${filename}`;
            fs.writeFileSync(pathPdf, jsPdfPrint.output())
            jsPdfPrint.save(pathPdf);

            return res.status(200).send({
                status: "success",
                message: "file successfully downloaded",
                path: pathPdf,
                filename: filename,
            });
        } catch (error) {
            console.log('this is an error', error);

            res.status(500).send({
                status: "error",
                message: "Something went wrong" + error,

            });
        }
    }

    static exportPdfEmploiDuTemps = async (req: Request, res: Response) => {

        const path = "./fichier/PDFFiles/";

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const jsPdfPrint = new JSPDF('p', 'mm', 'a5', true);
        jsPdfPrint.addFileToVFS('Roboto-Bold.ttf', font.font);
        jsPdfPrint.addFont('Roboto-Bold.ttf', 'custom', 'normal');
        jsPdfPrint.setFont('custom', 'normal');

        try {

            const data = req.body;
            const otherData = req.body.otherDataFraisDivers
            const index = data.length - 1;
            const dataFinally = data[index];
            
            console.log("data....", data);


            // HeadRecuFraisDivers(
            //     {
            //         schoolName: `${otherData.schoolName}`,
            //         class: `${otherData.class}`,
            //         height: `${otherData.height}`,
            //     },
            //     jsPdfPrint
            // );

            // TableRecuFraisDivers(
            //     {
            //         lastName: `${dataFinally.student}`,
            //         matriculNumber: `${dataFinally.matriculNumber}`,
            //         datePayDivers: `${dataFinally.datePayDivers}`,
            //         frais: `${dataFinally.frais}`,
            //     },
            //     jsPdfPrint
            // )

            // const filename = `Réçu de frais divers de ${dataFinally.student}.pdf`;
            // const pathPdf = `${path}${filename}`;
            // fs.writeFileSync(pathPdf, jsPdfPrint.output())
            // jsPdfPrint.save(pathPdf);

            // return res.status(200).send({
            //     status: "success",
            //     message: "file successfully downloaded",
            //     path: pathPdf,
            //     filename: filename,
            // });
        } catch (error) {
            console.log('this is an error', error);

            res.status(500).send({
                status: "error",
                message: "Something went wrong" + error,

            });
        }
    }
}