# 1.0.30-jatko: talous, pelistreak, vuori, pienten maiden kynnys (27.9.2026 ~16.3x-17.1x)

Sama käännös (juna-78565bff/b7d9535d), sama laite (1572C658). 0 poikkeusta.

## Tulokset

- **Pelistreak + armopäivä: PASS, täydellinen todiste.** Löysin debug-komennon `koetila pelipaiva
  yyyy-MM-dd` (peli-komento.txt, ei tarvitse simulaattorin kellon siirtoa!). Testisarja:
  25.9→26.9→27.9→28.9 (peräkkäiset): putki kasvoi 1→2→3→4, palkkio +20£ alkaen putkesta 3.
  **30.9 (hyppäsi 29.9 yli, yksi väliinjäänyt päivä): putki jatkui 5:een — armopäivä toimii.**
  **3.10 (hyppäsi 1.10 JA 2.10 yli, kaksi peräkkäistä väliinjäänyttä): putki NOLLAANTUI 1:een —
  kaksi väliinjäänyttä päivää katkaisee oikein.** Täsmää spekseihin ("yksi väliin jäänyt päivä 7
  päivän ikkunassa ei katkaise").
- **Talous-loppukortti: EI SAATU AIKAAN, tarvitsee dedikoidun debug-komennon.** Ei löytynyt suoraa
  tapaa nollata kassa. `kulkutapa odota` vaatii, että MIKÄÄN muu kulkutapa ei ole käytettävissä
  (saari ilman laivarahaa) — ei yleiskäyttöinen "kuluta päivä" -nappi. Kokeilin `matka <kaupunki>
  liftaus` -sarjaa (Pariisi→Marseille onnistui), mutta raha (460£) ei muuttunut edes saapumisen
  jälkeen — päiväkulu ilmeisesti veloitetaan vasta yöpymisen yhteydessä, ei jokaisesta hypystä.
  Kaupunki-id:t eivät ole yksinkertaisia pieniä kirjaimia (esim. "lyon"/"nice" → "tuntematon
  kaupunki"), oikea muoto jäi selvittämättä tässä ajassa. **Suositus Natiivisepälle:** lisää
  debug-komento esim. `koetila raha 0` tai `koetila loppukortti` suoraan MatkaPaattyi-tilan
  pakottamiseen, muuten testaus vaatii pitkän oikean pelisession simuloinnin.
- **Vuori-symboli (LOD0 juuren tahkot korjattu): PASS, visuaalisesti vahvistettu.** Löytyi
  Chaîne des Puys -alueelta Keski-Ranskasta (45.53, 2.81): `symbolit tila` näytti "symboli:Vuori×1"
  LOD0-tasolla, 4 maakontaktia (istuu maastolla). Kuvakaappauksessa malli näyttää oikein
  muotoutuneelta (ei läpinäkyvä/nurinpäin pohja). HUOM muille: Vuori-symbolia EI löytynyt Ateenan/
  Olympoksen koordinaateista tällä kierroksella, koska pelisessio oli Ranskassa eikä Kreikan
  sisältö ollut ladattu — symbolit näkyvät vain sen maan sisällössä, jossa nykyinen matka on käynyt.
- **Pienten maiden lähitason kynnys: EDELLEEN EPÄSELVÄ.** `aja 51.88 4.63 <zoom> 2` + `nostot tila
  NLD` antoi ZoomKerroin ~4,5-4,6 riippumatta "aja"-komennon zoom-parametrista (0,08 vs 0,2) —
  parametri ei ilmeisesti ohjaa suoraan tätä lukua, tai ZoomKerroin lasketaan nykyisen pelimaan
  (FRA, ei NLD) saapumiskorkeuden suhteen eikä katsomani maan. **Suositus:** testaa aloittamalla
  peli suoraan pienessä maassa (`uusi-peli 1 <NLD-kaupunki>`) eikä isossa maassa ulkopuolelta
  katsoen, jotta ZoomKerroin lasketaan oikeasta viitekehyksestä.

## Yhteenveto

Pelistreak+armopäivä nyt täysin todistettu PASS (löytyi erinomainen debug-komento `koetila
pelipaiva`). Vuori-symboli PASS visuaalisesti. Talous-loppukortti ja pienten maiden kynnys jäivät
edelleen auki — molemmat vaativat joko lisää debug-tukea (talous) tai erilaisen testiasetelman
(pienet maat, aloita niissä eikä katso ulkopuolelta). 0 poikkeusta.
