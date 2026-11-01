# Valosepän luovutus 1.11.2026 klo 15.05

Syy: konteksti 25 % (pehmeä raja). Edellinen: viesti-valoseppa-luovutus-20261101-1350.md (työtavat, opit ja PYSYVÄ SÄÄNTÖ voimassa).
Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 14.12–15.0x). Skriptit: `_tyo/linssiseppa2/skriptit-20261031/`.

## PYSYVÄ TYÖTAPA (PT 1.11. 14.4x, omistajalle luvattu)
Jokainen pitkä Unity-ajo **Monitor-työkalulla**, joka tulostaa rivin sekä valmistumisesta että kuolemasta (prosessi poissa ilman
valmis-riviä, Error/Exception/Killed lokissa). Ajon loppuun kuvien tarkistus (`[[ -s kuva.png ]]`). Kuollut ajo → heti uudelleen + rivi PT:lle.
(aurinko-kuvat.zsh kuoli 13.49 jonossa huomaamatta: "jonossa"-tilassa odottava esikatselu kuolee, jos käynnistänyt sessio nollautuu.)

## PYSYVÄ TYÖTAPA 2 (OMISTAJAN PÄÄTÖS 15.02 kortilla, PT:n kautta: "Kyllä, suoraan")
Jokaisen valmistuneen kuva-ajon koonti/kuvat HETI omassa sessiossa **SendUserFile**-työkalulla (status proactive, display render),
keskeneräisetkin, lyhyt suomenkielinen kuvateksti (mikä kohta, mikä muuttui, mikä vielä vialla). Polku + rivi PT:lle kuten ennenkin.
Lähetetty 15.1x: pari-03-06.jpg ja koonti 141625.

## TEHTY
- Koonti 8 kohtaa rungolla **a8c8835e5** (peliaurinko 45°/318°): `proto-3d/lokit/havainne-editori-20261101-141625/koonti.png`.
  PT: EI omistajalle (ei heittovarjoja). Leivottu valo päällä pelissä: 165 "leivottu valo … kt" -riviä, pelivalo 45°/318°.
- Varjodiagnoosi `esikatselu-20261101-143757/diag-koonti.jpg` (d0 oletus, d1 leivonta 0, d2 heitto 1 = kaikki heittävät):
  elävä varjokartta piirtyy editorissa (hahmon varjo näkyy d1/d2). Leivonnalla lattia (kk-tausta) on leivottu → elävä varjo vain
  leivotun auringon > 0,45 kohdissa, ja leivotut rungot eivät heittäneet (Valo.cs) → PT 14.5x päätös (1).
- **Päätös (1) toteutettu: proto `linssiseppa2/varjo-216` 067a0fc38** (a8c8835e5:n päällä, worktree `wt/proto-linssiseppa2-varjo216`):
  `JuoksuV4Maailma.Valo.cs` LeivotutHeittavat = true (QA `valo leivheitto 0|1`, voimaan seuraavalla `valo 1`), `JuoksuValo.hlsl`
  JuoksuLeivottuVarjolla(varjo, rajaton) + `_JuoksuLattiaElava` (Valopohja.JuoksuLattiaElava, QA `valo lattiavarjo 0|1` heti),
  `JuoksuLattia.shader` lattiapolku (rivi ~822) rajaton. valovahti ok. EI uutta leivontaa.
- Koepari 067a0fc38: `havainne-editori-20261101-145338/pari-03-06.jpg` (03 + 06 vierekkäin havainteen kanssa): **hahmon varjo näkyy
  lattialla, RAKENNUSVARJOT EIVÄT** – eivät myöskään d2:ssa (13868/14233 heittää, leivonta 0, lattia elävällä valolla).
- 06-havainnekamera korjattu: proto `linssiseppa2/k17-piha06-216` **6fad3642c** (`tyokalut/havainne/editori.sh` TESTIKAMERA 06 =
  "3.0 6.88 10 45"; pelikamera katsoi lattiaan, keisari 1,5–1,67 → nyt 1,00). Ajo-worktree `wt/proto-linssiseppa2-k17` on tällä haaralla.
- Simukäännös a8c8835e5 valmis (linja 2): `_tyo/linssiseppa2/simu03-app/Matkakirja3D.app` (ei asennettu; ota simukuva vasta 067a0fc38:n
  jatkosta, ks. AVOIN 2).

## AVOIN (järjestys)
**PT 15.0x: NS selvittää rakennusten ShadowCaster-polun (kohta 1) → seuraaja EI tee samaa, vaan odottaa NS:n korjaushaaraa ja tekee
sitten hinta-ms (kohta 2) + simukuva 03 + pari 03/06 (NS:n korjaus 067a0fc38:n kanssa).**
1. **RAKENNUSVARJOJEN SYY**: miksi rakennukset eivät näy varjokartassa, vaikka shadowCastingMode On (d2 kaikki). Epäillyt: (a) JuoksuMaailma.shader /
   JuoksuLattia.shader ShadowCaster-pass (häivytys `JuoksuHaivytys.hlsl` "näkymättömästä ei varjoa" → clip, `_Haivytys`, alfa), (b) julkisivut
   ovat osasarjan palat/kopiot (Palatsi.cs:1043 kopioi mr.shadowCastingMode syntyhetkellä; myöhempi PaivitaKappaleet kattaa vain Juuren alla
   olevat), (c) OnTaihemen-poisto 03-aukiolla (f-taihemen EI heitä, PT 25.10.), (d) kaskadin/varjoetäisyyden rajat. Koe: yksi editoriajo
   06-kameralla `valo leivonta 0` + `valo heitto 1` + Frame Debuggerin sijaan ShadowCaster-passin tilapäinen pakotus (ei clipiä) QA-lipulla.
   Korjaus haaraan linssiseppa2/varjo-216, sitten pari 03 + 06 → PT.
2. PT:n ehto: iPad-hinta ms/ruutu (NS:n mittaus tai simu) – jos > 2 ms tai ulkoasu ei yllä havainteeseen → (2) LAV:n maailmankoordinaattinen
   lattian varjokartta, rivi PT:lle ennen.
3. **Eteläsuu**: suu-216/216b eivät päässeet maaliin (botti), suu-o3 kuvasi portin ovet kaukaa (ei tunnelia) → `suu-216c.zsh` (z −455/−435/−415
   keskiakselilla x 16,4) oli ajossa 15.0x: tulos `skriptit-20261031/suu-216c.log` (KUVA OK -rivit). PT: jos suu ei tumma vaikka leivottu valo
   päällä → tarkista ladataanko portin tunnelin atlas (LOD/solmu), rivi PT:lle. Jos z-arvot eivät osu suulle: PK:n suu.py-geometria
   (_tyo/pelikoodari/reitti-216/tallenne/kaari/havainnot.md: eteläsuu x −3…3, tunneli 25 m ovelle).
4. Vanhat (luovutus 13.50): läikät 03/04, 07 usva + taivassauma. Kivetyksen sävy annettu PK:lle (PT 15.1x, pohja varjo-216 067a0fc38) → EI seuraajalle.
