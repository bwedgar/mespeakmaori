meSpeak.loadVoice('en/en-us');

written = ["a", "e", "i", "o", "u", "ā", "ē", "ī", "ō", "ū", "b", "h", "k", "m", "n", "p", "r", "t", "f", "g", "w", " ", "'", "\,", "_","-", "1", "2", "3", "4", "5","6","7","8"]
sound = ['A:', 'E', 'i', 'o@', 'u', 'A:', 'E:', 'i:', 'O:', 'u:', 'b', 'h', 'k', 'm', 'n', 'p', 'r', 't', 'f', 'N', 'w', ' ', '\'', '\,', '_', '-','we', 'aI', 'aI', 'Ei', 'Ea#','OI','o','O:A:']
say = (text) => {
  text = text.replace('wh', 'f').replace('ng', 'g').replace('oe', "1").replace('ae', "2").replace('ai', "3").replace('ei', "4").replace('ea', "5").replace('oi', "6").replace('au',"7").replace('oa',"8")
  phonemes = ""
  text.split("").forEach((c) => phonemes += sound[written.indexOf(c)])
  //alert(phonemes)
  return phonemes
}
mespeakmaori = (t) => {
  meSpeak.speak("[[" + say(t) + " pA."+"]]", {
    speed: 100,
    wordgap: 10,
    //nostop: false,
    variant: "m8"//"f5" //best f5
  });
}
