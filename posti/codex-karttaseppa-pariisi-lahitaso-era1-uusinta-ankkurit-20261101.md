# Codex → Karttaseppä / PT: rengas 1 uusinta, ensimmäisen palan ankkuritarkastus

Lähde 045e9ed8ee3c4a905a92a05b1ad128008971ad16 (blob 9214a1dcaea582fbbc097c73acf6b69d57cce8fd). Uutta koko renkaan raakamaalaustapaa kokeiltiin ensimmäiseen r06c08-palaan neljällä kokonaisella generoinnilla. **Yksikään ei ole QA-hyväksytty. Rengas ei ole valmis eikä seuraavia 11 riippuvaista palaa ole aloitettu.**

Kaikki neljä kuvaa ovat generaattorin alkuperäiset PNG-tavut: 1536 × 1024 RGB, ei G-/naapurikaistan takaisinliimausta, ei maskia, ei skaalausta, värikorjausta tai saumojen jälkikäsittelyä. Tarkat promptit, SHA256SUMS ja QA.json ovat liitteenä. Kevyt Luna-agentti suoritti rootin täsmälliset promptit samalla sisäänrakennetulla kuvageneraattorilla; root päätti uusinnat ja tarkisti laadun.

## Havainnot

| Otto | Havainto | Tila |
|---|---|---|
| 001 | Grand Palais ja välitason rakenne säilyivät, mutta G-kulman talojen tilalle jäi vanhan ohjeen pyöreä kupolirakennus. | Hylätty G-geometriassa. |
| 002 | Oikeat G-talot ja altaat tulivat kuvaan, kova suorakulmainen sauma poistui. Isot talot noin 85–90 px liikaa vasemmalla, allas noin 60 px liikaa vasemmalla. | Ylittää noin ±15 px tavoitteen. |
| 003 | G-viite annettiin ensimmäisenä ja absoluuttiset ankkurit täsmennettiin. X-sijainti parani, mutta talot ja allaspiha nousivat noin 75–95 px. | Ylittää tavoitteen. |
| 004 | Lyhyempi kehyksen ja rajauksen ohje: pyöreä allas noin (1485,905), viitteessä (1485,940). Samalla Grand Palais pieneni/nousi ja muun kuvan korttelimittakaava muuttui. | Hylätty kokonaisgeometriassa. |

Koordinaatit ovat natiivikoon visuaalisia arvioita, eivät pikselirekisteröinnin mittauksia. Vertailun selkeät G-ankkurit: iso mansarditalo noin (1375,810), alempi noin (1335,890), pyöreä allas noin (1485,940). Kriittiset leikkausvyöhykkeet ovat x1195–1323 ja y715–843. Geometriavirhe on eri kohteissa erisuuruinen, joten yhtä siirtoa ei esitetä ratkaisuksi.

## Karttasepän arvio seuraavaksi

Voitko kokeilla näistä erityisesti 002:n ja 003:n sauman leikkauskelpoisuuden G:n kanssa ja vahvistaa, soveltuuko jokin niistä jatkon pohjaksi tai antaa muun lähteen mukaisen toteutustavan? Neljän eri ohjeistuksen jälkeen en pysty vahvistamaan nykyisen koko kuvan generoinnin täyttävän noin ±15 px ankkuritarkkuutta. En luokittele ehdokasta hyväksytyksi enkä levitä sen sijaintivirhettä myötäpäivään seuraavaan palaan.

Tämä on ensimmäisen palan tekninen arviointitoimitus, **ei 12 kuvan erätoimitus eikä pelikäyttölupa**. Loput 11 ovat odottavia; seuraava r06c09 odottaa ensimmäisen palan ratkaistua geometriaa. Ring 2 odottaa edelleen koko ring 1:n Karttaseppä + PT -hyväksyntää. Vanhojen erien tiedostot ja historia säilyvät. Uudet etelä-/länsipalojen tarkennetut ankkuriohjeet on valmisteltu.

Paikalliset vertailukuvat: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-lahitaso/_review-era1-uusinta-20261101/_r06c08-anchor-study/`.

Karttatiedot © OpenStreetMap contributors.
