import { config } from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import readline from 'readline'
config()

// ChatGPTの設定
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
)

// 標準入出力の設定
const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// ユーザに入力を促す
userInterface.prompt()
userInterface.on('line', async (input) => {
  if (input === 'exit') {
    userInterface.close()
    return
  }
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: input }],
  })
  console.log(res.data.choices[0].message.content)
})
