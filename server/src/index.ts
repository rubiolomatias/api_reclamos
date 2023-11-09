import express from 'express'
import CommonRoutes from './http/routes/common.routes'
import cors from 'cors'
import { log } from 'debug'
import expressWinston from 'express-winston'
import winston from 'winston'
import VisitorRoutes from './http/routes/visitor.routes'
import ClaimRoutes from './http/routes/claim.routes'
import CategoryRoutes from './http/routes/category.routes'
import SeederVisitor from './infrastructure/seeders/visitor.seeder'
import SeederCategory from './infrastructure/seeders/category.seeder'

const app: express.Application = express()

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  )
}

// @ts-ignore
if (!process.env.DEBUG) {
  loggerOptions.meta = false // when not debugging, log requests as one-liners
}

app.use(expressWinston.logger(loggerOptions))

const routes: Array<CommonRoutes> = []
app.use(cors())
app.use(express.json())

// Add router
// you should add your routes here...
// routes.push(new PassengerRoutes(app));
routes.push(new CategoryRoutes(app))
routes.push(new VisitorRoutes(app))
routes.push(new ClaimRoutes(app))

app.listen(3000, async () => {
  await SeederCategory.generate()
  await SeederVisitor.generate()
  routes.forEach((route: CommonRoutes) => {
    log(`Routes configured for ${route.getName()}`)
  })
  log('Server listening on port 3000')
})
