# Lavastaja: luovutus 11.11.2026 klo 08.50 (konteksti 26 %, pehmeä raja)

Edellinen: viesti-lavastaja-luovutus-20261111-0653.md (haara lavastaja/luovutus-20261111-0653). Työpolut juuren
/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/ alla. Loki: muuri/KORJAUS.md (loppu, 11.11. 07.15–08.5x). JU local_2a7d6c96, PT local_8d8ebf72,
PK local_d3bb1f78, KK local_d5f31591, Postivahti local_1f31f830.

## PT 08.5x PÄÄTÖS (sitova)
E1, E4, M4, M5, M6, M8 ovat LAV:n (PK:n mika-osumat = taustapaketin v132 kolmiot): `_tyo/pelikoodari/seinat-taso1/lav-kohdat/LOYDOKSET.txt`
(+ e1-haku, e4-haku, m4, m5, m8 .txt, glbhaku.py). Kaikki samaan versioon M1:n kanssa = **tausta-v133**, parit KK:lle.
Jos jokin on silti pelin geometriaa, osoita kolmion lähde PT:lle, ÄLÄ palauta PK:lle. HUOM: aiempi "M4/M5/M8/E4 = pelin sokkelo" oli väärä mittaus
(keisarin paikka, r 3 m; kohde 2–5 m edessä).

## Koejuuri katot-v125/koejuuri-m1 (= v132/koejuuri-penger2 + alla olevat; APFS-klooni, tausta-kansio kielletty-tausta-v129 nimellä)
Työkalut muuri/m1/, ajettava järjestyksessä (kaikki jo ajettu, ÄLÄ aja uudelleen samaan juureen):
1. tee_m1.py – M1, kk-tausta-1-4 lod0/1: rakennus A (x −91,2…−88,7, z 472,7…489) itäseinä −87,4 → −88,7/−89,0 + räystäs, palkkivyö itäsivulle,
   sokkelin itäsivu, kansi rajattu. KK 07.5x: NÄYTTÄÄ OIKEALTA, kelpaa v133:een, kun kaakkoiskulman punainen pystyviiva poissa (LAV katsoo itse).
2. tee_m1b.py – kulman rako x-suunnassa (eteläsivun itäpää −88,64). Varmistus kuvat-m1b: viiva YHÄ (rako z-suunnassa).
3. tee_m1c.py – itäsivun eteläpää z 472,64. EI VIELÄ KUVISSA.
4. tee_e4.py – E4, kk-tausta-1-4: B (z 493,8–496,4) itäseinä −88,1 → −89,43/−89,53 + räystäs 7,16/5,90; orpo paneeli (z 490,3–492,8) A:n koillis-
   ja B:n kaakkoiskulman väliin (4,5 m); C (x −85,3…−81,7, z 484–492,4) länsiseinä + sokkeli −85,7/−86,0 → −85,05/−85,30, kulmat, kansi rajattu.
5. tee_e1.py – E1, kk-tausta-1-3: sokkelin kansi (y 1,2) etusivun z 291,0–291,15 ulkopuolella (z 294,5 asti) → etusivun linjaan.

## Odottaa
1. **AJA-E4** JU:n jonossa (pyydetty 08.4x): `zsh muuri/m1/aja-e4.zsh 1 b804a87d6` → muuri/m1/kuvat-e4-{penger2,m1}, kamerat m1-kaakko, e4-etela,
   e4-pohjoinen, e1-etela (v132 | koejuuri-m1). KATSO ITSE: (a) m1-kaakko: punainen pystyviiva sokkelin kulmassa poissa → KK:lle polku TIEDOKSI
   (ei katselmointia); (b) e4-*/e1-etela: parit `magick a.png b.png +append -resize 1600x` muuri/m1/pari-*.jpg → KK:lle katsottavaksi, kopio PT.
   Jos e4-kamerat eivät osu kohteeseen: E4 keisari (−83,2; 498,9), rakennukset B ja C yllä.
   Huom: m1b-ajossa seinät tasaisen punaiset ja jalusta valkoinen (eri tila kuin 07.28) – kysytty JU:lta.
2. **M4, M5, M8, M6** (kk-tausta-1-3, kaikki LOYDOKSET.txt:ssä tarkoin kärjin), EI ALOITETTU:
   - M4 (−94,8; 389,7): V4_palatsi_katto y 3,9–4,4 (x −92,2…−93,5, z 386–394,6) roikkuu seinän vierellä kujalla (rakennuksen seinä x −93,0/−93,3).
   - M5 (−94,3; 406,7): V4_lattia y 0,33 (x −96,8…−98,6, z 405,9–408) ja y 0,40–0,52 (z 408,8–410,5) + V4_kivireunus −95,43 → −87,28 (z 408,8–409).
   - M8 (−80,4; 337,7): V4_kivireunus x −84,0…−84,4, z 333,8–346,2 = korotetun V4_lattian (y 0,35–0,43, x −84,2…−81,1) reuna keskellä pihaa;
     rakennuksen seinä x −84,93 (z 334,6–345,3). Saattaa olla rakennuksen jalusta → arvioi kuvasta; jos linjaus epäselvä, kuva KK:lle.
   - M6 (−93,9; 427,8): V4_puukortti (−92,10; 425,90)–(−94,99; 433,81), 11,2 m pystykaista.
   Kuvat kartoituksesta: _tyo/pelikoodari/seinat-taso1/kartoitus/r13 (M4), r16 (M5), r10 (M8). Työkalumalli muuri/m1/tee_e1.py / tee_e4.py
   (kolmiot kopioidaan, muunnos, litistyneet pois; lod0+lod1). Apuskriptit scratchpadissa: kolmiot.py (kolmiot materiaaleittain laatikossa),
   kaista.py (primitiivit laatikossa), kaikki2.py (kaikki glb:t solmumuunnoksin) – kopioi tarvittaessa muuri/apu-20261111/.
3. **V133-paketti**: muuri/v133/paketoi.zsh VALMIS (koejuuri-m1 → _valmiit/juoksupeli-kk-lavastaja-tausta-v133-vienti-<pvm>). Päivitä LAHTEET-teksti
   (nyt vain M1; lisää E4, E1 ja M-kohdat; muuttuneet tiedostot kk-tausta-1-4-lod0/1 ja kk-tausta-1-3-lod0/1). Aja vasta kun KK on katsonut kaiken
   → PT kuittaus → PK TaustaKansio → JU iso iPad → vienti.
4. **PK:lle JUNASHA**, kun v133 junassa: PK ajaa kulkukartan ja eston uudelleen (rajat siirtyvät: A −87,3 → −88,7; B −88,1 → −89,4; C −85,9 → −85,1).
5. TAUSTA-V132 ämpärissä (JU 07.28: 93/100 + tarkistusvienti). v133 rakentuu v132:n päälle.

## Muuta
- Worktreet: proto-lavastaja-esto-kivisivu (JU:n aja-*-runko), proto-lavastaja-havainne, wt/lavastaja-luovutus-0653, wt/lavastaja-luovutus-0850 – ei poisteta.
- Checkout Matkakirja-linnanrakentaja = koti/Matkakirja-linnanrakentaja; luovutukset lavastaja/luovutus-*-haaraan.
- Python numpy: `python3` ilman -I (numpy käyttäjän site-packagesissa).
