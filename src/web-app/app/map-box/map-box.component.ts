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
  lng = 4.34878;
  message = "Hello World!";

  // data
  source: any;
  markers: any;

  constructor() {}

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    let lat;
    let lon;

    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        this.map.flyTo({
          center: [lon, lat]
        });
      });
    }

    //Add markers here
    const coordinates = [lon, lat];
    const newMarker = new GeoJson(coordinates, { message: this.message });

    this.buildMap();
  }

  buildMap() {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
    this.map = new mapboxgl.Map({
      container: "map",
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });
  }

  /// Helpers
  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    });
  }
}
