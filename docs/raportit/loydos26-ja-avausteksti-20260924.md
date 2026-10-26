# Löydös 26 (Pariisin lähizoomi) ja avausteksti-portti — kuvaparit 24.9.2026 klo 16.4x

Kansio: `/Users/Shared/Claude/proto-3d/lokit/loydos26-pariisi-zoomi/`
(iPhone 393×852, iPad 834×1194)

## 1. Löydös 26: web-kuvat MITATTUINA (valmis)

`web-lahizoomi-pariisi-iphone.jpg` / `-ipad.jpg`. Mitattu
`window.matkakirja.ui.pallolauta.kamera.nakyvaAlue().w` (lautayksikköä):
- iPhone 393×852: **40.00** (puhelimen kynnys, 1,2°) — täsmää kamera.js:n
  60→40-kertoimeen.
- iPad 834×1194: **60.00** (työpöydän kynnys, 1,8°).

Kuvat otettu `?lauta=pallo&dev=pariisi` + `matkaZoomirajat(true)` (vapauttaa
matkan aikaisen zoomirajoituksen) + `napautaKaupunki('pariisi')` +
ctrl+wheel-zoomaus keskelle ruutua. Näkymässä on auki nosto-paneeli
(normaali pelitila, ei bugi).

## 2. Löydös 26: natiivi — PASS (Natiivisepän vahvistus 24.9. klo 17.1x)

Ensimmäinen mittaukseni (`ui aloita pariisi` → pinch-zoomaus) johti harhaan:
"ISO-BRITANNIA"-teksti oli maapaneelin (pelaajan nykyinen maa, Lontoo)
otsikko, ei karttasisältöä, ja natiivi- ja web-kuvat osoittivat eri kohtaan
kartalla — mittakaavoja ei voinut verrata suoraan.

Natiivisepän korjattu mittaus: `komento:aja 49.0 4.0 0.1 1` (Champagne)
molemmilla laitteilla, `natiivi-champagne-{iphone,ipad}.jpg`. Nimiöitä ei
näkynyt (ks. kohta 2b), joten mittasin kahden merkitsemättömän reittipisteen
etäisyyden ruudun leveyden suhteena: iPad ≈0,52, iPhone ≈0,78, suhde 1,49 —
täsmää odotettuun 1,8°/1,2°=1,5:een. **PASS**, Natiivisepän vahvistama
24.9.2026 klo 17.1x perusteilla: natiivi käyttää samaa kaavaa/vakioita kuin
web (60/40 lautayksikköä, kerroin 1,5, PalloKierto.MinKorkeus = kamera.js
lähinKorkeus), oma simulaattorimittaus vahvisti saman, ja tämä suhdeluku
täsmää.

### 2b. Uusi löydös: nimiöt puuttuvat lähizoomissa (ei zoomivika, oma rivi)

`natiivi-champagne-{iphone,ipad}.jpg`: lähimmässä zoomissa (Champagne-alue,
49.0°N 4.0°E) EI näy yhtään paikannimeä (esim. Reims, Verdun) — vain kaksi
merkitsemätöntä pyöreää pistemerkkiä reitillä. Web näyttää samalla
alueella "CHAMPAGNE", "Grand Est" ja "Verdun"-nimiöt. Natiiviseppä
vahvisti: tämä on oma löydöksensä, ei osa löydös 26:ta. Ilmoitettava
Fablelle/Natiivi-UI:lle erikseen (nimiöiden latautuminen/piirto tässä
zoomissa ja tilassa).

Sivuhavainto: `peli:uusi-peli`-testikomennon jälkeen aloitusvalikon
(MATKAKIRJA-otsikko, Jatka/Uusi matka -napit) UI jäi näkyviin PÄÄLLEKKÄIN
käynnissä olevan pelin kanssa, kunnes `ui sulje` suljettiin erikseen — voi
olla testikomennon oma artefakti (ei mene normaalin "Uusi matka" -napin
kautta), ei varmistettu oikealla kosketuksella.

## 3. Avausteksti-portti (Pelikoodari, testi/b10b d4950c0) — kuvat valmiit

Polku: portti → "Uusi matka" (`ui napauta`, koska iPhone 17:llä ei
kosketuslupaa) → kesken (~2–4 s) → valmis (VALITSE ALOITUSKAUPUNKI näkyy) →
napautus → valintanäkymä.

- `natiivi-avausteksti-kesken-{iphone,ipad}.jpg`
- `natiivi-avausteksti-valmis-{iphone,ipad}.jpg`
- `natiivi-valinta-{iphone,ipad}.jpg` — **pallo SUORAAN valintanäkymään, EI
  Lontoo-zoomia**, pulu esittelee ("Hei, odotas kaveri...") — täsmää
  pyydettyyn korjaukseen, PASS rakenteellisesti. Web-vastineet (kesken/
  valmis) jo ennestään `proto-3d/lokit/avausteksti-web-20260924/` — ei
  web-vastinetta valinta-näkymälle vielä, joten en merkitse tätä riviä
  lopullisesti WEB ON MALLI -tasoiseksi PASS:ksi ennen kuin joku ottaa sen.
- Kohta 4 (napautus kesken kirjoituksen) jätetty tekemättä (vapaaehtoinen,
  ajanpuutteen vuoksi).

## 4. testi/b10c (67dcc5e) — yläpalkki ja tekstitaustat

**Yläpalkki**: `natiivi-ylapalkki-pysty-iphone.jpg` (pakotettu pysty-tila =
täysi ruskea palkki + logo, kuten iPad), `natiivi-ylapalkki-vaaka-iphone.jpg`
(pakotettu vaaka-tila = kelluvat napit Dynamic Islandin vieressä, ei palkkia
— täsmää hyväksyttyyn iPhone-poikkeamaan), `natiivi-ylapalkki-ipad.jpg` +
`web-ylapalkki-ipad.jpg` vertailuun (en mitannut pikseleitä vielä).
**HUOM**: en testannut, mikä on iPhonen OMA automaattinen pysty-tila
(kytkin "auto") — kuvasin vain pakotetut ääripäät.

**Tekstitaustat**: `natiivi-{kaupunkilehti,maalehti,nostokortti}-
{iphone,ipad}.jpg` ja `web-{kaupunkilehti,maalehti}-{iphone,ipad}.jpg`
(nostokortin web-vastinetta en löytänyt konsolista — vaatisi oikean
napautuksen kartan valolle, en ehtinyt). **Silmämääräinen ero**: web
näyttää lihavamman/tummemman otsikkofontin ja tasaisen (ei rakeisen)
pergamenttivärin; natiivissa fontti on ohuempi ja taustassa näkyy selvä
pergamenttirae/-kuvio. En mitannut fonttipainoa tai väriarvoja — vain
silmämääräinen huomio, tarkistettava Sisältökirjurin/Pelikoodarin kanssa
ennen PASS/FAIL-merkintää.

**Noppa-kartalle-vaihe: PASS, kuvattu onnistuneesti** (kolmannella
yrityksellä — juurisyy oli `peli:uusi-peli` ajettuna liian pian relaunchin
jälkeen, jolloin sisältö ei ollut vielä ladattu; ks. Documents/peli-loki.txt
jokaisesta komennosta annettu vastaus, tästä opittiin lukemaan lokia
arvaamisen sijaan). Toimiva järjestys (Pelikoodari): `peli:odota-tila
Aloitus 30` → `peli:uusi-peli 5 marseille` → `ui:ui sulje` → `peli:odota-tila
Kartta` → `peli:kulkutapa liftaus` (liftaus heittää nopan itse, kuten webin
doWalk). `natiivi-noppa-kartalle-{iphone,ipad}.jpg`: iPadin kuva näyttää
noppakuvakkeen ja pulun reaktiokuplan suoraan kartalla saapumiskortin
vieressä — täsmää "noppa kartalle" -kuvaukseen. Web-vastinetta ei vielä
otettu.

Pelikoodari korjasi myös juurisyyn (473270e, merge-pyyntö Natiivisepällä):
`uusi-peli` sulkee jatkossa aloitusnäytön itse, `ui sulje` ei ole enää
tarpeen sen jälkeen kun korjaus on buildissa.

**Astro-linssi**: EI minun tehtäväni — Linssiseppä hoitaa (kuvaparit +
ISS-video, keskusteltu suoraan heidän kanssaan). En yritä sitä enää.

**Ison iPadin kierros: valmis.** HUOM: "iso iPad" jota Linssiseppä/Natiiviseppä
käyttivät (00008103…) on fyysinen laite eri App ID:llä
(fi.matkakirja.peli.kehitys) — en koskenut siihen. Käytin sen sijaan
iPad Pro 13" (M5) -SIMULAATTORIA (3B4CDACB…, 1024 pt leveä, sama luokka kuin
Fablen mainitsema 1024×1366), asensin app.matkakirja.proto3d:n siihen
suoraan iPhone 17:n asennuksesta. Lisätty kuvaa.sh:aan laitteena "isoipad".
`natiivi-ylapalkki-puhdas-isoipad.jpg`, `natiivi-saapuminen-ateena-isoipad.jpg`
(bonus, sama saapumistesti kolmannella koolla), `natiivi-{kaupunkilehti,
maalehti,nostokortti}-isoipad.jpg`. Silmämääräinen huomio: kaupunkilehti-
kortti EI täytä koko 1024 px:n leveyttä — karttaa näkyy molemmin puolin
(katettu leveys, ei koko ruutu) — voi olla tarkoituksellinen lukukortin
enimmäisleveys, ei varmistettu bugiksi.

## Laitteet vapaina

iPhone 17 ja iPad Pro 11" (503000D1) vapaana tämän jälkeen (peli aloitettu
b10b:llä, ei tallennettu erikseen).
