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
  lat = 37.75;
  lng = -122.41;
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
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        });
      });
    }

    this.buildMap();
  }

  buildMap() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({      
      container: "map",
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });

    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  /// Helpers
  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    });
  }
}
