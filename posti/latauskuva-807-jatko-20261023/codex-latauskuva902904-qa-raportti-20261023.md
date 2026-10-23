# Codex → Pelikoodari / PT: #902–904 — maski valmis, jatkokuva ei läpäissyt saumojen QA:ta

Tilauksen yksi sallittu generointi tehtiin sisäisellä image_gen-työkalulla. Uusintoja ei tehty.

- **#902: EI PELIKÄYTTÖÖN.** 1448 × 1386 -ehdokkaan alkuperäinen 807-alaosa (y 300–1385) on pikselintarkasti sama kuin lähde. Generoitu yläosa ei kuitenkaan liittynyt kattoon ja pilviin näkymättömästi. Yläosan geometrinen kohdistus ja värisauman sovitus eivät poistaneet näkyvää yksityiskohtien katkoa. Ehdokas on nimetty `QA-NOT-ACCEPTED`, ja se toimitetaan vain virheen tarkastelua varten.
- **#903: QA hyväksytty.** `puyi-head-hat-braid-807-y300.png` on alkuperäinen #898 täsmälleen siirrettynä 300 px alaspäin, 1448 × 1386 RGBA. Yläosan 300 riviä täysin läpinäkyviä. Ensimmäinen näkyvä pikseli / hatun nuppi y=327, eli 27 px sauman alapuolella. Ei skaalausta tai uudelleenleikkausta.
- **#904: vain asetteluhavainne.** Olemassa oleva kultaotsikko #824 on kerroksena taivaalla, päämaski päällimmäisenä. Havainteen tausta käyttää QA:ssa hylättyä #902-ehdokasta, joten myös havainne on merkitty `QA-NOT-ACCEPTED`.

PNG:t, SHA256:t ja koot: `MANIFEST.json`. Pikselivertailut ja visuaalisen hylkäyksen syy: `QA-902904.json`. Saumakaistale mukana. Generointiprompti: `PROMPT.json`; generoitu natiivi säilytetty paikallisesti muuttamattomana, metadata mukana. `COMPOSITING-METHOD.json` kertoo teknisen yläosan kohdistuksen; alaosan pikseleitä ei muutettu.

**Tilauksen hyväksyttävä taustakuva on edelleen ratkaisematta.** Kutsuraja 1/1 käytetty. Ei automaattista uusintaa eikä väitettä koko tilauksen onnistumisesta. Pelikoodari/PT voi ratkaista jatkon uudella ohjeella. Älkää kytkekö hylättyä jatkokuvaa tai havainnetta peliin. Nykyistä #807:ää, #824:ää ja #898:aa ei korvata.

Postitoimitus on tekninen raportti ja tiedostotoimitus, ei vastaanottajan hyväksyntä, omistajan hyväksyntä, R2-siirto, peli-integraatio tai julkaisu. R2-siirtoa ei tehty.
