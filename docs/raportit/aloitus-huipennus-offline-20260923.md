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
lipulla (`ui offline verkoton`), EI oikealla host-tason verkkokatkolla —
jaettu Mac, muut sessiot eivät saa häiriintyä.

- **Reaali-lataus (Luxemburg)**: yritin ladata Luxemburgin oikeasti asetukset-
  paneelin "Lataa"-napista (simulaattorin kosketustyökalulla, vieritin listan
  L-kirjaimeen ja napautin). Napautus ei tuottanut havaittavaa muutosta eikä
  `Documents/offline/`-kansioon ilmestynyt tiedostoja 2 minuutin sisällä.
  **En vahvistanut, toimiko lataus oikeasti** — napautus saattoi osua ohi
  (Unity-canvasilla ei ole natiivia accessibility-puuta, joten kohdistus on
  pelkkää pikselilaskentaa screenshotista) tai lataus ei kirjoita
  `Documents/offline/`-kansioon vaan johonkin muualle (esim. `Library/Caches/
  laatat/`, joka täyttyy joka tapauksessa tavallisesta kartan selauksesta).
  Ei tutkittu pidemmälle ajan puutteessa — jos reaali-lataus on tärkeä todistaa,
  tarvitaan joko konsolilokin luku asennushetkellä tai selkeämpi osoitin
  (esim. latauspalkin animaatio) siitä että lataus todella käynnistyi.
- **Verkoton-tila**: `ui offline verkoton` → pilleri "Ei verkkoa · ei
  ladattuja maita" ilmestyi oikein (kuva `offline-savuke-20260923/
  ei-verkkoa-ei-ladattuja.png`). Peruskartta (topografia, kaupunkinimet)
  piirtyi silti oikein Ranskan/Beneluxin alueella — perusprojisointi ei
  vaadi verkkoa (erillinen pohjadata bundlessa vai jo välimuistissa
  aiemmasta selauksesta, ei varmistettu kumpi). **Ei todistettu** että
  nimenomaan Luxemburgin laatat tulisivat ladatusta offline-datasta, koska
  latausta ei voitu vahvistaa (yllä).
- `ui offline pois` palautti tilan oikein lokin mukaan.

## Johtopäätös

Offline-UI:n tilanhallinta (pilleri, verkoton-pakotus) toimii. Itse
lataustoiminnon (`OfflineSilta.Lataa`) todentaminen jäi kesken — tarvitaan
joko oma ui-komento reaalilataukselle (esim. `ui offline lataa luxemburg`)
tai Documents-polun varmistus keneltä omistaa `OfflineTilaUi.cs`/
`OfflineSilta.cs` (Natiiviseppä, Kartta-alue TYOTAPA.md:n mukaan).
