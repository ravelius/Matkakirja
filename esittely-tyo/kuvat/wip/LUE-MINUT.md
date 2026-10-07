# WIP — Pariisin yksityiskohtakuvat, KESKEN

**Tämän kansion sisältö on keskeneräistä eikä sitä saa käyttää sellaisenaan.**

Erä pysäytettiin 7.10.2026 päätoimittajan ohjeesta (omistajan 5 tunnin raja) kesken
kuvahaun. Yhtään kuvavalintaa ei ehditty tarkistaa, joten varsinaisia tuloksia
(`pariisi-yksityiskohdat.json`, `pariisi-yksityiskohdat.md`,
`codex-tilaus-pariisi.md`) ei ole vielä olemassa.

## Tiedostot

### `OHJE-kuvatyo.md`
Työohje kuvatutkijoille: mitä yksityiskohtakuvat ovat, ankkurisäännöt, lisenssirajat,
tulosmuoto ja Wikimedian robottipolitiikan noudattaminen. Tämä on valmis ja
käyttökelpoinen sellaisenaan.

### `yhdista.py`
Yhdistää osatiedostot ja **validoi koneellisesti**:
- ankkuri esiintyy kohteen tekstissä täsmälleen kerran
- ankkuri ei osu tekstin kolmeen ensimmäiseen sanaan
- saman tekstin ankkureiden väli vähintään 15 sanaa (4–6 s kuvat eivät mene päällekkäin)
- lisenssi on sallittujen listalla (PD / CC0 / CC BY / CC BY-SA), NC ja ND hylätään
- kuvateksti enintään 8 sanaa, ei loppupistettä
- sama Commons-tiedosto ei esiinny kahdesti

Ajo: `python3 esittely-tyo/kuvat/wip/yhdista.py` (lukee `osa1..osa4.json` omasta
kansiostaan). Tämä on valmis ja testattu rakenteellisesti, mutta sitä ei ole vielä
ajettu oikealla aineistolla.

### `commons-ehdokkaat.json`
**TARKISTAMATON** lista 51 Commons-tiedostosta, jotka ali-agentit ehtivät löytää ennen
pysäytystä. Mukana lisenssi, tekijä, mitat ja kuvaus Commonsin API:sta.

**Näitä EI ole katsottu.** Kenttä `tarkistettu` puuttuu tarkoituksella — yhtäkään
pikkukuvaa ei ole arvioitu silmämääräisesti eikä yhtäkään ole liitetty ankkuriin.
Lista on pelkkä johtolanka, joka säästää API-haun uusimisen. Jokainen kuva on
katsottava ennen kuin se kelpuutetaan.

Huomaa, että listalla on myös lisenssejä, jotka **eivät kelpaa** (GFDL, FAL) — ne ovat
mukana vain siksi, että haku palautti ne. `yhdista.py` hylkää ne.
