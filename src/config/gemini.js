import axios from "axios";

async function run(prompt) {
  const response = await axios.post("http://localhost:5173/api/ai", {
    prompt,
  });
  return response.data;
}

export default run;
