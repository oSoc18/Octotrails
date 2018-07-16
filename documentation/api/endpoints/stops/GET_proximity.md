# List stops at proximity

    GET /stops/proximity/?lon=(number of lon)&lat=(number of lat)

## Description

Get the stops around the given location.

## Parameters

- `lon` : The longitude of the location

- `lat` : The latitude of the location

## Return format

{

stops: [**[Stop][]**]

}

## Errors

- `400` : If query parameters `lon` or `lat` are missing or empty.

- `404` : If any stop was found.

The body of the response contains a message about the error.

## Example

### **Request**

```json
    -  GET /stops/proximity?lon=1&lat=1
```

### **Return**

```js
{
  "stops": [
    {
      "id": "8082",
      "alpha_fr": "Montgomery",
      "alpha_nl": "Montgomery",
      "descr_fr": "MONTGOMERY",
      "descr_nl": "MONTGOMERY",
      "coord_x": "4.40794905260631",
      "coord_y": "50.8378065272031",
      "address": {
        "fr": "Boulevard Brand Whitlock 92, Woluwe-Saint-Lambert",
        "nl": "Boulevard Brand Whitlock 92, Sint-Lambrechts-Woluwe"
      },
      "type": 0,
      "transport": [
        {
          "line_id": 1,
          "type": "M",
          "direction": {
            "fr": "STOCKEL",
            "nl": "STOKKEL"
          },
          "route_color": "C4008F",
          "route_text_color": "FFFFFF"
        }
      ]
    },
    {
      "id": "8081",
      "alpha_fr": "Montgomery",
      "alpha_nl": "Montgomery",
      "descr_fr": "MONTGOMERY",
      "descr_nl": "MONTGOMERY",
      "coord_x": "4.40736700510856",
      "coord_y": "50.8378247028101",
      "address": {
        "fr": "Boulevard Brand Whitlock 92, Woluwe-Saint-Lambert",
        "nl": "Boulevard Brand Whitlock 92, Sint-Lambrechts-Woluwe"
      },
      "type": 0,
      "transport": [
        {
          "line_id": 1,
          "type": "M",
          "direction": {
            "fr": "GARE DE L'OUEST",
            "nl": "WESTSTATION"
          },
          "route_color": "C4008F",
          "route_text_color": "FFFFFF"
        }
      ]
    }
  ]
}
```

[stop]: ../../formats.md#stop-format
