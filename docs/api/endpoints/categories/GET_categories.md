# Search

    GET /categories/

## Description

List all categories.

## Return format

{

categories : [**[Category][]**]

}

## Example

### **Request**

```JSON
    -  GET /categories/
```

### **Return**

```JSON
{
  "categories": [
    {
      "num": "3",
      "name": "Accessibility",
      "questions": [],
      "id": "5b5070a6c393bd22c0f47066"
    },
    {
      "num": "3a",
      "name": "Physical elements",
      "parent_num": "3",
      "questions": [
        {
          "category_num": "3a",
          "category": null,
          "id": "5b4901f0a47137f00321331f"
        },
        {
          "category_num": "3a",
          "category": null,
          "id": "5b4901f0a471378fbc213320"
        },
        {
          "category_num": "3a",
          "category": null,
          "id": "5b4901f0a47137f90e213321"
        }
      ],
      "id": "5b5070a6c393bd22c0f47067"
    },
    {
      "num": "3b",
      "name": "PMR",
      "parent_num": "3",
      "questions": [
        {
          "category_num": "3b",
          "category": null,
          "id": "5b4901f0a471370c93213322"
        }
      ],
      "id": "5b5070a6c393bd22c0f47068"
    }
  ]
}
```

[category]: ../../formats.md#category-format
