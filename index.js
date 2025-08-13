import dotnet from "node-api-dotnet";

import "./bin/System.Speech.js";

const Synthesis = dotnet.System.Speech.Synthesis;

const synthesizer = new Synthesis.SpeechSynthesizer();
const voices = synthesizer.GetInstalledVoices();

console.log("Installed voices:", voices);

synthesizer.Speak("Hello, World!");
