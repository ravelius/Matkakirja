# Valosepän luovutus 6.11.2026 klo 02.35

Korvaa luovutuksen -0221 kohdat TILA, AJO ja SEURAAVAKSI. Muut pätevät: -0221 TEHTY: SAINT-EUSTACHE, -0157 Pont Neuf ja AUKI AAMULLA, -0135 SUOJATARKISTUS, -0115 maa ja mittarit (paitsi helma, ks. alla). Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## TILA
Koodi 59ebb5d7d, haara `linssiseppa2/ohjelmakohteet`, natiivi-backupissa, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan. Testit 15/15 (`<dotnet> rak/G.dll OhjelmaKohde`). EI käännetty Unityssä eikä ajettu; OhjelmaKohteet.cs ei kuulu testikäännökseen.
D = /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet.

## AJO: EI OMAA AJOA
Sha ja `D/sk-maa3.txt` (6 kuvaa: p-roy, p-lp, p-con, se-et, se-la, pohj) annettu JU:lle 02.3x yhteiseen Pariisin ajoon. Uusi oma pyyntö palautetaan, ellei PT tai KK sitä erikseen pyydä. Älä muuta listaa ajon aikana. Kun JU ilmoittaa kansion: katso täysikoossa, viat nimettyinä KK:lle (`local_231e4bad`, osoitekirja; CLAUDE.md:n `local_d5f31591` antaa "session not found"), rivi PT:lle.
Ajo 0d317ab6f on KK:lla. PT hyväksyi sen jälkikäteen JU:n välittämänä. KK ei hyväksynyt sitä etukäteen; se on kerrottu.

## KK 02.5x: PÄÄTÖKSET AJOSTA 0d317ab6f
- SILLAT EIVÄT KELPAA. Kokemus: kivisilta, paksut matalat pilarit, kaari alkaa läheltä vettä; ei kansi jaloilla. Jos kannen ja veden väli on oikeaa suurempi, kaari korkenee, ei pilari. Pilarin paksuus oikeista silloista. Pää: katu nousee sillalle, ei umpilohko. Musta pystyviiva pois. Myös pohjoisesta: sillat näkyivät tummina sahalaitaseininä.
- SAINT-EUSTACHE: muoto hyvä, ei hyväksyntää ennen uutta kuvaa. Ovi ulottuu maahan, ei tyhjää laattaa. EI SUURENNETA (21.49); KK kertoo omistajalle, että näyttää pieneltä.
- TOUR SAINT-JACQUES kelpaa kokeena. Lähikuvia ei jatketa, ei suurenneta; KK kertoo tikkumaisuuden.
- Puut ja kyltit KK vie PT:lle: ei Valosepän työ.
- Seuraavaksi Saint-Sulpice.

## SYY JA KORJAUS (59ebb5d7d)
MITATTU KUVASTA (p-roy, p-con, 1,35 px/m, kallistus 45° eli pystymetri noin 0,95 px): pilarin näkyvä korkeus Royal 36 m, Concorde 33 m, geometria 3,6 m + helma 30 m.
LUETTU KOODISTA: `Resources/OhjelmaKohde.shader` tuo syvyyden 60 m kameraa lähemmäs, joten kartta ei peitä 30 m:n helmaa. Oma virhe: 2e9394de8 ja luovutus -0115 väittivät, että syvyystesti piilottaa sen. Offline-esikatselu ei näytä helmaa, siksi virhe ei näkynyt siinä.
- `HelmaM`, `HelmanKorkeus` poistettu; `TeeVerkko` käyttää y:tä suoraan. Koskee kaikkia ohjelmakohteita.
- `KiviKaari`: holvin alkuosan sivu SiltaKivi, ei SiltaTumma (musta viiva). Holvin alapinta on yhä tumma.
- Pilari: Pont Royal 5,5, Pont au Change 5, Saint-Michel 5. LÄHDE vain Louis-Philippe 4 m (fr.wp). Muut laskuja: Royal (134 − 109,88) / 4 eli 6, pyöristetty alas (Structurae, sen eri kieliversiot antavat pituudeksi 110 ja 134); Change (103 − 93) / 2; Saint-Michel (62 − 51,6) / 2 eli 5,2; voivat sisältää maatukia. Marie 4, Concorde 5, Archevêché 3,5: arvioita, lähdettä ei löytynyt. Perronetin 2,92 m:n pilari Concordessa on muistista, EI varmistettu, ei käytetty.
- Testi `SiltojenMaaJaMatalatPilarit`: ei kärkiä maan alla, kivisillan pilari ≥ kaaren alku.
Esikatselu (ei kartalla, ei todista lopputulosta): scratchpad-kansio /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa-2/3013e85e-599f-40ee-ae51-0e19e850499b/scratchpad/esi.

## JÄÄNNÖKSET, EI SAA PIILOTTAA (kerrottu KK:lle)
- Kaikki kohteet näyttävät 30 m matalammilta. Myös KK:n kokeena kelpuuttamat ulkonäöt muuttuvat, myös Tour Saint-Jacques.
- Kaltevalla maalla matala pää voi jäädä pinnan yläpuolelle: Saint-Eustache 10,5 m, Palais Bourbonin portaat 7,6 m, sillan vesiosa -0157:n jäännökset. Päätelty: aukkoa ei näy, koska malli piirtyy kartan päälle, mutta varjo voi irrota. Katso kuvista.
- Pont Royalin kaaret noin 16 m, oikeat 20,6–23,5 m: malli sijoittaa kaaret profiilin pisimmälle välille (111 m 132 m:stä). Ei korjattu.
- Tour Saint-Jacquesin 1,7–1,9 px/m oli silmämääräinen arvio leveydestä, ja lähikuvien korkeudessa oli helma mukana.

## SEURAAVAKSI
1. Saint-Sulpice (way 16077204, 122×57; porttikäytävä 32 m leveä), vuodet 1646–1870 tarkistettu. Hae ensin mittapiirustukset Commonsista hakusanoilla "Saint-Sulpice plan coupe façade", malli `D/a/se-piirrokset.py`, tarkista lisenssi; sovita `D/a/se-sovita.py`:llä. Tarkista mittakaava palkista täysikoossa, älä näyttökuvasta.
2. Rakentaminen: lisää kohde `maa/kohteet.py`:n listaan, aja `aja-geometria.sh` ensin, sitten `python3 kohteet.py` kansiossa maa/ (ilman -I). Malli: Se-apurit OhjelmaKohdeRakennukset.cs:ssä. Ilmoita sha JU:lle yhteiseen ajoon.
3. Kun JU ilmoittaa ajon kansion, kuvat ensin (AJO).

## MUUTA
ÄLÄ aja `a/tee-sillat-cs.py`:tä. Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin rivit eivät ole Valosepän.
