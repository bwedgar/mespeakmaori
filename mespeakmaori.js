meSpeak.loadVoice('en/en-us');
mespeakmaori = {
  written: ["a", "e", "i", "o", "u", "ā", "ē", "ī", "ō", "ū", "h", "k", "m", "n", "p", "r", "t", "f", "g", "w", " ", "'", "\,", "_", "-", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  sound: ['A:', 'E', 'i', 'o@', 'u', 'A:', 'E:', 'i:', 'O:', 'u:', 'h', 'k', 'm', 'n', 'p', 'r', 't', 'f', 'N', 'w', ' ', '\'', '\,', '_', '-', 'we', 'aI', 'aI', 'Ei', 'Ea#', 'OI', 'oU', 'o' ,'iu'],
  long: (syl) => {
    return syl.match(/[āēīōū]/)
  },
  dipthong: function(syl) {
    return syl.match(/[123456789]/)
  },

  level: function(syl) {
    if (this.long(syl)) {
      return 3
    }
    if (this.dipthong(syl)) {
      return 2
    }
    return 1
  },

  say: function(text) {
    text = text.replace(/wh/g, 'f').replace(/ng/g, 'g').replace(/oe/g, "1").replace(/ae/g, "2").replace(/ai/g, "3").replace(/ei/g, "4").replace(/ea/g, "5").replace(/oi/g, "6").replace(/au/g, "7").replace(/ou/g, "8").replace(/iu/g, "9"),
      words = text.split(" ")
    textStressed = ""
    sentence = ""
    words.forEach(w => {
      winnerIndex = 0
      winnerLevel = 0
      syllables = (w.match(/([fghkmnprtw]*[aeiouāēīōū123456789]+?)/g))
      morae = []
      accMorae = []
      acc = 0
      //IF THE WORD STARTS WITH WHAKA- IGNORE THIS SUFFIX IN CALCULATING STRESSES
      syllables.forEach((syl, i) => {
        //console.log(syl)
        morae[i] = (syl.search(/[aeiou]/) > -1) ? 1 : 0 + (syl.search(/[āēīōū]|[1-9]/) > -1) ? 2 : 0
        acc += morae[i]
        accMorae[i] = acc
      })

      syllables.forEach((syl, i) => {
        if (accMorae[i] <= 4) {
          if (this.level(syl) > winnerLevel) {
            winnerLevel = this.level(syl)
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
    phonemes = ""

    textStressed.split("").forEach((c) => phonemes += this.sound[this.written.indexOf(c)])
    console.log(textStressed)
    return phonemes
  },


  speak: function(t) {
    meSpeak.speak("[[" + this.say(t) + "]]", {
      speed: 130,
      wordgap: 11,
      //nostop: false,
      variant: "m8" //"f5" //best f5
    });
  }
}
