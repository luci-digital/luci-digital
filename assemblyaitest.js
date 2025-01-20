import { AssemblyAI } from 'assemblyai';

const client = new AssemblyAI({
  apiKey: '8461a3c5f2fc4b6e94667ab63b5e53b7',
});

const FILE_URL = '/Users/dharr/Desktop/Call Recording.m4a';


// Request parameters 
const CONFIG_OPTIONS = {
  SPEAKER_LABELS: 'speaker_labels',
  AUTO_HIGHLIGHTS: 'auto_highlights',
  SENTIMENT_ANALYSIS: 'sentiment_analysis'
};

const runTranscription = async (data, callback) => {
  const transcript = await client.transcripts.transcribe(data);
  console.log(transcript.text);
  if (callback) {
    callback(transcript);
  }
};

const basicTranscriptionData = {
  audio: FILE_URL
};

const speakerLabelData = {
  audio: FILE_URL,
  [CONFIG_OPTIONS.SPEAKER_LABELS]: true
};

const autoHighlightsData = {
  audio: FILE_URL,
  [CONFIG_OPTIONS.AUTO_HIGHLIGHTS]: true
};

const sentimentAnalysisData = {
  audio: FILE_URL,
  [CONFIG_OPTIONS.SENTIMENT_ANALYSIS]: true
};

// Run basic transcription
runTranscription(basicTranscriptionData);

// Run transcription with speaker labels
runTranscription(speakerLabelData, (transcript) => {
  for (let utterance of transcript.utterances) {
    console.log(`Speaker ${utterance.speaker}: ${utterance.text}`);
  }
});

// Run transcription with auto highlights
runTranscription(autoHighlightsData, (transcript) => {
  for (let result of transcript.auto_highlights_result.results) {
    console.log(
      `Highlight: ${result.text}, Count: ${result.count}, Rank: ${result.rank}`
    );
  }
});

// Run transcription with sentiment analysis
runTranscription(sentimentAnalysisData, (transcript) => {
  for (let utterance of transcript.utterances) {
    console.log(
      `Speaker ${utterance.speaker}: ${utterance.text}, Sentiment: ${utterance.sentiment}`
    );
  }
});
