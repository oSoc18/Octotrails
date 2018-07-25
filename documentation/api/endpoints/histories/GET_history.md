# Search

    GET /histories/:history_id

## Description

Retrieve the specific history based on it ID.

## Parameters

- `:history_id` : The History ID

## Return format

{

history : **[History][]**

}

## Errors

- `404` : If any stop was found.

The body of the response contains a message about the error.

## Example

### **Request**

```JSON
    -  GET /histories/5b4e1a3f36227f12e631e1ca
```

### **Response**

```JSON
{
  "history": {
    "stop_id": "8022",
    "created_at": "2018-07-13T21:50:05.762Z",
    "id": "5b4e1a3f36227f12e631e1ca",
    "inputs": [
      {
        "question_num": "019",
        "answer": 1,
        "question": {
          "num": "019",
          "content": "What is the measure/distance of the 1st slant ?",
          "type": "number",
          "category": null,
          "id": "5b4901f0a47137f00321331f"
        },
        "id": "5b4901f0a471374981213326"
      },
      {
        "question_num": "019",
        "answer": 4,
        "question": {
          "num": "019",
          "content": "What is the measure/distance of the 1st slant ?",
          "type": "number",
          "category": null,
          "id": "5b4901f0a47137f00321331f"
        },
        "id": "5b48e785f188271082d48c55"
      },
      {
        "question_num": "042",
        "answer": "41",
        "question": {
          "num": "042",
          "content": "What is the accessiblity of a wheel chair ?",
          "type": "multiple",
          "category": null,
          "id": "5b4901f0a471370c93213322"
        },
        "id": "5b48e912a47c7411ed895842"
      }
    ],
    "previous": {
      "inputs": [
        "5b48e785f188271082d48c55",
        "5b48e785f188271082d48c54",
        "5b48e912a47c7411ed895842"
      ],
      "previous": "5b4e1a3f36227f12e631e1c8",
      "stop_id": "8022",
      "created_at": "2018-07-11T09:30:01.762Z",
      "id": "5b4e1a3f36227f12e631e1c9"
    }
  }
}
```

[history]: ../../formats.md#history-format
