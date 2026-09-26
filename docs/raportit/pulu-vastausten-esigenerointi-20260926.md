# Pulun vastausten esigenerointi: suunnitelma (Pelikoodari 26.9.2026)

Tämä on suunnitelma, ei toteutus. Luvut on mitattu origin/mainista 79f1f09ae (node-tuonti pakoista). **Arvio**-merkityt luvut ovat laskelmia eivätkä mittauksia.
Lähtökohta: kaava *alustus puhekielellä → ydinvastaus kirjakielellä → lyhyt loppukommentti* on sitova (omistaja 28.8.2026, Raamattu KEHYSMALLI CHATISSA). Siksi malli, kehote ja asetukset lukitaan, ja niiden tiiviste tallennetaan jokaiseen vastaukseen.

## 1. Inventaario

| Lähde | Missä | Kysymyksiä (Eurooppa) | Vastaus nyt |
|---|---|---|---|
| Nostojen `kysymykset`: maastokohteet | `js/packs/maastokohteet-*.js` (109 maata, 1 187 nostoa) | 2 374 (596) | live-malli (`polloKysy`) |
| hahmotelmat/monumentit | `hahmotelma-*.js` (35 maata, 884 nostoa; monumentit-eurooppa = samat id:t) | 1 768 (1 768) | live |
| fokuskohteet | `fokuskohteet-*.js` (22 maata, 191) | 382 (350) | live |
| fokusvirran täkynostot | `fokusvirta-*.js` (25 kaupunkia, 95) | 285 (285) | live |
| **Nostot yhteensä** (id:n mukaan duplikaatit poistettu) | | **4 809 (2 999)** | |
| Kaupunkien valmiskysymykset `POLLO_VALMISKYSYMYKSET` | `js/packs/pollo-kysymykset.js`, 119 kaupunkia: laatta 560, lehti (kaupunkilehti) 560, saapuminen 100 | 1 220 (530) | **piilossa**, `VALMISKYSYMYKSET_KAYTOSSA = false` (js/pollo.js:1215) |
| Astronautin kamera | `js/linssit/astronaut-kysymykset.js` (87 kohdetta; = tools/astronaut/qa-*.json) | 174 | esikirjoitettu, ka. 199 merkkiä, ei mallikutsua (satelliitti.js:880) |
| Ihmisen matka | `js/linssit/ihmisen-matka-kysymykset.js` (20 kohdetta) | 60 | esikirjoitettu, ka. 239 merkkiä (ihmisen-matka-kortti.js:536) |
| Maakunnat | `js/packs/maakunnat-pulu.js` (8 maata, 111 aluetta) | 274 | esikirjoitettu `{q,a}`, ka. 285 merkkiä (karttatyokalu-maakunnat.js:605) |

Nähtävyysjutuissa (`nahtavyysjutut.js`) ei ole kysymyskenttää. Kysymys on keskimäärin 40 merkkiä pitkä. Nostokortti näyttää enintään 3 kysymystä (fokusnosto.js:1722) ja kohdekortti enintään 2 (fokuskohteet.js:5458).
Esikirjoitetut 508 vastausta (astronautti, Ihmisen matka, maakunnat) ovat jo välittömiä, **mutta ne eivät noudata kolmiosaista kaavaa**. Siitä on avoin kysymys alla.

**Vastauksen pituus (arvio).** Kehote määrää alustukseen enintään kaksi lyhyttä virkettä, ydinvastaukseen 2–5 virkettä ja loppuun yhden virkkeen (worker.js, JARJESTELMAKEHOTE). Lisäksi tulevat JATKOT-rivit (2 × enintään 70 merkkiä). Vastausraja on 900 tokenia (worker.js:75).
Arvio on noin 700 merkkiä luettavaa tekstiä ja noin 900 merkkiä tallennettavaa tekstiä vastausta kohden. Kaikkiin 6 029 kysymykseen (nostot ja kaupungit) se tekee noin 4,2 M luettavaa merkkiä. Ennen ajoa pituus mitataan 20 näytteen pilotilla.

## 2. Nykyinen reitti

- **Malli:** `POLLO_MALLI = "claude-sonnet-5"` (tools/pollo/wrangler.jsonc:30). Koodin oletus `claude-haiku-4-5-20251001` (worker.js:66) on vain varapolku, ja OHJE.md:297 on siltä osin vanhentunut. Ajattelu on pois päältä (`thinking: disabled`, rajat.js:345). Lämpötila on mallin oletus. `max_tokens` on 900, ja jatkokutsu saa 350 (worker.js:75–77).
- **Välityspalvelin:** Cloudflare Worker `matkakirja-pollo` (tools/pollo/worker.js). `fetch` on rivillä 1908, `tehtava: 'vastaus'`. Kehote kootaan rivillä 2049 osista JARJESTELMAKEHOTE (23 145 merkkiä), KASITEKEHOTE ([[käsitteet]]), JATKOKEHOTE (2 jatkokysymystä), PAIKKAKEHOTE (`PAIKKA:`-rivi) ja kehysOhje (aloitus/jatko/puhuttelu, worker.js:732). Yhteensä noin 25,2 k merkkiä. Kehote on vain palvelimella, eikä prompt cachingia käytetä (`cache_control` puuttuu).
- **Striimi:** SSE-tapahtumat `pala`, `loppu` ja `virhe` (worker.js:1279 `striimaaVastaus`; asiakas js/pollo.js:5942 `pyydaStriimi`).
- **Asiakas:** paneeli `kysy()` (js/pollo.js:6315, runko :6376). Linssit kulkevat reittiä `polloUlkoinenKysymys` (:7270) → `Pollo.kysyUlkoisesti` (:6642). Nostonapit kutsuvat `polloKysy` (:7233).
- **Konteksti** (`lueNakyma` :635, `kokoaKonteksti` :494, katto 5 000 merkkiä, rajat.js:40): lauta, kaupunki ja maa, matkapäivä, näkymä (kartta, lehti, maalehti, tietoruutu), avoin kohdetietoruutu (nimi, tyyppi, teksti), isoisän merkintä, lehden lohkot ja haettu aineisto (`haeAineisto`, pelin omat lehtikatkelmat). Mukaan tulee myös historia (6 viimeistä, rajat.js:44) ja `kehys`, joka päätellään `kehysLaji`-funktiossa (:923).
- **Ääni:** live-vastaus luetaan virtana (`lueVirtana(..., {persoona:'pollo'})`, :6124). Worker käyttää `gpt-4o-mini-tts`-mallia ja ääntä `sage` (worker.js:93 ja :125). Välimuisti on kaksitasoinen: reunavälimuisti ja R2 `puhe/<lohko>/<tiiviste>.mp3` (:960–980).
  Esigeneroidut Livian repliikit tehdään ElevenLabsilla: `eleven_v3`, ääni Flicker `piI8Kku0DcvcL6TTSeQt`, vakaus Natural 0,5, `mp3_44100_192` (tools/generoi-pulu.mjs:206–221). Ne viedään ämpäriin polkuun `aanet/pulu/` (js/liviapuhe.js:115, media.matkakirja.app).
- **KV ja R2:** `POLLO_KV` ja `PUHE_R2` sidotaan julkaisussa (pollo-julkaisu.yml → ci-asetus.mjs). KV:ssä on nyt vain käyttörajojen laskurit.

## 3. Putki

1. **Kysymystunnus.** Muoto on `<laji>:<omistaja-id>:<fnv8(kysymys)>`, esimerkiksi `nosto:lustig-eiffel:3fa1c2d0` tai `kaupunki:firenze:lehti:…`. Tiiviste lasketaan olemassa olevalla `puheenTiiviste`-funktiolla (FNV-1a, js/linssipuhe.js:506), jonka webkin osaa laskea.
2. **Eräajo** (uusi `tools/pulu-vastaukset/generoi.mjs` ja workflow_dispatch, maksullinen vain omistajan luvalla). Järjestys: Eurooppa ensin, maa kerrallaan (3 529 kysymystä: nostot 2 999 ja kaupungit 530), sitten muut 2 500.
   Kehote tuodaan workerista (JARJESTELMAKEHOTE ja muut osat viedään `export`illa, jotta kopiota ei synny). Kehys on `aloitus`, historiaa ei ole. **Konteksti on kanoninen:** kohdetietoruutu (nimi, tyyppi, teksti), maa ja haettu aineisto. Pelaajan kaupunki, päivä ja näkymä jäävät pois, jotta vastaus ei riipu pelaajan tilasta.
   Ajo käyttää Message Batches -rajapintaa ja `cache_control`-merkintää yhteiseen kehotteeseen. Jokaiseen kysymykseen tehdään 2 varianttia.
3. **Tekstin tallennus.** Lähdetiedostot ovat `data/pulu-vastaukset/<iso3|kaupunki>.json`. Suurin maa on noin 130 kysymystä eli noin 160 kt, joten regenerointi muuttaa vain yhden maan tiedoston.
   Alkion kentät: `{ id, lahde:{laji, omistaja}, kysymys, vastaus ([[ ]] säilyy), jatkot[2], paikka|null, kehys:'aloitus', lahdeTiiviste, kehoteTiiviste, malli, asetukset, luotu, aani:{url, kesto, merkit}|null, qa:{…} }`.
   Vienti: uusi kokoelma `puluvastaukset` ja maittainen jako skeeman 1.48 mallin mukaan (`kokoelmat/puluvastaukset/<iso3>.json` + manifest `sha256` ja `tavuja`), skeema 1.51 (tools/vienti/vie-sisalto.mjs:211, :367).
4. **mp3 ämpäriin.** Vain valittu variantti luetaan ääneen. Polku on `aanet/pulu/vastaukset/<iso3>/<id>-<äänitiiviste>.mp3`, ja se generoidaan generoi-pulu.mjs:n asetuksilla ja kuittiketjulla. Luettavasta tekstistä poistetaan [[ ]], JATKOT ja PAIKKA.
   Sama raakatuotoksen säilytyssääntö on voimassa (ALKUPERÄISET ÄÄNITIEDOSTOT SÄILYTETÄÄN AINA).
5. **Workerin KV-välimuisti puuttuville.** Pyyntöön lisätään `kysymysId`. Jos kysymys on nappikysymys, kehys on `aloitus` eikä historiaa ole, worker lukee avaimen `vast:<kysymysId>:<kehoteTiiviste>:<malli>`.
   Osumalla vastaus palaa heti samoina SSE-tapahtumina. Hudilla vastaus striimataan kuten nyt ja tallennetaan KV:hen (`ctx.waitUntil`, ei TTL:ää). Ensimmäinen pelaaja maksaa, kaikki muut saavat vastauksen välittömästi.
   Varaus: KV-vastaus on tehty yhden pelaajan kontekstilla, joten siksi kanoninen konteksti rakennetaan myös tässä nosto-id:stä eikä pelaajan näkymästä.
6. **Hakujärjestys pelissä.** (a) Paketin/JSONin vastaus, jos `lahdeTiiviste` vastaa nykyistä nostotekstiä. Teksti tulee heti, ja ääni on mp3, jos sellainen on, muuten live-TTS. (b) Workerin KV. (c) Live-malli kaikille vapaille kysymyksille, jatkokysymyksille (`jatko`), puhutteluille ja keskustelulle, jossa on historiaa.
   Jatkot-napit tulevat tallennetusta `jatkot`-kentästä, ja niiden vastaukset haetaan livenä. Natiivi (PolloValikko.swift) lukee saman kokoelman.

## 4. Laadunvarmistus

- **Kaava** (deterministinen, ei rajapintakutsuja): ensimmäinen virke alkaa höpötysaloituksella tai puhekielen merkillä. Alustus on enintään 2 virkettä ja enintään 200 merkkiä. Ydinosassa ei saa olla puhekielen sanaston merkkejä (lista: mä, sä, ny, tän, kato, ku, loppuheitot -s/-t…). Loppu on yksi virke puhekielellä, enintään 160 merkkiä. Otsikoita ja tyhjiä rivejä ei hyväksytä, eikä kiellettyä aloitusta "Tästä ei ole pelissä juttua".
- **Muoto:** 2–5 kpl `[[käsite]]` ilman pystyviivaa. JATKOT on täsmälleen 2 riviä, kumpikin enintään 70 merkkiä ja kysymysmerkkiin päättyvä. PAIKKA-rivin muoto tarkistetaan, jos rivi on mukana. `stop_reason` ei saa olla `max_tokens`.
- **Pituus:** luettavaa tekstiä 350–1 000 merkkiä (arvio). Raja kiristetään pilotin jakauman mukaan.
- **Faktat:** (1) Deterministinen tarkistus: vuosiluvut, luvut ja erisnimet verrataan lähdetekstiin, ja lähteestä puuttuvat liputetaan. (2) Tuomarikutsu lämpötilalla 0 (sama lukittu malli, eräajona) luokittelee väitteet: tuettu, ei lähteessä tai ristiriidassa. Ristiriita hylkää variantin. (3) Spoilersuoja: vastausta verrataan pelin visojen ja tehtävien oikeisiin vastauksiin.
- **Kaksi varianttia:** kumpikin pisteytetään, ja paras läpäissyt valitaan. Jos kumpikaan ei läpäise, tehdään yksi uusinta ja sen jälkeen käsijono. Hylätty variantti jää QA-arkistoon.
- **Omistajan otanta:** maaerä kerrallaan 20 satunnaista tai 2 % (suurempi), sekä kaikki liputetut. Otanta esitetään artifact-sivuna, jossa varianttipari ja mp3 ovat vierekkäin. Hyväksynnän jälkeen seuraa merge ja äänigenerointi.

## 5. Versiointi ja regenerointi

- `lahdeTiiviste = fnv(kysymys + nimi + tyyppi + nostoteksti + maa)` lasketaan sekä viennissä että webissä ajonaikaisesti. Jos lähde on muuttunut, vastausta **ei tarjoilla** (fakta voi olla väärä), ja tilalle tulee KV tai live.
- `kehoteTiiviste = sha256(koko kehote + kehysOhje('aloitus'))` ja `malli + asetukset` (max_tokens 900, thinking pois). Kehotteen tai mallin vaihtuminen **ei pudota** paketin vastauksia, koska kaava on lukittu. Ne merkitään vanhentuneiksi, ja uusinta tehdään omistajan päätöksellä. KV-avain vaihtuu automaattisesti.
- Äänitiiviste = hash(luettu teksti + voice_id + malli + vakaus + ulostulomuoto). Tekstimuutos tuottaa uuden mp3:n, eikä vanhaa ylikirjoiteta.
- Tarkistin (`--kuiva`, ei rajapintaa) listaa puuttuvat ja vanhentuneet maittain. Testi vahtii, ettei vanhentunutta lähdettä viedä pakettiin. Generointimalli on lukittu: skripti kieltäytyy, jos `POLLO_MALLI` ≠ lukittu, ellei lippua `--malli` anneta.

## 6. Kustannus (kaikki arvioita)

Oletukset: noin 3 merkkiä/token (suomi, arvio). Syötettä on noin 8 400 tokenia kehotetta ja noin 700 tokenia kontekstia, tulostetta noin 300 tokenia.
**Hinta 3 $ / 15 $ per M tokenia (syöte/tuloste) on Sonnet-luokan listahinta-oletus. Claude-sonnet-5:n julkista hintaa en voinut tarkistaa tässä ajossa (hinta-apu estettiin), joten se on varmistettava ennen ajoa.** Batch-alennus on −50 % ja välimuistiluku 0,1 × syötehinnasta.

| Erä | Kutsuja (2 varianttia) | Ilman välimuistia | Välimuisti | Batch + välimuisti | Faktatuomari (batch) |
|---|---|---|---|---|---|
| Eurooppa 3 529 | 7 058 | ~225 $ | ~64 $ | ~32 $ | ~24 $ |
| Kaikki 6 029 | 12 058 | ~383 $ | ~110 $ | ~55 $ | ~41 $ |

- **mp3 (ElevenLabs eleven_v3, 1 krediitti/merkki):** noin 700 merkkiä × 6 029 ≈ 4,2 M krediittiä ≈ 420–1 270 $ (0,10–0,30 $ / 1 000 merkkiä, docs/raportit/puhe-striimivertailu-20260926.md). Eurooppa: 2,5 M ≈ 250–740 $. Kuukausikiintiö rajaa tahtia.
- **Koko:** tekstiä noin 1,2 kt/alkio, eli noin 7 Mt JSONia ja gzip noin 2–2,5 Mt (arvio). Maatiedosto on enintään noin 160 kt. mp3 192 kbps × noin 47 s ≈ 1,1 Mt/vastaus, eli noin 6,8 Gt ämpärissä. Se ei tule pakettiin (R2-tallennus noin 0,1 $/kk).
- **Vertailu:** live-vastaus maksaa nyt jokaisella kysymiskerralla noin 0,03 $ (malli ilman välimuistia), ja sen ääni noin 0,012 $ (gpt-4o-mini-tts).

## Avoimet kysymykset omistajalle

1. **Ääni:** luetaanko esigeneroidut vastaukset Livian ElevenLabs-äänellä (Flicker, eleven_v3), kun live-chat puhuu nyt `sage`-äänellä? Vai käytetäänkö kahta ääntä kaavan mukaan (Livia kehykseen ja Viisas Kertoja `Sz0tRTEpybtDJ9ru2kgD` ydinosaan)?
2. **Kustannus:** kannattaako mp3 tehdä heti kaikille (noin 250–740 $ Euroopalle), vai ensin vain kysytyimmille (KV-osumien mukaan)?
3. **Esikirjoitetut:** kirjoitetaanko astronautin, Ihmisen matkan ja maakuntien 508 vastausta uudelleen kolmiosaiseen kaavaan, vai jäävätkö ne lähteistetyiksi lyhyiksi vastauksiksi?
4. **Valmiskysymykset:** palautetaanko kaupunkien 1 220 valmiskysymystä näkyviin (lippu on nyt pois) vai jätetäänkö ne generoimatta?
5. **Varianttien käyttö:** tallennetaanko molemmat variantit pakettiin vaihtelun vuoksi (koko × 2), vai vain paras?
6. **Näyttötapa:** näytetäänkö välitön vastaus heti kokonaan, vai lyhyellä naputusanimaatiolla, jotta Livian tuntuma säilyy?
7. **Mallin lukitus:** saako `claude-sonnet-5` pysyä lukittuna aliaksena, vai lukitaanko päivätty tunniste, jos sellainen on tarjolla?
