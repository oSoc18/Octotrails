# Search

    GET /stops/:stop_id/histories

## Description

Retrieve the history of update for stops based on it ID.

## Parameters

- `:stop_id` : The stop ID

## Return format

{

histories : [**[History][]**]

}

## Errors

## Example

### **Request**

```JSON
    -  GET /stops/8022/histories
```

### **Response**

```JSON
{
  "histories": [
    {
      "id": "5b4e1a3f36227f12e631e1ca",
      "stop_id": "8022",
      "created_at": "2018-07-13T21:50:05.762Z",
      "previous": "5b4e1a3f36227f12e631e1c9",
      "inputs": [
        {
          "question_id": "5b4901f0a47137f00321331f",
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
          "question_id": "5b4901f0a47137f00321331f",
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
          "question_id": "5b4901f0a471370c93213322",
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
      ]
    },
    {
      "id": "5b4e1a3f36227f12e631e1c9",
      "stop_id": "8022",
      "created_at": "2018-07-11T09:30:01.762Z",
      "previous": "5b4e1a3f36227f12e631e1c8",
      "inputs": [
        {
          "question_id": "5b4901f0a471370c93213322",
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
    },
    {
      "inputs": [
        {
          "question_id": "5b4901f0a47137f00321331f",
          "answer": 4,
          "question": {
            "num": "019",
            "content": "What is the measure/distance of the 1st slant ?",
            "type": "number",
            "category": null,
            "id": "5b4901f0a47137f00321331f"
          },
          "id": "5b48e785f188271082d48c55"
        }
      ],
      "previous": null,
      "stop_id": "8022",
      "created_at": "2018-07-10T11:20:05.762Z",
      "id": "5b4e1a3f36227f12e631e1c8"
    }
  ]
}
```

[history]: ../../formats.md#history-format
