import { Router } from "express"

// import { body, query } from "express-validator"
// import { AuthorizationMiddleware } from "../auth/middleware/AuthorizationMiddleware.js"
// import { verifyFieldsErrors } from "../common/middleware/body-query-validation.middleware.js"
// import TokenMiddleWare from "../common/middleware/TokenMiddleWare.js"
import * as eventsController from "./events.controller.js"

const router = Router()

router.route("/").get(
  // TokenMiddleWare.extractAPIToken,
  // query("apiToken").isString().isLength({ min: 64, max: 64 }),
  // verifyFieldsErrors,
  // AuthorizationMiddleware.isTokenAuthorized,
  eventsController.eventsAll,
)

// router.route("/next").get(meetingsController.getNext)
// router.route("/by-day").get(meetingsController.getByDay)

// router
//   .route("/store-import")
//   .post(
//     TokenMiddleWare.extractAPIToken,
//     query("apiToken").isString().isLength({ min: 64, max: 64 }),
//     body("data").isArray(),
//     verifyFieldsErrors,
//     AuthorizationMiddleware.isTokenAuthorized,
//     quickenController.recordQuickenImport,
//   )

// router
//   .route("/most-recent-import")
//   .get(
//     TokenMiddleWare.extractAPIToken,
//     query("apiToken").isString().isLength({ min: 64, max: 64 }),
//     verifyFieldsErrors,
//     AuthorizationMiddleware.isTokenAuthorized,
//     quickenController.provideMostRecentQuickenImport,
//   )

export default router
