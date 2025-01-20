// Start by making sure the `assemblyai` package is installed.
// If not, you can install it by running the following command:
// npm install assemblyai

import { AssemblyAI } from 'assemblyai';

const client = new AssemblyAI({
  apiKey: '8461a3c5f2fc4b6e94667ab63b5e53b7',
});

const FILE_URL = '/Users/dharr/Desktop/Call Recording.m4a';

// You can also transcribe a local file by passing in a file path
// const FILE_URL = './path/to/file.mp3';

// Request parameters 
const data1 = {
  audio: FILE_URL
};

const run1 = async () => {
  const transcript = await client.transcripts.transcribe(data1);
  console.log(transcript.text);
};


// Request parameters where speaker_labels has been enabled
const data2 = {
  audio: FILE_URL,
  speaker_labels: true
};

const run2 = async () => {
  const transcript = await client.transcripts.transcribe(data2);
  console.log(transcript.text);

  for (let utterance of transcript.utterances) {
    console.log(`Speaker ${utterance.speaker}: ${utterance.text}`);
  }
};


// Request parameters where auto_highlights has been enabled
const data3 = {
  audio: FILE_URL,
  auto_highlights: true
};

const run3 = async () => {
  const transcript = await client.transcripts.transcribe(data3);
  console.log(transcript.text);

  for (let result of transcript.auto_highlights_result.results) {
    console.log(
      `Highlight: ${result.text}, Count: ${result.count}, Rank: ${result.rank}`
    );
  }
};

// Request parameters where auto_highlights has been enabled
const data4 = {
  audio: FILE_URL,
  auto_highlights: true
};

const run4 = async () => {
  const transcript = await client.transcripts.transcribe(data4);
  console.log(transcript.text);

  for (let result of transcript.auto_highlights_result.results) {
    console.log(
      `Highlight: ${result.text}, Count: ${result.count}, Rank: ${result.rank}`
    );
  }
};

run1();
run2();
run3();
run4();
