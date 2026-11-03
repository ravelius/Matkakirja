# Valosepän luovutus 3.11.2026 klo 22.27

Syy: kontekstiraja 25 % (Raamattu 7.37), luonteva tauko: odotan JU:n k10-ajoa.
Edellinen: viesti-valoseppa-luovutus-20261103-2125.md (pysyvät työtavat -20261101-2124.md, -2220.md voimassa). Loki:
`/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B = tämä kansio). Python: `$B/tulivuoret/venv/bin/python -I`.
Esikatselu vain JU:n vuorolla (JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd ajaa ja ilmoittaa hakemiston).

## Tila
- pariisi-tyyli (natiivi-backup linssiseppa2/pariisi-tyyli, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k17) = **d64f74a56**:
  NS:n väliaikaiset kertoimet d7972fe6e (takana oleva joki saa peittyä, omistaja 22.14; EI 53bcfffb5:ttä, KK hylkäsi) +
  A2 kortteli k4 KOEKÄYTÖSSÄ kaikkien koealueen kattojen pintana `pariisi/kortteli-a2` (1254² = 1,27 px/m; ElavaKoealue.Pinta
  hyväksyy nyt minkä tahansa neliön, 5797b3580), sisäpihat tummina (dbdc4e623) ja katot 2029:n siniharmaaseen (d64f74a56), p9.
  Kartta-testit 594/594. Muunnin `$B/pariisi-tyyli/codex-pinnat.py` (KOE-sanakirja = KS:n kuva tarkistus-a2-k4/).
- k9 (JU 22.21, esikatselu-20261103-221821, 05756ae01): VAALEAT SISÄPIHAT HALLITSIVAT (kadun sävyiset läikät) → KS:n tummennus.
  TULOS `$B/pariisi-tyyli/k9/TULOS.md`, parit k9/pari/ (keski-taysi-vs-2029.jpg) → KS:lle kerrottu.
- **k10 = d64f74a56 JU:n jonossa L1** (PK palvelijat v5:n jälkeen; ketju julkaisija-tyokalut/vs-k10-l1.zsh kutsuu
  `$B/pariisi-tyyli/k10/ajo.zsh`, loki vs-k10.log). Kun valmis: pari kuten k9 (puolikkaat + täysi rajaus 2029:ää vasten:
  tyyli-2029-kortteli.jpg codex/pariisi-nahtavyysalue-notre-dame-20261103/), TULOS k10/TULOS.md. Jos pihat ja katot ok →
  tulos PT:lle (≤ 3 riviä); jos ei → kuvat KS:lle (KS:n työkalut Y/pihat-tummiksi-k4.py, Y/katot-2029-k4.py).
- A2 kortteli k4 -harmaapohja: `$B/pariisi-tyyli/kortteli-a2-k4/` (kortteli.py siemen 4, vino hila, kehäkorttelit) – KS tilasi.
- Notre-Dame: k2 hylätty (veden päällä, Raamattu 2.204), KS teki k3:n itse, PT: ND k3 ei peliin, KS tilaa k4:n. VS tekee
  pohjan vain KS:n pyynnöstä; kun kuva tulee: maaosa maskin alueelle, tornit kapeana pohjoishaaran yli.

## Avoimet
- Korttelikohtainen satunnaissiirto puuttuu (pinta toistuu ~1 km), riski 1 KK:n suunnitelmassa.
- Seinän korkeus kapeilla kaduilla, muste segmenteittäin (iPad osa D), käännetty kartta, k5-laiteajo isolla iPadilla.
- Viestiraja: SendMessage pysähtyi 22.2x → varakanava mcp__ccd_session_mgmt__send_message toimii.

## Muuta
- Sade (linssiseppa2/sade-218, 5ed5f95e2) odottaa äänen laitetarkistusta. Rakettivideo tauolla. Juoksupelin valo ja taivas palatsiin
  yleiskäyttöisinä (omistaja 18.45), kun valo-erä alkaa. wt `proto-linssiseppa2-korjaus` poistettavissa, kun 99ebdaf89 junassa.
- Paikallinen koeajo ilman Unityä: `ELAVA_KOE=$B/pariisi-tyyli/yv1/data ELAVA_Z=16 ELAVA_PINNAT=<wt>/Assets/StreamingAssets/ElavaKoealue
  sh <wt>/Kartta-testit/kaanna.sh ElavaKoe`; kokoa vain tason 16 palat (cs/ sisältää myös vanhoja 14/15-paloja).
