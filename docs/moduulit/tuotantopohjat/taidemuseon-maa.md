# Tuotantopohja: taidemuseon maa

*(LUONNOS 17.10.2026, Sisältökirjuri, PT:n toimeksianto. Raamattu, TUOTANTOPOHJAT ja TUOTANTOPOHJIEN SANASTO. Tähän on koottu
vain nykyisten ohjeiden ja luovutusten opit (Alankomaat ja Ranska); uusia sääntöjä ei ole. Jos tämä ja Raamattu ovat
ristiriidassa, Raamattu voittaa. Sisältö-osuuden omistaa Sisältökirjuri; muut osat täydentävät tekijänsä otsikoilla
"TÄYDENTÄÄ: <rooli>". PT hyväksyy muutokset. Ei vielä dokumenttikartalla.)*

**Tavoitteen muoto (Raamattu 4.21, omistaja 19.10.2026 klo 15.32):** ennen työtä tavoite määritellään yhtä selvästi kuin grafiikassa havainnekuvalla. Tässä putkessa: GRAFIIKKA havainnekuva salista; KAMERA viitevideo tai kuvakäsikirjoitus ennen koodausta; UUDET TEKSTITYYPIT muutama esimerkki pelinäkymässä ennen koko erää. Omistajalle tuodaan vain uudet asiat ja makuvalinnat; muut tavoitteet hyväksyy PT.

Taidemuseon maa = yhden maan oma museo taidemuseo-linssissä (Raamattu, TAIDEMUSEO-LINSSI; vain natiivissa): maan teokset
seinillä, patsaat huoneissa, opastettu kierros kertojan äänellä tai vapaa kulku, i-kortti ja ympyrät, salien avaukset.
Ensimmäinen maa on Alankomaat, toinen Ranska (Louvre, Orsay, Marmottan, Rodin); Italia vasta omistajan käskystä.
Pohja ei kata museon 3D-salia (kartta- ja salityö), ääntä (`kertojan-teksti-ja-aani.md`) eikä pääkaupungin avausta
(`paakaupungin-avaus.md`).

**Rajaus:** maittain, yksi maa kerrallaan. Uusi maa on Euroopassa, kunnes omistaja aloittaa muut maanosat (MUUT MAANOSAT VÄHITELLEN).
Italian museot: omistajan kortti 14.10. "Mukaan myös Italian museot, Italia pois App Storesta", ajoitus "Ei vielä".
Kreikan valtion muistomerkit piilotetaan Kreikan App Storessa (storefront GRC).

## 1. Tuotantoputki ja roolit

```
Sisältökirjuri: aineistoselvitys (salit, teosehdokkaat, kuvalähteet ja riskit, galleriatyyli)
  → PT + omistaja: lähde- ja riskipäätökset (kortti) → teosluettelo (PT: pudotukset)
  → Linssiseppä: teokset.json + sali.json-paikat + huoneet.json → kuvat (Commons PD-Art, ASTC-paketit)
  → Sisältökirjuri: kertojan tekstit (teokset, museon ja salien avaukset), i-kortti (taiteilijat + lyhyt), kohdat.json
  → riippumaton faktatarkistus → PT → Tekstit-osasto → omistajan rasti
  → äänet vain luvalla (Äänittäjä) → kytkentä (Linssiseppä / Natiivi-UI) → pariteettitesti → Julkaisija
```

| Vaihe | Rooli | Tulos |
|---|---|---|
| 0. Selvitys | Sisältökirjuri (Sonnet-tutkijat) | `docs/raportit/taidemuseo-<maa>-aineisto-<pvm>.md` |
| 1. Päätökset | PT → KK → omistaja | kuvalähteet, riskit, sali- ja teosrajaukset |
| 2. Teosluettelo ja data | Linssiseppä | `teokset.json`, `sali.json`, `huoneet.json`, `kierros.json`, `veistokset.json` |
| 3. Kertojan tekstit | Sisältökirjuri | teosten kertojatekstit, museon ja salien avaukset Tekstit-osastoon |
| 4. i-kortti | Sisältökirjuri | `taiteilijat.json`, `kuvat/*.jpg`, `lyhyt-<maa>.json` |
| 5. Kohdat | Sisältökirjuri | `kohdat-<maa>.json` (luonnos = true) |
| 6. Tarkistus | tarkistaja-agentti, PT | KORJAA / EPÄVARMA / OK -lista, korjaukset |
| 7. Äänet, kytkentä, vienti | Äänittäjä, kytkijät, Julkaisija | `TÄYDENTÄÄ`-osat |
| 8. Retrospektiivi | Sisältökirjuri | kirjaus luvun 10 oppeihin |

Sisältökirjuri ei kirjoita proto-gitiin (Matkakirja-proto): toimitus docsiin ja viesti omistajalle (Linssiseppä, Natiivi-UI).
Viestit PT:lle enintään 3 riviä; yksityiskohdat raporttiin. Agentit vain Opus ja Sonnet.

## 2. Kultainen polku (oletustapa)

1. **Aineistoselvitys ensin, ei latauksia.** Tutkijat käyvät läpi museoiden käyttöehdot, robots.txt:n ja rajapinnat; mitään ei
   ladata ennen päätöksiä. Jokainen lisenssiväite kirjataan lähde-URLeineen; merkinnät [EPÄVARMA], [EI LÖYDETTY], [HAKUTULOS],
   [RISKI]. Estot (403, Cloudflare, robots.txt) eivät ole kierrettyjä. Massahakua ei tehdä.
2. **Teokset ovat vapaita, kuvan alkuperä ratkaisee.** Teos kelpaa, kun tekijä on kuollut yli 70 vuotta sitten ja teos on
   julkaistu ennen USA:n rajaa (URAA); suojatut tekijät pois (Escher, Mondrian ja Van Doesburg eivät ensimmäiseen erään).
   Museon oma ehto (esim. Louvre, Orsay: ei kaupallista kuvakäyttöä) ja Commonsin PD-Art-kopio ovat eri asia: jäännösriski on
   sopimusriski, ei tekijänoikeus. Riskin hyväksyy omistaja kortilla ennen latausta; päätös kirjataan Raamattuun.
3. **Teosluettelo kokonaisuutena.** Maan teokset koko maasta, Alankomaiden tasolla (noin 60 teosta, maalaukset, grafiikka,
   valokuvat; patsaat omana siipenään). Heikoimmat kuvat ja epäselvät attribuutiot nostetaan PT:lle ennen luetteloa
   (esim. Ranskassa Tepidarium pois, Chicago ja Washington pois).
4. **Kertojan teksti ja avaukset.** Teoksen kertojateksti on pieni tarina (kuvateksti ja kertoja eivät toista toisiaan);
   museon ja salien avaukset ovat omia tunnuksia Tekstit-osastossa ("Odottaa hyväksyntääsi"). Kaikki faktat kahdesta
   lähteestä; heikko tai yksi lähde → pudotetaan tai "Museon mukaan …" -muotoon.
5. **i-kortti** (omistaja 16.10. 21.38 ja 21.51; MUOTOKUVARIVI 21.54): taiteilijan pieni pyöreä muotokuva, tekijä ja elinvuodet,
   alla tiedot; teoksen lyhyt = 1–2 faktaa, kumpikin enintään 110 merkkiä, yhteensä enintään 160, ei toistoa kertojasta eikä
   kuvatekstistä. Muotokuva vain PD/CC0 ja varmasti oikea henkilö (Commons-lisenssi tarkistettu API:lla); jos varmaa kuvaa ei ole,
   rivi jää ilman kuvaa ja syy kirjataan (`ei-kuvaa-syyt.json`). `taiteilijat.json`:n avain on `teokset.json`:n `tekija`
   täsmälleen kuten kirjoitettu (nimivariantit omina avaimina).
6. **Kohdat (i-napin ympyrät)** (ohje `docs/kohtaukset/museoteokset/tyokalut/ohje-kohdat.txt`): 2–4 ympyrää teosta kohti,
   katsottu kuvasta (sijainti piirtämällä merkit kuvan päälle), otsikko enintään 32, teksti 70–150 merkkiä, vähintään yksi
   lähde (museon tietue ensin). Tunnistus tai fakta perustetaan museon omaan tietueeseen ("Louvren mukaan …") ja toiseen
   lähteeseen. Ei alastomuutta eikä väkivallan kuvausta: valitse muu yksityiskohta. Kiistanalainen tunnistus: "on arveltu"
   tai pois. Tiedosto pysyy luonnoksena (`luonnos: true`), kunnes PT hyväksyy.
7. **Puheen merkkimäärä ennen ääniä.** Laske kertojan lukema teksti (otsikko + teksti, luvut sanoiksi) ja ilmoita se PT:lle;
   ylitys omistajan lupaan nähden vaatii uuden kortin (Ranskan kohdat: 20 065 merkkiä vs. ~10 000 lupa).
8. **Riippumaton tarkistaja ennen PT:tä.** Anna tarkistajalle tekstit ja lähteet, ei perusteluja, ja sano "oleta että jotain on
   pielessä". Raportti väitteittäin; korjaus tehdään varovaisemmaksi muotoiluksi, ei uudeksi väitteeksi.
9. **Faktakorjaus ennen lupaa, ei sen jälkeen.** Jokainen korjaus äänitetyn tekstin jälkeen maksaa uusintaotoksen
   (`aanitys_uudelleen=true`, tiedosto `korjatut-tekstit-<pvm>.json`); korjatut kuvatekstit vie kytkijä omaan `teokset.json`:iinsa.
10. **Tarkista, lukeeko peli tekstin jo itse** (`KortinLukija` / `Puhe.Lue`), ennen kuin tilaat ääniä i-kortin ja ympyröiden
    teksteille (Louvren 152 ympyrää: lupa jäi käyttämättä).

## 3. Valmiin määritelmä (tarkistuslista)

Sisältö-osuus ei ole valmis ennen kuin kaikki kohdat täyttyvät:

- [ ] Aineistoselvitys tehty ja lähde- ja riskipäätökset omistajan kortilla ja Raamatussa.
- [ ] Teosluettelo PT:n hyväksymä; suojatut tekijät pois; kaikilla teoksilla inventaarinumero ja museon tietue.
- [ ] Kertojan tekstit, museon ja salien avaukset Tekstit-osastossa ja hyväksytty (luku 5).
- [ ] `taiteilijat.json`: jokainen `tekija` löytyy avaimena (tarkista koneellisesti `teokset.json`:ta vasten), kuvat 256², lisenssi ja lähde.
- [ ] `lyhyt-<maa>.json`: jokaiselle teokselle faktat tai tyhjä lista ja syy; tunnukset täsmäävät `teokset.json`:iin.
- [ ] `kohdat-<maa>.json`: 2–4 ympyrää per teos, pituudet rajoissa, ei toistoa kertojasta, ei alastomuutta.
- [ ] Riippumainen tarkistus tehty, KORJAA-rivit korjattu, EPÄVARMA-rivit varovaisemmaksi tai pois.
- [ ] Puheen merkkimäärä (puhutussa muodossa) ilmoitettu PT:lle; ääniluvat KK:n suoralla rivillä.
- [ ] Pariteettitesti ajettu (luku 8) ja tulokset kirjattu.
- [ ] Luovutusraportti: aineistopolut, heikoimmat kohdat, pudotetut väitteet, huomiot Linssisepälle ja Natiivi-UI:lle.
- [ ] Retrospektiivi kirjattu luvun 10 oppeihin.

## 4. Poikkeaminen

Poikkeus kultaisesta polusta vain PT:n hyväksynnällä; poikkeama kirjataan joko uudeksi poluksi tai jätetään pois.

## 5. Hyväksyntäpolku

| Sisältö | Hyväksyjä | Perusta |
|---|---|---|
| Kuvalähteet, lisenssiriskit, uusi maa tai sali | omistaja (kortti PT:n kautta) | Raamattu, KUVALÄHTEET JA PATSAAT (10.10.), ITALIA (14.10.) |
| Teosluettelo, pudotukset | PT | Ranskan luettelo 13.10. |
| Kertojan tekstit, museon ja salien avaukset | omistaja (Tekstit-osasto, "Odottaa hyväksyntääsi") | ei pysyvää lupaa uusille teksteille |
| i-kortin data, ympyrät | PT riippumattoman tarkistuksen jälkeen | omistajan päätös 16.10. 21.51 (muoto), sisältö PT |
| Äänet | omistaja (KK:n "OMISTAJAN PÄÄTÖS" -rivi, määrä ja merkkimäärä) | `kertojan-teksti-ja-aani.md` luku 2 |
| Sääntöjen muutos | PT → omistaja | Raamattu |

## 6. Tyypilliset virheet (tarkistajan lista)

1. **Tekijänimi ei täsmää** `teokset.json`:n `tekija`-kenttään (Ranskassa neljä: Girodet, Watteau, Rembrandt, Tiziano), jolloin kortti
   ei löydä muotokuvaa. Tarkista avaimet koneellisesti.
2. **Muotokuvan tunnistus epävarma** (Hals, Vermeer, Ruisdael, Cuyp, Hobbema, La Tour ym.): ei kuvaa, syy kirjataan.
   Valitse PD-vaihtoehto, jos alkuperäinen on CC BY-SA (Watteau, Van Gogh).
3. **Yksi lähde tai lähteet ristiriidassa** (nimen antaja, ajoitus, mitat, lukumäärät): "noin", haarukka tai pois; kirjoita
   ristiriita huomioon.
4. **Museon oma tietue ei sano sitä, mitä Wikipedia** ("sumuisessa valossa", "lasinegatiivi", "kynttilän valossa"): "Museon mukaan …"
   tai pois. Ranskan 12 lyhyttä pehmennettiin näin.
5. **Teos on lainassa tai kaupungin omistama** (Amsterdamin kaupungin laina Rijksissä): ei väitetä museon omaksi.
6. **Kuvateksti ja kertoja kertovat saman** (toistoa ympyrässä tai lyhyessä).
7. **Kehys, kuva ja kertoja kertovat eri teoksesta** (sama aihe, eri versio: Eväspaussi Rijks vs. Stedelijk).
8. **Alastomuus ja väkivalta ympyrän kohteena** (Sardanapalos, Olympia, Aamiainen ruohikolla): turvalliset yksityiskohdat.
9. **Kuvan lähde:** museon "kaupallinen kielletty", C2RMF- tai RMN-GP-krediitti ja gallerix-tyyppiset sivut eivät kelpaa
   lähteeksi; kirjaa kuvan lataaja ja alkuperä ennen käyttöä.

## 7. TÄYDENTÄÄ: Valoseppä ja Linnanrakentaja

*(Valoseppä: kohdevalot, kehysten ja seinän valaistus, heijastukset ja galleriatyylin värit (esim. Louvren Salle des États
syvänsininen, Orsayn antrasiitinharmaa). Linnanrakentaja: salin rakenne ja proseduraalinen runko, kehykset, patsaiden paikat,
varjojen leivonta, julkisivut ja lähestymiskuvat. Täydentävät Valoseppä ja Linnanrakentaja.)*

### 7.2 Lavastaja (ent. Linnanrakentaja): salit, henkilöt ja tilatut mallit peliin asti

**Työvaiheet**
1. **Lähtötiedot:** sali.json (osat, aukot, teos- ja veistospaikat, penkit), Linssisepän teosluettelo ja PT:n tilaus. Tarkista ensin
   rungosta (natiiviseppa/juna-NNN), mitä on jo kytketty ja mitkä liput ovat päällä (`MuseoHenkilot.Paalla`, `MuseoElama.Paalla`,
   `MuseoPulu.Paalla`, `KatsojatPaalla`). Media voi olla ämpärissä, vaikka peli ei näytä sitä.
2. **Salin rakenne ja kehykset:** sali-GLB:hen kuuluvat jalustat, kaiteet ja penkit. Koodin väliaikaiset kappaleet
   (`MuseoRakennus.cs`, "väliaikaiset") poistuvat, kun GLB latautuu. Jos GLB:stä puuttuu jalusta, veistos leijuu
   (Louvren Nike 20.10.). Tarkista jokainen veistospaikka GLB:tä vasten.
3. **Henkilöt ja eläimet ovat tilattuja malleja (Raamattu 2.182, 7.15, 11.7):** Codex tekee Tripo-mallit ja luurangot; Lavastaja kokoaa,
   mitoittaa (seisova 1,68–1,78 m, istuva tuoleineen 1,32 m), sijoittaa ja liikuttaa. Hyväksytyn mallin saa ladata (Raamattu 11.6).
   - Liikkuva henkilö tarvitsee luurangon ja leikkeet idle + walk. Kävelytahti mitataan glb:stä (askelsykli ja kesto Blenderissä).
   - Kävely ja väistö: Ytimen `MuseoKavijat`. Paikallaan olevat henkilöt ovat simulaatiolle kiinteitä esteitä (`LisaaKiintea`).
   - Kaksi erillistä simulaatiota samassa osassa eivät näe toisiaan: kaikki saman salin kävelijät samaan simulaatioon.
4. **Tilattu malli peliin asti (yksi lista per malli):** posti → toimitus T7:llä → tarkistus (kolmiot, luuranko, leikkeet, mittakaava)
   → media-paketti `_valmiit/<nimi>-vienti-<pvm>/` (LAHTEET.md, SHA256SUMS) → JU:n vienti → kytkentä proto-haaraan → **oletuksena päällä**
   → NS:n runkoon → PT:n kuvapari. Kirjaa luovutukseen, mikä vaihe on kesken; muuten malli jää ämpäriin käyttämättä.
5. **Luovutus seuraavalle:** proto-haara + SHA NS:lle (merge-pyyntö, juna), media JU:lle, reittien muutokset LS:lle, kuva PT:lle.

**Valmiin tarkistuslista**
- [ ] Jokainen tilattu henkilö, eläin ja esine on pelissä näkyvissä oletuksena (lippu päällä), ei vain mediassa.
- [ ] Veistoksilla jalusta GLB:ssä tai mallina; mikään ei leiju (tarkista ylhäältä ja sivulta).
- [ ] Kävelijät eivät kulje esteiden, toistensa eivätkä kameran läpi (Ytimen testi + `museo henkilot tila`).
- [ ] Linssit-testit ja `tyokalut/tarkista.sh` vihreänä (älä aja niitä samaan aikaan: sama dll).
- [ ] Mac-esikatselu (Blender, sali-GLB + media) PT:lle kuvaparina, kun PT pyytää; ei simukuvia (Raamattu 9.1).

**Opit (20.10.2026 asti)**
- Louvren Tripo-henkilöt olivat mediassa kaksi päivää, mutta `MuseoHenkilot.Paalla = false` piti ne pois pelistä. Kehityslippu
  käännetään päälle samassa erässä, jossa media viedään.
- Hiusten takia hylätty malli korvataan uudella ehdokkaalla samalla tunnuksella (k1); vanhaa ei poisteta mediasta.
- Mac-esikatselussa salimallissa ei ole tauluja; kerro se kuvaparin tekstissä.
- k1:n paikat kuvapariin otetaan Ytimen simulaatiosta väliaikaisella testillä (ei committia), jotta kuva vastaa peliä.

## 8. TÄYDENTÄÄ: Linssiseppä (PARITEETTITESTI, omistaja 23.53)

*(Pakollinen. PT:n toimeksianto: uuden maan museolla on samat tiedostot ja kentät kuin Alankomailla, ja jokaiselle lattialle
oma askelääni. Alankomaiden museokansion tiedostot `Resources/Museo/alankomaat/`: `teokset.json`, `sali.json`, `huoneet.json`,
`kierros.json`, `kohdat.json`, `kohtazoom.json`, `veistokset.json`, `nayttelykuvat/` ja lähestymisaineisto (`lahestyminen.json`
+ kuvat). Täydentää Linssiseppä: testin runko (tiedostot, pakolliset kentät, koneellinen vertailu maiden välillä), askeläänten
lattiakohtainen kartoitus ja tulokset. Tilanne 17.10. nähtävä vertaamalla Ranskan kansiota Alankomaihin, esim. Ranskan
`kohdat.json` odottaa vientiä; Sisältökirjuri toimittaa kohdat docsiin.)*

## 9. Äänittäjä

Kertojan äänet museon kohteille. Putki, mallit ja lupa: `kertojan-teksti-ja-aani.md`; erityisesti:

- **Lukutarkistus ensin:** museon ympyrät lukee peli suoralla lukijalla (Louvren 152 ympyrää 17.10.), joten lupaa ei pyydetä ennen kuin
  kytkijä on vahvistanut, että esiäänitys tarvitaan.
- **Ääni ja malli:** William `oae6GCCzwoEbfc5FHdEu`, `eleven_v4_turbo`, nopeus vain `speed`-asetuksella, `language_code fi` (vieraat nimet vievät
  muuten lukijan ranskaan).
- **Merkkimäärä** lasketaan puhutusta tekstistä (luvut sanoiksi); vieraiden nimien ääntämysvihjeet etukäteen (esim. `orsay-rf-2027b`).
- **Portti ja vienti:** `aaniportti.py`, `vie-paketti.sh`, `LAHTEET.md`, SHA256SUMS, ajat- ja manifestirivit; vanha luenta `mykistetyt`-kenttään,
  kunnes uusi on kytketty. Uusintaotto vain uudella luvalla ja uudelle polulle.
- **Askeläänet lattioille** tehdään yhdessä Linssisepän kanssa Raamattu 5.27 -tavalla (Soundly / Sonniss ensin, sokkokuvaus); lattia ja kenkä
  sovitaan ennen hakua, koska väärä ääni (puuaskel = korkokengät) huomataan vasta pelissä.

**Tarkistuslista**
- [ ] Lukutarkistus tehty, lupa KK:n rivillä ja pitää.
- [ ] Ääni, malli ja `fi` oikein; ääntämysvihjeet tehty; Gemini sokkona ennen omistajaa.
- [ ] Portti läpi, vienti, manifestirivit kytkijälle ja kuitattu, `mykistetyt` poistettu.

## 10. Opit ja retrospektiivi (kirjataan jokaisen työn lopussa)

Muoto: päivä, työ — mikä toimi, mikä hidasti, mikä muuttui pohjassa.

*(Rivit 17.10.2026 on siirretty lokista ja muistista omistajan päätöksellä 19.10. klo 15.35; uusia sääntöjä ei ole.)*

- **17.10.2026, Louvren lähestymispuhe ja salien alut.** Hidasti: puhe tehtiin ilman `language_code: fi`, ja suomi äännettiin
  ensimmäisessä lauseessa ranskan aksentilla (omistajan havainto 22.54). Omistaja: uusitaan vain alut; 47 riskiottoa
  (24 411 mrk) jätettiin ennalleen, uusittiin vain lähestymispuhe (ranska-louvre-puhe-2) ja salien avaukset
  (ranska-sali1-avaus ym.), louvre-inv-* ennallaan. Muuttuu: suomi pakotettuna jokaisessa suomenkielisessä äänigeneroinnissa
  (ks. `kertojan-teksti-ja-aani.md`, kultainen polku 6). Lähde: loki "AANIGENEROINTI: SUOMI AINA PAKOTETTUNA; LOUVREN ALUT
  UUSITAAN (17.10.2026 klo 23.05)".
- **17.10.2026, museoskenaarion simu meni kolmesti uusiksi.** Hidasti: lähestymiskuva peitti salin, koska `linssi museo
  lahestyminen pois` annettiin liian myöhään, ja `ui museolista valitse n` vain korostaa rivin. Muuttuu: `lahestyminen pois`
  ENNEN `linssi linssi taidemuseo`; näyttelyyn siirrytään vierityksellä, `tap-teksti <nimi>` ja `tap-teksti Siirry
  näyttelyyn`; kuva-arkki katsotaan aina ennen OK-raporttia. Lähde: muisti museo-skenaario-napautukset.
- **17.10.2026, Ranskan i-kortin avaimet (#4745).** Hidasti: `taiteilijat.json`:n neljä avainta poikkesi `teokset.json`:n
  kirjoitusasusta, joten kortti ei olisi löytänyt kuvia. Muuttuu: avainten koneellinen vertailu on valmiin määritelmän kohta.
- **17.10.2026, Ranskan kohdat (152 ympyrää, 51 teosta).** Kuusi Sonnet-agenttia katsoi kuvat rinnakkain (~10 min); paikat
  tarkistettiin piirtämällä merkit kuvan päälle. Hidasti: puheen merkkimäärä (20 065) ylitti ~10 000 lupaan. Muuttuu: merkkimäärä
  ilmoitetaan PT:lle ennen ääniä (kultainen polku 7).
- **16.10.2026, museon i-kortin data (Alankomaat 64, Ranska 51).** Muotokuvia löytyi 40 PD/CC0, 14 tekijää ilman varmaa kuvaa;
  12 lyhyttä pehmennettiin; 12 kertoja-/kuvatekstikorjausta maksoi 6 uusintaääntä. Muuttuu: faktatarkistus ennen lupaa
  (kultainen polku 9).
- **13.10.2026, Ranskan aineistoselvitys.** Yksikään ranskalainen kansallinen museo ei salli kuviensa kaupallista käyttöä; ainoa
  avoin lähde on Paris Musées (CC0), ja muille teoksille ehdotus oli Commonsin PD-Art. Muuttuu: kuvalähteen riskipäätös omistajalta
  ennen latausta (kultainen polku 2).
- **9.10.2026, Alankomaiden aineistoselvitys.** Rijksmuseum on ainoa lähde, joka täyttää linjan sellaisenaan (PDM, CC0); Van Gogh,
  Hals ja Mauritshuis tulivat Commons-kopioina omistajan kortilla 10.10. Muuttuu: selvitys kirjaa lisenssit rivi riviltä (liitteet).

## 11. Lähteet

`docs/raportit/taidemuseo-alankomaat-aineisto-20261009.md`, `docs/raportit/linssi-taidemuseo-suunnitelma-20260924.md`,
`docs/raportit/museoteokset-ikortti-20261016.md`, `docs/raportit/ranska-kohdat-20261017.md`,
`docs/kohtaukset/museoteokset/tyokalut/ohje-agentille.txt` ja `ohje-kohdat.txt`, `docs/moduulit/tuotantopohjat/kertojan-teksti-ja-aani.md`;
Raamattu: TAIDEMUSEO-LINSSI (MAITTAIN, ALANKOMAAT ENSIN; KUVALÄHTEET JA PATSAAT; TAIDEHALLIN OHJAUS; TEKSTIT JA INFO; I-KORTTI JA
YMPYRÄT; ITALIA; KREIKKA), MUUT MAANOSAT VÄHITELLEN, TUOTANTOPOHJAT, TUOTANTOPOHJIEN SANASTO. Ranskan aineistoselvitys (13.10.2026):
`git show 08f9e3d00:docs/raportit/taidemuseo-ranska-aineisto-20261013.md` (ei mainissa).
