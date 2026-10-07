# TILANNE — Pariisin yksityiskohtakuvat (haara `fable-pariisi-kuvat`)

Pysäytetty 7.10.2026 päätoimittajan ohjeesta (omistajan 5 tunnin raja) kesken työn.

## JATKOAJO 7.10.2026 — käynnissä

Työ jatkuu uudessa pilvisessiossa. Verkkoyhteys Commonsiin on testattu toimivaksi
(API-haku, pikkukuvan lataus ja kuvan katsominen `Read`-työkalulla onnistuvat).

**Latauksen korjaus (tärkeä):** pikkukuva on ladattava API:n palauttamalla
`thumburl`-osoitteella **sellaisenaan**, koko kyselymerkkijono mukaan lukien.
Jos URL:ia muokkaa käsin (esim. vaihtaa `960px` → `640px`), palvelin vastaa
HTTP 400 ja antaa HTML-virhesivun JPEG:n sijaan. Huomaa myös, että
`iiurlwidth=640` palauttaa käytännössä 960 px:n pikkukuvan — se on API:n oma
valinta, ja sitä käytetään sellaisenaan.

Neljä kerääjä-agenttia käynnistetty TILANNE.md:n ryhmäjaolla; ne
kirjoittavat `wip/osa1..osa4.json` ja `wip/codex1..codex4.md`. Tämän jälkeen
ajetaan `yhdista.py`, sitten TARKISTAJA-agentti, ja lopuksi kirjoitetaan
kolme tulostiedostoa ja poistetaan `wip/`.

### Edistyminen

- Ryhmä 4 VALMIS (`wip/osa4.json` 15 riviä, `wip/codex4.md` 2 tilausta). Älä tee uudelleen.
- Ryhmä 3 VALMIS (`wip/osa3.json` 12 riviä, `wip/codex3.md` 3 tilausta; Garnier 0 kuvaa). Älä tee uudelleen.
- Ryhmä 2 VALMIS (`wip/osa2.json` 18 riviä, `wip/codex2.md` 2 tilausta). Älä tee uudelleen.
- Ryhmä 1 VALMIS (`wip/osa1.json` 26 riviä, `wip/codex1.md` 1 tilaus). Älä tee uudelleen.
- SEURAAVAKSI: `python3 esittely-tyo/kuvat/wip/yhdista.py`, sitten TARKISTAJA (sonnet), sitten tulostiedostot.
- (vanha rivi:) tämän kirjauksen hetkellä; jos `wip/osa<N>.json` puuttuu, aja ryhmä
  uudelleen Sonnetilla.

### Agenttimalli: SONNET (omistajan päätös 7.10.2026)

Omistaja päätti krediittien säästämiseksi, että tämä työ ajetaan **Sonnetilla**.
Kaikki tästä eteenpäin käynnistettävät ali-agentit ja TARKISTAJA-agentti ajetaan
mallilla `sonnet`. Ensimmäinen neljän kerääjän erä oli jo käynnistetty Opuksella
ja sai omistajan luvalla ajaa loppuun; jos jokin niistä on ajettava uudelleen,
uusinta tehdään Sonnetilla.

Tämä on CLAUDE.md:n agenttisäännön mukaista: sääntö vaatii Opuksen tai Sonnetin,
ja Sonnet kelpaa.

## Tehtävä lyhyesti

Pariisin kaupunkioppaan 20 kohteen teksteistä valitaan 1–3 konkreettista
yksityiskohtaa (yhteensä n. 40–60), joista kertojan puheen aikana lentää sivuun kuva
4–6 sekunniksi. Kuvat näyttävät sen, mitä ylhäältä 3D-näkymästä ei näe. Kuvat
Wikimedia Commonsista (vain PD / CC0 / CC BY / CC BY-SA); jos vapaata kuvaa ei ole,
kirjataan Codex-tilaus havainnekuvasta.

## Mitä on tehty

- Haara `fable-pariisi-kuvat` luotu haarasta `pelikoodari-esittely-pilvi`.
- Kaikkien 20 kohteen tekstit käyty läpi ja jaettu neljään erään. Kohteista 8:lla on
  sekä `teksti` että `lyhyt`, 12:lla vain `teksti` — eli tekstejä on 28, plus
  kaupungin avaus.
- **Työohje** `esittely-tyo/kuvat/wip/OHJE-kuvatyo.md`: ankkurisäännöt, lisenssirajat,
  tulosmuoto, kuvan arviointikriteerit, Codex-tilauksen muoto. Valmis.
- **Validaattori** `esittely-tyo/kuvat/wip/yhdista.py`: tarkistaa ankkurit oikeita
  tekstejä vasten (esiinnyttävä täsmälleen kerran), ankkureiden välit, lisenssit,
  kuvatekstien pituudet ja kaksoiskappaleet. Valmis, ei vielä ajettu aineistolla.
- **Wikimedian käyttötapa selvitetty.** Kontista pääsee Commonsin API:in ja
  pikkukuviin, kun noudatetaan robottipolitiikkaa:
  - User-Agent `MatkakirjaBot/1.0 (https://github.com/ravelius/Matkakirja)`
    — ei selaimen väärennystä, ei sähköpostiosoitetta UA:ssa
  - enintään 1 pyyntö sekunnissa
  - vain API:n palauttamia `thumburl`-pikkukuvia, enintään 640 px
  - HTTP 429 → odota `Retry-After`
  Tällä tavalla lataus toimii. Aiempi 429 johtui tahdista, ei UA:sta.
- **51 Commons-ehdokasta** kerätty talteen tiedostoon
  `esittely-tyo/kuvat/wip/commons-ehdokkaat.json` (lisenssi, tekijä, mitat, kuvaus).

## Mitä on jäljellä

**Kaikki varsinainen valintatyö.** Yhtään kuvaa ei ole katsottu eikä yhtäkään ole
liitetty ankkuriin. Ehdokaslista on tarkistamaton johtolanka.

Puuttuvat tulostiedostot:
- `esittely-tyo/kuvat/pariisi-yksityiskohdat.json`
- `esittely-tyo/kuvat/pariisi-yksityiskohdat.md`
- `esittely-tyo/kuvat/codex-tilaus-pariisi.md`

## Mistä jatketaan

1. Lue `esittely-tyo/kuvat/wip/OHJE-kuvatyo.md` — se on valmis työohje sellaisenaan.
2. Käynnistä neljä ali-agenttia (Opus, enintään 4 rinnakkain) samalla jaolla:
   - **Ryhmä 1:** kaupungin avaus, Q243 Eiffel-torni, Q19675 Louvre, Q2981 Notre-Dame,
     Q64436 Riemukaari, Q28785 Sacré-Cœur
   - **Ryhmä 2:** Q23402 Orsay, Q550 Champs-Élysées, Q189503 Concorde,
     Q178065 Pompidou, Q309458 Luxembourg
   - **Ryhmä 3:** Q188856 Panthéon, Q187840 Palais Garnier, Q193193 Sainte-Chapelle,
     Q188977 Les Invalides, Q390418 Pont Alexandre III
   - **Ryhmä 4:** Q335277 Pont Neuf, Q311 Père-Lachaise, Q898629 Place des Vosges,
     Q151030 Moulin Rouge, Q457318 Grand Palais
   Kukin kirjoittaa `osa<N>.json` ja `codex<N>.md`.
3. Aja `python3 esittely-tyo/kuvat/wip/yhdista.py` ja korjaa sen löytämät ongelmat.
4. Aja **TARKISTAJA-agentti** (eri agentti kuin kerääjät): lisenssit, kuvien osuvuus,
   ankkureiden tarkkuus.
5. Kirjoita kolme tulostiedostoa ja poista `wip/`-kansio.

### Anna agenteille tiedoksi

- **Jokainen kuva on katsottava** (`Read` ladattuun pikkukuvaan) ennen kuin
  `tarkistettu: true`. Jos pikkukuvat eivät aukea, valinta tehdään metatiedoista ja
  merkitään `tarkistettu: false`.
- **Ranskassa ei ole panoraamavapautta taideteoksille.** Tekijänoikeuden alaiset
  kohteet eivät todennäköisesti saa vapaata kuvaa, vaan menevät Codex-tilaukseen:
  Chagallin kattomaalaus (Palais Garnier), Stravinsky-suihkulähteen veistokset
  (Pompidou), Christon käärimä Pont Neuf 1985, Oscar Wilden haudan Epstein-veistos
  (Père-Lachaise). Myös Eiffel-tornin **yövalaistus** on tekijänoikeuden alainen —
  käytä päiväkuvia.
- **Notre-Damen tekstit ovat muuttumassa:** `teksti` alkaa sanoilla "Katedraali
  Notre-Dame seisoo" ja `lyhyt` sanoilla "Katedraalin pelasti rappiolta". Älä valitse
  Notre-Damen ankkuria tekstin alusta. Muu teksti on ennallaan, ja `yhdista.py`
  validoi ankkurit tiedoston nykyistä tekstiä vasten — Notre-Damen kaksi alkuankkuria
  on tarkistettava käsin, jos niitä käytetään.

## Epävarmat kohdat

- Kuinka moni yksityiskohta jää ilman vapaata kuvaa, selviää vasta tarkistuskierroksella.
  Tavoite 40–60 kuvaa voi jäädä vajaaksi, jolloin ero katetaan Codex-tilauksilla.
- Ehdokaslistalla on lisenssejä (GFDL, FAL), jotka eivät kelpaa. `yhdista.py` hylkää ne,
  mutta älä poimi niitä listalta käsin.
