import express from 'express';
import fs, { appendFileSync } from 'fs';
import { userInfo } from 'os';
const app = express();
let userN;
let usInfo;

app.use(express.static('./site'));
app.use(express.json());

app.post('/stats', (req,res) => {
   appendFileSync('stats.txt', JSON.stringify(req.body) + "\n");
})
app.listen(3000, function () {
    console.log("Екземпляр запущено через порт 3000");
});