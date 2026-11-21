# Valosepän luovutus 3.11.2026 klo 19.06

Syy: kontekstiraja 25 % (Raamattu 7.37), luonteva tauko: k4-esikatselu JU:n jonossa.
Edellinen: viesti-valoseppa-luovutus-20261103-1811.md (pysyvät työtavat -20261101-2124.md, -2220.md voimassa). Loki:
`/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B = tämä kansio). Python: `$B/tulivuoret/venv/bin/python -I`.
Esikatselu vain JU:n vuorolla (JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd ajaa ja ilmoittaa hakemiston).

## Tehty tässä sessiossa
- Vahtikorjaus (PT KIIRE): iso paketti kaatui tarkista.sh:ssa (Tulivuoret.cs liikevahti 3>2, kameravahti 1>0) → **99ebdaf89**
  (natiivi-backup linssiseppa2/vahtikorjaus-218, ea09036dc:n päällä; yhdistyy puhtaasti myös 81499acd6:een). JU:lla, PT:n kuittaus.
- NS:lle `ElavaPariisi.Sisalla(lat, lon)` (osa C rajapinta). ElavaTyyli ei piirrä puusymboleja → ei tuplia NS:n puiden kanssa.
- Pariisin koealue k2 → k3 → k4 (alla). k2/k3 välitulokset PT:lle (TULOS.md kansioissa).
- Osakirjasto (KS pitää, `/Users/Shared/Claude/proto-3d/_kirjasto/kartta-osat/`, LUEMINUT.md; vain skriptillä osakirjasto.py):
  kirjattu koekaytto: tyokalu/codex-pinnat, tyokalu/elava-koealue, tyokalu/pariisi/elava-pariisi, tyokalu/elava-tyyli-koostus.

## TYÖN ALLA: Pariisin koealue (osa B + kokoaja; PT 19.0x: VS kokoaa omistajan parin)
Haara **linssiseppa2/pariisi-tyyli** (natiivi-backup), wt `/Users/Shared/Claude/wt/proto-linssiseppa2-k17`. Ketju:
8e8b0f25b (k2) → 60b0ba903 (Sisalla) → 406ffee54 (k3: yleinen `Kartta/ElavaKoealue.cs`, ElavaPariisi vain raja + kattopolut,
pinnat `StreamingAssets/ElavaKoealue/{yleinen,pariisi}/*.rgb`, nurmi vain landcover park/garden/…) → a040721ea (nurmen sävy mittariin
muuntimessa) → faf8fd0d5 (ei nurmea park-tasosta: UNESCOn Seinen rannat vihersi Citén; välimuisti p3) → 3ca6a4a5b (Kartta-testit:
ElavaKoealue + ElavaPariisi kaanna.sh LAHTEISIIN, polku Laattapalvelimelta, 591/591) → **5f1b23978** (merge NS:n esinekerros 586b5e1a8).
- **k4 = 5f1b23978 JU:n jonossa**: `zsh $B/pariisi-tyyli/k4/ajo.zsh <linja>` (vain p-kuvat, MATKAKIRJA_OSAT asetettu skriptissä).
  n-kuvat k3:sta: `proto-3d/lokit/esikatselu-20261103-185643/n-*.png` (samat rajaukset 0,006 / 0,015 / 0,03).
  SEURAAVAKSI: tarkista (Cité ja rannat ilman vihreää, esineet paikoillaan, kokonaan, ankkurit), parit `$B/pariisi-tyyli/pari.py
  <n> <p> <ulos>` → PT ≤ 3 riviä (TULOS.md).
- **Omistajan pari** (omistaja 18.41 "Laita minulle kuva, kun uusi Pariisin kartta valmistuu"): vasta kun KS:n **v2-katot** (ilman
  puita ja nurmipihoja, vesi ilman saumaa; KS:n uusinta c3e423429 → _review-koealue-k2/, kirjastoon v2) + NS:n esineet mukana.
  v2:n tultua: `$B/pariisi-tyyli/codex-pinnat.py` VERSIOT-taulu → v2, aja `<kirjasto>/isoisa-2029 → wt/Assets/StreamingAssets/ElavaKoealue`,
  ElavaPariisi välimuisti p3 → p4, commit, JU-ajo n + p kolmella zoomilla isolla (nähtävyydet kokonaan) → pari PT:lle (PT välittää).
  Ennen sitä välitulokset vain PT:lle (PT: koealue näyttää litteältä nykyisen rinnalla).
- Tunnettua: MinZ 13 (OpenMapTilesin talot vasta Z13:sta, PT hyväksyi); laajalla koealue vaaleampi kuin ympäröivä kartta.
  n- ja p-kuvien mittakaava eroaa (piirroskaupunki näyttää lähempää samalla kameralla).

## Pysyvät linjaukset tältä sessiolta
- Omistaja 18.43 (PT): koealueen osat uudelleenkäytettäviksi, kaupunkikohtainen vain pakollinen; omat osat kirjataan KS:n osakirjastoon.
- Omistaja 18.45 (PT): juoksupelin valo ja taivas palatsiin **yleiskäyttöisinä** (myös elävä historiaosuus, Olavinlinnan tapaan),
  ei juoksupelin kameraan sidottuja asetuksia – kun juoksupelin valo-erä alkaa.

## Muuta
- Sade (linssiseppa2/sade-218, 5ed5f95e2) odottaa äänen laitetarkistusta. Rakettivideo tauolla.
- wt `/Users/Shared/Claude/wt/proto-linssiseppa2-korjaus` = vahtikorjaus (voi poistaa, kun 99ebdaf89 junassa).
