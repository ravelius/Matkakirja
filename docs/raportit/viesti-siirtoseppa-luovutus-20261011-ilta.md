# Siirtosepän luovutus 11.10.2026 ilta ~16.15 (Opus 5.5, high; konteksti 53 %, nollausraja 50 %)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Opus, high): Olavinlinnan historiamoottori ja pelattava pala (natiivi proto). Lue tämä, CLAUDE.md ja Raamatun
Ydinajatus kohta 2. Edellinen luovutus: docs/raportit/viesti-siirtoseppa-luovutus-20261011-aamu.md (taulukko vanhoista commiteista).
Proto-worktree /Users/Shared/Claude/wt/proto-siirtoseppa-kello, haara **siirtoseppa/laituri-varoitus**, kärki katso `git log -1`
(16.15: **3c6f44c81**). Pakettihaarat worktreessa /Users/Shared/Claude/wt/proto-siirtoseppa-v47g: siirtoseppa/v47h…v47p (+ v47q tekeillä).
Proto-git on paikallinen (ei pushia). Olavinlinna-vahti kääntää jokaisen linnahaaran commitin → lokit/olavinlinna-uusin; haaralista
/Users/Shared/Claude/julkaisija-tyokalut/olavinlinna-haarat.txt (Julkaisija vaihtaa pakettihaaran, kun kerrot haaran + SHA:n).
**Omistaja 12.5x:** kaikki avoimet junaan 182, myös Olavinlinna; HIONTA KUULUU JUNAAN 182 (laatu tärkeintä). Opus-ali-agentit rinnakkain.
**Prosessi (PT):** korjaukset vahtiin → botti 17 osaa (A/B kahdella simulla) → rivi "BOTTI x/17" PT:lle → 8. kierros kahdella simulla.

## BOTTI-OSAT (työkalut)
- Ajo: `APP=<lokit/olavinlinna-auto-…/Matkakirja3D.app> HAARA=<linnahaaran sha> SKEN=botti-osat-A perl -e 'use POSIX "setsid"; fork and exit;
  setsid; exec @ARGV' zsh /Users/Shared/Claude/proto-3d/tyokalut/siirtoseppa-ajot/ajo-botti-osat.sh > <scratch>/boA.out 2>&1 < /dev/null`
  ja sama `SKEN=botti-osat-B U=A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4` (Julkaisijan antama paikka 2; oma simu A = 8362879F). ~10–13 min.
- Yhdistetty raportti: `zsh <kello>/tyokalut/botti-osat.sh --loki <A-kansio> --loki <B-kansio>` → viimeinen rivi "BOTTI x/17 LÄPI";
  hylätyt ruudut kuvina botti-osat/kuvat/. Osajoukot: `python3 proto-3d/tyokalut/siirtoseppa-ajot/jaa-botti-osat.py <nimi> osa1,osa2`.
- Julkaisijalle aina "SIMU VAPAA ×2" + tulos HETI ajon jälkeen (kerran myöhästyi 13.31 → käytä taustaodotusta, joka ilmoittaa).
- 8. kierroksen osajako Laitetestaajalle lähetetty: A = laituri, sisapihat, kirkkotorni, kappeli, palatsi, ampumakaytava, komero, tyrma;
  B = porttikaytava, keittio, tott-kammio, muuriportaat, sali, muurikaytava, harja, pako, paluu. Hyväksytyt osat kerrotaan kierroksen alussa.

## TULOKSET 11.10.
6/17 (13.15) → 8/17 (14.02, v47n) → 11/17 (14.30, v47o) → **12/17 (15.25, 83821abe1 + v47p)** → 11/17 (15.45, NavMesh-seinät; kytketty pois).
15.25 EI LÄPI: kirkkotorni 16 (kierreportaan alapää PathPartial) + aloitus yksivärinen; kappeli 42; tott-kammio 19; sali 61, 72 + aloitus
yksivärinen; harja aloitus seinässä (muurinharjan länsipää ilman päätyä → LR v47s). Aloitusten "yksivärinen seinää päin" korjattu
cfd0f1e89 (ei vielä ajettu). Jumit 16/19/42/61/72 = mallin juurisyy (lattia jatkuu seinän alle) → LR v47q korjaa datassa.

## SEURAAVAT TEHTÄVÄT (järjestys)
1. **v47q-kiinnitys** (Sonnet-agentti käynnissä nollaushetkellä → tarkista `git -C <v47g-worktree> log --oneline -1 siirtoseppa/v47q`;
   jos puuttuu, kiinnitä kuten 9b34a3b7c: pala 6619d8a1d8fdc525 (blender 5843ae9faf23540b), nyky 1bad2c78cf1adf4f (nyky-blender selvitettävä)).
   Kerro Julkaisijalle haara + SHA → vahti → BOTTI NYT ×2 (3c6f44c81 tai uudempi + v47q).
2. **v47r/s/t** tulevat seuraavalta Linnanrakentajalta (LR nollautui): r = ulkoalueen kiila, s = harjan päätyseinä + kävely matalien
   näkyvien pintojen alta, t = kappelin tilan kansipinta pois 1499:stä (piste 77). Kiinnitä vain viimeisin.
3. **SilmaVaran lähdeloki** (Sonnet-agentti käynnissä, muutokset kellossa committaamatta: SeikkailuKavely.cs, KavelyPielet.cs,
   SilmaVaraLahdeTestit.cs). Tarkista `git status`; jos valmis ja testit läpi → committaa vain nämä tiedostot. Tarkoitus: selvittää mikä
   näkyvä pinta painaa silmän 1,22 m:iin muuriportaan juuressa (glTF −18,1; 3,8; −18,5; LR: kirkkotorni-portaat-meshissä ei ole) → lokirivi
   "seikkailu: silmävara <lähde> painaa silmää …" seuraavassa botti-ajossa → kerro LR:lle.
4. Kun BOTTI 17/17 tai jäljellä vain LR:n kohdat → PT:lle, Laitetestaajalle hyväksytyt osat (8. kierros A/B).
5. Soutajan kuvakulma veneessä (NS:n kasvot 046e28c48 + soutaja v2 38108e9ad ovat linnahaarassa): tarkista simulla, näkyvätkö soutajan
   kasvot pelaajalle repliikin aikana (NS pyysi; pää kääntyy kameraan). Jos kamera on selän takana → kääntö tai istumapaikka.

## TÄNÄÄN LINNAHAARAAN (kärki 3c6f44c81, kaikki tarkistettu puhtaalla `git archive` -kopiolla: tarkista 0, Linssit läpi)
| Commit | Sisältö |
|---|---|
| 17b9e0162 / 21384b19c | botti: komero/pako kiipeilyn lopusta, toimintopisteet, kappelin odotus, oven avaus (+ käännöskorjaus) |
| cf060b7d2 | nimilaput pois palasta (Ydin Nimilaput), tyrmän vihje 10 s, esineiden latauksen NRE |
| 989cd1b81 | palatsin mustat ruudut: linnantupa/voudin-sali sisätiloina (KavelySisatila.SisatilanRajaus) |
| 38ebd1585 / ca893db7e / 61437ec5b / 83821abe1 | aloitussuunta kulkutestillä, avoin aloitus, ensiaskel, yksivärisyys (hajonta+gradientti), kuvat lokiin, vartijat turvassa osa-ajossa, A+B-raportti |
| 13fa438cd | jumit 12 (NakyvaLiuku) ja 83 (vartija edessä -odotus) |
| 0168172e0 | piilo pöydän alla (Ydin PiiloAla, merkin koko) |
| dbde6d46a | tarkistuspisteen hystereesi (OsanVaihto), laiturin laineet +0,9 dB |
| 9ff2aff82 | Piste20-testi v47h-pääovelle |
| ec2e821df | vika 5: oikean alun katse portille (LaiturinKatse) |
| f2bae0ac6 | LinssiOhjain.AvaaPelattavaPala(bool ohitaSaatavuus) NUI:n Olavinlinna-nostolle |
| 38108e9ad | soutajan v2-repliikit (manifesti repliikit-soutaja-v2, SoutajanVuorot; vene-3 laiturille noustessa) |
| cfd0f1e89 | ensiaskeleen jälkeen yksivärinen vain alle 0,35 m pinnasta |
| 9c7c77a4f → 3c6f44c81 | NavMesh-seinät (Ydin NavMeshSeinat) — kytketty POIS (NavMeshSeinatPaalla = false), heikensi 12 → 11/17 |
| merget | b442076c1 faktat 10dc55c2b, 076e3b63f master a93ce987f (tekstit_olavinlinna.py: repliikit-v5 + tietokerros-v2), 268e87459 hehku-ssao, 1100a3515 soutaja-v2, 046e28c48 soutaja-kasvot |

## AVOIMET / HUOMIOT
- Vartijat osa-ajossa turvassa (botti testaa kulkua); läpipeluussa vartijat ennallaan.
- Laiturin äänitaso: loput 0,1 dB vaatisi jaetun mikserin linna/maisema-kertoimen noston → PT päättää (ei kysytty vielä).
- NavMesh agentRadius 0,3; pääoven aukko 0,95 m ja penkin/pilarin väli 0,57 m (44↔45) ovat ahtaita → LR tietää kapselin mitat
  (r 0,30, h 1,75, step 0,35, slope 40°, skin 0,03; vapaa leveys ≥ 0,66 m).
- Kone usein kuormassa (load 100–800): testit hitaita, ajot "toimintatesti".

## OPITTUA
- **Jaettu työpuu + rinnakkaiset agentit:** älä `git add <tiedosto>` sokkona — kahdesti mukaan tuli toisen agentin keskeneräisiä rivejä
  (vahdin käännös kaatui). Tarkista `git diff <tiedosto>` juuri ennen addia; tarvittaessa vain omat hunkit (`git apply --cached` suodatetulla
  patchilla) tai blob (`git update-index --cacheinfo`). Varmista commit: `git archive HEAD | tar -x -C <scratch>/tark`, `git init -q`,
  kopioi ProjectSettings/ProjectVersion.txt, `zsh tyokalut/tarkista.sh` + `Linssit-testit/kaanna.sh` (sh).
- Uuden ytimen funktiot omaan tiedostoon, jos PelattavaPala.cs:n viereen (pakettikiinnitykset muuttavat Hash-rivejä → merge-ristiriita).
- Heijastuksella haettu metodi (Type.EmptyTypes): lisää uusi ylikuormitus, älä oletusparametria.
- Mallin juurisyyn korjaus datassa (LR) voitti natiivin kiertotien (NavMesh-seinät sulkivat kapeita aukkoja).
