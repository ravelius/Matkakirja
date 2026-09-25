# Linssipariteetti, kierros 4: rivilista (valmisteltu 25.9.2026)

*Linssiseppä (Opus), Fablen käskystä. Kierros ajetaan vasta, kun juna/b13 on käännetty Natiivisepän merge-erän
jälkeen. Kierroksen 3 tulokset: linssipariteetti-3-20260925.md.*

## Ajo

Käännös: juna/b13 junan kärjestä, pelkkä juna (ei lisähaaroja). Käännöspalvelun .app kopioidaan heti omaan kansioon.
Simulaattorit: linssiseppa-iPhone D0D2CD1E (pysty ja vaaka) ja linssiseppa-iPad11 903C2B91. Ajetaan yksi kerrallaan
Julkaisijan kanssa sovitulla vuorolla, ja kumpikin sammutetaan UDID:llä. `shutdown all` -komentoa ei käytetä.
Työkalussa pitää olla mukana #3195 (kerronnan odotus).

```
PARITEETTI_IPHONE_UDID=D0D2CD1E-… PARITEETTI_VAAKA_UDID=D0D2CD1E-… PARITEETTI_IPAD11_UDID=903C2B91-… \
  node tools/pariteetti-ajo.mjs --build b13-linssit-4 --rivit 11,12,13,30,31,37,38,39,40,41 --laitteet <laite>
```

## A. Koko linssitaulu kaikilla laitteilla (regressio)

| Rivi | iPhone | iPad | Vaaka | Odotus kierroksen 3 jälkeen |
|---|---|---|---|---|
| 11 keksinnöt | ok 6 px | ok 7 px | ok 6 px | pysyy alle 16 px |
| 12 selite | ok 13 px | uusinta | × poikkeama | iPad: kuva vasta odotuspeitteen jälkeen (työkalu korjattu), odotetaan alle 16 px tai ×-poikkeamaa |
| 13 ihmisen matka | poikkeama (löydös 74) | poikkeama (ei karttakehystä) | poikkeama | virtanapit piilossa esityksen aikana ≤ 600 pt |
| 30 topografia | × poikkeama | × poikkeama | × poikkeama | nimilappu ×:n vasemmalla puolella |
| 31 vesistöt | poikkeama (73, Liiku, ×) | **avoin: lappu levenee, 🔊 puuttuu** | poikkeama | iPad: lappu sisältönsä levyinen ja 🔊 mukana (Natiivi-UI) |
| 37 radio | poikkeama | poikkeama | poikkeama | radiouudistus; tarkista myös yövalot, jos Black Marble on tullut |
| 38 satelliitti | SAMA | SAMA | SAMA | pallo tummennettu (löydös 98); vihreät pisteet hehkuvat |
| 39 vertailu | ok 8 px | 17 px (yläpalkki) | 22 px | kotimaa kehällä ja reliefillä, pilleri keskellä, terävä |
| 40 karuselli | poikkeama (74, turva-alue) | ok 15 px | 56 px turva-alue | pysyy |
| 41 maatiedot | poikkeama (Liiku) | ok 16 px | 23 px Liiku | pysyy |

Rivin 39 tekstiero on pieni, mutta kuva tarkistetaan aina kontaktiarkista: alapaneeli, kotimaan kehä, nimet ja meren sävy.

## B. Uudet tarkistukset (ei vielä pariteettityökalussa, tehdään käsin simulaattorissa)

1. **Avaruuslinssi, löydös 96** (iPhone ja iPad):
   - ison pulun napautus pallonäkymässä ei avaa mitään (webissä `linssiEstaaChatin`), eikä Marseille-kuplaa näy
   - vihreä piste → kuvanäkymä: minipulu 84/56 pt leijuu, kortti on pulun yläpuolella 8 pt:n välein
   - kysymyspilleri ja vapaa kysymys saavat vastauksen, ja ↑-nappi osuu näppäimistön sulkeuduttua
   - otsikkopilleri on turva-alueen alla
2. **Avaruuslinssi, löydös 98:** pallon tummuus ja hehku webin rinnalla (rivi 38). Omistaja arvioi, onko 0,5 riittävän
   "reilusti". Natiiviseppä huomautti, että natiivi on reunoilta hieman utuisempi kuin web.
3. **Kotimaan korostus muissa tiloissa** (Natiivisepän huomio): kartta ilman linssiä (rivi 22) ja maatiedot (rivi 41).
   Kotimaan kehä ja reliefi pitää näkyä vain kotimaassa.
4. **Linssit ilman riviä:** natiivin `isoisa-1873` ja webin `pallo` (karttapallon toiminto) eivät ole pariteettitaulussa.
   Selvitetään webin vastine ja lisätään rivi, tai kirjataan, ettei vertailua tehdä.
5. **Radio build 13:** paneeli, mastot, hämärä, veto ja sulku. Yövalot odottavat Karttasepän Black Marblea.

## C. Valmis, kun

- iPhone, iPad ja vaaka: 0 riviä yli 16 px, jotka eivät ole hyväksyttyjä poikkeamia
- kohdan B tarkistukset 1–3 ok ja kohta 4 päätetty
- omistajan build-kokeilusta ei tule uusia linssilöydöksiä
