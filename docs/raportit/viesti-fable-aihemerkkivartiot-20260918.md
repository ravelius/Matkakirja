# Viesti Fablelle: aihemerkkivartiot uuden päätöksen mukaisiksi (18.9.2026)

Haara: `claude/bold-ride-vow4ki-aihemerkkivartiot`
(pohja `claude/bold-ride-vow4ki-julkaisu-v1942`, PR #2584).
Peruste: Raamattu, KARTTAUUDISTUKSEN PAATOKSET 34 kohta 3 ja kohta 17 b
(nostojen ryhmitys aihemerkeiksi pois kartalta; `?aihemerkit=1` on
vastakoe) sekä AGENTIT TARKENNUS 10 kohta 21 (savuke päivitetään samassa
erässä). Vain savukkeita muutettiin — pelin koodiin, Raamattuun ja
sarjat.jsoniin ei koskettu.

## Mitä yhdeksälle punaiselle vartiolle tehtiin

| Vartio | Ennen | Nyt | Miksi |
| --- | --- | --- | --- |
| `pariisi-lahizoom` 3b | vaadi: rykelmä ryhmittyy yhä lähizoomissa (≥ 2 aihemerkkiä) | **KÄÄNNETTY** vaadi: `3b. …: aihemerkkejä 0 kartalla — sisäiset liuskassa` | Ryhmitys on pois; ryhmityksen paluu kartalle on juuri se virhe, jonka päätös kielsi, joten väite on arvokas vastakkaiseen suuntaan. Vakio `AIHEMERKKEJA_VAHINTAAN` poistettiin (odotus on tasan 0). |
| `pariisi-lahizoom` 3i2 | vastakoe `?aihenimiokynnys=0` oletusnäkymässä | **PÄIVITETTY** kolmivaiheiseksi: `?aihemerkit=1` (kynnys voimassa → DOM 0) → `?aihemerkit=1&aihenimiokynnys=0` (nimiöt palaavat) → liput pois (aihemerkkejä 0) | Kynnystä ei voi mitata siellä, missä aihemerkkejä ei ole. Vastakoe kääntää ryhmityksen ensin takaisin, joten 3i mittaa yhä kynnystä eikä sitä, ettei merkkejä ole. Halpa: kaikki kolme ovat replaceState + ladonta, ei sivunlatausta. |
| `pariisi-lahizoom` 4c | vaadi: viuhkalista ei limity eikä valu ruudun yli | **VANHENTUNUT**, tieto-rivi | Viuhka oli aihemerkin ladonta. Vastakoetta `?aihemerkit=1`:llä ei otettu: se vaatisi koko lähizoomin uudelleenmittauksen ja napautuksen käyttöliittymään, jota pelaaja ei enää näe. Korvaajat ovat liuskan vartiot 8d–8i (sama väite: lista ruudun sisällä, ei limitystä). Sama linja kuin jo tehdyllä 4b:llä. |
| `nimikyltti` 9a | vaadi: saapumisnäkymässä syntyy aihemerkkejä | **KÄÄNNETTY** vaadi: `9a. …: aihemerkkejä 0 kartalla — sisäiset liuskassa` | Kuten 3b. Ryhmitysalgoritmi itse mitataan yhä 9f:llä (puhdas kutsu ilman selainta) ja lipun vastakoe on 3i2. |
| `nimikyltti` 9c | vaadi: viuhka avautuu ja jokainen kohta mahtuu ruudulle | **VANHENTUNUT**, yhteinen tieto-rivi `9c/9d` | Kuten 4c; korvaajat 8c–8i. |
| `nimikyltti` 9d | vaadi: viuhka sulkeutuu | **VANHENTUNUT**, sama tieto-rivi | Kuten 9c. |

Muut vartiot eivät muuttuneet. 3i (saapumisnäkymässä nimiöitä 0),
3e/3e3/3i(lähizoom)/4/4b/7d–7i olivat jo aiemmissa erissä käännetty
INFOksi, niihin ei koskettu.

## Mittaus (Mac Studio, 18.9.2026)

| Ajo | Tulos |
| --- | --- |
| `SAVUKE_RUUTU=1400 savuke-pariisi-lahizoom.mjs` | **44/44 vartiota läpi** |
| `SAVUKE_RUUTU=390 savuke-pariisi-lahizoom.mjs` | **45/45 vartiota läpi** |
| `savuke-nimikyltti.mjs` (molemmat ruudut) | **58/60 läpi**; kaksi punaista ovat `4. puhelin` ja `4. tyopoyta`, jotka ovat sarjat.jsonin tunnettu punainen `^4\. ` |
| `node tools/tarkista-savukkeet.mjs` | kunnossa: 2042 ui-viittausta, 409 metodia, 540 kenttää, 31 lehtitilan kenttää |
| `node --test tests/*.test.mjs` | 3636 testiä, 0 punaista (13 skipattu) |

0 uutta punaista. Vastakokeen luvut (390 px) todistavat, että 3i2 mittaa
yhä oikeaa asiaa:

```
puhelin · vastakoe ?aihemerkit=1 (saapuen): kynnys voimassa: aihemerkkejä 2,
nimiöllisiä 0, DOM 0; kynnys pois: nimiöllisiä 2/2, DOM 2;
oletus takaisin: aihemerkkejä 0, DOM 0
```

Eli lippu `?aihemerkit=1` palauttaa ryhmityksen (2 aihemerkkiä),
nimiökynnys pitää nimiöt piilossa ja ilman kynnystä ne palaavat —
oletustilassa aihemerkkejä on 0.

## Ehdotus sarjat.jsoniin (EI muutettu, Fable päättää)

`savuke-nimikyltti.mjs`:n `tunnetutPunaiset` on nyt
`["^4\\. ", "^7a\\. ", "^7b\\. ", "^9b\\. "]`. Tämän erän ajossa:

- `^4\. ` — **yhä punainen** (kyltti / maapaneelin teksti, hajonta 50,30 %). Jää.
- `^7a\. ` — **kaikki 9 riviä vihreitä** (pariisi, marseille, alpit, rooma,
  venetsia, praha, firenze). Ehdotus: poista.
- `^7b\. ` — **kaikki 9 riviä vihreitä**. Ehdotus: poista.
- `^9b\. ` — **molemmat ruudut vihreitä** (limityspareja 3 ja 1, katto 4).
  Huomautuksen perustelu (*"FAIL-rivien MÄÄRÄ on kasvanut aihenostojen
  nimiöiden myötä"*) on vanhentunut: aihenostojen nimiöitä ei enää ole
  kartalla. Ehdotus: poista.

Jos 7a/7b/9b poistetaan, huomautusteksti (*"Sama nelikko v1925:sta
v1927:ään"*) kannattaa päivittää samalla: jäljelle jää vain vartio 4.

`savuke-pariisi-lahizoom.mjs#1400`:n tunnettu punainen
`"7e. tyopoyta: kyltin laatikko on vapaa"` ei enää esiinny lainkaan —
7e on ollut INFO siitä asti, kun kyltti poistui kartalta
(`KYLTTI_KARTALLA = false`, PAATOKSET 34 kohta 8). Ehdotus: poista sekin,
ja poista huomautuksesta sen kalibrointivelka. `#390`-rivillä ei ole
tunnettuja punaisia eikä tarvitse.
