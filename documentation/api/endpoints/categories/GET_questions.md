# Search

    GET /categories/:categorie_num/questions/

## Description

Get the questions of a specific categorie based on it num.

## Return format

{

questions : [**[Question][]**]

}

## Example

### **Request**

```JSON
    -  GET /categories/3a/questions
```

### **Return**

```JSON
{
  "questions": [
    {
      "id": "5b4901f0a47137f00321331f",
      "num": "019",
      "type": "number",
      "category_num": "3a",
      "content": "What is the measure/distance of the 1st slant ?",
      "hint": "",
      "choices": [],
    },
    {
      "id": "5b4901f0a471378fbc213320",
      "num": "022",
      "type": "boolean",
      "category_num": "3a",
      "content": "Is there any garages ?",
      "hint": "",
      "choices": [],
    }
  ]
}
```

[question]: ../../formats.md#question-format
