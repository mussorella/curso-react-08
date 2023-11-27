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
        },
        setNotes: (state,action)=>{//precarga las notas puestas
            state.notes= action.payload;
        },
        setSaving: (state)=>{

        },
        updateNote: (state,action)=>{

        },
        deleteNoteById:(state,action)=>{

        },
    }
});


// Action creators are generated for each case reducer function
export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving,updateNote, deleteNoteById  } = journalSlice.actions;