import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'short-term-goals';

  progress = {
    goal1:0,
    goal2:1,
    goal3:0,
    goal4:0
  }
  

  onGoalclicked($event:any) { 
    console.log("Emiiter:", $event);

  }
}
