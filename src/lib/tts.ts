export class TTSService {
  private synth: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
    this.initVoice();
  }

  private initVoice() {
    const setVoice = () => {
      const voices = this.synth.getVoices();
      this.voice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha')) || voices[0];
    };

    if (this.synth.getVoices().length) {
      setVoice();
    } else {
      this.synth.onvoiceschanged = setVoice;
    }
  }

  speak(text: string) {
    this.synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (this.voice) utterance.voice = this.voice;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    this.synth.speak(utterance);
  }

  stop() {
    this.synth.cancel();
  }
}