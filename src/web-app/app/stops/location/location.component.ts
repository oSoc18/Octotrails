import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Stop } from '../stop';
import { StopService } from '../stops.service';

import { Data } from '../../shared/providers/data.provider';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  @Input() stop: Stop;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stopService: StopService,
    private data: Data,
  ) {
    console.log(JSON.stringify(this.data.stop));
  }

  ngOnInit() {
    if (this.data.stop) {
      this.stop = this.data.stop;
    } else {
      this.getStop();
    }

  }

  getStop(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.stopService.getStop(id).subscribe(stop => (this.stop = stop));
  }

}
