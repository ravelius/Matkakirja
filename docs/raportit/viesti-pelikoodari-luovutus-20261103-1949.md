# Pelikoodari: luovutus 3.11.2026 klo 19.49 – juna 218

Edellinen: -20261103-1906 (e0076a23e + 8fada1d6a), voimassa ellei alla toisin. Syy: kontekstiraja 26 % (7.37). Proto-haarat paikallisia
(repo /Users/Shared/Claude/proto-3d/Matkakirja-proto). Ei omia taustaketjuja (kaikki ajot JU:n linjoilla).

## Tehty 19.06–19.49
- PT:n kysymys nimestä vastattu (omistajan päätös 19.02 KK:n kortilla); PT kuittasi: 3c02f62fe isoon pakettiin.
- **LAHIPUUT-V16 KYTKETTY**: proto **pelikoodari/lahipuut-v16-218 2ca2f17b7** (ae49d44de:n päällä; wt /Users/Shared/Claude/wt/proto-pelikoodari-lahipuut16).
  LahipuutKansio "kielletty-lahipuut-v16/"; reittikerros.json luetaan ennen puita (JuoksuPalatsiVerkko.Reittikerros, puhdas:
  puut x/z 0,01 m, koristeet laji + x/y/z 0,001 m; puuttuva = ei poistoja); KaistaRungot-suoja ennallaan. LAV:n poistot osuvat pakettiin
  65/65 ja 52/52. Testit 815/815 (ReittikerrosPoistaaVainLuetellut), unity-tarkistus 0. JU vei v16:n 19.23 (mediassa 200). LAV ja PT tietävät.
  Pariajo 06+07 ennen (ae49d44de) / jälkeen (2ca2f17b7): /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lahipuut-v16/aja-parit.zsh,
  JU:n L2-jonossa (loki julkaisija-tyokalut/pk-lahipuut-v16-parit.log) → kuvat PT:lle ja LAV:lle.
- **PALVELIJAT v1 (JU L1 19.16, ae49d44de)**: arkihahmot 11/11 latautuivat, palvelijoita näkyvissä 1–4, säikähdyksiä 0 → kuvat tyhjiä
  hetkiä (_tyo/pelikoodari/palvelijat-218/v1/). Syy: palvelija uloimman kaistan ulkopuolella, botti ei juossut sen puoleisella reunakaistalla
  (sääntö ennallaan, PT 19.2x "kauempi kaista ohittaa"). HUOM: "säikähti"-lokirivi tulee vasta irrotuksessa (0,40 s).
- **QA `ui juoksupeli palvelijat saikahda [laji]`**: proto pelikoodari/arkihahmot-218 **7a4dd28c9** (JuoksuPalvelijat.Pakota: lähin
  säikähtämätön edessä ≤ 25 m; JuoksuV4Saanto.PakotaSaikahdys; vastaus "säikähdytetty #n Laji"). Testit 814/814 (PakotusLahinEdessa).
  Ajorunko **pelikoodari/palvelijat-kuva-218 8f87966d2** = ae49d44de + 7a4dd28c9 (wt /Users/Shared/Claude/wt/proto-pelikoodari-palvelijat-kuva).
  **PALVELIJAT v2** _tyo/pelikoodari/palvelijat-218/aja-v2.zsh (sk-palvelijat-v2.txt: Palvelijatar 70 s, Lakaisija 45, Ruokaeunukki 30,
  Vedenkantaja 30; kuvat <laji>-<cs>.png) JU:n L2-jonossa lahipuut-parien ja VS k5:n jälkeen (loki julkaisija-tyokalut/pk-palvelijat-v2.log).
- am-ketju (sali-218am, horisontti-218am 1ab6dfa38) valmis 19.47: taso1b 20261103-191818-taso1b-v3.mp4 (96,6 s), mp 20261103-193118-mp-v3.mp4
  (138,6 s). "VIKA kuvia ei syntynyt" = tallenneskenaario ilman kuva-rivejä (normaali).

## SEURAAVA
0. **PALVELIJAT v2 → PELIKUVAPARI PT:lle** (JU ilmoittaa): tarkista huom-*.txt ("säikähdytetty #n", "säikähti, tavara irti", palvelijat-tila
   "pudotuksia N"), katso kuvat (maljakko takaa, sirpaleet valkoiset, luuta lattialla, lätäkkö, kävelyn liukuminen videolta) → PT:lle
   ≤ 3 riviä + kuvapolku. Jos v2:ssa jokin laji puuttuu (ei edessä 25 m:ssä), pidennä vaihetta tai siemen.
1. **LAHIPUUT-V16 PARIT 06+07** (JU ilmoittaa) → kuvapari PT:lle ja LAV:lle (local_f12c9179). Ennen/jälkeen samasta rajauksesta.
2. **TASO1B KOHTA (2) – DIAGNOOSI VALMIS, KORJAUS ALOITTAMATTA** (218am taso1b t 11,22–12,5 s; video ~10,5–12 s): keisari tulee työhuoneen
   ovesta (123,2, −820,9) ja kääntyy etelään; tavoite (123,4, −817,6) työhuoneen massassa (huippu 3,9, ala 0,0) → polkukamera seuraa jälkeä
   takaisin oviaukkoon; Tukossa() ohittaa jälkipisteet (kameraPolku.Lahella), mutta jälkipiste on rasterissa massaa → vaatii 3,9/3,9/3,9 →
   kamera nousee 5,6 m:iin ja sivulle (vaiheloki esikatselu-20261103-191818/unity.log). Ehdotus: JuoksuV4Maailma.cs ~1876 polkuHaku-
   silmukassa hylkää jälkipiste, jos Hk(pp) − pohja.y > DroneNosto.MuuriRaja ja KatonAlapinta(pp) − pohja.y < PorttiMinAla (kiinteä massa
   ilman läpikulkua), ja salli silloin polkuSuora (ehto ~1892 `!kameraPolku.Piste(...)` → `|| jälki hylätty`) → kamera suoraan lähemmäs,
   ei nostoa. REGRESSIO: ys 218ad (varaston sivuovi, sali-218al/sk3-ys.txt) samaan JU-ajoon kuin taso1b (sali-218am/sk3-taso1b.txt).
   Pohja: horisontti-218am 1ab6dfa38 (wt proto-pelikoodari-ys-218); sisältyy ae49d44de:hen.
3. Kohta (3) raita 90 s (mika-rivit 8b9bdda4c, esikatselu-20261103-191818/unity.log) ja (c)(d) kuten luovutuksessa -1825.
4. Vedenkantajan WATER-POUR-CONTRACT (fill_right/left, idle/walk_after_fill, vesiastia-pronssi 1,1 m edessä) vasta PT:n pelikuvaparikuittauksen
   jälkeen (vaatii suunnittelua: missä astia, milloin kaato).
5. Yhdistys: arkihahmot-218 (7a4dd28c9) ja lahipuut-v16-218 (2ca2f17b7) → junaan vasta PT:n kuittauksen jälkeen.
6. Edellisen luovutuksen kohta 3 (keisarin nosto: YKSI rivi KK:lle, kun JU:n iso-ajo näyttää noston iPadilla) ennallaan.
7. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/Matkakirja-pelikoodari (tämä tiedosto sen kärjessä).
