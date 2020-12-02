"use strict";
const Filme = use("App/Models/Filme");

class FilmeController {
  async index({ request, response, view }) {
    const { page, perPage } = request.get("page", "perPage");
    // const limit = 3

    const term = request.input("term");
    const movies = await Filme.query()
      .where("name", "like", `%${term}%`)
      .fetch();
    console.log(term);

    const filmes = await Filme.query().paginate(page, perPage);

    if (term) {
      response.json({
        filme: movies,
      });
    } else {
      response.json({
        filme: filmes,
      });
    }
  }

  async store({ request, response }) {
    const { name, genero, releaseDate, description } = request.post();

    const filme = new Filme();
    filme.name = name;
    filme.genero = genero;
    filme.releaseDate = releaseDate;
    filme.description = description;

    await filme.save();
    response.json({
      message: "Cadastrado com sucesso",
    });
    console.log(filme.$isPersisted); // true
  }

  async update({ params, request, response }) {
    const filme = await Filme.findOrFail(params.id);

    const sent = request.post();

    filme.merge({
      name: sent.name,
    });
    await filme.save();
  }

  async destroy({ params, request, response }) {
    // const { id } = params
    const filme = await Filme.findOrFail(params.id);

    await filme.delete();

    response.json({
      message: "Deleted item",
    });
  }
}

module.exports = FilmeController;
