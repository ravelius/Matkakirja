## 2026-10-09 — SISÄLTÖKIRJURI → CODEX: NOTRE-DAMEN VALOKUVAMAISET PINNAT, PILOTTI (2 kuvaa: ND etelä ja ND katot)

Pelin oma Notre-Dame-malli (Linnanrakentaja, LR) saa valokuvamaiset pinnat, jotta se ei näytä toistuvalta laatalta Googlen fotogrammetrian rinnalla (omistajan idea 9.10.2026 klo 15.0x; Päätoimittaja antanut luvan). **Tämä tilaus on PILOTTI: vain kaksi kuvaa** (ND etelä, ND katot). Loput neljä ND-näkymää (länsi, pohjoinen, apsis, spiira) ja Kuninkaanlinnan kuvat tilataan vasta, kun LR on tarkistanut pilotin kohdistuksen. **Generointilupa: 2 kuvaa** (yksi per näkymä, ei lisävariantteja).

Kuvat **projisoidaan malliin planaarisesti**, joten kehyksen, aukkojen ja rakennuksen ääriviivan pitää olla pikselilleen LR:n ohjekuvan mukaiset. Muu ei ole tärkeämpää kuin tämä.

### Liitteet (kansio `posti/liitteet/nd-pinnat/`)
Jokaisesta näkymästä (etelä: `nd_etela_*`, katot: `nd_katot_*`):
- **`nd_<näkymä>_ohje.png`**: pääohje. Varjostettu ortokuva, 5 m:n ruudukko, korot (räystäs, harja, huippu, listatasot), aukot tyyppikirjaimin (sininen = ikkuna, punainen = ovi/portaali, violetti = säleaukko), mittakaava (etelä: 1 m = 26,5 px; leveys 137,7 m, korkeus 97,3 m). Ruudukko, kirjaimet ja merkinnät ovat vain ohjetta: **älä piirrä niitä tuloskuvaan.**
- **`nd_<näkymä>_puhdas.png`**: sama ortokuva ilman merkintöjä. **Rajaus- ja muotoviite: kehyksen on oltava tälle pikselilleen sama.**
- **`nd_<näkymä>_maski_aukot_kaikki.png`**: aukkojen maski (valkoinen 255 = aukko). **Ikkunat, ovet ja säleaukot sijoitetaan täsmälleen maskin kohdille; uusia aukkoja ei keksitä, eikä maskin aukkoja jätetä pois.**
- **`nd_<näkymä>_maski_rakennus.png`**: rakennuksen ääriviiva (valkoinen = rakennus). Rakennuksen ulkopuolelle tulee tasainen valkoinen tausta (#FFFFFF) tai alfa-läpinäkyvyys.
- **Commons-referenssit** (`ref-*.jpg`, Public domain / CC0 / CC BY, 1400 px; tekijät ja lisenssit alla): **vain materiaalin, värin, kulumisen ja yksityiskohtien luonteen malleina, ei kopioitavina kuvina.** Älä jäljennä yksittäisen valokuvan sommittelua, perspektiiviä, taivasta tai ihmisiä. Pinnan on oltava uusi, ortografinen kuva.
- **Ei Googlen kuvia, Googlen 3D-laattoja eikä niistä johdettuja kuvia** syötteenä missään muodossa (Googlen ehdot). Ohjekuvat on piirretty omasta mallista.

### Tilausehdot (LR:n 7 kohtaa, sitovia; docs/raportit/linnanrakentaja-codex-pinnat-projektio-20261009.md luku 2)
1. **Kehys pikselilleen sama kuin `*_puhdas.png`:ssä**: sama kuvasuhde, rakennuksen ääriviiva maskin `rakennus` mukaan, ortografinen kuva ilman perspektiiviä ja kameran kallistusta. Aukot täsmälleen maskien kohdilla; listat ohjekuvan kertomilla korkeuksilla.
2. **Valo:** tasainen pilvipouta. **Kuvassa ei ole luotuja varjoja eikä aurinkoa**; kaikki julkisivut tilataan samalla valolla. Syvennykset saavat tummua luonnollisesti (AO leivotaan erikseen).
3. **Sisältö:** pelkkä rakennus nykyasussaan. **Ei ihmisiä, ajoneuvoja, telineitä, nostureita, puita, lyhtypylväitä, kylttejä eikä taivasta.** Rakennuksen ulkopuolella tasainen valkoinen tausta tai alfa.
   - **ND:** vaalea kermankeltainen kalkkikivi, jossa kivikohtainen vaihtelu ja likajuovat (ei nokimustaa; puhdistettu restauroinnin jälkeen). **Lyijykatto vaalean hopeanharmaa**, spiira tummempi sinertävänharmaa. **Patsaat vihertävää pronssia.**
4. **Ei toistuvaa kuviota:** jokainen kivi, ikkuna ja katon kohta ainutkertainen kuten valokuvassa. Ei kopioliitettyjä alueita eikä tunnistettavaa laattatoistoa (omistajan huomautus).
5. **Tarkkuus:** vähintään ohjekuvan koko (etelä **4088 × 2981 px**, katot **4088 × 2557 px**), suurempi on parempi; tarkka kokonaiskerroin (esim. 2×) kuvasuhde säilyttäen. **Kuvaan ei tule tekstiä, merkintöjä, vesileimaa eikä "havainnekuva"-merkintää** (kuva projisoidaan malliin): merkintä kulkee tiedostonimessä ja saatteessa ("Havainnekuva. Tekoälyllä tuotettu, ei valokuva.").
6. **Katot ylhäältä:** pystysuora ilmakuva kuten ortokuva (katselu suoraan alas, ohjekuvan suunta: kuvan oikea = atsimuutti 116°). Lappeiden saumat ja harjat ohjekuvan kohdilla. **Lyijykatto: saumatut levyt** (levyjen leveys noin 0,5–0,6 m, pystysaumat lappeen suuntaan, poikkisaumat porrastetusti), levykohtainen hapettumissävyvaihtelu, hento valumajälki, tummemmat harjalistat; tukikaarten ja kattoikkunoiden kohdat ohjekuvan mukaan.
7. **Spiira:** ei kuulu pilottiin.

### Pinnat ja luonne
- **ND etelä (`nd_etela`)**: eteläjulkisivu: länsitornin eteläsivu (vasen), laivan ja kuoriosan seinät, ikkunat A (2,25 × 7,75 m, 11 kpl), B (2,25 × 11,75 m, 3 kpl) ym. maskin mukaan, räystäsgalleria, **tukikaaret ja pinaakkelit oikealla**, poikkilaivan lyijykatto ja kärkitorni (spiira) keskellä (spiira tumma lyijy; patsaat vihertävää pronssia). Referenssit: eteläpuolen kalkkikivi, tukikaaret, torni.
- **ND katot (`nd_katot`)**: kaikki katot ylhäältä: laivan ja poikkilaivan lyijykatot (selkeä lappeiden sävyero ohjekuvan mukaan), sivulaivojen pulpettikatot, kuoriosan puolipyöreä katto, tornien kattopyramidit, kärkitornin suunnan kahdeksankulmainen kupu, tukikaarten ja pinaakkelien päät. Referenssit: lyijykattojen saumat ja hapettuminen.
- Kivipintojen suuri vaihtelu **ei saa toistua**: sama kivi/sauma/sävy ei tunnistettavasti kahdesti.

### Toimitus
- Palautus: **`nd_etela_codex_v1.png`** ja **`nd_katot_codex_v1.png`** (PNG, sRGB; alfa tai valkoinen tausta) R2:een `julisteet/omat-mallit-pinnat/20261009/` (tarkista julkinen URL `?t=`-parametrilla ennen latausta; älä ylikirjoita). Manifesti `posti/kuvatoimitus-nd-pinnat-pilotti-20261009.json` (url, sha256, mitat, generationPrompt, käytetyt referenssit) ja kuittaus `posti/codex-fable-nd-pinnat-pilotti-20261009.md`.
- **QA:ssa erikseen:** (1) aukkojen paikkapoikkeama maskista (% kuvan leveydestä), (2) rakennuksen ääriviivan poikkeama (IoU maskin `rakennus` kanssa), (3) toisto (tunnistettavat toistuvat alueet), (4) taivas/ihmiset/telineet/tekstit/varjot, (5) onko kuvassa ruudukkoa tai merkintöjä.
- Ei main-mergeä, versionnostoa, pelikytkentää eikä julkaisua Codexilta. LR kohdistaa ja projisoi kuvat (hyväksyntäraja: aukkojen jäännös mediaanina ≤ 0,15 m, rakennusmaskin IoU ≥ 0,97); jos kohdistus ei täsmää, kuva palaa Codexille eroavien aukkojen listan kanssa.

### Commons-referenssien lähteet (Public domain / CC0 / CC BY, ei BY-SA)
| Tiedosto | Commons-tiedosto | Tekijä | Lisenssi | Päiväys |
|---|---|---|---|---|
| ref-etela-01 | Paris Notre-Dame cathedral south facade 20170527 (02).jpg | xiquinhosilva | CC BY 2.0 | 2017-05-27 |
| ref-etela-02 | Notre Dame de Paris(36121402431).jpg | xiquinhosilva | CC BY 2.0 | 2017-05-27 |
| ref-etela-03 | Notre Dame (15214606506).jpg | Schezar | CC BY 2.0 | 2014-04-06 |
| ref-etela-04 / 05 | October 2011 in Paris DSC 0284 / 0285 | Kimberly Vardeman | CC BY 2.0 | 2011-10 |
| ref-apsis-01 / 02 | Notre-Dame-de-Paris Chevet.jpg; Notre Dame chevet.jpg | Jebulon | CC0 | 2011 |
| ref-apsis-03 | Apse of Notre-Dame de Paris (34010914440).jpg | Dale Cruse | CC BY 2.0 | 2017-04-13 |
| ref-torni-03 | Paris Notre-Dame cathedral west facade towers 20080712.jpg | AlfvanBeem | CC0 | 2008-07-12 |
| ref-torni-05 | Notre Dame (15051067797).jpg | Schezar | CC BY 2.0 | 2014-04-06 |
| ref-katto-01 | Buttresses at Notre-Dame, Paris (3587990243).jpg | Sharon Mollerus | CC BY 2.0 | 2009 |
| ref-katto-02 | FW Dach Notre Dame de Paris.jpg | Freedom Wizard | CC BY 3.0 | 2009-05-13 |
| ref-katto-03 | Detail 2, Cathédrale Notre-Dame de Paris, 2011.jpg | Cristian Bortes | CC BY 2.0 | 2011-04-30 |
| ref-katto-04 | Notre Dame (15051055268).jpg | Schezar | CC BY 2.0 | 2014-04-06 |
| ref-katto-05 | Detail of the tower of Notre-Dame de Paris, August 2013.jpg | Shadowgate | CC BY 2.0 | 2013-08-26 |
| ref-katto-06 / 07 | Paris old stone (42115141840).jpg; Paris IMG 9429 (43693044095).jpg | Ali Sabbagh | CC0 | 2018-07-20 |
| ref-spiira-01 / 02 | Notre-Dame de Paris spire 2026-01-04-2 / -1.jpg | Renée Kools | CC BY 4.0 | 2026-01-04 |
Kaikki ovat Wikimedia Commonsissa (haku tiedostonimellä). Kokonainen luettelo: `proto-3d/_tyo/sisaltokirjuri/nd-kl-referenssit-20261009/LAHTEET.md`.
