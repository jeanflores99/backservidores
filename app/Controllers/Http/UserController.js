'use strict'
const User = use('App/Models/User')

const db = use('Database');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    let { nombres, apellidos } = request.all();
    try {

      await User.create({
        nombres: nombres,
        apellidos: apellidos
      })
      return {
        success: true
      }

      // return {
      //   success: false
      // }


    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    let dat = await db.raw(`select * from users`)
    let dato = await dat[0]
    // console.log(dat[0])
    return { datos: dato }
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    let { id, nombres, apellidos } = request.all()
    try {
      let dat = await User.find(id)
      dat.nombres = nombres
      dat.apellidos = apellidos
      await dat.save()
      return {
        success: true,
        user: dat
      }
    } catch (error) {
      console.log(error)
      return {
        success: false

      }
    }

  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    let { id } = params;
    try {
      let dat = await User.find(id)
      await dat.delete();
      return {
        success: true
      }
    } catch (error) {
      console.log(error)
      return {
        success: false
      }
    }
  }
}

module.exports = UserController
