# Viesti Fablelle: kohdekaupungin napautus valitsee siirron (PAATOKSET 42)

*Opus-erä 18.9.2026, haara `claude/bold-ride-vow4ki-kohdevalinta`.
Raamattu, KARTTAUUDISTUKSEN PAATOKSET 42. Omistaja sanatarkasti
(puhelintesti v1945, löydös 6, iPad-kuva Lontoosta nopanheiton
jälkeen): "Liftauksessa jos painaa kohdekaupunkia, aukeaa viuhka vaikka
pitaisi valita kohde liikkeelle".*

## 1. Juurisyy: kaksi napautuspolkua, joista vain toinen tunsi kohteen

Kohdemerkki (punainen katkorengas) teki jo oikein. Pallon pinnan
napautus kulkee `napautaPintaan`in läpi (js/pallolauta/lauta.js), ja se
kysyy ENSIN `lahinKohde(lat, lng)` → `napautaKohde` → `ui.doMove`.
Kohdemerkkiä napauttamalla siirto siis lähti myös ennen tätä erää.

Kaupungin OMA piste ei kulje sitä reittiä. Piste on kirjaston
pistekerroksen olio (`pointsData`), ja sillä on oma click, joka menee
`reititaPallopisteenNapautus`in kautta suoraan `napautaKaupunki`in —
siirtovaiheen kohdetesti jää kokonaan väliin. Koska kohdemerkin ja
kaupunkimerkin ruutupiste on TÄSMÄLLEEN SAMA, sormi osui käytännössä
aina siihen polkuun, joka avasi liuskan. Juuri se on omistajan kuva:
Pariisi punaisella katkorenkaalla ja sen vieressä auki "Pariisi /
Nähtävyydet / Turistiopas / Liiku tänne / Muut (19)".

Tätä ei näe lähdekoodista — kumpi polku voittaa, ratkeaa vasta oikealla
pallolla oikeassa ruutupisteessä. Siksi vartio on savuke aidoilla
napautuksilla, ei yksikkötesti.

## 2. Korjaus (js/pallolauta/lauta.js)

1. **`valitseSiirto(avain)` — YKSI FUNKTIO KOLMELLE POLULLE.** Päätös
   sanoo *"sama teko kuin Liiku tänne"*, joten teko kirjoitettiin
   kerran: liuskan muisti nollataan ja `ui.doMove(avain)` ajetaan.
   Kutsujat ovat nyt liuskan "Liiku tänne" -rivi, kohdemerkki
   (`napautaKohde`) ja uusi kohdekaupunkihaara. Kopioita ei ole.
2. **Kohdekaupungin haara `napautaKaupunki`ssa.** Kun `siirto`
   (moveOptionsin rivi tälle kaupungille) on olemassa, `ui.katselu` ei
   ole päällä eikä kaupunki ole pelaajan oma, funktio palaa heti
   `valitseSiirto(siirto.key)`llä — ENNEN `void (async …)` -lohkoa,
   jossa liuskan kamera-ajo ja avaus ovat. Sääntö on sama kuin
   `kohdevalinta`lla (drawTargets): siirtovaihe, ei botti, ei katselu.
3. **Kamera-ajo jää ajamatta** (PAATOKSET 34 kohta 10 koskee vain
   liuskan avausta). Mitattu: kohdevalinnasta lähtee siirron oma
   ennakkozoomi (760 ms) ja saatto (3 160 ms), ei liuskan 420 ms:n
   ajoa. Kaksi ajoa peräkkäin nykisi.
4. **Ennallaan:** ei-kohdekaupungit avaavat liuskan, pelaajan oma
   kaupunki avaa liuskan myös siirtovaiheessa, siirtovaiheen
   ulkopuolella kaikki entisellään, ja "Liiku tänne" -rivi jää
   liuskaan niille tapauksille, joissa liuska avataan muuta kautta.

## 3. Tasokartta (ei-pallo): ei samaa sääntöä, ei muutostarvetta

Kaupunkiliuskaa ei ole tasokartalla lainkaan — `avaaLiuskaKaupungista`
ja `LIIKU_NIMIO` esiintyvät vain js/pallolauta/{lauta,nostot,
kaupunkiliuska}.js:ssä (ja Raamatussa). Tasokartalla nopanheiton
kohteet ovat `ui.drawTargets`in piirtämiä renkaita, joiden click menee
suoraan `doMove`en, eikä kaupunkimerkki avaa liuskaa. Tasokartan polku
on siis jo päätöksen mukainen; sitä ei koskettu.

## 4. Mittaus: `tools/savukkeet/savuke-kohdevalinta.mjs` (uusi)

Aidot napautukset merkin ruutupisteeseen (`pallo.getScreenCoords`), ei
suoria funktiokutsuja. Lontoo, maareitti, silmäluku 4 → Pariisi on
kohde (`c:pariisi`), Edinburgh toinen kohde.

```
NODE_USE_ENV_PROXY=1 PORTTI=8831 node tools/savukkeet/savuke-kohdevalinta.mjs
→ 14/14 vartiota läpi (390 × 844 ja 1400 × 900, dpr 2)
```

| vartio | 390 | 1400 |
| --- | --- | --- |
| 1 ilman noppaa kohdekaupunki avaa liuskan | OK | OK |
| 2 ei-kohdekaupunki avaa liuskan siirtovaiheessa | OK (Amsterdam) | OK (Alpit) |
| 3 pelaajan oma kaupunki avaa yhä liuskan | OK | OK |
| 4 kohdekaupungin napautus aloittaa siirron | OK, 33 ms | OK, 53 ms |
| 5 liuskaa ei avattu (`liuskaAuki` null, DOM-rivejä 0) | OK | OK |
| 6 kohdevalinta ei aja liuskan kameraa | OK | OK |
| 7 ei sivuvirheitä | OK | OK |

Kamera-ajot napautuksen jälkeen 390 px: `[{t:24, kesto:760},
{t:1960, kesto:3160}]` — ennakkozoomi ja saatto, ei 420 ms:n
liuska-ajoa.

Kaappaus (kohde napautettu, nappula liikkeellä, ei liuskaa):
`tools/savukkeet/kaappaukset/kohdevalinta/kohdevalinta-390.png`.

### Mittausta varten tehdyt kaksi kiertoa (eivät ole osa väitettä)

Nämä on kirjattu savukkeen kommentteihin, koska ne maksoivat kolme
ajoa:

- **Kamera on ajettava käsin.** `pallolauta.saavu()` rajaa PELAAJAN
  MAAHAN (mitattu: Britannia, näkyvä leveys 200 lautayksikköä), jolloin
  Pariisi jäi ruudun ulkopuolelle (405, 782 px kotelossa 374 × 771).
  Savuke rajaa siksi Lontoon ja Pariisin väliin.
- **Ruudun laidoilla on kalusteita, jotka OTTAVAT NAPAUTUKSEN.**
  390 px:llä Amsterdamin päällä oli kuplapinon tekstikappale
  (`P.fact-text`) ja 1400 px:llä Pariisi jäi rajauksessa kalusteen alle
  — kummassakin `viimeinenNapautus` jäi nulliksi eikä yhtään kamera-ajoa
  lähtenyt. Mittaus vie siksi napautettavan merkin ruudun keskelle
  (`keskita`) ennen jokaista napautusta.

## 5. Yksikkötesti

`tests/pallolauta.test.mjs` väitti `ui.doMove(kohde.key)` suoraan
`napautaKohde`ssa. Väite päivitettiin päätöksen mukaiseksi: kutsujia on
yksi (`valitseSiirto`), `ui.doMove(` esiintyy lähteessä täsmälleen
kahdesti (valitseSiirto + liuskan varapolku), ja kohdekaupunkihaaran
ehto luetaan sellaisenaan.

Kaava: `node --test tests/*.test.mjs` → **# pass 3628, # fail 0**
(3641 testiä, 13 skipattua). `node tools/build-standalone.mjs` →
dist/matkakirja.html 32 754 kt. Versiota ei nostettu (Fable julkaisee).

## 6. Avoimet / viereiset havainnot (EN korjannut)

1. **Liuskan kamera-ajo siirtää merkkiä, ja seuraava napautus vanhaan
   pisteeseen menee ohi.** Tämä on tiedossa savukkeissa (kaksi yritystä
   + pisteen tuore luenta), mutta pelaajalle se tarkoittaa, että liuskan
   avauksen jälkeen kaupunki EI ole enää siinä, mihin sormi meni. Ei
   tämän erän asia.
2. **Kuplapinon tekstikappale (`P.fact-text`) peittää kartan merkkejä
   ja ottaa napautuksen** 390 px:llä. Mitattu: Amsterdamin merkki jäi
   kokonaan sen alle, eikä napautus päässyt pallon pinnalle asti.
   Kuvassa `kohdevalinta-390.png` sama kortti peittää ruudun ylimmän
   kolmanneksen. Jos omistaja törmää tähän, kyse ei ole kartasta vaan
   kortin osumapinnasta.
3. **Pallolla on Lontoon rajauksessa piste vain viidellä kaupungilla**
   (lontoo, pariisi, marseille, amsterdam, alpit). Se on `pisteNakyy`-
   säännön seuraus (piste vain nimetylle), ei vika — mutta se tarkoittaa,
   että siirtovaiheessa napautettavia ei-kohdekaupunkeja on ruudulla
   vähän.
4. **Katselutila.** Uusi haara noudattaa drawTargets-sääntöä (`ui.katselu`
   ei valitse siirtoa), mutta liuskan oma `siirto`-lippu (eli "Liiku
   tänne" -rivin olemassaolo) EI kysy katselutilaa — se jätettiin
   ennalleen, koska päätös ei puhu siitä. Katselutilassa liuskassa voi
   siis olla rivi, joka ei tee mitään.
