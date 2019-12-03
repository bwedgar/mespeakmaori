meSpeak.loadVoice('en/en-us');

written = ["a", "e", "i", "o", "u", "ā", "ē", "ī", "ō", "ū", "h", "k", "m", "n", "p", "r", "t", "f", "g", "w", " ", "'", "\,", "_", "-", "1", "2", "3", "4", "5", "6", "7", "8"]
sound = ['A:', 'E', 'i', 'o@', 'u', 'A:', 'E:', 'i:', 'O:', 'u:', 'h', 'k', 'm', 'n', 'p', 'r', 't', 'f', 'N', 'w', ' ', '\'', '\,', '_', '-', 'we', 'aI', 'aI', 'Ei', 'Ea#', 'OI', 'oU', 'O:A:']
long = (s) => {
  return s.match(/[āēīōū]/)
}
dipthong = (s) => {
  return s.match(/[123456789]/)
}

level = (s) => {
  if (long(s)) {
    return 3
  }
  if (dipthong(s)) {
    return 2
  }
  return 1
}

say = (text) => {
  text = text.replace(/wh/g, 'f').replace(/ng/g, 'g').replace(/oe/g, "1").replace(/ae/g, "2").replace(/ai/g, "3").replace(/ei/g, "4").replace(/ea/g, "5").replace(/oi/g, "6").replace(/au/g, "7").replace(/oa/g, "8")
  words = text.split(" ")
  textStressed = ""
  //console.log(words)
  sentence = ""

  words.forEach(w => {
    winnerIndex = 0
    winnerLevel = 0
    syllables = (w.match(/([fghkmnprtw]*[aeiouāēīōū123456789]+?)/g))
    morae = []
    accMorae = []
    acc = 0
    syllables.forEach((s, i) => {
      //console.log(s)
      morae[i] = (s.search(/[aeiou]/) > -1) ? 1 : 0 + (s.search(/[āēīōū]|[1-9]/) > -1) ? 2 : 0
      acc += morae[i]
      accMorae[i] = acc
    })
    //console.log(accMorae.reverse())
    syllables.forEach((s, i) => {
      if (accMorae[i] <= 4) {
        //console.log(s+" "+level(s))
        if (level(s) > winnerLevel) {
          winnerLevel = level(s)
          winnerIndex = i
        }
      }
    })
    syllables.forEach((s, i) => {
      if (i == winnerIndex) {
        textStressed = textStressed + "'" + s
      } else {
        textStressed = textStressed + s
      }
    })
    //console.log(w + " " + syllables[winnerIndex])
    textStressed += " "

  })

  console.log(textStressed)


  pairingButton.innerHTML = sentence

  phonemes = ""
  textStressed.split("").forEach((c) => phonemes += sound[written.indexOf(c)])
  //phonemes += " po"

  //alert(phonemes)
  return phonemes
}


mespeakmaori = (t) => {
  meSpeak.speak("[[" + say(t) + "]]", {
    speed: 150,
    wordgap: 6,
    //nostop: false,
    variant: "m8" //"f5" //best f5
  });
}
