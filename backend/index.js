import express from "express"
import cors from "cors"
import * as fs from 'fs';
import csv from 'csv-parser'; 

const app = express()


app.use(cors({
    origin: "http://localhost:5500/DSSD/frontend/index.html"
}))

app.get("/", (req, res) => {
    
    let results = []; 
    fs.createReadStream('cases_age.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.send({
        x: results.map((result) => result.week),
        y: results.map((result) => result.capita_0_4)

    }).status(200)
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]
    });

    // const data = fs.readFileSync("./cases_age.csv" );
        // console.log(data);

    
    
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listening on port ${port} 🚀`))