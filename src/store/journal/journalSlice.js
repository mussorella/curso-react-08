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
            state.isSaving=true;
            //TODO : MENSJ DE ERROR
        },
        updateNote: (state, action)=>{//actualizo mi referencia local desp de guardarlo en el firestore
            state.isSaving=false;
            state.notes=state.notes.map(note=>{

                if(note.id===action.payload.id){
                    return action.payload;

                }

                return note;
            })
            //TODO: DELETE NOTE
        },
        deleteNoteById:(state,action)=>{

        },
    }
});


// Action creators are generated for each case reducer function
export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving,updateNote, deleteNoteById  } = journalSlice.actions;