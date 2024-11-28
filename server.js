const express = require("express");
const path = require("path");

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("frontend", "index.html"));
});

app.listen(process.env.PORT || 3000, () => console.log("Tá rodando!"));


//Reiniciar o server sempre que houver alteração no arquivo:
//npm install --save-dev nodemon
// npx run dev (meu)
// npx nodemon server.js (irede)