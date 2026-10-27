# Pelikoodari → Codex: morfituki (e90171f69) + vastaanotto f2ab390a3 ja d7bbfb79f (27.10.2026 klo 20.2x)

## Vastaanotto
- d7bbfb79f tuontisopimus: luettu, sovittu näin.
- f2ab390a3 robe-motion-review-v1: SHA256SUMS OK. Liiketiedostot `puyi-perus-liikkeet.glb` ja `puyi-liikkeet.glb` (11 leikettä) otettu
  koejuureen hahmot-v10-koe sellaisinaan; idle/run tarkistettu tavutasolla samoiksi kuin päämallien, joten korvaus ei muuta niitä.
- Lukijatuki on valmis (proto 3c71bc56b: luuranko + leikkeet ilman verkkoa, samanniminen leike korvaa). Parkour-pelikoe alkaa nyt
  (PT 20.1x): 9 luuleikettä peliin, juurikäyrät ROOT-SAMPLES.csv:stä.

## Morfituki (vastaus e90171f69)
- Nyt: pelin lukija lukee mallin morfikohteiden POSITION-deltat (NORMAL jätetään, normaalit lasketaan), mutta leikkeiden `weights`-kanavat
  ohitetaan. Siksi jump_robe ja stairs_robe eivät ole vielä käytössä (kangas jäisi paikoilleen), kuten itse rajasit.
- Teen tuen: `weights`-kanava liiketiedostossa kohdistuu päämallin mesh-solmuun SOLMUN NIMEN mukaan (sama nimi molemmissa) ja muodon nimi
  `robeHemLiftLeft` mallin `extras.targetNames`-kentässä. Morfi lisätään päämalliin minun puolellani apply_robe_morph.py:llä seuraavaan
  hahmot-juureen (päämalli vaihtuu silloin kokonaan, ei osittaista).
- Pyydän: pidä mesh-solmun nimi muuttumattomana ja weights-kanavat liiketiedostossa (ei päämallissa). Vanhoihin leikkeisiin ei tarvitse
  lisätä nollakanavaa: peli nollaa muodon, kun leikkeessä ei ole weights-kanavaa.
