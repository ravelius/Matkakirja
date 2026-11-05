# Valosepän luovutus 5.11.2026 klo 19.34

Korvaa luovutuksen -1815 SEURAAVAKSI-listan. Pariisin kokeiden tila ja omistajan päätös 16.41 ovat yhä voimassa (-1645): metsä ennallaan, ei lukitusta, ei uusia kokeita. Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md.

## Äänierä viety (omistaja 19.23: "laita kaikki äänet peliin, kuuntelen siellä")
- Paketti /Users/Shared/Claude/proto-3d/_valmiit/opas-valilauseet-vienti-20261105, tehty työkalulla _tyo/valilauseet-putki-20261105/tee-vienti.py. JU vei 19.33: viety 230, oli jo 1 (kieli.json), virheitä 0. Haettu mediasta: 230/230 täsmää.
- Polut: aanet/opas/siltalauseet-v5, kuittaukset-v3, nimet-v4 (jatkot uudet, maat ja kaupungit yhä nimet-v3:ssa), aanet/kaupunki-intro-v2/william-pariisi.mp3 (3,801 s), opas/esittely-v1/aanet/pariisi-tervehdys.mp3 ja .ajat.json (5,911 s).
- Osoitemuutos: b720cd2f2, haara linssiseppa2/valilauseet-219 (natiivi-backup, pohja runko-219-muisti). Viesti NS:lle 19.3x. Ei junassa; PT päättää. Testit 55/55, unity-tarkistus 0 virhettä, ääniportti 0 hylättyä, 132 varoitusta (true peak -0,3…-0,5 dBTP).
- PK vahvisti: TF 218 ja runko 217 eivät hae uusia polkuja. Alle 217:ää ei tarkistettu erikseen. Ehto: opas/esittely-v1/pariisi.json jää ennalleen (ei ollut paketissa).
- Lisäys omaa harkintaa: "Kohta perillä." (l013) ei ollut pelissä, joten se on siltalauseet-v5:n odotus-ryhmässä tunnuksella odotus-06. KK ja PT tietävät.
- Omistaja 19.26 (PT): pienen iPadin asennus peruttu; hän kuuntelee äänet TF:stä, kun Pariisi on valmis.

Ei todennettu: ääniä ei ajettu pelissä; ääntämistä ja aksenttia ei kuunneltu (Geminin kuuntelut eivät kelvanneet, 5.11 sokkokuuntelu jäi tekemättä, omistaja kuuntelee itse). Litteroinnin erot l061, l134, l138, l149, l162, l208 on jätetty omistajalle.

## Juoksupeli: PEITTO 3 (PK:n havainto 18.5x)
JuoksuValo.hlsl tunnistaa puuttuvan näytteen M:stä, mutta PK mittasi rgb=0-tekseleille a = 1/255, joten tunnistus ei toteudu. `valo puuttuva 0` vaalentaa kaiteen viivan mutta ei poista sitä, ja jalustaseinään tulee täpliä (lokit/tarkastelukuvat-8d2d95b9a-185430/kaide-puuttuva0.png). Viiva on leivonnassa (LAV:n jono). Päätös: varjostin ennallaan leivontaan asti.

## SEURAAVAKSI
1. Odota PT:n jatkoa. Äänierä on minun osaltani valmis; kommentit omistajalta tulevat TF:n jälkeen (uusinta = uusi otto, alle 3 % ilman lupaa, 5.1).
2. Kun LAV:n leivonta on valmis, PK kertoo, näkyykö viiva. Jos rgb=0-tekseleitä jää: tunnistus raa'asta rgb:stä M:n sijaan, kärkiväreille sama, kommentti (0,0,0,1) korjataan.

## Muuta
- Worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30 on nyt haarassa linssiseppa2/valilauseet-219. Pariisin kokeiden haara linssiseppa2/pariisi-tasot c430bcd40 on tallessa natiivi-backupissa.
- Seuraamattomina, en koskenut: .claude/settings.local.json.ennen-kevennysta, waveletNoiseTile.bin.
