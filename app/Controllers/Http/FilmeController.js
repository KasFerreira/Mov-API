'use strict'
const Filme = use('App/Models/Filme')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with filmes
 */
class FilmeController {
  /**
   * Show a list of all filmes.
   * GET filmes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    
    const page = request.input('page', 1)
    const limit = 3

    


    const filmes = await Filme.query().paginate(page, limit)
     


    response.json({
      filme:filmes
    }) 
  }

  /**
   * Render a form to be used for creating a new filme.
   * GET filmes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  

  /**
   * Create/save a new filme.
   * POST filmes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const {name, genero, releaseDate, description} = request.post()
    
    const filme = new Filme()
    filme.name = name
    filme.genero = genero
    filme.releaseDate=releaseDate
    filme.description=description

    await filme.save()
    response.json({
      message:"Cadastrado com sucesso"
    })
    console.log(filme.$isPersisted) // true
  }

  /**
   * Display a single filme.
   * GET filmes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {





  }

  /**
   * Render a form to update an existing filme.
   * GET filmes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update filme details.
   * PUT or PATCH filmes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a filme with id.
   * DELETE filmes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = FilmeController
