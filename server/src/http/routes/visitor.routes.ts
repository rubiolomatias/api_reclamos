import { Application } from 'express'
import CommonRoutes from './common.routes'
import createVisitorAction from '../actions/create.visitor.action'
import getVisitors from '../actions/get.visitors'

class VisitorRoutes extends CommonRoutes {
  public constructor (app: Application) {
    super(app, 'Visitor')
  }

  public setUpRoutes (): Application {
    this.app.post('/visitor', createVisitorAction.run)
    this.app.get('/visitors', getVisitors.run)

    return this.app
  }
}

export default VisitorRoutes
