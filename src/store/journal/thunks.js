import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./journalSlice";
import { loadNotes } from "../../helpers";

export const startNewNote = () =>{
    return async(dispatch, getState)=>{
        
        dispatch(savingNewNote() ); //aparece si estoy guardando una nota

        const {uid} =getState().auth;//aca estoy buscando los datos en firebase del uid del usuario para acceder al store de ahi 
        
        

        
        
        const newNote={
            title:'',
            body:'',
            date: new Date().getTime(),
        }


        const newDoc= doc(collection(FirebaseDB, `${uid}/journal/notas`))//aca lo q hice fue tomar los valores de firebase en mi base de datos y los puse ahi para q mande directo la info del backend aca
        
        await setDoc(newDoc, newNote);//aca mandamos a grabar este doc
        
        newNote.id=newDoc.id;
        
        //dispatch

        dispatch(addNewEmptyNote(newNote));

        dispatch(setActiveNote(newNote));
    }
}


export const startLoadingNotes=()=>{
    return async(dispatch, getState)=>{
        
        const {uid}=getState().auth;
        if (!uid) throw new Error('el uid del usuario no existe')
        
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}