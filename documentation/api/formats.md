# Resources Format

This document details all resources retrievable via the API.

## Base

All requests for the API **must** be prefixed by `/api`.

Some routes accept the following query parameters :

- `?skip=(number)`: Specifies the number of resources to skip.

- `?limit=(number)`: Specifies the maximum number of resources to return.

- `?full=(true|false)` : Specifies if the reference should be replaced by their entity.

## Error Format

All errors return an HTTP error response with a JSON Object as key `message` about the error and the status of the response set to match the error.

```json
{
  "message": "The requested object is not valid"
}
```

## Stop format

The format of an Stop object includes the following data:

- **id** — [string] The identifier stop number (internal identifier, 5 characters).
- **alpha_fr** — [string] The official name of the stop in small letters and in French.

  - **fr** — [string] The French version.
  - **nl** — [string] The Dutch version

- **descr** — [string] The functional name in uppercase.

  - **fr** — [string] The French version.
  - **nl** — [string] The Dutch version.

- **longitude** — [string] The Longitude coordinate.
- **latitude** — [string] The Latitude coordinate.
- **address** — [object] The adddress.

  - **fr** — [string] The French version.
  - **nl** — [string] The Dutch version.

- **transport** — [**[Line][]**[]] A list of **[Line][]** which pass by this stop.
- **type** — [string] Represented by a single character :

  - `0` : It's a Stop type. A location where passengers board or disembark from a transit vehicle,
  - `1` : It's a Station type. A physical structure or area that contains one or more stop.
  - `2` : It's a Station type Entrance/Exit. A location where passengers can enter or exit a station from the street.
    - The stop entry must also specify a parent_station value referencing the stop ID of the parent station for the entrance

## Line format

A Line is related to a stop.

The format of an Line object includes the following data:

- **line_id** — [string] The Line number.
- **type** — [string] The first character of the type of transport :
  - `M` : Metro
  - `T` : Tramway
  - `B` : Bus
- **direction** — [Object] The stop destination :
  - **fr** — [string] The French version.
  - **nl** — [string] The Dutch version.

* **route_color** — [string] The main color that corresponds to a line
* **route_text_color** — [string] The legible color to use for text drawn against a background of route_color..

## Picture format

A Picture is related to a stop.

The format of a Picture object includes the following data:

- **stop_id** — [string] The Stop ID.
- **url** — [string] The relative path of the picture on the server.
- **comment** — [string] The comment about the picture.

## Question format

A Question is a question about the stop.

The format of an Question object includes the following data:

- **id** — [string] ID of the question.
- **num** - [string] The number of the question
- **content** — [string] The question.
- **type** — [enum(boolean, number, multiple, text)] Which kind of question is it.
- **hint** — [string] The hint for the question.
- **choices** — [string[]] Contains all possible answers to the question of type multiple :
- **categorie_num** — [string] The **[Category][]** Num of the question.

## Category format

A Category is a question category. It can be a subcategory.

The format of an Category object includes the following data:

- **id** — [string] ID of the Category.
- **num** - [string] The number of the category
- **name** — [string] The name of the category.
- **parent_num** — [string] The **[Category][]** Num of the enclosing category.

## Input format

An Input is a given response to a **[Question][]**.

The format of an Input object includes the following data:

- **id** — [string] ID of the Input.
- **question_num** — [string] The **[Question][]** num.
- **answer** — [string] The answer to the **[Question][]**.

## History format

A History is a record of the updates **[Input][]** of a Stop. It can be linked to another history.

**The current history of a stop is the last updated.**

The format of an History object includes the following data:

- **id** — [string] The history ID.
- **stop_id** — [string] The Stop ID.
- **created** — [datetime] The ISO satetime of the update.
- **inputs** — [string[]] All **[Input][]** related to.
- **previous** — [**[History][]**] The previous **[History][]**.

[base]: ./formats.md#base
[stop]: ./formats.md#stop-format
[line]: ./formats.md#line-format
[picture]: ./formats.md#picture-format
[question]: ./formats.md#question-format
[category]: ./formats.md#category-format
[input]: ./formats.md#input-format
[history]: ./formats.md#history-format
