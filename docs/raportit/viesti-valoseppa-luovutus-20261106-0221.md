# Valosepän luovutus 6.11.2026 klo 02.21

Korvaa luovutuksen -0157 kohdat TILA, SEURAAVA AJO ja SEURAAVAKSI. Muut -0157:n luvut pätevät (KK 01.5x, Pont Royal ja jäännökset, Pont Neufin sahalaita, AUKI AAMULLA), samoin -0135:n SUOJATARKISTUS ja AJO sk-maa sekä -0115 (maa, helma, varjo, mittarit). Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## TILA
Koodi 9a1d041a5, haara `linssiseppa2/ohjelmakohteet`, natiivi-backupissa, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan. Testit 15/15 (`<dotnet> rak/G.dll OhjelmaKohde`). d48b1b220 (sillat) ja 9a1d041a5 (Saint-Eustache) EI käännetty Unityssä eikä ajettu.
D = /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet.

## AJO: PYYDETTY JU:LTA 02.20, EI VIELÄ VUOROA
Ajohaara `linssiseppa2/ajo-maa2` 0d317ab6f (paikallinen, ei viedä). Lista `D/sk-maa2.txt`, 9 kuvaa: p-roy, p-lp, p-cha, p-con, se-et, se-ka, se-la, tsj-lahi-pohj, tsj-lahi-et. Kun kuvat tulevat: katso täysikoossa, viat nimettyinä KK:lle, rivi PT:lle. `suunta`-arvot se-kuvissa ovat päätelty Tour Saint-Jacquesin kuvanimistä; tarkista, että kuva näyttää sen, mitä nimi väittää. `lahinleveys 5` -varaukset: -0157.
Tarkista KK:n id tilin mukaan: CLAUDE.md ja osoitekirja antavat eri id:n; tämä sessio on tilillä sami.reivinen@vvi.fi.

## TEHTY: SAINT-EUSTACHE
Lähteet: OSM way 53762963 ja Lenoirin mittapiirustukset noin 1850 (Paris Musées, Commons, CC0): `D/a/viite/Saint-Eustache-plan, -midi, -ouest, -coupe-poikki, -coupe-pitka`. Valokuvat -0, -1, -2, -7 katsottu (vertailuun, CC0 ja CC BY-SA); -3 on patsaan yksityiskohta, -4 katsomatta.
MITATTU
- Pohjapiirros asettuu OSM:n päälle omalla mittakaavapalkillaan 41,47 px/m, akseli −7,9°: seinät ja poikkilaivan pään kohoumat täsmäävät silmämääräisesti kuvassa (uudelleen: `python3 D/a/se-sovita.py -7.9 41.47 1610 2422`, tulos kirjoitetaan skriptissä mainittuun kansioon, vaihda polku). OSM:n jalanjäljen koillis- ja kaakkoiskulmat ovat kortteliosia; koillisosaa ei mallinnettu.
- Korkeudet lattiasta: holvi 33,46 (fr.wp; leikkaus 33,8), räystäs 36,3, harja 48, lyhdyn piikki 64,6. Piirustusten palkit: midi 15,16, ouest 16,25, poikki 15,3, pitkä noin 16 näyttö-px/m. Etelän maa on piirustuksessa vain noin 0,8 m lattian alla.
- Verkko 10 239 kolmiota. MaaH 42,9 (mediaani 85,7, z12). Pinta jalanjäljellä 75,2–90,5 (kartan pintayksikkö, kuten `maa/kohteet.py`): malli voi jäädä pinnan alle 4,8 ja yli 10,5, helma 30 m peittää. Ei nähty pelissä.
PÄÄTELTY, EI MITATTU
- Pohjoisen poikkilaivan pääty on etelän mallin kopio (pohjoissivun piirustusta ei katsottu). Kulmatornit etelässä −34,2, OSM −33,4 eli noin 0,9 m yli.
- Kellotornin paikka (49,1; −14,4) portaasta piirroksessa ja kuvista -1, -2. Kaakkoiskulman sali vuoden 1850 pohjasta: nykytilaa ei tarkistettu kuin kuvista.
- Pienet ruskeat kattolipat kuvista -0, -1, -2, väri silmämääräinen. Etelätornin tynkä tasainen laatikko 30,5 m:iin.
EI MALLISSA: sakasti ja charniers-käytävä, kattoikkunat, etelän sokkeli (y = 0 on lattia), patsaat, rakennuksen viereiset talot.
Offline-kuvat `D/a/oma/se/saint-eustache-k45.png` ja `-k12.png`: katsottu, ääriviiva muistuttaa kuvaa -7 ja midi-piirustusta. Tämä ei ole hyväksyntä, päätös pelikuvista.
Suoja (11.8): kirkko 1532–1633 fr.wp:stä; länsijulkisivun 1700-luku muistista, tarkistamatta, mutta 70 v täynnä joka tapauksessa. Nykyteoksia ei mallinnettu.

## SEURAAVAKSI
1. Ajon kuvat (ylempi luku).
2. Saint-Sulpice (way 16077204, 122×57; porttikäytävä 32 m leveä), vuodet 1646–1870 tarkistettu. Hae ensin mittapiirustukset Commonsista hakusanoilla "Saint-Sulpice plan coupe façade", malli `D/a/se-piirrokset.py`, tarkista lisenssi; sovita `D/a/se-sovita.py`:llä. Piirustukset ratkaisivat Saint-Eustachessa enemmän kuin valokuvat. Tarkista mittakaava palkista täysikoossa, älä näyttökuvasta: arvioni 14,2 ja 14,8 px/m olivat väärin ja näyttivät ristiriidalta piirustusten välillä.
3. Rakentaminen: lisää kohde `maa/kohteet.py`:n listaan, aja `aja-geometria.sh` ensin, sitten `python3 kohteet.py` kansiossa maa/ (ilman -I). Malli: Se-apurit OhjelmaKohdeRakennukset.cs:ssä.

## MUUTA
ÄLÄ aja `a/tee-sillat-cs.py`:tä. Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin rivit eivät ole Valosepän.
