import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';

import { Stop } from '../stop';
import { StopService } from '../stops.service';

import { Data } from '../../shared/providers/data.provider';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  @Input() stop: Stop;

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v9';
  source: any;
  markers: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stopService: StopService,
    private data: Data
  ) {
    console.log(JSON.stringify(this.data.stop));
  }

  ngOnInit() {
    if (this.data.stop) {
      this.stop = this.data.stop;
      this.buildMap();
    } else {
      this.getStop();
    }
  }

  getStop(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.stopService.getStop(id).subscribe(stop => {
      this.stop = stop;
      this.buildMap();
    });
  }

  buildMap() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(
      environment.mapbox.accessToken
    );

    this.map = new mapboxgl.Map({
      container: 'detailMap',
      style: this.style,
      zoom: 13,
      center: [this.stop.longitude, this.stop.latitude]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.dragPan.disable();
    this.map.touchZoomRotate.disable();
    this.map.on('load', () => {
      this.displayLocation(this.stop.longitude, this.stop.latitude);
    });
  }

  displayLocation(lon: number, lat: number) {
    if (this.map.getLayer('stopLocation') !== undefined) {
      this.map.removeLayer('stopLocation');
    }

    if (this.map.getSource('stopLocation') !== undefined) {
      this.map.removeSource('stopLocation');
    }

    this.map.addSource('stopLocation', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [lon, lat]
            },
            properties: {}
          }
        ]
      }
    });

    this.map.addLayer({
      id: 'stopLocation',
      source: 'stopLocation',
      type: 'circle',
      paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf'
      }
    });
  }
}
