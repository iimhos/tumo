import express from 'express';
import fs from 'fs';
import { userInfo } from 'os';
const app = express();
let userN;
let usInfo;

app.use(express.static('./site'));
app.use(express.json());

app.post('/reg', (req,res) => {
    console.log(req.body);
    fs.appendFileSync('I_gonna_sell_this_info.txt',JSON.stringify(req.body) + ' \n')
})
app.listen(3000, function () {
    console.log("Екземпляр запущено через порт 3000");
});
//let a = fs.readFileSync('test.txt', 'utf8');