# Valosepän luovutus 31.10.2026 klo 22.10

Syy: PT 22.0x, viikkokäyttö 90 %. Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 21.16–22.0x). Proto-repo on vain paikallinen. Edellinen luovutus: viesti-valoseppa-luovutus-20261031-2100.md (haara linssiseppa2/luovutus-20261031-2100); sen työtavat ovat voimassa.

## VETOVASTUU: KOEKOHTAUS PIHA 06 (omistaja 18.28 / 18.31)
Tulokset: `_tyo/linssiseppa2/k06f-tulos.md` (luvut, värimittaus, sauma).

### Valmista
- **Ajo 8 pari-k06f** (`lokit/pari-k06f-20261031-211622`, 5a51c8181, juuri-k06b, sumu 0,002 + ssr + gi + `palatsi lodkerroin 5`): **f25 = kiilto lattia 0,25 → VALINTA** (puhki 2,0 %, lattia 199/200, p95 222/222, keisari 0,70/0,82). f2 (0,2): 2,8 %, 203.
- **Värimittaus f25** (k06f-vari.jpg): muuri peli 163/100/86 vs havainne 164/64/58 (haalea), katto 178/135/87 vs 213/145/72 (himmeä), lattia aurinko 194/181/163 vs 217/194/181, varjot vaaleat (havainne 114/109/129 sinertävä), taivas usvainen. Varjo-osuus lattiasta 2,7 % vs 12 % (havainteen sivusiipien muurin varjo; pelin sommittelussa avoin aukio).
- **Ajo 9 pari-k06h** (savy): `savy laatta 1 1.03 1.1` vie lattian oikeaan suuntaan (204/191/180), mutta lattian mediaani nousee 211:een → laske laatan r/g:tä tai kiiltoa. **`savy rappaus` ja `savy kate` eivät osu palatsiin** (Lattia-varjostimen sokkelopinnat). Palatsin muuri = mallin V4_red Maailma-varjostimessa ilman QA-kerrointa → syvempi punainen vaatii datan (LAV:n materiaaliväri tai PK:n/NS:n uuden kertoimen). Katolle on `savy palatsikatto r g b w` (Maailma _PalatsiKatto). h3 sumu 0: puhki 8,3 % → sumu 0,002 jää.
- **reitti-v88** (tausta-v88) arvioitu: turkoosi kaista on poissa, iso harmaa terassi poissa, pienet harmaat kiilat jäivät → LAV teki **tausta-v89** (9f7cc3626696, summat OK).

### KÄYNNISSÄ (taustalla tämän session Bashissa; tulokset tiedostoihin)
1. **reitti-v89/aja-v89.zsh** → `_tyo/linssiseppa2/reitti-v89/aja.out`, koosteet `kooste-v89-{0,35,70}.jpg`. Skenaario: PK:n c4 (c2ecc5896, reitti pohjoiskäytävässä z 186–190) + juuri-r89 (juuri-r88, tausta-v81-linkki → v89). Tarkista: kiilat (aiemmin b-09/b-18), pohjoiskäytävän laatta, Longzongmenin aukot. OK → "VS OK v89" LAV:lle ja kuvat PT:lle ja PK:lle.
2. **pari-k06i** (`skriptit-20261031/pari-k06i.out`, `lokit/pari-k06i-*`): i1 `savy palatsikatto 1.2 1.07 0.83 1.2`, i2 `1.35 1.1 0.75 1.3` (+ laatta). Mittaa katto ja lattia varimittaus.py:llä (aja ilman `-I`: numpy) samoilla laatikoilla kuin k06f-tulos.md:ssä (peli: lattia 145,898,440,1014; muuri 869,362,1303,420; katto 579,109,869,138).
3. **pari-k06j** (`skriptit-20261031/pari-k06j.out`): saumadiagnoosi + `palatsi kopiot 1` → `mika` KOLMIO osuu oikeaan verkkoon. Lue esikatselun `unity.log`:sta rivit "mika (0.73, 0.85)" ja "(0.77, 0.85)" (KOLMIO-rivi: verkko + materiaali) → **vastaa LAV:lle piirtäjän nimi ja materiaali** (LAV odottaa ja tekee tausta-v90:n). LAV:n mukaan taustapalat EIVÄT ole päällekkäin (1-0 glTF x −78,6…0, 2-0 x 0…25, y 0, valo sama). Sauma: pohjan x ≈ 17,8 (Unity ≈ 4,6). Rajauslaatikkolistassa (k06g) ovat vain kk-tausta-2-0/1-0 lod0, kk-ulkorengas-3-2 ja kk-ulkorengas-2-2 (Unity x 1,3…628) + maan täyte. Meridiaaniporttia ja osasarjaa ei ole listalla. Pääepäilty: ulkorengas 2-2:n lattia.

## Seuraavaksi
- Kun sauma on korjattu ja värit sovittu (muuri: datapäätös PT:lle), tee lopullinen pari f25 + uudet värit → värimittaus → kuvapari PT:lle → KK.
- PT:lle on viety: f25 valmis, ei vielä KK:lle (sauma + haaleat värit).

## AVOIMET (edellisestä)
- JuoksuLeivottuKerroin 0,75 → 1 (PK + PT): varmista, että se on junassa.
- Havainteiden aurinko koillisessa (Pekingissä mahdoton) → PT vie KK:lle ennen laajennusta.
- b-42…45 (v88-ajo): kamera katsoo jyrkästi alas portin läpi → PK:lle tiedoksi annettu.

## Osoitteet
PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, NS local_c7344e20-fba8-433d-ba8e-184a325037ef, PK local_601d33fc-1c61-4ccd-8389-fa425417fafb, LAV local_beb68834-6c4f-4839-ac75-7876b45052c3, Postivahti local_d8d003f6-1ae3-4a1b-854a-e0c018ed19f5.

## LISÄYS 22.2x: sauman syy löytyi (LAV)
Sauma = **kk-ulkorengas-3-2:n V4_lattia** (lod2, leipomaton, y 0,2–0,9), joka työntyy kielekkeinä palatsin lattian päälle z −500…−488,9; yksi kieleke osuu kohtaan x 16,6–19,6. LAV:n **ulkorengas-v10** (`_valmiit/juoksupeli-kk-lavastaja-ulkorengas-v10-vienti-20261031`, SHA256SUMS 3cf8ab80147d, summat OK) rajaa renkaan lattian taustan reunaan. Tausta-v90:aa ei tarvita. → k06j:n tulos ei enää ole kiireellinen (tarkistus vain).
**Valmiina, ei käynnistetty** (PT: ei uusia raskaita ajoja): juuri `_tyo/linssiseppa2/juuri-k06c` (= juuri-k06b, ulkorengas-v9-linkki → v10) ja skripti `skriptit-20261031/pari-k06k.zsh` (f25-asetukset). Aja: `zsh .../pari-k06k.zsh > .../pari-k06k.out 2>&1` (taustalla) → sauma poissa? → värimittaus → PT.
