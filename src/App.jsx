import { useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const getImageGenerate = async () => {
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    setResult(res.data.data[0].url);
    setLoading(false);
  };

  return (
    <div className="app-main ">
      <h3>Generate an Image like DELL-E using Open AI (API)</h3>
      <input
        className="app-input"
        type="text"
        placeholder="Type something to Generate an Image..."
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={getImageGenerate}>Generate Image</button>
      {loading ? (
        <div>
          <span className="loading">Loading...</span>
        </div>
      ) : (
        <></>
      )}

      {result ? <img className="result-img" src={result} alt="" /> : <></>}
    </div>
  );
}

export default App;
