export type SpeechTranscriptCallback = (text: string) => void;

// Basic Text-to-Speech using the Web Speech API.
export function speak(text: string, onEnd?: () => void, lang = "tr-TR") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.onend = () => onEnd?.();
  window.speechSynthesis.speak(utter);
}

// Start Speech-to-Text (speech recognition). Returns the recognition instance so caller can stop() later.
export function listen(
  onResult: SpeechTranscriptCallback,
  onSpeechEnd?: () => void,
  lang = "tr-TR",
) {
  if (typeof window === "undefined") return null;
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.error("SpeechRecognition API not supported in this browser");
    return null;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.interimResults = false;
  recognition.continuous = true;
  recognition.maxAlternatives = 1;

  recognition.onresult = (e: any) => {
    const idx = e.results.length - 1;
    const transcript = e.results[idx][0].transcript;
    onResult(transcript);
  };

  if (onSpeechEnd) {
    recognition.onspeechend = onSpeechEnd;
    recognition.onend = onSpeechEnd;
  }
  
  recognition.start();
  return recognition;
} 