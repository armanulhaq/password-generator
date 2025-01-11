import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
    const [length, setLength] = useState(8);
    const [number, setNumber] = useState(false);
    const [char, setChar] = useState(false);
    const [password, setPassword] = useState("");

    const passwordRef = useRef(null);

    const copyPassword = () => {
        passwordRef.current?.select();
        //passwordRef.current?.setSelectionRange(0, 4);
        window.navigator.clipboard.writeText(password);
    };

    useEffect(() => {
        function passwordGenerator() {
            let pass = "";
            let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            if (number) {
                str += "0123456789";
            }
            if (char) {
                str += '!"#$%&';
            }

            for (let i = 0; i <= length; i++) {
                let randomIndex = Math.floor(Math.random() * str.length);
                pass += str.charAt(randomIndex);
            }
            setPassword(pass);
        }
        passwordGenerator();
    }, [length, number, char]);

    return (
        <>
            <div className="w-[100vw] h-[100vh] py-20 text-center bg-[#fefae0]">
                <div className="mb-10 font-bold text-4xl text-center">
                    Random Password Generator
                </div>
                <div>
                    <input
                        className="shadow-lg px-3 rounded-md h-10 w-[300px]"
                        type="text"
                        value={password}
                        placeholder="Enter password"
                        readOnly
                        ref={passwordRef}
                    />
                    <button
                        onClick={copyPassword}
                        className="ml-3 rounded-md bg-blue-500 text-white px-3 py-2 shrink-0"
                    >
                        copy
                    </button>
                </div>
                <div className="flex text-sm gap-x-2 justify-center mt-10 text-center">
                    <div className="flex items-center gap-x-1">
                        <input
                            className="cursor-pointer"
                            type="range"
                            min={6}
                            max={20}
                            value={length}
                            onChange={(e) => {
                                setLength(e.target.value);
                            }}
                        />
                        <label>Length: {length}</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <input
                            className="cursor-pointer"
                            defaultChecked={number}
                            type="checkbox"
                            id="numberInput"
                            onChange={() => {
                                setNumber((prev) => !prev);
                            }}
                        />
                        <label>Include Numbers</label>
                    </div>

                    <div className="flex items-center gap-x-1">
                        <input
                            className="cursor-pointer"
                            defaultChecked={char}
                            type="checkbox"
                            id="charInput"
                            onChange={() => {
                                setChar((prev) => !prev);
                            }}
                        />
                        <label>Include characters</label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
