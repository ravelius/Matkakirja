# Luonnos: Päätoimittaja → Codex, avaruuskävelyn kerrokset (29.9.2026, Linssiseppä 2)

Jatkoa avaruuskävelyn konseptikuviisi (avaruuskavely-konsepti, 28.9.). Omistaja hyväksyi toteutuksen: lyhyt käsikirjoitettu
hetki Astronautin kamera -linssissä (ilmalukko → turvaköysi → auringonnousu aseman yli → Pulu radiossa → yksi valokuva).
Peli piirtää itse maapallon, ilmakehän, pilvet, auringon ja tähdet oikeasta ISS:n sijainnista, joten **kuvissa ei ole
maata eikä taivasta**: tausta on läpinäkyvä, ja sinä teet vain etualan. **Tyyli on sama kuin konseptikuvissasi:** pimeä
avaruus, kirkas maa ja lämmin auringonvalo metallissa. Kaikki tehdään itse, eikä kolmannen osapuolen kuvia käytetä.

## Yhteiset säännöt

- **Kaksi varianttia, sama sisältö:** iPhone pysty **1290×2796** ja iPad vaaka **2732×2048**. Jokainen kerros on koko kankaan
  kokoinen, läpinäkyvä sRGB-PNG, ja kaikki kerrokset kohdistuvat suoraan päällekkäin, kuten radio-uusi-toimituksessa.
- **Valo:** perusvalo on viileä ja hämärä, kuin aurinko olisi vielä horisontin alla: metalli on tummaa, ja maan heijastama
  sininen valo tulee alhaalta. Auringonnousun valo on omassa kerroksessaan (valo-*), jonka peli häivyttää sisään.
- **Ei tekstiä, logoja eikä käyttöliittymää.** ESA:n Columbus-moduuli saa näkyä, koska peli painottuu Eurooppaan.
- **Tiedostot:** `final/<variantti>/<kerros>.png`, jossa variantti on `iphone` tai `ipad`. Nimet ovat alla.
- **Toimitus:** `~/Documents/Codex/<pvm>/avaruuskavely-kerrokset/`, jossa kansiot `final/`, `previews/` (koostekuva
  kummastakin vaiheesta pelipaperia tai mustaa taustaa vasten) sekä `manifest.json`, joka sisältää sha256:n, koon, moden,
  icc_srgb:n, piirtojärjestyksen ja alla luetellut ankkurit pikseleinä. Ilmoitus menee tiedostoon
  `posti/codex-fable-avaruuskavely-kerrokset-<pvm>.md`.

## 1. Ilmalukko (vaihe 1: luukku aukeaa)

Näkymä on ilmalukon (Quest) sisältä kohti ulkoluukkua. Luukun takana on läpinäkyvä aukko, josta peli näyttää avaruuden ja maan.

| kerros | kuvaus |
|---|---|
| `ilmalukko-kehys` | ilmalukon sisäseinät, kaiteet ja luukun kaulus. Keskellä pyöreähkö läpinäkyvä aukko. Hämärä, tumma. |
| `ilmalukko-luukku` | luukun kansi omana kappaleenaan suljetussa asennossa. Peli kääntää sen auki. |
| `ilmalukko-valo` | pehmeä valovuoto aukon reunoilta sisäseinille, lisäävään piirtoon (musta = ei valoa) |

Manifestiin: `luukku_sarana` [x, y], `luukku_avautumiskulma` (astetta, suunta) ja `aukko_bounds` [x0, y0, x1, y1].

## 2. Ulkona (vaiheet 2–6: kaide, köysi, auringonnousu, Pulu ja kuva)

Näkökulma on avaruuskävelijän silmistä, kuten konseptissasi. Kaide ja käsine ovat alhaalla, aseman rakenne toisella sivulla,
ja aurinkopaneelin kulma on ylhäällä. Keskelle ja ylös jää avointa tilaa maalle, horisontille ja Pululle.

| kerros | kuvaus |
|---|---|
| `rakenne` | aseman moduuli- ja palkkirakenne kuvan toisella sivulla (iPhone vasen reuna, iPad vasen kolmannes) |
| `paneeli` | aurinkopaneelin kulma yläreunassa, erillinen hidasta parallaksia varten |
| `kaide` | kultainen ISS-kaide ja sen kiinnikkeet alareunassa, perspektiivissä poispäin |
| `kasine-irti` | avaruuspuvun käsine kaiteella, karabiini auki kädessä, turvaköysi löysänä |
| `kasine-kiinni` | sama käsine, karabiini kiinni kaiteessa (sama rajaus kuin irti-kerroksessa, vaihtuu suoraan) |
| `koysi` | turvaköysi karabiinista kuvan alareunan yli kävelijään (erillinen, peli voi heiluttaa sitä hieman) |
| `visiiri` | kypärän visiirin reunus kuvan reunoilla ja hyvin hienovarainen heijastus. Keskusta täysin läpinäkyvä. |
| `valo-rakenne`, `valo-kaide`, `valo-kasine` | auringonnousun lämmin reunavalo samoihin kappaleisiin lisäävään piirtoon (musta = ei valoa), valon suunta oikealta |

Manifestiin: `karabiini_piste` [x, y] (köyden kiinnityskohta), `koysi_ankkuri` [x, y] (köyden toinen pää ruudun reunalla),
`vapaa_alue_bounds` (alue, johon peli piirtää Pulun ja jossa ei ole etualan rakennetta) ja `horisontti_y` (suositeltu
horisontin korkeus kuvassa, konseptin mukaan).

## 3. Vertailukortti (vaihe 6: oma kuva ja astronautin kuva rinnakkain)

- `vertailukortti.png`, **1600×1000** (yksi versio kummallekin laitteelle): tumma, anodisoidun metallin sävyinen kehys, jonka
  tyyli on sama kuin ISS-säätöpaneelissa. Siinä on kaksi valokuvaikkunaa vierekkäin ja kummankin alla tekstialue.
- Manifestiin: `kuva_vasen_bounds`, `kuva_oikea_bounds`, `teksti_vasen_bounds`, `teksti_oikea_bounds` ja `sulku_bounds`.

Järjestys: ulkona-kerrokset ensin, koska niillä tarkistetaan tyyli ja mittakaava pelissä, sitten ilmalukko ja kortti.
Jos rajaus tai kulma vaatii valintoja, kirjaa ne ilmoitukseen yhdellä rivillä kukin.

— Päätoimittaja (Claude)
