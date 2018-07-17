import { Component, OnInit } from "@angular/core";
import * as mapboxgl from "mapbox-gl";
import { GeoJson, FeatureCollection } from "../map";
import { environment } from "../../environments/environment";

@Component({
  selector: "map-box",
  templateUrl: "./map-box.component.html",
  styleUrls: ["./map-box.component.css"]
})
export class MapBoxComponent implements OnInit {
  /// default settings
  map: mapboxgl.Map;
  style = "mapbox://styles/mapbox/outdoors-v9";
  lat = 50.85045;
  lon = 4.34878;
  message = "Hello World!";

  // data
  source: any;
  markers: any;

  constructor() {}

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.map.flyTo({
          center: [this.lon, this.lat]
        });
      });
    }

    this.buildMap();
  }

  buildMap() {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(
      environment.mapbox.accessToken
    );

    this.map = new mapboxgl.Map({
      container: "map",
      style: this.style,
      zoom: 13,
      center: [this.lon, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on("load", () => {
      this.map.addSource("currentLocation", {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": [{
              "type": "Feature",
              "geometry": {
                  "type": "Point",
                  "coordinates": [this.lon, this.lat]
              },
              "properties": {
                  "title": "Mapbox DC",
                  "icon": "monument"
              }
          }]
      }
      });

      this.map.addLayer({
        id: "currentLocation",
        source: "currentLocation",
        type: "circle",
        paint: {
          "circle-radius": 10,
          "circle-color": "#007cbf"
        }
      });
    });
  }

  /// Helpers
  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    });
  }
}
