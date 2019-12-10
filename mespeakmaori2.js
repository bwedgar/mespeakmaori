meSpeak.loadVoice('en/en-us');
sound= function(text, code, sound1){
  return {
    text,
    code,
    sound1
  }
}

mespeakmaori = {

  sounds: [this.sound('a', 'a', 'A:'),
    this.sound('e', 'e', 'E'),
    this.sound('i', 'i', 'i'),
    this.sound('o', 'o', 'o@'),
    this.sound('u', 'u', 'u'),
    this.sound('ā', 'ā', 'A:'),
    this.sound('ē', 'ē', 'E:'),
    this.sound('ī', 'ī', 'i:'),
    this.sound('ō', 'ō', 'O:'),
    this.sound('ū', 'ū', 'u:'),
    this.sound('h', 'h', 'h'),
    this.sound('k', 'k', 'k'),
    this.sound('m', 'm', 'm'),
    this.sound('n', 'n', 'n'),
    this.sound('p', 'p', 'p'),
    this.sound('r', 'r', 'r'),
    this.sound('t', 't', 't'),
    this.sound('ng', 'g', 'N'),
    this.sound('wf', 'f', 'w'),
    this.sound(' ', ' ', ' '),
    this.sound('\,', '\,', '\,'),
    this.sound('\_ ', '\_', '\_'),
    this.sound('-', '-', '-'),
    this.sound('oe', '1', 'we'),
    this.sound('ae', '2', 'aI'),
    this.sound('ai', '3', 'aI'),
    this.sound('ei', '4', 'eI'),
    this.sound('ea', '5', 'Ea#'),
    this.sound('oi', '6', 'OI'),
    this.sound('ei', '4', 'oU'),
    this.sound('ei', '4', 'O:A:'),
    this.sound('ei', '4', 'iu')
  ],

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
    //text = text.replace(/wh/g, 'f').replace(/ng/g, 'g').replace(/oe/g, "1").replace(/ae/g, "2").replace(/ai/g, "3").replace(/ei/g, "4").replace(/ea/g, "5").replace(/oi/g, "6").replace(/au/g, "7").replace(/oa/g, "8").replace(/iu/g, "9"),
console.log(this.sounds[3].sound1)
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
      speed: 150,
      wordgap: 8,
      //nostop: false,
      variant: "m8" //"f5" //best f5
    });
  }
}
