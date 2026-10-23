# Codex → Pelikoodari / PT: #905–907, uusi 807-jatko toimitettavaksi

Uuden lähteen yksi sallittu generointi on tehty ja lopputulos läpäisi tekijän QA:n täysikoossa sekä 390 px:n puhelinesikatselussa.

- **#905:** `latauskuva-807-top300-blended-v2.png`, 1448 × 1386 RGB. Uusi yläosa 300 px, kohdistetut katonlinjat ja pilvet sekä lähteen sallima pehmeä taustasiirtymä riveillä y300–379. Alkuperäinen #807 alkaa edelleen y300:sta. Koko kuva y380 alaspäin on täsmälleen alkuperäistä #807:ää samoissa koordinaateissa. Kaistan muutokset ovat vain #903:n alfa=0-alueilla.
- **#906:** `puyi-head-hat-braid-807-y300.png`, 1448 × 1386 RGBA, täsmälleen aiempi #903, tavut ja SHA256 muuttumattomat. Pää, hattu nuppeineen ja letti säilyvät alkuperäisinä myös taustakuvassa. Maskin ensimmäinen näkyvä pikseli y327:ssä, 27 px uuden yläosan alapuolella.
- **#907:** `latauskuva-807-title824-head-proof-v2.png`, 1448 × 1386. Aiempi kultaotsikko #824 kerroksena taivaalla ja #903 päällimmäisenä; hattu peittää tarkoituksella osan sanasta keisari. `PROOF-LAYOUT.json` sisältää tarkat asettelukoordinaatit. Puhelinhavainne mukana.

**Kutsut:** tässä uudessa toimeksiannossa #905 yksi sisäisen image_gen-työkalun kutsu, #906 ja #907 nolla kutsua. Aiemman #902:n yksi hylätty kutsu säilyy historiassa erillisenä; yhteensä kaksi kutsua kahdella lähdekohtaisella valtuutuksella. Ei ylimääräisiä uusintoja.

Generointityökalu tuotti 1282 × 1227 -natiivin, joka säilytetään paikallisesti muuttamattomana. Toimituskuvan yläosa kohdistettiin geometrisesti lähdekuvan katonlinjoihin. Natiivia ei pidä tulkita suoraan pelitiedostoksi: toimitus-PNG sisältää generoituun taustaan rajatun kohdistuksen ja sallitun pehmeän liitoksen sekä alkuperäiset lukitut pikselit. Menetelmä on kirjattu `COMPOSITING-METHOD.json`-tiedostoon. `PROMPT.json` sisältää täsmällisen promptin ja muokkausreferenssin polun.

Pikselivertailut: **0 muuttunutta RGB-arvoa y380 alaspäin, 0 muuttunutta #903:n suojaamaa pikseliä, 0 muutosta sallitun alueen ulkopuolella.** Maski on tavuntarkasti #903. `QA-905907.json` sisältää tulokset; `MANIFEST.json` sisältää kaikkien toimitusten SHA256:t ja polut.

Tämä on tiedostotoimitus Pelikoodarille ja PT:lle. Pelikoodari vie ämpäriin ja kytkee, PT näyttää omistajalle. Vastaanottajan hyväksyntää, omistajan kuittausta, R2-siirtoa, runtime-integraatiota tai julkaisua ei ole tässä varmennettu. Ei julkaisua ennen omistajan kuittausta. Aiemman #902–904:n raportti b4c4e6d68234ee454491d44c9c7f9b3ea1d41784 säilyy historiassa; sitä ei muuteta hyväksytyksi.
