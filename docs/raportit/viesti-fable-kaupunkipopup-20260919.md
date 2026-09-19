# Opus → Fable: savuke-kaupunkipopup, Pariisi @ 1400 punainen — syy mitattu (19.9.2026)

Erä `opus-local-kaupunkipopup`, Matkakirja Opus local (Mac Studio), 16.48–17.30 Suomen aikaa.
Pohja origin/main (88f43233, v1956).

## Juurisyy (savukkeen, ei pelin eikä v1957:n)

CI 35445339970 (kolme yritystä): `Pariisi @ 1400 px: kaupunkimerkin
napautus avaa liuskan …, liuska -, rivejä 0`. Kolmannessa yrityksessä
sama oli punainen myös Marseillelle @ 1400, ja rivillä 390 Marseille oli
punainen.

Lisäsin savukkeeseen napautuskohtaisen mittarin (piste, tuore piste,
elementFromPoint, ui.busy, traileri DOMissa, vaihe, liuskan aukeamisaika).
Ajo samalla koneella, ensin yksin ja sitten kaksi rinnakkain:

1. **Ensimmäinen napautus osui SAAPUMISTRAILERIIN**:
   `alla div.saapumistraileri-kuvat, traileri true`. Trailerin oma
   `ohita`-kuuntelija vain ohittaa trailerin, mikä on pelin oikea toiminta.
2. **Toinen napautus samaan pikseliin kankaalle ei avannut mitään**:
   `alla canvas., busy false, traileri false`, liuskaa ei 3,2 s:ssa.
   `lauta.viimeinenNapautus()` oli **51,379 N / −14,414 E**
   (Atlantti Irlannin länsipuolella) SEKÄ Pariisin (706,292) ETTÄ
   Marseillen (871,701) napautuksella. globe.gl etsi osumansa
   vanhentuneesta osoitinpaikasta. Kankaalle ei tullut uutta
   pointermovea, koska Playwrightin hiiri napautti samaan pikseliin
   kuin edellinen (trailerin ottama) napautus.
3. **Peli on kunnossa**: samassa tilassa suora `l.napautaKaupunki(id)`
   palautti `true` ja avasi liuskan (`lauta:pariisi`, `lauta:marseille`).
4. **Ei v1957:n vika**: sama punainen toistui #2606:n koodilla
   (ff7889fe, jonka oma CI oli vihreä) erillisessä worktreessä. Punainen
   riippuu siitä, onko traileri vielä ruudulla ensimmäisen napautuksen
   hetkellä. Tänään se oli Macilla lähes aina.
5. **Hylätty hypoteesi**: epäilin ensin, että savuke napauttaa vanhaa
   pistettä, vaikka kommentti lupasi tuoreen. Mittaus kumosi tämän:
   tuore piste = alkuperäinen piste, eli kamera ei liikuttanut merkkiä.

Oikeilla käyttäjillä vikaa ei ole: kosketus antaa aina sijaintinsa, ja
oikea hiiri liikkuu napautusten välillä.

## Korjaus (`tools/savukkeet/savuke-kaupunkipopup.mjs`)

- Ennen kaupunkimerkin napautusta odotetaan, että saapumistraileri
  poistuu itse (enintään 20 s, odotettu aika kirjataan INFO-riville).
  Savuke mittaa kaupunkimerkkiä, ei traileria.
- Osoitin liikutetaan kankaan yllä (+24 px → piste, 3 askelta) ennen
  jokaista napautusta, ja piste luetaan tuoreena joka yrityksellä.
- Napautuskohtainen INFO-rivi jää lokiin (piste, alla oleva elementti,
  tila, liuskan aukeamisaika).
- Vastakoe `SAVUKE_VANHA_PISTE=1`: alkuperäinen piste ilman liikettä.
  Trailerin odotus on silti mukana; vastakoe mitattiin ennen sen
  lisäämistä.

## Mittaukset (Mac Studio, Chromium)

| Ajo | 1400 | 390 |
| --- | --- | --- |
| ennen (vanha piste, ei liikettä), kaksi rinnakkain | 36/38 ja 34/38 (Pariisi ja Marseille punaisia) | – |
| ennen, #2606:n koodi (ff7889fe), yksin | 34/38 | – |
| vain osoittimen liike, yksin | 38/38 | – |
| vain osoittimen liike, 1400 + 390 rinnakkain | 36/38 (Marseille 2. yritys punainen kuormassa) | 44/45 |
| **trailerin odotus + liike, 1400 + 390 rinnakkain** | **38/38** (odotus 1 ms / 207 ms) | **44/45** (odotus 102 ms / 204 ms) |

Rivin 390 ainoa punainen on `vastakoe 1: kuvaton kaupunki avaa pop-upin
silti`. Se oli punainen jo CI:ssä (35445339970, yritykset 2 ja 3) ennen
tätä muutosta, eli se on eri asia (todennäköisesti vanhentunut ison
pop-upin vastakoe, PAATOKSET 34 kohta 1). Sitä ei käsitelty.

`node --test tests/*.test.mjs`: pass 3650, fail 0.
`node tools/tarkista-savukkeet.mjs`: kunnossa.

## Jäi tekemättä

- `vastakoe 1: kuvaton kaupunki` (390): tutkimatta.
- Saman savukkeen muut napautuspolut (`avaaLiuska`, rivien napautus)
  napauttavat yhä ilman osoittimen liikettä. Ne olivat vihreitä, koska
  ne lukevat uuden pisteen ja yrittävät useammin, mutta sama riski
  koskee niitä.
- sarjat.json ennallaan.
