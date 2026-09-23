# Aloitus/huipennus-polku ja offline-savuke — laitetesti (23.9.2026)

Ajettu simulaattorissa, build 760f9d8 (natiivi-ui/vieritys mukana:
chatin ScrollTo-korjaus; `ui aloita pariisi` toimii nyt; kaksintaistelu
poistettu kysymysnäkymästä).

## 1. Aloitus- ja huipennusnäkymät (`ui aloitus portti|avaus|valinta`, `ui huipennus`)

Kuvat: `/Users/Shared/Claude/proto-3d/lokit/natiivi-aloitus-huipennus-20260923/`

- `ui-aloitus-portti.png`: OK — "Aloita seikkailu" -portti pallon päällä, "Oppiminen on hauskaa".
- `ui-aloitus-avaus.png`: OK — OSA II · Unohdettu aarre -avausteksti (Heathrow, Lontoo).
- `ui-aloitus-valinta.png`: OK — Valitse aloituskaupunki -ruudukko (16 kaupunkia).
- `ui-huipennus.png`: **POIKKEAA** — näyttää saman "Valitse aloituskaupunki" -ruudukon
  eikä huipennus-näkymää. `ui.Huipennus.Nayta(...)` kutsutaan `UiKomennot.cs`:ssä
  suoraan `ui sulje`:n jälkeen; joko `ui sulje` ei sulkenut Aloitus-dialogia
  kokonaan tai Huipennus piirtyy sen alle (z-järjestys). Ei tutkittu tarkemmin —
  Natiivi-UI:n tai Natiivisepän tiedosto (`Aloitusnakyma.cs`/`Huipennus`-näkymä).
  **Ensimmäinen yritys** (ennen relaunchia) tuotti saman kuvan kuin edellisen
  chat-testin jäätynyt ruutu (ScrollTo-poikkeus, ks. viesti Natiivi-UI:lle) —
  toistettu puhtaalla relaunchilla, tulos silti sama Valitse-ruudukko.

## 2. Offline-savuke

Omistajan ohje (AskUserQuestion 23.9.2026): verkon katkaisu sovelluksen omalla
lipulla, EI oikealla host-tason verkkokatkolla — jaettu Mac, muut sessiot
eivät saa häiriintyä.

Ensimmäinen yritys (build 760f9d8, ilman reaalilataus-komentoa): epäonnistui,
ks. alla. **Natiiviseppä lisäsi Fablen pyynnöstä oikean reaalilataus-komennon**
(`offline lataa <ISO>`, `palvelin`, Documents/komento.txt, build 689d020) —
uusittu sillä, **7/7 onnistui**:

- `offline lataa LUX` (komento.txt): lataa ensin maailman yleiskartan (8,5 Mt,
  6 s), sitten LUX:n (27,3 Mt, 465/465 tiedostoa, 0 virhettä, 7 s). Lokinäyte
  `offline-savuke-20260923/lataus-lokinaki.txt`.
- Sovellus käynnistetty uudelleen (kylmä, ei säilynyttä yhteyttä), kamera
  ajettu Luxemburgiin (`aja 49.61 6.13 4 1.5`), `palvelin`-komento:
  **`offline 733, välimuisti 563, verkko 147, virheitä 0`** — offline-lukema
  reilusti yli nollan (iPadilla vertailuarvo oli 613). Todistaa, että laatat
  todella tulevat ladatusta offline-datasta eikä pelkästä ajonaikaisesta
  välimuistista. Lokinäyte `offline-savuke-20260923/palvelin-lokinaki.txt`.
- **Verkoton-tila** (`ui offline verkoton`, build 760f9d8): pilleri "Ei
  verkkoa · ei ladattuja maita" ilmestyi oikein (kuva `offline-savuke-
  20260923/ei-verkkoa-ei-ladattuja.png`), peruskartta piirtyi silti.
  `ui offline pois` palautti tilan oikein.

### Aiempi, epäonnistunut yritys (jätetty talteen oppina)

Ennen reaalilataus-komennon saamista yritin ladata Luxemburgin
asetuspaneelin "Lataa"-napista simulaattorin kosketustyökalulla (vieritin
L-kirjaimeen, napautin pikselilaskennalla — Unity-canvasilla ei ole natiivia
accessibility-puuta). Napautus ei tuottanut havaittavaa muutosta eikä
`Documents/offline/`-kansioon ilmestynyt tiedostoja 2 min sisällä; en
saanut varmuutta osuiko napautus edes oikein. Natiiviseppä ratkaisi tämän
lisäämällä suoran testikomennon — kosketuspohjainen reitti jäi tarpeettomaksi.

## Johtopäätös

Sekä lataus että offline-serveröinti todistettu toimivaksi oikealla datalla
(733 offline-osumaa). Verkoton-UI (pilleri) toimii. Ei avoimia löydöksiä.
