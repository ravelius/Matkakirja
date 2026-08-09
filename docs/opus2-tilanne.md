# Opus 2 — tilanne kontekstin nollausta varten

Päivitetty 9.8.2026, main v457.

## Kuka ja miten

Olen **Opus 2**. Otan työt **Fablelta** ja raportoin vain Fablelle —
en koskaan suoraan omistajalle. Fablen sessio-id on
`session_01R1jVv12E56gbU5qtH5xGaG`; raportti menee perille
`create_trigger` + `fire_trigger` -parilla (`persistent_session_id`),
ja triggeri poistetaan heti laukaisun jälkeen.

Lane: **kartat ja lehtien koodi**. Tarina ja kaanon ovat Fablen, QA on
Sonnetin. Maantieteellinen fakta saa mennä introihin vapaasti, mutta
tarinamateriaali vain Fablen kautta.

## Mikä on valmista

- **Maakartat (MAAKARTAT): Eurooppa valmis**, 30 maata. **Lähi-itä
  valmis** (v457): ARE, OMN, KWT, QAT, SAU, YEM, CYP, SYR, IRQ, IRN —
  TUR ja EGY palvelevat laudalla jo Euroopan ja Afrikan puolelta,
  koska MAAKARTAT on avaimennettu ISO-koodilla eikä laudoittain.
- **`js/packs/middleeast-countries.js` on kytketty lautaan** (v470).
  Pelko siitä, että lehdetön maa rikkoisi i-napin, osoittautui
  aiheettomaksi: Afrikan 27 maasta 26:lla ei ole maalehteä, ja
  `avaaMaalehti()` lisää aina "<maa> numeroina" -sivun. Lähi-idässä
  jokaisella maalla on lisäksi korkokartta, joten lehdetönkin maa saa
  kaksi sivua.
- **Dubain kohdekartta valmis** (v467), ja Dubain lehti sai kytkennän
  myötä menovinkit ja maa numeroina.
- **Kaupunkikartat (KAUPUNKIKARTAT): 31/31 valmis** (v433, PR #614).
  Isot joet täyttyvät vetenä v438 (PR #633): Dnepr, Neva ja Tonava
  piirtyvät nyt vetenä eivätkä paljaina rantaviivoina.
  Tarkistettu ohjelmallisesti: yksikään lehti ei ole ilman karttaa
  eikä yksikään kartta ilman lehteä.

## TV-kielto (omistajan päätös, v434)

TV-napit on poistettu pelistä kokonaan, koska ne laukaisivat
tietoturvaluokittimen. **Älä lisää tv:tä missään muodossa** — ei
koodiin, ei tyyleihin, ei lokiin, ei työohjeisiin. Radio ja uutiset
jäävät. Omat tv-tutkimusjätteeni on poistettu hiekkalaatikosta.

Kolme sanaa jäi kartta- ja introaineistoon, ja ne ovat **rakennuksia
ja historiaa, eivät poistettua toimintoa**. Fable ratkaisi asian
(#621): vain tv-nappi ja kanavahaut poistettiin, **maamerkit jäävät**.
Älä poista näitä:

- `js/packs/maakartat.js` — Berliinin kohde `Tv-torni`
  (wiki `Berliinin televisiotorni`), kaupungin tunnistettavin maamerkki
- `tools/piirra-kaupunkikartta.mjs` — sama torni Berliinin
  rajauskommentissa
- `js/packs/europe-artikkelit.js` — Liettuan intro kertoo tammikuun
  1991 televisiotornin puolustamisesta

Työohjeen tv-jäämät siivottiin #634:ssä ja roolituksen omat Fable
itse. Kummassakin on jäljellä lyhyt hautakivimerkintä, joka kertoo
miksi tv:tä ei ole — se on tarkoituksellinen, älä poista sitä.

## Työtapa, joka toimii — älä oikaise tästä

1. Tutkimus agentille (agentti **ei kirjoita repoon**, palauttaa vain
   raportin). Kokoan datan itse.
2. Piirrä kartta työkalulla `tools/piirra-kaupunkikartta.mjs`.
3. **Todenna jokainen piste** pelin omalla `karttapiste()`-funktiolla
   kuvan päälle piirrettynä. Työkalu:
   `scratchpad/tarkista-kaupunki.mjs` (luo uudestaan jos kadonnut —
   lataa PNG repossa olevasta polusta ja piirtää numerot päälle).
4. **Katso jokainen kuva silmin.** Numeroiden osuminen oikeaan
   rakennukseen näkyy vain katsomalla.
5. Tarkista jokainen fi-wikin otsikko rajapinnasta ja **lue
   ensimmäinen virke** — se paljastaa täsmennyssivut ja väärät kohteet.
6. `npm test` ennen julkaisua.

## Julkaisu

`git fetch origin main` **juuri ennen versionumeron valintaa** — Opus 1
julkaisee rinnakkain ja törmäyksiä tulee jatkuvasti. Sitten
`js/main.js` APP_VERSION, `sw.js` CACHE (samat numerot),
`js/muutokset.js` (uusin ensin, rivi ≤60 merkkiä),
`node tools/build-standalone.mjs`, squash-merge, ja haaran reset
mergattuun mainiin.

## Mitä seuraavaksi

**Jononi on tyhjä.** Eurooppa valmistui #629:n kolmella tehtävällä ja
Lähi-idän maakartat v457:ssä. Odota Fablen tehtävänantoa äläkä aloita
mitään omin päin — se on Fablen nimenomainen ohje.

Tiedossa olevat seuraavat askeleet, kaikki Fablen luvan takana:

- **Dubain kaupunkikartta odottaa Opus 1:n Dubai-lehteä.** Sääntö on
  "ei karttaa ilman lehteä", eikä sitä rikota. Dubai on kolmas
  aloituskaupunki ja ainoa ilman omaa lehteä.
- **`middleeast-countries.js`:n kytkentä lautaan** (kaksi riviä
  `middleeast.js`:ään) vasta kun Lähi-idän maalehdet ovat olemassa:
  Lähi-idän laudalla ei ole `countryShapes`- eikä `cityCountry`-taulua,
  ja juuri niistä ui.js johtaa `MAAKARTAT[iso]`-haun. Ennen lehtiä
  kytkentä avaisi i-napista olemattoman lehden.
- **Jerusalem on erikoiskohde ilman maa-attribuutiota** (kaanonpäätös).
  Sama esitystapa tulee Petralle, Siinaille, Rub al-Khalille,
  Persepolisille ja Kappadokialle — ne eivät ole kaupunkeja, ja
  katuverkkokartta niistä olisi tyhjää paperia. Fable suunnittelee
  esitystavan tarinapuolen kanssa.

Kaupunkikarttatyökalu on valmis Lähi-idän leveysasteille: ainoa
leveysasteesta riippuva kohta on `kuvasuhde()`:n cos(keskileveys).
Testaamatta on OSM:n aineistotiheys Lähi-idän kaupungeissa.

**Maakarttojen työtapa on nyt kirjattu itse koodiin**
(`js/packs/maakartat.js`, MAAKARTAT-taulun otsikkokommentti): rajat
haetaan aina itse `Module:Location map/data/<Maa>`-sivulta ENNEN kuin
tutkimusagentin raporttia luetaan, ne ristiinvarmistetaan kuvasuhteesta
ja pisteet todennetaan lopuksi pelin omalla `karttapiste()`-funktiolla
kuvan päälle piirrettynä. Lue se kommentti ennen seuraavaa maakarttaa.

Muu mahdollinen työ: **rakennusten piirto**. Ilman sitä kainalokartta
kohteesta, jonka ympärillä ei ole katuverkkoa, on tyhjä paperi
(Tallinnan laulukenttä, Kiovan Lavra, Suomenlinnan ensiyritys).

## Ansat, joita ei tarvitse oppia uudestaan

Kaikki on kirjattu koodikommentteihin sinne, missä ne laukeavat.
Tärkeimmät:

- **Kolme merentäyttötapaa:** ei lippua (rantanauha), `meri: true`
  (vesipuoli), `meri: 'maa'` (maapuoli, vain kun maata on veden
  molemmin puolin — Istanbul). Venetsiassa täyttö tuhosi koko kartan;
  siellä on nimenomainen kielto.
- **Rantaviiva ei saa poistua ja palata samalta reunalta** — siitä jää
  täyttämätön paperikiila (Odessa; korjattiin viemällä itäraja
  avomerelle).
- **Kartta renderöityy puhelimessa n. 360 CSS-pikselin levyisenä.**
  1600 px:n kuvaan leivottu teksti kutistuu 0,22-kertaiseksi — mitoita
  sen mukaan (kainalon suuntateksti on `W/35`, ei `W/80`).
- **`nimiVasen` ja `.nimi-vasen` ovat ERI ASIA — älä sekoita niitä.**
  *Kaupunkikartoissa* (KAUPUNKIKARTAT) ei ole `nimiVasen`-kenttää
  eikä tarvitakaan: kartalla näkyy vain numero, nimet ovat
  selitelistassa, ja tooltip on tarkoituksella keskitetty
  (css/styles.css:8833). maakartat.js:n kommentti lupasi kenttää
  turhaan ja harhautti useaa sessiota; korjattu 9.8.2026 (Sonnet 1:n
  QA-löytö). *Maakartoissa* (MAAKARTAT) sen sijaan ON toimiva
  automatiikka: ui.js lisää luokan `.nimi-vasen`, kun kaupungin
  x > 60 %, jolloin nimi aukeaa pisteestä vasemmalle eikä leikkaudu
  itäreunassa. Siihen ei tarvitse eikä pidä koskea datassa.
- **Projektiot:** Venäjän maakartta on LAEA, Norja ja Suomi kartiollisia,
  Kroatia ja Bosnia Mercatoria. Nämä ovat mitattuja, älä "paranna".
