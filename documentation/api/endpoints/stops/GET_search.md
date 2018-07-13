# Search

    GET /stops/search?by=(stop_name|stop_id)&term=(term of search)

## Description

Search for stops based on name or stop ID.

## Parameters

- `by` : What the search is about

- `term` : What do we search

## Return format

Object

## Errors

- `400` : If query parameters `by` or `term` are missing or empty.

- The body of the response contains a message about the error.

## Example

### **Request**

```json
    -  GET /stops/search?by=stop_name&term=central
```

### **Return**

```js
{
  "stops": [
    {
      "id": "8022",
      "alpha_fr": "Gare Centrale",
      "alpha_nl": "Centraal Station",
      "descr_fr": "GARE CENTRALE",
      "descr_nl": "CENTRAAL STATION",
      "coord_x": "4.35877016921606",
      "coord_y": "50.8463529898693",
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
        },
        {
          "line_id": 5,
          "type": "M",
          "direction": {
            "fr": "HERRMANN-DEBROUX",
            "nl": "HERRMANN-DEBROUX"
          },
          "route_color": "E6B012",
          "route_text_color": "FFFFFF"
        }
      ]
    },
    {
      "id": "8021",
      "alpha_fr": "Gare Centrale",
      "alpha_nl": "Centraal Station",
      "descr_fr": "GARE CENTRALE",
      "descr_nl": "CENTRAAL STATION",
      "coord_x": "4.35855711532438",
      "coord_y": "50.8466765952464",
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
        },
        {
          "line_id": 5,
          "type": "M",
          "direction": {
            "fr": "ERASME",
            "nl": "ERASMUS"
          },
          "route_color": "E6B012",
          "route_text_color": "FFFFFF"
        }
      ]
    }
  ]
}
```
