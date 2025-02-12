import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%^&*()_+[]{}|;:',.<>?";

    let availableChars = characters;

    if (numAllowed) {
      availableChars += numbers;
    }

    if (charAllowed) {
      availableChars += specialCharacters;
    }

    let generatedPassword = "";

    for (let i = 1; i <= length; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length + 1);

      generatedPassword += availableChars.charAt(randomIndex);
    }

    setPassword(generatedPassword);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  const copyPassword = () => {
    passwordRef.current?.select()
    navigator.clipboard.writeText( password )
  }

  return (
    <>
      <div className="main mt-5">
        <h1 className="text-3xl text-center font-black text-white mt-5">
          Password Generator
        </h1>

        <div className="w-full max-w-xl rounded-xl bg-gray-800 my-5 mx-auto p-5 text-white">
          {/* Password Input with Copy Button */}
          <div className="flex items-center ">
            <input
              type="text"
              placeholder="Password"
              value={password}
              className="bg-white rounded-xl px-4 py-2 transition-all duration-900 placeholder-gray text-black w-full "
              readOnly
              ref={ passwordRef }
            />
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 ease-in-out focus:bg-blue-600 focus:scale-105 "
            onClick={ copyPassword }
            >
              Copy
            </button>
          </div>

          {/* Range Input */}
          <div className="flex items-center space-x-7 mt-7">
            <div className="flex items-center gap-x-2">
              <input
                id="password-length"
                type="range"
                value={length}
                min="8"
                max="33"
                className="w-md"
                onChange={(e) => setLength(e.target.value)}
              />
              <label>Length: {length}</label>
            </div>

            {/* Checkbox Options */}
            <div className="flex items-center gap-x-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  onClick={() => setCharAllowed((prev) => !prev)}
                />
                <span className="ml-2">Characters </span>
              </label>
            </div>

            <div className="flex items-center gap-x-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  onClick={() => setNumAllowed((prev) => !prev)}
                />
                <span className="ml-2">Numbers </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
