import { useState } from "react"
import { SecureStorage } from "@plasmohq/storage/secure"

import "./style.css"

function loginComponent( {showForm, setShowForm, data, setData} ) {
  return (
    <div>
      <div>
        Sing up now to unlock your dictionaries
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowForm(true)}
      >
        Sign up
      </button>
      <div>
            <label for="Email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@mail" required>
              </input>
      </div>
      <input placeholder = "email" onChange={(e) => setData(e.target.value)} value={data} />
      <input placeholder = "password" onChange={(e) => setData(e.target.value)} value={data} />
      <input placeholder = "password" onChange={(e) => setData(e.target.value)} value={data} />
      <div>Alrady have account?</div>
      <a>Sigin in</a>
      <input placeholder = "email" onChange={(e) => setData(e.target.value)} value={data} />
      <input placeholder = "password" onChange={(e) => setData(e.target.value)} value={data} />
      <div>
        {data && <div>foo</div>}
      </div>
      <input onChange={(e) => setData(e.target.value)} value={data} />
    </div>
  )
}

function IndexPopup() {
  const [data, setData] = useState("")

  const storage = new SecureStorage()

  storage.setPassword("roosevelt")

  const testdata = storage.get("test")

  const [showForm, setShowForm] = useState(false);
  const [logined, setLogined] = useState(false);

  return (
    <div class= "w-80 font-sans p-4">
      <h1 class = "text-lg font-semibold text-slate-900 border-b">Web-lingo</h1>
      {logined ? <div>foo</div> : loginComponent({showForm, setShowForm, data, setData})}
    </div>
  )
}

export default IndexPopup
