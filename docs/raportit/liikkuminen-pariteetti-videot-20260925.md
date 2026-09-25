# Liikkumisen pariteettivideot — J3/J4/J5 valmiit (25.9.2026 aamu)

Jatkoa Laitetestaajan luovutukselle `viesti-laitetestaaja-luovutus-20260925.md`.
Kaikki tiedostot kansiossa `/Users/Shared/Claude/proto-3d/lokit/liikkuminen-pariteetti/`.

## Uudet videot

- `natiivi-j3-iphone.mp4`, `natiivi-j4-iphone.mp4` — natiivi, `kulkutapa liftaus`
  + `siirto`/`heita`-komennoin (peli-komento.txt).
- `web-j3-j4-iphone.mp4` — web, Liiku → `button[aria-label="Liftaus"]` →
  `window.matkakirja.ui.doMove(key)` kauimmalle reitin varren kohteelle,
  jatkoa `ui.doRoll()` + `doMove` kaupunkiin asti (Playwright webkit).
- `web-j5-iphone.mp4` — web, Kehittäjätila+Maailma `localStorage`-lipuin,
  `game.actionKehittajaSiirto('lontoo')` Ateenan portista Lontooseen.
- Pelikoodari on jo koostanut `videopari-j3-j4-web-vasen-natiivi-oikea-iphone.mp4`
  samaan kansioon — jatkakaa siitä.

## J3-poikkeama: kummallakin puolella yksi ainoa siirtokohde

Sekä natiivissa että webissä Liftaus-heitto antoi TÄSSÄ istunnossa vain yhden
siirtokohteen (natiivi: `c:sofia` suoraan kaupunkiin 4 askeleella ensimmäisellä
yrityksellä, uusinnalla `e:sofia|ateena:3` reitin varrelle; web: `e:sofia|ateena:3`).
Nämä eivät ole toistettavia siemeniä (natiivi `uusi-matka` ilman siementä, web
noppa arpoutuu), joten en pystynyt pakottamaan "kauimmainen reitin varren kohde
useista vaihtoehdoista" -tilannetta. Videot näyttävät silti oikean zoomin,
reittiviivat ja liikkeen — jos tarvitset nimenomaan monen vaihtoehdon tilanteen,
kerro niin ajan uusiksi siemenellä (natiivi `uusi-peli <siemen> ateena`) kunnes
osuu useampi kohde.

## Web-tekninen huomio (hyödyllinen jatkoa varten)

`window.matkakirja = {game, ui, sfx}` on julkinen jo tuotannossa. Hyödyllisiä
kutsuja komentoriviltä/Playwrightilta ilman kosketusta:
- `game.moveOptions()` — siirtokohteet (`{key, pos:{type, edge|city, idx}}`).
- `ui.doMove(key)` — HUOM ottaa AVAIMEN merkkijonona, ei olio-referenssiä.
- `ui.doRoll()` — heittää nopan.
- `game.cityOf(id)`, `game.actionKehittajaSiirto(cityId)` — kehittäjäsiirto
  (vaatii `player.packId` osoittamaan oikeaan pakettiin, ks. alla).
- Kehittäjätila/Maailma webissä on PELKKÄ `localStorage`-lippu
  (`matkakirja-kehittaja`, `matkakirja-kehittaja-maailma` = '1'), ei
  Keychain-koodia kuten natiivissa — turvallinen asettaa Playwrightin
  `addInitScript`:llä ennen sivulatausta.
- "Maailma"-kytkin on VAIN sumu/hunt-toggle nykyiselle paketille, EI
  pakuninvaihdin. Maailmankartalle (Lontoo ym.) pääsee oikeasti
  porttikaupungin `city.links`-listan kautta (Ateenalla on
  `{pack:'maailmankartta', city:'lontoo'}`); `maailmankartta`-maailma on jo
  ladattu pelin alusta (`game.worlds.has('maailmankartta') === true`), joten
  J5:n saa toimimaan asettamalla `player.packId = 'maailmankartta'` ennen
  `actionKehittajaSiirto`-kutsua.

## J5 NATIIVISSA: EI TEHTY — vaatii kehittäjäkoodin

Natiivissa KOKEET-valikko (ja siten Maailma-kytkin) vaatii
`Asetukset.Kehittaja`, joka natiivissa on portitettu salasanakoodilla
(pollo-kehittäjäkoodi, iOS Keychain) — EI sama kuin linssien oma
`kehittaja 1`-testikomento (`linssi-komento.txt`), joka avaa vain linssien
kynnykset, ei KOKEET-osiota. En kokeillut arvata koodia. Jos J5 halutaan
natiivissa kuvattua, tarvitaan joko: a) omistajan/Fablen antama koodi tälle
sessiolle, tai b) tilapäinen testikomento joka asettaa
`Asetukset.Kehittaja`-lipun suoraan (kuten linssien vastaava), tai c) pelkkä
webin J5-video hyväksytään pariteettitodisteeksi (mekanismi — porttisiirto —
on sama molemmilla, ero on vain UI-polussa kytkimeen).

## Sivuhavainto: mcp iOS Simulator -kosketustyökalu ei toiminut tässä istunnossa

`mcp__Claude_Code_iOS_Simulator__control` `tap`/`screenshot` eivät
vaikuttaneet peliin lainkaan tässä sessiossa (raportoi onnistuneen, mutta
ruutu ei muuttunut edes selvillä napeilla kuten hampurilaisvalikko tai
laukku — vahvistettu kahdesti eri napeilla, suora `xcrun simctl io
screenshot` toimi koko ajan). En saanut selvitettyä juurisyytä (ehkä
istunnon oma iOS-simulaattori-ominaisuus oli pois päältä). Kierrin ongelman
kokonaan tekstikomennoin (`ui-komento.txt`, `linssi-komento.txt`,
`peli-komento.txt`) — nämä ovatkin luotettavampia ja tarkempia kuin
kosketussimulointi, joten suosittelen niitä jatkossakin ensisijaisena
natiivin ajamiseen ilman kosketusta.
