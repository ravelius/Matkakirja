# Valosepän luovutus 7.11.2026. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti yli 25 %, luonteva tauko (film5 JU:lla). Tili vvi@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`, worktree k31 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k31`. Levy pieni: ei uusia worktreitä, käytä k31:tä. Kuvat vain JU:n vuorolla (`local_06f8c680-4618-42bd-a730-9b6a3e17e0b7`). Kansio `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pallon-osat/`; mittaukset `film3-tulos.md`.

## 1. TYÖ NYT: PALLON OSAT PARIISIN KARTALLE (omistajan kortti 11.52, PT 12.1x)
Suunnitelma: `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261107-pallon-elama-kartalle.md`. Sinulle kohdat 1 filmi, 2 terävöitys, 3 pilvien varjot (PT: VAIN varjot, ilmaperspektiivi pois usvan takia, kirjaa KK:n kuvarivillä). Oma haara ja kytkimet, EI JUNAAN. Puolipilvinen päivä kiinni, taivas ja sumu eivät vaihdu, kartan lepo säilyy. Muistimittaus vasta lopuksi JU:n vuorolla.

Haara `linssiseppa2/kartta-filmi`, k31, kärki 93426d60e (pushattu). Komennot `karttafilmi 0|1|oletus|nolla|tila|(rae vaste varjo keski savy saturaatio hehku kynnys vinjetti terava arvo)`, `karttapilvet 0|1|oletus|tila|(peitto voima jakso korkeus tuuli aika alku loppu arvo)`. Tarkistus `sh Linssit-testit/unity-tarkistus.sh` 0 virhettä, `sh Kartta-testit/kaanna.sh PariisiKallistus` 21/21 kärjessä. Ei Mac-kuvaa kärjestä vielä.

**A. ODOTUS: film5 93426d60e pyydetty JU:lta 15.28:** `sk-film5.txt`, 14 kuvaa, koko ipad, 0.465, ESIKATSELU_LAATU=Ultra, kansio `lokit/linssiseppa2-film5-93426d60e`. Rivi oli JU:n jonossa viestinä (delivery queued), ei vielä jonotiedostossa. LUO VAHTI: `/Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt`, grep film5. Tarkista "laatutaso: Ultra (pakotettu)".

**B. Katso film5:stä:**
1. Pilvien varjo KERROS-tilassa: `f5-tay-pilvet` vs `f5-ker-pilvet-1/-2`, `f5-tay-molemmat` vs `f5-ker-molemmat-2/-3`. film4:ssä varjo puuttui KERROSista (ka 1,96, yli 8 tasoa 8,63 %), kun kytkimettä täsmäsi (ka 0,09, 0,30 %, kyyhkyt liikkuvat). Korjaus: ElavaKamera lukee kaappauksen syvyyden (`ElavaKerros.TallennettuSyvyys`, `KarttaPilvet.ValmisteleKamera`). SYY ON PÄÄTELMÄ, ei erikseen todistettu: ElavaKameran oma syvyyskuva ilman karttaa. Lokista `pallo kerros tila`: kaappauksia > 0. Jos ei täsmää, epäile sitä, että kaappaus on jo tehty ennen varjoa ja ElavaKamera tekee varjon kerran (ks. KarttaPilvet.cs JÄRJESTYS), tai kertautumista.
2. Rae: mittakaava korjattu `_ScreenParams`illa (film4: pixelWidth 640, kuva 2752, rae 4,3 x karkea). `f5-45-oletus`, `f5-45-r05-v0`, `f5-45-r10-v0`, `f5-lahin-r05-v0`, `f5-lahin-r10-v0` vs `-pois`. URP:n Medium04 on sama kuva (sd 4,9/255), joten rae on luonnostaan hento: rae 0,22 ja vaste 0,5 ei näkynyt paperilla lainkaan. Valitse pienin arvo, joka näkyy täysikoossa, ja vaihda `LueOletus` + `raeVaste` (nyt 0,22 / 0,5). Ellei mikään kelpaa, kerro parissa, älä väitä näkyväksi.
3. Terävöitys: `f5-lahin-t025` vs. film3:n `f3-lahin-terava` (0,5: Laplacian 709 → 2015, Eiffelin ristikko kova). Oletus on 0 (`terava`); ehdota arvo parissa.

**C. JO KATSOTTU (film3 37a2f9a0f, Ultra, 39/39; kuvat `lokit/linssiseppa2-film3-37a2f9a0f`):** nollatesti puhdas: Laplacian 709/713/707, film2:n pehmeneminen ei näy Ultrassa (syy Mobilella todistamatta). Pilvet näkyvät: 45° min 0,84, alle 0,97 12,9 %; lähin min 0,74, 31 %; laaja aika 900 10,5 %, 1100 21,7 %, 1300 52,1 %, 1500 72,7 %. Lepo: rivit 7/7 "lepää", lepo-1 = lepo-2 md5, lepotuuli eroaa varjon verran. Rae-puuttuu 0, pilvet-ei 0. ArgumentOutOfRange = editorin Search. KERROS-paperi film3:ssa oli Esikatselun raja batchmodessa (pääkamera ei piirtänyt kaappausta, kaappauksia 0); korjattu 1ca39c458:ssa, Esikatselu.cs.

**D. Kun kelpaa:** parit KK:lle suunnitelman näyttötavalla (`local_37f7c945-e1a0-4638-90b8-93c389a36fbe`, vain kuvaparit tästä erästä): samasta kohdasta ylhäältä, 45°, 70°, 85° ja lähin; liikkeestä ruutusarja (`f3-liike-1/-2` on film3:ssa; kärjestä uusi, jos arvot muuttuvat), ei videota. Kerrottava kuvien kanssa: rae ei ehkä sovi paperityyliin, omistaja pyysi sen, siksi pari; ilmaperspektiivi pois usvan takia; pallon arvot ei sellaisenaan, vaan paperille sovitetut. Sha ja rivi PT:lle kohta kerrallaan. Kuvat vasta oikeilla oletusarvoilla: pareja ei ole lähetetty.

**E. Hinta raporttiin (PT:n ehto):** muuttunut: ElavaKamera EI enää tee omaa syvyyskuvaa, vaan lukee kaappauksen R32:n. Ultra ja PC: m_RequireDepthTexture 1, joten pääkameralle ei uutta. Mobile: yksi R32 täydellä piirtotarkkuudella ja kopio joka kehys. Passi 4 kuvanäytettä + syvyys per pikseli, ei värikopiota. Pilvikuva 1024² mipeillä Resourcesista. PT:lle kerrottu aiempi versio, kerro muutos. Mittaus lopuksi JU:n vuorolla.

Löydös sivusta: `postProcessData.textures.filmGrainTex` oli Mac-ajossa tyhjä; kaupungin ja lennon rae tarkistamatta, ei tähän erään.

## 2. MUUT (PT:n sanat tältä sessiolta)
- Kovat varjot jäävät junaan (PT, omistajan 19.08 "Kelpaavat"; OMISTAJAN PÄÄTÖS 14.46: juna 220 koko Pariisin sisäinen koeversio). iPad-mittaus tulee junan yhteisajosta, ei omaa ajoa: **lue varjojen muistiosuus siitä**. c94e6ce51 junassa (61afeb7f2, 703/703). Sacré-Cœurin kaari auki listalla, ei uutta työtä ennen kuvaa.
- Louvren haamu: vastattu PT:lle. Ajossa 49 ei näy, mutta eri kamerasta; po2-ita ajettu viimeksi ajossa 26. Poistumista ei todistettu, ei ajoa.
- Puusto: PT:lle kerrottu, ettei ole minulla eikä tekijää löytynyt; usva 16 km junassa. Ellei PT palaa, ei toimia.
- Portti ei noudata järjestystä: film3 hävisi L2-vuoron 3 kertaa, JU siirsi L1:lle. Jos ajo seisoo, rivi JU:lle.

## TEKNIIKKA
Numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`; PIL `/opt/homebrew/bin/python3`. `sh`, ei zsh: kaanna.sh ja unity-tarkistus.sh. Kuvat 2752×2064 png: pienennä ennen katsomista, saumat ja rae täysikoossa. Tapot vain omilla PID:illä. Ajokuvaus JU:lle: pistekerroin 0.465, koko ipad, ESIKATSELU_LAATU=Ultra. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara jäljessä, 85 omaa tiedostoa, ei ylikirjoiteta: luovutus plumbingilla origin/main-pohjalta.
