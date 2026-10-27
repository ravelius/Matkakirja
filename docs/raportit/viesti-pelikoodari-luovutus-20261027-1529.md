# Pelikoodari: luovutus 27.10.2026 klo 15.29

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus: d20662332 (-20261027-1456) + c64492227.

## Haarat
- Proto `pelikoodari/c2-fg-212` (worktree /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211, nyt checkoutattuna), pää 82b753eaf,
  ed8cfaf46:n päällä, ei junassa. tarkista.sh 0 virhettä (palauta sen jälkeen Tyylikirja.uss, Tyylikirja.cs, tyylikirja.json gitistä).
- `pelikoodari/juoksu-taso1-212` = ed8cfaf46 (JU käänsi sen rimpuiluvideoon; app _tyo/pelikoodari/rimpuilu-212-app).

## Tehty
- **GPU A/B varmistettu** (PT:lle 15.0x): c3B/konsoli.txt "muurikate C3 pois" t 59,4 s → instanssit piirtyivät; 11,47 vs 11,46 ms pitää.
- **Rimpuiluvideo KK:lle**: simu-todistusajo OK (proto-3d/lokit/todistus-rimpuiluvideo-ed8cfaf46-20261027-1514), video
  _tyo/pelikoodari/rimpuilu-takaa-20261027/rimpuiluvideo-ed8cfaf46.mp4 (960×1280, 35 s, ääni, 19,7 MiB). Skenaario simu-rimpuiluvideo.txt
  (oikeat tapit peukalokohtiin 144/888, 963 pt; päivitetty odottamaan "juoksupeli: kiinni takaa" kirien-QA:lle).
- **KK:n palaute videosta (15.3x)**:
  1. Codex-tilaus rimpuilu v2 (isommat liikkeet, pitäjän tiukka ote): d20b95aaf (claude/postilaatikko). Odottaa toimitusta.
  2. Eunukki ilmestyi keisarin paikalle = QA `kiinni` asetti kiinnioton heti. Nyt `kiinni` kirii (JuoksuV4Saanto.AjajaKirii, QaKirii 4 m/s
     kintereiltä 5 m); `kiinni heti` = vanha. Pelissä takaa-otteen ottaja sulautuu 0,8 m:n reittipaikasta pariasentoon 0,25 s (PariSulauS).
     EI vielä kuvattu: aja simu-rimpuiluvideo.txt (tai editori) 82b753eaf:llä ja katso kiinniottohetki.
  3. Ohjeteksti "Kiinni! Napauta nopeasti" lukukelvoton → kysytty NUI:lta (UI-POHJAT), odottaa.
  4. Punaiset peukalokohdat näyttävät palloilta lattialla: NUI → PT → omistaja (Rimpuilu-tyyli on omistajan linjaus 21.10. 08.58). Älä muuta itse.
- **Sivuote**: ottajan kierto −90 → +90 (glTF −90° z-peilattuna, DioraamaGlb). Kuvat kiinniotto-sivulta-20261027/arkki-sw3.jpg: kasvot
  keisariin päin. Pysyy QA:n `kiinni sivu` takana, kunnes KK hyväksyy.
- **F/G-kaiteet** (C2 r 1/2): LataaC2Lahteet lukee c2-sijoitukset.json ennen LOD-kierrosta; f-taihemen/g-jalusta LOD0 kaiteettomana
  C2-kansiosta + <nimi>-1063-portaat.glb LOD0:n lapseksi; r ≥ 1 palat omina InstSarjoina (osa = palatsiOsat-indeksi), piirretään kun LOD0
  activeSelf; LOD1 palakohtaisesti 25 m. QA `palatsi c2-rak 0|1`. Vaatii C3:n (muuten tavallinen LOD0). Editorivertailu
  _tyo/pelikoodari/c2-fg-20261027/fg-vertailu.jpg (vasen rak1, oikea rak0): paikat ja portaat oikein, ei tuplia. Codexin kaiteet
  kermanvalkoiset vs vanhat harmaat. Raskas: G-portaat 390 k kolmiota yhtenä verkkona, G:n 4598 palaa LOD1:llä ~1,4 M kolmiota → PT:lle
  suositus GPU-mittaus LT:llä ennen junaa. Skenaario sk-c2fg.txt (g-sivu-paikka 95 −40 osui muuriin, vaihda).
- Siivous (Postivahti): 6 sulautettua proto-worktreetä + historiapeli-tarkista poistettu; juoksuverkko-211 jäi (2 jäljittämätöntä diag-testiä).

## Odottaa / seuraavaksi
1. Kuvaa 82b753eaf:n kiinniottohetki (kirien + sulautus) → KK.
2. NUI: ohjepohja; PT/omistaja: peukalokohdat; Codex: rimpuilu v2 → vastaanotto ja hahmot-v8-koe.
3. PT: F/G-kaiteiden ulkoasu (kermanvalkoinen) ja GPU-mittaus.
4. hahmot-v5/v6/v7-koe EI ämpärissä (JU/PK ennen junaa; v7 riittää).

## Opit
- glTF:n Y-kierto z-peilatussa kehyksessä (DioraamaGlb) vaihtaa merkkiä: −90° → +90°. Varmista kuvasta, mihin suuntaan kasvot osoittavat.
- todistusajon tap-kohta lukee UI-puun joka napautuksella (~1 s): nopeisiin sarjoihin kiinteät tap-koordinaatit.
