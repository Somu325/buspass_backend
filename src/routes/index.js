import { Router } from "express";
import busPassRouter from "./BussPassRouter.js";
import userRouter from "./UserRouter.js";
import OTPRouter from "./OtpRouter.js";
import busBookingRouter from "./BussBookinRouter.js";







const routes = Router();



routes.use('/otp',OTPRouter)
routes.use('/user',userRouter)
routes.use('/buspass',busPassRouter)
routes.use('/busbooking',busBookingRouter)


export default routes;