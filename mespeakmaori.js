meSpeak.loadVoice('en/en-us');

written = ["a", "e", "i", "o", "u", "ā", "ē", "ī", "ō", "ū", "h", "k", "m", "n", "p", "r", "t", "f", "g", "w", " ", "'", "\,", "_", "-", "1", "2", "3", "4", "5", "6", "7", "8"]
sound = ['A:', 'E', 'i', 'o@', 'u', 'A:', 'E:', 'i:', 'O:', 'u:', 'h', 'k', 'm', 'n', 'p', 'r', 't', 'f', 'N', 'w', ' ', '\'', '\,', '_', '-', 'we', 'aI', 'aI', 'Ei', 'Ea#', 'OI', 'oU', 'O:A:']
long = (syl) => {
  return syl.match(/[āēīōū]/)
}
dipthong = (syl) => {
  return syl.match(/[123456789]/)
}

level = (syl) => {
  if (long(syl)) {
    return 3
  }
  if (dipthong(syl)) {
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
    syllables.forEach((syl, i) => {
      //console.log(syl)
      morae[i] = (s.search(/[aeiou]/) > -1) ? 1 : 0 + (syl.search(/[āēīōū]|[1-9]/) > -1) ? 2 : 0
      acc += morae[i]
      accMorae[i] = acc
    })

    syllables.forEach((syl, i) => {
      if (accMorae[i] <= 4) {
        if (level(syl) > winnerLevel) {
          winnerLevel = level(syl)
          winnerIndex = i
        }
      }
    })
    syllables.forEach((syl, i) => {
      if (i == winnerIndex) {
        textStressed = textStressed + "'" + syl
      } else {
        textStressed = textStressed + syl
      }
    })
    textStressed += " "

  })

  console.log(textStressed)


  pairingButton.innerHTML = sentence

  phonemes = ""
  textStressed.split("").forEach((c) => phonemes += sound[written.indexOf(c)])
  return phonemes
}


function mespeakmaori(t)  {
  meSpeak.speak("[[" + say(t) + "]]", {
    speed: 150,
    wordgap: 8,
    //nostop: false,
    variant: "m8" //"f5" //best f5
  });
}
