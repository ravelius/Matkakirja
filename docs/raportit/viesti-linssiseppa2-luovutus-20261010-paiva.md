# Linssiseppä 2 – luovutus 10.10.2026 päivä (~11.2x, konteksti 47 %, PT: nollausraja 50 %)

Rooli: Linssiseppä 2 (Opus, high): kaupunkinäkymän ilmakehä, valo, vesi, pilvet ja omat 3D-mallit (putki + ämpäri).
Proto `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (paikallinen git); oma worktree `wt/proto-linssiseppa2-muisti` (6.7-haarat).
Skriptit `proto-3d/_tyo/linssiseppa2/skriptit-20261009/`. Tarkistukset 6.7: `MATKAKIRJA_KIRJASTOT=/Users/Shared/Claude/unity/kirjastot-6000.7.0b4
./Linssit-testit/unity-tarkistus.sh` + `./Linssit-testit/kaanna.sh`. Simu vain Julkaisijan SIMULAATTORI NYT -vuorolla (A26BC7D0, 173pbr2-appi
`lokit/linssiseppa2-app-173pbr2`), ilmoita "simu vapaa".

## KESKEN (tee ensin)
1. **ND-parvis v3g (omistajan havainto PT 10.5x: "miksi tuo kivetys loppuu noin oudosti kesken parviksessa")**. Juurisyy: ND:n oma maa oli
   rajattu 300 m:n lähdeaineistoon (±150 m), parvis ulottuu −183 m:iin. Karttaseppä teki 440 m:n aineiston `_tyo/karttaseppa/notre-dame-440/`.
   Skriptit parametrisoitu (ND_DATA, ND_N; oletus vanha): `_valmiit/notre-dame-v1/aja_v3g.zsh` (alue.py → maa.py → parvis_v9.py 154,147,138 0,7 →
   Blender notre_dame.py → aja_tekseli_v3g.zsh). LÖYTYI VANHA VIKA: maatekstuuri neliö, UV venytti maa.json-rajat → pohjoinen–etelä vinossa
   (v3f/julkaistu v6k6 ~16 %, eteläiset nurmet ~40 m väärässä). Korjattu maa.py:hin (rajat neliöksi). v3f:n lähteet `notre-dame-v1/varmuus-v3f/`.
   Paketti (korjattu) `_tyo/linssiseppa2/nd3/v6k7` = v6k6 + ND v3g + uusi leikkaus (127 pistettä) mallit.jsonissa, portti 0. Vino versio
   `nd3/v6k7-vino` ja sen kuvat `lokit/linssiseppa2-nd3k-nd3g-vino` (älä käytä).
   **Simuvuoro pyydetty Julkaisijalta (~8 min)**: `skriptit-20261009/vuoro-nd3g-eif1c.sh` (ND v3g e3/e6/e7 + Eiffel v1c). Sitten
   `python3 -I skriptit-20261009/arkit-nd3g.py docs/raportit/kaappaukset/linssiseppa2-176-20261010 150 0 0` → nd-parvis-v3g.jpg (v3f | v3g) ja
   nd-ylha-oikea-vs-peli.jpg (PT:n pyyntö: "Oikea ilmakuva 2018" | "Peli v3g", ortokuva Karttasepän IGN BD ORTHO 2018 -rajaus; säädä args
   puolileveys_m dx dy jos rajaus ei osu). Tarkista: eteläiset nurmet paikallaan, SW-kulman läikät, parviksen sävy (ylhäältä vaalea/kerma vs.
   oikea harmaa → tarvittaessa v3h tummempi/viileämpi). Arkit → commit → PT. Kuittauksella vienti Julkaisijalle (pohja v6k6 → v6k7).
2. **Eiffel v1c** (LR 11.1x: maa 106/98/81 himmeä): paketti `nd3/v6hk3-eif1c`, kuvat samassa vuorossa; arkki: kopioi eiffel-v1b-rivi
   arkit-176.py:stä (ennen = lokit/linssiseppa2-eif1-v6hk3), mittaa maa jalkojen välissä (tavoite ~115/110/104) → LR + PT.
3. **ISS-kupolan 3D-koe** (omistajan kortti, PT 10.2x): Opus-agentti teki haaraa `linssiseppa2/cupola3d-koe` (juna-176:n päällä) taustalla;
   jos tämä sessio nollataan ennen agentin raporttia, tarkista haara `git -C /Users/Shared/Claude/wt/proto-linssiseppa2-muisti log --oneline -3
   linssiseppa2/cupola3d-koe` ja aja tarkistukset itse. Sisältö: CupolaTila (proseduraalinen kupoli, 1 pyöreä + 6 trapetsi-ikkunaa, overlay-kamera
   kerroksella ~22, aurinko + maavalo cullingMaskilla), A/B `astro kyyti cupola tila`, `cupola-gi 0|1`, `cupola-ssr 0|1`; SSR ja Surface Cache GI
   lisätään renderer-assettiin epäaktiivisina (strippaus) ja kytketään ajossa. Avoimet: toimivatko SSR/GI overlay-kameralla; GI-maailmaan ei saa
   päätyä Cesium-laattoja. LS1 kuittasi, ettei päällekkäisiä muutoksia. Tulos PT:lle: pelikuvapari (nykyinen / koe, sama hetki ja kulma) + laiterivi
   (fps nyt 45, muisti) simulaattorissa ja iPad Pro 12.9:llä Julkaisijan vuorolla. Junaan vasta omistajan hyväksynnän jälkeen.
4. **Peking** (omistajan poikkeus "koekaupunki Peking", Raamattu ad5d1e48d): LR:n 24 laattaa `_tyo/linnanrakentaja/peking/glb/` + laatat.json
   (portti 0), Karttasepän maa/vesi/kadut/yövalot `_tyo/karttaseppa/peking-20261010/ls2/` (vesiväri ~12.15). PT asettaa jonoon; LR odottaa
   vertailua Googleen (korkeus, sävyt). Muoto sovittu: 24 kohdetta mallit.jsoniin, korkeus 37,9, leikkaus laatan suorakaide.

## VALMISTA tänään (10.10. aamupäivä)
- Junaan 176 (Natiiviseppä, runko 57187899e): omaaurinko 97d2d7a71, pilvet 43b37f198, vesivari 3a0def9e7 (kerroin 1), vesi-v6 fc08ac3db,
  hoyrykone 20ce06552, vesi-v7 57187899e (index-v7, Karttasepän v7b ämpärissä). osoitin-176 2550c88a7 EI junassa (kaupungintalo v2 ensin).
- Omat mallit: v6k6 = v6k4 + ND v3f VIETY, uusin-4 → v6k6 (Julkaisija 10.5x). v6k5 (kaupungintalo v1) EI vientiin: v1 huonompi kuin Google
  146 m:ssä (lyhty puuttuu, vaakatanko, ikkunaruudukko, oranssi tiili) → LR tekee v2 Pekingin jälkeen; kaupungintalo omistajalle vasta v2:lla.
- Préfecture v1b kelpaa (PT). Vesi v7b valittu. Arkit `docs/raportit/kaappaukset/linssiseppa2-176-20261010/` (6bc3f2615, 7a6ed0804).
- Googlen 3D maailmalla: `docs/raportit/google-3d-maailma-20261010.md` (d0109bbf1; HYVÄ 38 / RAJA 50 / POIS 50); työkalu
  `_tyo/linssiseppa2/google3d-maailma/` (mittaa.py + reunat.mjs: lehden glb:n mediaanireuna, TARKKA ≤ 1,7 m, KESKI ≤ 5 m).

## Aloitusviesti
```
Olet Linssiseppä 2 (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-linssiseppa2-luovutus-20261010-paiva.md
(haara linssiseppa2-tyo-20260928). Ensin KESKEN 1–2 (ND v3g + Eiffel v1c simuvuorolla → arkit PT:lle), sitten ISS-kupolan 3D-koe (KESKEN 3).
Viestit PT:lle vain valmis erä, jumi tai kysymys, ≤ 8 riviä.
```
