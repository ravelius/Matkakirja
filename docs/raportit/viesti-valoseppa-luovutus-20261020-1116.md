# Valoseppä – luovutus 20.10.2026 klo 11.16 (Postivahdin KOVA RAJA 35 %)

Luovuttaja: Valoseppä (Opus, high). Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 (≤ 3 riviä),
KK local_8e4fcfed-fc40-464c-854a-1d031b005332 (kuvaparit, kopio PT), JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b,
NUI local_c6d63773-0270-4873-96f8-63c66cf52794, PK local_11aca9cd-eda6-4db9-9019-8a153c8b8795, LS local_7a457b99-7ecd-4634-93a0-0c02b53e8d24,
Lavastaja local_cd402541-241c-4e2a-99e7-70bd8daa1c35, Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2 (päiväkirja $D/JONO.md – lue loppu ensin). Proto-wt /Users/Shared/Claude/wt/proto-linssiseppa2-jalki
(haarat paikallisia; nyt checkoutattuna linssiseppa2/louvre-varjo-208). Simu vain JU:n SIMU NYT -viestillä, perään SIMU VAPAA.

## PT 11.1x: ENSIN-KOHDAT JA MIHIN ASTI EHDIN
1) Louvren simuajo (cea77010d + LS 26f7d9a4d; madonna, Horatius, Kythera = vaalea GG; iPad + iPhone; ennen/jälkeen) → LS tekee parit
   oikeisiin Louvren kuviin → KK. EHDIN: kaikki yhdistetty kärkeen 0cebcc31c (⊃ cea77010d + 26f7d9a4d + NUI yhd3), JU kääntää 208c-appiin,
   skenaario + aja.zsh valmiina. EI AJETTU (odottaa SIMU NYT). Ajon jälkeen kuvapolut LS:lle (hän tekee parit KK:lle) ja PT:lle; oma
   vertailu.py-kuva on lisätodiste.
2) kk-joki-208 tausta-v4:n päälle → sha PK:lle. EHDIN: VALMIS. e81d165c9 PK:lle, PK mergesi → palatsi-208 c3a971b4e (tausta-v4), JU kääntää,
   PK ajaa 208v11. Jäljellä: 208v11-kuvien tarkistus + siivous 98d52a4ca seuraavaan PK-mergeen.

## 0. ENSIN: LOUVREN VALO -SIMU (omistaja 11.04: "Pehmeä kohdevalo", ei kattoikkunavaloa; PT: SIMUUN NYT)
Tavoite (PT 11.0x): kohdevalo jää, reuna pitkä pehmeä liuku ilman näkyvää neliö- tai pyöreää rajaa; kehys heittää seinälle pehmeän
varjon alas (oikeissa kuvissa taulut riippuvat hieman kallellaan, kuvat 2 ja 5); tummat salit samoin (ei punaista läikkää otsikon kohdalla).
- HAARA linssiseppa2/louvre-varjo-208 **0cebcc31c** = ef8489157 (korostuslaatikko pois, ei seinäkiiltoa) + 4b85894f3 (pehmeä keilan reuna
  seinässä, `museo seinareuna 0|1`) + cea77010d (pehmeä kehysvarjo: sivupuolivarjo levenee alas 0,6 × etäisyys + kosketusvarjo −22 %/6 cm,
  `museo varjopehmea 0|1`) + 3d5ff723b (kattoikkunat vain sc/gg/se = MuseoPulu.Osat, omistajan valinta) + merge LS louvre-kehykset-208
  26f7d9a4d (kaarivarjo, kehykset v5, kyltit) + merge NUI museo-208-yhd3 06b18b022 (nimi ☰-rivillä valkoisena). unity-tarkistus 0. EI 88d06bb45:tä
  (kohdevalon hajaosan poisto hylätty: omistaja 10.36 kohdevaloja ei poisteta).
- KÄÄNNÖS: JU → /Users/Shared/Claude/proto-3d/_tyo/julkaisija/louvre-varjo-208c-app (208b-app = vanha e25b86f21, älä käytä). Simujono NUI → PK → minä.
- AJO (valmis): `zsh $D/louvre-varjo/aja.zsh 0cebcc31c` SIMU NYT:n jälkeen (APP oletuksena 208c-app). Skenaariot sk-louvre-varjo-{iphone,ipad}:
  madonna 777, Horatius 3692, Kythera 8525 (= vaalea Grande Galerie), S0 = varjopehmea 0 + seinareuna 0, S1 = molemmat 1 (seinatasainen 1
  kummassakin); iPadilla lopussa LS:n 27 kierroksen maalausta L-<id>.png (kehysten ΔE-mittaus). Parit $D/louvre-varjo/parit (parit.py "S") ja
  vertailu-{iphone,ipad}.jpg (oikea Commons-kuva | ennen | jälkeen; vertailu.py, oikeat kuvat /Users/Shared/Claude/Matkakirja-fable/scratchpad/
  keskustelukanava/louvre-oikeat-20261020/ 1, 2, 3, 5).
- SITTEN: katso parit täysikokoisina (kehyksen alavarjo näkyy ja liukuu? keilan reunassa ei viivaa? Horatiuksen otsikon kohdalla ei punaista
  läikkää? vertaa oikeisiin kuviin: niissä seinä lähes tasainen, kehyksen alla selvä kapea varjo) → vertailukuvat + parit PT:lle ja KK:lle
  (KK nollautui 11.04, sama id), kuvapolut LS:lle (L-kuvat ΔE:hen) → SIMU VAPAA JU:lle.
- JOS punainen läikkä jää Horatiuksen otsikon kohdalle: keila ylettyy seinälle taulun yläpuolelle; kokeile laajempaa liukua (MuseoValaistu.shader
  pehmeaReuna: ai 0,5 → 0,3, ao 1,6 → 2,0) tai pystyseinän keilan voimakkuuden vaimennusta. Kallellaan riippuminen (taulun yläreuna irti
  seinästä) olisi oma muutos MuseoRakennukseen (LS:n tiedosto) – sovi LS:n kanssa, jos PT pyytää.

## 1. KULTAISEN VEDEN JOKI (PT 11.0x päätös a: minun kk-joki korvaa PK:n joen Taihemenin edessä)
- linssiseppa2/kk-joki-208: f0cc25e15 (LuoJokiV2: joki 0 uomana, aukion lattia leikattu JuoksuLattia.shaderin jokimaskilla vain JUOKSU_JOKI-
  materiaaleissa, marmoriseinät + reunakivi 0,45 m tasossa 0, vesi −1,5; QA `valo joki 0|1`) → e81d165c9 (leikkausraja 1,5 m, tausta-v4:ssä
  joen kohdalla laatan kolmioita 0…1,38) → PK mergesi e81d165c9:n → palatsi-208 **c3a971b4e** (tausta-v4, esto v2 uudelleen leivottu), JU kääntää,
  PK ajaa 208v11 → kuvat minulle. TARKISTA: vesi näkyy, reunat, sillat yli, Puyi ei enää leiju (laatat tasossa 0), `valo joki 1` kertoo
  leikattavien lattiamateriaalien määrän (0 = laatat eivät osu jokeen → selvitä).
- Siivous valmiina 98d52a4ca (⊃ PK 4164b2653): PK:n LuoMaaV2-jokivesi (95ff9013b) pois (tausta-v4:ssä maan alla). Ei vielä PK:lla – tarjoa
  seuraavassa mergessä. Joet 1–8 tausta-v4:ssä osin maan alla (itäinen joki 2 maassa 1,5 m) – eivät kuulu tähän erään.
- Mittaustyökalut: $D/kk-joki/*.py (Blender -b --python; /Applications/Blender.app/Contents/MacOS/Blender).

## 2. MUUT HAARAT JA TILA (proto)
- louvre-valo-208 ef8489157 + 88d06bb45: PIDOSSA (88d06bb45 hylätty). NUI:n yhd3 on ilman niitä.
- Pinnat v2 1dfc80671 NS:llä pidossa palatsi v2:n kanssa (ei toimia). juoksu-208 f4f6a4317 junassa 208.
- Tulivuoret k13 ja pimennys L1 PIDOSSA; rakettivideo yöllä. Sillan heijastus (palatsin vaihe 4) → ehdota PT:lle kun vaihe 4 alkaa.
- Worktreet: proto-linssiseppa2-jalki (kaikki), -sumea206 (mergetty → poista), -juoksuvalo, -nostot, -tulivuoret, -pimennys, -rakettivideo, -mrivi.

## 3. OPIT
- Ennen omaa toteutusta: grep muiden haarat (PK teki joen vesipinnan samaan aikaan; PT ratkaisi päällekkäisyyden).
- clip() Lattia/Maailma-varjostimessa vain paikallisen avainsanan takana (Applen piiri menettää varhaisen syvyystestin; PK:n +20 ms opetus).
- Taustalaattojen korkeus: mittaa Blenderillä ennen kuin oletat tason 0 (tausta-v3 oli −1,4…−2,0 → pelikerros leijui 1,5 m).
- Omistajan valinta "ei kattoikkunavaloa" koski myös aiemmin lisäämiäni lasikattoja → tarkista omat aiemmat lisäykset päätöksiä vasten.
- JU kääntää uuden kärjen eri kansioon, jos vanha ehti käännökseen (208b vs 208c) → aja.zsh:n APP-polku tarkistettava.
