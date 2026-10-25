# Pelikoodarin luovutus 25.10.2026 klo 11.30 (Postivahdin kova raja 41 %)

Edellinen: viesti-pelikoodari-luovutus-20261025-1000.md (lisäykset 11.5x asti; lue vain tämä). Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto,
haarat paikallisia (ei push-oikeutta). Esikatselu: `zsh <worktree>/tyokalut/esikatselu.sh <haara> <skenaario>` taustalle, kerro JU:lle (L1).

## JONO (järjestys PT 11.5x)

### 1. KESKEN: räystäskameran pehmennys (PT 11.4x: EI junaan ennen kuin 0 kamerahyppyä ja 0 piiloruutua)

- Haara `pelikoodari/raystas-kamera-210` (worktree /Users/Shared/Claude/wt/proto-pelikoodari-raystas-210), junan 210 rungon 0ef01ab91 päällä:
  dccaef28a (DroneNosto.AlitusPelissa = false: pelissä ei läpikulun/porttitunnelin/räystään alitusta eikä porttilähennystä tai kujan suun
  lähennystä; alitus vain AvausT:ssä; QA `ui juoksupeli drone alitus 0|1`; testi AlitusPelissaOletuksenaPois), 4cac5fe5f (ennakoiva
  jyrkkeneminen: kulma reitiltä k s eteenpäin − YhtJyrkkenee·k·EnnakkoVara), 8991e7626 (ilman alitusta ylle-paikan matalin nosto, ei 8 m + ylle;
  EnnakkoS 3, vara 0,4). Testit 737/737 (+1), unity-tarkistus 0. Muut laskut grepattu: vain v1-kamera (!YhtenainenDrone) ja ei-sokkelo.
- Mittarit: alitus 1 (vanha): 0 piilo, mutta kamera muurin sisällä 2/12 kuvassa. dccaef28a: piilossa 18 / 20 s, hyppy 1, nousu 17 m / 73°.
  4cac5fe5f (esikatselu-20261025-1118): 40 s:ssa piilossa 86, hyppyjä 2, yhä 17 m. Syy: portin runko 2–3 m keisarin takana uloskäynnin
  jälkeen (huippu 5,4–7,6 m, "ei kattoa") ja kamera jää jousten takia 10–12 m:iin (nimellinen 9,7) → kulma myöhässä → nosto + ylle.
  Kujaporttien katot ovat KattoHaivytyksessä (p-kujaportti* lod0 katto → palat), joten portin sisällä katto ei ole ongelma.
- KÄYNNISSÄ 11.2x: ajo 8991e7626, skenaario /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/raystas-210/skenaariot/sk-kujaportti-ennakko2.txt
  (alku −249,4, 340, maali −249,4, 430, siemen 11, kuvat kp0-01…16 0,5 s välein, mittari 30–40 s). Tulos lokikansiossa, jonka nimi
  `ls -t /Users/Shared/Claude/proto-3d/lokit | grep esikatselu | head -1` (11.2x jälkeen). Arvioi: `grep -E 'mittari: t (10|20|30|40) s|PELAAJA PIILOSSA|KAMERAHYPPY' unity.log`
  drone alitus 0 -rivin jälkeen ja kamerakorkeudet loki.txt:stä (`kamera (x, y, z) pitch`).
- Jos yhä piiloja: vaihtoehdot (a) nopeampi jyrkkeneminen vain ilman alitusta (YhtJyrkkenee 30 → 45 °/s) ja EnnakkoVara 0,3; (b) ennakko
  myös jousten viiveelle: käytä todellista kameraetäisyyttä (kPaikka−pohja vaaka) YhtenainenKulma-kutsun d:nä; (c) ylle-paikka 40 %.
  Tavoite PT: 0 hyppyä, 0 piiloruutua, nousu ennen porttia, matalin (harja + vara), muutos saa kestää 2–3 s.
- Valmis → mittarit + vertailukuvat (havainne-tyyliin ruudukko kp0 nyt vs. vanha `proto-3d/lokit/raystas-kamera-210-20261025/kujaportti-alitus1-vanha.jpg`)
  PT:lle, sitten JU vie junaan.

### 2. Aukio 03 (PT 11.5x)

Kun keisari tulee aukiolle, kamera loivenee (Raamattu 2.177 "avarassa loivenee pehmeästi") niin, että Taihedian terasseineen näkyy kokonaan
havainteen 03 tapaan ja keisari pysyy samankokoisena kuvan alaosassa. Lähde: main 94b2da26b
docs/raportit/kaappaukset/havainne-mittaus-20261025/03b-etaisyys-kolmikko.jpg (NUI). Mittarit 0/0. Kolmikko havainne | nyt | uusi PT:lle.
Tee räystäskamerahaaran päälle (sama kamera).

### 3. Lautaspöydän pari uudelleen (PT 11.5x: vasta räystäskameran jälkeen)

- aarteet799-v4 ämpärissä 11.21 (JU, 18962cd75442; task976-tekstuuri, kultareuna pois). Osoitin ebe698506 haarassa `pelikoodari/aarteet799-v4`
  (worktree /Users/Shared/Claude/wt/proto-pelikoodari-aarteet799-v4, junan 210 rungon päällä), annettu JU:lle junaan.
- Harmaa lattia = editorin ensimmäisen Render()-kutsun vika (PT 11.5x; PK:n korkeusteoria oli väärä) → NUI:n lämmitysruutu
  proto natiivi-ui/havainne-skaala-210 86c645bd1.
- Kuvausrunko: räystäskamera + aarteet799-v4 + lämmitysruutu + lautaspöytähaaran korjaukset (`pelikoodari/lautaspoyta-yksi`:
  e806ef4bd tuplapöytä = Rekvisiitat kujan suunnalla; e34e0fbe6:stä SIRPALEIDEN todellinen koko — sen RaystasPeite korvautuu
  raystas-kamera-210:llä, älä ota sitä osaa). Lautaspöytähaara on a28be3c7e:n päällä → cherry-pick junan rungon päälle, testit.
- Skenaario sk-lautaspoyta-04f.txt (proto-3d/_tyo/pelikoodari/lautaspoyta-04/skenaariot/), mutta ilman jäädytyskohtaa (rikko ehti ennen
  `valo jaady 1` -komentoa; rikkokuva = rikkopysays 0.12 → oleta-uusi "rikko jäädytetty"). Pari: kupla #949
  /Users/Shared/Claude/wt/fable-posti-0945/posti/codex-fable-muistokupla4-lautaspoyta-20261025/04-lautaspino.jpg | peli, koostaja
  scratchpadissa (PIL korkeus 1200, kupla vasemmalle, 16 px musta väli) → PT:lle 3 rivillä.
- PT:n tarkistus: yksi pöytä, tumma puu, kolme matalaa pinoa, kontakti, sirpaleet oikean kokoisia ilman keltaista reunaa ja puhki palanutta
  valkoista, kamera 810 / räystään yllä.

## Tehty tänään (kuitattu)

- Mittakaavalista docs/raportit/pelikoodari-palatsin-mittakaava-20261025.md (f64aa2bb8) – PT kuittasi; mittakaavalle vain mahdollinen kujien
  levennys omistajan vastauksen jälkeen.
- Muurikujat ja kujaportit reitillä: jo junassa 210 (075821f22, 75359c119, d32426118; fe0fdee7a, 48bb1dd70) – PT:lle kerrottu.
- Codex-pyyntö lautasen basecolorista postissa 179fc34a8 → toteutui task976:na (v4).
