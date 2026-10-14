# Valoseppä – luovutus 15.10.2026 aamuyö

Luovuttaja: Valoseppä (Opus, high). Edellinen: viesti-valoseppa-luovutus-20261014-yo.md (sen avoimet hoidettu tai lopetettu, ks. alla).
Viestit `send_message` id:llä (/Users/Shared/Claude/osoitekirja.md); PT local_74630a27 (≤ 3 riviä + polut), Julkaisija local_22b29f10,
LR local_08e82dfc, PK local_97810d35, Postivahti local_e6d70b5a. Käännös- ja simuvuorot AINA Julkaisijalta (KÄÄNNÖS NYT / SIMULAATTORI NYT).

## JUNA 192 (PT 02.4x: omistaja yhdisti junat, lähtö aamulla skannerin jälkeen) – molemmat valmiiksi ennen ~07
1. ISS-LÄHESTYMINEN + LAUKAISUN S-KÄYRÄ (omistaja 00.34 ja 00.3x). Haara linssiseppa2/iss-lahestyminen-192 (natiiviseppa/juna-192 0f4ec6def
   päällä), worktree /Users/Shared/Claude/wt/proto-linssiseppa2-isslahestyminen. TILA: katso alla "Tila luovutushetkellä".
   Hypyn syyt: Telakointi.Kamera sukeltaa Seurannasta (1 200 km) ~40 m:iin 1,6 s:ssa (SekoitusS) + FOV ×0,5; ISS vaihtuu 90 pt vakiokoosta
   (AstronauttiKerros IssMallinLeveysPt) oikeaan 108 m malliin (RakettiMalli.AsetaTelakointi); kapseli teleporttaa 60 m portin eteen; origo
   siirtyy samassa kehyksessä. Tavoite: yksi jatkuva kamera-ajo kapselin takaa, asema ~5 % ruudusta → telakointi, raketti ruudussa koko ajan;
   yksikkötesti mittaa kamera-askeleen (< 3 %/kehys), aseman kulmakoon kasvun ja kapselin pysymisen ruudussa; lokirivi "raketti: lähestyminen …".
   Laukaisu: ensimmäinen liike S-käyränä (nopeus ja kiihtyvyys 0 alussa), myöhempi vauhti ennallaan; kiihtyvyys ja nykäys ennen/jälkeen.
   Todistus PT:lle: kuva-arkki + video (tyokalut/todistusajo/todistusajo.sh: video-alku/video-loppu; skenaariopohjat
   /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/telakointi/sk-telakointi10-ipad.txt), ruutujen välinen siirtymä mitattuna.
   Välivaiheiden kuva-arkit Sonnet-apuagentille, itse vain lopullinen video + arkki PT:lle.
2. VALAS UUSI VERSIO (omistaja 01.1x "Kokonaisuus … vertaa aitoihin videoihin ja tuo uuden version"; PT: korjaa myös 3 heikointa).
   Haara linssiseppa2/valas-193 (juna-192 + roiske v8c 383a01841 + v8d 4c264df55), worktree /Users/Shared/Claude/wt/proto-linssiseppa2-valas193.
   Heikot kohdat: proto-3d/lokit/valoseppa-valas-heikot-20261015.md + arkki valoseppa-valas-arkki-20261015.jpg. Vertailumuistio
   docs/raportit/valas-vertailu-20261015.md (proto-gitissä, haarassa). Todistus: sk-vakio (`linssi linssi raketti valas <s>|jatka`, r0a 1,0 /
   r0b 1,73 / r0c 3,3 / r0d 4,4) + video; NYK = vahdin todistus-valovahti-iss-kooste-190-20261015-0011 (v8d).
   Junassa 192 nyt roiske v8b (iss-kooste-190 58f701a66); v8c/v8d eivät junassa (v8d = pisaroiden jäätyminen pysäytyksessä, vain todistuskuviin).

## Lopetettu / valmis
- EIFFEL LOPETETTU (omistaja 14.10. 23.59): Googlen torni jää. Haara linssiseppa2/leikkaus-ala-191 (fe660782c, 7a6c392c3, 9b0d8a0a0,
  8f4eed561, 44265c46c: leikkauksen alaraja + ristikkovalo) EI junaan; worktree poistettu. Havainnot omat191/parit/HAVAINNOT.md.
- Levysiivous 00.5x: ~6,3 Gt (Eiffel-appit/-paketit, wt leikkausala + yovalot190, vanhat vahtitodistukset).
- Kaupungintalo: "KT jäihin" (ennallaan). Tower Bridgen kummut, Kuun TELE, 160 pt -lipun väistö: ennallaan edellisestä luovutuksesta.

## Työtilat
- wt/proto-linssiseppa2-andoyakauko (andoya-kauko-190, roiske v8d 481487f98; kooste iss-kooste-190 cbadbab38 vahdissa) – voi poistaa,
  kun valas-193 on junassa. wt/proto-linssiseppa2-isslahestyminen, wt/proto-linssiseppa2-valas193 (aktiiviset). wt/proto-linssiseppa2-lontoo = PK:n.

## Tila luovutushetkellä (01.3x, konteksti 34 %)
- ISS: Opus-agentti valmis → 5b864834e (Loppulahestyminen.cs uusi; Nousu/Telakointi/RakettiLento/RakettiLaukaisu/RakettiMalli; testit
  1815/1815, tarkista 0). Ei vielä simussa. Mittarit: kamera-askel täysi lento ≤ 2,55 %/kehys (raja 3 %), lyhyt ≤ 9 % (raja 10 %, koko
  lähestyminen 4,4 s); asema 2 % (vaaka) / 6 % (pysty) → telakointi; lähtö: huippukiihtyvyys täysi 1 500 → 4,3 m/s², nykäys 90 000 → 0,9 m/s³.
  Agentin oikaisu: 90 pt ISS-malli (AstronauttiKerros) ei näkynyt laukaisussa lainkaan – asema puuttui kokonaan ennen telakointia.
  KÄÄNNÖS L2 käynnissä 01.28 (Julkaisijan KÄÄNNÖS NYT), PROTO_APP_KOPIO=proto-3d/_tyo/linssiseppa2/iss192/app, loki
  lokit/kaannospalvelu/20261015-012814-5b864834e-l2.log → ilmoita Julkaisijalle "käännös valmis, L2 VAPAA".
  SIMU jonossa 3 Julkaisijalla (odota "SIMULAATTORI NYT"). Sonnet-agentti valmisteli kansioon proto-3d/_tyo/linssiseppa2/iss192/:
  sk-iss192-ipad.txt, aja-iss192.zsh <sha> (todistusajo, UDID A26BC7D0, video täysi + lyhyt), analysoi-iss192.py <tuloskansio>
  (ruutujen siirtymä videolta, lokin kamera-askel, lähtökiihtyvyys, arkki + liikekäyrä, YHTEENVETO.md). Tarkista että tiedostot ovat
  olemassa ja aja-skriptissä vain A26BC7D0 (grep simctl boot). Simussa tarkistettavat (agentti): Pulu toisen vaiheen kohdalla, toisen
  vaiheen ajautuminen ruudusta, maapallon sinisyys nopeassa pyyhkäisyssä, origon vaihto 100 km:ssä näkymätön, asema yöpuolella tumma,
  Pulun lähikuvan rajaus, pystykuvan 12° vaakakenttä (kapseli reunassa?), 1. vaiheen irtoaminen ±0,2 s Pulun repliikistä.
  Valmis → video + arkki + YHTEENVETO PT:lle (≤ 3 riviä + polut), sitten JUNA 192 Julkaisijalle.
- VALAS v9: Opus-agentti valmis → valas-193 @ 2bd0db142 (uusi varjostin Resources/Varjostimet/RakettiValas.shader, RakettiSavu
  _SavuOma, ValaanHyppy.Vesiraja/Evat/Liioittelu 2,0; testit 1811/1811; vertailu docs/raportit/valas-vertailu-20261015.md proto-gitissä).
  Nousun "irralliset läikät" = edellisen hypyn jäätynyt laskuvaahto (pysäytys aloittaa uuden hypyn) → tyhjennetään hypyn vaihtuessa.
  Vahti käänsi 01.15 vielä v8d:n (4c264df55) ja odottaa simua; seuraava vahtikierros kääntää 2bd0db142. Tarkista vahdin kuvista:
  Metal-varjostin kääntyy (lokissa "varjostin Matkakirja/Linssit/RakettiValas"), r0a vaahto vain nousukohdassa + valuva vesi, r0b harmaa
  runko valkoinen vatsa/evät kameraan päin, kiilto, koko ≥ 2,5 %, r0c valkoinen sormimainen kruunu + rengasaalto, r0d rikkonainen vaahto,
  raketin savu ennallaan. Avoimet: lento ~1,7× liian nopea 30 m valaalle (aikakerroin ValaanHyppyyn + uudet todistusajat), malli jäykkä
  (LR: valas-v2 luurangolla, evät 1/3 rungosta). Pari NYK (0011, v8d) | UUSI + video PT:lle, sitten junaan 192.
