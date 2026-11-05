# Codex → Karttaseppä ja Keskustelukanava: Riemukaari, sarja 24, #2097

Kahdeksan kokonaan uutta kuvaa, yksi kutsu joka näkymään (8/8). Kaikki ovat muuttamattomia natiiveja RGB 1536 × 1024 PNG -kuvia. TILAUS-24, 24d:n lähdeportti ja #2115:n rinnakkaistyö on käsitelty; #2116:n suuntakorjaus saapui kolmen ensimmäisen kuvan jälkeen ja sovellettiin ennen sivukuvia.

**QA FAIL — diagnostinen arviointierä.** Riemukaari tunnistuu, itä–länsipari on yhtenäinen ja maapohja on tasainen, mutta koko sarjaa ei merkitä Tripo-valmiiksi.

| Mittaus | Tulos |
|---|---|
| S/N leveys | 566 / 484 px; ero 15,62 %, FAIL |
| E/W leveys | 1022 / 1024 px; ero 0,20 %, PASS |
| Päälista maasta S/N/E/W | 742 / 741 / 764 / 763 px; hajonta 3,06 %, PASS |
| Maaviivat S/N/E/W | y955 / 954 / 969 / 968; vaihtelu 15 px |
| W/H-poikkeama varmennetuista runkomitoista S/N/E/W | +40,90 / +20,76 / +23,46 / +23,83 %, FAIL |
| SW/NE viistokulma | kattoreunaproxy 32,8° / 33,0° ±3°, tavoite 65°; FAIL |
| Yläkuvan bbox | [595,263,946,720], lähde [681,404,855,620]; liian suuri/siirtynyt |
| Kiveyksen peitto | 385/19626 jalanjälkipikseliä (1,96 %) nurmen kaltaisia reunoilla; ei täydellinen |
| Kolme polkunäytettä | 8 px eli noin 7,95 m, ±2 px; näytteet 6–12 m -välillä |

Mitat lähteistä: CMN/CND3D ja Clichyn kaupungin opas vahvistavat rungon 44,82 × 22,21 m, korkeuden 49,54 m ja opas pääaukon 29,19 × 14,62 m. France.fr tukee pyöristettyä 45 × 22 × 50 m. Tilauksen muistiluku 51 × 28 m poikkeaa näistä; sitä ei esitetä varmennettuna. Erillinen vertailu tilauksen 51 × 28 × 50 m lukuihin antaa S/N/E/W-poikkeamat +12,80 / −3,32 / +9,50 / +9,84 %. Lähteet ja ristiriita ovat LAHTEET.md:ssä, molemmat vertailut QA.json:ssa.

Ilmansuunnat: E=Champs-Élysées/itä-kaakko ja W=Grande-Armée/länsi-luode ovat leveät pääjulkisivut; N=Wagram ja S=Kléber kapeat sivut. Tarkistus on tehty pääkatulinjasta sekä Wagram–Kléber-sivulinjasta ja läntisen Avenue Fochin puistokaistoista; en päättele pohjoista Commonsin ilmavalokuvan ylälaidasta. Ensimmäisen SW-promptin ristiriitainen kaakkoisjulkisivumaininta jää näkyviin historiaan. Viistojen symmetrisestä kattomuodosta ei voida yksin todentaa täsmällistä vastakkaisuutta.

Muita havaintoja: etelän kapealle sivulle tuli virheellisesti suurten pääsivujen veistosryhmät; pohjoisessa niitä ei ole. Kapeiden sivujen aukot näyttävät paneeliovilta. Suuret E/W-aukot ovat tummia tyhjiä syvennyksiä. Veistosten yksityiskohtaisuus ylittää tavoitellun yksinkertaistuksen. Pienet kattopiikit ja nimet on jätetty pois. Maapohjan sisäinen kiertopolku muuttui; maskin ulkopuolella 1484573/1484751 pikseliä muuttui. Vastaanottajan on käytettävä vain maskin sisäosa, kuten tilauksessa, eikä ulkopuolen pikselisamuutta väitetä.

Lähdeportti täyttyi ennen ensimmäistä kutsua: Commonsin Public domain -ilmakuva noin vuodelta 1900 näyttää koko pohjan/katon, ja Jiuguang Wangin koko julkisivun kuva (21.10.2010, CC BY-SA 2.0) on mukana oikea.jpg:nä. Commonsin alkuperäislatauksen 429-ohjeen jälkeen käytettiin sen sallittua 1280 px esikatselua. #2118:n API-seis-linjaus on luettu ja noudatettu saapumisestaan lähtien; ennen linjausta tehdyt kyselyt on raportoitu pääsessiolle yhteistä kohdekohtaista kuittausta varten. Ei myöhempiä API-kutsuja. Tämän kuvapaketin toimituksen jälkeen luettu #2120 / commit 0697e1d76c5e49f8152a44290c300d4be1bcdfd4 korvaa kiellon omistajan luvalla: virallinen haku sallitaan hitaasti, projektin nimellä tunnistautuen ja yksi haku kerrallaan koko tiimissä; Overpass pysyy kiellettynä. Riemukaari ei tarvitse uusia hakuja.

Paikallinen arkki ja kuvat:
 /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-sarja-20261105/_review-sarja-24/riemukaari/

Postipaketti:
https://github.com/ravelius/Matkakirja/tree/904cb8a8efe564359fa304b570d9a34051eae4bf/posti/codex-karttaseppa-sarja24-riemukaari-20261105

18 tiedostoa, 19 946 516 tavua, SHA256SUMS mukana. Jokainen etätiedosto luettu takaisin ja SHA256 verrattu. Kuvia ei rajattu, skaalattu tai jälkikäsitelty; arkki ja QA-päällekkäiskuvat ovat erillisiä tarkistuskuvia.

Ei uutta ottoa, ei omistajahyväksyntää, ei Tripo-toimitusta, ei runtime-kytkentää eikä julkaisua. Omistaja näkee arkin ennen Tripoa.
