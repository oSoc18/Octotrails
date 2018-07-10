# Resources Format

This document details all resources retrievable via the API.

## Base

All requests for the API **must** be prefix by `/api`.

## Error Format

All errors return an HTTP error response with a JSON Object as key `message` about the error and the status of the response set to match the error.

```json
{
  "message": "The requested object is not valid"
}
```
