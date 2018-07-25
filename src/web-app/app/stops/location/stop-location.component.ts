import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';

import { Stop } from '../stop';
import { StopService } from '../stops.service';

import { Data } from '../../shared/providers/data.provider';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-stop-location',
  templateUrl: './stop-location.component.html',
  styleUrls: ['./stop-location.component.css']
})
export class StopLocationComponent implements OnInit {
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

 
  /**
   * Get the access token for mapbox
   * Make a new map
   * Add the zoom controls to the map
   * Add the geolocate control to the map
   * Disabled drag and zoomRotate
   * Load and render the pin image/icon
   */
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

    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        fitBoundsOptions: {
          maxZoom: 18
        },
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }),
      'bottom-right'
    );

    this.map.dragPan.disable();
    this.map.touchZoomRotate.disable();

    this.map.on('load', () => {
      this.map.loadImage('/assets/icons/locationPin.png', (error, image) => {
        if (error) throw error;
        this.map.addImage('location', image);
        this.displayLocation(this.stop.longitude, this.stop.latitude);
      });
    });
  }

  /**
   * Remove the existing source and layer
   * Add the new source and layer
   * @param lon The longitude of the location
   * @param lat The latitude of the location
   */
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
      type: 'symbol',
      layout: {
        'icon-image': 'location',
        'icon-size': 0.25
      }
    });
  }
}
