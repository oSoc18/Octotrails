import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

// import { Stop } from '../stop';
// import { StopService } from '../stops.service';
import questionsMock from "../../shared/mock/questions.mock";

@Component({
  selector: 'app-questions-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  @Input() questions;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
//    private stopService: StopService,
    private location: Location,
  ) {
    this.questions = questionsMock[0];
    console.log(this.questions);
  }

  ngOnInit() {
    this.getStop();
  }

  getStop(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    //this.stopService.getStop(id).subscribe(stop => (this.stop = stop));
  }

  goBack(): void {
    this.location.back();
  }

}
