# Search

    GET /questions/

## Description

Get the questions.

## Return format

Object

## Example

### **Request**

```json
    -  GET /questions/
```

### **Return**

```js
[
  {
    "choices": [],
    "_id": "5b471cad342c1c2acc8efa5a",
    "id": "1",
    "num": "019",
    "content": "What is the measure/distance of the 1st slant ?",
    "type": "number",
    "hint": "",
    "categorie_id": "3a",
    "__v": 0
  },
  {
    "choices": [],
    "_id": "5b471cad342c1c2acc8efa5b",
    "id": "2",
    "num": "022",
    "content": "Is there any garages ?",
    "type": "boolean",
    "hint": "",
    "categorie_id": "3a",
    "__v": 0
  },
  {
    "choices": [],
    "_id": "5b471cad342c1c2acc8efa5c",
    "id": "3",
    "num": "028",
    "content": "Is there some vegetations nearby ?",
    "type": "String",
    "hint": "If yes, please put some comments on that situation",
    "categorie_id": "3a",
    "__v": 0
  }
]
```