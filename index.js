import express from 'express';
import routes from './routes/index.js';

const app = express();

app.use(express.static('./public'));
app.use(express.json());
app.set("view engine" , "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(3000 , () => {
    console.log("Server running on port 3000");    
})

