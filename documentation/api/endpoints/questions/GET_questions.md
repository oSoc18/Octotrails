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
    id: '1',
    num: '019',
    content: 'What is the measure/distance of the 1st slant ?',
    categorie_id: '3a',
    type: 'number',
    choices: [],
    hint: ''
  },
  {
    id: '2',
    num: '022',
    content: 'Is there any garages ?',
    categorie_id: '3a',
    type: 'boolean',
    choices: [],
    hint: ''
  },
  {
    id: '3',
    num: '028',
    content: 'Is there some vegetations nearby ?',
    categorie_id: '3a',
    type: 'String',
    hint: 'If yes, please put some comments on that situation',
    choices: []
  }
];
```
