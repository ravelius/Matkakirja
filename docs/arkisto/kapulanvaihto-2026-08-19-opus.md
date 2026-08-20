> **ARKISTOITU 19.8.2026 (Opus).** Tämä on kertaraportti eikä ohje.
> Kapulanvaihto kirjoitettiin, koska tämän session kreditit loppuvat ja
> työ siirtyy toiselle sessiolle. Voimassa olevat ohjeet ovat
> CLAUDE.md:ssä, js/tyohuone-raamattu.js:ssä ja docs/roolitus.md:ssä —
> älä lue tästä ohjeita, lue tästä TILANNE.

# Kapulanvaihto 19.8.2026 — Opus, Lähi-idän lehtityö

## Tila luovutushetkellä

- **Haara `claude/kaupunkilehti-istanbul-4e5pif`, versiot v930–v934.**
  Kaikki committoitu ja pushattu. **PR:ää EI ole avattu.**
- **`origin/main` on yhä v929.** Versiotyökalu `tools/uusi-versio.mjs`
  lukee vain mainia, joten se ehdottaa v930:tä uudelleen. Kun v930–v934
  on mergetty, työkalu toimii taas normaalisti; siihen asti versionosto
  tehdään käsin kolmeen paikkaan (sw.js CACHE, js/main.js APP_VERSION,
  js/muutokset.js:n kärki).
- Kaikki portit vihreitä viimeisimmässä committissa: `node --test
  tests/*.test.mjs` 813 testiä fail 0, kaksoisavaimet, niputus,
  savukkeet ja build-standalone kunnossa.

## Mitä valmistui

| Versio | Lehti | Sisältö |
|---|---|---|
| v930 | Petra | kohdekartta 9 kohteella, 9 juttua, 2 sivua, opas |
| v931 | Kappadokia | ALUELEHTI, 2 sivua, opas |
| v932 | Persepolis | 2 sivua, opas, **ei karttaa** |
| v933 | Jerusalem | kohdekartta 6 kohteella, 6 juttua, 2 sivua, opas |
| v934 | Siinai | ALUELEHTI, 2 sivua, opas |

Yhteensä 40 nostoa, 25 opasjaksoa, 15 nähtävyysjuttua ja 116 kuvaa.
Uudet säärivit: petra, kapadokia, persepolis, jerusalem, siinai.

## Mitä on jäljellä Lähi-idässä

**Lehdettömät kohteet (3 jäljellä 8:sta):**

1. **Medina** — kaupunkilehti. Faktapohja valmis:
   `docs/arkisto/faktapohja-medina.md`.
2. **Mekka** — kaupunkilehti. Faktapohja valmis:
   `docs/arkisto/faktapohja-mekka.md`.
3. **Ruba al-Khali** — ALUELEHTI. Faktapohja valmis:
   `docs/arkisto/faktapohja-rubalkhali.md`. **Lue ensin alta kohta
   "Ratkaisematon ristiriita".**

**16 Lähi-idän lehteä, joilla on lehti mutta EI avauskuvia eikä
matkaopasta:** ankara, nikosia, izmir (sai avauskuvat v929:ssä mutta ei
opasta), halab, damaskos, luxor, riad, sana, aden, salalah, masqat,
doha, kuwait, mosul, tabriz, isfahan. Useimmilla on vain 6
karttakohdetta; sanalla, adenilla, salalahilla ja mosulilla ei ole
yhtään.

**Persepolikselta puuttuu kohdekartta.** Syy oli tekninen: Overpass oli
alhaalla (500/502) koko sen työvaiheen ajan. Kartta voidaan piirtää
jälkikäteen — laudan id on `persepolis` ja säärivi on jo paketissa.

## Ratkaisematon ristiriita, joka pitää hoitaa ennen Ruba al-Khalia

Faktapohjan koonnut agentti löysi **pelin sisäisen ristiriidan**:
Riadin lehden nostossa Wabarin meteoriitin painoksi annetaan museon
kyltin mukaan 2,2 / 2,75 tonnia, mutta en-Wikipedian artikkeli *Wabar
craters* sanoo suurimman kappaleen olevan 2 045 kg. Tämä ei ole
lähdevirhe vaan kahden eri kappaleen tai eri mittauksen sekaannus, ja
se pitää selvittää ennen kuin Ruba al-Khalin lehti kertoo Wabarista.
Älä kirjoita uutta lukua ennen kuin vanha on tarkistettu.

## Avoin päätös Fablella

**Pitäisikö kuvien mennä repon sijaan ämpäriin?** Omistaja kysyi tämän
19.8.2026, ja kysymys on kirjattu `docs/viesti-fable.md`:hen numeroiden
kanssa. Ydin: Commons-kuvat EIVÄT ole repossa (peli hakee ne ajossa
Special:FilePathista), mutta `tools/fetch-photos.mjs` peilaa osan
paikallisiksi kopioiksi (assets/valokuvat, 60 Mt) ja Flickr-reitti
vaatii aina paikallisen kopion. Painavin kansio on kuitenkin
assets/kartat (120 Mt), joka on itse generoitua. Offline-käyttö on se,
mikä paikallisilla kopioilla ostetaan.

Omistajan linjaus kuvavalintaan 19.8.2026: **"Käytä vain flickeriä jos
siellä on parempia kuvia."** Eli laatu ratkaisee, ei repon paino.

## Työtapa, joka toimi

Yhden lehden putki alusta loppuun:

1. **Sonnet-agentti** kokoaa faktapohjan (lukevaa työtä, ei repoon
   koskemista). Rinnakkain enintään kolme — enemmän tuottaa 429:iä,
   koska agentit lukevat samaa Wikipediaa kuin sinä.
2. **Tarkista agentin faktat itse** raakatekstistä
   (`index.php?action=raw`). Tämä ei ole muodollisuus, ks. alla.
3. **Säärivi** ennen kuvia: saanormaalit.mjs + kaista.mjs, sitten rivi
   js/packs/saatiedot.js:ään omalla kommentilla.
4. **Kohdekartta** (vain kaupunkilehdet): rajaus
   tools/piirra-kaupunkikartta.mjs:ään, ajo, **kuva katsotaan silmin**,
   sitten tarkista-karttapisteet.mjs.
5. **YKSI peräkkäinen kuvajono.** Ei koskaan rinnakkaista kuvaparvea.
6. **Jokainen kuva katsotaan silmin** ja lisenssi varmistetaan
   rajapinnasta ennen kirjoittamista.
7. Kirjoita lehti, **mittaa pituudet koneellisesti** (johdanto 154–232,
   nosto 440–660), aja portit, Chromium-savuke, versionosto,
   TESTATTAVAA-rivi, commit, push.

Apuskriptit ovat tallessa: `docs/arkisto/lehtityon-apuskriptit.md`.

## Ansat, jotka maksoivat aikaa

- **Agenttien raporteissa on virheitä.** Kolme napattiin tarkistuksessa:
  (a) Jerusalemin faktapohja väitti Montefioren myllyn toimineen
  vuoteen 1873 mennessä vartiotornina — lähteen 1873-maininta koskee
  väkivaltaista välikohtausta, joka ei kuulu pelin linjaan;
  (b) sama agentti merkitsi itse keksineensä otsikkoon luvun "24 km";
  (c) Persepoliksen faktapohja puhui savitaulujen "palkkalistoista",
  mutta lähde puhuu ANNOKSISTA — työ maksettiin viljana ja karjana.
- **Wikipedian uudelleenohjaukset.** `Kaymaklı Underground City`,
  `Hezekiah's Tunnel`, `Kızılırmak` ja `Jebeliya` ovat ohjauksia; raaka
  haku palauttaa vain `#REDIRECT`-rivin. Tarkista aina, tuliko oikea
  artikkeli.
- **Overpass vaatii yksirivisen kyselyn** URLSearchParamsilla ja
  User-Agentin. Monirivinen saa 406/429.
- **Kuvasääntö on tiukempi kuin miltä tuntuu.** Toistakymmentä
  ehdokasta hylättiin. Tarkennus 19.8.2026: kuvan päälle lisätty
  merkintä hylkää kuvan riippumatta siitä, onko se moderni vesileima
  vai vanhan studion signeeraus (American Colony, Signal Corps).
  Julkaisijan oma selite (NASAn nuoli) kelpaa, kun se kerrotaan
  kuvatekstissä.
- **Jerusalem on kuvasäännön kannalta vaikein kohde.** Porteista ei
  löytynyt yhtään vapaata kuvaa ilman tunnistettavia ihmisiä — ei
  nykykuvista eikä 1900-luvun alun PD-kokoelmista. Siksi karttakohteita
  on kuusi eikä kymmenen.
- **1800-luvun PD-aineisto on aliarvostettu resurssi.** David
  Robertsin litografiat, Cornelis de Bruijnin kaiverrukset,
  Matson-kokoelma ja vanhat kartat ovat sekä ihmisettömiä että
  aikakaudeltaan juuri oikeita vuoden 1873 kehykseen.
- **Apuskriptit kaatuivat yhteyskatkoihin.** Korjattu: jokaisessa on
  nyt uusintalogiikka. Tämä oli suurin yksittäinen virhelähde.

## Kaksi koodimuutosta, jotka jäivät repoon

- `tools/piirra-kaupunkikartta.mjs`: uusi kaupunkikohtainen lippu
  **`rauniokaupunki`**. Se nostaa polut ja raunioalueiden reunaviivat
  asuinkadun vahvuuteen. Tarpeen aina, kun kartan "kadut" ovat OSM:ssä
  jalankulkuteitä: Petra, Jerusalemin vanhakaupunki. **Sama lippu
  korjaisi todennäköisesti Luxorin dokumentoidun ongelman**, joka on
  kirjattu saman tiedoston luxor-kohtaan ("KESKEN 13.8.2026").
- Kolmeen lehteen lisättiin sivu-id `historia` ja yhteen `tiede` ja
  yhteen `maasto` — kaikki vakioaiheita, joilla on valmis kuvake
  (js/ui-apurit.js: AIHE_IKONIT). Älä keksi uusia id:itä.
