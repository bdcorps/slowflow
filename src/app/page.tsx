"use client"

import Prompter from "@/components/prompter";
import { useCompletion } from "ai/react";

export default function Home() {
  const { completion, input, handleInputChange, handleSubmit, error, data } =
    useCompletion();

  return (
    <main className="p-10">
      <div className=" flex flex-row w-full space-x-24">
        <div className="w-1/2">
          <Prompter />
        </div>

        <div className="w-1/2 space-y-4">
          <div>
            <h1 className="font-medium text-xl">Easy Website Builder</h1>
            <h2 className="text-gray-600">Reveals more complex UI as the user levels up</h2>
          </div>

          <div className="space-y-0">
            <div className="w-full bg-white text-gray-500    rounded-md">
              → Add text
            </div>

            <div className="w-full bg-white text-gray-500    rounded-md">
              → Add an button
            </div>

            <div className="w-full bg-white text-gray-500    rounded-md">
              → Add an image
            </div>
          </div>

          <div id="ui"></div>



          {/* <div className="w-full">
            <h2>Controls</h2>
            <select name="" id="" className="w-full">
              <option value="l1">Level 1</option>
              <option value="l2">Level 2</option>
              <option value="l3">Level 3</option>
            </select>
          </div> */}

          {data && (
            <pre className="p-4 text-sm bg-gray-100">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
          {/* {error && (
            <div className="fixed top-0 left-0 w-full p-4 text-center bg-red-500 text-white">
              {error.message}
            </div>
          )} */}
          {completion}


        </div>
      </div>

    </main>
  );
}
