import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Stop } from '../stop';
import { StopService } from '../stops.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  @Input() stop: Stop;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stopService: StopService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.getStop();
  }

  getStop(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.stopService.getStop(id).subscribe(stop => (this.stop = stop));
  }

  goBack(): void {
    this.location.back();
  }

}
