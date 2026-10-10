# Natiivi-UI: luovutus 10.10.2026 klo 22.3x (PT:n nollaus, konteksti 52 %)

Säännöt: viesti-natiivi-ui-luovutus-20261010-aamu.md (pätevät yhä). Muistio: natiivi-ui-tila-20261009.md.
Pitkät simu-, käännös- ja asettelutestiajot irrotettuina (perl POSIX::setsid + skripti scratchpadissa). Omat simut: iPhone 17
96044270-92AA-4BD3-BE2D-772C8495AB19, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962 (täysi UDID). Todistusajo:
/Users/Shared/Claude/wt/proto-natiiviseppa-tyokalut/tyokalut/todistusajo/todistusajo.sh (proto-kaanna.sh:n pohja on master → anna
juna-haara mukana tai haara, joka on junan päällä).

## Junassa 180 (PT kuittasi 22.1x: natiivi-ui/yhdistetty-180 0cabed3f3, on juna-180:ssä)

- Kippi: kertomuskuva lisäkuvien vasemmalla, metroasemat napautettaviksi → kierroshyppy (LS1 50204e0f2, OpasSovitin.KierrosKohteeseen),
  selite koko kohteen ajan; 8e6728635 selite vain oman aseman alla (OpasMetrolinja.KorostusNimi ← KierrosTaulu; LS1:n löydös).
  Testikomento `ui opasvalikko metro selite <teksti>` oli rikki (Komento jakaa kahteen osaan) → korjattu 1e1f90f87.
- Olavinlinnan latauskuvan vene vedessä 52f832716 (Latauskuva.Vesi: upotus, peilikuva aaltoillen, kosketusvarjo; LatausLiike.HeijastusPeitto/Aaltosiirto).
- Pääkaupunkien havainnekuvat maakortissa (e01474f68 + 22db7feb8): matkakirjakortin pikkukuvarivi pääkaupunkirivin alle → Kuvasuurennos;
  `ui kartuscha pkkuvat`. FRA:lla ei kuvia datassa (Pariisi on laudan kaupunki). Webin pariteetti Pelikoodarille myöhemmin (PT).
- Todisteet: proto-3d/lokit/kompassi-juna180-6c9d434df/, vene-juna180-6c9d434df/, todistus-kippi-video-ipad-20261010-2143/kippi.mp4,
  todistus-maakortti-lie-ipad-20261010-2156/.

## KESKEN (KIIRE, juna 180 odottaa): esittelyn valokuvapakka ja Ohita eivät näy (iPhone + iPad)

Juurisyy: 87f1dd8a0 (LS1) käynnistää uuden esittelyn suoraan saapumisesta; luennaton saapumisluenta päättyy heti → PeliOhjain.LuentoLoppui
→ Saapumisesitys.Loppui → LoppuiJatko kesken esittelyn: Tyhjenna piilotti Ohitan ja pakan ja Livian kommentti alkoi esittelyn päälle
(vianhaku todistus-pakka-diag-iphone-*: mk-ohita 0, mk-kuvakortti 0 vaikka c1–c5 lokissa).
Korjaus natiivi-ui/esittely-pakka-180 **81a694496** (juna-180 44af9cda2:n päällä): Loppui palaa heti, kun introKaupunki == k.
Käännös ja todennus käynnistetty 22.2x (scratchpad pakka-sarja.sh → proto-3d/lokit/natiivi-ui-app-pakka-180, todistus-pakka-iphone-180-*,
todistus-pakka-ipad-180-*; skenaario maara mk-ohita 1 / mk-kuvakortti 1 ja 3). JÄLJELLÄ: katso tulokset → jos OK, kuittausrivi + SHA PT:lle,
"lukko vapaa" ja "SIMU VAPAA" Julkaisijalle; jos PUUTE, jatka vianhakua (ElavaHerays.KuvapakkaLahtee → Hiljeni(0) on toinen pakan tyhjentäjä).

## Seuraavaksi (PT)

1. LS2:n taidemuseon läpipeluun UI-viat: ota yhteys LS2:een.
2. Pyörimislinssi (natiivi-ui/maa-ei-pyori-180 a9a528145) ON TAUOLLA (omistaja 20.5x). Sen asettelutesti ajettiin 22.0x ennen tietoa
   (tulos /private/tmp/…/scratchpad/asettelu-pyor.log, ei katsottu).

## Muuta

- Pelikoodari lisäsi latausmusiikin koukut OpasValikkoon, DioraamaTauluun ja AaniVaimennukseen (pelikoodari/latausmusiikki 5260227ca):
  jokainen uusi latauskuvallinen näkymä kutsuu alussa Latausmusiikki/LatausmusiikkiKaupunki ja lopussa LatausmusiikkiOhi(avautui).
- Lukkoa ei ole minulla luovutushetkellä, paitsi käynnissä oleva pakka-sarja.sh (käännös + 2 simuajoa, vapauttaa itse).
