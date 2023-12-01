import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving:false,
        messageSaved: '',
        notes: [],
        active: null,//por defecto la dejo en null pero deberia poner un id image url etc.

    },
    reducers: {
        
        savingNewNote:(state)=>{
            state.isSaving=true;
        },

        
        addNewEmptyNote: (state,action)=>{
            state.notes.push(action.payload);//meter una nota 
            state.isSaving=false;
        },
        setActiveNote: (state,action)=>{
            state.active=action.payload;
            state.messageSaved='';
        },
        setNotes: (state,action)=>{//precarga las notas puestas
            state.notes= action.payload;
        },
        setSaving: (state)=>{
            state.isSaving=true;
            state.messageSaved='';
        },
        updateNote: (state, action)=>{//actualizo mi referencia local desp de guardarlo en el firestore
            state.isSaving=false;
            state.notes=state.notes.map(note=>{

                if(note.id===action.payload.id){
                    return action.payload;

                }

                return note;
            })
            state.messageSaved=`${action.payload.title}, actualizada correctamente`
        
        
        },
        setPhotosToActiveNote:(state,action)=>{
            state.active.imageUrls=[...state.active.imageUrls, ...action.payload];
            state.isSaving=false;
        },
        
        clearNotesLogout:(state)=>{
            state.isSaving=false;
            state.messageSaved='';
            state.notes=[];
            state.active=null;
        },
        
        deleteNoteById:(state,action)=>{
            state.active=null;
            state.notes=state.notes.filter(note=>note.id !== action.payload);
        },

    }
});


// Action creators are generated for each case reducer function
export const { clearNotesLogout, setPhotosToActiveNote, savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving,updateNote, deleteNoteById  } = journalSlice.actions;