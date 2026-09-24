## 2026-09-24 14.10 UTC — FABLE → KUVAPUTKI: renessanssisalin teokset ja taiteilijoiden omakuvat (taidemuseo-linssin pilotti)

Fable (omistajan tilaus 24.9.2026 klo 18.0x Suomen aikaa, kortilla hyväksytty).

### Tausta

Natiiviin peliin tulee taidemuseo-linssi (omistaja 24.9.2026): virtuaalinen
museo, jonka saleja pelaaja kiertää; jokaisessa salissa opastettu
kamerakierros ja kertoja. Pilotti on renessanssisali (Firenze–Rooma–
Venetsia). Toteutus alkaa vasta pariteettikierroksen jälkeen, mutta
kuva-aineisto tilataan nyt, jotta Linssiseppä voi tehdä teosluettelon
ja kierroksen käsikirjoituksen valmiiksi.

### Tehtävä

1. **Teokset, 20–30 maalausta.** Vain teoksia, joiden tekijä on kuollut
   yli 70 vuotta sitten, ja kuvatiedosto PD tai CC0 (museoiden open
   access: Uffizi ei ole avoin — käytä Commonsin PD-toisintoja; Met,
   NGA Washington, Rijksmuseum, Art Institute of Chicago, Paris Musées,
   Wikimedia Commons "PD-Art"). Painotus Firenze, Rooma, Venetsia
   1400–1600: esim. Botticelli (Venuksen syntymä, Primavera), Leonardo
   (Ginevra de' Benci NGA, Neitsyt kallioluolassa), Michelangelo (Doni
   Tondo, Sikstuksen kappelin osia), Rafael (Ateenan koulu, Madonnat),
   Tizian (Urbinon Venus, Pyhä ja maallinen rakkaus), Giorgione
   (Myrsky), Bellini, Mantegna, Piero della Francesca, Fra Angelico,
   Masaccio, Ghirlandaio, Veronese, Tintoretto, Carpaccio. Korkein
   saatavilla oleva resoluutio; ämpäriin pitkä sivu 4000 px (salissa
   teoksia katsotaan läheltä) ja lisäksi 1800 px:n versio korteille.
2. **Veistokset, 5 kpl,** PD/CC0-3D-skannauksina (Scan the World,
   Smithsonian 3D, Statens Museum for Kunst): esim. Michelangelon David
   ja Pietà, Donatellon David, Verrocchion Colleoni, Cellinin Perseus.
   Toimita glTF/GLB tai OBJ + tekstuurit, korkeintaan 200 000 kolmiota
   per malli; jos skannaus on isompi, harvenna ja merkitse manifestiin.
3. **Taiteilijoiden omakuvat tai muotokuvat** (piirtyvät ilmaan
   kierroksella): jokaiselle salin taiteilijalle yksi PD-kuva
   (omakuva, aikalaismuotokuva tai Vasarin Vite-kaiverrus), pitkä sivu
   1800 px.
4. **Karttapiirrokset:** Firenzen, Rooman ja Venetsian 1500-luvun
   kaupunkikartat tai vedutat (PD), pitkä sivu 3000 px, salin
   karttapiirroksia varten.

### Manifesti

`posti/kuvatoimitus-renessanssisali-<pvm>.json`: per rivi teos/veistos/
muotokuva/kartta: id, tyyppi, nimi (suomeksi ja alkukielellä), tekijä,
tekijän elinvuodet, vuosi, syntykaupunki (firenze/rooma/venetsia/muu),
nykyinen sijainti (museo), lähde-URL, tiedoston lisenssi, attribuutio,
url ämpärissä (`matkakirja/museo/renessanssi/<tyyppi>/<id>.<ext>`),
sha256, tavut, leveys, korkeus (tai kolmiomäärä).

### Rajaukset

- Ei NC-, ND- eikä "museum use only" -aineistoa; jos teoksesta ei ole
  puhdasta PD/CC0-tiedostoa, jätä pois ja merkitse manifestiin
  `hylatty: syy`.
- Ei rajattuja tai vesileimattuja toisintoja.
- Ei tekoälyllä täydennettyjä kuvia.

### Toimitus

Manifesti + kuittaus postilaatikkoon (codex-fable-…). Saa tulla erissä:
ensin maalaukset, sitten veistokset, muotokuvat ja kartat. Kytkentä ja
teosluettelon viimeistely: Linssiseppä (docs/raportit/
linssi-taidemuseo-suunnitelma-20260924.md kohta 1).
