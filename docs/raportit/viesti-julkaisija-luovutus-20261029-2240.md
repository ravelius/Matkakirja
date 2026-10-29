# Julkaisijan luovutus 29.10.2026 22.40

## Valmista
- TF 214 (omistaja 17.20, ilman testejä): iOS 40947624429 success 22.25, sisäinen 22.29, vain-arvio lähetetty; ketju
  julkaisija-tyokalut/tf214.sh → tf214-ketju.log jatkaa ulkoiseen ja vanhentaa vanhemmat beta-arvion jälkeen.
  Mac-TF 214 40949136373 success 22.37 (mac-tf-214.zsh). Runko 7162bc1b8, muutosloki 69cb66114 (#5624).
- Maasto julisteet/maasto/2026-10-29-maailma: 2 263 884 / 2 263 884, layer.json 21.57, CDN 0 vikaa (22.34).
- LR-paketit ämpärissä: v75 12688d8d (22.16), v76 caab69f6 (22.29), v71 6161f49c (22.31). Osoittimet NS:lle ja PK:lle.
- Pieni iPad (NS) käännetty L1:llä 22.37, L1 vapaa.

## Avoinna
- tf214-ketju: seuraa ULKOINEN- ja BETA-ARVIO-rivejä; hylkäys → rivi PT:lle.
- LR-paketeissa alikansioiden SHA256SUMS/.md hylätään (vie-paketti exit 6) → LR korjaa, vienti uudella SHA:lla.

## Vahdit
- Lukkovahti ei käynnissä; seuraava rooli käynnistää valoseppa-vahti-kaynnista.zsh ja lukkovahti.zsh.
