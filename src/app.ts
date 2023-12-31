import express, { Application, Request, Response } from "express"
const app: Application = express()
import cors from "cors";
import { userRoute } from "./modules/users/user.route";


app.use(express.json())
app.use(cors())


app.use("/api", userRoute)


app.get('/', (req:Request, res: Response) => {


   res.send("Hello word")

})



export default app;