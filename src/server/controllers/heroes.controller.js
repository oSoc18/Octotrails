import Hero from '../models/hero.model';
//import User from "../models/user.model";


function load(params) {
  return Hero.get(params.id);
}

function get(req, res) {
  return res.json(req.hero);
}

function create(params) {
  const hero = new Hero({
    title: params.data.title,
    content: params.data.content
  });
  return hero.save();
}

function update(params) {
  return load(params).then(hero => {
    const tmp = hero;
    hero.title = params.data.title;
    hero.content = params.data.content;
    return hero.save()
  });
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Hero.list({ limit, skip })
    .then(heroes => res.json(heroes))
    .catch(e => next(e));
}

function remove(params) {
  return load(params).then(hero => hero.remove());
}

export default { load, get, create, update, list, remove };
