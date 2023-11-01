import React, { useState, useEffect } from "react";
import { observer } from 'mobx-react';
import Web3 from 'web3';

import { useStore } from "../stores/store";
import { contractAddress, webSocketUrl } from "../config/config";
import { NotificationType, betDirection } from "../utils/enums";
import { bet, claim } from '../api/agent';
import Notification from "../components/Notification";
import loading from '../assets/loading.svg';

const Home = () => {
  const  { commonStore } = useStore();

  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const init = async () => {
      const ABI = require('../abis/predictionAbi.json');

      const web3 = new Web3(webSocketUrl);

      const contract = new web3.eth.Contract(ABI, contractAddress);

      const result = parseInt(await contract.methods.currentEpoch().call());
      commonStore.setCurrentEpoch(result);
      commonStore.setLoading(false);

      contract.events.StartRound().on('data', (event) => {
        const epoch = Number(event.topics[1]);
        commonStore.setCurrentEpoch(epoch);
      })
    };

    init();

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  const formattedTime = () => {
    return time.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      month: "2-digit",
      day: "2-digit",
      timeZone: 'UTC',
      timeZoneName: 'short'
    });
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  }

  const checkFloat = (str: string) => !isNaN(Number(str)) && isFinite(Number(str)) && !/e/i.test(str);

  const onBet = (direction: betDirection) => {
    if (password === "") {
      commonStore.setNotificationType(NotificationType.Error)
      commonStore.setNotificationContent("Input today's password.");
      return;
    }

    if (!checkFloat(amount)) {
      commonStore.setNotificationType(NotificationType.Error)
      commonStore.setNotificationContent("Amount is not valid.");
      return;
    }
    
    commonStore.setLoading(true);
    bet(password, parseFloat(amount), direction, commonStore.currentEpoch).then(res => {
      if (res.success) {
        commonStore.setNotificationType(NotificationType.Success);
        commonStore.setNotificationTitle(direction === betDirection.Up ? "Up success" : "Down success")
        commonStore. setNotificationContent(amount + "bnb betted on " + commonStore.currentEpoch);
      } else {
        commonStore.setNotificationType(NotificationType.Error);
        commonStore.setNotificationTitle(direction === betDirection.Up ? "Up failed" : "Down failed")
        commonStore.setNotificationContent(res.error ? res.error : "");
      }
      commonStore.setLoading(false);
    });
  }

  const onClaim = () => {
    commonStore.setLoading(true);
    claim().then(res => {
      if (res.success) {
        commonStore.setNotificationType(NotificationType.Success);
        commonStore.setNotificationTitle("Claim success");
        commonStore.setNotificationContent(res.data ? res.data : "");
      } else {
        commonStore.setNotificationType(NotificationType.Error);
        commonStore.setNotificationTitle("Claim failed");
        commonStore.setNotificationContent(res.error ? res.error : "");
      }
      commonStore.setLoading(false);
    })
  }

  return (
    <div className="w-full h-screen">
      {commonStore.loading && (
        <div className="loading-overlay flex fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-30 justify-center items-center">
          {/* <div className="loading-spinner">loading...</div> */}
          <img src={loading} alt="loading" />
        </div>
      )}
      <div className="flex max-w-[500px] mx-auto py-10 px-5">
        <div className="main">
          <Notification />

          <div className="flex mb-6 text-2xl justify-center items-center font-bold">
            <div className="flex">
              <h3>{formattedTime()}</h3>
            </div>
          </div>

          <div className="flex mb-4 text-lg font-bold">
            <div className="flex-1 flex flex-col items-end mr-3">
              <h4>Current epoch</h4>
            </div>
            <div className="flex-1 ml-3">
              <h4>{commonStore.currentEpoch}</h4>
            </div>
          </div>
          
          <div className="flex mb-2">
            <div className="flex-1 flex flex-col items-end mr-3 justify-center">
              <label>Today's password</label>
            </div>
            <div className="flex-1 ml-3">
              <input 
                type="password"
                className="rounded w-full py-1 px-1 border focus:border-orange outline-none transition bg-transparent"
                value={password}
                onChange={onChangePassword}
              />
            </div>
          </div>

          <div className="flex mb-4">
            <div className="flex-1 flex flex-col items-end mr-3 justify-center">
              <label>Amount</label>
            </div>
            <div className="flex-1 ml-3">
              <input 
                type="text"
                className="rounded w-full py-1 px-1 border focus:border-orange outline-none transition bg-transparent"
                value={amount}
                onChange={onChangeAmount}
              />
            </div>
          </div>

          <div className="flex mb-10">
            <div className="flex-1 flex flex-col items-end mr-3">
              <button className="w-20 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded" onClick={() => onBet(betDirection.Up)}>
                Up
              </button>
            </div>
            <div className="flex-1 ml-3">
              <button className="w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded" onClick={() => onBet(betDirection.Down)}>
                Down
              </button>
            </div>
          </div>

          <div className="flex mb-6 text-xl justify-between items-center">
            <div className="flex pl-4">
              <h4>Today's Bets</h4>
            </div>
            <div className="flex pr-4">
              <button className="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => onClaim()}>
                Claim
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default observer(Home);