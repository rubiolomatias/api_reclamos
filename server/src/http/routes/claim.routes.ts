import { Application } from 'express'
import CommonRoutes from './common.routes'
import createClaimAction from '../actions/create.claim.action'
import likeAction from '../actions/like.action'
import dislikeAction from '../actions/dislike.action'
import getOnFireClaimsAction from '../actions/get.on.fire.claims.action'
import getLastClaimsAction from '../actions/get.last.claims.action'
import getLastClaimsByVisitorAction from '../actions/get.last.claims.by.visitor.action'

class ClaimRoutes extends CommonRoutes {
  public constructor (app: Application) {
    super(app, 'Claim')
  }

  public setUpRoutes (): Application {
    this.app.post('/claim', createClaimAction.run)

    this.app.put('/claim/like/:id', likeAction.run)
    this.app.put('/claim/dislike/:id', dislikeAction.run)

    this.app.get('/claims/onfires', getOnFireClaimsAction.run)
    this.app.get('/claims/latest', getLastClaimsAction.run)
    this.app.get('/claims/:id', getLastClaimsByVisitorAction.run)
    return this.app
  }
}

export default ClaimRoutes
