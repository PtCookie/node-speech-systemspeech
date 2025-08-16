import { createInterface } from "node:readline";
import { exit, stdin, stdout } from "node:process";
import dotnet from "node-api-dotnet";

import "./bin/System.Speech.js";

const Synthesis = dotnet.System.Speech.Synthesis;

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const synthesizer = new Synthesis.SpeechSynthesizer();
let prompt;

const readline = createInterface({
  input: stdin,
  output: stdout,
});

readline.setPrompt("[s]peak, [p]ause, [r]esume, s[t]op, st[a]tus, e[x]it: \n");
readline.prompt();

readline.on("line", (line) => {
  const command = line.trim().toLowerCase();

  switch (command) {
    case "s": {
      const speaking = synthesizer.State === Synthesis.SynthesizerState.Speaking;

      if (speaking && prompt) {
        synthesizer.SpeakAsyncCancel(prompt);
      }

      prompt = synthesizer.SpeakAsync(text);
      break;
    }
    case "p": {
      synthesizer.Pause();
      break;
    }
    case "r": {
      synthesizer.Resume();
      break;
    }
    case "t": {
      if (prompt) {
        synthesizer.SpeakAsyncCancel(prompt);
      }

      break;
    }
    case "a": {
      const status = synthesizer.State;

      console.log("Current status:", Synthesis.SynthesizerState[status]);
      break;
    }
    case "x": {
      console.log("Exiting the program...");

      readline.close();
      break;
    }
    default:
      console.log("Unknown command. Please use one of the following commands:");
      break;
  }

  readline.prompt();
});

readline.on("close", () => {
  console.log("Exit program.");

  exit(0);
});
