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

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      this.getLocation();
      this.map.loadImage('/assets/icons/locationPin.png', (error, image) => {
        if (error) throw error;
        this.map.addImage('location', image);
    });

      this.map.on('click', 'unclustered-point', e => {
        const mapStopId = e.features[0].properties.id;
        this.router.navigate(['/stops', mapStopId], {
          queryParams: {
            by: 'stop_id'
          }
        });
      });
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.map.flyTo({
          center: [this.lon, this.lat]
        });
        
        this.displayLocation(this.lon, this.lat);
        this.findStopsInProximity(this.lon, this.lat);
      });
    }
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    });
  }

  displayLocation(lon: number, lat: number) {
    if (this.map.getLayer('currentLocation') !== undefined) {
      this.map.removeLayer('currentLocation');
    }

    if (this.map.getSource('currentLocation') !== undefined) {
      this.map.removeSource('currentLocation');
    }

    this.map.addSource('currentLocation', {
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
      id: 'currentLocation',
      source: 'currentLocation',
      type: 'circle',
      paint: {
        'circle-radius': 10,
        'circle-color': '#29B6F6'
      }
    });
  }

  findStopsInProximity(lon: number, lat: number) {
    this.mapService.findProximityStops(lon, lat).subscribe(data => {
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
            "id": 'unclustered-point',
            "type": "symbol",
            "source": 'proximityStops',
            "layout": {
                "icon-image": "location",
                "icon-size" : .25
            }
        });

    //   this.map.addLayer({
    //     id: 'unclustered-point',
    //     type: 'circle',
    //     source: 'proximityStops',
    //     paint: {
    //       'circle-color': '#00C6FF',
    //       'circle-radius': 10
    //     }
    //   });

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
            "text-color": "#FFFFFF"
        }
      });
    });
  }

  success(pos) {
    let crd = pos.coords;
    this.displayLocation(crd.longitude, crd.latitude);
    this.findStopsInProximity(crd.longitude, crd.latitude);
  }

  error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  id = navigator.geolocation.watchPosition(
    this.success.bind(this),
    this.error,
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 1000
    }
  );
}
