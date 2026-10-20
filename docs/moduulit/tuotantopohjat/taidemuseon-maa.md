# Tuotantopohja: taidemuseon maa

*(LUONNOS 17.10.2026, Sisältökirjuri, PT:n toimeksianto. Raamattu, TUOTANTOPOHJAT ja TUOTANTOPOHJIEN SANASTO. Tähän on koottu
vain nykyisten ohjeiden ja luovutusten opit (Alankomaat ja Ranska); uusia sääntöjä ei ole. Jos tämä ja Raamattu ovat
ristiriidassa, Raamattu voittaa. Sisältö-osuuden omistaa Sisältökirjuri; muut osat täydentävät tekijänsä otsikoilla
"TÄYDENTÄÄ: <rooli>". PT hyväksyy muutokset. Ei vielä dokumenttikartalla.)*

**Tavoitteen muoto (Raamattu 4.21, omistaja 19.10.2026 klo 15.32):** ennen työtä tavoite määritellään yhtä selvästi kuin grafiikassa havainnekuvalla. Tässä putkessa: GRAFIIKKA havainnekuva salista; KAMERA viitevideo tai kuvakäsikirjoitus ennen koodausta; UUDET TEKSTITYYPIT muutama esimerkki pelinäkymässä ennen koko erää. Omistajalle tuodaan vain uudet asiat ja makuvalinnat; muut tavoitteet hyväksyy PT.

Taidemuseon maa = yhden maan oma museo taidemuseo-linssissä (Raamattu, TAIDEMUSEO-LINSSI; vain natiivissa): maan teokset
seinillä, patsaat huoneissa, opastettu kierros kertojan äänellä tai vapaa kulku, i-kortti ja ympyrät, salien avaukset.
Ensimmäinen maa on Alankomaat, toinen Ranska (Louvre, Orsay, Marmottan, Rodin); Italia vasta omistajan käskystä.
**Napit, tyylit ja toimintalogiikka (omistaja 20.10.2026 klo 22.58; Raamattu 2.70 ja kohta 2 UI-POHJAT):** pohja ei kuvaa omia nappeja, värejä eikä sisään- ja ulostuloa. Käytä tyylikirjaa (`tools/tyylikirja.mjs`, `tyylikirja/`) ja yhteisiä linssien ja pelien sääntöjä; puuttuva pohja kysytään PT:ltä.

**Pohja kattaa koko työn ideasta junaan (omistaja 20.10.2026 klo 22.53, Raamattu 4.21):** aineisto ja tekstit, salin
rakentaminen (Lavastaja), valo (Valoseppä), äänet (Äänittäjä), kytkentä (Linssiseppä, Natiivi-UI) ja vienti junaan (Julkaisija).
Työ alkaa tavoitekuvasta (havainnekuva salista), ja omistaja näkee tavoitekuvan ja valmiin salin pelikuvana rinnakkain KK:n
kautta ennen junaa. Pääkaupungin avaus on oma pohjansa (`paakaupungin-avaus.md`).

**Rajaus:** maittain, yksi maa kerrallaan. Uusi maa on Euroopassa, kunnes omistaja aloittaa muut maanosat (MUUT MAANOSAT VÄHITELLEN).
Italian museot: omistajan kortti 14.10. "Mukaan myös Italian museot, Italia pois App Storesta", ajoitus "Ei vielä".
Kreikan valtion muistomerkit piilotetaan Kreikan App Storessa (storefront GRC).

## 1. Tuotantoputki ja roolit

```
Sisältökirjuri: aineistoselvitys (salit, teosehdokkaat, kuvalähteet ja riskit, galleriatyyli)
  → PT + omistaja: lähde- ja riskipäätökset (kortti) → teosluettelo (PT: pudotukset)
  → Linssiseppä: teokset.json + sali.json-paikat + huoneet.json → kuvat (Commons PD-Art, ASTC-paketit)
  → Sisältökirjuri: kertojan tekstit (teokset, museon ja salien avaukset), i-kortti (taiteilijat + lyhyt), kohdat.json
  → riippumaton faktatarkistus → PT → KK hyväksyy omistajan puolesta yhtenä eränä
  → Lavastaja: sali tavoitekuvan mukaan → Valoseppä: valo → äänet vain omistajan kortilla (Äänittäjä)
  → kytkentä (Linssiseppä / Natiivi-UI) → pariteettitesti → tavoitekuva ja pelikuva rinnakkain omistajalle → Julkaisija
```

| Vaihe | Rooli | Tulos |
|---|---|---|
| 0. Selvitys | Sisältökirjuri (Sonnet-tutkijat) | `docs/raportit/taidemuseo-<maa>-aineisto-<pvm>.md` |
| 1. Päätökset | PT → KK → omistaja | kuvalähteet, riskit, sali- ja teosrajaukset |
| 2. Teosluettelo ja data | Linssiseppä | `teokset.json`, `sali.json`, `huoneet.json`, `kierros.json`, `veistokset.json` |
| 3. Kertojan tekstit | Sisältökirjuri | teosten kertojatekstit, museon ja salien avaukset; KK hyväksyy yhtenä eränä |
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
   sopimusriski, ei tekijänoikeus. Omistaja on hyväksynyt tämän riskin kaikkien maiden museokuville kuten Ranskassa
   (20.10.2026 klo 22.53, Raamattu 2.123 MUSEON EHDOT): uutta korttia ei kysytä. Kortti vain uudesta riskityypistä.
3. **Teosluettelo kokonaisuutena.** Maan teokset koko maasta, Alankomaiden tasolla (noin 60 teosta, maalaukset, grafiikka,
   valokuvat; patsaat omana siipenään). Heikoimmat kuvat ja epäselvät attribuutiot nostetaan PT:lle ennen luetteloa
   (esim. Ranskassa Tepidarium pois, Chicago ja Washington pois).
4. **Kertojan teksti ja avaukset.** Teoksen kertojateksti on pieni tarina (kuvateksti ja kertoja eivät toista toisiaan);
   museon ja salien avaukset ovat omia tunnuksia. Ne EIVÄT mene omistajan Tekstit-osastoon: KK hyväksyy koko maan
   museotekstit yhtenä eränä riippumattoman faktatarkistuksen ja PT:n tarkistuksen jälkeen (Raamattu 2.123 MUSEOTEKSTIT). Kaikki faktat kahdesta
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
- [ ] Kertojan tekstit, museon ja salien avaukset tarkistettu (riippumaton + PT) ja KK:n hyväksymä yhtenä eränä (luku 5).
- [ ] `taiteilijat.json`: jokainen `tekija` löytyy avaimena (tarkista koneellisesti `teokset.json`:ta vasten), kuvat 256², lisenssi ja lähde.
- [ ] `lyhyt-<maa>.json`: jokaiselle teokselle faktat tai tyhjä lista ja syy; tunnukset täsmäävät `teokset.json`:iin.
- [ ] `kohdat-<maa>.json`: 2–4 ympyrää per teos, pituudet rajoissa, ei toistoa kertojasta, ei alastomuutta.
- [ ] Riippumainen tarkistus tehty, KORJAA-rivit korjattu, EPÄVARMA-rivit varovaisemmaksi tai pois.
- [ ] Puheen merkkimäärä (puhutussa muodossa) ilmoitettu PT:lle; ääniluvat KK:n suoralla rivillä.
- [ ] Pariteettitesti ajettu (luku 8) ja tulokset kirjattu.
- [ ] Luovutusraportti: aineistopolut, heikoimmat kohdat, pudotetut väitteet, huomiot Linssisepälle ja Natiivi-UI:lle.
- [ ] Tavoitekuva ja valmis sali pelikuvana rinnakkain näytetty omistajalle KK:n kautta ennen junaa.
- [ ] Retrospektiivi kirjattu luvun 10 oppeihin.

## 4. Poikkeaminen

Poikkeus kultaisesta polusta vain PT:n hyväksynnällä; poikkeama kirjataan joko uudeksi poluksi tai jätetään pois.

## 5. Hyväksyntäpolku

| Sisältö | Hyväksyjä | Perusta |
|---|---|---|
| Uusi maa, sali tai uusi riskityyppi | omistaja (kortti PT:n kautta) | Raamattu, KUVALÄHTEET JA PATSAAT (10.10.), ITALIA (14.10.) |
| Museon ehtojen riski (Commonsissa vapaa, museo kieltää kaupallisen) | hyväksytty kaikille maille | omistaja 20.10. 22.53, Raamattu 2.123 |
| Teosluettelo, pudotukset | PT | Ranskan luettelo 13.10. |
| Kertojan tekstit, museon ja salien avaukset | KK omistajan puolesta, yhtenä eränä riippumattoman ja PT:n tarkistuksen jälkeen | omistaja 20.10. 22.53 "sinä hyväksyt", Raamattu 2.123 |
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

## 7. Valoseppä ja Lavastaja (ent. Linnanrakentaja)

*(Valoseppä: kohdevalot, kehysten ja seinän valaistus, heijastukset ja galleriatyylin värit (esim. Louvren Salle des États
syvänsininen, Orsayn antrasiitinharmaa). Linnanrakentaja: salin rakenne ja proseduraalinen runko, kehykset, patsaiden paikat,
varjojen leivonta, julkisivut ja lähestymiskuvat. Täydentävät Valoseppä ja Linnanrakentaja.)*

### 7.1 Valoseppä: kohdevalot, kehysten ja seinän valo, heijastukset, galleriatyylin värit

Valo alkaa Lavastajan salista ja loppuu kuvapariin, jossa salin pelikuva on tavoitekuvan rinnalla. Koodi proto-gitissä:
`Linssit/Ydin/Museo/MuseoValo.cs` (kattokeila), `Linssit/Unity/MuseoPaivanvalo.cs` (globaalit säädöt ja kattoikkunat),
`Linssit/Unity/MuseoRakennus.cs` (teos- ja kehysmateriaalit), varjostin `Resources/Varjostimet/MuseoValaistu.shader`, data
`Resources/Museo/<maa>/sali.json`. Valo, sävy ja ilmakehä kulkevat Valopohjan kautta (valovahti `tyokalut/tarkista.sh`).

**Työvaiheet (tässä järjestyksessä):**
1. **Lähtötiedot.** Tavoitekuva (havainnekuva salista), museon omat salikuvat ja Sisältökirjurin galleriatyyli (seinän väri,
   lattia, katto tai kattoikkunat, valon lämpö). Lavastajan `sali.json`: osat, kattoikkunat, teospaikat ja kehysprofiilit.
   Tarkista rungosta (natiiviseppa/juna-NNN), mitkä valot ja säädöt ovat jo päällä (`museo … tila`).
2. **Galleriatyylin värit datana.** Seinä-, lattia- ja kehysmateriaalit `sali.json`:n väreinä (sRGB, mitattu museon kuvista
   valaistulta pinnalta), ei vakioina koodissa. Tarkista myös kehysprofiilin pienet osat (esim. `rako` = kehyksen sisäreuna
   kankaan päällä): tumma sävy näkyy pelissä varjona.
3. **Kohdevalot.** Jokaiselle paikalle `valokeila` `sali.json`:ssa (paikka, suunta, puolikulma, reunahäive, lx, kelvin;
   tavallisesti 120–200 lx ja 3000–4200 K, Yövartio 320 lx); kattokeila tulee edestä ylhäältä noin 30° pystystä (`MuseoValo.KattoKeila`). Maalaus
   on seinää kirkkaampi ja sali tummuu reunoilta (Raamattu 2.131). Kangas valaistaan tasaisesti teoksen keskipisteen valolla
   (`_TeosKeski`), ettei iso kangas (Yövartio) tummu reunoilta. Mitoita keilan kantama salin korkeimman katon mukaan.
4. **Seinän ja kehyksen valo.** Seinäpesu teoksen ympärillä (`MuseoPaivanvalo.SeinaSpotti`, Gauss-leveys teoksen koon
   mukaan, myös läikkä lattiaan seinän tyvelle). Kehyksen huulen varjo kankaalla valon suunnan mukaan
   (`MuseoPaivanvalo.KangasVarjo`): yläreuna varjoisin, sivut kevyet ja kapenevat alaspäin, alareunassa ei varjoa (omistaja
   20.10. 19.47). Kehysten pehmeä varjo seinälle on leivottu (Lavastaja, Raamattu 2.133).
5. **Heijastukset.** Lattia heijastaa kevyimmällä hyvältä näyttävällä tavalla (`MuseoPaivanvalo.Heijastus`); kehysten lakka
   kiiltää (`_KiiltoValo`) ja lehtikulta heijastaa ympäristöä. Ei reaaliaikaisia varjoja eikä SSAO:ta (Raamattu 2.133).
   Kattoikkunasalit saavat päivänvalon `MuseoPaivanvalo`n osista.
6. **Rae ja sävy.** Museonäkymän rae ja kankaan oma hento rae (`MuseoPaivanvalo.RaeTeos`) ennen sävykäyrää; profiili Valopohjasta.
7. **Kuvapari ja mittaus.** A/B samasta pysähdyksestä (`museo teos <tunnus>` → katseluasento; säätö QA-komennoilla
   `museo seinaspotti|kangasvarjo|raeteos|pinnat <x>`). Katso itse rajattuna: reunat, puhki palaminen, sävy tavoitekuvaa vasten.
   GPU-mittaus isolla iPadilla Laitetestaajalla; simu harvoin (Raamattu 9.11).
8. **Luovutus seuraavalle.** Proto-haara ja sha Natiivisepälle (juna), kuvapari PT:lle, valon suunta Lavastajalle leivontaa
   varten (jos keila muuttui), muutetut `sali.json`-värit Linssisepälle tiedoksi. Luovutuksessa: QA-komennot, mitatut luvut,
   avoimet säädöt.

**Valmiin tarkistuslista (Valoseppä):**
- [ ] Jokaisella teospaikalla valokeila; maalaukset seinää kirkkaampia, sali tummuu reunoilta, ei puhki palavia kankaita.
- [ ] Galleriatyylin värit `sali.json`:ssa ja tavoitekuvan sävyssä; ei uusia värivakioita koodissa (valovahti vihreä).
- [ ] Kehyksen varjo kankaalla: yläreuna varjoisin, sivut kevyet, alareuna ilman tummaa raitaa (myös kehyksen `rako`).
- [ ] Kuvapari ENNEN/JÄLKEEN samasta pysähdyksestä katsottu itse ja PT:llä; GPU isolla iPadilla mitattu.
- [ ] `tyokalut/tarkista.sh` ja `sh Linssit-testit/kaanna.sh Museo` vihreänä.
- [ ] Valon osuus tavoitekuvan ja pelikuvan rinnakkaisesta kuvasta valmis ennen KK:ta.

**Opit (20.10.2026 asti):**
- Tumma raita maalauksen alareunassa oli kehysprofiilin `rako`-materiaali (sRGB 38/28/18), ei varjostimen varjo: ensimmäinen
  korjaus (varjo pois) ei muuttanut kuvaa. Selvitä ensin, mikä kappale ja materiaali piirtää pikselin, sitten korjaa.
- Seinäpesu ei näkynyt Louvren korkeissa saleissa (kattokeila 9–14 m taulusta, varjostimen etäisyysraja liian pieni):
  mitoita rajat korkeimman salin mukaan ja tarkista vaikutus A/B-parilla (S0 = S1 paljastaa).
- Laitetestaajan tiedostokanavassa museokomennot menevät `linssi-komento.txt`:hen ilman `ui linssi` -etuliitettä; Louvren
  sarja: Amsterdam-peli → `museo maa ranska` → taidemuseo → Louvren klassikot → Siirry näyttelyyn → `museo teos <tunnus>`.
- Uusi värivakio varjostimessa nostaa valovahdin lähtötasoa: tuo väri datasta (`sali.json` tai Valopohja) tai johda se
  olemassa olevasta.

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

## 8. Linssiseppä: data, kytkentä ja pariteettitesti

*(Linssiseppä 20.10.2026, PT:n toimeksianto (omistaja 22.38, tuotantopohjat sitoviksi); Alankomaiden ja Ranskan museotyön opit, ei uusia
sääntöjä. Koodi proto-gitissä: `Linssit/Ydin/Museo/` (MuseoKierros*, MuseoData, MuseoMaa) ja `Linssit/Unity/Museo*.cs`, testit
`Linssit-testit/Testit/Museo*Testit.cs`.)*

**Työvaiheet (tässä järjestyksessä):**
1. **Maan kansio ja polut.** Uusi maa saa kansion `Resources/Museo/<maa>/` ja rivin `MuseoMaa`-luokkaan; koodissa ei ole maan nimeä
   kovakoodattuna (`MuseoMaaTestit.EiKovakoodattuaMaata`). Salin rakenne, esteet ja penkit tulevat `sali.json`:sta (`glb`, `esteet`,
   `penkit`), ei vakioista.
2. **Data PT:n hyväksymästä teosluettelosta.** `teokset.json` (tunnus, `tekija` täsmälleen kuten `taiteilijat.json`:n avain, mitat,
   inventaarinumero, krediitti, `lahde_url`), `sali.json`:n paikat (osa, seinä, `lattia`, kehysprofiili), `huoneet.json` (salitekstit ja
   avaukset tunnuksina), `kierros.json` (pysähdysjärjestys), `veistokset.json` (mitat vain varmistetuilla kappaleilla). Sisältökirjurin
   tekstit tuodaan tunnuksilla; Linssiseppä ei muotoile faktoja (pohja `uusi-linssi.md`, kultainen polku 12).
3. **Kuvat.** Commonsin PD-Art-kuvat ASTC-ruutupaketteina; yli 8192 px:n teoksille ruutupyramidi paketin `teos.json`:sta, ettei
   lähikuva zoomaudu kehyksen sisällä väärässä koossa (Mona Lisa, 19 Ranskan teosta 20.10.). Ylivalotus tarkistetaan mittaamalla
   lähdekuvaa vasten (Alankomaiden 19 teosta 15.10.).
4. **Kehykset ja kyltit.** Kehysprofiili paikalle `sali.json`:ssa (Lavastajan mitat); kuvan oma kehys peitetään, ettei kehyksiä ole
   kahta (La Belle Jardinière, kaariteos); kylttien teksti (nimi, tekijä, vuosi) samasta lähteestä kuin nimikyltti, generaattorilla.
5. **Kierros ja kamera.** Kierros kulkee Kamerajohtajan kautta (`uusi-linssi.md` luku 3): saapuminen, lähestyminen yhtenä jatkuvana
   zoomina kehysten täyttämään lähikuvaan, Auto Zoom ja kertojan kohdat (`kohtazoom.json`), ulosnipistys ja vapaa kulku.
   Pitkät siirrot mustan alla (siirtokartta), ei pitkää liukua.
6. **Lähestyminen ja äänet.** `lahestyminen.json` + Codexin pysty- ja vaakakuvat; askeläänet ja lähestymisäänet datasta
   (`MuseoMaaTestit.LahestymisAanetDatasta`). Kertojan äänet Äänittäjältä manifestin kautta.
7. **Pariteettitesti (kohta alla) ja todistus**, sitten Natiivisepälle junaan. Tripo-hahmot (katsojat, kävelijät) tekee Lavastaja;
   Linssiseppä tarkistaa, ettei opaskierroksen reitti tai kuvakulma muutu (kävelijät väistävät samaa kuvakiilaa kuin MuseoElama).

**Pariteettitesti (uusi maa = Alankomaiden taso, omistaja 16.10. 23.53):**
- **Tiedostot:** `teokset.json`, `sali.json`, `huoneet.json`, `kierros.json`, `kohdat.json`, `kohtazoom.json`, `veistokset.json`,
  `nayttelykuvat/`, `lahestyminen.json` + lähestymiskuvat (pysty ja vaaka) ja `kyltit/`, jos maalla on teoskyltit. Puuttuva tiedosto
  = ei pariteettia; tyhjä tiedosto vain PT:n luvalla ja syy kirjattuna.
- **Kentät:** jokaisella teoksella kuvateksti, krediitti, `lahde_url` ja `tekija_wikidata`; jokaisella teoksella `taiteilijat.json`-avain
  (koneellisesti); jokaisella paikalla `lattia`; jokaisella kierroksen pysähdyksellä kertojan tunnus tai kirjattu syy.
- **Koneellisesti:** `sh Linssit-testit/kaanna.sh Museo` (polut, ripustus, veistokset, kierros kertojalle, lähestyminen,
  Auto Zoom, kertojan kohdat lähikuvassa iPadin vaaka-, iPhonen vaaka- ja pystyruudulla, hyppyvartija koko kierrokselle iPhone + iPad).
  Maiden välistä tiedosto- ja kenttävertailua ei ole vielä yhtenä testinä: tee vertailu käsin tämän listan mukaan, kunnes se on
  `MuseoMaaTestit`-luokassa.
- **Askeläänet lattioittain:** `MuseoAskeleet` valitsee näytteen lattian mukaan (`parketti_*` → parketti, `kivi_marmori_ruutu` →
  marmori, muu → parketti). Kirjaa uuden maan lattiat (`grep '"lattia"' sali.json | sort | uniq -c`) ja ilmoita Äänittäjälle ne,
  joilla ei ole omaa näytettä. Tilanne 20.10.: Ranskan `kivi_hiekka` (1) ja `sora` (1) soivat parkettina, kunnes omat näytteet tulevat.
- **Tulos** luovutukseen: tiedostot ✓/✗, kenttien puutteet, lattiat ja niiden näytteet, testien määrä.

**Kamera ja zoom (opit 20.10. asti):**
- Pysähdyksen kesto on vähintään `PysahdysMinS` (6 s) ja pitenee kertojan mukaan; Auto Zoom pidentää lyhyttä pysähdystä, jotta
  lähikuva ehtii pitoajan. Testaa aina myös ilman kertojaa (`MuseoAutoZoomDiagTestit`): ilman sitä vika näkyy vain laitteella.
- Pystyruudussa kangas täyttää ruudun korkeuden ja leveä maalaus rajautuu sivuilta (omistaja 20.10. 19.56, kortti); vaakaruudussa
  sovitetaan kehyksen ulkoreuna. Kertojan alue, joka on ruutua leveämpi, näkyy pystyssä ruudun levyisenä keskeltä.
- Kameran nopeus on rajattu myös metreinä (`LiukuMaxMs` 4 m/s): iso maalaus kaukaa katsottuna liikutti kameraa 20–30 cm/ruutu.
- Pelaajan zoomaus tai liikuttelu ei vaihda tilaa; ulosnipistys pysähtyy pehmeästi koko tauluun ja vasta uusi ulosnipistys
  kysyy vapaasta kulusta (omistaja 20.10. 17.31).

**Valmiin tarkistuslista (Linssiseppä):**
- [ ] Pariteettitesti tehty ja tulos luovutuksessa; askeläänten puutteet Äänittäjällä.
- [ ] `kaanna.sh Museo` ja `tarkista.sh` 0 virhettä; hyppyvartija iPhone + iPad koko kierrokselle.
- [ ] Kuvat: ruutupyramidi yli 8192 px:n teoksille, ylivalotus mitattu, yksi kehys per teos.
- [ ] Auto Zoom ja kertojan kohdat testattu pysty ja vaaka, kertojan kanssa ja ilman.
- [ ] Natiivisepälle haara + sha; todistus vain simusäännön mukaan (omistaja 20.10. 11.45: uusi tekniikka, pyydetyt kuvat tai yöjuna).

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

## 9.5 TÄYDENTÄÄ: Natiivi-UI (salin näkymä, i-kortti ja ympyrät pelissä)

*(Natiivi-UI: museon käyttöliittymä natiivissa (i-kortti, ympyrät, kierroksen ohitus ja pysäytys, tekstitys), olemassa olevat
UI-pohjat, tarkistus iPhonella ja isolla iPadilla, pelikuvat tavoitekuvan rinnalle. Täydentää Natiivi-UI.)*

## 9.6 TÄYDENTÄÄ: Julkaisija (vienti ja juna)

*(Julkaisija: museopaketin vienti (ASTC-kuvat, äänet, data), käännös, simuvuoro ja junaan vienti, tarkistus ennen junaa:
tavoitekuva ja pelikuva rinnakkain on näytetty. Täydentää Julkaisija.)*

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
