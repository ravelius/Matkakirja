> **ARKISTOITU 15.8.2026** — kertaluontoinen tilannekuva tai toteutettu suunnitelma. Ei sisällä voimassa olevia ohjeita; ne ovat Raamatussa (js/tyohuone-raamattu.js) ja sen dokumenttikartan tiedostoissa.

# Opus 2 — luovutustilanne karttasessiolle

Päivitetty 10.8.2026, main **v506**. Tämä tiedosto on kirjoitettu
tilinvaihtoa varten: toisen tilin uusi karttasessio voi jatkaa tästä
ilman edellisen session muistia. Kaikki luvut on tarkistettu ajamalla,
ei muistista.

## Kuka ja miten

Lane: **kartat ja lehtien koodi**. Tarina ja kaanon ovat Fablen, QA on
Sonnetin. Maantieteellinen fakta saa mennä introihin vapaasti, mutta
tarinamateriaali vain Fablen kautta.

Työt tulevat **Fablelta** ja raportit menevät **vain Fablelle**, ei
koskaan suoraan omistajalle.

**Raportointikanava (tilanne 10.8.2026): git.** `create_trigger`
jumittui toistuvasti lupakyselyyn ja kaatoi kontin kesken raportin.
Varareitti, jota myös Opus 1 ja Sonnet 2 käyttävät: kirjoita viesti
`docs/viesti-fable.md`:hen omalle haaralle ja pushaa. Tiedosto on
yhteinen postilaatikko — **lisää oma viestisi, älä poista muiden**.
Jos triggeri toimii uudessa kontissa, se on nopeampi; testaa kerran
lyhyellä kuittauksella äläkä jää odottamaan yli minuuttia.

## Mikä on mainissa (tarkistettu ajamalla 10.8.2026)

### Kaupunkikartat (KAUPUNKIKARTAT, `js/packs/maakartat.js`)

**38 kohdekarttaa.** Sääntö "ei karttaa ilman lehteä, ei lehteä ilman
karttaa" pitää yhtä poikkeusta lukuun ottamatta:

| lauta | kaupunkeja | lehtiä | karttoja |
| --- | --- | --- | --- |
| europe | 41 | 41 | 36 |
| middleeast | 29 | 3 | 3 |
| africa / suomi / maailma | — | 1 / 1 / 4 | 1 / 1 / 4 |

**Viidellä Euroopan kohteella on lehti mutta ei karttaa, ja se on
avoin kysymys Fablelle:** `alpit`, `sisilia`, `kreeta`, `lappi`,
`islanti`. Ne eivät ole kaupunkeja vaan alueita, ja katuverkkokartta
niistä olisi lähes tyhjää paperia — sama ongelma kuin Lähi-idän
erikoiskohteilla. Älä tee niitä nykyisellä työkalulla ilman Fablen
päätöstä esitystavasta.

Viimeisimmät erät: Tromssa (v482), Dubrovnik/Riika/Vilna (v484),
Oslo/Kööpenhamina (v485), Tallinnan ja Riian muurit + kujabugin
korjaus (v493).

### Maakartat (MAAKARTAT) ja maakyltit

- **Eurooppa ja Lähi-itä valmiit.** Kaikilla 12 Lähi-idän maalla on
  korkokartta (v457).
- **`middleeast-countries.js` on KYTKETTY lautaan** (v470,
  `countryShapes` + `cityCountry` `middleeast.js`:n map-oliossa).
  **Älä tee tätä uudestaan** — vanha ohje "kytke vasta kun maalehdet
  ovat olemassa" on kumottu: lehdetön maa ei riko mitään, koska
  `avaaMaalehti()` lisää aina "<maa> numeroina" -sivun. Tarkistettu
  Afrikan ennakkotapauksesta (27 maasta 26:lla ei ole maalehteä) ja
  ajamalla Kuwait selaimessa.
- **Maakyltti piirtyy kaupunkien päälle** (v474). Kyltti on nappi, ja
  se jäi ennen kaupungin nimen ja pelinappulan alle — omistaja löysi
  sen Ateenasta. Samalla mitattiin ja siirrettiin **23 maan ankkuria**
  (`countryShapes[iso].keskus`). Nykytila: yhdenkään maan i-nappi ei
  jää nimen alle, suurin jäljelle jäänyt nimipeitto on 4 %.
- Ruotsin ja Norjan ankkurit olivat jo ennestään maidensa
  monikulmioiden ulkopuolella. Ne eivät törmää mihinkään; tieto on
  kirjattu, jotta kukaan ei ihmettele.

## Seuraava iso erä: Lähi-idän kohdekartat

**Sääntö on ennallaan: kartta vasta kun lehti on mainissa.** Dubai on
tehty pilotti (v467): sen kartta rajaa vanhan kaupungin lahdelman
molemmin puolin, 2,8 × 2,4 km.

Lähi-idän 29 kaupungista:

- **3 valmiina**: Istanbul, Kairo, Dubai (lehti + kartta).
- **6 on erikoiskohteita** ilman maa-attribuutiota (Fablen
  kaanonpäätös): Jerusalem, Petra, Siinai, Rub al-Khali, Persepolis,
  Kappadokia. Ne EIVÄT saa kohdekarttaa nykyisellä työkalulla — ne
  eivät ole kaupunkeja, ja katuverkkokartta olisi tyhjä. Esitystapa on
  Fablen pöydällä.
- **20 odottaa lehteä**: Izmir, Ankara, Nikosia, Aleppo, Damaskos,
  Luxor, Medina, Mekka, Riad, Sana, Aden, Salalah, Masqat, Doha,
  Kuwait, Bagdad, Mosul, Tabriz, Teheran, Isfahan.

**Huomaa jonon todellinen tila:** Opus 1 kirjoittaa parhaillaan
Lähi-idän **maalehtiä** (ARE 4 aihesivua, EGY 8, TUR 6, OMN 2, QAT 2;
loput 0), ei kaupunkilehtiä. Kohdekarttajono on siis toistaiseksi
tyhjä, vaikka erä on nimetty. **Kysy Fablelta, alkaako työ kaupungeista
vai jostain muusta** — älä oleta.

## Reseptit

### Uusi kohdekartta

1. Lisää rajaus `tools/piirra-kaupunkikartta.mjs`:n `KAUPUNGIT`-tauluun
   ja **kirjoita perustelu kommenttiin**. Ohje on 5–8 km, mutta
   pienempi on oikein, kun kaupunki itse on pieni (Dubrovnik 0,93 km,
   Dubai 2,8 km). Perustelu estää sen, että joku "korjaa" rajauksen.
2. `NODE_USE_ENV_PROXY=1 node tools/piirra-kaupunkikartta.mjs <kaupunki>`
   (kontissa Noden fetch tarvitsee tuon muuttujan).
3. Lisää `KAUPUNKIKARTAT`-merkintä `js/packs/maakartat.js`:ään:
   `polku`, `lahde`, `rajat`, `esittely` (2 kappaletta), `kohteet`
   (yleensä 6, numerointi pohjoisesta etelään).
4. **`node tools/tarkista-karttapisteet.mjs <kaupunki>`** — kertoo,
   osuuko piste veteen.
5. **Katso kuva lehdessä selaimessa**, ei vain tiedostona.
6. `node --test tests/*.test.mjs`, `node tools/build-standalone.mjs`.

### Julkaisu

**Versionosto aina työkalulla:** `node tools/uusi-versio.mjs "Rivi"`.
Se hakee mainin juuri ennen valintaa ja kirjoittaa numeron kolmeen
paikkaan. Käsin tehdyt nostot tuottivat 9.8. kaksi numerotuplaa. Rivi
≤ 60 merkkiä. Sen jälkeen build, testit, squash-merge ja haaran reset
mainiin.

Rinnakkaisia julkaisijoita on 3–4, joten **rebase-konflikti
versiotiedostoissa on normaali**: ota mainin versio (`--ours`
rebasen aikana), aja `uusi-versio.mjs` uudestaan ja buildaa.

## Omat työkalut (molemmat repossa, käytä niitä)

**`tools/tarkista-karttapisteet.mjs <kaupunki> [pisteet-json]`**
Lukee kartan PNG:stä pikselin värin jokaisesta kohteesta pelin omalla
`karttapiste()`-funktiolla ja kertoo, osuuko piste veteen. Toinen
argumentti on `[[nimi,lat,lon],…]`, kun pistettä vasta etsitään —
käytännössä paras tapa hakea kohteelle kelvollinen koordinaatti.
Lukee **kiekon** eikä yhtä pikseliä: yksi pikseli antoi vääriä osumia,
koska paperin ja kadun pehmennetty reuna osuu veden sävyn lähelle.
"VESI" ei aina ole virhe — silta, majakka ja satama-allas ovat
oikeutettuja poikkeuksia, ja ne on listattu työkalun ohjeessa.

**`tools/tarkista-maakyltit.mjs [lauta] [--ehdota]`**
Piirtää jokaisen maan kyltin pelin omalla koodilla ja mittaa, kuinka
suuri osa siitä jää kaupungin nimen tai merkin alle. `--ehdota` etsii
vapaan ankkurin maan monikulmion sisältä. Nostaa oman palvelimensa,
joten sen voi ajaa sellaisenaan. **Aja heti kun uusi lauta saa
maatiedot** — se olisi löytänyt Ateena-vian ennen omistajaa.

Kumpikaan ei korvaa silmää: ne eivät näe, meneekö numeroympyrä toisen
päälle tai näyttääkö kyltti nurkkaan työnnetyltä.

## Ansat, joita ei tarvitse oppia uudestaan

### fi.wikipedia

Tarkista **jokainen** otsikko rajapinnasta ja lue ensimmäinen virke.
Nämä neljä näyttivät oikeilta mutta eivät olleet:

- **`Polaria`** on täsmennyssivu → `Polaria (akvaario)`.
- **`Mustapäiden talo`** on täsmennyssivu → `Mustapäiden talo (Riika)`.
- **`Vapaudenpatsas`** on **New Yorkin** patsas. Riian patsaasta ei ole
  artikkelia.
- **`Amalienborg`** on **ruotsalainen panimo**, ei Tanskan
  kuninkaanlinna. Linnasta ei ole artikkelia.
- **`Deira`** on anglosaksinen kuningaskunta Pohjois-Englannissa, ei
  Dubain kaupunginosa.
- **`Pieni merenneito`** on satu; patsas on `Pieni merenneito (patsas)`.

Talon sääntö: kohteen wiki on artikkeli **juuri siitä paikasta**, ei
aiheesta. `Dhow` on tietoinen poikkeus (selittää sanan kohteen omassa
nimessä). Fable on hyväksynyt tämän linjan sellaisenaan.

### Nimeäminen

**`Arabiemiirikunnat`, ei "Arabiemiraatit"** (Fablen päätös). Sama maa
kahdella nimellä näkyy pelaajalle heti maailmankartalla, ja
genetiivitaulu tuntee vain vakiintuneen muodon.

### Piirtotyökalu

- **Kolme merentäyttötapaa:** ei lippua (rantanauha), `meri: true`
  (vesipuoli), `meri: 'maa'` (maapuoli). Jos työkalu varoittaa "meri
  peittäisi yli 100 % rajauksesta", täyttö valitsi väärän puolen →
  kokeile toista lippua. Näin kävi Tromssassa ja Kööpenhaminassa.
- **Rantaviiva ei saa poistua ja palata samalta reunalta** — siitä jää
  täyttämätön paperikiila.
- **`merenTaytto` ei osaa saarta, jonka rantaviiva jatkuu rajauksen
  ulkopuolelle.** Tukholmassa `meri: true` upotti Djurgårdenin, ja
  siksi Tukholmassa EI ole meri-lippua. Tämä on työkalun tunnettu
  puute, ei asetusvirhe.
- **Vesirelaation sisärenkaat piirretään reikinä** (v480). Ilman sitä
  Riddarfjärdenin täyttö valui Kungsholmenin ja Södermalmin päälle ja
  puoli Tukholmaa oli veden alla.
- **Alle 2000 m²:n vesi jätetään piirtämättä** (v480): aukion
  suihkulähde näytti pisteentarkistimessa upotetulta kohteelta
  (Madridin Cibele, Tukholman Sergel).
- **Kaupunginmuuri piirtyy** (v493, `barrier=city_wall`). Se on
  muurikaupungin kartan tärkein viiva — Dubrovnik oli ilman sitä
  pelkkä vaalea läiskä.
- **`KADUT` on sekä kyselyn että piirron lähde.** Kun palvelutie
  lisättiin tauluun omaksi luokakseen, kysely alkoi hakea
  `service`-teitä joka kaupunkiin ja siroitti kuviin pihateitä.
  Korjattu v493:ssa suodattamalla luokka pois kyselystä, ellei
  kaupungilla ole `palvelutiet: true`. **Jos lisäät uuden katuluokan,
  muista että se laajentaa kyselyä.**
- **`palvelutiet: true` vain kun se on mitattu tarpeelliseksi.**
  Vilnan vanhassakaupungissa kujat ovat OSM:ssä service-teitä (1509 kpl
  vs. 189 katua), joten ilman lippua vanhakaupunki oli tyhjä. Muualla
  service on pysäköintialueiden ajolinjoja.
- **Mittakaavajana piirtyy lehdessä (ui.js), ei kuvaan.** Työkalu ei
  tiedä siitä, joten vasen alakulma pitää katsoa lehdessä:
  Kööpenhaminassa Tivolin numeroympyrä osui janan päälle.
- **Kartta renderöityy puhelimessa n. 360 CSS-pikselin levyisenä.**
  1600 px:n kuvaan leivottu teksti kutistuu 0,22-kertaiseksi.

### Muut

- **Mittakaavajana** (`mittakaava()` maakartat.js:ssä) lasketaan
  rajauksesta, ja `tests/mittakaava.test.mjs` vaatii, että jana on
  15–35 % kartan leveydestä. Uusi rajaus voi kaataa tuon testin —
  tarkista ennen committia.
- **`nimiVasen` ja `.nimi-vasen` ovat eri asia.** Kohdekartoissa ei ole
  `nimiVasen`-kenttää eikä tarvita; maakartoissa ui.js lisää luokan
  automaattisesti, kun x > 60 %.
- **Projektiot:** Venäjän maakartta on LAEA, Norja ja Suomi
  kartiollisia, Kroatia ja Bosnia Mercatoria. Mitattuja, älä "paranna".
- **Service worker listaa vain 6 kohdekarttaa** 38:sta. Lista on
  vanhentunut mutta ei rikki: puuttuvat kartat haetaan verkosta.
  Jos offline-kattavuus otetaan agendalle, se on oma tehtävänsä.

## TV-kielto (omistajan päätös, v434)

TV-napit on poistettu pelistä kokonaan, koska ne laukaisivat
tietoturvaluokittimen. **Älä lisää tv:tä missään muodossa.** Radio ja
uutiset jäävät.

Kolme sanaa jäi kartta- ja introaineistoon, ja ne ovat **rakennuksia
ja historiaa, eivät poistettua toimintoa** (Fablen ratkaisu #621).
Älä poista näitä:

- `js/packs/maakartat.js` — Berliinin kohde `Tv-torni`
- `tools/piirra-kaupunkikartta.mjs` — sama torni rajauskommentissa
- `js/packs/europe-artikkelit.js` — Liettuan intro kertoo tammikuun
  1991 televisiotornin puolustamisesta

## Mahdollista myöhempää työtä

- **Rakennusten piirto.** Ilman sitä kartta kohteesta, jonka ympärillä
  ei ole katuverkkoa, on tyhjä paperi (Tallinnan laulukenttä, Kiovan
  Lavra, Suomenlinnan ensiyritys). Tämä avaisi myös Alppien ja
  Lapin kaltaiset aluekohteet — tai osoittaisi, että ne tarvitsevat
  aivan toisenlaisen kartan.
- **Service workerin karttalista** ajan tasalle offline-käyttöä varten.
