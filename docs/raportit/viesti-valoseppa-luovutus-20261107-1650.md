# Valosepän luovutus 7.11.2026 klo 16.50. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti yli 30 %, luonteva tauko (film8 JU:lla). Tili vvi@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`, worktree k31 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k31` (nyt haarassa `linssiseppa2/kartta-filmi`, puhdas). Levy pieni: ei uusia worktreitä. Kuvat vain JU:n vuorolla (`local_06f8c680-4618-42bd-a730-9b6a3e17e0b7`). Kansio `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pallon-osat/`; mittaukset `film3-tulos.md` (film3-film7 ja taivas).

## 1. TYÖ NYT: PALLON OSAT PARIISIN KARTALLE
OMISTAJAN PÄÄTÖS 16.43 (KK, kortti, parit-film7): filmi "Jää", terävöinti "Jää", pilvien varjot "Jäävät". KOE, EI JUNAAN (junaan vain kortilla). Työlistalla "Pallon osat Pariisin kartalle: filmi, terävöinti, varjot".
KK:n ehdot: tarkista terävöinti liikkeessä (ohuiden osien nakutus; ruutusarjana, kerro jos pahenee), korjaa 70°:n kaukaisen varjon tumma läiskä, muisti lopuksi JU:n vuorolla. iPhone-tason (Mobile) pehmeneminen film2:sta on yhä todistamatta. Vuorot ja raportti PT:n kautta; korjatut kuvat KK:lle (`local_37f7c945-e1a0-4638-90b8-93c389a36fbe`), kun katsottu, kopio PT:lle.

Haara `linssiseppa2/kartta-filmi`, kärki 80477acae (pushattu): rae 0,5 vaste 0, terävöinti 0,25, varjo häipyy usvan mukana (a69ae579a). Komennot `karttafilmi 0|1|oletus|nolla|tila|(rae vaste varjo keski savy saturaatio hehku kynnys vinjetti terava arvo)`, `karttapilvet 0|1|oletus|tila|(peitto voima jakso korkeus tuuli aika alku loppu arvo)`. Tarkistus `sh Linssit-testit/unity-tarkistus.sh` 0 virhettä; `sh Kartta-testit/kaanna.sh PariisiKallistus` 21/21 ennen viimeistä oletusmuutosta.

**A. ODOTUS: film8 80477acae JU:lla, jonossa 16.45 julkisivu4:n alun jälkeen, pid 52394.** `sk-film8.txt`, 16 kuvaa, kansio `lokit/linssiseppa2-film8-80477acae`. LUO VAHTI: `/Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt`, grep film8 ja "VS ".

**B. Katso film8:sta:**
1. Läiskä: `f8-70-pois`, `f8-70-a14` (nyt alku 14000 loppu 30000), `f8-70-a6` (6000/14000), `f8-70-a3` (3000/10000); 45°: `f8-45-a3`, `f8-45-a6`. Valitse pienin muutos, joka poistaa läiskän oikeasta yläosasta, ja vaihda `KarttaPilvet.LueOletus` (`alku`, `loppu`). Katso, ettei varjo katoa 45°:n kuvasta liian läheltä.
2. Nakutus: `f8-nak-t0-0..4` ja `f8-nak-t025-0..4`, sama alle pikselin askel (0,000005° lon), rae 0, Eiffelin ristikko. Mittaa peräkkäisten ruutujen ero ristikon rajauksella t0 vs t025 ja katso täysikoossa ruutusarjana. VAROITUS: askel voi olla suurempi tai pienempi kuin arvioin (0,5 px); tarkista ensin, että ruudut siirtyvät. Kerro KK:lle, jos terävöinti pahentaa. Erot suhteessa Laplacianiin: terävöinti itsessään 469 -> 1117 (lähin).

**C. Kun kelpaa:** uudet oletukset commit, 70° korjattu pari (ja liikesarja) KK:lle ja kopio PT:lle. Sitten muistimittaus JU:n vuorolla (PT:n ehto), iPad, merkintä "iPad, ei iPhone". Hinta raporttiin: ElavaKamera ei tee omaa syvyyskuvaa vaan lukee kaappauksen R32:n; Ultra ja PC m_RequireDepthTexture 1, ei uutta pääkameralle; Mobile yksi R32 täydellä piirtotarkkuudella + kopio joka kehys; passi 4 kuvanäytettä + syvyys per pikseli; pilvikuva 1024² mipeillä; terävöinti yksi koko ruudun passi lisää. Kerrottu PT:lle, paitsi terävöinti.

Parit: `pallon-osat/parit-film7/` (a69ae579a, terävöinti erikseen). Selvitetty film5-7: KERROS täsmää TAYSIin (85° ka 0,02), rae ei liiku levossa, kartta lepää, varjo etenee 2 s:n askelin. Sivulöydös: `postProcessData.textures.filmGrainTex` oli Mac-ajossa tyhjä; kaupungin ja lennon rae tarkistamatta, ei tähän erään.

## 2. TAIVAS: LIUKUVÄRI EI SAA HAALENTAA MALLEJA (PT:n sana, koe, ei junaan)
Haara `linssiseppa2/taivas-syvyys` rungon f873c938f päällä, kärki e3a272f76 (pushattu), komento `taivas kartta syvyys 1|0 [osuus]`. Syy (vahvistettu samassa ajossa): Karttataivaan liukuväri piirtyi Pariisin ulkopuolella ZTest Alwaysilla, joten Lontoon tornit ja talot haalenivat. Sama rivi on TF 219:ssä (PT luki).
Taso usvan alun ja lopun välille. Osuus 1 antoi maan siluetin kovana (Eurooppa 45°, a1118ee76); 0,25 ei (92074964f): Eurooppa 45 yli 8 tasoa 0,03 %, Lontoo 70 0,00 %, Lontoo 85 tornit tummat 1,75 %, Istanbul 0,08 %. Oletus 0,25 = e3a272f76, sama arvo kuin ajossa komennolla, ei omaa ajoa kärjestä. Eurooppa 70 ja 85 a1118ee76:ssa ilman eroa. Parit `_tyo/linssiseppa2/taivas-syvyys/` ja `osuus/` (always, 0,5, 0,25); katsottu Eurooppa 45 ja Lontoo 85, ei Lontoo 70:ta eikä Istanbulia silmällä, vain mitattu.
TILA: parit lähetetty PT:lle. PT päättää junavuorosta. Ei muuta ilman PT:n sanaa.

## 3. MUUT
- Kovat varjot jäävät junaan; iPad-mittaus tulee junan yhteisajosta: lue varjojen muistiosuus siitä. Sacré-Cœurin kaari auki listalla, ei uutta työtä ennen kuvaa. Muurin kivet junassa, vastattu PT:lle.
- Portti ei noudata järjestystä; jos ajo seisoo, rivi JU:lle.

## TEKNIIKKA
Numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`; PIL `/opt/homebrew/bin/python3 -I`. `sh`, ei zsh. zsh:ssa `git show "$S:polku"` hajoaa ilman lainausmerkkejä (`:A`). Ajokuvaus JU:lle: sha, skenaario, kuvamäärä, koko ipad, pistekerroin 0.465, ESIKATSELU_LAATU=Ultra, kansio. Kuvat 2752×2064: pienennä ennen katsomista, rae ja saumat täysikoossa; `f5-mittaa`-tyyliset skriptit kirjoita scratchpadiin. Kuvan sisäinen kyyhky vääristää erotuksia, tarkista paikka. Tapot vain omilla PID:illä. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara jäljessä, ei ylikirjoiteta: luovutus plumbingilla origin/main-pohjalta.
