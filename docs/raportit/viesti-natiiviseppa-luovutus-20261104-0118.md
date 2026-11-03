# Natiivisepän luovutus 4.11.2026 klo 01.18 (konteksti 27 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen -20261104-0102. Siitä yhä voimassa: Merge-sääntö, Päätökset 23.15–23.40, AVOIMET 5–7 (`git show 18e139be5:docs/raportit/viesti-natiiviseppa-luovutus-20261103-2340.md`). Id:t: /Users/Shared/Claude/osoitekirja.md.
Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).
EI testejä, kun `pgrep -fl "[e]sikatselu.sh|[U]nity -batchmode"` näyttää ajon; vuoro JU:lta. JU aloitti 01.1x Tripo-jakson, jonka aikana ei Unity-ajoja: pyydä vuoro, älä oleta. Vuoro pyydetty 01.2x kärjelle 98e21fda0 Tripon jälkeen; skenaario /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/aluekuva-koko/sk-haivytys2.txt.

## ENSIN: etäisyyshäivytys (PT 00.59; omistaja 3.11. 15.3x; EI junaan)
Tehty VS:n reunan 804d491d1 päälle, Painotiin ei koskettu (VS 4.11.: uusi VS jatkaa kohdista 5–6, ei koske reunaan).
- **natiiviseppa/haivytys-218 kärki b264f241f**: cd75ccc42 (häivytys), 0dc6aad40 (PiirrosLahinTestit lukee muutetut rivit), b264f241f (hiusviivan korjaus).
- **natiiviseppa/haivytys-koe-218 kärki 98e21fda0** = yhdistelma-218 8b9f14c03 + haivytys-218. Tämä ajetaan seuraavaksi.
- Tekotapa: tyyli on poltettu pohjan paloihin, joten polku `elava-tavallinen/` antaa koealueen palat ilman tyyliä (ElavaTyyli.MaskiTavallinen), muualla pohjan oman palan. KarttaKerrokset.AsetaTavallinenPeite: paikka 1, _overlayAlfa_1 = 1 − näkyvyys. Peite vain korkeuksilla 0,8 × täysi – 120 km ja 1,5°:n sisällä. Linssi ja lennon pinta väistävät peitteen, silloin tyyli ilman häivytystä.
- Sääntö: ElavaKoealue.EtaisyysNakyvyys(osuus) = Smooth(0,45–1,0) koko Pariisin leveydestä (18,2 km). Täysi noin komennon 0,12:lla. Esineet (korkeusOsa) seuraavat samaa; ennen ne laskettiin vanhan piirroksen leveydestä. SaapumisenEnintaanKorkeusM jätetty vanhaan leveyteen.
- **Nähty, koe 9dddd7adc** (lokit/esikatselu-20261104-010932, 640×480-pohja, ei iPad): b-0-30 näkymätön, c-0-21 lähes, d-0-17 väli, e-0-13 täysi, f-0-10 täysi, g-0-21-paluu kuten c, h-lansiraja reuna pehmeä. PT:lle kerrottu 01.1x.
- Kartta-testit 610/610 kärjessä ed9945330 (b264f241f ja Alman jälkeen ei ajettu).

### PT 01.18 (kuvat viety KK:lle; sitoo)
- e-0-13:n pystysaumaa EI oleteta pohjan (640×480) viaksi. Tarkista ajon jälkeen, kuten 0,17:ssä (d-0-17) näkyvä suorakaide.
- Alman yhteydessä siirtyneet 12 siltaa ovat jo hyväksyttyjä: seuraavassa ajossa silta-kuvat, ja tarkista, voiko siirron rajata Almaan. TEHTY aebaa144c (yhdistelmä 8b9f14c03, koehaara 98e21fda0): sillat-osm.py KESKITA vain Alma; data-ero vain Alma 14,5 m.

### AVOINNA häivytyksessä
1. **b264f241f ajamatta:** korjaa c:n, d:n ja g:n tumman hiusviivan (lat 48,923 = Z11-rivin raja; läpinäkyvän palan musta väri suodattui). Tarkista viiva poissa (c-0-21:n rivi noin 386/2064).
2. **Pystysauma e-0-13:ssa** (x noin 924/2752 ja oikealla): vasen puoli sumeampi taso, oikea tarkempi. Myös d:ssä tavallisella kartalla. EPÄILY 640×480 (Cesium valitsee tason pelin ruudusta) tai kahden kerroksen hitaampi lataus 35 s:ssa. EI todennettu: ratkeaa vain isolla iPadilla (PT päättää iPad-yhdistelmästä).
3. Kaukaa saapuessa kerroksen kytkeytyminen (120 km): välähdystä ei voi nähdä pysäytyskuvista, ei testattu. Peite pois -> päälle -rajaa ei myöskään katsottu liikkeessä.
4. Muisti häivytyskorkeuksilla mittaamatta (palat kahdesti alueella). Mitataan isolla iPadilla.
5. y-laajin (noin 62 % ruudusta) antaa laskettuna näkyvyyden noin 23 %; c-0-21 (57 %) näyttää lähes näkymättömältä. KK arvioi.

## KK:n lista (/Users/Shared/Claude/proto-3d/lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md, VIIMEINEN osio)
- **Kohta 1 Alma, tehty, ei nähty pelissä:** 3729a6a0f (nahtavyydet-218), 3c87e40a5 (yhdistelmä). Pisin ylitys oli läntinen pyörätie, silta 15 m kadun vieressä. sillat-osm.py ottaa nyt keskipisteen ajoratojen väliin. Rajattu Almaan aebaa144c:ssa; 12 muuta siltaa ennallaan. Katso silta-kuvat.
- **Kohdat 2–4 aloittamatta:** 2 ND:n kermalaikku ja irtosaarekkeet, 3 GP (0eb91d25e, kuva näkemättä), 4 Montparnassen juuri. Katso k21-pohjalla (haivytys-koe-218 sisältää sen), koska VS:n uusi pinta voi muuttaa kermalaikkuja. Nimet kohdalla 8 KS:n kanssa. Saumat uudelleen k20:stä.
- KS:n Boulognen puudata, kun KK on valinnut latvuskoon. iPad vasta seuraavassa yhdistelmässä (PT).

## HAARAT (proto-repo, wt/proto-natiiviseppa-maskik4, peili natiivi-backup; worktree nyt haivytys-koe-218)
- **natiiviseppa/yhdistelma-218 kärki 8b9f14c03** = f1fb45f10 + GP:n raivaus + sillat ajoratojen väliin. Koostumus: pohja 8747255b5 (VS k17 = k16 + 628d1a90a; 1. vanhempi 628d1a90a, sisältää 95a733ace:n) + nahtavyydet-218 + nimet 25f99d839. **EI junaan eikä ämpäriin ennen KK:ta.**
- **natiiviseppa/nahtavyydet-218 kärki aebaa144c**: a826acb03 + 6fd420c8c (nappula Transparent+100) + e101c006e (Sacré-Cœur k3) + b6d478a40 (`veneet kohtaan i lat lon`) + Louvre k2 -data + GP.
- Korjaa aina nahtavyydet-218:aan ja mergaa yhdistelmään: pariisi.json riitelee, ratkaisu `python3 -I tee-esineet.py <TÄYSI POLKU>/kaupunki-pariisi-koko.json <checkout>` (ajo vaatii täyden polun). Nahtavyydet-218:aan k4vt-alue. Kp-muutos aina molempiin.
- Kirjastossa koekäytössä (KK ei ole hyväksynyt, näkee pelissä): sacre-coeur-alue-v2, louvre-alue-v3; molemmat ämpärissä. Raivaus vanhasta alfasta: alue_kuva-kentät `raivaus_taso`, `raivaus_alue` (uusi tee-esineet.py:ssä).

## GP (lista kohta 3)
Etuoven alta korttelipala poissa 3073c367f (lokit/esikatselu-20261104-004952/grand-palais.png, Mac; PT katsoi). Harmaa läiskä nurmella oikean oven alla: GP:n alfa puhdas; sijainti 48,8656–48,8659 / 2,3142–2,3155 = Petit Palais'n kohta, päätelty paikasta, taloa ei tunnistettu datasta. Raivaus itään 2,316: 0eb91d25e, EI ajettu.

## f1fb45f10 iso iPad (lokit/julkaisija-yhdistelma-iso-f1fb45f10, 33/33, 3417/4080 Mt, varoituksia 0; Kartta-testit 607/607)
Kuvista todennettu: nappula kuvien päällä, vene Pont Royalin alla kansi päällä, Riemukaari (vanha kaari poissa, jalat ympyrässä), Louvren kiila pois, S-C:n puut, ND:n pala ja kiekko pois; GP:n pylväs ja läntti pois. Katsottu vain nd-louvre, vene-pont-royal, riemukaari, sacre-coeur, eiffel, grand-palais; muut 27 eivät.

## Selvitetty, ei toimia
- Punainen merkki = pelinappula, ei kohteen merkki (Nappula.shader +20 < esineet +60…+99): korjattu 6fd420c8c.
- ArgumentOutOfRange ("ui sulje"): 6 ajon unity.logissa pino Unityn SearchDatabase (QuickSearch), 0 pelikoodia. Ei korjattavaa.
- ND:n tornin ja huipun välin keltainen: EI maskin raivaus (raon pisteet kaikkien raivausten ulkopuolella, laskettu). Sijainnista päätellen Place de l'Hôtel de Ville (ei varmistettu OSM:stä). Kerrottu PT:lle; jos KK haluaa peittoon, pohjan asia tai uusi HdV-aluekuva.

## AVOIMET
- KS:llä (kerrottu): puut piirtyvät nimien päälle, Louvre-nimi Seinellä. Tuplanimiä ei näkynyt 4 katsotussa kuvassa; kerro KS:lle, jos näkyy.
- Tyhjät keltaiset läiskät korttelien tilalla laajasti (Eiffel, S-C, GP); kerrottu PT:lle, ei NS:n.
- pid 66955 (Unity, proto-natiiviseppa-unity67, 3.11. 23.49): ei tämän roolin ajo, kerrottu PT:lle; tila tarkistamatta.

## Vanhan luovutuksen lisäykset 23.51–23.53 (18a4d6341; luin ne vasta 00.5x, sain osoitteen 18e139be5)
- c) JU: siltojen suunta poikkeaa kadusta (silta-concorde: katu näkyy vedessä sillan vieressä). PT: arvio KS:ltä, ei säätöä ennen sitä. **Tila tuntematon:** y-silta-concorde.png katsomatta, en tiedä, onko KS arvioinut. Kysy KS:ltä, ennen kuin säädät.
- d) JU: Boulognen puut vain teiden varsilla (puut-boulogne). KS tuo uuden puudatan KK:n latvuskokovalinnan jälkeen; tarkista silloin, korjaako se tämän.
