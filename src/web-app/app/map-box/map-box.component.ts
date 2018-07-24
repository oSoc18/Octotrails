import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from './map';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import { MapService } from './map.service';

@Component({
  selector: 'map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit {
  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v9';
  geolocateControl: mapboxgl.GeolocateControl;
  lat = 50.85045;
  lon = 4.34878;

  // data
  source: any;
  markers: any;

  constructor(private mapService: MapService, private router: Router) {}

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    this.buildMap();
  }

  buildMap() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(
      environment.mapbox.accessToken
    );
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lon, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    this.geolocateControl = new mapboxgl.GeolocateControl({
      fitBoundsOptions: {
        maxZoom: 18
      },
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    this.map.addControl(this.geolocateControl, 'bottom-right');

    this.map.on('load', () => {
      this.map.loadImage('/assets/icons/locationPin.png', (error, image) => {
        if (error) throw error;
        this.map.addImage('location', image);
      });

      this.geolocateControl.trigger();
      this.geolocateControl.on('geolocate', e => {
        this.lon = e.coords.latitude;
        this.lat = e.coords.latitude;

        this.findStopsInProximity();
      });

      this.map.on('click', 'unclustered-point', e => {
        const mapStopId = e.features[0].properties.id;
        this.router.navigate(['/stops', mapStopId]);
      });
    });
  }

  findStopsInProximity() {
    this.mapService.findProximityStops(this.lon, this.lat).subscribe(data => {
      let features = [];

      data.forEach(element => {
        features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [element.longitude, element.latitude]
          },
          properties: { id: element.id }
        });
      });

      if (this.map.getLayer('cluster-count') !== undefined) {
        this.map.removeLayer('cluster-count');
      }

      if (this.map.getLayer('unclustered-point') !== undefined) {
        this.map.removeLayer('unclustered-point');
      }

      if (this.map.getLayer('clusters') !== undefined) {
        this.map.removeLayer('clusters');
      }

      if (this.map.getSource('proximityStops') !== undefined) {
        this.map.removeSource('proximityStops');
      }

      this.map.addSource('proximityStops', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        },
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 50
      });

      this.map.addLayer({
        id: 'unclustered-point',
        type: 'symbol',
        source: 'proximityStops',
        layout: {
          'icon-image': 'location',
          'icon-size': .25
        }
      });

      this.map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'proximityStops',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#00C6FF',
            100,
            '#00C6FF',
            750,
            '#00C6FF'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ]
        }
      });

      this.map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'proximityStops',
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['Arial Unicode MS Bold'],
          'text-size': 12,
        },
        paint: {
          'text-color': '#FFFFFF'
        }
      });
    });
  }
}
