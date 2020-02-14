import express from 'express'

const routes = [
  'users',
  'categories'
]

const nestedRoutes = new Map()
nestedRoutes.set('users', ['posts'])

export default (app, models) => {

  for (let route of routes) {
    let router = express.Router()
    require(`./controllers/${route}`)(router, models)
    app.use(`/${route}`, router)
  }

  for (let [parent, routes] of nestedRoutes) {
    for (let route of routes) {
      let nestedRouter = express.Router({ mergeParams: true })
      require(`./controllers/${route}`)(nestedRouter, models)
      app.use(`/${parent}/:id/${route}`, nestedRouter)
    }
  }

}
