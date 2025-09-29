import axios from "axios";

async function run(prompt) {
  const response = await axios.post("https://ai-sharthi.vercel.app/api/ai", {
    prompt,
  });
  return response.data.result;
}

export default run;
