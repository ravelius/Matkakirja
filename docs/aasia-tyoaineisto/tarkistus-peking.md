# Pekingin faktapohjan riippumaton tarkistus

Tarkistettu vasten en-Wikipedian raakatekstiä (action=raw, 20.8.2026,
NODE_USE_ENV_PROXY=1) artikkeleista: Beijing, Forbidden City, Hutong,
Peking duck, Great Wall of China, Badaling, Temple of Heaven, Old
Summer Palace, Summer Palace, Peking opera, Nanluoguxiang, Tiananmen,
Drum Tower and Bell Tower of Beijing, Lama Temple (redirect), Yonghe
Temple.

## Tulos lyhyesti

**Ei löytynyt yhtään asiavirhettä.** Kaikki tarkistetut faktaväitteet
(n. 90 kpl, ks. erittely alla) vastaavat lähdeartikkeleiden tekstiä.
Kaikki kahdeksan kohdekartan koordinaattia täsmäävät infoboksien
koordinaatteihin tarkalleen, ja itse lasketut haversine-etäisyydet
(ks. alla) vahvistavat faktapohjan omat etäisyyslaskelmat n. 0,01–0,1
km:n tarkkuudella — laskentavirheitä ei ole.

## Koordinaatit ja etäisyydet — oma haversine-tarkistus

Laskin uudelleen kaikkien kahdeksan kohteen etäisyyden Tiananmenista
Pythonin haversine-kaavalla (pallosäde 6371 km) suoraan
Wikipedia-infoboksien koordinaateista, sekä suuntakulman (bearing).

| Kohde | Oma etäisyys | Faktapohjan etäisyys | Oma suunta | Faktapohjan suuntamerkintä |
|---|---|---|---|---|
| Kielletty kaupunki | 0,95 km | ~0,9 km | 358,7° (P) | P — OK |
| Taivaan temppeli | 3,09 km | ~3,1 km | 154,6° (SSE) | "E" (=etelä) — likimäärin oikein, tarkemmin SSE |
| Rumpu/Kellotorni | 3,66 km | ~3,7 km | 358,1° (P) | P — OK |
| Nanluoguxiang | 3,94 km | ~3,9 km | 6,6° (P) | P — OK |
| Yonghe-temppeli | 4,72 km | ~4,7 km | 21,2° (NNE) | P — likimäärin oikein, tarkemmin NNE |
| Kesäpalatsi | 14,46 km | ~14,4 km | 313,9° (LP) | LP — OK |
| Vanha kesäpalatsi | 13,93 km | ~13,9 km | 322,9° (LP) | LP — OK |
| Badaling | 59,46 km | ~59 km (osio 7) | 326,8° (LP) | — |

Kaikki etäisyysluvut täsmäävät faktapohjan omiin laskelmiin lähes
tarkalleen — ei virhettä. Ainoa huomio: suuntamerkinnät "P" ja "E"
(pohjoinen/etelä) ovat karkeita nelisuuntaisia likiarvoja; Taivaan
temppeli on tarkemmin ottaen SSE (154,6°) ja Yonghe-temppeli NNE
(21,2°) Tiananmenista. Tämä ei ole virhe vaan yksinkertaistus, joka
faktapohjassa on itsekin todettu ("yksinkertaistettu pallogeometria")
— mainitaan tässä vain täydellisyyden vuoksi, jos kirjoittaja haluaa
tarkempia ilmansuuntia karttatekstiin.

Badaling: faktapohjan oma laskelma ~59 km linnuntietä vs. Wikipedian
tekstin "approximately 80 km northwest of Beijing's city center"
(Badaling-artikkeli) — molemmat luvut on tarkistettu oikein
lainatuiksi. Huomio kirjoittajalle: Wikipedian 80 km ei ole
eksplisiittisesti merkitty "tietä pitkin" -arvioksi artikkelissa,
vaan se on todennäköisesti sekin karkea "etäisyys keskustasta"
-ilmaus (ei täsmennetä mittaustapaa) — faktapohjan selitys
("tie mutkittelee vuoristossa") on siis oma, ei suoraan lähteestä
todennettu tulkinta 21 km:n erolle. Ei virhe, mutta merkitty
epävarmaksi.

## Yksityiskohtainen faktantarkistus (poiminta)

Kaikki alla luetellut väitteet vastaavat lähdettä sanatarkasti tai
asiasisällöltään:

- **Kielletty kaupunki**: rakennettu 1406–1420, 1420–1924 keisarien
  koti, 24 keisaria (14 Ming, 10 Qing), 961 m × 753 m, muuri 7,9 m,
  vallihauta 6 m syvä × 52 m leveä, 9999 vs. todellinen 8886
  huonetilaa (myytti vahvistettu artikkelissa sanatarkasti), UNESCO
  1987 — kaikki OK (en-Wikipedia "Forbidden City").
- **Hutong**: mongolialainen alkuperä "vesikaivo", Yuan-dynastia
  (1279–1368), siheyuan-rivistö, itä-länsi-suunta + feng shui
  (vahvistettu "Beijing"-artikkelin Cityscape-osiosta, ei
  "Hutong"-artikkelista, kuten faktapohja oikein kaksoislähdyttää),
  978 → 1330 hutongia Qing-tilastoista 1949 mennessä — kaikki OK.
- **Peking-ankka**: Etelä-Pohjoisdynastiat, resepti 1330 (Hu Sihui),
  Bianyifang 1416, Quanjude 1864 (Yang Quanren, riippu-uuni),
  Qianlong-kausi (1736–1796) yläluokan suosio — kaikki OK.
- **Kiinan muuri**: 21 196,18 km, Liaodong–Lop Nur (Lop Lake),
  ensimmäiset osat 600-luvulta eaa. — OK. Badaling: 80 km luoteeseen,
  rakennettu 1504/1505, avattu matkailulle 1957 ensimmäisenä
  osuutena — kaikki OK.
- **Nimet/Beijing-etymologia**: Ji, Yanjing, Zhongdu, Dadu, Beiping,
  Beijing-nimi annettu 1403 erottamaan Nanjingista, Martino Martini
  "Peking" -kirjoitusasu Amsterdam 1655 ("Novus Atlas Sinensis") —
  kaikki OK.
- **Taivaan temppeli**: 1406–1420, 2,73 km², pyöreän alttarin
  9–18–...–9×9 laattarenkaat, Sadonkorjuuhallin 4/12/12 pilaria —
  kaikki OK.
- **Vanha kesäpalatsi / Kesäpalatsi 1873**: poltto 1860 Toisessa
  oopiumisodassa, "sodan viimeinen teko", kiinankielinen
  varoituskyltti — sanatarkasti vahvistettu. Tongzhi-keisarin
  entisöintiyritys ja sen keskeytyminen rahapulan vuoksi — OK,
  MUTTA ks. huomio alla. Ernst Ohlmerin valokuva n. 1872–1873 —
  vahvistettu "Beijing"-artikkelin kuvatekstistä sanatarkasti.
  Uusi Kesäpalatsi tuhoutui 1860, jälleenrakennettu 1884–1895,
  nimettiin Yiheyuaniksi 1888 — kaikki OK.
- **Peking-ooppera**: 1790 Anhui-seurueet, Qianlongin 80-vuotispäivä
  25.9., 1828 Hubei-seurueet, täysin kehittynyt 1845 mennessä,
  naiskielto Kangxista 1671 alkaen, viimeksi Qianlong 1772,
  naisia lavalla epävirallisesti 1870-luvulta, ensimmäinen
  naisseurue Shanghaissa (Li Maoer), kielto purettu 1912 — kaikki OK.
- **Nyrkkeilijäkapina (jakso 4)**: Pekingin taistelu 14.–15.8.1900,
  rauhansopimus 7.9.1901, korvaukset 39 vuoden ajalta, Cixi palasi
  7.1.1902 — kaikki sanatarkasti OK.
- **Maantiede/ilmasto**: Pohjois-Kiinan tasangon pohjoisreuna, vuoret
  P/LP/L, Chaobai/Yongding/Juma Hai-joen vesistössä kaakkoon,
  40–60 m korkeus, Toinen kehätie seuraa vanhaa muuria, "leviää kuin
  pannukakku" (tan da bing), Köppen Dwa/BSk, monsuuni/Siperian
  antisykloni, kevään hiekkamyrskyt Gobilta — kaikki OK.
- **Ming-muuri/metro**: kaupunginmuuri seisoi vuoteen 1965, purettiin
  metron tieltä — sanatarkasti vahvistettu.
- **Nanluoguxiang**: n. 800 m, Dongcheng, Gulou East St – Di'anmen
  East St — OK.
- **Redirect**: "Lama Temple" ohjautuu artikkeliin "Yonghe Temple" —
  vahvistettu (#REDIRECT [[Yonghe Temple]]).

## Sisältölinjaushuomiot (ei nykypolitiikkaa, uskonto/väkivalta neutraalisti)

Linjaus vaikuttaa noudatetun huolellisesti:

- 1900-luvun tapahtumat (Boxer-kapina) esiintyvät VAIN jaksossa 4,
  lyhyesti ja neutraalisti faktapohjaisesti — ei arvottavaa kieltä.
- Kulttuurivallankumousta, Tiananmenin 1989-tapahtumia tai muita
  myöhempiä kiistanalaisia aiheita ei ole käytetty missään nostossa
  tai jaksossa, vaikka lähdeartikkeleissa (erityisesti "Beijing",
  "Hutong", "Forbidden City", "Summer Palace") näistä on runsaasti
  materiaalia. Tarkistin itse: esim. "Beijing"-artikkelissa mainitaan
  mm. Zhao Ziyangin kotiaresti Tiananmenin jälkeen ja Kulttuurivallan-
  kumouksen ajan tuhot Kielletyssä kaupungissa — näitä ei ole
  faktapohjassa, kuten pitääkin.
- Väkivalta (Toisen oopiumisodan ryöstö/poltto, Boxer-kapinan
  piiritys) on kuvattu neutraalina historiana ilman sensaatiohakuista
  kieltä, tapahtumat lainattu suoraan lähteestä.
- Uskonto (Taivaan temppeli, Yonghe/Lama-temppeli, feng shui) on
  käsitelty historiallis-kulttuurisena kontekstina, ei nykyuskonnon
  kannanottoina — linjan mukaista.
- Kuva-aiheiden osiossa (6) on eksplisiittinen huomio "ei
  tunnistettavia ihmisiä" ja "ei poliittisia symboleita" — linjan
  mukaista, ei löytynyt ristiriitaa.

## Epävarmuudet / huomiot kirjoittajalle (ei virheitä, mutta syytä tietää)

1. **Badaling 80 km vs. 59 km -selitys on tulkinta, ei suoraan
   lähteestä todennettu** (ks. yllä, koordinaatit-osio) — faktapohjan
   oletus "tie mutkittelee" on todennäköinen mutta ei Wikipedian
   tekstin eksplisiittisesti vahvistama.
2. **Vuosi 1873 oli itse asiassa Tongzhi-keisarin
   entisöintiyrityksen alkamisvuosi Vanhalla kesäpalatsilla** — Old
   Summer Palace -artikkeli sanoo eksplisiittisesti: "In 1873, the
   teenage Tongzhi Emperor attempted to rebuild the Old Summer
   Palace... the emperor finally agreed to stop the project in
   1874." Faktapohjan H3-nosto ("Vuonna 1873 matkustaja olisi siis
   nähnyt vain rikkinäisiä pylväitä...") on asiallisesti oikein
   (hanke oli vasta alussa/keskeytymässä, ei valmis), mutta ei
   mainitse, että 1873 oli juuri se vuosi, jolloin entisöinti oli
   käynnissä — tämä olisi kiinnostava lisäyksityiskohta kirjoittajalle
   (esim. "isoisä olisi voinut nähdä työmaan"), ei virhe vaan
   käyttämätön mahdollisuus.
3. **Suuntamerkinnät (P/E/LP) taulukossa ovat karkeita** — ks.
   haversine-osio yllä; Taivaan temppeli on tarkemmin SSE, Yonghe
   NNE, ei tarkasti S/N. Ei virhe, mutta täsmennettävissä.

## Yhteenveto

- Tarkistettuja yksittäisiä faktaväitteitä: n. 90 (kaikki nostot,
  jaksot, kohdekartan koordinaatit, säätiedot).
- Asiavirheitä löytyi: **0**.
- Laskuvirheitä (haversine-etäisyydet): **0**.
- Epävarmoja/tulkinnanvaraisia kohtia: 2 (Badalingin
  etäisyysselitys; suuntamerkintöjen karkeus) — molemmat merkitty
  yllä, eivät vaadi korjausta vaan ovat tiedoksi kirjoittajalle.
- Yksi käyttämätön lisädetalji löytyi (Tongzhi-entisöinti alkoi
  juuri 1873) — ei virhe, mahdollinen rikastus H3-nostoon.
- Sisältölinjaus (ei nykypolitiikkaa, uskonto/väkivalta neutraalisti)
  vaikuttaa noudatetun johdonmukaisesti koko faktapohjassa.

**Kokonaisarvio: faktapohja on poikkeuksellisen tarkka — kaikki
tarkistetut väitteet ja koordinaatit vastaavat lähdettä.**
