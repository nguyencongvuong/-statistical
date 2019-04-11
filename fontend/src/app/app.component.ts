import {Component, Pipe} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Pipe({
  name: 'animateNumber',
  pure: false
})
export class AppComponent {
  title = 'Báo Cáo';
}
