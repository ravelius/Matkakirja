# Tuotantoputken tarkistukset ennen junaa

*(Työkaluseppä 19.10.2026, PT päivitti 20.10.2026 läpikäyntiä varten. Raamattu 7.4 TYÖKALUSEPPÄ, 4.21 TUOTANTOPOHJAT, 4.24
KAMERALIIKKEET, 9.2, 9.3 ja 9.11. Jos tämä ja Raamattu ovat ristiriidassa, Raamattu voittaa.)*

Neljä tarkistusta, yksi ajo. Juna = avoin julkaisuerä, johon valmiit työt kootaan. **Junan lukitus ja TestFlight tehdään
vain omistajan pyynnöstä** (PT välittää pyynnön sanatarkasti); tämä pohja ei käynnistä kumpaakaan. Työkalut ovat
proto-repon (`proto-3d/Matkakirja-proto`) masterissa kansiossa `tyokalut/` (tulivat junassa 205); Codex-portti on
pelirepon `tools/codex-3d-tarkistus.mjs`.

**Tavoitteen muoto (Raamattu 4.21, omistaja 19.10.2026 klo 15.32):** uuden tarkistuksen tavoite on esimerkkiraportti ennen
koodausta: valmis `JUNATARKISTUS.md`-rivi sekä yksi tahallaan rikottu tapaus (esim. pitkä ruutu, väärä mittakaava, liike ilman
testiä), jonka tarkistuksen pitää hylätä. PT hyväksyy tavoitteen ja valmiin tarkistuksen. Omistaja näkee tavoitteen ja valmiin
rinnakkain KK:n kautta ennen junaa vain, jos tarkistus on uusi asia tai makuvalinta, joka muuttaa pelaajan näkemää; muut
hyväksyy PT.

**Napit, tyylit ja toimintalogiikka (omistaja 20.10.2026 klo 22.58; Raamattu 2.70 ja kohta 2 UI-POHJAT):** pohja ei kuvaa omia nappeja, värejä eikä sisään- ja ulostuloa. Käytä tyylikirjaa (`tools/tyylikirja.mjs`, `tyylikirja/`) ja yhteisiä linssien ja pelien sääntöjä (2.70, 2.201). Käytä ensin yhteistä osaa; uusi osa tehdään yhteiseksi kaikille (omistaja 23.25), ja puuttuva pohja kysytään PT:ltä.

**Koko työ ideasta junaan (omistaja 20.10.2026 klo 22.53, Raamattu 4.21):** pohja kattaa työn ideasta junaan. Uusi
tarkistus alkaa tavoitteesta (esimerkkiraportti ja rikottu tapaus), sitten koodi ja testit, ajo ennen junaa ja lopuksi opit
tähän pohjaan. Rinnakkaisnäkymä omistajalle kuten edellä.

**Simulaattori vain harvoin (Raamattu 9.11 SIMU HARVOIN, omistaja 20.10.2026 klo 11.45; 9.2 ja 9.3):** junaan ajetaan aina
automaattiset tarkistukset ja käännös. Simua tai laitetta käytetään vain a) selvästi uuteen tekniikkaan (esim. uusi
varjostin, ohjaus, suorituskyky tai muisti), b) omistajan erikseen pyytämiin kuviin ja c) yöjunan laitekierrokseen ja
muistiajoon. Päiväjuna julkaistaan ilman laitekierrosta. Siksi vaiheet 3 (nykäysvahti) ja 4b (botin läpipeluu simussa)
ajetaan vain näissä kolmessa tilanteessa.

**Päiväjunassa omistaja päättää tarkistuksista joka kerta (omistaja 21.10.2026 klo 00.40):** omistajan sanoin "kysy
tarkistetaanko juna vai ei joka kerta minulta. yöllä tarkistukset voi aina ajaa, mutta päivällä saatetaan tarvita juna
mahdollisimman nopeasti."
- **Päiväjuna:** ennen jokaista päiväjunaa KK kysyy omistajalta, ajetaanko tarkistukset. "Ei" = juna lähtee ilman
  tarkistusajoa (ei KESKEN- eikä OK-tulosta odoteta); "Kyllä" = ajo kuten alla, ja KESKEN (vaiheet 1, 2 ja botin logiikka OK)
  on hyväksytty tulos. PT ei päätä tätä itse eikä oletuksella päivällä.
- **Yöjuna:** tarkistukset ajetaan aina kysymättä, laitekierroksineen (9.11).
- **Omistaja studiolla:** tarkistusajo (tarkistusvideo) pyörii isolla iPadilla, ja omistaja katsoo sen samaan aikaan
  automaatin kanssa ja antaa palautteen ennen käännöstä (omistaja: "katson itse mielelläni tarkistusvideon samaan aikaan
  automaatin kanssa isolta ipadilta, niin osaan antaa heti palautteen ennen käännöstä"). KK kertoo omistajalle, kun ajo alkaa;
  palaute käsitellään ennen junan käännöstä.

## Yksi komento

```
zsh tyokalut/ennen-junaa.sh                                    # proto-repon juuresta, ilman simua
zsh tyokalut/ennen-junaa.sh --loki <todistuskansio> [--loki <toinen>]   # vain tilanteissa a–c
```

- **Milloin ja kuka (PT 20.10.2026):**
  - Työn tekijä ajaa sen ilman simua ennen kuin vie työn junaan.
  - Natiiviseppä ajaa sen ilman simua junan kokoamisessa, kun hän vie työt runkoon; päiväjunassa vain, jos omistaja on KK:n
    kysymykseen vastannut "Kyllä" (yllä).
  - Yöjunan laitekierroksessa simullinen ajo (`--loki`) kuuluu vakiona kierrokseen (Laitetestaaja tai Natiiviseppä, 9.11).
  - Kameratesti (vaihe 2) ajetaan lisäksi jokaisessa käännöksessä.
- Ilman `--loki`-valintaa ajetaan vain simuttomat vaiheet (1, 2 ja botin logiikka). Silloin vaiheet 3 ja 4b ovat
  EI AJETTU, ja viimeinen rivi on KESKEN. **Päiväjunassa KESKEN on hyväksytty tulos, kun vaiheet 1, 2 ja botin logiikka
  ovat OK** (PT 20.10.2026); erillistä "päiväjuna OK" -tulosta ei tarvita. Päiväjunassa ajo tehdään vain omistajan "Kyllä"-vastauksella.
- `--udid <UDID> --app <.app> --sha <SHA>` ajaa simuajon itse todistusajo.sh:lla (vain tilanteissa a–c). Oletusskenaario on
  `siirtoseppa-ajot/skenaariot/botti-osat.txt` (proto-3d/tyokalut/), ja lisää voi antaa `--skenaario`-valinnalla. Simuajo
  tarvitsee vuoron Julkaisijalta (SIMULAATTORI NYT).
- Tulos tulee kansioon `proto-3d/lokit/ennen-junaa-<aika>/JUNATARKISTUS.md`: neljän rivin taulukko ja viimeinen rivi
  `ENNEN JUNAA: OK`, `ENNEN JUNAA: HYLÄTTY (vaiheet …)` tai `ENNEN JUNAA: KESKEN (…)`.
  Paluuarvot: 0 = OK, 1 = hylätty, 2 = väärä valinta, 3 = kesken, 4 = odottaa (kevyt tila).
- Kevyessä tilassa (`/tmp/matkakirja-kevyt`, omistaja on koneella) ajo odottaa. `--nyt` ohittaa odotuksen.

## 1. Codex-toimitusten tuontitarkistus

`node tools/codex-3d-tarkistus.mjs <toimituskansio>` (pelirepo). Toimitusmuoto on kuvattu tiedostossa `codex-3d-toimitus.md`.

- **Mallit (glb):** muoto, nimi, koko, kolmiot, piirrot, materiaalit ja tekstuurit.
- **Mittakaava:** metrit, hahmon korkeus ja pivot.
- **Luuranko ja animaatiot.**
- **Manifesti (`codex-3d-toimitus.md` luku 7):** juuren `SHA256SUMS` tai `SHA256SUMS.txt` tai Codexin `MANIFEST.json`
  (`{"files": [{"path", "sha256"}]}`, sisäkkäiset sallittuja). glb-toimitus ilman manifestia hylätään.
- **Erilliset kuvat:** PNG tai JPEG. `tekstuurit/`-kansion kuvien sivujen pitää olla kahden potensseja ja enintään 2048 px.
  Jokaisen kuvan pitää olla manifestissa ja tiivisteen täsmättävä, paitsi `esikatselu/`- ja `qa/`-kansioiden kuvien. Pelkkä
  kuvatoimitus ilman manifestia = HUOM; `GENERATION.json`in `referenceSHA256`-tiivisteellä täsmäävä viitekuva = HUOM.
- **Lähteet:** `LAHTEET.md` tai Codexin `SOURCE-INVENTORY.json`, `SOURCE-MANIFEST.json` tai `CREDITS.md`; jos kaikki puuttuvat,
  tulee HUOM.

ennen-junaa.sh tarkistaa itse kaikki tuoreet (`--paivia`, oletus 3) `_valmiit/`-kansiot, joissa on SHA256SUMS ja joiden
nimessä tai LAHTEET.md:ssä on sana Codex tai Tripo, sekä postilaatikon tuoreet kuvatoimitukset. Muut kansiot annetaan
`--codex <kansio>`-valinnalla. Hylätystä toimituksesta lähtee yksi viesti PT:lle (VIRHE-rivit). PT välittää viestin Codexille.

## 2. Kameratesti joka käännöksessä

`python3 tyokalut/kameratesti.py` ajetaan jokaisessa käännöksessä `tyokalut/tarkista.sh`:ssa (proto-kaanna.sh, vaihe 2).
Ajo kestää noin 45 s. Tämä on automaattinen tarkistus, joten se ajetaan aina.

1. **Testien löytäminen.** Kameratestejä ovat kaikki testiluokat (`Linssit-testit`, `Kartta-testit`), jotka käyttävät
   Kamerajohtajaa, Kameratarkastusta, PalloTarkastusta tai KameraAsentoa. Uusi testi tulee mukaan automaattisesti.
2. **Ajo.** Kumpikin testisarja käännetään kerran ja ajetaan suotimella `A|B|C`. Ajuri hyväksyy |-listan. Yksikin FAIL
   hylkää käännöksen.
3. **Kattavuus.** Jokaisella lähdetiedostolla, joka rakentaa kameraliikkeen (`new Kisko/Orbit/…/PalloAjo(` tai
   Kamerajohtaja), pitää olla testi, jossa luokan nimi esiintyy.
   - Kattamattomat verrataan lähtötasoon `tyylikirja/kameratesti.json`. Lähtötaso saa vain lyhentyä; ajantasainen lista on
     tiedostossa (20.10.2026, BUILD 208: IssEtsin ja IssKatse).
   - Uusi liike ilman testiä hylätään.
   - Lähtötason saa kirjata uudelleen (`--kirjaa`) vain Työkaluseppä tai PT.
4. **Suorat kameran siirrot** tarkistaa edelleen `kameravahti.py` (Linssiseppä).

## 3. Nykäysvahti (ruutuaika > 20 ms)

Ajetaan vain tilanteissa a–c (esim. uusi kameraliike tai suorituskykyyn vaikuttava muutos, yöjunan laitekierros), koska
se tarvitsee simu- tai laiteajon. Päiväjunassa vaihe on EI AJETTU.

- **KameraKirjoittaja** kirjaa jokaisen yli 20 ms:n ruudun kameran liikkeen aikana ja 1 s sen jälkeen.
  Lokirivi on `kamera: pitkä ruutu`. Museon vastaava rivi on `museo: pitkä ruutu`.
- **`Kartta/Nykaysvahti.cs`** kirjaa jokaisesta liikkeestä yhteenvedon:
  `nykäysvahti: <kohtaus> liike 3,2 s, 192 ruutua, suurin 17 ms, yli 20 ms: 0`.
  Yhteenvedon avulla tiedetään, että liikkeitä todella vahdittiin.
- **`python3 tyokalut/nykaysvahti.py <todistuskansio | loki>`** antaa tuloksen:
  - OK
  - HYLÄTTY (yksikin pitkä ruutu)
  - HUOM, jos kone on kuormassa (todistusajon kohta 7). Sulavuus todennetaan silloin laitteella, mutta vain tilanteissa a–c
    (yleensä yöjunan laitekierroksessa); muuten omistaja näkee sen pelistä.
  - EI TODISTETTU, jos yhtään vahdittua liikettä ei löydy tai `--vaadi`-kohtaus puuttuu.
- Testit: `python3 tyokalut/nykaysvahti_testi.py` (automaattinen, ilman simua).

## 4. Läpipeluubotin putki

- **4a Logiikka:** botin testit (`BottiOsatTestit`, `BottiPelaaTestit`) ajetaan joka kerta ilman simulaattoria.
- **4b Simu:** botin läpipeluu ajetaan todistusajona skenaariolla `botti-osat.txt` (17 Olavinlinnan osaa) vain tilanteissa
  a–c. Sen jälkeen `tyokalut/botti-osat.sh --loki <todistuskansio>` tekee raportin (RAPORTTI.md). ennen-junaa.sh tekee
  molemmat, kun simuajossa on `botti: osa` -rivejä.
- **Kattavuus 20.10.2026:** vain Olavinlinna, ja Olavinlinna on tauolla (Raamattu 2.200 KESKITYS YTIMEEN), joten simun läpipeluuta ei
  nyt tarvita mihinkään junaan. Pelaava botti (`projektiseppa/linna-botti-10`) ei ole vielä masterissa; se liittyy samaan
  putkeen, kun haara on junassa. Muiden kohtausten botit tulevat samaan putkeen omina skenaarioinaan.

## Vastuut

- Työkaluseppä ylläpitää ennen-junaa.sh:ta, kameratesti.py:tä, nykaysvahti.py:tä, tuontiporttia ja lähtötasoja.
- Kamerajohtajan koodi on Linssisepän.
- Bottien logiikka on Projektisepän.
- ennen-junaa.sh:n ajavat työn tekijä (ennen junaan vientiä) ja Natiiviseppä (junan kokoamisessa); yöjunan simullisen
  ajon tekee Laitetestaaja tai Natiiviseppä.
- Simuvuorot jakaa Julkaisija (vain tilanteisiin a–c).
- Lukitus ja TestFlight: vain omistajan pyynnöstä (PT välittää).

## Valmiin junan tarkistuslista

- [ ] Päiväjuna: KK on kysynyt omistajalta, ajetaanko tarkistukset; omistajan vastaus kirjattu. Studiolla tarkistusvideo isolla
      iPadilla ja omistajan palaute käsitelty ennen käännöstä.
- [ ] `zsh tyokalut/ennen-junaa.sh` ilman simua (tekijä ennen junaan vientiä, Natiiviseppä junan kokoamisessa): vaiheet
      1, 2 ja botin logiikka OK. Päiväjunassa KESKEN (vaiheet 3 ja 4b EI AJETTU) on hyväksytty tulos; HYLÄTTY estää junan.
- [ ] Yöjunan laitekierros: `ennen-junaa.sh --loki` vakiona (Laitetestaaja tai Natiiviseppä).
- [ ] Codex-vaiheen hylkäykset käsitelty: oikea puute → kooste Codexille PT:n kautta; portin virhe → portti korjattu ja testi lisätty.
- [ ] Kameratesti läpi ja kattavuuden lähtötaso ei kasvanut (`tyylikirja/kameratesti.json`).
- [ ] Vain tilanteissa a–c (uusi tekniikka, omistajan pyytämät kuvat, yöjunan laitekierros ja muistiajo):
      `ennen-junaa.sh --loki <simuajo>` → nykäysvahti OK laitteella tai kuormattomalla koneella (HUOM kuormassa ei todista
      sulavuutta) ja botin simun läpipeluu LÄPI, jos kohtaus on botin kattama.
- [ ] Junaa ei lukita eikä viedä TestFlightiin ilman omistajan pyyntöä.
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
