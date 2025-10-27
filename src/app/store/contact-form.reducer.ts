import { Action, createReducer, on } from '@ngrx/store';
import { eMessage } from '../contact-form/contact-form.component';
import { nameUpdate } from './contact-form.actions';

export const initialState:eMessage = { 
    name:'',
    email:'',
    phone:'',
    message:''
}
export const contactFormReducer = createReducer(
    initialState,
    on(nameUpdate, (state, action) => {
        console.log("ACTION:", action);
        const NewState = {
            name:action.name,
            email:state.email,
            message:state.message,
            phone:state.phone
        }
        return NewState;
    }
    )
  );