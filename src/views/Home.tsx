import React from "react";
import { observer } from 'mobx-react';

const Home = () => {
  return (
    <div className="w-full h-screen">
      <div className="flex max-w-[500px] mx-auto py-10 px-5">
        <div className="main">
          <div className="flex mb-2">
            <div className="flex-1 flex flex-col items-end mr-3">
              <h3>Current Epoch</h3>
            </div>
            <div className="flex-1 ml-3">
              <h3>2314251</h3>
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
              />
            </div>
          </div>

          <div className="flex mb-2">
            <div className="flex-1 flex flex-col items-end mr-3">
              <button className="w-20 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded">
                Up
              </button>
            </div>
            <div className="flex-1 ml-3">
              <button className="w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">
                Down
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default observer(Home);