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

- **id** — [integer] ID of the question.
- **num** - [integer] The number of the question
- **content** — [string] The question.
- **type** — [enum(boolean, number, multiple, text)] Which kind of question is it.
- **hint** — [string] The hint for the question.
- **choices** — [Array<string>] Contains all corect answers for the question of type multiple :
- **categorie** — [string] The **[Category][]** ID of the question.

[question]: ./formats.md#question-format
