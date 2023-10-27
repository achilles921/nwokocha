const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const ethers = require("ethers");
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

const abi = require('./src/abis/predictionAbi.json');

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = `http://localhost:${appPort}`;
const provider = new ethers.WebSocketProvider(process.env.REACT_APP_WEB_SOCKET_URL);
const gasPrice = 3000000000;
const gasLimit = 1200000;

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, abi, wallet)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const handleError = (e) => {
  if (e.reason == "cancelled") {
    return "tx cancelled";
  } else if (e.reason == "transaction failed") {
    return "tx failed";
  } else if (e.reason == "insufficient funds for intrinsic transaction cost") {
    return "insufficient balance"
  } else if (e.reason == "replaced") {
    return "tx replaced";
  } else {
    return "unknow";
  }
}

app.post("/api/bet", async (req, res) => {
  const { direction, epoch, amount, password } = req.body;
  console.log("direction: ", direction == 0 ? "up" : "down", "epoch: ", epoch);
  
  if (password !== "1027") {
    res.send({
      success: true,
      error: "wrong password"
    });
  }

  try {
    let tx_res;
    if (direction == 0) {
      tx_res = await contract.betBull(epoch, {
        value: ethers.parseEther(amount.toFixed(4)),
        gasPrice: gasPrice,
        gasLimit: gasLimit
      });
    } else {
      tx_res = await contract.betBear(epoch, {
        value: ethers.parseEther(amount.toFixed(4)),
        gasPrice: gasPrice,
        gasLimit: gasLimit
      });
    }
    
    bet_res = await tx_res.wait(1);
  
    res.send({
      success: true,
    });
  } catch(e) {
    res.send({
      success: true,
      error: handleError(e)
    });
  }
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
