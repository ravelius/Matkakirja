# Valosepän luovutus 6.11.2026 klo 10.03

Korvaa luovutuksen -0950 kohdat TILA, ODOTTAA ja SEURAAVAKSI 1–2. Sen SYY, KORJAUS ja RISKIT pätevät, ja PT:n sanatarkka käsky on siellä. -0918 ja -0903 pätevät kuten -0950 sanoo. Syy: konteksti 28 %, pehmeä raja (Raamattu 7.37).
Luin aloituksessa periaatteet, kohdat 7.4, 7.23–7.25, 9.1–9.3, 9.5 ja 12.9 (pisimmät katkaistuina), luvun 6 alut ja luvun 12 alut. Lukulistan luku 2 (linssit) jäi lukematta. Lue lukulista 7.47 itse.

## RÄYSTÄSLIUKU: TILA
Koodi 9b9ff0036 (natiivi-backup `linssiseppa2/raystas-pehmea`), ajettu raystas2:lla, Unity b7, 0 virhettä. Sha EI vielä PT:lle eikä LAV:lle, koska lohko on auki (9.5). PT tietää vain, että sha tulee kuvien jälkeen.
Kuvat `proto-3d/_tyo/linssiseppa2/raystas/kuvat2`, kaikki 8 katsottu. On/pois-suhde `raystas/suhde2/` (skripti scratchpadissa, ei jää: Gaussian 3 px, L-kanava, on/pois, (s−0,5)·255). Täysikokoiset parit `raystas/rajaukset2/`.
TODENNETTU kuvilla:
- PT:n kova suorakaide on poissa kohdista r-k--151, r-k--188p5, r--155.
- Alusvarjo jää: r--155 rivi 600 suhde 0,90, häviää rivillä 1200.
- VIKA r--155: pehmeä tumma lohko x 240–540 (täysikoko, rivit 590–820), 0,75, naapurit noin 0,9. Oikea reuna 30–40 px. Sininen palkki tummuu samalla kohdalla.
- VIKA r--155: ohut vaalea pystyviiva x≈236, rivit 590–825. Pois-kuvassa viiva vain friisissä. Syytä ei tutkittu.
- r-k--151: pehmeä laikku friisin yläpuolella, vasen reuna x≈935 (täysikoko) seinän saumassa (jossa friisikin porrastuu). Kohtalainen, ei kova. Sauma itse näkyy myös pois-kuvassa.
- r-k--188p5: suhteessa pehmeä pystyreuna (1376 px:n kuvassa x≈610), mutta täysikokoisessa parissa en nähnyt sitä pilarina.
- Lisäkamerat etelä ja pohjoinen: osuivat ulos, ei kovaa reunaa, mutta niistä ei ole pois-paria. Korkean hallin ylintä osaa (riski -0950:ssä) en mitannut.
PÄÄTELTY, EI TODENNETTU: lohko johtuu samasta portaasta, koska 0,45 m:n näyte on räystään reunan kohdalla.

## ODOTTAA
1. JU: raystas3, pyydetty 10.0x: `raystas/aja-raystas3.zsh <linja> 9b9ff0036`, sama koodi, 6 kuvaa, tulos `raystas/kuvat3`. JU ilmoittaa Valosepälle. Kuvat `*-u25` (näyte 0,25 m) ja `*-u70` (0,7 m) kolmella kameralla; vertailu kuvat2:n `-on` (0,45) ja `-pois`.
2. KS: Concorde bed1239dd on Y:ssä d8fd1d88f, kääntämättä. Seuraavassa yhteisessä ajossa co-yla ja co-ob, KS ilmoittaa kansion.
3. KK: kyltin Tuileries-pää (viesti 09.5x, jonossa kun lähetin). Ei koodia ilman sanaa.

## SEURAAVAKSI
1. Kuvat3: tee sama on/pois-suhde ja täysikokoiset parit. Ratkaisee: häviääkö lohko, jääkö alusvarjo. Riski 0,25:lle: bilineaarinen näyte voi poimia sisäkaton tai seinän oman katon, jolloin varjo tulee muuallekin ("seinän ulkopuolelta, ei sisäkattoja", `JuoksuValo.hlsl` rivit 80–81). Riski 0,7:lle: lyhyt räystäs jää pois (uloke 0,1–0,8).
   - Jos toinen arvo kelpaa: oletus `ValoKohteet.cs` rivi 306 (JuoksuRaystasLiukuUlos), uusi sha, ajo oletuksella.
   - Jos kumpikaan ei: useampi näyte ulospäin (kallis) tai leveämpi sekoitus seinän suunnassa; pikselikustannus yhä mittaamatta. Oma ratkaisusi.
   Sen jälkeen sha ja kuvien polku PT:lle ja LAV:lle. Muista pystyviiva. Ei junaan, ei iPadia.
2. Concorde, kun KS ilmoittaa: vesi co-yla mediaani vs Seine (mittaus altaan sisältä, säde 6–9 px, keskipisteet täysikoossa (1414, 951) ja (1337, 1111); Seine 170,166,134). Viat KK:lle ja PT:lle.
3. Sillat ja Pompidou -0903:n kohtien 2 ja 3 mukaan (KK:n järjestys sillat ennen Pompidouta).

## CONCORDE: TULOS
Ajo 251af3c48 (KS, b7) katsottu. Kaikki: `_tyo/linssiseppa2/ohjelmakohteet/TULOS-yhteinen-6-251af3c48.md` (LUE), rajaukset `rajaukset-yhteinen-6/`. Kyltti, obeliski, pylväät ok KK:n sanoihin. Vesi oli vika (162,173,115 vs 170,166,134); uusi väri laskettu tästä, koodi `ohjelmakohteet` c0dba45aa, nimihaara bed1239dd. EI AJETTU.
Muisti PT:llä: verkko 3624 kt, varjo 42 kt, 14 722 kolmiota, 4,9–5,1 ms. Laskelmani 1,26 Mt oli liian pieni, ero selvittämättä, laite mittaamatta.
`co-ob`:n kamera ei tullut lähemmäs: sama mittakaava kuin co-45. Lähikuvia ei ole.

## MUUTA
Linjat: k17 on `raystas-pehmea` ja vapaa. k30 on `ohjelmakohteet`; `ohjelmakohteet` ei mene k17:ään (git kieltää), nimihaara ei ole kummassakaan.
Vienti: `python3` ilman -I (numpy käyttäjän paketeissa), glb `/Volumes/T7 4TB/koodaus/proto-arkisto/_valmiit/concorde-v2/tekoaly-v2-tekseli/portti/co_atlas_lod1.glb`. Skriptissä `set -o pipefail`, muuten kaatuminen ei pysäytä ketjua (kävi kerran, ei haittaa).
Yhdistä b8-runko (`julkaisija/runko-219-muisti` addae63f2, NS 09.5x), kun jatkat koodia. Kaikki tähänastiset räystäs- ja Concorde-kuvat ovat b7:ää: älä vertaa b8-kuviin ilman merkintää.
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin rivit eivät ole Valosepän.
