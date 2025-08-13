import dotnet from "node-api-dotnet";

const Console = dotnet.System.Console;
const Speech = dotnet.System.Speech;

Console.WriteLine("Hello from .NET!");

const synthesizer = new Speech.Synthesis.SpeechSynthesizer();
const voices = synthesizer.GetInstalledVoices();

console.log("Installed voices:", voices);

synthesizer.Speak("Hello, World!");
