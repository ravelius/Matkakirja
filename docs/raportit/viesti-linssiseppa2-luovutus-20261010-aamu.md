# Linssiseppä 2 – luovutus 10.10.2026 aamu (PT: nollausraja 50 %)

Rooli: Linssiseppä 2 (Opus, high): kaupunkinäkymän ilmakehä ja valo, omat 3D-mallit (putki + ämpäri), varjot, vesi, pilvet.
Proto `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (paikallinen git); omat worktreet `wt/proto-linssiseppa2-laivat171` (vanha 6.3-pohja)
ja `wt/proto-linssiseppa2-muisti` (6.7-haarat). Skriptit `proto-3d/_tyo/linssiseppa2/skriptit-20261009/`.

## Lue ensin
CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä tiedosto. UNITY 6.7 (Natiiviseppä 08.3x): runko `natiiviseppa/juna-175` a4c6539e5; tarkistukset
`MATKAKIRJA_KIRJASTOT=/Users/Shared/Claude/unity/kirjastot-6000.7.0b4 ./Linssit-testit/unity-tarkistus.sh` (6.3-Library → CS0433);
ei uusia GetInstanceID-kutsuja (CS0619 → GetHashCode). Käännös `proto-kaanna.sh` vain Julkaisijan KÄÄNNÖS NYT -vuorolla, simu vain SIMULAATTORI NYT.

## 1. Haarat 6.7-pohjalla (a4c6539e5), kaikki odottavat PT:n kuittausta pareista → SHA Natiivisepälle junaan
Tarkistukset 6.7:llä 08.5x: kaikki unity 0, L 1294–1297 / K 453 / P 449 läpi.
| haara | mitä | pari |
|---|---|---|
| linssiseppa2/omaaurinko-175 **97d2d7a71** | omat mallit (OmaMalli, OmatVarjot) laattojen leivotusta atsimuutista: Pariisi ~300°, Tukholma ~145° (mitattu ylhäältä); korkeus vuorokaudesta; asetukset omaleivottu, omaatsimuutti | omaaurinko-*.jpg |
| linssiseppa2/pilvet-175 **43b37f198** | Karttasepän METAR-pilvitaulukko (ilmakeha/pilvet-v1): pohja ≥ 900 m ja paksuus kaupungin ja kauden mukaan; pilvi-ilmasto 0\|1; LISÄÄ MUISTIA ~0 | pilvet.jpg |
| linssiseppa2/vesivari-175 **824f4f602** | Karttasepän mitattu veden väri (vesi/vari-v1, Sentinel-2): syvä+matala, Tukholmassa meri/makea korkeudesta; kerroin 0,5; vesivari, vesivarikerroin | vesivari.jpg |
| linssiseppa2/vesi-v6-175 **fc08ac3db** | index-v6.json ensin (Karttasepän Strömmen–Norrström-aluenosto, `_tyo/karttaseppa/vesi-aluenosto-20261010`; vienti Julkaisijalle kuittauksen jälkeen) | strommen-yo/paiva.jpg |
| linssiseppa2/hoyrykone-175 **20ce06552** | vanhat höyry/saaristolaivat Soundly hoyrykone-01…04 (GetHashCode), varalla vanha; todistusajo `tyokalut/linssiseppa2-ajot/sk-hoyrykone-174.txt` (6.3-appi cd7e89047) | todistus-hoyrykone-174-* |
| linssiseppa2/osoitin-176 **2550c88a7** | CesiumOmatMallit uusin-5.json, varalla uusin-4 (juna 176, kaupungintalo) | – |
Vanhat 6.3-haarat (-174) jäävät talteen, ei mergetä.

## 2. Omat mallit
- **uusin-4 → v6k4** (Julkaisija 07.0x; omistaja hyväksyi ND v3 + KL v6j; iPad A OK 0,74 Gt). Paketti `_valmiit/omat-mallit-vienti-20261010i`.
- **v6k5 junaan 176** = v6k4 + Tukholman kaupungintalo v1 (LR päivitetyt glb:t 08.3x), `_valmiit/omat-mallit-vienti-20261010j` (portti 0,
  LAHTEET.md, SHA256SUMS 45). EI vielä viety: Julkaisija vie ja luo uusin-5.json → v6k5, kun PT kuittaa + osoitin-176 on junassa (Natiivisepän
  laiteajo ensin). Origon korkeus ARVIO 26,5 m: tarkista pelikuvasta (eteläterassin reuna 1,5–2 m veden yllä, ei helmaa; muuten −0,5…−1 m).
- **Kaupungintalon pelikuva odottaa simuvuoroa**: `sh1-kuvat.sh` (pysähdys 15 + vedeltä 450 m, 173pbr2-appi, paketti `_tyo/linssiseppa2/nd3/v6k4-sh1`)
  → arkki PT:lle, sävyhuomiot (kupari liian vaalea? tiili liian pinkki?) LR:lle.
- Testipaketit (`_tyo/linssiseppa2/nd3/`): v6hk3-nd3c-pp1 (Préfecture v1), v6hk3-rh3b (Riddarholmen v3b), v6hk3-co2 (Concorde v2),
  v6hk3-eif1 (Eiffel v1), v6hk3-nd3d. Putki: `nd3k-paketti.sh` (KOHDE/ETU/POHJA-envit), uusi kohde: `omat_mallit_tileset.py --lisaa` + KTX2 (ks. sh1-paketti.sh).
- Peilit `_tyo/linssiseppa2/peili/v6h3|v6hk3` (ämpäristä; _valmiit/20261010e–h arkistoitu NAS:lle).

## 3. Pitkän vuoron parit (08.0x–08.4x) → PT
Arkit `arkit-pitka.py` → docs/raportit/kaappaukset/linssiseppa2-pitka-20261010/. Katso TILA-osio alla.

## Muuta
- Karttaseppä: pilvet-v1 ja vesi/vari-v1 ämpärissä; toive vesiverkon vesistötunnisteesta seuraavaan versioon. Olavinlinnan vedet samassa
  muodossa `_tyo/karttaseppa/vesivari-olavinlinna-20261010/` (ei ämpärissä; kaupunkinäkymä ei käytä, dioraama on LR:n – vie vain tarvittaessa).
- tuuli-kylma (LS1:n jako): varalle (ISS:ssä ei tuulta), ellei PT toisin.
- Pariisin leivottu atsimuutti 300° on epävarma (±20°, laattojen varjot heikot) – pari ratkaisee.

## TILA (08.5x)
- Pitkän vuoron arkit PT:llä (c2d26ff51, docs/raportit/kaappaukset/linssiseppa2-pitka-20261010/). Havainnot: Strömmen v6 korjaa 900 m ja Norrströmin,
  mutta Strömmen–Skeppsholmen 420 m:ssä jää iso musta alue (Blasieholmen/Nybroviken) → Karttasepälle aluenoston laajennus (aluenosto.py sekunneissa,
  `_tyo/karttaseppa/vesi-aluenosto-20261010`). Oma aurinko: klo 10/16 johdonmukaiset, Pariisin 300° tummentaa ND:n kaakkoispuolen (PT arvioi).
  Pilvet ok (pohja 900 m). Vesiväri hienovarainen, suositus ×1. Eiffel v1: vaalea esplanadilaatta + vaalea torni + siniset tasot → LR:lle.
- Höyrykone: Soundly 01/03 soi 5 laivassa, rms 0,086, wav 30/20 s; todistuksen PUUTE vain ajoitus (latausrivi ennen odotusta).
- Odottaa PT:n kuittausta → SHA:t Natiivisepälle junaan (6.7-runko). Kaupungintalon pelikuva (sh1-kuvat.sh) ja v6k5-vienti seuraavaksi.

## Aloitusviesti
```
Olet Linssiseppä 2 (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-linssiseppa2-luovutus-20261010-aamu.md
(haara linssiseppa2-tyo-20260928). Ensin: kaupungintalon pelikuva (sh1-kuvat.sh) Julkaisijan simuvuorolla → PT + sävyt LR:lle; sitten PT:n
kuittausten mukaan 6.7-haarojen SHA:t Natiivisepälle ja v6k5-vienti. Viestit PT:lle vain valmis erä, jumi tai kysymys, ≤ 8 riviä.
```
