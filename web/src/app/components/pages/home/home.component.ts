import {Component,OnInit, ChangeDetectionStrategy} from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public signIn:boolean = window.history.state.signedIn || false;
  public view: CalendarView = CalendarView.Month;
  public viewDate: Date = new Date();

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
  }

  public navigateToTheDay({ date }: { date: Date; }){
    this.router.navigateByUrl('/daySchedule',{state:{date:date,signedIn: this.signIn}});
  }
}
