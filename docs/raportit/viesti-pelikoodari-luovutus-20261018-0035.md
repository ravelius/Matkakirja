# Pelikoodarin luovutus 18.10.2026 klo 00.35 (PT:n nollaus Postivahdin kautta)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*; varmuuskopio
`git push natiivi-backup <haara>:refs/heads/peili/proto/<haara>`, kaikki alla olevat pushattu 00.3x). Edellinen luovutus -20261017-2312 (dd970f816).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (/Users/Shared/Claude/osoitekirja.md):
  PT local_5df52e10-…, JU local_5cb16c00-…, LR local_996d60ab-…, LS (Linssiseppä) local_771b401b-…, NS local_674b9ec4-…, Postivahti local_a24c43c0-….
- KATSO JOKAINEN KUVA TÄYSIKOKOISENA ennen lähettämistä (rajaa ffmpeg crop=w:h:x:y yksityiskohtiin).
- Ajoja käynnissä minulla: EI. JU kääntää L1:llä perutun 89f6fa43a:n loppuun (~00.38, lukossa, ei tapeta, SIMUA EI AJETA).

## 1) GALLERIA ARKKI 5 → LR → PT (omistaja odottaa; EI junaan ennen omistajaa)
- Haara pelikoodari/galleria-200, worktree wt/proto-pelikoodari-galleria, VIIMEISIN **294d24f62**:
  f23550247 arkki 4c (yksi valon suunta: Karttaesineet.VarjoSiirtymaVasen yhteinen; pyramidin _Valo = KarttaSeepia.Valo()) – ajettu JU 00.15
  (lokit/todistus-galleria-arkki4b-200g-20261018-0015), PT palautti → 89f6fa43a (pyramidi + pallo) PERUTTU revertillä 9be5105b7 (pyramidi
  siirtyi LS:lle) → 294d24f62 kuumailmapallon maavarjo vaalea ja pieni (Karttaesineet.PalloVarjoPeitto 0,2, PalloVarjoLeveys 0,6) kartalla ja
  galleriassa; kartalla piiloon, jos osuisi nappulan varjoon (Nappula.SarjaVarjoRuutu, Karttaesineet.AsetaVarjo palauttaa ruuturajauksen,
  KaupunkiPallot.PallonVarjoVaistaa). Kartta-testit 502/502, tarkista.sh 0. EI vielä ajettu simulla.
- ÄLÄ KOSKE PYRAMIDIIN (LR/PT 00.3x): LS tekee pyramidin sarjavarjon + kapean okran reunuksen (ffa433c76, LS ajaa oman simunsa ~00.42 →
  PT). LR ilmoittaa LOPULLISEN LS:n sha:n PT:n kuittauksen jälkeen → VASTA SITTEN yhdistä (merge/cherry-pick) galleria-200:aan →
  tarkista.sh + Kartta-testit → yksi ajo JU:lle skenaariolla /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/sk-galleria-arkki4b.txt
  → katso täysikokoisena (pallon varjo vaalea/pieni eikä koske nappulan varjoon Pariisissa n-yhtenainen; pyramidi LS:n mukaan) → polku LR:lle.

## 2) EDITORIESIKATSELUN KORJAUSKIERROS (PT 23.5x: jatka; L1 vasta juna 201 -käännösten jälkeen)
- Ajo 1 (8cc5c33ea, 23.38, lokit/esikatselu-20261017-2338/ARVIO.md): tekniikka toimii (Unity 178 s, koko 407 s, kopio luotu kerran
  /Users/Shared/Claude/proto-3d/Matkakirja-proto-esikatselu), mutta kuvat kelvottomia: UI-komennot "tuntematon", oleta-aikaraja 120 s,
  kehykset kertyivät (paneelien clearColor false).
- Korjaus **ac414396f** (haara pelikoodari/esikatselu, worktree wt/proto-pelikoodari-esikatselu): "ui <loput>" kuten todistusajo.sh, alussa
  hiljaa + kehittaja 1, oleta hyväksyy editorin "odota-tila X n → ok [X]", paneelit tyhjennetään joka askeleella (kuten AsetteluTesti) ja
  kuva 0,5 s uudelleenpiirron jälkeen. Editor-skriptit eivät käänny tarkista.sh:ssa → ensimmäinen Unity-ajo on ensimmäinen käännös.
- SEURAAVAKSI: JU antaa NYT (~00.38 jälkeen, tai kun L1 vapaa) → taustalle:
  `/Users/Shared/Claude/wt/proto-pelikoodari-esikatselu/tyokalut/esikatselu.sh pelikoodari/esikatselu /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/sk-esikatselu-galleria.txt`
  → ilmoita JU:lle LUKKO VAPAA → katso g-nyt/g-yhtenainen täysikokoisena → vertaa simun kuviin
  (lokit/todistus-galleria-arkki4b-200g-20261018-0015/kuvat/g-*.png) → arvio ≤ 3 riviä PT:lle (aika, ero simuun, käyttökelpoisuus).
  Rajoitus pysyy: puhelinkäännöksen varjostinkarsinta (juoksupelin URP/Unlit) ei näy editorissa.

## 3) JUOKSUPELI
- Harmaa versio 99a83b3d9 VALMIS ja ajettu (JU 23.53, lokit/todistus-juoksupeli-ruudukko-20261017-2353: ruudukko, 6 käännöstä, kompastus,
  katto, kiinni 43 s, 909 p, Exception 0) → PT:lle 00.0x, vaihe 3 (omistaja pelaa) PT:n kautta.
- OMISTAJAN PÄÄTÖS 18.10. 00.10: "älä käytä näitä enää koskaan: Kehittäjä › Kokeet › Juoksupeli / siirrä kaikki aina keskeneräisten alle
  joko linsseihin tai peleihin" → **78cd48f9d** (haara pelikoodari/juoksupeli-pelit-201, worktree wt/proto-pelikoodari-juoksupeli-pelit,
  71820d9a4:n päällä): rivi ☰ › Pelit › Keskeneräiset (Olavinlinnan perään), pois Linssivalitsin.Kokeiluista; tarkista.sh 0. SHA NS:lle
  ja PT:lle 00.12 junaan 201. AVOIN: sama muutos pelikoodari/juoksupeli-haaraan (99a83b3d9) seuraavan juoksupelityön alussa (cherry-pick
  78cd48f9d), ettei rivi palaa kokeiluihin.

## Valmiit tässä sessiossa
- Juoksupelin harmaa video tarkistettu → PT. Galleria 4c (f23550247) ajettu ja tarkistettu → LR. Juoksupeli Pelit › Keskeneräiset (78cd48f9d).
- Esikatselu ajo 1 + arvio, korjaus ac414396f. Pallon varjo 294d24f62.

## Worktreet
wt/proto-pelikoodari-galleria (arkki 5), -esikatselu (korjaus), -juoksupeli-pelit (juna 201), -juoksupeli (harmaa versio), -cupola-suoja
(junassa 200 → poistettavissa mergen varmistuttua), -tivoli-vapaa-lento-200 + wt/pelikoodari-vapaa-lento-osio (Tivoli tauolla), wt/pelikoodari-posti.
Esikatselun Unity-kopio /Users/Shared/Claude/proto-3d/Matkakirja-proto-esikatselu (pidetään; seuraavat ajot nopeita).
