import { Application } from 'express'
import CommonRoutes from './common.routes'
import createClaimAction from '../actions/create.claim.action'
import likeAction from '../actions/like.action'
import dislikeAction from '../actions/dislike.action'

class ClaimRoutes extends CommonRoutes {
  public constructor (app: Application) {
    super(app, 'Claim')
  }

  public setUpRoutes (): Application {
    this.app.post('/claim', createClaimAction.run)
    this.app.put('/claim/:id', likeAction.run)
    this.app.put('/claim/:id', dislikeAction.run)

    return this.app
  }
}

export default ClaimRoutes
