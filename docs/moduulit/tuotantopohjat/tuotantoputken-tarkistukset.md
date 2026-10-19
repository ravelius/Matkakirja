# Tuotantoputken tarkistukset ennen junaa

*(Työkaluseppä 19.10.2026. Raamattu 7.4 TYÖKALUSEPPÄ ja 4.24 KAMERALIIKKEET. Jos tämä ja Raamattu ovat ristiriidassa, Raamattu voittaa.)*

Neljä tarkistusta, yksi ajo. Juna = TestFlight-julkaisuerä. Proto-polut ovat repossa `proto-3d/Matkakirja-proto`
(haara `tyokaluseppa/tarkistukset-204`, junan 204 päällä), pelirepon polut tässä repossa.

**Tavoitteen muoto (Raamattu 4.21, omistaja 19.10.2026 klo 15.32):** uuden tarkistuksen tavoite on esimerkkiraportti ennen
koodausta: valmis `JUNATARKISTUS.md`-rivi sekä yksi tahallaan rikottu tapaus (esim. pitkä ruutu, väärä mittakaava, liike ilman
testiä), jonka tarkistuksen pitää hylätä. PT hyväksyy; omistajalle vain, jos tarkistus muuttaa pelaajan näkemää.

## Yksi komento

```
zsh tyokalut/ennen-junaa.sh --loki <todistuskansio> [--loki <toinen>]      # proto-repon juuresta
```

- Ilman `--loki`-valintaa ajetaan vain simuttomat vaiheet (1, 2 ja botin logiikka). Silloin vaiheet 3 ja 4 ovat
  EI AJETTU, ja tulos on KESKEN.
- `--udid <UDID> --app <.app> --sha <SHA>` ajaa simuajon itse todistusajo.sh:lla. Oletusskenaario on
  `siirtoseppa-ajot/skenaariot/botti-osat.txt`, ja lisää voi antaa `--skenaario`-valinnalla. Simuajo tarvitsee vuoron
  Julkaisijalta (SIMULAATTORI NYT).
- Tulos tulee kansioon `proto-3d/lokit/ennen-junaa-<aika>/JUNATARKISTUS.md`: neljän rivin taulukko ja viimeinen rivi
  `ENNEN JUNAA: OK`, `ENNEN JUNAA: HYLÄTTY (vaiheet …)` tai `ENNEN JUNAA: KESKEN (…)`.
  Paluuarvot: 0 = OK, 1 = hylätty, 3 = kesken.
- Kevyessä tilassa (`/tmp/matkakirja-kevyt`, omistaja on koneella) ajo odottaa. `--nyt` ohittaa odotuksen.

## 1. Codex-toimitusten tuontitarkistus

`node tools/codex-3d-tarkistus.mjs <toimituskansio>` (pelirepo). Toimitusmuoto on kuvattu tiedostossa `codex-3d-toimitus.md`.

- **Mallit (glb):** muoto, nimi, koko, kolmiot, piirrot, materiaalit ja tekstuurit.
- **Mittakaava:** metrit, hahmon korkeus ja pivot.
- **Luuranko ja animaatiot.**
- **Erilliset kuvat:** PNG tai JPEG. `tekstuurit/`-kansion kuvien sivujen pitää olla kahden potensseja ja enintään 2048 px.
  Jokaisen kuvan pitää olla SHA256SUMS-listassa, paitsi `esikatselu/`-kansion kuvien.
- **LAHTEET.md:** jos se puuttuu, tulee HUOM.

ennen-junaa.sh tarkistaa itse kaikki tuoreet (`--paivia`, oletus 3) `_valmiit/`-kansiot, joissa on SHA256SUMS ja joiden
nimessä tai LAHTEET.md:ssä on sana Codex tai Tripo. Muut kansiot annetaan `--codex <kansio>`-valinnalla.
Hylätystä toimituksesta lähtee yksi viesti PT:lle (VIRHE-rivit). PT välittää viestin Codexille.

## 2. Kameratesti joka käännöksessä

`python3 tyokalut/kameratesti.py` ajetaan jokaisessa käännöksessä `tyokalut/tarkista.sh`:ssa (proto-kaanna.sh, vaihe 2).
Ajo kestää noin 45 s.

1. **Testien löytäminen.** Kameratestejä ovat kaikki testiluokat (`Linssit-testit`, `Kartta-testit`), jotka käyttävät
   Kamerajohtajaa, Kameratarkastusta, PalloTarkastusta tai KameraAsentoa. Uusi testi tulee mukaan automaattisesti.
2. **Ajo.** Kumpikin testisarja käännetään kerran ja ajetaan suotimella `A|B|C`. Ajuri hyväksyy |-listan. Yksikin FAIL
   hylkää käännöksen.
3. **Kattavuus.** Jokaisella lähdetiedostolla, joka rakentaa kameraliikkeen (`new Kisko/Orbit/…/PalloAjo(` tai
   Kamerajohtaja), pitää olla testi, jossa luokan nimi esiintyy.
   - Kattamattomat verrataan lähtötasoon `tyylikirja/kameratesti.json`. Lähtötasossa on nyt kaksi tiedostoa: IssEtsin ja IssKatse.
   - Uusi liike ilman testiä hylätään.
   - Lähtötason saa kirjata uudelleen (`--kirjaa`) vain Työkaluseppä tai PT.
4. **Suorat kameran siirrot** tarkistaa edelleen `kameravahti.py` (Linssiseppä).

## 3. Nykäysvahti (ruutuaika > 20 ms)

Jokainen ruutu kirjataan ja tarkistetaan.

- **KameraKirjoittaja** kirjaa jokaisen yli 20 ms:n ruudun kameran liikkeen aikana ja 1 s sen jälkeen.
  Lokirivi on `kamera: pitkä ruutu`. Museon vastaava rivi on `museo: pitkä ruutu`.
- **`Kartta/Nykaysvahti.cs`** kirjaa jokaisesta liikkeestä yhteenvedon:
  `nykäysvahti: <kohtaus> liike 3,2 s, 192 ruutua, suurin 17 ms, yli 20 ms: 0`.
  Yhteenvedon avulla tiedetään, että liikkeitä todella vahdittiin.
- **`python3 tyokalut/nykaysvahti.py <todistuskansio | loki>`** antaa tuloksen:
  - OK
  - HYLÄTTY (yksikin pitkä ruutu)
  - HUOM, jos kone on kuormassa (todistusajon kohta 7). Tällöin sulavuus todennetaan laitteella.
  - EI TODISTETTU, jos yhtään vahdittua liikettä ei löydy tai `--vaadi`-kohtaus puuttuu.
- Testit: `python3 tyokalut/nykaysvahti_testi.py`.

## 4. Läpipeluubotin putki

- **Logiikka:** botin testit (`BottiOsatTestit`, `BottiPelaaTestit`) ajetaan joka kerta ilman simulaattoria.
- **Simu:** botin läpipeluu ajetaan todistusajona skenaariolla `botti-osat.txt` (17 Olavinlinnan osaa). Sen jälkeen
  `tyokalut/botti-osat.sh --loki <todistuskansio>` tekee raportin (RAPORTTI.md). ennen-junaa.sh tekee molemmat, kun
  simuajossa on `botti: osa` -rivejä.
- **Kattavuus nyt:** vain Olavinlinna. Pelaava botti (`projektiseppa/linna-botti-10`) liittyy samaan putkeen, kun haara
  on junassa. Muiden kohtausten botit tulevat samaan putkeen omina skenaarioinaan.

## Vastuut

- Työkaluseppä ylläpitää ennen-junaa.sh:ta, kameratesti.py:tä, nykaysvahti.py:tä, tuontiporttia ja lähtötasoja.
- Kamerajohtajan koodi on Linssisepän.
- Bottien logiikka on Projektisepän.
- Simuvuorot jakaa Julkaisija.

## Valmiin junan tarkistuslista

- [ ] `zsh tyokalut/ennen-junaa.sh --loki <simuajo>` → viimeinen rivi `ENNEN JUNAA: OK` (KESKEN ei riitä junaan).
- [ ] Codex-vaiheen hylkäykset käsitelty: oikea puute → kooste Codexille PT:n kautta; portin virhe → portti korjattu ja testi lisätty.
- [ ] Kameratesti läpi ja kattavuuden lähtötaso ei kasvanut (`tyylikirja/kameratesti.json`).
- [ ] Nykäysvahti OK laitteella tai kuormattomalla koneella (HUOM kuormassa ei todista sulavuutta).
- [ ] Botti: logiikka ja simun läpipeluu LÄPI (`botti-osat.sh --loki`, myös pelaavan botin `botti: pelaa` -rivit).
- [ ] Opit kirjattu alle.

## Opit ja retrospektiivi (kirjataan jokaisen työn lopussa)

- **19.10.2026, ensimmäinen ajo:** `_valmiit/*-vienti-*` ovat Clauden viimeistelemiä paketteja (KTX2, Draco), eivät Codexin
  toimituksia → 346 väärää hylkäystä; ennen-junaa.sh ohittaa ne. Porttia ei löysätä vientipakettien vuoksi.
- **Codexin kuvatoimitukset postilaatikossa:** käyttävät `MANIFEST.json`ia (files[].sha256, sisäkkäisissä myös juuren suhteen)
  ja `qa/`-kansiota; portti lukee ne, Clauden "→ Codex" -viestit ohitetaan. Kuvatoimitus ilman manifestia = HUOM.
- **Viitekuva ei ole puute (ratkaistu 19.10.):** `posti/natiivi-ui-iss-ympyraikkuna-20261019/viite-cupola-peli-iphone.jpg` on
  Natiivi-UI:n tilauksen mukana lähettämä viite; Codexin MANIFEST listaa vain omat tiedostonsa ja kirjaa viitteen tiivisteen
  `GENERATION.json`in `referenceSHA256`-kenttään. Portti hyväksyy tiivisteellä täsmäävän listaamattoman kuvan viitteenä (HUOM).
- **Pelaava botti** kirjaa `botti: pelaa <kohta>[-n] x/y tekoa` eikä `botti: osa` -riviä; raportti luki tyrmän "ei yhteenvetoa",
  vaikka se oli 3/3 LÄPI. Uusi lokimuoto → jäsennys ja testi samaan erään.
- **Nykäysvahti ilman yhteenvetoja:** pelkkä "0 pitkää ruutua" ei todista mitään; siksi `Nykaysvahti.cs` ja tulos EI TODISTETTU.
