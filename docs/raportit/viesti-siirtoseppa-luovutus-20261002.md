# Siirtosepän luovutus 2.10.2026 klo 22.1x — LOPULLINEN (tilinvaihto, Opus 5.5, high)

TILINVAIHTO 22.1x: koesarjan simuajo (SIMULAATTORI NYT 22.10) keskeytettiin ennen käynnistystä — F989814A:ta ei käytetty,
koesarja on ajamatta. Jalkavarjon tila: 0592decd (alfakanava ennallaan) TODENNETTU EI TOIMIVAKSI 21.20; myös b126d548,
7859df3e ja 84406601 todennettu ei toimiviksi; kärki 39a396e3 (koesarjan testikomennot) käännetty, ajamatta.
Peilipaketit (osoitinta ei vaihdettu): 5de728bc349cc54a = kaikki 10 skinnattua henkilöä; 275a276538ace40a = sama + y-korjaukset
(fatabuuri +0,10, kappalainen +0,22) — uusin. Skin-osoitin (2abec0c9 → 5de728bc/275a2765 tai seuraaja) vain omistajan OK:lla
Päätoimittajan ja Julkaisijan kautta, Päätoimittaja vie kysymyksen omistajalle vasta jalkavarjon ja hahmoerän kuvien jälkeen.


Edellinen luovutus: viesti-siirtoseppa-luovutus-20261001.md (ensilataus, ympäristö, osoittimet). Tämä korvaa sen jonon.

## JONON KÄRKI

**PÄIVITYS 22.47 (uusi tili): JALKAVARJO RATKAISTU.** Juurisyy: varjo piirtyi koko ajan (pikselimittaus: lattia ~0,6 jalkojen alla
skin14–17), kerroin 0,63 oli vain liian heikko. Korjaus kerroin 0,3 = proto `siirtoseppa/linna-skin` **4d324efa**, käännös ad36e7a5,
simutodennus F989814A 22.44 (lokit/siirtoseppa-skin18, erän 1b kuvat 7 huoneesta, 0 virhettä). Merge-pyyntö Natiivisepälle junaan 130
ja kuvat Päätoimittajalle lähetetty 22.47. Avoin: skin-osoitin 2abec0c9 → 275a2765 omistajan OK:lla (kohta 2). Alla oleva kohta 1 on historiaa.
SEURAAVA (Päätoimittaja 22.5x): Linnanrakentaja korjaa muurinharjan reitin (vartija kulkee talonpojan läpi videolla 3,9–5,0 s) ja
tarkistaa 7 huonetta → uudella peilillä kuvaa muuttuneet huoneet + muurinharjan video (ajo-linna-skin.sh, simuvuoro Julkaisijalta) → Päätoimittajalle.
Juna 130: 4d324efa koostumuksessa 4e1f150f, skin-osoitin pysyy 2abec0c9:ssä.
TEHTY 22.59: peili 01fb6118 (Linnanrakentaja) kuvattu, lokit/siirtoseppa-skin19 (Muurinharja+video, keittiö) → Päätoimittajalle; odottaa sen arviota.
TEHTY 23.13: peili 6cd8735b3a42ea3c (Muurinharjan kääntöpiste 1,28 m tulikorista, keittiö) kuvattu, lokit/siirtoseppa-skin20; omistajan arkki
omistaja-linna-hahmot-6cd8735b.png → Päätoimittajalle. Seuraava: omistajan OK → skin-osoitin 2abec0c9 → 6cd8735b Päätoimittajan ja Julkaisijan kautta.
TEHTY 23.27: peili dad4d0f39cd2c9c2 (irralliset tunnelma-liekit pois) kuvattu, lokit/siirtoseppa-skin21; UUSI omistajan arkki
omistaja-linna-hahmot-dad4d0f3.png → Päätoimittajalle (korvaa 6cd8735b). Osoitinehdokas nyt dad4d0f3. Natiivi: JSON- + liekki:-solmuliekit tuplana, ei muutettu ilman käskyä.
TEHTY 23.38: liekit kerran = proto siirtoseppa/liekit-kerran 473267d2 (käännös a6db66ba, simu 2 peiliä, 0 virhettä) → merge-pyyntö junaan 132.
OMISTAJAN OK 23.3x skin-hahmoille (osoitin dad4d0f3). Osoitin = ämpärin uusin.json (nyt ec7eb286), vaihtuu vie-dioraama.yml käsiajolla osoitin=true.
Kulku: PR ravelius/Matkakirja#3885 (Linnanrakentaja, blender 916731d7 jo ämpärissä) mergetään → CI vie hash-kansion → KUITTAA puhtaalla
asennuksella (ajo-ymparisto-kuittaus.sh, APP lokit/juna-1.1.130-e406ead2) → Julkaisija osoitin=true → todenna tuotannosta → Päätoimittajalle.
TEHTY 23.56: dad4d0f3 KUITATTU puhtaalla asennuksella (build 130, 10 skin-hahmoa, puheet 3/3, 404 0, virheitä 0; lokit/siirtoseppa-kuittaus-dad4d0f3).
TEHTY 01.47 (3.10.): OSOITIN uusin.json = dad4d0f39cd2c9c2 (run 37073768334), todennettu tuotannosta TF 131 -appilla (10 skin-hahmoa, 0 virhettä,
lokit/siirtoseppa-osoitin-dad4d0f3). Skin-hahmot VALMIS. Jäljellä: liekit kerran 473267d2 junassa 132.
TEHTY 3.10. 19.04: TF 132 -linnakierros (lokit/siirtoseppa-kierros-tf132, video 7 huonetta) ja kertojan puheiden juurisyy: lataamaton jakso
jäi pysyvästi äänettömäksi → proto siirtoseppa/kertoja-odottaa fff9971a (worktree wt/proto-siirtoseppa-puhe), todennettu 19d020bc, merge-pyyntö
Natiivisepälle. Testiskripti tyokalut/siirtoseppa-ajot/ajo-linnakierros.sh (UNOHDA=1 pakottaa latausodotuksen).
JONO (Päätoimittaja 3.10.): 2) myllyn laudat natiiviin (ASTC 6×6), kun Linnanrakentajan laudat ovat mainissa; #3815 nappulaäänet natiiviin, kun
mergetty (Pelikoodari vie junaan v14:n jälkeen). Allymes vasta näiden jälkeen ja omistajan päätöksellä.
TEHTY 19.39: myllyn äänet v2 = proto siirtoseppa/mylly-aanet-v2 b8002db5 (worktree wt/proto-siirtoseppa-mylly), todennettu e6729076 (lokit/siirtoseppa-mylly-v2).
AVOIN: merge-pyyntö Natiivisepälle vasta kun #3815 on mergetty. Laudat: odottaa Linnanrakentajan PR:ää.
TEHTY 19.53: myllyn laudat v2 = proto siirtoseppa/mylly-laudat-v2 989f121a (worktree wt/proto-siirtoseppa-laudat), tarkistettu iPhone+iPad
(87c04b2f, lokit/siirtoseppa-laudat-v2). TEHTY: merge-pyynnöt Natiivisepälle (mylly-aanet-v2 b8002db5 #3815:n jälkeen, mylly-laudat-v2 989f121a #3906:n jälkeen; yhteismerge puhdas). Säännöt 3.10.: ei poistoja checkoutin/worktreen ulkopuolelta.

1. **Linnan hahmojen jalkavarjo (omistaja 20.2x: "kävelijä tarvitsee vielä varjon jalkojensa alle") — EI VIELÄ NÄY.**
   Haara `siirtoseppa/linna-skin`, kärki **39a396e3** (KÄÄNNETTY 8219c063, app lokit/siirtoseppa-skin16-app).
   Toteutus: `DioraamaHahmot3D.LisaaKontaktivarjo` (levy jokaisen 3D-hahmon juuren alle, 17/17 syntyy, materiaali ok) +
   `Linssit/Resources/Varjostimet/DioraamaKontaktivarjo.shader`. Faktat simusta (lokit/siirtoseppa-skin10…15):
   - punainen levy, peitto 1, ZTest Always (`poikki skin varjokoe`) näkyy aina oikeassa paikassa ja koossa;
   - peitto 1 + LEqual näkyi (skin14 h-peitto_1, h-ztest_lequal_peitto_1.0), peitto 0,6–0,9 ei näkynyt edes Alwaysilla;
   - float-kentät, `Blend …, Zero One` ja kertova `DstColor Zero` (RGB 0,63, alfa 1) eivät tuoneet varjoa näkyviin.
   Juurisyy auki. Seuraava ajo on valmiina: `ajo-linna-skin.sh` + KOKEET, joissa sekoitus ja väri vaihtuvat ajon aikana
   (`poikki skin sekoitus=kerto|alfa|peite`, `rgba=r,g,b,a`, `ztest=always|lequal`, `veto=m`, `peitto=x`), ja analyysi
   `python3 tyokalut/siirtoseppa-ajot/varjo-analyysi.py <L>` (ero perustilaan talonpojan ympärillä, ruudukko). Ehdotettu sarja:
   `KOKEET="sekoitus=peite;ztest=always;rgba=0,1,0,1 ztest=lequal sekoitus=kerto;rgba=0.5,0.5,0.5,1 rgba=0.9,0.9,0.9,1 sekoitus=alfa;rgba=0,0,0,0.6 rgba=0,0,0,1 ztest=always;rgba=0,0,0,0.61"`
   `VIDEO=2 LAITE=iphone L=…/siirtoseppa-skin16 HASH=275a276538ace40a APP=…/siirtoseppa-skin16-app/Matkakirja3D.app ajo-linna-skin.sh`.
   HUOM muistio metal-half-vakiopuskuri.md (Päätoimittaja kirjasi "half"-juurisyyn) on luultavasti väärä — korjaa, kun syy selviää.
   Varjo on tarkoitus sitten pyytää Natiivisepältä junaan 130 (ilman testikomentoja tai niiden kanssa, ne ovat harmittomia).
2. **Linnan skinnatut hahmot** (omistaja loki 59b9df127, Linnanrakentajan CC0-mallit): moottori junassa 129 (6ad1ab62 + b126d548
   masterissa, BUILD 129). Näkyvät vain uudella paketilla: Linnanrakentajan uusin **275a276538ace40a** (10 henkilöä, 16 esiintymää,
   y-korjaukset fatabuuri/kappeli). Osoitin EI vaihdettu: Päätoimittaja vie omistajalle vasta varjon ja hahmoerän kuvien jälkeen.
   Omistaja: liike ok, moonwalk korjattu (LookRotation(−kasvot) skin-polulle), sävy v3 ok.

## Tämän päivän valmiit (2.10.)

- Linnan valikko + pienoiskartta + Muurinharja (omistaja 14.44 ja 17.4x): linna-valikko e36f8a51 junassa 127 (masterissa).
  Pienoiskartta OHJAUSNAPPI-iso-kehyksessä (Natiivi-UI b76b91a7), puhujan nimi kortin kapiteelina, Pulu kortin kulmalla.
- Linnan puhevuoro (luento ↔ linna, kertojan laatikko) linna-puhevuoro-4 2e0f060a, piikit linna-piikit-2 db3ed117 — masterissa.
- Mylly (pelit-9 30986585) masterissa.
- Skin-moottori: DioraamaGlb lukee skinit/animaatiot/float COLOR_0, `Ydin/Dioraama/DioraamaSekoitin.cs` (AnimationMixer-pariteetti,
  crossFade 0,25 s, kävely = reittinopeus × kesto / kavely_sykli_m), malli3d.skin-alakenttä (`Malli3d.NatiiviGlb`).

## Proto-worktreet

- `/Users/Shared/Claude/wt/proto-siirtoseppa-vesi` — nyt haarassa `siirtoseppa/linna-skin`.
- `/Users/Shared/Claude/wt/proto-siirtoseppa-pelit5` — `siirtoseppa/pelit-9` (masterissa, voi poistaa).

## Skriptit (proto-3d/tyokalut/siirtoseppa-ajot/)

- `ajo-linna-skin.sh` (HASH, APP, L; VIDEO=s, TILAT="keittio kappeli …", VETOT, KOKEET) — kuvat Muurinharja/keskushalli/huoneet,
  `poikki skin tila|valkoinen|kuva|varjokoe|varjo`, video. `varjo-analyysi.py`.
- `ajo-muurinharja.sh` (ENNEN/JALKEEN, LISA=1 laituri + Ajattelijat), `ajo-linna-valikko.sh`, `ajo-ristikatkaisu.sh`.
- Lokikansioon vain kuvat, konsoli ja YKSI uusin .app (Päätoimittaja 20.4x).

## Säännöt (ennallaan)

Käännös vain Julkaisijan NYT KÄÄNNÖS -viestillä (proto-kaanna.sh, nice 15; tarkista merge-SHA:n esivanhempi ennen .app-kopiota),
simulaattori vain SIMULAATTORI NYT -vuorolla (F989814A / D5900D45), lopuksi uninstall + shutdown + "simu vapaa". Merge-pyynnöt
Natiivisepälle, viestit Päätoimittajalle ≤ 8 riviä, osoitin vain omistajan OK:lla Päätoimittajan ja Julkaisijan kautta.

## 4.10.2026 (TF 136 -linnakierros, Olavinlinnan avoimet)

- Kierros tehty: docs/raportit/siirtoseppa-tf136-linnakierros-20261004.md (tallenteet ääniraidalla, lokit/siirtoseppa-tf136-aani).
  Skriptit: tyokalut/siirtoseppa-ajot/ajo-linnakierros-aani.sh (pelin äänikaappaus + merkit, aikajana) ja tallenne-yhdista.py (RAJA=25 iPadille).
- Liekit #3932 (peili a9c0e02a) kuitattu ok Julkaisijalle.
- Löydös 1 korjattu: proto siirtoseppa/kuori-ensin 4f526391 (worktree wt/proto-siirtoseppa-kuori), käännös 67f6d005 — odottaa
  simutodennusta (kuormitettu kone = hidas lataus, äänellinen kierros) → merge-pyyntö Natiivisepälle junaan 138.
- Avoin: apulaisen ääni C (#3740, paketti f3c055a2) + liekit → todennus #3932:n mergen jälkeisellä paketilla, osoitin Päätoimittajan luvalla.
- Säännöt 3.10.: ei poistoja checkoutin/worktreen ulkopuolelta; tarkista itse pelistä ennen lähetystä.

### 4.10. klo 14.4x
- JUNA 137: kuori-ensin ff560e9d (Natiiviseppä yhdisti). Osoitin uusin.json = 8b8a623bbbe3ee93 (ääni C + liekit), todennettu 14.2x.
- JUNA 138 -erä: proto siirtoseppa/kuori-esilataus b5e68c38 (worktree wt/proto-siirtoseppa-kuori), käännös 3db75122:
  nimiruutu "OLAVINLINNA / Savonlinna · 1475" (Päätoimittaja hyväksyi) linssin avauksesta, levyvälimuistin rinnakkaislatauksen esto,
  kevyen kuoren esilataus (DioraamaEsilataus, LinssiOhjain.Update, linssi saatavilla). AVOIN: simu ~15.40 (tyokalut/siirtoseppa-ajot/
  ajo-vapaa-tila.sh: vapaan tilan still + keittiön napautukset ääni C:lle), iPad laite-sha ~16.00 (saapumisaika ennen 8,2 s / jälkeen),
  sitten merge-pyyntö Natiivisepälle junaan 138.

### 4.10. klo 15.2x — JUNA 138 -ERÄ (omistajan linja 14.5x: linna vasta täydellä tarkkuudella)
- Kärki: proto siirtoseppa/kuori-esilataus b80d034a (worktree wt/proto-siirtoseppa-kuori), käännös 318f75e8 (lokit/siirtoseppa-esi3-app).
  Sisältö: nimiruutu "OLAVINLINNA / Savonlinna · 1475" linssin avauksesta; odotus kunnes kuori+detalji, tilat valoatlaksineen, hahmot ja
  ympäristö valmiina; rivit "Linna latautuu…" 4 s ja "Vielä pieni hetki…" 9 s; latausvirhe / 60 s ilman edistystä → tilarivi
  "Linnaa ei saatu ladattua. Tarkista verkkoyhteys." + linssi kiinni; esilataus (DioraamaEsilataus) koko laitekohtainen paketti +
  ympäristö suoraan levylle, sama kaikilla verkoilla; laukaisin: pelaajan kaupunki/matkan kohde Suomessa tai linna ruudulla ≤ 600 km;
  testikomento linssi-komento "esilataa linna".
- AVOIN: simu ~15.40 (ajo-vapaa-tila.sh: latausrivit 5/10 s, vapaa tila, keittiö ääni C, välimuistin koko), iPad (laite-sha b80d034a +
  ajo-ipad-saapuminen.sh A/B) → Päätoimittajalle, sitten merge-pyyntö Natiivisepälle junaan 138.

### 4.10. klo 16.4x — JUNA 138 YHDISTETTY, AVOIMET
- JUNA 138: siirtoseppa/juna138-esilataus = fad924af (sis. 6bdf9fc3 + ympäristö ei odota kuorta 0abd54bb + ympäristön osat rinnakkain),
  Natiiviseppä yhdisti (0e759cf5). iPad Release: esiladattu odotus 2,7 s / häivytys 3,4 s (ennen 3,8 / 4,6), puhdas 62,5 s (ennen 78,7).
- kuori-esilataus-haaran kärki d93368d3 (EI junassa, todentamatta): f9296d52 täyden tarkkuuden odotus laskee kaikki tilat (oli glb-tilat,
  näkyi 9/8); d93368d3 päivä-JPEG-vara ulkokuori.tekstuurit.jpg.{kevyt,normaali,huippu}. AVOIN: Linnanrakentajan paketti jpg-avaimilla →
  simulla todennus (simu ei tue ASTC:tä → JPEG-polku) → merge-pyyntö junaan 139.
- 6×6-koe 72baa933 iPadilla (lokit/siirtoseppa-6x6-ipad/, ajo-ipad-6x6.sh): kuoren 167–209 ms piikki poistuu, laatuero ei näy;
  raportoitu Linnanrakentajalle ja Päätoimittajalle.
- Apulaisen ääni dcd12230 keittiössä soi (lokit/siirtoseppa-keittio-c/); mikseritiedostot /aanet/mikseri/v2/apulainen-* ovat 30.9. →
  Linnanrakentaja vahvistaa, onko se ääni C.
- OPASTEKOE (ei junaan): haara siirtoseppa/opasteet-koe bbaab893 (worktree wt/proto-siirtoseppa-opaste): laput säteittäin nastaryhmästä,
  viivat eivät risteä. Edellinen still (lokit/siirtoseppa-opasteet3/) ei kelvannut (viivat ristissä). AVOIN: käännös kuori-esilataus+
  bbaab893, ajo-opasteet.sh (ABSOLUUTTISET polut L/APP — simctl --stdout ei toimi suhteellisella), arkki Päätoimittajalle vasta kun kelpaa.

### 4.10. klo 19.0x — JUNA 139/140, NIMILAPUT, YLEISKAMERA
- JUNA 139 (Päätoimittaja kuittasi): siirtoseppa/kuori-esilataus 7ae37251 = 3f7895ca (k1 kerran huoneesta toiseen, etsintävaihe ei
  välähdä, tilat 9/9, päivä-JPEG-vara) + nimiruudun tilavaraus (otsikko ei nouse). Todennettu simulla (58afbc05): kertojan 4 jaksoa
  äänitallenteessa BUILD 138:lla ja 3f7895ca:lla (lokit/siirtoseppa-kertoja-*), nimiruutu y 1182 px 2/5,5/10,5 s.
  Laituri-"vika" oli skriptin 300 s aikaraja + hidas verkko (lataus 270 s) → skriptit odottavat nyt saapumisen ilman rajaa.
- JUNA 140 (merkitty, odottaa Päätoimittajan kuittausta): siirtoseppa/sisaltovarasto 34967f35 — välimuisti sha256:n mukaan
  (dioraama/<r>/sisalto/<sha>, manifestit/<hash>.json), yksi istunnon osoitin (LueOsoitin 30 min, testiosoitin "poikki osoitin"),
  erotuslataus, kertasiirto vanhasta muodosta, siivous saapumisen/esilatauksen jälkeen, "poikki valimuisti". iPad: siirto 106 (459 Mt),
  osoitinvaihdon jälkeen 9/78 verkosta, 16,6 s, siivous 715 → 601 Mt (lokit/siirtoseppa-ipad-varasto/).
- NIMILAPUT (omistaja 18.4x: vain laput, aina yleisnäkymässä esittelyn jälkeen, ei opastekorttia): haara siirtoseppa/nimilaput
  (worktree wt/proto-siirtoseppa-opaste) 436e0b76 tuotantokoodi + 1b0321d7 kehittäjän "poikki yleiskamera vaaka|pysty az kork et [fov]"
  ja "poikki yleiskamera sovitus 0|1". AVOIN: simu ~19.30 ajo-simuvuoro-1930.sh (pysty, vaaka, iPad-simu D5900D45: esittely + jälkeen +
  kulmakoe) → stillit Päätoimittajalle → hyväksytyt arvot dataan (olavinlinna.js yleiskamera) Linnanrakentajan pakettiin; osoitin vain
  Päätoimittajan luvalla. Huom: natiivi sovittaa yleisetäisyyden pohjan rajoihin (SovitaKuvasuhteeseen), pystyssä linna täyttää jo leveyden.
- Osoitin klo 18.13 → v28 44beb2ba (Julkaisija, Päätoimittajan lupa).

### 4.10. klo 20.2x — 1139-KORJAUS, NIMILAPUT/KULMAT/HUONEKORTTI OMISTAJALLE
- Savuke 1139 (Keittiö → valikko → Fatabuuri palasi Keittiöön, vika jo BUILD 138:ssa 2.10. alkaen): valikon napautus läpäisi
  dioraamalle. Korjaus siirtoseppa/valikko-lapaisy c1d84a94 (auki oleva LinnaValikko + napit estävät eleen, ValikkoPyysi ohittaa
  saman kosketuksen napautuksen). Natiiviseppä todensi oikeilla napautuksilla junakoostumuksessa 1010d940 → juna 139.
  Minulla EI ole sim-tap-oikeutta (omistaja ei myöntänyt) — kosketusviat todentaa Natiiviseppä.
- Juna 140: siirtoseppa/sisaltovarasto 34967f35 kuitattu.
- Haara siirtoseppa/nimilaput 2a4babf7 (worktree wt/proto-siirtoseppa-opaste, 7ae37251:n päällä, EI junassa): nimilaput
  lappukohtaisesti (tärkeysjärjestys tila.lappujarjestys / "poikki laput jarjestys", ensimmäinen aina, muut nasta ≥ 42 pt valituista
  eikä päällekkäisyyttä, häivytys 0,35 s), "poikki yleiskamera …" kulmakoe, huonekortti "poikki huonekortti 0|1|2" (1 = PANEELI LASI).
  Stillit lokit/siirtoseppa-omistajalle-2010/ Päätoimittajalle; suositus kulma 255°/50°, kortti 1. AVOIN: omistajan valinta → data
  (lappujarjestys + yleiskamera Linnanrakentajan pakettiin), kortin kytkin pois (valittu tuotantoon), pysty+vaaka+iPad-stillit.

### 4.10. klo 21.5x — LINNAN UI-ERÄ JUNAAN 141 (omistajan valinnat)
- Omistaja: linna aukeaa iPhonella VAAKANA (65e0439e, LukitseVaaka; iPad ennallaan), kameran kulma ennallaan (165°/30° vaaka),
  laput keskiaikaisina tyylillä C (käsikirjoituksen sivu; Grenze Gotisch + IM Fell English, OFL; Linnanrakentajan taustat
  _valmiit/olavinlinna-laput-v1/ → Resources/LinnaLaput/c, Fontit), kortti selitettävän kohteen vieressä osoitinviivalla,
  nimilaput lappukohtaisesti tärkeysjärjestyksessä (tilat[].lappujarjestys, Linnanrakentajan peili c116f02f, PR tulossa),
  kynnys 70 pt, ensimmäinen aina, nastat turva-alueella; perusnäkymä vaakana 3/6.
- Haara siirtoseppa/nimilaput (wt/proto-siirtoseppa-opaste) kärki 5377504d (initiaali leipätekstin alkuun). Kokeilukytkimet poistettu
  90a73c3a:ssa. Historiassa on OPASTEKOE- ja LASI-kokeiluja → junaan 141 SQUASH-haaraksi masterin päälle (siirtoseppa/linna-ui-141).
- PNG/TTF .meta: kopioi tuoja (Radio/radio-kotelo.png.meta, LiberationSerif-Italic.ttf.meta) — pelkkä guid → DefaultAsset → null.
- AVOIN: simu ~21.58 lopulliset C-stillit (perus vasen/oikea, Kappeli, Keittiö, zoom 130/100/80) → Päätoimittaja → omistaja → juna 141
  (koodi + Linnanrakentajan lappujarjestys-PR + osoitin Päätoimittajan luvalla).
