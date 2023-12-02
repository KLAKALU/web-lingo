import { useState } from "react"
import { SecureStorage } from "@plasmohq/storage/secure"
import { set, useForm } from "react-hook-form";
import axios from "axios";

import "./style.css"

const apiUrl = 'http://localhost:3000'

interface LoginForm {
  email: string;
  password: string;
}

function loginComponent( {
  register,
  handleSubmit,
  onSubmit,
  showLoginForm, setShowLoginForm,
  showSignUpForm, setShowSignUpForm,
} ) {

  return (
    <div>
      <div className = "text-base text-gray-900 font-bold">
        Sing up now to unlock your dictionaries
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowSignUpForm(!showSignUpForm)}
      >
        Sign up
      </button>
      {showSignUpForm &&
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label for="Email" 
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input 
            {...register("email", { required: "email is required" })}
            type="text" 
            id="first_name" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="example@mail"
            required />
            <label for="Password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input 
            type="text" 
            id="first_name" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="password"
            required />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit">
              Sign up
            </button>
        </form>
      </div>
      }
      <div className="text-gray-600 text-sm">Alrady have an account?</div>
      <a>Sigin in</a>
    </div>
  )
}

function IndexPopup() {
  console.log("popup")

  const storage = new SecureStorage()

  storage.setPassword("roosevelt")

  const testData = storage.get("test")

  const [showLoginForm, setShowLoginForm] = useState(false);

  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  // ストレージにトークンがあればログイン状態にする
  () => {
    if (storage.get('token')) setLoggedIn(true)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  // ログイン
  const signUp = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${apiUrl}/signup`, { 
            email: email,
            password: password
        }).then((response) => {
            console.log(response);
            storage.set('token', response.data.token)
            setLoggedIn(true);
            console.log("logged in")
        }
        );
        // const { data } = response;
    } catch (error) {
        console.log(error);
        //setError(error);
    }
  }

  const onSubmit = (data: LoginForm) => {
    console.log(data)
    signUp(data.email, data.password)
    setLoggedIn(true)
  };

  return (
    <div className= "w-80 font-sans p-4">
      <h1 className = "text-lg font-semibold text-slate-900 border-b">Web-lingo</h1>
      {loggedIn ? <div>Logged in</div> : loginComponent({
        register,
        handleSubmit,
        onSubmit,
        showLoginForm, setShowLoginForm,
        showSignUpForm, setShowSignUpForm,
        })}
    </div>
  )
}

export default IndexPopup
