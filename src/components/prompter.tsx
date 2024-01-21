'use client';

import { useState } from "react";


export default function Prompter() {
  const [data, setData] = useState("")
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [level, setLevel] = useState("beginner")


  const getData = async () => {
    let url: string =
      `/api/cf?input=${input}&level=${level}`
    setLoading(true)
    const res = await fetch(url, { next: { revalidate: 1 } })

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const json = await res.json()
    setData(json.output);
    setLoading(false)
  }

  return (
    <div>
      {/* <div className="space-y-4">
        <div className="w-full bg-white p-2 rounded-md">
          Add text
        </div>

        <div className="w-full bg-white p-2 rounded-md">
          Add an button
        </div>
      </div> */}

      {loading && <div>Loading...</div>}

      {data && <div dangerouslySetInnerHTML={{ __html: data }} />}

      <div className="w-full bottom-1 fixed">

        <div className="flex flex-row w-full justify-center space-x-6 items-baseline">
          <select name="" id="" onChange={(e) => {
            setLevel(e.target.value)
          }}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
          <input
            className="max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={(e) => {
              setInput(e.target.value)
            }}
          />

          <button onClick={() => { getData() }}>Add</button>
        </div>
      </div>

    </div>
  );
}

