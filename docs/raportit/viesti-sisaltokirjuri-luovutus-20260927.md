# Luovutus: Sisältökirjuri 27.9.2026 (konteksti loppui kesken, nollaus)

Edellinen: `viesti-sisaltokirjuri-luovutus-20260926-d.md`. Tämä vuoro (27.9.
yöllä): erä C (BLR+ROU) valmis, astronautin kameran erät 2–4 valmiit,
kaupunkilehti-luokitteluraportti valmis, maalehti-siirto aloitettu mutta
kesken kontekstin loppuessa.

## 1. Lue ensin

- `CLAUDE.md`, Raamatun "TYÖTAPA JA SESSIOT".
- Tämä luovutus kokonaan ennen jatkamista.

## 2. Valmiit ja mainissa/PR:ssä tänä vuorona

| PR | Sisältö | Tila |
| --- | --- | --- |
| #3354 | Ouzel Galley -tekoälyhavainnekuva (v2287) | Mainissa |
| #3355 | Löydös 178: 9 ei-paikkaa galleriaksi + Santarém/Broome rakennukset (v2288) | Mainissa |
| #3358 | Maakunta-erä C: BLR (7) + ROU (42) kuvat+pikkukuvat (v2289/v2290) | Mainissa |
| #3359 | Astronautin kamera erä 2: 22 kohdetta (v2290) | Mainissa |
| #3360 | Raportti: kaupunkilehtien jutut kaupunki vai maa -luokittelu | Mainissa |
| #3362 | Astronautin kamera erä 3: 16 kohdetta (v2291) | Mainissa |
| #3363 | Astronautin kamera erä 4: 16 kohdetta (v2292) | **Auki, ks. kohta 3** |

## 3. #3363 — astronautin kamera erä 4, rebase-tilanne

Julkaisija ilmoitti #3363:n konfliktoivan mainin kanssa erä 3:n (#3362)
mergen jälkeen (satelliitti-data.js, astronaut-kysymykset.js,
tools/hae-satelliittihavainnot.mjs ovat koneellisesti generoituja —
git-rebase kahteen generoituun tiedostoon meni sekaisin ensimmäisellä
yrityksellä). **Ratkaisu:** rakensin haaran uudelleen puhtaalta
pohjalta `origin/main`:sta (jossa erä 3 on jo mukana), lisäsin erä 4:n
16 kohdetta uudelleen `tools/hae-satelliittihavainnot.mjs`:ään, ajoin
`NODE_USE_ENV_PROXY=1 node tools/hae-satelliittihavainnot.mjs` ja
`node tools/astronaut/build-questions.mjs` uudelleen. Tulos: 141
kohdetta / 282 vastausta koko linssissä, ei päällekkäisyyksiä erä 3:n
kanssa (tarkistettu koodilla). Force-pushattu 4c1af486b.

**Testien tila — tärkeä varoitus:** ajoin `node --test tests/satelliitti*.test.mjs
tests/astronaut*.test.mjs tests/livia-astronautti.test.mjs
tests/rules.test.mjs` erikseen kahdesti, molemmilla kerroilla 484/484
vihreää — tämä osajoukko on luotettavasti kunnossa. Ajoin myös koko
`node --test tests/*.test.mjs` -sarjan kahdesti taustalla, mutta
**molemmilla kerroilla vaihdoin haaraa saman työhakemiston sisällä
kesken ajon** (siirryin maalehti-siirto-haaraan kesken pitkän ~6 min
ajon), mikä todennäköisesti selittää yhden ainoan epäonnistuman:
"sama lähde antaa tavulleen saman viennin" (tests/vienti.test.mjs) —
testi vertaa kahta build-manifestin ajoa ja epäonnistuu jos tiedostot
muuttuvat kesken. **Suositus seuraavalle: aja koko
`node --test tests/*.test.mjs` vielä kerran täysin häiriöttä (ei
haaranvaihtoja samaan aikaan) ennen kuin luotat mergen olevan turvallinen**
— astronautin sisältö itsessään on hyvin todennäköisesti kunnossa,
mutta en ehtinyt varmistaa täydellä sarjalla puhtaasti.

## 4. Kaupunkilehti-luokitteluraportti ja maajuttu-siirto

Omistaja hyväksyi 27.9. klo 00.5x raportin (#3360) 33 maa-luokan
jutun siirron kaupunkilehdistä maalehtiin. Aloitin siirron kolmella
tutkimusagentilla (33 kohdetta jaettuna kolmeen 11 kohteen ryhmään) —
tutkimus paljasti merkittäviä komplikaatioita, jotka eivät olleet
tiedossa alkuperäistä 33 kohteen listaa hyväksyttäessä.

### 4.1 Fablen päätös: 5 kohdetta jäävät kaupunkiin (ei siirretä tässä erässä)

Fable päätti Raamatun sisällä (27.9. yöllä) nämä 5 EI siirretä:

1. **Dublin "Säkkipilli, johon ei puhalleta"** (IRL) — duplikaatti
   IRL:n musiikki-kategoriassa JA Dublinin saapumiskortin visa
   (`js/packs/europe-kulttuuri.js`) nojaa juuri tähän juttuun.
2. **Marseille "Hymni sai nimensä matkalla"** (FRA) — saapumisvisa
   nojaa tähän; FRA:lla ei myöskään ole musiikki-kategoriaa.
3. **Lissabon "Azulejot pitävät talon viileänä"** (PRT) — saapumisvisa
   nojaa tähän.
4. **Barcelona "Ihmistornin huipulla on lapsi"** (ESP) — saapumisvisa
   nojaa tähän.
5. **Praha "Dvořák vei kylätanssit maailmalle"** (CZE) — CZE:llä ei
   ole musiikki-kategoriaa; kategorian oma tehtävä on kokonaan tästä
   jutusta.

Näiden neljän ensimmäisen poisto kaatuisi `tests/lehdet.test.mjs`:n
testin "kulttuurivisan vastaus löytyy kaupungin omasta lähdejutusta",
koska testi tarkistaa vain `KULTTUURI_KATEGORIAT`+`FOKUSVIRRAT`, ei
`MAA_KATEGORIAT`:a. Uusien saapumisvisojen kirjoittaminen näille
kaupungeille olisi oma pieni erätyönsä, ei tehty nyt.

### 4.2 Valmiit siirrot (committed, haarassa `sisalto-maalehti-siirto-20260927`)

5/28 siirrettävästä jutusta on tehty (poistettu kaupungista JA
lisätty maahan, syntaksi tarkistettu `node --check`:lla, **testejä ei
ole ajettu tälle haaralle** — konteksti loppui ennen sitä):

- Sofia "Gaida — säkkipilli Balkanilla" → BGR `kulttuuri`
- Istanbul "Valtio ilmoitti maksavansa vain puolet" → TUR `historia`
  (lisätty myös lyhyt viides lause TUR:n neljän kohteen johdantoon)
- Edinburgh "Haggis, lanttu ja peruna" → GBR `ruoka`
- Barcelona "Sardanassa askeleet lasketaan" → ESP `musiikki`
- Oslo "Ruskea juusto keitetään herasta" (Brunost) → NOR `arki`

**ENSIMMÄINEN TEHTÄVÄ seuraavalle:** `node --check
js/packs/kulttuuri-kategoriat.js js/packs/maa-kategoriat.js` (pitäisi
olla vihreä), sitten aja `node --test tests/lehdet.test.mjs
tests/dokumentit.test.mjs tests/maa-otsikot.test.mjs` (tai laajempi
sarja) varmistaaksesi nämä 5 eivät riko mitään ennen jatkamista.

### 4.3 Kesken olevat siirrot — täsmälliset ohjeet

Kaikkien kolmen tutkimusagentin täydet raportit (tarkat rivinumerot,
valmiit JS-objektit kopioitavaksi) ovat tallessa scratchpadissa:
`/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-sisaltokirjuri/
7cb02d29-6a60-4b0b-a210-066c112bfb2f/scratchpad/maalehti-group{B,C}-report.md`
(group A:n raportti oli vain istunnon transkriptissä, ei tiedostona —
jos tarvitset sen uudelleen, ryhmä A kattoi: Praha, Istanbul, Dublin,
Edinburgh, Marseille, Lissabon, Barcelona×2, Sevilla×2, Moskova).
**Huom: scratchpad-kansio on tämän istunnon oma eikä välttämättä säily
seuraavaan istuntoon** — jos tiedostot puuttuvat, tutkimus pitää ajaa
uudelleen samalla menetelmällä (ks. tämän session transkripti tai aja
3 agenttia uudelleen 11+11+11 jaolla).

**Yksinkertaiset siirrot (poista + lisää, pieni johdanto/lisäys-korjaus):**

- Oslo "Lipun kannossa oli silakkasalaatti" → NOR `historia`
- Kööpenhamina "Voileipä syödään haarukalla" (Smørrebrød) → DNK `ruoka`
- Riika "Kaapissa on 268 815 lappua" (dainat) → LVA `tavat`
- Vilna "Sutartinė soi tahallaan riitasointuisena" → LTU `tavat`

**Vaativat orvon tehtävän/johdannon korjauksen (kirjoita korvaava
kysymys jäljelle jäävästä sisällöstä — normaalia sisältötyötä, EI
tarvitse omistajan lupaa):**

- Moskova "Laskiaisviikolla syödään aurinkoja" → RUS `ruoka`.
  Moskovan `arki`-kategorian ainoa tehtävä on juuri tästä jutusta,
  johdanto mainitsee sen suoraan — korjaa molemmat.
- Tromssa "Turska, joka tulee itse käymään" (skrei) → NOR `arki`.
  Tromssan `kaupunki`-johdanto on 3-lauseinen, yksi lause tästä —
  lyhennä 2-lauseiseksi.
- Alpit "Kansallisruoka, joka piti keksiä" (fondue) → CHE `ruoka`.
  Sama 3-lause-johdanto-ongelma kuin Tromssalla.
- Vilna "Kirjat kannettiin rajan yli selässä" (knygnešiai) → LTU
  `historia`. Vilnan `oppi`-kategorian ainoa tehtävä JA johdannon
  toinen lause ovat tästä — korjaa molemmat (jäljelle jää 2 nostoa:
  yliopiston perustaminen 1579, observatorio 1753 — kirjoita uusi
  kysymys jommastakummasta).
- Ljubljana: "Makkara" + "Harmaa mehiläinen" → SVN `ruoka` (kaksi
  siirtoa), "Kääretorttu" (Potica) → **EI siirretä, duplikaatti SVN:ssä
  jo** ("Pähkinärulla joka kiertää"). Ljubljanan `ruoka`-johdanto
  nimeää kaikki kolme alkuperäistä juttua eksplisiittisesti, ja
  tehtävä on makkarasta — molemmat pitää kirjoittaa uusiksi jäljelle
  jäävän yhden nostoen (tori) pohjalta. Mehiläis-jutusta pitää
  poistaa Janša-elämäkertalause, koska SVN:ssä on jo oma juttu siitä.
- Valletta "Saari, jonka vuokra oli yksi haukka" → MLT `historia`.
  Vallettan `historia`-johdanto sanoo "neljä vaihetta" ja nimeää
  tämän ensimmäiseksi — muuta "kolme vaihetta" ja poista maininta;
  tehtävä on kokonaan tästä, kirjoita uusi jäljelle jäävästä
  sisällöstä (1565 piiritys sopisi hyvin, hyvin dokumentoitu).

**Erikoistapaus — generoitu sivu, ÄLÄ muokkaa käsin:**

- Kööpenhamina "Historian hetki: Roskilde 1040" ja Sevilla "Historian
  hetki: Palos 1492" + "Sanlúcar 1519" ovat `js/packs/historian-hetket.js`:n
  generoimia sivuja (`tools/paivita-hetkisivut.mjs`). Muuta
  kunkin merkinnän `lehti: { laji: 'kaupunki', avain: '...' }` →
  `lehti: { laji: 'maa', avain: 'DNK' }` / `'ESP'` (kahdesti ESP:lle)
  ja aja `node tools/paivita-hetkisivut.mjs`. EI käsin kopiointia.

**Duplikaatit — poista VAIN kaupungista, EI lisätä maahan kahteen
kertaan (maa kertoo saman jo, usein paremmin):**

- Sofia "Banitsassa on onnenviesti" (BGR:ssä jo "Piirakka täynnä
  ennustuksia") — Sofian `arki`-johdanto viittaa tähän, korjaa.
- Bryssel "Perunat, joiden alkuperästä kiistellään yhä" (BEL:ssä jo
  "Peruna, josta kiistellään yhä", myös kategorian oma tehtävä on
  tästä aiheesta) — Brysselin `ruoka`-johdanto viittaa tähän, korjaa.
- Vilna "Kirkkaanpinkki keitto ja kuumat perunat" (šaltibarščiai; LTU:ssa
  jo "Keitto joka väriytyy pinkiksi") — ei johdanto-ongelmaa.
- Košice "Perunanyyttejä lampaanjuustolla" (halušky; SVK:ssä jo
  "Kansallisruoka köyhien keittiöstä"), "Juusto, jolla on EU:n suoja"
  (Bryndza; SVK:ssä jo "Juusto, jota kutsuttiin Liptaueriksi" — TÄMÄ
  on myös Košicen oman tehtävän aihe), "Viinialue, jonka raja
  halkaisi" (Tokaj; osittainen päällekkäisyys SVK:n "Kellarit, jotka
  pelastivat viinit" kanssa — harkitse kahden uuden faktan
  yhdistämistä olemassa olevaan juttuun sen sijaan että poistat
  tyhjän käden).

**Košice — ISO PÄÄTÖS TARVITAAN:** kaikki 4 Košicen `ruoka`-kategorian
nostoa (halušky, bryndza, Tokaj, Kapustnica) ovat siirtolistalla, ja
3/4 ovat duplikaatteja jotka EIVÄT mene maahan. Jos kaikki 4 poistetaan
kaupungista, koko `ruoka`-kategoria (johdanto+tehtävä) jää tyhjäksi
(0 nostoa). Suositus: poista koko kategoria Košicelta, koska mitään
uniikkia sisältöä ei jäisi jäljelle. Vain "Hapankaalikeitto
joulupöytään" (Kapustnica) on puhdas, ei-duplikaatti siirto SVK:hon.

**Riika "Ruispohja, porkkanaa ja kuminaa" (sklandrausis):**
duplikaatti LVA:ssa ("Piirakka jota kutsuttiin maailman rumimmaksi").
**Suositus: JÄTÄ Riikaan** (älä poista ollenkaan), koska Riian
`kaupunki`-kategoriasta poistuu jo yksi juttu (dainat, kohta 4.2/4.3) —
jos molemmat poistetaan, kategoriaan jää vain 1 nosto.

### 4.4 Kun kaikki 28 on käsitelty

Aja koko testisarja PUHTAASTI (ei haaranvaihtoja samanaikaisesti
taustalla käynnissä olevan ajon kanssa — ks. kohta 3:n varoitus),
korjaa version numero `node tools/uusi-versio.mjs`, commit, push,
avaa PR jossa kuvauksessa mainitaan nimeltä nämä 5 poikkeusta
(kohta 4.1) — omistaja näkee ne PR:n kuvauksesta.

## 5. Astronautin kamera — erät 5–6 seuraavaksi

Fable mainitsi jonossa: astronautin kameran erät 5 ja 6 (25 kohdetta
kumpikin, omistajan tilaus ~100 kohdetta yhteensä; erät 1–4 kattavat
jo 23+22+16+16=77). Sama menetelmä kuin aiemmin: 2 rinnakkaista
tutkimusagenttia (`tools/hae-satelliittihavainnot.mjs`:n KOHTEET-
muoto, kuvat haettava ja katsottava käsin ennen hyväksymistä NASA
Images API:sta, `oletus`+`kuvat[]`+lähteelliset kysymykset
`tools/astronaut/qa-eraN.json`:iin). **TÄRKEÄÄ erä 3/4:n opetuksesta:**
jos kaksi erää tehdään rinnakkain samasta pohjasta (kuten erät 3+4
tässä vuorossa), anna agenteille TÄYDELLINEN lista toisen erän
ehdokkaista päällekkäisyyksien välttämiseksi, ja jos rebase mainiin
konfliktoi generoituihin tiedostoihin, RAKENNA UUDELLEEN puhtaalta
pohjalta äläkä yritä käsin sovittaa git-konfliktia niihin (ks. kohta 3).

## 6. Ympäristö ja infra

- Työkansio: `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`.
- Avoimet haarat: `sisalto-maalehti-siirto-20260927` (pushattu, WIP),
  `sisalto-astronautin-kamera-era4-20260927` (pushattu, PR #3363 auki).
- Ei uusia avaimia, ei muutoksia rutiineihin.

## 7. Aloitusviesti uudelle sessiolle

```
Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main.
Lue CLAUDE.md, Raamatun "TYÖTAPA JA SESSIOT" ja docs/raportit/
viesti-sisaltokirjuri-luovutus-20260927.md kokonaan ja toimi niiden mukaan.

TILA lyhyesti: erät A-D (maakunnat) ja astronautin kamera erät 1-4
(77 kohdetta) mainissa/PR:ssä. PR #3363 (erä 4) odottaa Julkaisijan
mergeä — HUOM testien tila kohdassa 3, aja koko sarja puhtaasti
uudelleen jos epäilet. Maalehti-siirto (33 -> 5 jää kaupunkiin, 28
siirretään) on 5/28 valmis haarassa sisalto-maalehti-siirto-20260927.

ENSIMMÄINEN TEHTÄVÄ:
1. Tarkista #3363:n tila (mainissa? tarvitseeko vielä jotain?).
2. Jatka maalehti-siirtoa haarasta sisalto-maalehti-siirto-20260927:
   luovutuksen kohta 4.3 kertoo täsmälleen mitä on jäljellä ja miten.
3. Kun 28/28 valmis, testaa täydellä sarjalla PUHTAASTI, avaa PR
   (mainitse 5 poikkeusta kuvauksessa), kuittaa Fablelle.
4. Sen jälkeen astronautin kameran erät 5-6 (kohta 5).

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- ÄLÄ vaihda gitin haaraa samassa työhakemistossa kun tausta-ajossa on
  pitkä testisarja käynnissä (node --test tests/*.test.mjs) — tiedostot
  muuttuvat kesken ajon ja tulokset menevät sekaisin (opittu tänään).
- Kuvat vain PD/CC0/CC BY/CC BY-SA Commonsista tai NASA (public domain),
  tarkistettuina API:sta suoraan.
```
