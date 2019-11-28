
    meSpeak.loadVoice('en/en-us');

    written = ["a", "e", "i", "o", "u", "ā", "ē", "ī", "ō", "ū", "b", "h", "k", "m", "n", "p", "r", "t", "f", "g", "w", " " , "'" , "\," ,"_","1","2","3","4","5"]
    sound = ['a#', 'E', 'i', 'o', 'U', 'A:', 'i@', 'i:', 'O:', 'u:', 'b', 'h', 'k', 'm', 'n', 'p', 'r', 't', 'f', 'N', 'w', ' ' , '\'', '\,','_','we','aI','aI','Ei','Ea#']
    say = (text) => {
      text = text.replace('wh', 'f').replace('ng', 'g').replace('oe',"1").replace('ae',"2").replace('ai',"3").replace('ei',"4").replace('ea',"5")
      phonemes = ""
      text.split("").forEach((c) => phonemes += sound[written.indexOf(c)])
      return phonemes
    }
    mespeakmaori=(t)=>{
    meSpeak.speak("[["+  say(t)+"]]", {
        speed: 120,
        wordgap: 10,
        variant: "f5"//best f5
      });
    }
