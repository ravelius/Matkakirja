# Kioto-faktapohjan riippumaton tarkistus

Lähde tarkistettu: `faktapohja-kioto.md`. Kaikki en-Wikipedia-artikkelit
haettu uudelleen raakatekstinä (`action=raw`) 20.8.2026: Kyoto, Kyoto
Imperial Palace, Kyōto Station, Kiyomizu-dera, Fushimi Inari-taisha,
Kinkaku-ji, Ginkaku-ji, Nijō Castle, Gion, Sanjūsangen-dō, Nishiki
Market, Geisha. Ei yhtään #REDIRECT-sivua, eli uusintanoutoja ei
tarvittu.

## Leipätekstiväitteet (osiot 1–3, 5, 6)

Kaikki tarkistetut asiaväitteet — Heian-kyōn perustaminen 794 (Kanmu,
Chang'an-malli), pääkaupunkiasema 794–1868/1869, Biwa-kanava
(1885–1890, 20 km, vesivoima 1895, ensimmäinen sähköraitiotie 1895),
atomipommiharkinta ja Stimson/Nagasaki, Kioton säästyminen
pommituksilta, Ōnin-sota (1467–1477), Hamaguri/Kinmon-kapina 1864
(28 000 taloa), kolme suurkaupunkia (Kioto/Osaka/Edo), 2000
uskonnollista paikkaa (1600 temppeliä + 400 pyhäkköä), 20 %
kansallisaarteista / 14 % tärkeistä kulttuuriomaisuuskohteista,
Kioto-aseman mitat (1997, Hiroshi Hara, 70 m × 470 m), pinta-ala
827,9 km² / 17,9 % prefektuurista, pohjavesi/kaivot-kuvaus, Gionin
geiko/machiya/ochaya-kuvaus, Yasaka-pyhäkkö Gionin alkuperänä,
Fushimi Inari 711/Hata-suku/Korean niemimaa/kastelu-silkki-sake,
Inari riisin/maanviljelyn ja myöhemmin kauppiaiden kami, ~10 000
toria / ~800 Senbon Torii -käytävässä, Kioton nimet (Kyō, Miyako,
Kyō no Miyako, Saikyō, Kioto/Miaco/Meaco/Miako), Kioton keisarillisen
palatsin 8 jälleenrakennusta Edo-kaudella (1613/1642/1655/1662/
1675/1709/1790/1855), nykyinen 1855 keisari Kōmein pyynnöstä,
Meijin muutto Tokioon 1869 ja valitus 1877, Taishōn ja Shōwan
kruunajaiset palatsissa, Köppen Cfa -ilmasto ja sadekausi
(kesäkuun puoliväli–heinäkuun loppu) — **täsmäävät Wikipedian
raakatekstiin sanatarkasti tai asiasisällöltään.** Myös Geisha-
artikkelin H1-nostoon viitattu väite Heian-hovin taidemuotojen
perustasta täsmää (rivi 74, en-Wikipedia "Geisha").

Yhteensä tarkistettu n. 30 erillistä asiaväitettä leipäteksteistä —
**ei yhtään virhettä.**

## Koordinaatit ja etäisyyslaskelmat (osio 4)

Kaikki taulukon koordinaatit verrattu artikkelien infoboksi-
koordinaatteihin. Kahdeksan yhdeksästä täsmää tarkalleen (Kioto-asema,
palatsi, Kiyomizu-dera, Fushimi Inari, Ginkaku-ji, Nijō-linna,
Sanjūsangen-dō, Nishiki-tori) — myös Gionin desimaalimuotoinen
koordinaatti (35,003496°N 135,775051°E) on muunnettu oikein asteiksi/
minuuteiksi/sekunneiksi (35°00′12,6″N 135°46′30,2″E, täsmää).

### VIRHE 1 — Kinkaku-jin koordinaatin DMS-muunnos väärin

**Väite (rivi 342, 351–356):** Kinkaku-ji 35°02′22,2″N
**135°43′55,8″E**, merkitty epävarmaksi.

**Oikea tieto:** Wikipedian infoboksi antaa desimaalimuodon
35,0395°N 135,7285°E. Muunnettuna tarkasti: leveysaste 35°02′22,2″N
on oikein, mutta pituusaste on **135°43′42,6″E**, ei 135°43′55,8″E.
Ero johtuu laskuvirheestä minuutti→sekunti-muunnoksessa
(0,7285°×60=43,71′; 0,71′×60=42,6″, ei 55,8″). Ero on n. 13 kaarisekuntia
pituudessa eli n. 330 m maastossa — pieni mutta todellinen virhe, joka
oikeutetusti oli merkitty tarkistettavaksi.

**Lähde:** en-Wikipedia "Kinkaku-ji" (`{{Coord|35.0395|N|135.7285|E}}`),
oma haversine/DMS-uudelleenlasku.

Huom.: virheestä huolimatta taulukon etäisyysarvio "n. 6–7 km LP"
osuu oikein (ks. alla), koska 330 m:n koordinaattivirhe ei siirrä
6,6 km:n etäisyyttä havaittavasti.

### Etäisyyslaskelmat uudelleenlaskettuna (haversine, Kioto-asemasta)

| Kohde | Faktapohjan arvio | Oma haversine-laskelma | Ero |
|---|---|---|---|
| Palatsi | ~4,5 km P | 4,45 km, suunta 5° (P) | OK |
| Kiyomizu-dera | ~2,5 km IK | 2,70 km, suunta 67° (IK) | OK (~8 %) |
| Fushimi Inari-taisha | ~2,0 km ES | 2,44 km, suunta 146° (E–ES) | **~22 % aliarvio** |
| Kinkaku-ji | n. 6–7 km LP | 6,58 km, suunta 336° (LP) | OK, osuu haarukkaan |
| Ginkaku-ji | ~4,5 km P | 5,89 km, suunta 39° (KO) | **VIRHE: ~31 % aliarvio, suunta väärin (ei P vaan koillinen)** |
| Nijō-linna | ~1,7 km LK | 3,33 km, suunta 344° (P–LP) | **VIRHE: n. 2× aliarvio** |
| Gion | ~2,2 km I | 2,55 km, suunta 38° (KO) | **suunta väärin (ei I vaan koillinen); etäisyys ~16 % pielessä** |
| Sanjūsangen-dō | ~1,7 km I | 1,29 km, suunta 78° (I) | ~24 % yliarvio |
| Nishiki-tori | ~1,7 km P | 2,31 km, suunta 19° (P–KO) | ~36 % aliarvio |

**VIRHE 2 (merkittävin):** Ginkaku-jin ja Nijō-linnan etäisyydet ja
suunnat ovat selvästi virheelliset — Nijō-linnan etäisyys on lähes
kaksinkertainen todelliseen verrattuna (1,7 km vs. todellinen 3,33 km),
ja Ginkaku-jin suunta on merkitty pohjoiseksi, vaikka se on
koilliseen Kioto-asemasta. Myös Fushimi Inarin, Gionin,
Sanjūsangen-dōn ja Nishiki-torin etäisyydet poikkeavat 16–36 %, ja
Gionin suuntamerkintä ("I") on virheellinen (oikea suunta koillinen).
Tarkistin laskennan sekä täydellä haversine-kaavalla että
faktapohjan omalla ilmoittamalla yksinkertaistetulla menetelmällä
(asteet×111 km, pituusasteille ×cos 35°) — tulokset ovat käytännössä
identtiset, joten kyse ei ole menetelmäerosta vaan koordinaattien
käsittelyvirheistä (esim. suuntien pyöristys/arviointi ilman
todellista bearing-laskentaa).

**Lähde:** kaikki lähdekoordinaatit em. artikkeleiden infoboksien
raakatekstistä; laskenta oma (Python, haversine + bearing).

## Kioton keskipiste ja rajausvalinta (osio 7, kohdat 1, 4)

- Faktapohjan huomio "Kioto-kaupungin pääartikkelin infoboksissa ei
  ole tarkkaa koordinaattilukua" **pitää paikkansa** — pääartikkelin
  `{{Coord|region:JP-26_type:city|...}}`-mallissa ei ole
  leveys-/pituusastelukuja raakatekstissä. Kioto-aseman koordinaatin
  (34°59′07,6″N 135°45′28,0″E) käyttö keskipisteenä on perusteltu
  vaihtoehto, ja palatsin koordinaatti (35°01′31″N 135°45′44″E)
  vaihtoehtona on myös oikein siteerattu.
- Kinkaku-jin ja koko Kioton hajonnan tarkistus: Kinkaku-ji–Fushimi
  Inari -etäisyys on 8,99 km (haversine), mikä täsmää faktapohjan
  arvioon "n. 8–9 km pohjois-eteläsuunnassa". **Rajauspäätös on siis
  oikein perusteltu** — Kioto ei mahdu 2–4 km:n kaupunkilehti-
  ohjenuoraan, jos molemmat pohjois- ja eteläpään kohteet halutaan
  mukaan. A/B-vaihtoehdot (tiivis vs. laaja rajaus) ovat molemmat
  teknisesti toteutuskelpoisia; laajempi rajaus (B) tarvitsee
  huomattavasti isomman karttaikkunan kuin Medina-mallissa käytetty.

Overpass-tarkistusta ei tarvittu, koska Wikipedia-koordinaattien ja
oman haversine-laskennan välillä ei ollut yli 100 m:n erotusta
minkään kohteen osalta (Kinkaku-jin oma DMS-kirjoitusvirhe pois
lukien, joka on jo korjattu yllä eikä liity infoboksin
alkuperäiseen dataan).

## Sisältölinjaus (uskonto, sävy, ajankohta)

Kaikki tarkistetut tekstiluonnokset käsittelevät shintoa,
buddhalaisuutta ja geisha-kulttuuria historiallis-kulttuurisena
ilmiönä kunnioittavalla sävyllä; nykypolitiikkaa tai nykysotaa ei
mainita. WWII-atomipommiharkinta ja Hamaguri-kapina ovat historiaa
(1864, 1945), eivät nykyaikaa, ja ne on esitetty asiallisesti.
Kuva-aihe-osiossa (6) on erikseen huomioitu tunnistettavien
ihmisten (erit. maikojen) välttäminen kuvissa — tämä on
linjauksen mukaista ja hyvä lisähuomio. 1873-ajankohta on pidetty
johdonmukaisesti esillä (moderni Kioto-asema ja UNESCO mainittu
vain selvästi merkittynä taustatietona).

## Yhteenveto

- Tarkistettuja yksittäisiä faktaväitteitä leipäteksteistä: **n. 30**
  → **0 virhettä**.
- Tarkistettuja koordinaatteja: **9** (kymmenestä kohteesta, Kioto-
  asema on keskipiste) → **1 virhe** (Kinkaku-jin pituusasteen
  DMS-muunnos, ~330 m).
- Tarkistettuja etäisyyslaskelmia: **9** → **2 selvää virhettä**
  (Ginkaku-ji, Nijō-linna — sekä etäisyys että suunta pielessä) ja
  **4 lievempää poikkeamaa** (Fushimi Inari, Gion, Sanjūsangen-dō,
  Nishiki-tori, 16–36 % pielessä, joista Gionin suuntamerkintä myös
  väärä).
- Keskipistevalinta ja tiivis/laaja-rajausanalyysi (osio 4 ja 7):
  **vahvistettu oikeiksi** omalla haversine-laskennalla.
- Sisältölinjaus (uskonto, sävy, 1873-ajankohta): **ei huomautettavaa**.

**Suositus:** ennen kartan lukitsemista korjaa Kinkaku-jin
pituusasteen DMS-arvo (135°43′42,6″E) ja laske kaikki yhdeksän
etäisyyttä/suuntaa uudelleen esim. samalla Python-haversine-
menetelmällä kuin tässä raportissa — erityisesti Ginkaku-jin ja
Nijō-linnan luvut ja suunnat ovat tällä hetkellä virheellisiä eivätkä
kelpaa sellaisenaan kartan mittakaavan tai rajauksen perusteeksi.
