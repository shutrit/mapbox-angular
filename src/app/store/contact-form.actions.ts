import { createAction, props } from '@ngrx/store';

export const nameUpdate = createAction('[contact-form] Name update',props<{ name: string; }>());
export const emailUpdate = createAction('[contact-form] Email update',props<{ name: string; }>());
export const phoneUpdate = createAction('[contact-form] Phone update',props<{ name: string; }>());
export const MessageUpdate = createAction('[contact-form] Message update',props<{ name: string; }>());
export const DeleteDetails = createAction('[contact-form] Delete',props<{ name: string; }>());