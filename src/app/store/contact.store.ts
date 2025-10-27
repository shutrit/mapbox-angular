import { patchState, signalStore, withState, withMethods } from '@ngrx/signals';
;


export interface contactFromMap {
  zoomFly:number; 
  initialCenter:[number, number];
  initialZoom:number;
  sent:boolean;

}
export const IntialState:contactFromMap  = {
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



// in the contact-form component on success will call this: this.store.setSent(true); 
// in the map component we will use an effect. 
// import { effect, inject } from '@angular/core';
// import { SentStore } from '../store/sent.store';

// @Component({
//   selector: 'app-mapbox',
//   templateUrl: './mapbox.component.html',
// })
// export class MapboxComponent {
//   private store = inject(SentStore);

//   constructor() {
//     // 👇 this runs every time the signal value changes
//     effect(() => {
//       const shouldZoom = this.store.sent(); // access the signal value
//       if (shouldZoom) {
//         this.zoomOutMap();
//       }
//     });
//   }

//   private zoomOutMap() {
//     this.zoom.set(4);
//     this.map.setZoom(this.zoom());
//   }
// }
