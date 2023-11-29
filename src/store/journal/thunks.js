import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from "./journalSlice";
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


export const startLoadingNotes=()=>{//esta funcion lo que hace es buscar la data puesta en el firestore y la pone en la pagina al frontend
    return async(dispatch, getState)=>{
        
        const {uid}=getState().auth;
        if (!uid) throw new Error('el uid del usuario no existe')
        
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}


export const startSaveNote=()=>{

    return async (dispatch, getState)=>{

        dispatch(setSaving());

        //aca necesito sacar el id del usuario, y de la nota que voy a guardar
    const {uid}=getState().auth;//primero el id del usuario
    const {active:note}= getState().journal;//de aca saco la nota 
    const noteToFireStore={...note}
    delete noteToFireStore.id//aca saco el id de la nota asi no se dispara
        
    const docRef= doc(FirebaseDB, `${uid}/journal/notas/${note.id}`)//saco el id de la nota para guardarlo

    await setDoc( docRef, noteToFireStore, {merge:true})

        dispatch(updateNote(note));//actualiza la nota

    }
}