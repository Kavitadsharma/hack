
const express=require("express")
const { Configuration, OpenAIApi }=require("openai")
const cors=require("cors")

require("dotenv").config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})
//"Create a list of 8 questions for my interview with a science fiction author:"
app.post('/interview-question', async (req, res) => {
  try {
    const question = req.body.question;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        temperature: 0.5,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})




//"Convert this from first-person to third person (gender female):\n\nI decided to make a movie about Ada Lovelace.",
// try different thing
app.post('/differ', async (req, res) => {
    try {
      const question = req.body.question;
  
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
      });
    res.status(200).send({
        bot: response.data.choices[0].text
      });
  
    } catch (error) {
      console.error(error)
      res.status(500).send(error || 'Something went wrong');
    }
  })

//music


// app.post("/audio",async function transcribeAudio() {
//   const audioBuffer = fs.readFileSync(audioPath);
//   const api = new openai.LanguageModelApi({ apiKey });

//   const response = await api.transcribe({
//     model: 'whisper-1',
//     audio: audioBuffer.toString('base64')
//   });

//   console.log(response.transcriptions);
//   transcribeAudio();
// }


// )









app.listen(5000, () => console.log('AI server started on http://localhost:5000'))