# Pelikoodari: luovutus 11.11.2026 klo 22.26 (konteksti 26 %, Raamattu 7.37)

Edellinen: viesti-pelikoodari-luovutus-20261111-2205.md + LISÄYS 22.1x (047e1411f). TÄMÄ KORVAA NE KOKONAAN.

## 1. v133c 漱芳斋-ovi: tehty ja PT:lle 14.0x. Jäljellä vain PT:n pt-ok → MR (PT pyytää). ÄLÄ toista.
Selvitys: proto-3d/_tyo/pelikoodari/kulkukartta/v133c/ovipari-aukio/TULOS.md (commit 904715425, haara pelikoodari/tausta-v133, proto paikallinen).

## 2. KAMERALAITE PALA 2: haara kameralaite/pala-2 @ 2ec17d3fb, wt /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite (proto paikallinen, ei pushia)
Tehtävänanto + KAIKKI KK:n päätökset (viimeiset osiot 22.04, 22.14, 22.22):
/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-kameralaite-pala2-tehtavananto.md
TEHTY tällä vuorolla (kaikki KK:n hyväksymiä tai ehdon täyttäviä):
- af3df02bf C: katseen ennakon vaakasuunta säännön kulkusuunnasta (Askel(paikka, kulku, fov), suunta kärkiin ux/uz, puolikolmiopaino),
  nousu jäljestä; sovitin + peli (SaannonJalat out kulku → KameraAskel); testirata kaarena kuten pelissä (KK: "se on totuus").
- fd4e37ccf PELI.Ennakko 1 → 0,5; SeurantaAsetus.LaiteViiveS = (1 − e)·2·PaikkaS, D_tav = max(D_min, juoksu − (2τ_v + LaiteViiveS)·6) + 2τ_v v̂;
  T14 mittaus (MITTAUS=1).
- 2ec17d3fb τ_v 0,25 (KK valitsi); LaiteKatseViiveS = (1 − e)·2·KatseS lisätty katseeseen suunnalla u (ii) = tämän askeleen säännön suunta
  (KatseViiveSaannosta = true; (i) antoi VV 23,7°); KatseNopeus = v̂ × säännön suunta suodattamatta (nousu jäljestä); T7 hystereesi 0,2°;
  palan 1 T04b/T10/T11/T12 lain mukaan e = 1 ja 0,5.
TESTIT: SeurantaohjaajaTestit 16/16 (T5 17,9 / VO 18,9 / VV 19,0°, raja 21,9; seinästä ≥ 1,09 m; T7 ylitys −0,49°, 1 vaihto, rulla 1,48°),
  KameralaiteTestit 14/14, Unity 0 virhettä. Ajo: cd wt/proto-pelikoodari-kameralaite/Linssit-testit && ./kaanna.sh Seurantaohjaaja (ja Kameralaite).
Mittaukset: proto-3d/_tyo/pelikoodari/kameralaite/{C-korjaus-mittaus.md, tauv-mittaus.md, u-mittaus-tuloste.txt}.
Viestit lähetetty: KK (tulokset, 22.2x), PT kopio (22.18), JU tilaus (22.2x).

## 3. ODOTTAA: JU:n Mac-tallenne (tilattu 22.2x, jonossa kartan ajojen jälkeen)
Tilaus: proto-3d/_tyo/pelikoodari/kameralaite/JU-tilaus-tallenne.md (60 s vanha + 60 s uusi, komennot `ui juoksupeli kamera vanha|uusi`,
10 s:n pätkät: käännös kujassa, äkkipysähdys seinään, kompastus, kaistanvaihdot, kaksi samansuuntaista käännöstä; lokin kamerarivit).
Kun JU antaa polut: tee mittaritaulukko vanha vs uusi (v, a, j, ω, rulla huiput; massassa ja piilossa -ruudut; uusi: rakenteen sisällä 0,
piilossa ≤ vanha) ja katso arkit itse. Valmis-viesti KK:lle (sha, testit, tallenteiden polut, mittaritaulukko), PT kopiona ≤ 3 riviä.
KK arvioi VV:n ja T7:n rullan tallenteesta. Ei junaan ennen KK:n sanaa; junaan kytkin pois päältä (UusiKamera oletus false).
Jos JU kysyy käännöstapaa: repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, haara kameralaite/pala-2 (paikallinen ref).
EI tässä palassa: pelin kaaren vauhtipiikki (~8 m/s, 0,57 m kulman yli): KK kirjaa pelaajan liikkeen palaan.

## 4. JONOSSA
- Kohdekartta: kuvahaut ilman kattoa (NS: Esilataajan Nakyva ohittaa katon; KohdekarttaNakyma.cs:237 ja NostotKartalla.cs:2991 Kuvat.Hae)
  — ensin toisto Macilla rajoitetulla nopeudella, sitten ehdotus KK:lle ennen koodia. Tiedot proto-3d/_tyo/natiiviseppa/latausjono/vastaus-ii.md.
- LAV:n aja-a2.zsh (JU) → vertaa m1-varmistus-kuviin. B1 (bcf32314c) junaan vain PT:n päätöksellä.

Huom: tyokalut/tarkista.sh päivittää tyylikirjan (Tyylikirja.uss/.cs, tyylikirja.json) → palauta git checkoutilla, älä committaa.
Ei agentteja käynnissä. Ei uusia lupia.

## LISÄYS 22.3x: JU kuittasi tilauksen
Jonossa (pid 15137) kartan ajojen ja NS palkki-6 + mono-1 jälkeen. Skenaario proto-3d/_tyo/pelikoodari/kameralaite/sk-kameralaite-pala2.txt
(botti, v4 siemen 1, 1376 px, 60 s vanha + 60 s uusi); JU leikkaa 10 s:n pätkät uudesta lokin kamerarivien mukaan.
Tulokset: /Users/Shared/Claude/proto-3d/lokit/pelikoodari-kameralaite-pala2-2ec17d3fb (JU lähettää polut, kun valmis).
