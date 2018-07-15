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
- **alpha_fr** — [string] The french official name of the stop in small letters and in French.
- **alpha_nl** — [string] The Dutch official name.
- **descr_fr** — [string] The French functional name in uppercase.
- **descr_nl** — [string] The Dutch functional name in uppercase.
- **coord_x** — [string] The Longitude coordinate.
- **coord_y** — [string] The Latitude coordinate.
- **address** — [object] The adddress in FRench and Dutch.

  - **fr** — [string] The French full address details.
  - **nl** — [string] The Dutch full address details.

- **transport** — [**[Line][]**[]] A list of **[Line][]** which pass by this stop.
- **type** — [string] Represented by a single character :

  - `0` : It's a Stop type. A location where passengers board or disembark from a transit vehicle,
  - `1` : It's a Station type. A physical structure or area that contains one or more stop.
  - `2` : It's a Station type Entrance/Exit. A location where passengers can enter or exit a station from the street.
    - The stop entry must also specify a parent_station value referencing the stop ID of the parent station for the entrance.}
      .

## Address format

An address is related to a stop.

The format of an Address object includes the following data:

- **fr** — [string] The French full address details.
- **nl** — [string] The Dutch full address details.

## Line format

A Line is related to a stop.

The format of an Line object includes the following data:

- **line_id** — [string] The Stop ID.
- **type** — [string] The first character of the type of transport :
  - `M` : Metro
  - `T` : Tramway
  - `B` : Bus
- **direction** — [Object] The stop destination in French and Dutch :
  - **fr** — [string] The French stop destination.
  - **nl** — [string] The Dutch stop destination.

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
- **categorie** — [string] The **[Category][]** ID of the question.

## Category format

A Category is a question category. It can be a subcategory.

The format of an Category object includes the following data:

- **id** — [string] ID of the Category.
- **name** — [string] The name of the category.
- **parent** — [string] The **[Category][]** ID of the enclosing category.

## Input format

An Input is a given response to a **[Question][]**.

The format of an Input object includes the following data:

- **id** — [string] ID of the Input.
- **question_id** — [string] The **[Question][]** ID.
- **answer** — [string] The answer to the **[Question][]**.

## History format

A History is a record of the updates **[Input][]** of a Stop. It can be linked to another history.

**The current history of a stop is the last updated.**

The format of an History object includes the following data:

- **id** — [string] The history ID.
- **stop_id** — [string] The Stop ID.
- **created** — [datetime] The Linux datetime of the update.
- **inputs** — [string[]] All **[Input][]** ID related to.
- **previous** — [**[History][]**] The previous **[History][]**.

[base]: ./formats.md#base
[stop]: ./formats.md#stop-format
[address]: ./formats.md#address-format
[line]: ./formats.md#line-format
[picture]: ./formats.md#picture-format
[question]: ./formats.md#question-format
[category]: ./formats.md#category-format
[input]: ./formats.md#input-format
[history]: ./formats.md#history-format
