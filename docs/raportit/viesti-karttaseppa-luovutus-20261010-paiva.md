# Karttasepän luovutus 10.10.2026 päivä (noin 13.0x, PT:n nollausraja 50 %)

Edellinen luovutus on `viesti-karttaseppa-luovutus-20261010-aamu.md`, ja sen loppurivit ovat päivän loki (Peking LS2, vesi v7b, ND 440 ja vertailuortot). Tässä tiedostossa on vain voimassa oleva tila.

## 1. KAIKKI MAAT JA PÄÄKAUPUNGIT (käynnissä, Karttaseppä vetää)

**Omistajan linjaus** (11.5x PT:n kautta): "tee kaikkiin maihin pääkaupunki ja maan ja kaupungin perustiedot sekä maan rajat". Tämä on poikkeus VAIN EUROOPPA -linjaan. Lisäksi 12.0x: "eurooppaan voisi ottaa ne minivaltiot mukaan ja tehdä niille kevyt sisältö".

Lista on `Matkakirja-fable/docs/raportit/puuttuvat-maat-ja-paakaupungit-20261010.md`: 64 maata puuttuu ja 117 pääkaupunkia puuttuu. Järjestys on Eurooppa (14) → Kaukasus ja Lähi-itä → Afrikka → Aasia → Amerikat → Oseania.

**PT:n päätökset (12.2x–12.3x):**
- **Kevyt piste (suositus A):** pääkaupunki, joka ei ole laudan pysäkki, on KEVYT PISTE omassa kokoelmassaan `kokoelmat/paakaupungit.json`. Siihen ei tehdä reittejä eikä sitä koske laudan 60 yksikön välisääntö. Reittejä ei tehdä ennen omistajan päätöstä.
- **Paikat ja päällekkäisyys:** pisteet ovat oikeilla paikoillaan, ja päällekkäisyys hoidetaan olemassa olevalla nimien karsinnalla.
- **Piirto:** OLEMASSA OLEVALLA kaupunkimerkillä ja nimellä pienimmässä tärkeysluokassa. Napautus avaa olemassa olevan maakortin perustiedoilla. Uutta merkkiä ei tehdä; jos olemassa oleva ei sovi, rivi PT:lle.
- **Minivaltiot (AND, LIE, MCO, SMR, VAT):** kevyt sisältö, eli lippu, perustiedot, 3–5 lauseen esittely, pääkaupunki ja rajat. Maalehteä ei tehdä.
- **Lähi-itä:** Jerusalem on kaupunki ilman kannanottoa. Palestiinalla Ramallah on "hallinnon paikka".
- **Päiväntasaajan Guinea:** pääkaupunkina näytetään Ciudad de la Paz (PT).
- **Testit:** kaupunkimäärä päivitetään erä kerrallaan.

**EUROOPAN ERÄ:** worktree `/Users/Shared/Claude/wt/karttaseppa-maat-eurooppa`, haara `karttaseppa-maat-eurooppa`. Tila: katso osio 4.
- **Minivaltiot rajoineen:** viisi riviä COUNTRY_SHAPESiin (`tools/maat-lisaa-maailmankartalle.mjs` NE 10m _swe -aineistolla: `NE_GEOJSON=…/ne_10m_admin_0_countries_swe.geojson`). Rajat ovat `assets/data/maapolygonit.json`:ssa. `tools/generoi-maapolygonit.mjs` sai MINIVALTIOT-poikkeuksen, ja Vatikaani on pienimpänä näkyvänä vinoneliönä. Uudet maat yhdistettiin tiedostoon, ja muut maat ovat tavulleen ennallaan (meta-kenttä `minivaltiot`).
- **Viennin rajaharvennus:** `tools/vienti/maarajat.mjs`:ssä toleranssi on minivaltioille kymmenesosa renkaan koosta.
- **ISO2, genetiivit ja liput:** ISO2 (`iso2.mjs`), genetiivit (`tests/maa-otsikot.test.mjs`) ja liput (`tools/fetch-flags.mjs` ja `tools/hae-commons-tekijat.mjs --kirjoita`). Vatikaanin lippu on "Flag of Vatican City (2023–present).svg". Lipputyökalu haki myös 9 muuta jo käytössä ollutta lippua paikallisiksi.
- **Maakäyrät:** Vatikaanille ei ole UN WPP- eikä Maailmanpankin sarjoja, joten testiin tuli ILMAN_SARJOJA-poikkeus. `tools/hae-maakayrat.mjs --maat=` LISÄÄ nyt eikä korvaa. ANSA: aiemmin se kirjoitti koko tiedoston pelkillä pyydetyillä mailla.
- **UUSI PAKKA** `js/packs/paakaupungit.js`:
  - `PAAKAUPUNKIPISTEET`: id, nimi, nimiAlkukieli, maa (ISO3), lat, lon, wikidata, asema, asukkaat {arvo, vuosi, lahde, linkki}, kuvaus, tunnusrakennukset.
  - `MAIDEN_PERUSTIEDOT[ISO3]`: virallinenNimi(+Alkukieli), valtiomuoto, vakiluku, pintaAlaKm2, kielet, valuutta, rajanaapurit, genetiivi, esittely.
  - Pakka on koneen kirjoittama: `node tools/tee-paakaupungit.mjs <SK:n faktat.json> […]`. Työkalu lisää tai korvaa vain syötteen maat. id tulee `data/oppaan-kuvat/kaupungit-vaihe2.json`:n Q-id:n kautta. Työkalu kaatuu, jos id on laudan kaupunki tai maa puuttuu laudalta, eli rajat tehdään ensin.
- **VIENTI, skeema 1.60** (`tools/vienti/kokoelmat.mjs`, `vie-sisalto.mjs`):
  - `kokoelmat/paakaupungit.json`: id, nimi, nimiAlkukieli, maa, maa2, lat, lon, lauta {x, y} (projisoiLaudalle), tarkeys 0, pysakki false, asema, wikidata, asukkaat, asukkaatVuosi, asukkaatLahde, kuvaus, tunnusrakennukset.
  - `maat.*.perustiedot` ja `maat.*.paakaupunki` { id, kokoelma }.
  - Vienti ajettu: 14 pistettä, maat, maarajat ja lippumaat 140.
- **Kultaiset jäljet:** `tools/natiivi-kultaiset/tiivisteet.json` päivitetty (liput, kysymysjälki, pelijälki). Natiivin kultaiset ovat Pelikoodarilla.
- **Testi:** `tests/paakaupungit.test.mjs`.

**Sisältökirjurin aluetiedostot** (rakenne `{ alkiot: [{ maa, paakaupunki, tyyppi }] }`; tyyppi uusi_maa, paakaupunki tai kuvat; kuvat-rivit ohitetaan):
- Eurooppa: `proto-3d/_tyo/sisaltokirjuri/maafaktat-eurooppa-20261010/eurooppa-14-maafaktat.json` (KÄYTETTY)
- Kaukasus ja Lähi-itä: `proto-3d/_tyo/sisaltokirjuri/maafaktat-maailma-20261010/lahi-itae-kaukasus.json`
- Afrikka: `…/afrikka.json` (GNQ = Ciudad de la Paz)
- Aasia: `…/aasia.json`
- Amerikat ja Oseania ovat SK:lla työn alla.

**SEURAAVAT ERÄT:** jokaiselle uudelle maalle ensin `maat-lisaa-maailmankartalle.mjs` (MAAT + ANKKURIT; saarivaltioille minKoko 0 ja MINIVALTIOT-tyyppinen poikkeus generoi-maapolygonit- ja maarajat-tiedostoihin). Sitten:
1. ISO2 ja genetiivi
2. fetch-flags ja hae-commons-tekijat
3. maakäyrät (`--maat=`)
4. `tee-paakaupungit.mjs <alue>.json`
5. vartija `--paivita`
6. `npm test`
7. vienti

Palestiina on NE:ssä PSE (_swe).

**PIIRTO:** Pelikoodarille (web) ja N-UI:lle (natiivi; ensin omistajan pallotehtävä ja ikäraja) lähti viesti noin 12.5x skeemasta ja linjauksesta. Kuittauksia ei vielä tullut.

## 2. Muut voimassa olevat

- **Vertailuortot:** `_tyo/karttaseppa/vertailu/<kohde>/` (orto.jpg, meta.json, varjot.jpg; LUEMINUT).
  - Työkalu: T7 `Matkakirja-karttaseppa/vertailu/vertailu.py --malli <id>` (`--dsm-osm <pbf>` muualla kuin Ranskassa).
  - LR käyttää tiedostoja `vertaa_orto.py --meta`:lla. Uusille malleille LR pyytää ajon, kun malli on mallit.jsonissa.
  - EEA VHR on VAIN sisäiseen käyttöön, ja se haetaan natiivissa EPSG:3035:ssä (palvelimen 4326-muunnos siirsi kuvaa noin 28 m).
- **Peking LS2:** paketti valmis `_tyo/karttaseppa/peking-20261010/ls2/` (LR:n rajaus, vesiväri mukana). LR:n paketin hallikorjaus `lr/` (vanha versio `lr-ennen-hallit/`).
- **Vesi v7b ämpärissä** (Julkaisija). Kytkentä on LS2:n junassa.
- **Odottaa:** Tukholman maanpinta 1 m (Lantmäteriet STAC), kun `LM_GEOTORGET_USER/PASS` ovat avaintiedostossa. Ei kysytä omistajalta. Samalla tunnuksella KL:n vertailuorton Copernicus VHR vaihtuu Lantmäterietin ortoon.
- **Oma virhe 12.0x:** Commons-tarkistuksen curl-kutsun User-Agentissa oli omistajan sähköposti. Älä käytä henkilötietoja otsakkeissa.

## 3. Ajossa

- Ei GPU-ajoja. ComfyUI (PID 12915) on joutilaana.
- Kone on vapaa ma 12.10. asti.

## 4. Euroopan erän tila nollaushetkellä

- **PR [ravelius/Matkakirja#4344](https://github.com/ravelius/Matkakirja/pull/4344)** (haara karttaseppa-maat-eurooppa, commit d098bfd93).
- **Testit:** `npm test` ajettiin kahdesti. Toisen ajon 9 punaista (skeemasopimus 1.60, SHELL `sw.js`, `build-standalone`, vienti-testin kokoelmamäärä) korjattiin, ja niiden neljä testitiedostoa ajettiin vihreinä (132/0). CI:n tila tarkistetaan PR:stä.
- **Seuraava vaihe:**
  1. Kun #4344 on mergetty, uusi worktree `tools/uusi-worktree.sh karttaseppa maat-lahi-ita` (tai alue kerrallaan).
  2. Rajat: NE 10m _swe `/private/tmp/…/scratchpad/ne/` ei säily; lataa uudelleen worktreen `.nevalimuisti/`-kansioon `tools/worldview.mjs`:n `ADMIN0_URL`:sta.
  3. Lopuksi `tee-paakaupungit.mjs` aluetiedostolla.
- **Piirto:** Pelikoodari (web) ja N-UI (natiivi) saivat skeeman ja linjauksen noin 12.5x. Kuittaukset ovat auki.
