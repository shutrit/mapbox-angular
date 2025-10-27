import { createFeatureSelector, createSelector } from '@ngrx/store';
import { eMessage } from '../contact-form/contact-form.component';

// 👇 this key should match the one you used in StoreModule.forFeature(...)
export const selectContactFormState = createFeatureSelector<eMessage>('contactForm');

// Example: select the whole state
export const selectContactForm = createSelector(
  selectContactFormState,
  (state) => state
);

// Example: select only the name
export const selectName = createSelector(
  selectContactFormState,
  (state) => state.name
);

// You can add more selectors if needed
export const selectEmail = createSelector(
  selectContactFormState,
  (state) => state.email
);
