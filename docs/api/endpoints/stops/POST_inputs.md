# Save new inputs

    POST /stops/:stop_id/inputs

## Description

Store the new inputs for a stop.

## Parameters

- `stop_id` : The ID of the stop

## Return format

```JSON
{
  "message" : "All inputs were saved"
}
```

## Errors

- `400` : If the `stop_id` is missing or empty.

- `500` : If the storing operation cannot be executed.

The body of the response contains a message about the error.

## Example

### **Request**

```JSON
    -  POST /stops/8031/inputs
    -  BODY
    {
      "inputs" : [
        {
          "question": "019",
          "answer": 4
        },
        {
          "question": "028",
          "answer": null
        },
        {
          "question": "042",
          "answer": "41"
        },
        {
          "question": "022",
          "answer": "true"
        }
      ]
    }
```

### **Return**

```JSON
{
  "message": "All inputs were saved"
}
```
