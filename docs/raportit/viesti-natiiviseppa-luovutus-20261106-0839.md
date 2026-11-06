# Natiivisepän luovutus 6.11.2026 klo 08.39 (konteksti 25 %, pehmeä raja, 7.37)

Korvaa -0816:n. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Luo ensin cron "4 9 * * *" uudelleen (Raamattu 7.41; proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py): edellisen session ajastus kuoli sen mukana.

## SEURAAVA TYÖ
Odota KS:n kansiota lokit/karttaseppa-yhteinen-4-* (sk-pariisi-yhteinen-4, kärki 0b4d74011, JU:lla, ei vielä alkanut 08.38). KS antaa kansion katsottuaan kuvat. Ei omaa ajoa, ei junaan, ei iPadia. Kun se tulee:
1. sc-80: läikkä täysikoossa x 1485–1685, y 1840–1955, vertaa samaan kohtaan ajossa 127346f24. Read pienentää yli 2000 px:n kuvat: rajaa ensin. Tarkista myös, näkyykö seinä oikealla värillä ja näkyykö rinteiden lisäyksestä sivuvaikutuksia.
2. sc-45: painuvatko tai leijuvatko talot (kaava ei muuttunut, odotus: ei muutosta).
3. Parit etela-koe|etela-nyt ja po-la-koe|po-la: talot rannassa asti, saari ilman taloja, seinäaukot, leijuminen. ts-talot ja hdv-talot: ei laatikkoa Tour Saint-Jacquesin eikä Hôtel de Villen mallissa.
4. Tulos KK:lle viat nimettyinä, sc-80:n kuva mukaan; KK kertoo seinäaukot omistajalle kuvan kanssa. Kopio PT:lle ≤ 3 riviä. KS: KK 08.2x: tasainen oletukseksi vasta, kun v4:n seinät on nähty.

## KK:n vastaus odottaa (lähetetty 08.3x, oli jonossa KK:n nollauksen takia)
A. Poistetaanko 134 laivaa (building=boat/houseboat) talokerroksesta? Suositus: kyllä. KS:n laatikko Pont Neufin länsipuolella = palokunnan laiva way/233604300; Pont des Artsin luona La Balle au Bond ja Calife.
B. Korjataanko katot? 15 319 talossa (12 %) katosta puuttuu kolmioinnissa yli 2 %, yhteensä 2,06 km² (renkaat 24,3 km²); 261 talossa ≥ 1 000 m² (Cité des Sciences, Gare de Lyon). Laskettu selvitys-yhteinen/katto-kattavuus.py, ei katsottu kuvista. Laskurin korjaus kolmioinnissa ei auttanut (→ 14 938). Syy varmistamatta, todennäköisesti sisäänvedetty kattorengas. Ehdotus: vajaassa tasakatto alkuperäisestä ääriviivasta. Koodaamatta.
Jos KK sanoo kyllä kumpaan tahansa: yhdessä uuteen kansioon palat-v5 (ja -nd-ranta), kerro KS:lle. Jos ajo 4 on jo alkanut, v4-kansioita ei vaihdeta. Ilman sanaa ei tehdä mitään.
Tarkista ensin viestit: uudelta KK:lta voi tulla sana suoraan tähän sessioon.

## palat-v4 (KK 08.23: seinäkorjaus ja kertyneet muutokset, ND-ranta rinnakkain, ei omaa ajoa)
- Kansiot `_tyo/natiiviseppa/pariisi-talot/palat-v4` ja `palat-v4-nd-ranta`, tehty 08.3x, 0 virhettä (tarkista-palat.py). v3-kansiot ennallaan. tee-palat.py sha eb0d32671dfcb527; edellinen kopiona tee-palat-v3-nd-ranta.py.kopio. Ajo: tee-palat-v4.zsh.
- Kolme korjausta: `ala_y = max(pohja, min(nh, pohja + hn))`; nh palan omassa korkeustasossa (`+ KERROIN × (palamaa_j − palamaa)`); `ds = 0` vain jos `min(nh, pohja + hn) ≥ ylin − 2`. Kaksi viimeistä eivät olleet alkuperäisessä ehdotuksessa; KK:lle kerrottu. Kertyneet: Tour Saint-Jacques OHJELMA-listassa jo ennen. Valosepän mallit e46ad3592:ssa kaikki listalla tai ilman taloa.
- Kasvu v3→v4: kolmiot 6 559 134 → 6 618 723 (+59 589, +0,9 %), 360,9 → 364,4 Mt (+3,5 Mt, +1,0 %), Marais 2,8 km 121 → 123 Mt. Rantaversio 367,3 Mt. Muistia ei mitattu.
- Aukot laskennallisesti (seina-korjaus-mitta.py; ajettu ennen nh:n ja ds:n muutoksia): tasatulla kartalla ≥ 1 m v3 17 632 taloa → 0; tasaamattomalla palarajan yli 1 303 → 415 ennen nh-korjausta, nh-korjauksella kaavan mukaan 0 (ei mitattu erikseen).
- Malli (sc80-laikka-v4.py, sovitettu kamera, ei peli): läikän 23 000 px:stä tyhjiä v3 11 452, v4 0. Rajaus ajo-382618036/sc80-malli-palat-v*.png.
- Ei tarkistettu: sivuvaikutukset rinteiden lisäyksestä; 203 palassa katto tai rinne muuttui. Pohjan korkeuskaava ennallaan.

## ND:n rantakoe (omistaja 08.13 "Kokeillaan")
Ajo 382618036, vain m4: talot rantaan asti, saari tyhjä, ei aukkoja rajauksessa (lokit/karttaseppa-yhteinen-3-382618036/nd-raja-koe.png, rajaus selvitys-yhteinen/ajo-382618036/laituri-*.png). Tulos KK:lla. KS: pohja-ranta.png samalla maskilla (W 8912e05fa); älä muuta maskia ilman ilmoitusta, koska pohja tehdään silloin uudelleen. Lisäys v3:een +1 124 taloa, +2,9 Mt.

## Muu tila
Omistajan päätökset (-0816:n kohta) pätevät: suojatut talot laatikoina; talojen raja rantakokeena; tasainen vasta v4:n seinien jälkeen. Koodi 7333833fe. Liiku 99748962f odottaa KK:n sanaa. Kyltit usvassa ilman rakennusta; ODbL ennen julkaisua; suorituskyky isossa iPadissa; Ateenan ja Tukholman viat odottavat Pariisia. Valoseppä tekee Concorden aukiota OhjelmaKohteet-listaan (-0824): jos sen alalla on OSM-taloja, ne pitää lisätä OHJELMA-listaan; tarkistamatta.

## Viestit ja työtapa
Varakanava `mcp__ccd_session_mgmt__send_message` toimii. KK local_231e4bad, PT local_cf5b4eca, KS local_ddd980b0, NUI local_a3754ed8, JU local_b4a7e82a, Postivahti local_d8d003f6. Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-marais. Palatiedostot python3.14:llä ilman -I:tä. `tee-palat.py <D> <uusi kansio> [korvaus.json]`, aina uuteen kansioon.
