import { Application } from 'express'
import CommonRoutes from './common.routes'
import createClaimAction from '../actions/create.claim.action'
import likeAction from '../actions/like.action'
import dislikeAction from '../actions/dislike.action'
import GetOnFireClaimsAction from '../actions/get.on.fire.claims.action'

class ClaimRoutes extends CommonRoutes {
  public constructor (app: Application) {
    super(app, 'Claim')
  }

  public setUpRoutes (): Application {
    this.app.post('/claim', createClaimAction.run)

    this.app.put('/claim/like/:id', likeAction.run)
    this.app.put('/claim/dislike/:id', dislikeAction.run)

    this.app.get('/claim/onfires', GetOnFireClaimsAction.run)

    return this.app
  }
}

export default ClaimRoutes
