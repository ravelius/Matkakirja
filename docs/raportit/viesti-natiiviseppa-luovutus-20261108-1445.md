# Natiivisepän luovutus 8.11.2026 klo 14.45

KAIKKI VANHEMMAT LUOVUTUKSET, viittausketjua ei ole (alla 14.15:n luovutus sellaisenaan taustaksi). Sessio Natiiviseppä, kansio
Matkakirja-3d-selvittaja, tili vvi@vvi.fi. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe,
JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, NUI local_43962c89-fc14-4098-9dd7-6153133ffcea,
Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Nollauksen syy: konteksti pehmeällä rajalla 25 % (7.37) 14.4x.
Luovutushaara natiiviseppa-luovutus-20261108-1445. Cron "4 9 * * *" (unity-julkaisut.py, Raamattu 7.41) luotu 14.1x (99fbc426): LUO UUDELLEEN.

## TILA 8.11. 14.45 (VOITTAA kaikki alla olevat)
1. KALOTIN RUUTUKOHINA = JUNAN 222 TF:N ESTE (PT 14.25, JONON KÄRKI). SYY LÖYDETTY (ei palautus, ei mipit):
   Varitaso.Luo → NapaKannet.Kerma(true) (konsolissa "väritaso: FRA"; tav2:ssa ei) → Napakansi.shader antaa kalotille kerman
   maalle R − B 36…52 (paperisääntö); striimikalotin MERI on R − B 36…44 (etelä 68 %, pohjoinen 91 %; mitattu ämpärin
   julisteet/pallo/napakalotit/2026-11-08-striimi/*.webp, scratchpad rb.py) → meri sai kermaa pikseleittäin, kuvan pakkauskohina
   ruutuina. Ruudut kuvan akseleiden suuntaisia (navan päältä = ruudun akselit). Paperikalotin R − B 14…25 → TF ei kohise.
   KORJAUS 1 bea0d260f (natiiviseppa/navat-koho, wt /Users/Shared/Claude/wt/proto-natiiviseppa-kierto): _KermaMaa-vektori
   Napakansi.shaderiin, striimi 50…60 (meri ja jää ilman kermaa, maa 60…90+ kuten ennen), paperi 36…52. iPad JU kerma/ 14.40:
   rajauksen (700,450)-(1300,900) kohina 0,26 (TF 0,27, tav2 0,29, keha 1,16, keha-verrokki 1,22; mittari scratchpad kohina.py =
   keskim. |g − boxblur1(g)|). Parit täysikoossa _tyo/natiiviseppa/navat-koho/parit4/ (TF|korjaus, keha|korjaus, koko etelä/pohjoinen).
   MUTTA kerma oli peittänyt valaistuseron: kalotti 60° S:n reunalla 5–7 % laattoja TUMMEMPI (laatat/kalotti 1,053/1,052/1,069;
   pystyprofiili x 1300–1430: laatat 146–148, kalotti 137–143 y > 340). Siis myös kehä-A:n 13.50-mittaus oli osin kerman vaalentama.
   KORJAUS 2 641fd439e (= bea0d260f + StriimiSavyKerroin: striimikalotin _BaseColor = laattojenSavy × suhde; paperi ennallaan),
   unity-tarkistus 0 (sh), pushattu natiivi-backup. AJOPYYNTÖ JU:LLE 14.5x (toimitettu): _tyo/natiiviseppa/navat-koho/ajopyynto-savy.md
   → lokit/natiiviseppa-navat-koho/savy/, ENNEN pienoismallia.
   KUN KUITTAA: kohina.py samaan rajaukseen (≤ 0,3), pystyprofiili reunan yli (≤ 2 tasoa; sama koodi kuin yllä: rivit 100…780 askel 40,
   sarakkeet 1300–1430), vaakaprofiili y 1050–1150 (reuna x ≈ 200), pohjoinen täysikoossa: Pohjois-Grönlannin vyö 80° N (avoin
   löydös; maa saa yhä kerman, vyö voi jäädä), parit TF | savy täysikoossa PT:lle ≤ 3 riviä. PT:LLE SANOTTU: lupa junaan 641fd439e:lle
   (EI bea0d260f:lle) vasta, kun savy/ ≤ 2 tasoa. Jos porras jää: suhde uudelleen savy/:sta (kerroin kertoo gammaväriä).
   PT kysyi oliivista: vastattu (striimimeri, sama laatoissa reunan yli; TF:n beige = vanha paperikalotti).
   HUOM: tyokalut/tarkista.sh generoi tyylikirjan uudelleen vanhasta lähteestä (poisti HarmaaTummaLasi) → git checkout ennen committia.
2. FPV-PIENOISMALLI (OMISTAJAN PÄÄTÖS 14.25 "Pienoismallina", PT 14.30; korvaa 14.22:n loivennuksen): ×15 sellaisenaan, drone ei
   lähemmäs kuin missä kartta on siisti. Skenaario _tyo/natiiviseppa/fpv-kuvakoe/sk-fpv-pienoismalli-nui.txt (pm-yla + drone 120/80/55/
   40/28/20/15 km maaston yllä Mont Blancin pohjoispuolelta katse etelään; ui fpvnakyma 1 pm-ylan jälkeen = NUI:n nimet + kulmapallo
   b45bbe356 = 2efebff6e + NUI). JU pid 9968 → lokit/natiiviseppa-fpv-pienoismalli/, iPad savy-ajon jälkeen. Ajopyyntö ajopyynto-pienoismalli.md.
   KUN KUITTAA: parit vasen pm-yla | oikea kukin etäisyys täysikoossa; lukitse lähin siisti D METREINÄ ja Skaala = D/3 lukuna (PK e1d7c09c4,
   FpvParametrit.Pienoismalli(D, d=3)); KK tilaa niillä Codexilta superdronen kuvan (omistaja 14.41). Kerro PT:lle: D luultavasti kymmeniä
   km → skaala tuhansia (D 20 km → 6 700, 30 m/s → 200 km/s); PK:n esimerkki D 1 500. NUI:n nimet/pallo: tarkista tila-riveistä ja kuvista.
   Lentomallin kärki ecf0116ce (PK, propwash) vasta osassa 4; kuvasarja ei käytä lentomallia (PT:lle sanottu).
3. KOHOKARTAN NAPAKALOTIT VALMIIT KS:ltä (14.4x), EI ALOITETTU (pehmeä raja): julisteet/pallo/napakalotit/2026-11-08-kohokartta/
   {pohjoinen,etela}.webp + kalotit.json (CDN tarkistettu 5/5), paikallisesti proto-3d/_valmiit/kohokartta-napakalotit-vienti-20261108/.
   2048 px, atsimutaalinen kuten striimi, MUTTA REUNA 84° (Verkko(..., kuvanReuna ±84), UV r = (90 − |lat|)/6), alfa 84,4→85,0, täysi
   85°→napa. Valaistus poltettu kuvaan kuten laatoissa → sama kerroin kuin kohokartan laatat, ei omaa rinnevaloa (KS). Kytkentä
   NapaKannet.Kohokartta-tilaan (KohoKansi pois tai varaksi), kerma pois kohokalotilta (_KermaMaa > 1), uusi haara navat-koho:n päälle
   (EI junan 222 navat-haaraan ilman PT:tä); iPad-pari JU:lla (sk-navat-koho2.txt, verrokki koho2/) → PT. Sauma KS:n mittaus mediaani
   −0,3/+1,0, p95 14/20. KS:lle ei vielä vastattu (kerro: kytkentä seuraavalla sessiolla).
4. JONO: savy/ → pienoismallin pari → kohokalotit → FPV osa 4 (PT:n sanalla; PK:n lentomalli, origon siirto, AlinEtaisyys = D).
   Avoimet 14.15:n kohdat (esittelyliikkeen video NUI:lla, korkeuskoe, j4 lukematta) ennallaan alla.

## LISÄYS 15.0x (luovutuksen jälkeen)
- JU 14.45: savy 641fd439e käännös alkoi, iPad PK glb-2c:n jälkeen, ENNEN pienoismallia → lokit/natiiviseppa-navat-koho/savy/.
- PT 15.0x: savy-PARIIN myös REUNASTA RAJAUS täysikoossa, jossa kalotti ja laatta vierekkäin (esim. y 260–420 x 1250–1480 tai vaaka y 1050–1150 x 100–400).
- PT kysyi oliivista: vastattu. Laattojen meri muuttuu junassa 222 (ffc355105 ElavaTyyli.Varita vesiraja: syvä meri vedeksi KOKO maailmassa z ≤ 10,
  TF beige 193–209 → oliivi 146–160). Omistajan 10.34 päätös koski napoja; maailmanlaajuinen muutos ei ole erikseen hyväksytty → PT:n/KK:n päätös. Jos PT pyytää: maailmapari TF | 222.

## ---- 14.15:n luovutus sellaisenaan ----
# Natiivisepän luovutus 8.11.2026 klo 14.15

KAIKKI VANHEMMAT LUOVUTUKSET, viittausketjua ei ole (alla 13.28:n luovutus sellaisenaan taustaksi). Sessio Natiiviseppä, kansio
Matkakirja-3d-selvittaja, tili vvi@vvi.fi. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe,
JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, NUI local_43962c89-fc14-4098-9dd7-6153133ffcea,
Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Nollauksen syy: PT:n käsky 13.5x (nollaa, kun kehä ja FPV-kuvakoe raportoitu).
Luovutushaara natiiviseppa-luovutus-20261108-1415. Cron "4 9 * * *" (unity-julkaisut.py, Raamattu 7.41): LUO UUDELLEEN.

## TILA 8.11. 14.15 (VOITTAA kaikki alla olevat)
1. NAVAN KEHÄ RATKAISTU, PT:lle 13.50: A 11b66adc5 (natiiviseppa/navat-koho, Napakansi.shader) JUNAAN 222, EI B:tä (cbc27f896 jää).
   Todiste: verrokki 86916cbd7 samalla hetkellä (lokit/natiiviseppa-navat-koho/keha-verrokki/): tumma kehä yhä (raja 95→143);
   A (keha/): raja y 1100/1700 ≤ 3 tasoa, täysikoossa ei rengasta; vaaleampi vyö y 1300–1500 myötäilee rannikkoa (matalikko).
   Parit _tyo/natiiviseppa/navat-koho/parit3/ (etela-reuna-verrokki-vasen-A-oikea.png ym., mittaa3.py). Sha junaan PT:n sanalla.
2. AVOIN LÖYDÖS (PT:llä, ei osoitettu): ruutukohina kalotin merellä (z3-laatan pikselin kokoinen, etelä 3,0 vs 0,8) ja vaalea vyö
   Pohjois-Grönlannissa 80° N näkyvät sekä keha- että verrokkiajossa; kalottikuva ämpärissä sileä. EI paketti v1020 (JU:
   julkaisija-tyokalut/selvitys-v1020-20261108.txt, vain Raamattu/lehti-json); tav2-verrokki poikkeava (~50 ruutua vs ~260).
   Luultavasti nykyisessä pelissä; selvitys vain PT:n sanalla (NS tai KS).
3. FPV OSA 1 KATSOTTU, PT:lle 14.2x: komento "drone lat lon h suunta alas [etäisyys]" 2efebff6e natiiviseppa/fpv-kuvakoe
   (wt /Users/Shared/Claude/wt/proto-natiiviseppa-fpv, juna 222 50200fb68 + PalloKierto.DroneKuva + Komennot; unity 0; ei junaan).
   Skenaario _tyo/natiiviseppa/fpv-kuvakoe/sk-fpv-kuvakoe.txt, kuvat lokit/natiiviseppa-fpv-kuvakoe/, kooste fpv-kuvakoe/fpv-kooste.jpg.
   TULOS: ×15-kohokartta ei kelpaa dronen korkeuksilta: ylhäältä piikkimetsä; 5 km/1 km/300 m/rinne vain tasaisia seiniä ja
   venyneitä raitoja (silmä 15,9–46,7 km). Osa tummasta voi olla silmä verkon sisällä (näyte tarkemmalta LOD:lta kuin piirretty), varmistamatta.
   ODOTTAA KK:n/omistajan päätöstä (pienempi kerroin dronen ympärillä vai tarkka maasto + reaaliaikainen varjo) ennen osaa 4.
4. FPV OSA 4 (vasta päätöksen jälkeen, PT): PK:n lentomalli 61fc67ce4 (natiivi-backup pelikoodari/fpv-lentomalli) Peli/Fpv/FpvLentomalli.cs,
   13/13 testiä: tila Sijainti/Asento/Nopeus Unityn akseleilla, Askel(dt, syöte −1…1 ×4), Palauta(…, leijuen), Skaala kertoo kaiken,
   Ylos-vektori pallolle. Kytke FPV-kamera, origon siirto (malli RakettiLaukaisu.cs:1299), korkeusruudukko törmäyksiin, palautus;
   NUI:n tikut syöttävät saman syötteen. Suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261108-fpv-drone-topo.md.
   PT:n jono: FPV-kuvakoe → korkeuskoe (peruskartan KorkeusKerroin lentojen ajaksi, ks. alla) → FPV osa 4.
5. Muut 13.28:n kohdat (esittelyliike NUI:lla, aloituslento, muistityö, merenpohja) ennallaan alla.

## ---- 13.28:n luovutus sellaisenaan ----
# Natiivisepän luovutus 8.11.2026 klo 13.28

KAIKKI VANHEMMAT LUOVUTUKSET, viittausketjua ei ole (alla 12.20:n luovutuksen TILA-osat sellaisenaan taustaksi). Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, NUI local_43962c89-fc14-4098-9dd7-6153133ffcea.
Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Nollauksen syy: konteksti pehmeällä rajalla 27 % (7.37) 13.2x.
Luovutusworktree wt/natiiviseppa-luovutus-0039 (haara natiiviseppa-luovutus-20261108-1328).
Cron "4 9 * * *" (unity-julkaisut.py, Raamattu 7.41) luotu 13.1x (1f7f2f4f, session-only): LUO UUDELLEEN.

## TILA 8.11. 13.4x – KÄRKI, ESTÄÄ JUNAN 222 TF:N (VOITTAA kaikki alla olevat)
KEHÄN YHDISTELMÄ VALITAAN MITTAAMALLA (PT 13.4x: ei kaksinkertaista korjausta; kerro PT:lle kumpi ja miksi):
- A = 11b66adc5 (varjostimen valon tasaus) + alkuperäinen striimi. JU AJAA TÄMÄN NYT (T/ns-navat-keha.zsh pid 31929, iPadille NUI:n
  napautus-2:n jälkeen) → lokit/natiiviseppa-navat-koho/keha/ (tav-etela, tav-pohjoinen, tav-maapallo).
- B = A + striimi-b (KS 53b307fd3: reunan 4° pikselittäin z5-laattojen lähdesävyyn, keskiarvo sama 143/138/104, poistaa vain
  pituusasteittaisen vaihtelun; KS: ei tummenna, ei tuplakorjaus). Valmiina VARALLA cbc27f896 haara natiiviseppa/navat-koho-b (11b66adc5 + versio).
- PÄÄTÖS: mittaa A:n kuvista sävyero reunan molemmin puolin kehän ympäri (laatat vs kalotti, avomeri; vrt tav2 samat rivit y 700/1100/1500).
  HYVÄKSYNTÄ (PT): kehää ei näy täysikoossa, avomerellä ≤ 2 tasoa, saaret ja häive eivät muodosta rengasta. A täyttää → A junaan
  (11b66adc5), ei B:tä. A:ssa tasainen kehä pois mutta pituusasteittain > 2 tasoa → B iPadilla JU:lla (sama skenaario, kansio keha-b/),
  sitten B junaan (cbc27f896). Kehä yhä tasaisesti tumma A:ssa → syy muualla (alfahäive rgb/a, SampleSH); ei B:tä ennen syytä.
  Pari PT:lle (rajattu napa täysikoossa, molemmat navat) → KK.

## TILA 8.11. 13.28 (VOITTAA kaikki alla olevat)
1. NAVAN KEHÄ, KIIREELLINEN (omistajan havainto 12.50, PT 13.2x; navat junassa 222 → ennen TF:ää). Kuva
   Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261108/omistaja-1250-napa-etela-kehä.png: tavallisen kartan etelänavalla
   tumma kehä striimikalotin reunassa (pohjoisessa heikompi).
   SYY (mitattu): varjostin, ei kalotin sävy. etela.webp reuna 61–64° S 143/138/104 = KS:n liitossävy (z5-laatat); iPad tav2
   (lokit/natiiviseppa-navat-koho/tav2/tav-etela.png, rivit y 700/1100/1500, x 2250–2730): laatat 153/143/101, kalotin reuna
   86/80/54. Laatat saavat rinnevalon tasauksen (_maaKeski.w, tee_tileset.py KORKEUS_RUNKO), Napakansi.shader ei → N·L laskee
   reunaa kohti. KORJAUS 11b66adc5 natiiviseppa/navat-koho (wt proto-natiiviseppa-kierto; 86916cbd7 + vain varjostin), pushattu.
   EI VIELÄ PELISSÄ KATSOTTU. JU:lla ajo: _tyo/natiiviseppa/navat-koho/ajopyynto-keha.md → lokit/natiiviseppa-navat-koho/keha/.
   KUN KUITTAA: mittaa reunan sävyero kehän ympäri molemmin puolin (raja ≤ 2 tasoa; vertaa tav2:ta samoilla riveillä), katso
   täysikoossa molemmat navat; sitten pari PT:lle (rajattu napa täysikoossa, molemmat navat) → PT vie KK:lle. Sha junaan PT:n sanalla.
   KS:lle sanottu 13.2x: ei tummenneta reunaa pelikuvan mukaan; jos KS polttaa uuden version, kytke osoite (NapaKannet.KalottiVersioStriimi)
   ja aja sama pari. Jos kehä ei häviä: tarkista myös kalotin oma alfahäive 1,5° (rgb/a reunassa) ja SampleSH-normaali.
2. ESITTELYLIIKE + HIMALAJA VALMIS, NUI:lla (PT: NUI yhdistää natiivi-ui/topoesittelyt-221:een ja pyytää JU:lta videon):
   natiiviseppa/topo-esittelyt 79f8a637b (wt proto-natiiviseppa-jarru, ff dc3e11279), pushattu. Linssit 2269/2269, unity-tarkistus 0.
   - 877f5d72d Himalaja 28,5/84,5 Suuntima 20 (etelästä kohti muuria; suuntima = kompassi myötäpäivään, tarkistettu tallenteesta).
   - 79f8a637b KohdeKierto.Hiivu / PalloKierto.KohdeKiertoHiivu(3 s): NUI asettaa NahtavyysEsittely.Hiivuta = k => k.KohdeKiertoHiivu().
     Tallenteen kellovika: LinssiOhjain.AikaOhitus = KameranKello() Esikatselun tallenteen ajaksi; topokierto-rivillä kellot.
   - EI TEHTY: laattatarkkuuden lennonaikainen lukitus (08.19 B): koodista ei löytynyt lukitusta; PT:lle kerrottu.
   KUN VIDEO TULEE (NUI/JU): katso Alppien kierto loppuun asti (15,6 s), Himalajan jatko tauon jälkeen ilman hyppyä, loppunäkymä
   etelästä muuria kohti; topokierto-rivin kellot. Raportti PT:lle ≤ 3 riviä, video KK:lle vain PT:n kautta.
3. JONO sen jälkeen: kohokartan napakalotit KS:ltä (TILA 13.0x alla) → KORKEUSKOE (LISÄYS 11.4x alla). j4 lukematta.

# ======== 12.20:N LUOVUTUS (tausta) ========

## TILA 8.11. 13.0x (VOITTAA kaikki alla olevat): PT:N PÄÄTÖS
PT: navat 86916cbd7 JUNAAN 222 (koko commit, JU yhdistää); tav-parit KK:lle PT lähetti. Kohokartan napakalotit TILATTU KS:ltä
(atsimutaaliset, uusi versiokansio); KS antaa osoitteen NS:lle → kytkentä NapaKannet.Kohokartta-tilaan (kalotti kohokartan versiolla,
häive 85°:n kohdalla, KohoKansi pois tai vain varana), sitten iPad-pari JU:lla (sk-navat-koho2.txt, verrokki koho2/) → PT.
SILLÄ VÄLIN: ESITTELYLIIKE (11.55:n lisäykset 11.5x ja 12.0x; ensin tallenteen kellovika 11.55:n TILA kohta 2) → KORKEUSKOE. j4 lukematta.
EI ALOITETTU tässä sessiossa (nollaus pehmeällä rajalla).

## TILA 8.11. 12.55 (VOITTAA kaikki alla olevat)
JU 12.45: 86916cbd7 yhdellä asennuksella, tav2 3/3 (lokit/natiiviseppa-navat-koho/tav2/) ja koho2 2/2 (.../koho2/), VIKA 0, NRE 0,
konsolissa napakalotti etela 4096 / pohjoinen 2048, kohokansi 16/16. KATSOTTU täysikoossa, parit _tyo/natiiviseppa/navat-koho/parit2/
(pari2.py koho-rajaukset uusi|koho2, pari3.py tav verrokki|tav2).
- TAVALLINEN KARTTA OK: meri veden värinen napaan asti, ei häivevyötä, Etelämanner samaa tyyliä, maapallolla maa ei vedeksi.
- KOHOKARTTA EI VIELÄ: viuhka pois, mutta 85°→napa yhä tasainen sumea kiekko (etelä tummanruskea, pohjoinen tumma sininen).
  Syy perustava: Web Mercator loppuu 85,05°:een, synteettinen täyttö näkyy kiekkona. SUOSITUS PT:lle 12.5x: KS polttaa
  kohokartan napakalotit (atsimutaaliset, kuten striimikalotit 2026-11-08-striimi), NS kytkee NapaKannet.Kohokartta-tilaan
  (kalotti kohokartan versiolla häiveellä 85°:n kohdalla). PT:N VASTAUS ODOTTAA (viesti jonossa 12.5x). Parit KK:lle vain PT:n sanalla.
- Seuraavaksi PT:n vastauksen mukaan; muuten jono: esittelyliike → korkeuskoe; j4 lukematta.

## TILA 8.11. 12.20 (VOITTAA kaikki alla olevat)
Cron "4 9 * * *" luotu 12.1x (40a951dd, session-only): LUO UUDELLEEN. Lukulista 7.47 luettu tässä sessiossa (ei muutoksia NS:n työhön).

0. NAVAT, KOHOKARTTA: UUSI-ajo ca92af647 KATSOTTU 12.1x (parit _tyo/natiiviseppa/navat-koho/parit/*.jpg, vasen verrokki | oikea uusi;
   kuvat tästä ajosta 11.54–11.56, konsolissa "kohokansi mitattu (16/16 laattaa)"). Paperikalotti ja häivevyö poissa, MUTTA VIKA:
   napakansi 85°→napa näkyi säteittäisenä VIUHKANA molemmilla navoilla, etelässä tumma kiekko (rajaukset scratchpadissa: etelä
   (1050,1350,2150,2064), pohjoinen (1000,250,2000,1000) uusi/*.png:stä). Syy: 64 reunanäytettä liukuivat suoraan keskiarvoon
   (= viuhka), ja keskiarvo tumma vuorten varjorinteistä (etelä 107/57/34). Reunalla sävy täsmää laattoihin (suhde ~1,0), ei valaistus.
   EI LÄHETETTY KK:lle eikä PT:lle (vika).
   KORJAUS 86916cbd7 haara natiiviseppa/navat-koho (ffc355105 +), pushattu natiivi-backup, työpuu wt/proto-natiiviseppa-kierto:
   Kartta/NapaTaytto.cs (puhdas; Poissonin ydin: Fourier-kerroin vaimenee ρ^|n|, Lanczos-σ; napa selitteestä: etelä 2 835 m
   korkea vuoristo→paljas kivi, pohjoinen valtameren pohja), NapaKannet.KohoTaytto/KohoNapaVari käyttää sitä, KohoKehia 32.
   Testit NapaTayttoTestit 3/3 (EiViuhkaaSisalla kaatuisi vanhalla liu'ulla rakenteeltaan), Kartta 714/714, unity-tarkistus 0,
   tarkista.sh 0. Python-simulaatio samoilla z3-laatoilla: viuhka poissa.
   AJOPYYNTÖ JU:LLE 12.18 (toimitettu): _tyo/natiiviseppa/navat-koho/ajopyynto-koho2.md, sk-navat-koho2.txt (etela, pohjoinen) →
   lokit/natiiviseppa-navat-koho/koho2/; verrokki uusi/etela.png ja pohjoinen.png. JU:lle: yhdistä tav2:n kanssa 86916cbd7-käännökseen,
   jos tav2 ei ollut vielä iPadilla.
   KUN KUITTAA: konsoli "kohokansi mitattu (16/16", parit (kopioi parit.py: vasen uusi/ | oikea koho2/), napa täysikoossa: ei viuhkaa,
   ei tummaa kiekkoa, reuna 85° ei erotu. Sitten parit KK:lle (omistajan pyytämä navat-korjaus) ja PT:lle ≤ 3 riviä:
   ca92af647 + 86916cbd7 (koho), sha junaan VAIN PT:n sanalla.
1. NAVAT, TAVALLINEN KARTTA: tav2 (ffc355105) JU:lla (pid 34071 12.18, loki tyhjä) tai yhdistettynä 86916cbd7:ään; lukuohje
   11.55:n TILA kohta 1 (konsolin napakalotti-rivit, verrokki verrokki/tav-*.png, tarkistuslista).
2. JONO navojen jälkeen: ESITTELYLIIKE (11.55:n lisäys 12.0x ja 11.5x: NahtavyysEsittely.Kamera/Hiivuta + TopoEsittely.Kamera,
   lähtökohta KohdeKierto b1d5c652f, pohja 756f4962d; ensin tallenteen kellovika 11.55:n TILA kohta 2) → KORKEUSKOE.
1b. LISÄYS 12.2x (JU luovutuksen jälkeen): YHDISTETTY. tav2-kääre (ffc355105) pysäytetty ennen iPadia; 86916cbd7 käännös (T/ns-navat-koho2.zsh pid 49846),
   sitten samalla asennuksella tav2 → lokit/natiiviseppa-navat-koho/tav2/ ja koho2 → .../koho2/; napakalotti-rivit jonolokiin, kuittaus NS:lle.
3. Aloituslento j4 VALMIS (JU 11.58, lokit/natiiviseppa-striimi-aloituslento-4): LUKEMATTA, lukuohje 11.15:n TILA kohta 2.


# ======== 11.55:N LUOVUTUS SELLAISENAAN (tausta) ========

# Natiivisepän luovutus 8.11.2026 klo 11.55

 KAIKKI VANHEMMAT LUOVUTUKSET, viittausketjua ei ole. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, NUI local_43962c89-fc14-4098-9dd7-6153133ffcea.
Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Nollauksen syy: konteksti pehmeällä rajalla 25 % (7.37) 11.35; navat-uusi ja j4 JU:lla, KS polttaa striimikalottia, topopilotti suunniteltu (TILA 11.15 kohta 1).
ENSIN lukulista 7.47, ja cron "4 9 * * *" (session-only, Raamattu 7.41), skripti /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py (python@3.14 ilman -I:tä), kuolee nollauksessa: luo uudelleen. Etäyhteyteen ei kosketa.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe, M = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/muisti-0, L = /Users/Shared/Claude/proto-3d/lokit, T = /Users/Shared/Claude/julkaisija-tyokalut, SK = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/striimi-karkea. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ILMAN -I:tä.
Viestit: mcp__ccd_session_mgmt__send_message session-id:llä. Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto; työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-jarru (NYT haara natiiviseppa/striimi-karkea-juna221, puhdas), etä natiivi-backup. Toinen työpuu wt/proto-natiiviseppa-kierto (NYT natiiviseppa/navat-koho; muisti-astc 821e5ba74 pushattu).
Tyyppitarkistus: kopio P/valmis-origo/tyyppitarkistus-tyopuu.zsh, vaihda rivit 4 (W) ja 5 (S) sedillä (scratchpadin kopio kuolee); kattaa vain Kartta-kansion. unity-tarkistus: sh Peli-testit/unity-tarkistus.sh (ei Editor-kansiota). tarkista.sh generoi Tyylikirja.cs/.uss/tyylikirja.json: palauta ne (git checkout --) ennen committia.
Luovutusworktree: wt/natiiviseppa-luovutus-0039 (käytetään uudelleen uudella haaralla, ei uutta worktreetä: rooliraja 3).

## TILA 8.11. 11.55 (VOITTAA kaikki alla olevat; nollaus 28 %:ssa, 7.37)
Cron "4 9 * * *" luotu 11.4x (f2510503, session-only): LUO UUDELLEEN. Lukulista 7.47 luettu tässä sessiossa.

1. NAVAT b) TAVALLINEN KARTTA KOODATTU: ffc355105 haara natiiviseppa/navat-koho (ca92af647 +), pushattu natiivi-backup, työpuu wt/proto-natiiviseppa-kierto.
   - NapaKannet.KalottiVersio = "2026-11-08-striimi" kun ElavaTyyli.Striimi (KalottiVersioPaperi 2026-09-11b muuten).
   - ElavaTyyli.VariPikseli vesiraja: ve = (1−Sile(26,34,rb))·(1−Sile(0,155,0,175,rb/(m+1)))·Sile(140,150,m)·(1−Sile(222,230,m)).
     LÖYDÖS: vanha alaraja 180–190 maalasi SYVÄN MEREN MAAN RUSKEAKSI KOKO MAAILMASSA (z ≤ 10), ei vain navoilla (verrokki tav-etela.png:
     ulkokehä ruskea). Mittaus _tyo/natiiviseppa/navat-koho/varita-raja/ (z4 koko maailma + z6 otoksia; histo.py: maa q ≥ 0,17 myös
     varjossa, meri q 0,10–0,15; z4-maailma-vanha-uusi.png: vasen vanha, oikea uusi; maa ennallaan). HUOM laattojen tiedostonimen y on
     TMS-käännetty (hae.mjs haki {reverseY}:llä): nimen y = 2^z−1−y.
   - Välimuisti: vain pohja z ≤ 10 uudelleen (Laattapalvelin.ElavaKuva "-meri1"); elävät z11+ palat e23 ennallaan.
   - Testi ElavaKarttaTestit.SyvaMeriOnVettaVarjoMaaEi. unity-tarkistus 0, tarkista.sh 0, Kartta 711/711.
   - KS:lle kerrottu kaava (liitossävy pätee). Häive 1,5° jää; jos iPad-kuvissa vyö, pyydä KS:ltä kapeampi versio.
   - AJOPYYNTÖ JU:LLE 11.5x (toimitettu): _tyo/natiiviseppa/navat-koho/ajopyynto-tav2.md, skenaario sk-navat-tav2.txt (tav-etela,
     tav-pohjoinen, tav-maapallo), kansio lokit/natiiviseppa-navat-koho/tav2/, verrokki vanha verrokki/tav-*.png. KUN KUITTAA:
     konsolista "napakalotti etela: 4096×4096" ja "pohjoinen: 2048×2048", parit parit.py (vasen verrokki, oikea tav2) täysikoossa,
     tarkista: meri veden värinen napaan asti, ei häivevyötä 60° S / 80° N, Etelämanner jäänä, maapallossa maa ei vedeksi.
     Sitten parit KK:lle ja PT:lle ≤ 3 riviä; PT:lle myös: vesirajan muutos näkyy KAIKILLA valtamerillä (meri oli ruskea), sha junaan vain PT:n sanalla.
   - Kohokartan UUSI-ajo (ca92af647) JU:lla yhä käynnissä 11.5x (lokit/natiiviseppa-navat-koho/uusi/): lukuohje TILA 11.15 kohta 0 a.
2. TOPOPILOTTI: työpuu wt/proto-natiiviseppa-jarru haara natiiviseppa/topo-esittelyt = 756f4962d (ff NUI:n haaraan, pushattu). Kohta (i) tehty
   (NUI yhdisti itse). NUI:n Mac-tallenne 756f4962d on jo: lokit/nui-topoesittely-1-756f4962d/mac (video, 1227 kuvaa, unity.log). EI UUTTA
   MAC-AJOA ENNEN KUIN TÄMÄ SELVIÄÄ: tallenteessa (a) Alpit-kierto näyttää pysähtyvän ~kuva 650 (arkki _tyo/natiiviseppa/topo-esittelyt/
   arkki-450.jpg, joka 25. kuva 450:stä), (b) Himalajan jatko tauon jälkeen "lento 0.5 s" → hyppy kuvat 990–1010 (erot.txt).
   Epäily: kellot eroavat tallenteessa: TopoEsittely käyttää y.Aika = LinssiOhjain.Aika = Time.realtimeSinceStartup (seinä), kamera
   PalloKierto Time.unscaledDeltaTime; tallenne askeltaa peliaikaa (Esikatselu.TallenneUiKello vaihtaa vain UI-paneelien kellon).
   MITTAA ENSIN (ristiriitaisia merkkejä: Alpit-lento perillä jo ~kuva 575 = 2 s peliaikaa, viittaa seinäkelloon kamerassakin):
   lisää lokiriviin topokierto ja TopoEsittely-tilaan Time.unscaledTime + realtimeSinceStartup + Time.time. Kokeiltu korjaus (EI commitoitu):
   LinssiOhjain.AikaOhitus (static Func<double>), Esikatselu asettaa = TallenneUiAika tallenteen ajaksi. Laitteella kellot samat → vika
   todennäköisesti vain tallenteessa, mutta video menee KK:lle: korjattava ennen pilotin videota. Yhteinen NUI:n kanssa (TopoEsittely NUI:n).
3. KORKEUSKOE (LISÄYS 11.4x alla) EI ALOITETTU: napojen iPad-parin jälkeen.
4. ALOITUSLENTO j4: JU:n pid 53689 yhä jonossa 11.5x; lukuohje TILA 11.15 kohta 2.

## TILA 8.11. 11.35 (VOITTAA kaikki alla olevat; nollaus 25 %:ssa, 7.37)
Cron "4 9 * * *" luotu 11.2x (8cd0539a, session-only): LUO UUDELLEEN. Lukulista 7.47 luettu tässä sessiossa (ei muutoksia NS:n työhön).

1. TOPOPILOTTI, NS-OSA KOODATTU: b1d5c652f haara natiiviseppa/topo-esittelyt (NUI:n 581f7f85a päällä), pushattu natiivi-backup,
   työpuu wt/proto-natiiviseppa-jarru on NYT tällä haaralla (j4:n haara natiiviseppa/striimi-karkea-juna221 ennallaan, käännös JU:lla jo tehty).
   - KohdeKierto + KohdeKiertoOhje (PalloLiikkeet.cs; Pariisin kierto ennallaan): lento 6 s, kallistus jälkiosassa, suuntima 3,6 s:ssa
     lyhintä tietä kierron lähtökulmaan (≤ 90°, suunta lyhyemmän käännön mukaan), sitten 90° 12 s smootherstepillä parhaaseen kulmaan
     (TopoKohde.Suuntima). Koko liike 15,6 s; kyltti näkyy 6–9 s kierron aikana.
   - PalloKierto.AjaKiertaen (Kiertaa kattaa myös topon: ei kallistusrajaa, sormi = pehmeä liuku). LinssiOhjain.TopoKamera = koukku
     (jatko tauon jälkeen), esilataus lennon alussa (LinssienEsilataaja.EsilataaNakyma kohokartan sarja + EsilataaAvaus kiila:false).
     Komento `linssi topografia kierto <°> <s>`. TopoEsittely (NUI:n tiedosto): KameraJatkoS 9,6 s, tauko/jatka/lopeta myös kierron aikana.
   - Testit: unity-tarkistus 0, Linssit 2267/2267 (2 uutta PalloLiikeTestit-testiä), Kartta 710/710. EI VIELÄ KATSOTTU PELISTÄ.
   SEURAAVAKSI: (i) rivi NUI:lle (local_43962c89-fc14-4098-9dd7-6153133ffcea): TopoEsittely-muutos b1d5c652f:ssa, rakenna sen päälle;
   (ii) Mac-esikatselupyyntö JU:lle (10.5: "mitä tämä ratkaisee" = kierto pehmeä ja päättyy kulmaan, kohokartta terävä laskeutuessa;
   ≤ 5 kuvaa: alpit 3 s, 7 s, 15,6 s + himalaja 15,6 s; lokista "topokierto"- ja "esilataus: laatat topo-* valmis N/M (x s)" -rivit:
   jos valmis myöhemmin kuin ~4 s lennon alusta → lento odottaa esilatausta tai aikaraja); video vasta pilotin valmistuttua (KK PT:n kautta).
   (iii) PT:lle ≤ 3 riviä vasta katsottuna. HUOM tilt: kohokartta VapaaKallistus 90 → 55° ei rajaudu; ilman kohokarttaa raja rajaisi.
2. NAVAT: ennallaan TILA 11.15 kohta 0 (UUSI-ajo JU:lla yhä käynnissä 11.34, kääre pid 79836; lokit/natiiviseppa-navat-koho/uusi/ ei vielä).
   KS:n striimikalotti: ei vielä viestiä NS:lle.
3. ALOITUSLENTO j4: JU ajaa (pid 53689, navat-ajon jälkeen) → lokit/natiiviseppa-striimi-aloituslento-4/j4; lukuohje TILA 11.15 kohta 2.

## TILA 8.11. 11.15 (tausta; TILA 11.35 voittaa)
Cron "4 9 * * *" luotu 11.0x (388fa2f9, session-only): LUO UUDELLEEN.

0. NAVAT (kärki; OMISTAJAN PÄÄTÖS 10.34: "tavallisen kartan napa-alueet kuntoon molemmilla navoilla. Meri sininen napaan asti,
   Etelämanner samaan tyyliin kuin muu kartta, ei sumeaa häivevyötä.")
   a) KOHOKARTTA ca92af647 (natiiviseppa/navat-koho, työpuu wt/proto-natiiviseppa-kierto, pushattu): verrokki 5d6967444 valmis
      (lokit/natiiviseppa-navat-koho/verrokki/; ÄLÄ käytä VANHA-*/VIKA-*-kansioita). UUSI-ajo JU:lla (kääre pid 79836) → lokit/.../uusi/.
      KUN KUITTAA: python@3.14 _tyo/natiiviseppa/navat-koho/parit.py (vasen verrokki, oikea uusi), täysikoossa, konsoli.txt "kohokansi
      mitattu N/16" (16/16). Parit KK:lle (local_37f7c945-e1a0-4638-90b8-93c389a36fbe), PT:lle ≤ 3 riviä; sha junaan VAIN PT:n sanalla.
   b) TAVALLINEN KARTTA: selvitys _tyo/natiiviseppa/navat-koho/tavallinen/TULOS.md (lue). Kalotin Varita-väritys ei toimi, pohjalaatoissa
      ei Etelämannerta. PT 11.10: KS polttaa striimikalotin uuteen versiokansioon ja ILMOITTAA SINULLE SUORAAN. Sitten NS: NapaKannet
      (navat-koho-haara, NapaKannet.cs) KalottiVersio/polku striimiversioon, kun ElavaTyyli.Striimi (vanha versio, kun ei), ja häive
      kapeaksi (kalotin kuvan oma alfa = KS:n HAIVE_AST; pyydä KS:ltä kapea, esim. 0,3–0,5°, tai rajaa kalotin rengas pelissä).
      Tarkistukset, sitten iPad-pari JU:lla (tav-etela, tav-pohjoinen; skenaario sk-navat-ipad.txt), KK:lle ja PT:lle.

1. TOPOKOHTEIDEN ESITTELYT, PILOTTI Alpit + Himalaja (OMISTAJAN PÄÄTÖS 11.04 PT:n kautta; navat ensin). Suunnitelma ja selvitys:
   /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261108-topokohteiden-esittelyt.md (+ -selvitys.md).
   NS-osa: "linssin kameraan suunta ja osittainen kierto, esilataus ennen laskua" + kameratestit.
   - KIERTORISTIRIITA TARKISTETTU, raportoitu PT:lle ja KK:lle 11.1x: ei ristiriitaa (2.69 = omistajan 17.10. "kameran kääntely oman
     akselinsa ympäri", museossa; 4.24 sallii orbitin; 2.210 Pariisin kierto). Pilotti: hidas ~90° kierto kohteen ympäri, katse kohteessa.
   - SUUNNITELMA (ei vielä koodia; pohja natiivi-backup/julkaisija/juna-221 5d6967444 tai uudempi, oma haara natiiviseppa/topo-esittelyt;
     työpuita jo 3: käytä wt/proto-natiiviseppa-jarru, kun j4 luettu, tai kierto-työpuuta navat-työn välissä):
     a) Linssit/Ydin/Kamera/PalloLiikkeet.cs KiertoOhje: lisää LoppuSuuntima (oletus 0) ja KierrosAst (double?, null = Pariisin täysi
        käytös ennallaan) + KierrosS. KiertoLasku: KierrosAst-tilassa suuntima liukuu smootherstepillä alusta S0 = Loppu − Suunta·KierrosAst
        (Kulmat.Ero lyhintä tietä), ei vakiovauhtia. KaupunkiKierto: KierrosAst-tilassa Suuntima = KiertoKayra.Arvo(alku, 0, alku +
        Suunta·kulma, 0, KierrosS, t/KierrosS) (kulma = Suunta·(Loppu − alku) normalisoituna, EI +360), Hiivu = pysähdys paikalleen
        (p1 = s + v·kesto/2), ei pohjoiseen. Pariisi ennallaan (oletusarvot): tarkista PalloLiikeTestit.
     b) Kartta/PalloKierto.cs: AjaKiertaen(lat, lon, korkeusM, kestoS, KiertoOhje, valmis) AjaKeskustaanKiertaen-mallilla (rivi ~1978):
        Aja(..., kallistukseen: ohje.Kallistus), ajo.kiertoOhje, kiertoLoppu = (lat, lon, korkeus), kohtiPistetta, pohjoiseen = false,
        palautus = null, lennonSuuntima = false, kiertoLiukuAika = −1, kiertoKaynnissa = true. Etene (rivi ~2243) ketjuttaa jo
        KiertoLasku + KaupunkiKierto. Sormi katkaisee (PaivitaKiertoLiuku).
     c) Linssit/Ydin/LinssiSopimus.cs ILinssiYmparisto: uusi AjaKameraKiertaen(Nakyma kohde, float lentoS, double loppuSuuntima,
        double kierrosAst, double kierrosS, int suunta = 1, double kallistus = 55). Toteuttajat: Linssit/Unity/LinssiOhjain.cs (→ PalloKierto),
        Linssit/Ydin/Aikajana/IhmisenMatka2Ymparisto.cs, Pysakkiajo.cs, Aanet/KeksintojenAanet.cs, Peli-testit/Testit/AaniTestit.cs (vale).
     d) Esilataus ennen laskua: KarttaKerrokset.EsilataaKohde(latMin, latMax, lonMin, lonMax, lat, lon) (rivi 1391) tai EsilataaAvaus
        (1588, etäisyys + kallistus + suunta = juuri topon loppunäkymä) + kohokartan sarja (Topografia.KohokarttaSarja); lento alkaa, kun
        Esilataus valmis tai aikaraja. Lue ensin EsilataaAvaus: kattaako rasterilinssin sarjan vai vain pohjan.
     e) Kameratesti CI:hin (4.24: jatkuvuus, pehmeä alku/loppu) PalloLiikeTestit-malliin; komento esim. `topo kierto <lat> <lon> <kaari>
        <loppusuunta> <kierros>` Komennot.cs:ään Mac-esikatselua varten (KS:n kehykset: Alpit 46/10 kaari 14°, Himalaja 30/84 30°, kallistus 55°).
     Kehys 250–1 500 km, kallistus 50–60°. Kuvat/video vasta JU:n vuorolla; pilotin video KK:lle (PT:n kautta).

2. ALOITUSLENTO (striimi-karkea, ei junaan ennen kuin a terävä): j3 LUETTU (SK/tulos.md "UUSINTA 3", SK/parit/laite-3/): odotus 1,50 s
   liukumalla (sama lähtö kuin n2), etuala yhä sumea. j4 = 491bec23b (46d34ca4f + pyyntölokin lippu kertakäyttöiseksi), ajo
   SK/aloituslento-ajo-4.zsh, ajopyyntö SK/ajopyynto-aloituslento-4.md; JU jonossa (T/ns-aloituslento6.zsh pid 53689, navat-uusi-ajon
   jälkeen) → lokit/natiiviseppa-striimi-aloituslento-4/j4. KUN KUITTAA: pyynnot.tsv (aika, luokka, polku, lähde, tila, ms) kuvan a
   hetkeltä (konsolin "lento v3: odotus" + 9,5 s; kello = PyyntoLoki-kello sovelluksen alusta, sovita merkkiriveihin "verho ... lähti"):
   mitkä etualan palat (z, lähde) kesken tai hitaat. Sitten korjaus ja PT:lle ≤ 3 riviä.

3. MERENPOHJA 3D (helmat mitattu, KS:n poltto) ja j3:n kohdat alla ennallaan.

## TILA 8.11. 10.45 (tausta; TILA 11.15 voittaa)
Cron "4 9 * * *" luotu 10.1x (session-only): luo uudelleen.

0. KÄRKI: NAVAT (OMISTAJAN PÄÄTÖS 10.34 PT:n kautta, jonon kärkeen ennen merenpohjaa ja j3:a): "tavallisen kartan napa-alueet kuntoon molemmilla
   navoilla. Meri sininen napaan asti, Etelämanner samaan tyyliin kuin muu kartta, ei sumeaa häivevyötä." Omistajan kuva
   /Users/Shared/Claude/Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261108/napa-etela-iphone.png (= KOHOKARTTA).
   - KOHOKARTTA TEHTY, PT kuittasi: ca92af647 haara natiiviseppa/navat-koho (juna-221 5d6967444 +; työpuu wt/proto-natiiviseppa-kierto, pushattu
     natiivi-backup). Syy: KarttaKerrokset.PaivitaNavat tunnisti vain Topografia.Kerros, ei KohoKerros → paperikalotti 60° S päällä.
     Nyt NapaKannet.Kohokartta(bool, sarja): kalotti/kansi/reliefikansi pois, kohokansi napa–85,0°, häive 0,4°, väri mitattu sarjan z3 reunalaatoista
     (64 näytettä, lokirivi "kohokansi mitattu N/16"). Tarkistukset 0.
   - TAVALLINEN KARTTA AUKI (PT 10.4x: kuuluu samaan korjaukseen): striimivärinen pohja (ElavaTyyli.Varita, vesi 169/170/147) vs paperikalotti
     (KalottiVersio 2026-09-11b, reuna 80° N / 60° S, kuvan ulkokehä häivytetty) → eri värit ja häivevyö. Ehdotus: kalotin kuva Varitalla
     samaan väriin kuin pohja (LataaKalotti purun jälkeen, taustasäikeessä; esikerrottu RGBA: väritä rgb/alfa) ja häive kapeaksi, tai
     kalotti vain > 84° kuten kohokansi. Katso ensin JU:n lähtökuvat tav-etela/tav-pohjoinen.
   - iPhone-ajo JU:lla: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/navat-koho/ajopyynto-iphone.md (koho + tavallinen, verrokki 5d6967444),
     kuvat lokit/natiiviseppa-navat-koho/. Parit itse katsottuna KK:lle (local_37f7c945-e1a0-4638-90b8-93c389a36fbe), tulos PT:lle ≤ 3 riviä;
     sha JU:lle junaan VAIN PT:n sanalla.

0b. NAVAT-AJO (JU 10.45): iPhone ei kytketty → iso iPad (sk-navat-ipad.txt), verrokki 5d6967444 ja uusi ca92af647, myös tavallisen kartan kuvat tav-etela/tav-pohjoinen (NS pyysi). Kuvat lokit/natiiviseppa-navat-koho/{verrokki,uusi}/. KK:n iPhone-pari myöhemmin, kun puhelin kytketty.
j3: odotus 1,50 s liukumalla, käytävä 68 %.
A0. J3 AJETTU (JU 10.41, tuli luovutuksen jälkeen): KYLMÄ ok, kuvia 3/3, käännös 46d34ca4; koosteita 799 (99 899 ms: haku 77 069, purku 16 932), levyltä 358, ETUKÄTEEN 219. Kansio lokit/natiiviseppa-striimi-aloituslento-3/j3. LUKEMATTA: tee parit n2|j3 ja katso a:n etuala (ohje alla).
A. ALOITUSLENTO (striimi-karkea junaan 221): uusinta 2 LUETTU (tulos SK/tulos.md "UUSINTA 2", parit SK/parit/laite-2/): koosteet 0,93 → 0,11 s/kpl,
   j2 käytävä 100 %, b terävä, s1 ok, a:n ETUALA YHÄ SUMEA. PT kuittasi; ei junaan ennen kuin a terävä.
   Korjaus 46d34ca4f (natiiviseppa/striimi-karkea-juna221, työpuu wt/proto-natiiviseppa-jarru): Laattapalvelin.KoosteetEtukateen, käytävän
   alku/loput latauduttua vanhemmat z−1 levylle (EnnakkoRinnakkain 2) + aloitusnäytön esilämmitys; elavakartta "etukäteen N".
   UUSINTA 3 JU:lla (jonossa PK:n ajojen ja navat-ajon jälkeen): SK/ajopyynto-aloituslento-3.md, skripti SK/aloituslento-ajo-3.zsh (vain j3,
   verrokki n2 ajosta 2), loki lokit/natiiviseppa-striimi-aloituslento-3/j3. KUN KUITTAA: KYLMÄ-rivi, "lento v3: odotus", koosteet-rivi
   (etukäteen N), parit M/pari.py n2|j3 → SK/parit/laite-3/, a:n alaosan rajaus (0,1100,1366,2048) täysikoossa.
   HUOM odotus: j2 3,19 s "valmis, pallo kesken" ilman liukumaa (napautusnäkymä = valintanäkymä), n2 1,51 s liukumalla: eri lähtönäkymä,
   ei koosteen vaikutus; kerro PT:lle, jos j3:ssa sama (omistajan "kone lähtee heti").
   Jos a terävä → pari KK:lle, PT:lle ≤ 3 riviä. Jos yhä sumea: tarkista PyyntoLoki-lipulla, mikä taso etualalla odottaa (z ≥ 9 ei ole koostetta).

B. MERENPOHJA 3D: PalloReiat 11 km tehty jo osassa 3 (51b0d3588). HELMAT mitattu KS:n koelaatoista: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/
   merenpohja-3d/TULOS-helmat.md (skripti helmat.py, data helmat-koe.json): 25 rakoa vain 2–3 tason hypyissä (9–6, 9–7), Himalaja 21, Mariaanit 2,
   suurin 667 m yli helman; korostus ei muuta peittoa (h = r − säde, k·h kasvava). Pelissä helmaa ei voi pidentää → korjaus KS:n polttoon
   (karkeiden z ≤ 7 reunat enintään ~700 m z9:n alle). PT:lle 10.24. KS polttaa koko maailmaa (KK hyväksyi kentän); kun VS, NS, NUI valmiit,
   pelin parit 1–5 KK:lle (PT). Kun koko maailma valmis: aja helmat.py sille (python@3.14 ilman -I).
   AUKI ennallaan: 97b4f29a9 (VS) vs 7626170dd (NUI) shadergraph-riita PT:llä.

## TILA 02.25:N KOHDAT 1-5: KAIKKI TEHTY (ASTC ja vaihe 1 junassa 221, valitsin n4 ok, striimi-ajo luettu).

## VANHEMPIEN LUOVUTUSTEN KOHDAT (01.19 ja 00.39), YHÄ TAUSTANA (TILA 08.24 voittaa: muistityön kohdat on ratkaistu yllä)
## STRIIMIKARTTA KARKEAMMAKSI: KUVAT VALMIIT, PT:LLE 00.0x (ODOTTAA PT:N SANAA)
Kytkin 681325154 haara natiiviseppa/striimi-karkea (juna-221 3bfd18d9a +), pushattu natiivi-backup; EI JUNAAN. Työpuu wt/proto-natiiviseppa-jarru on nyt tällä haaralla
(muisti-jarru 26423a0e4 on pushattu ja ennallaan haarassaan). Kytkin: iPad Documents/striimi-karkea.txt "2", Mac MATKAKIRJA_STRIIMI_KARKEA=2; Mac lisäksi MATKAKIRJA_LATAUSRAJAT="20 20 20".
Kerroin x2: pallon SSE 20->40 JA pallon rasterien näyttövirhe 2->4 (Cesium mitoittaa rasterin palan virheestä ja tilesetin SSE:stä: pelkkä SSE ei karkenna kuvaa).
Tulos, parit ja rajaukset: _tyo/natiiviseppa/striimi-karkea/ (tulos.md "TULOS", parit/). Pariisi 45° selvästi pehmeämpi, saapuminen hieman, lähin ei juuri;
aloituslento a ja b KOE siistimpi (NYT latautumattomat lohkot ja Pariisin laikku); maapallolla koristeet 2x isompina = nostotaso on pallon rasteri (korjaus: nostokerros pois kertoimesta).
PT:lle 00.0x (jonossa). Seuraavaksi PT:n sanalla: muistiero iPadilla JU:n vuorolla MUISTIJONON JÄLKEEN (kytkintiedosto Documentsiin ennen käynnistystä, verrokki ilman).
Mac-OPPI: kuvan otto pysäyttää esikatselun kellon, mutta lento jatkuu reaaliajassa: lentohetket lokiriveistä (oleta-uusi "ilmakehä täysi" + odota, oleta "loppulaskeutuminen"),
ei odota-peli-ajoista. Ensimmäinen kuva ennen kameran liikettä on 640x480-valinnalla ("liikevalinta: paa (alku)"): ota kuva vasta kun lokissa "liikevalinta: varjo". Skenaariot sk-striimi-karkea(-2).txt.
Beetaseurannan cron "4 9 * * *" luotu 8.11. 00.2x (session-only, uusittava nollauksen jälkeen).

## TYÖ NYT: MUISTITYÖ. ODOTTAA JU:N ASTC-UUSINTAA JA PT:N SANAA. EI UUTTA TYÖTÄ ENNEN NIITÄ.
JU kuittaa ASTC2:n suoraan NS:lle (jonossa 00.34, pid 96222: laitekäännös L2 821e5ba74 -> lokit/julkaisija-laite-218-821e5ba74, sitten iPad-lukolla "astc-ajo.zsh <app> 2 a", loki T/ns-yksi-ASTC2/ajo.log; PK:n latauspari ja VS:n vesikerros kilpailevat lukosta). Jos kuittaus tuli jo ennen tätä luovutusta, se on viesteissäsi: lue se.
1. TEHTY: napakalotit junassa 2f64c2eee. Vaihe 0 mittari luettu ja raportoitu (M/tulos.md "Vaihe 0").
2. LATAUSRAJA 64/40/40 PÄÄTTYI (PT 23.0x: ei korjausta, ei lisäparia).
3. V TASO 1 luettu (ei nettopurkua). V RAJA 26423a0e4 natiiviseppa/muisti-jarru (pushattu natiivi-backup): ajettu ja luettu 23.31, PT:lle 23.32, EI VIELÄ KUITATTU: nettopurku toimii (lepo fp 3306 vs 3978), ei aukkoja, kehys ennallaan, hinta noin 35 % enemmän uudelleenlatausta kierrossa. tulos.md "V raja", M/raja-parit/. EI JUNAAN ennen PT:n kuittausta.
4. VAIHEET 1, 2a, 2b (10604363c natiiviseppa/muisti-vaihe12): LUETTU JA RAPORTOITU PT:lle 00.40, ODOTTAA PT:N SANAA. Tulos tulos.md "Vaiheet 1, 2a, 2b: TULOS", taulut vaihe12-taulu.py, parit M/vaihe12-parit/ (vasen v1, oikea y1/a1/b1; k80-hor-*.png horisontti v1|b1). Vaihe 1 huippu -200…-250 Mt (3812-3860 vs 4063-4110; v2 laukaisi vahdin 4090); 2a levossa noin -600 Mt, ei laske 80°:n huippua (3924); 2b: CesiumTileExcluder toimii iOS:llä (poissa 850-3383), piirto 80°:ssa 505 -> 219, muistihyöty hajonnan alla; kuvissa ei aukkoja eikä beigeä reunaa. v1/b1 muisti-tarkka.log 0 tavua (vain huiput ja kuvat). SUOSITUS PT:lle: vaihe 1 + 2a junaan (2a Rakennus.cs:ään, LuoPallo ylikirjoittaa kohtauksen), 2b ei (ruutuaikahyöty mittaamatta; näkyvä muutos vain omistajan kortilla). PT:n Kyllä -> junavuoro: kytkimet pois (MuistiKoe, Juoksu-rivi, MuistiKevennys, PalaTilasto ym.), vain varsinainen muutos.
5. VAIHE 3 ASTC: ENSIMMÄINEN AJO (581b9ad07, JU 23.32-00.19) VIRHEELLINEN, PT:lle 00.33. Atlas jäi lataamatta: LuoMalli kutsui Resources.UnloadAssetia ASTC-verkolle ennen "astcVerkko != null" -tarkistusta (purettu TextAsset on Unityn vertailussa null) -> varapolku luki kuvattoman verkon, "RGB24 8x8, atlas ei avaudu", mallit harmaita (kv|ka sainte-chapelle-lahi katsottu). Normaalit latautuivat ASTC:nä (2-4 ms vs 16-56 ms). KORJAUS 821e5ba74 natiiviseppa/muisti-astc (pushattu natiivi-backup; työpuu wt/proto-natiiviseppa-kierto): bool astc ennen purkua, LogErrorit LogWarningiksi (LogError ei näy muisti-tarkka.logissa). Tyyppitarkistus ja unity-tarkistus (sh) 0 virhettä. astc-ajo.zsh: 3. argumentti a = vain a$R + ka$R, kuvat vain Sainte-Chapelle, Riemukaari, Notre-Dame (6 kuvaa); verrokit v1 ja kv kelpaavat (PNG-polku sama).
   KUN JU KUITTAA ASTC2: tarkista ensin a2/ka2 "nähtävyyslataus ... ASTC_4x4 2048x2048" (ei 8x8, ei "atlas ei avaudu"), kytkinrivi. Sitten fp v1 vs a2 (alku, notre-dame…, loppu, keskusta; T-rivin currentTextureMemory, Texture2D Mt), "nähtävyyslataus" ms. Kuvat kv|ka2 *-lahi.png ja *-matala.png täysikoossa samoista rajauksista (M/pari.py a b ulos: vierekkäin + keskiero; M/kaista.py y0 y1 x0 x1 ulos kuvat...: rajaukset päällekkäin; Python numpyllä); suunta ja värit ensin, Sainte-Chapelle ja Riemukaaren normaali ensin (heikoin PSNR); lohkoja normaaleissa -> --normal_map vaatii varjostinmuutoksen. Tulokset PT:lle ≤ 3 riviä. Junaan vasta omistajan päätöksen jälkeen: "Näkyvä muutos vain omistajan kortilla kuvaparista." ASTC junaan: simu ei tue ASTC:tä, PNG-vara vain simukäännökseen; sovellus noin +52 Mt (LASKETTU); puiden atlas ei kokeessa.
LYHENNYS (PT 22.1x): lisäkierros vain, jos ero jää hajonnan 140 Mt alle; luvut yksittäisinä ajoina. Lyhyet ajot (Raamattu 10.5): pyyntöön "mitä tämä ratkaisee", enintään noin 5 kuvaa.
Suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261107-muistisuunnitelma.md. KAIKKI TILA: M/tulos.md ja M/ajopyynto-ipad.md. Lokit L/natiiviseppa-muisti-12, -3-astc, -v-raja.
Rajoitukset, jotka kerrotaan: jarrun oikeaa hätää ei ajeta; 64 40 40 vain Pariisin aloituslennosta; vaihe12 ei aja NUI:n tarkistuksia (lipputanko, opas, valitsin, raketti, raportti _tyo/natiivi-ui/raportti-muisti-vaihe1-20261107.md) eikä astronautin ensiavauksen pilviviivettä. PK:N PYYNTÖ (local_91a1bc27-6870-46aa-9886-66fd33b68880): jos ajo avaa juoksupelin komennolla ilman pelilistaa, kerro rivi "latauskuva näkyy ... odotus X s" (verrokki iPad 0,09-0,16 s) ja muistiero.
Koehaarat eivät kuulu junaan: PalaTilasto, latausrajat.txt, MuistiKuva, napat-pois.txt, MuistiKoe, Juoksu-rivi, MuistiKevennys, koekomennot, NahtavyysAstc. unity-tarkistus: sh Peli-testit/unity-tarkistus.sh. Tyyppitarkistus: kopio P/valmis-origo/tyyppitarkistus-tyopuu.zsh, vaihda W ja S (sed).
PT 21.2x: 630 Mt on muistikuvan aukko, ei kadonnutta muistia. Katto: PT kuittasi koe13:n päättyneen oikein; v20 jää, päätös KK:n kautta omistajalle.

## PARIISIN MUISTI: ENSIMMÄINEN AJO (tausta; raportoitu PT:lle 21.00)
Tulos _tyo/natiiviseppa/pariisi-muisti/tulos.md (loppu "TULOS, ajo 0b"), parit pariisi-muisti/parit/, purku kuva1/kuva2 + csv samassa kansiossa. Kokonaissuunnitelman tekee KK. MuistiKuva ja kytkimet eivät mene junaan. Odottaa PT:n tai KK:n sanaa: latausrajat (LuoPallo ylikirjoittaa kohtauksen, 40/64 ei ole koskaan päätynyt käännökseen; EI KORJAUSTA ilman sanaa); napakalottien kevennys. muistikuva/pura.zsh on nyt U = b8. ajo.zsh hakee vanhan muistivahti-tuloksen, kun vahti on pois: korjaa ennen uusintaa.
## KATOT: KOE13 PÄÄTTYI, V20 JÄÄ (PT kuitannut; EI UUSIA KOKEITA)
JONOSSA, EI NYT (PT välitti OMISTAJAN PÄÄTÖKSEN 21.41): "katon muodoissa v20 pysyy, muotokokeet tauolle, mansardit vain hänen sanallaan. Muistityön jälkeen koe: koodilla piirretty kuvio katoille yhdellä alueella, kuvaparit läheltä ja kaukaa, kaukana häivytys, ei junaan ilman korttia. Värit jatkuvat talotyylikokeessa; KK:n arvaus: saman korttelin värien lähentäminen voi vähentää liitosten näkymistä."
LUE _tyo/natiiviseppa/talotyylit/tulos.md LOPPU. PT 21.1x: koe13 oli VIIMEINEN koe; jos mittari ei täyty, v20 jää ja päätös menee omistajalle PT:n kautta. Ei koko Pariisia, ei Lontoota, ei junaan.
JUURISYY (PT hyväksynyt): tee-palat.py lisaa(): `if ala(r)<0:r.reverse();ulko=ulko[::-1]` antaa avain[i]=r[i-1]: naapuritieto yhden reunan väärässä kohdassa. 18 488 / 127 983 taloa (14,4 %), 604 km naapurireunaa; koealueella 1 375 / 1 460. Mukana v20:ssä ja saman rivin kautta tee-palat-lontoo.py:ssä. EI korjattu kummassakaan.
KOE12 (palat-v21-koe12-katot, kuvat/koe12/): mansardin jatkuvuus v20:tä parempi; hampaat (piikit väliseinien päissä, sulun pystykulma; koodista ja kuvasta, ei ajolla todistettu) ja raot (r85:ssä 2) huonommat. Kaukaa 45°: dL -2,24, L-hajonta 7,3/6,6.
KOE13 EI AJETTU PT:n ehdolla: ilman sulkua vähintään 0,5 m:n avoin porras 15,5 km:llä (54 % yhteisistä seinistä), ilman kiilaa kansi yli 0,5 m reunasta 9,3 km:llä. Koe13:n muutos: pariisi-talot/tee-palat-koe13-ei-ajettu.py, talotyylit/paivita-koe13.py. pariisi-talot/tee-palat.py = koe12 (kopio talotyylit/tee-palat-koe12.py).
R85:N KAKSI RAKOA EI SELVINNYT KOHDALTA (kerrottu PT:lle): sijaintinaapuri ja alle 3,5 m:n vapaat välit poissuljettu. Kamera r85: suunta 315, 343 m taakse, silmä 80, f 1966 (kuva 2752), horisontti y 860; perspektiivi-skripti oli scratchpadissa, ei säily.
Mahdollinen jatko vain PT:n tai omistajan sanalla: uusi tapa (korttelin yhteinen kattokorkeus tai vino sulku).

## AUKI, ODOTTAA MUITA (ei toisteta, ei tehdä ilman sanaa)
- Yksi taso: koe jää haaraan, 80°:n kevennys auki. Julkisivu: PT/KK:n sana, ei junaan. Palikkakirjasto: odottaa omistajan korttia (Pariisi valmis + muisti). Kameraeste ea5823b4f: ei junaan. Sumea alue: aamun kysymys KK:lla, ei yrityksiä. Meri: VS:lle PT:n kautta.
- Muisti: PT 17.1x: ei A/B-ajoa, yhteisajo mittaa junan. Tulos _tyo/natiiviseppa/muisti-7-b8/tulos.md.
- iPhone-katto 901e4004b junassa 220; JU katsoo hypyn iPhonella; jos näkyy, korjaus NS:lle.
- Työpuita wt/-kansiossa yli rajan: kerro PT:lle ennen poistoja.

- Tärinä: iPad 4 A0, 0 palaa, thermal 0: GPU 13 → 29 ms noin 3 min:n kohdalla, huippu 37, 10 min:n tauon jälkeen 11,6; kolmiot ennallaan; seisova kamera kuvaero 0,000. Syy auki. Muistipiikki t 20 s: 3660 (0 palaa) | 4039 (3b); iPad 3b VIKA 4106 ≥ 4080, huippu 4220. Skriptit P/selvitys-muisti-3b/.
- r3-rata oli viallinen (zoomirajan nosto, 4,15 m/ms): r4 = 60 m/s, pelaajaa ei koske. Pelaajan veto 156–209 m/s lähimmällä zoomilla. Silmä 56 m kartan yllä, alle ND:n tornien.
- Iso iPad on Forward+ (Ultra_Renderer mode 2), muut Forward. iPad 1 r3: B2−A0 +8,34 ms, kolmiot 1,06 → 2,03 milj.
- Näkyvä vesi: Z14 + ND:n pohjakuva; maski P/selvitys-tolpat/nakyva-vesi-alueet-2m.png, poisto poista-vedesta.py. Jos KS muuttaa kanavaa tai ND:n pohjaa: nakyva-vesi.py, alue-vesi.py ja poisto uudelleen. tee-palikat.zsh:n jälkeen poista-omat-sillat.py.

## Opit
- KOEARVO EI RAJALLE: "koe 700" jäi tasolle 2, koska palautus vaatii yli 0,5 + 0,2 Gt; kuva j-taso1 oli siis taso 2:ta. Lue hystereesi ennen koearvoa. Taso 1:n väite vain tason 1 lokirivistä.
- VAHDIN KATKAISU ERI ASIA KUIN SARJAN KATKAISU: v1:n kuvat oli jo otettu, ja exit 3 vei silti kuvat ja viisi muuta ajoa. Verrokki voi itse ylittää 4080; mittaa kokeen tarve verrokista ja päätä vahti ennen sarjaa.
- ASTC-OPIT: TextureConverter ei käännä rivejä; kuvan oma lähde on materials[0], ei images[0] (GLB:ssä on muita kuvia); KTX --decompressed antaa RGBA8:n. Kartta ei näe DioraamaAstc:ia. Verrokin suodatus pidettävä samana, muuten ero ei ole pelkkä pakkaus.
- LUE KÄYTTÄJÄ ENNEN KEVENNYSTÄ: suunnitelman "DC3 lennon alussa" oli turha; v3 ei käytä sitä lainkaan. grep kaikki kutsupolut, ennen kuin suunnittelet latausta.
- VERROKKI VAPAA UUDELLEENLUONNISTA: "maasto lataus" luo pallon uudelleen; siksi kesken ajon annettuna tulos ei erota rajaa luonnista (z10-tulos). Kytkin ennen tilesetin ensimmäistä päivitystä samalla käynnistyksellä. Asettimet luovat tilesetin aina uudelleen (Valmius.cs:165), suspendUpdate ja kamerat eivät.
- SEIS EI PURA: Cesiumin suspendUpdate palaa Updatesta heti, joten mitään ei pureta; siksi jarrussa pulssi. Muuten kartta voi jäädä jumiin (R5 10.10.).
- KOORDINAATTI ENNEN KOETTA: kaksi rengasta, joiden pitää kulkea rinnan (r ja avain), voi käännös siirtää yhdellä. Tulosta reunan pituus ja naapurin avain rinnakkain, kun naapurilogiikka näyttää oudolta: osa koe4-11:n syistä (raot, V-urat, puuttuvat mansardit) oli tämän seurausta; värisyyt eivät. Koe8:n "seinillä ei samoja solmuja, 31 km" oli sama vika (todellinen 435 m).
- LAASTARIN POISTO VAATII MALLIN ENSIN: kiila ja sulku paikkasivat myös aitoja korkeuseroja, joten poisto olisi avannut 15,5 km rakoja. Laske portaat ennen ajoa.
- KÄÄNNÖS EI LUE KOHTAUSTA: proto-kaanna.sh ajaa LuoPallon, joka tallentaa Pallo.unity:n koodista. Kohtauksen arvot tarkistetaan käännetystä Data/level0:sta; asetus kuuluu Rakennus.cs:ään. Mac-esikatselu taas avaa kohtauksen gitistä.
- UNITY-OLIO PURUN JÄLKEEN ON NULL: Resources.UnloadAsset/Destroy tekee oliosta Unityn vertailussa nullin; tallenna tila booliin ennen purkua (ASTC a1/ka 8.11.: atlas ohitettiin hiljaa). LogError ei näy muisti-tarkka.logissa: kokeissa LogWarning.
- VAHTI POIS = VANHA TULOSTIEDOSTO: laitteelta haettu muistivahti-tulos voi olla edellisen ajon; katso aika.
- LOPUT OPIT (esim. Unity = ECEF -akselit, laitekansiot eivät tyhjene, kiinteät viiveet, mittarit): /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/opit-vanhemmat.md: lue.
- KYTKIMEN PAIKKA RATKAISEE, NÄKYYKÖ KOE: taso 1 ei purkanut, koska reitillä ei ollut sitä, mitä taso 1 poistaa. Lue koodista, mitä kytkin koskee, ja valitse reitti sen mukaan ennen ajopyyntöä.
- zsh-FUNKTION SILMUKKAMUUTTUJA ON GLOBAALI: for i kaynnista()-funktiossa nimesi seuraavan ajon kp2:ksi. local i aina funktioon.


## LISÄYS (PT luovutuksen jälkeen): TOPOPILOTIN KOUKKU VALMIS
PT: NUI:n topoesittelyjen pilotti 581f7f85a (haara natiivi-ui/topoesittelyt-221) antaa koukun TopoEsittely.Kamera (suunta + kierto).
Kytke siihen hyväksytty ~90° kierto kohteen ympäri (TILA 11.15 kohta 1 a–e), kun navat ovat odotuksella. Rakenna NUI:n haaran päälle
(lue ensin TopoEsittely.cs: mitä koukku antaa ja milloin kutsuu), älä tee omaa ILinssiYmparisto-rajapintaa, jos koukku riittää.
TEHTY 11.3x: b1d5c652f haara natiiviseppa/topo-esittelyt (TILA 11.35 kohta 1); koukku riitti, ILinssiYmparistoa ei muutettu.

## LISÄYS 11.4x: PT:N JONO (OMISTAJAN PYYNTÖ 11.19, KK:n välitys, NAPOJEN JÄLKEEN)
Omistaja: "Voisi miettiä pientä liioittelua korkeudesta jopa perus karttaan jos sitä on helppo kokeilla. Varsinkin lentokohtauksessa vuoret näyttäisi upealta."
PT: koe peruskartan KorkeusKerroin (nyt Oletus 2, build 10) suuremmaksi, esim. 4, VAIN LENTOJEN AJAKSI (Pariisin tasoitus 6.11. ennallaan,
siirtymä pehmeä). Oma haara, ei junaan ilman korttia. Pari 2 | 4 JU:lla: lento Alppien yli + lento maapallolta → PT:n kautta KK:lle.
Lähtökohta: Matkakirja.KorkeusKerroin (Aseta(k, georeferenssi), Arvo; Topografia.AsetaKerroin käyttää samaa) – lue ensin, miten Pariisin
tasoitus ja kohokartan kerroin sitä käyttävät, ja tee lennon kerroin liukuvaksi (lennon alku/loppu).

## LISÄYS 11.4x: NAVAT b) VOI ALKAA (KS ja PT, ENNEN korkeuskoetta)
KS (local_740947d7-aa79-4b1e-948e-1b7dfc734364): napakalotit striimiväreissä ämpärissä julisteet/pallo/napakalotit/2026-11-08-striimi/ (pohjoinen.webp 2048,
etela.webp 4096, kalotit.json; CDN 200; KS:n koodi PR ravelius/Matkakirja#6496, PT: c8cf3c783). Kytke KalottiVersio = "2026-11-08-striimi" kun
ElavaTyyli.Striimi (pääte webp, reunat 80° N / 60° S ennallaan, kuvan oma alfahäive 1,5°), muuten vanha versio; häive kapeaksi.
KS:N LÖYDÖS (PT: korjaa): Varita pitää vetenä vain keskiarvon 180–222; napojen syvä meri laatoissa 179/174/156 (58–70° S, 84° N) → pelissä maan
ruskea 186/171/143 (myös verrokin tav-etela.png ulkokehä); 58–65° S vain 1–10/360 meripistettä vedeksi. Ehdotus: Varitan vesikynnyksen alaraja
140–150 ja R−B < 26 erottaa meren. Jos kaava muuttuu toisin, kerro KS:lle (uusi kalottiversio puolessa minuutissa).
Taulukko ja kuvat: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa-napakalotit-20261108/TULOS.md (+ esikatselu-*.png).
Sitten iPad-pari JU:lla (tav-etela, tav-pohjoinen; sk-navat-ipad.txt) → PT; sitten korkeuskoe (yllä).

## LISÄYS 11.5x: TOPO-POHJA VAIHTUI (NUI)
NUI yhdisti 756f4962d (natiivi-ui/topoesittelyt-221) = b1d5c652f + 6c27282e1 (kyltti vasta kun kamera perillä: Perilla(), koukun kanssa vain
lat/lon 5 % kaaresta, varmistus 3 × LentoS) + 48e5654ae (kyltin kerros); 2268/2268. JATKA TOPOA 756f4962d:N PÄÄLTÄ (ei b1d5c652f:stä).

## LISÄYS 11.5x (JU luovutuksen jälkeen)
Kohokartan UUSI-ajo ca92af647 11.47: 0/4 kuvaa, iPad "failed to launch 10002" 6/6 (ohimenevä, kuten NUI:n aamulla). Uusinta JU:lla (pid 97997) → lokit/natiiviseppa-navat-koho/uusi; sen jälkeen aloituslento j4 (käännös 491bec23b valmis); tav2-ajo (ffc355105) niiden jälkeen JU:n vuorolla.
JU 11.5x: tav2-ajo jonossa (T/ns-navat-tav2.zsh pid 34071), laitekäännös nyt, iPadille navat-uusi-uusinnan (97997) jälkeen; napakalotti-rivit jonolokiin; kuittaus NS:lle.

## LISÄYS 11.5x: PT:N UUSI TYÖ JONOON (navat → TÄMÄ → korkeuskoe)
PT: OMISTAJAN PYYNTÖ 11.47 + PÄÄTÖS 11.55 "Lähestyy" (kamera lentää hyvälle katseluetäisyydelle, jos kauempana; lähempää ei loitonneta). Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261108-nahtavyyden-napautus.md (LUE).
NS-osa 1: PalloKiertoon YHTEINEN esittelyliike (keskitys Aja/Panoroi-pohjalta → hidas kierto Kuvaa-pohjalta, ~90° kuten topopilotissa, jotta nimet eivät käänny ylösalaisin), hidastuu pois kun luenta päättyy, kosketus pysäyttää heti; laattatarkkuuden lukitus kuten 08.19 B. Sama liike topopilotin TopoEsittely.Kamera-koukkuun (korvaa/yhdistää KohdeKierron). NUI kutsuu sitä nähtävyysnoston napautuksesta. Raportti PT:lle. Huomioi TILA 11.55 kohta 2 (tallenteen kellovika) ennen videoita.

## LISÄYS 11.5x: KOHOKARTAN UUSI-AJO VALMIS (JU)
ca92af647 uusinta VALMIS 11.56: 4/4 kuvaa (etela, pohjoinen, tav-etela, tav-pohjoinen), eri md5, "kohokansi mitattu (16/16)", huippu 3194 Mt, NRE 0, kansio lokit/natiiviseppa-navat-koho/uusi. 1 VIKA-lähetys "kuva tav-etela", kuva silti syntyi: tarkista aika ja md5. SEURAAVAKSI ENSIN: TILA 11.15 kohta 0 a (parit.py, täysikoossa) → KK ja PT. Sitten j4 ja tav2 JU:lta.

## LISÄYS 11.58: ALOITUSLENTO j4 AJETTU (JU)
j4 491bec23b VALMIS 11.58: rc 0, KYLMA ok, kuvia 2/2, pyyntörivejä 5311, kansio lokit/natiiviseppa-striimi-aloituslento-4 (pyynnot.tsv siellä; HUOM polku ilman /j4?: tarkista). Lukuohje TILA 11.15 kohta 2.

## LISÄYS 12.0x: ESITTELYLIIKKEEN KOUKUT (PT)
NUI teki napautuksen osan 2 ae84dd1dd (haara natiivi-ui/nahtavyyden-napautus-222): palkki + kertoja + väliaikainen lento/kierto ≤ 90°. NS:n koukut: NahtavyysEsittely.Kamera ja NahtavyysEsittely.Hiivuta (pehmeä pysähdys luennan lopussa) sekä topopilotin TopoEsittely.Kamera (581f7f85a; nyk. 756f4962d). Rakenna yhteinen esittelyliike PalloKiertoon näihin koukkuihin (lähtökohta: oma KohdeKierto/KohdeKiertoOhje b1d5c652f:ssa). Jono: navat (ffc355105 JU:lla) → tämä → korkeuskoe.
