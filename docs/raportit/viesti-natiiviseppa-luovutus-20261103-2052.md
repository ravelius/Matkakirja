# Natiivisepän luovutus 3.11.2026 klo 20.52 (konteksti 25 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-1956.md. 1622-luovutuksen TILA-osio (haarat,
worktreet, simuketju, lukot, testit) on yhä voimassa: `git show afbe75860:docs/raportit/viesti-natiiviseppa-luovutus-20261103-1622.md`.
Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).
Omia taustaajoja ei ole. EI testejä eikä Kartta-testejä, kun `pgrep -fl "esikatselu.sh|Unity -batchmode"` näyttää ajon.

## TILA: osa C (nähtävyyksien raivaus) VALMIS, kertoimet KK:n päätöksellä
- Raivaus + piirtojärjestys: VS yhdisti 60°:n (yv2) päälle = **8fc847bf4** (linssiseppa2/pariisi-tyyli). JU:n k6-pelikuvat 20.45
  /Users/Shared/Claude/proto-3d/lokit/esikatselu-20261103-204005/ (p-* = koealue): talot pois nähtävyyksien alta, ei puolikkaita.
  Oma haara natiiviseppa/raivaus-218 (468d84515) on vanhentunut, ei yhdistetä.
- Koodi: ElavaKoealue.AsetaRaivaus/Raivattu, koukku ElavaTyyli-talosilmukassa ennen ElavaVinotalot.Talo (raivattu ulkorengas +
  reiät pois), Laattapalvelin.Elava.KoealueenRaivaus (Resources/Esineet/<kaupunki>.json "raivaus"), ElavaPariisi p6,
  PiirrosKerros.Esineet renderQueue + lajin järjestys. Kartta-testi KoealueenRaivausNahtavyydenAlta (594/594).
- KAKSI KERROINMUUNNELMAA, PIDOSSA (PT: KK päättää, kumpi menee; EI yhdistetä ennen sitä), kumpikin 8fc847bf4 + vain pariisi.json:
  - **4381bf618** natiiviseppa/kertoimet-218: automaattinen (kadut tertiary+ ja samanniminen pääkatu, joki, toiset nähtävyydet):
    Louvre 1,08 · Notre-Dame 2,38 · Oikeuspalatsi 1,24 · Hôtel de Ville 1,12 · Tour Saint-Jacques 2,96.
  - **d92b55063** natiiviseppa/kertoimet4-218: K4 (omistaja 20.46 "Notre Dame on aivan liian pieni"): enintään 4, vain toiset
    nähtävyydet rajoittavat, Notre-Dame etusijalla: ND 4,00 · TSJ 4,00 · HdV 3,52 · Louvre 3,50 · Oikeuspalatsi 1,32.
  - Raivaus kummassakin kuvan peittävästä osasta (omistaja 20.4x: nähtävyydet käännetään katsojaa kohti, OSM-suunta ei päde).
  - Ylhäältä: /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-raivaus-20261103/ (kertoimet-auto.png, kertoimet-k4.png, RAPORTTI.md).
  - JU:lta pyydetty editoriajo molemmista sk-k6.txt:llä (/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pariisi-tyyli/k6/sk-k6.txt)
    → kuvat NS:lle; tarkista ja välitä PT:lle (3 riviä).
- Työkalut (_tyo/natiiviseppa/esineet/, ei gitissä): tee-esineet.py (kerroin "auto", tasainen kasvu, "etusija", "esteet",
  "kerroin_max" kaupungin määrittelyssä; saannot nahtavyys.kadut / kadut_nimella / raivaus_muoto), kaupunki-pariisi.json (auto),
  kaupunki-pariisi-k4.json (K4), raivaus-kuva.py (tarkistuskuva). Ajo: `python3 -I tee-esineet.py kaupunki-pariisi.json <proto-wt>`.
  HUOM: Codexin nähtävyysalueet (NAHTAVYYSALUE.md, Notre-Dame ensin) korvaavat esinekuvat → kerroin ja raivaus lasketaan
  samalla ajolla uudelle kuvalle; kertoimen pohjaleveys on vielä OSM:n itä–länsi-laajuus (käännetyllä kuvalla tarkista).

## AVOIMET
1. KK:n päätös: auto vai K4 (vai jokin väliltä: kaupungin määrittelyssä esteet/kerroin_max/etusija, ei koodia). Valittu SHA → VS:lle.
2. Moni kaupunki: toiselle ElavaKoealueelle KoealueenRaivaus-kutsu Laattapalvelin.Awakeen (nyt vain ElavaPariisi.Alue).
3. Vanha jono: 354 ms PostLateUpdate → xctrace (JU:n laitevuoro); GC-haara vasta PT:n luvalla.

## TILA (worktreet)
- wt/proto-natiiviseppa-raivaus (haara nyt natiiviseppa/kertoimet4-218). Älä poista. wt/proto-natiiviseppa-koealue (2e05fe9c3).
- Worktreet natiiviseppa-luovutus-2052, -2015, -1905, -1845, -1708 ja -20261103-1622 saa poistaa mergen jälkeen.
