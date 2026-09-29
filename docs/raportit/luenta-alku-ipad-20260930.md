# Luennan alku fyysisellä iPadilla (Linssiseppä 2, 30.9.2026 klo 00.0x)

Omistajan pyyntö 29.9. klo 23.5x: "Testaa luenta huolella oikealla iPadilla. Haluan että tulee kerralla kuntoon."

## Laite ja käännös
- **Fyysinen** iPad Pro (12.9-inch) (5th generation), "iPad Pro 13 (Sami)", UDID 00008103-001819421413401E, iOS 26.4.1 (23E254),
  devicectl: Device Reality physical. Reitti Speaker (ei Bluetooth-kuulokkeita pariliitettynä, ks. kohta Bluetooth).
- Release-käännös 8f04fa16 (Natiiviseppä laite-release.sh) = juna/b13 27291efd + proto linssiseppa2/luenta-alku 8b4b74dd:
  yhteinen ääni-istunto puheelle ja radiolle (MatkakirjaAani.mm, MatkakirjaRadio.mm), alun turvaverkko (kelaus alkuun > 0,25 s),
  Bluetooth-esilämmitys 0,5 s, matkakirjan pergamentti. Bundle fi.matkakirja.peli.kehitys.

## Menetelmä
- Ajuri devicectl: komennot Documentsiin (peli-/ui-/linssi-komento.txt), Unityn konsoli (stdout) aikaleimattuna (ms).
- Jokaisesta luennasta: pyynnöstä ääneen, **1. soiva kohta** (AudioSource.time ensimmäisessä soivassa ruudussa), **hiljaa** (soitettu
  aika alle puolen voimakkuudesta), **ulostulon RMS** 2 s luennan alusta (peli-komento "aani mittaa 2", Unityn miksattu ulostulo) ja
  AVAudioSessionin **vaihdot** (NSLog "istunto vaihdetaan", uusi 8b4b74dd:ssä).
- Kriteeri: 1. soiva kohta < 0,25 s (klipin alussa 0,11–0,20 s hiljaisuutta), hiljaa < 0,25 s, RMS > 0, ei istunnon vaihtoa.
- Polut: a matka → kolmen kuvan esittely → iskulause → isoisä; b nostokortti (1–2 verkosta, 3. välimuistista); c lehden lukija
  (ui lehti lue); d Pulu-chatin luenta; e radio → nosto ja radio → matka (a); f keskeytys kesken ja uusi kohde; g tausta (Asetukset
  6 s) ja paluu kesken luennan; h ensimmäinen haku (verkko) ja välimuisti = sarake "lähde". Kierrokset k1–k3 (uusi peli joka kerta),
  k4 = chat kahdesti lisää (chatin ääni oli k1:llä ja k3:lla pois, vaihtokytkin).

## Tulos: 49/49 luennan alkua OK
- Kaikki alkavat ensimmäisestä sanasta: 1. soiva kohta 0,043 s joka kerta, hiljaa 0,000 s (kahdessa g-rivissä testin oma "puhe seis"
  osui mittausikkunaan), RMS 0,088–0,158 (ääntä ulostulossa).
- Iskulause soi joka kerta kokonaan: iskulauseen alusta isoisään 9,5–9,6 s (iskulause 4,1 s, isoisä vasta esittelyn jälkeen).
- **Istunnon vaihtoja 0** radion jälkeen (ennen korjausta puhe ja radio vaihtoivat Playback/SpokenAudio ↔ Default toistensa jäljiltä);
  ainoa vaihto on käynnistyksen Ambient → Playback kerran.
- Tausta ja paluu (g): luenta pysähtyy taustalle ja jatkuu paluun jälkeen (pala 16,0 s soi 21 s:ssa, 6 s tauko).

## Bluetooth
iPadiin ei ole pariliitetty Bluetooth-kuulokkeita (Macin kautta ei saa A2DP-reittiä), joten polkuja a, b ja e ei voitu ajaa
Bluetoothilla. **Omistaja todentaa AirPodseilla**: odotettu muutos on, ettei istunto enää vaihdu (ei reitin uudelleenneuvottelua
luennan alussa), ja esilämmitys lisää napautuksesta ensiääneen ~0,5 s. Lokissa näkyy "Bluetooth-esilämmitys 0.5 s" ja mahdollinen
"istunto vaihdetaan".

## Taulukko (polku × kerta × tulos)
| kierros | polku | klippi | lähde | pyynnöstä ääneen | 1. soiva kohta | hiljaa | RMS | istunnon vaihto | tulos |
|---|---|---|---|---|---|---|---|---|---|
| k1 | a1 | iskulause | välimuisti | 17 ms | 0,043 s | 0,000 s | 0.10070 | 0 | OK |
| k1 | a1 | isoisä barcelona | välimuisti | 600 ms | 0,043 s | 0,000 s | 0.08797 | 0 | OK |
| k1 | b | Pompeji. Tuhkan alle jäänyt  | verkko | 917 ms | 0,043 s | 0,000 s | 0.15770 | 0 | OK |
| k1 | b | Shakkiturkkilainen — kone jo | verkko | 117 ms | 0,043 s | 0,000 s | 0.11045 | 0 | OK |
| k1 | b | Napoleonkin hävisi puisennäk | välimuisti | 17 ms | 0,043 s | 0,000 s | - | 0 | OK |
| k1 | b | Pompeji. Tuhkan alle jäänyt  | välimuisti | 17 ms | 0,043 s | 0,000 s | 0.14387 | 0 | OK |
| k1 | c | Barcelona on Katalonian pääk | verkko | 2318 ms | 0,043 s | 0,000 s | 0.09572 | 0 | OK |
| k1 | c | Se on rakennettu kapealle ta | välimuisti | 17 ms | 0,043 s | 0,000 s | - | 0 | OK |
| k1 | e | Shakkiturkkilainen — kone jo | välimuisti | 33 ms | 0,043 s | 0,000 s | 0.10687 | 0 | OK |
| k1 | e | iskulause | välimuisti | 17 ms | 0,043 s | 0,000 s | 0.09895 | 0 | OK |
| k1 | e | isoisä marseille | välimuisti | 600 ms | 0,043 s | 0,000 s | 0.09037 | 0 | OK |
| k1 | f | Pompeji. Tuhkan alle jäänyt  | välimuisti | 33 ms | 0,043 s | 0,000 s | - | 0 | OK |
| k1 | f | Shakkiturkkilainen — kone jo | välimuisti | 21 ms | 0,043 s | 0,000 s | 0.09273 | 0 | OK |
| k1 | g | Pompeji. Tuhkan alle jäänyt  | välimuisti | 19 ms | 0,043 s | 0,000 s | 0.14432 | 0 | OK |
| k1 | g | Hän kehitti tavan valaa niih | välimuisti | 17 ms | 0,043 s | 0,341 s | - | 0 | OK (testin puhe seis häivytti) |
| k2 | a1 | iskulause | välimuisti | 18 ms | 0,043 s | 0,000 s | 0.09545 | 0 | OK |
| k2 | a1 | isoisä barcelona | välimuisti | 600 ms | 0,043 s | 0,000 s | 0.09259 | 0 | OK |
| k2 | b | Pompeji. Tuhkan alle jäänyt  | välimuisti | 20 ms | 0,043 s | 0,000 s | 0.12289 | 0 | OK |
| k2 | b | Shakkiturkkilainen — kone jo | välimuisti | 42 ms | 0,043 s | 0,000 s | 0.09078 | 0 | OK |
| k2 | b | Pompeji. Tuhkan alle jäänyt  | välimuisti | 20 ms | 0,043 s | 0,000 s | 0.10318 | 0 | OK |
| k2 | c | Barcelona on Katalonian pääk | välimuisti | 16 ms | 0,043 s | 0,000 s | 0.10057 | 0 | OK |
| k2 | c | Se on rakennettu kapealle ta | välimuisti | 17 ms | 0,043 s | 0,000 s | - | 0 | OK |
| k2 | d | pollo||1.15|Katos tota. | verkko | 1434 ms | 0,043 s | 0,000 s | - | 0 | OK |
| k2 | d | pollo||1.15|Barcelona on Kat | verkko | 934 ms | 0,043 s | 0,000 s | 0.09860 | 0 | OK |
| k2 | e | Shakkiturkkilainen — kone jo | välimuisti | 17 ms | 0,043 s | 0,000 s | 0.10419 | 0 | OK |
| k2 | e | iskulause | välimuisti | 17 ms | 0,043 s | 0,000 s | 0.12847 | 0 | OK |
| k2 | e | isoisä marseille | välimuisti | 600 ms | 0,043 s | 0,000 s | 0.02769 | 0 | OK |
| k2 | f | Pompeji. Tuhkan alle jäänyt  | välimuisti | 17 ms | 0,043 s | 0,000 s | - | 0 | OK |
| k2 | f | Shakkiturkkilainen — kone jo | välimuisti | 21 ms | 0,043 s | 0,000 s | 0.10579 | 0 | OK |
| k2 | g | Pompeji. Tuhkan alle jäänyt  | välimuisti | 33 ms | 0,043 s | 0,000 s | 0.08551 | 0 | OK |
| k3 | a1 | iskulause | välimuisti | 17 ms | 0,043 s | 0,000 s | 0.10651 | 0 | OK |
| k3 | a1 | isoisä barcelona | välimuisti | 600 ms | 0,043 s | 0,000 s | 0.08996 | 0 | OK |
| k3 | b | Pompeji. Tuhkan alle jäänyt  | välimuisti | 42 ms | 0,043 s | 0,000 s | 0.16785 | 0 | OK |
| k3 | b | Shakkiturkkilainen — kone jo | välimuisti | 33 ms | 0,043 s | 0,000 s | 0.10611 | 0 | OK |
| k3 | b | Napoleonkin hävisi puisennäk | välimuisti | 17 ms | 0,043 s | 0,000 s | - | 0 | OK |
| k3 | b | Pompeji. Tuhkan alle jäänyt  | välimuisti | 19 ms | 0,043 s | 0,000 s | 0.14327 | 0 | OK |
| k3 | c | Barcelona on Katalonian pääk | välimuisti | 16 ms | 0,043 s | 0,000 s | 0.08229 | 0 | OK |
| k3 | c | Se on rakennettu kapealle ta | välimuisti | 24 ms | 0,043 s | 0,000 s | - | 0 | OK |
| k3 | e | Shakkiturkkilainen — kone jo | välimuisti | 33 ms | 0,043 s | 0,000 s | 0.09765 | 0 | OK |
| k3 | e | iskulause | välimuisti | 17 ms | 0,043 s | 0,000 s | 0.10138 | 0 | OK |
| k3 | e | isoisä marseille | välimuisti | 600 ms | 0,043 s | 0,000 s | 0.09400 | 0 | OK |
| k3 | f | Pompeji. Tuhkan alle jäänyt  | välimuisti | 33 ms | 0,043 s | 0,000 s | - | 0 | OK |
| k3 | f | Shakkiturkkilainen — kone jo | välimuisti | 19 ms | 0,043 s | 0,000 s | 0.10443 | 0 | OK |
| k3 | g | Pompeji. Tuhkan alle jäänyt  | välimuisti | 17 ms | 0,043 s | 0,000 s | 0.14216 | 0 | OK |
| k3 | g | Hän kehitti tavan valaa niih | välimuisti | 17 ms | 0,043 s | 0,896 s | - | 0 | OK (testin puhe seis häivytti) |

Lokit: proto-3d/lokit/linssiseppa2-ipad-luenta-20260930/k{1..4}/ (konsoli.txt, aikajana.txt). Ajuri: scratchpad ajo-ipad-luenta.sh,
luenta_taulukko.py.
