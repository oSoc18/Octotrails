

// function list(req, res, next) {
//   const { limit = 50, skip = 0, name } = req.query;

//   Stop.list({ limit, skip, name })
//     .then(stops => res.json(stops))
//     .catch(e => next(e));
// }


function search(req, res){
  let by = req.query.by;
  let term = req.query.term;

  //TODO filter by the query params
  
  console.log("Search in progress ")

  return res.json({
    "id": "811",
		"descr_fr": "Georges Henri",
		"descr_nl": "Georges_Henri",
		"coord_x": 152592,
		"coord_y": 170346,
		"address": {
			"fr": "Boulevard Brand Whitlock 92, Woluwe-Saint-Lambert",
			"nl": "Boulevard Brand Whitlock 92, Sint-Lambrechts-Woluwe"
		},
		"lines": [
			{
				"line_id": 7,
				"direction": {
					"fr": "Heysel",
					"nl": "Heysel"
				},
				"route_color": "FFF06E",
				"route_text_color": "000000"
			},
			{
				"line_id": 25,
				"direction": {
					"fr": "Rogier",
					"nl": "Rogier"
				},
				"route_color": "991F36",
				"route_text_color": "FFFFFF"
			}
		],
		"type": 0
  })
}



export default { search };
