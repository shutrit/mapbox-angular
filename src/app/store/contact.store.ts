import { patchState, signalStore, withState, withMethods } from '@ngrx/signals';

export interface contactFormMap {
  zoomFly:number; 
  initialCenter:[number, number];
  initialZoom:number;
  sent:boolean;

}
export const IntialState:contactFormMap  = {
  initialCenter: [4.30332, 52.07271],
  initialZoom:13,
  sent:false, 
  zoomFly:4
}
export const SentStore = signalStore(
  { providedIn: 'root' },
  withState(IntialState),
  withMethods((store) => ({
    setSent(value: boolean) {
      patchState(store, { sent: value });
    },
  }))
);



