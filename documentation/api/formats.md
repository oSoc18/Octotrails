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

## Question format

A Question is a question about the stop

The format of an Question object includes the following data:

- **id** — [string] ID of the question.
- **num** - [string] The number of the question
- **content** — [string] The question.
- **type** — [enum(boolean, number, multiple, text)] Which kind of question is it.
- **hint** — [string] The hint for the question.
- **choices** — [Array<string>] Contains all corect answers for the question of type multiple :
- **categorie** — [string] The **[Category][]** ID of the question.

## Category format

A Category is a question category. It can be a subcategory.

The format of an Category object includes the following data:

- **id** — [string] ID of the Category.
- **name** — [string] The name of the category.
- **parent** — [string] The **[Category][]** ID of the enclosing category.

## Input format

An Input is a response to a **[Question][]**.

The format of an Input object includes the following data:

- **id** — [string] ID of the Input.
- **question_id** — [string] The **[Question][]** ID.
- **answer** — [string] The answer to the **[Question][]**.

## History format

A History is a record of the updates of a Stop. It can be linked to another history.

The format of an History object includes the following data:

- **stop_id** — [string] The Stop ID.
- **date_update** — [datetime] The Linux datetime of the update.
- **inputs** — [Array<string>] All **[Category][]** ID of updated.
- **previous** — [string] The ID of the previous **[History][]**.

[question]: ./formats.md#question-format
[category]: ./formats.md#category-format
[input]: ./formats.md#input-format
[history]: ./formats.md#history-format
