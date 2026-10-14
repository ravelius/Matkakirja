# Valoseppä – luovutus 14.10.2026 ilta (17.2x), nollaus (PT: konteksti 50 %)

Luovuttaja: Valoseppä (Opus, high). Edellinen: viesti-valoseppa-luovutus-20261014-iltapaiva2.md (sen osiot korvautuvat tällä, paitsi
Josefov/Petřín/Prahan vesi v3 iltapäivä-luovutuksesta). Aloitusviesti: viesti-valoseppa-aloitus.md. Viestit `send_message` id:llä
(/Users/Shared/Claude/osoitekirja.md); PT local_74630a27 (≤ 3 riviä + polut), Julkaisija local_22b29f10, NS local_bf20055b,
LS1 local_45a869de, KS local_37708e68, PK local_97810d35, Postivahti local_e6d70b5a.

## Junan 190 tila (Valosepän osuus)
- KUITATTU ja NS:llä: maasto + horisontin meri, yövalot + katuvalorasteri, nimet, Kuu (ikkunasta todellinen koko 0,5° ≈ 18 px, sirppi +
  maavalo), korostuksen verho pois (korostus-rinne-190 660252ca2 → NS cherry-pick d9b50c004 + 8aae71cb1), lipun oma varjo
  (lippu-varjo-190 de075b93d → NS:lle 17.2x; iPad b7c3771a + iPhone 8D1FD618 -parit _tyo/linssiseppa2/lippu-varjo/).
- VALAS = JUNAN 190 VIIMEINEN EHTO (AVOIN 1). PT 17.3x EI KUITATTU (8e4fe9256 ja 1726-kuvat: valas ~10 px, roiske pallorypäs ilmassa;
  pisaroiden pienennys f2e6eb769 EI riitä). PT:n ehdot sanatarkasti: "1) hyppy niin lähelle avauslennon kameraa, että valas on ≥ 40 px
  (n. 300–600 m), 2) vartalo näkyvästi vedestä nousten ja kaatuen (malli, ei hiukkasia), 3) roiske vettä pinnassa, ei ilmaan jäävää
  pallorypästä." "Aja vasta sen jälkeen." → iss-kooste-190 on vahdissa POISSULJETTU (poista rivi valoseppa-haarat.txt:stä korjauksen jälkeen).
  Tekniikka nyt: ValaanHyppy (Ydin/Iss, KeskiItaM −620 / KeskiPohjoinenM −108 = 630 m alustasta 257°, eli alustan TAKANA ~1,1 km
  kamerasta); RakettiValas kello sidottu RakettiLaukaisu.AvausS:ään (hyppy 1 avauksen 10 s:ssa, e7dd24ad3). Avauskamera (Nousu.AvausKamera)
  päättyy alustan ENE-puolelle 420 m:iin katse 250° (avaus kesti ajossa 17,1 s puheen takia). Ehdotus: hyppypaikka alustan ja kameran
  väliin etualan mereen (alustasta ~40–100°, 150–350 m, lähin maa > 40 m; hae _tyo/linssiseppa2/andoya/kauko/valaan_paikka.py:n tapaan
  andoya-alusta-v4.glb:stä) → ~300 m kamerasta ≈ 100+ px. Roiske: pinnan vaahtorengas + matalat pisarat (vMax ~5 m/s, ei pystykartiota
  ilmaan), nousuroiske pois tai pieni. Todistus: r0a/r0b/r0c + lähikuva PT:lle.
- Kooste linssiseppa2/iss-kooste-190 1f4246858 = juna-190 8aae71cb1 + andoya-kauko-190 f2e6eb769 (kaukolaatta, valas) +
  kupoli-yovalot-juna190 a6eb24b34 (katuvalot v2, Kuu-testikello AsetaHetki) + kupoli-nimet-190 d5b07b2ed. NS ottaa junaan näistä
  haaroista (pyysi jatkot juna-190:n päälle).

## Vahti ja skenaario
- Valovahti (Julkaisijan, pid /tmp/matkakirja-valovahti.pid) kääntää linssiseppa2/*; poissulut julkaisija-tyokalut/valoseppa-haarat.txt
  (osahaarat andoya-kauko-190, kupoli-yovalot-juna190, kupoli-nimet-190 = kooste; vanhat iss-palaute-190, kupoli-yovalot-190,
  korostus-rinne-190). Jono suodattuu nyt poissuluilla (Julkaisijan korjaus). Taukolippu /tmp/matkakirja-valovahti-tauko.
- Vakioskenaario _tyo/linssiseppa2/vahti/sk-vakio.txt: lipun pari a0/a1 alussa, valas avauslennon lopussa (oleta "valas hyppy 1" →
  r0a nousu 0,9 s, r0b huippu +0,6, r0c roiske +0,8), sitten avaus ohi → r1 → `linssi raketti kaynnista` (ei enää auto). Haaroissa ilman
  valasta todistus PUUTE (rc 1) – kuvat silti. iPhone-lisäajo: sk-lippuvarjo.txt (Julkaisijan valoseppa-iphone-lisa.zsh).

## AVOIMET (järjestys)
1. LONTOO (ei junassa; tulee Lontoon kuittauksen mukana): linssiseppa2/lontoo-korkeus-v2 3d033895a = portti syvyysluotaimella +
   tasanne (a02784c31) + MATALA TASANNE (fdebada27: laatat ≥ 0,95, tarkkuus ≥ 0,1, ei parane 8 s → läpi; LS1:n Praha v3 odotti 25 s joka
   pysäkillä – LS1 ajaa fdebada27:n testihaarassa, tulos odottaa) + pallokierros v5 (KS: Tower 45–60, Greenwich 157°; ämpärissä v4 ja v5)
   + 10 km vesi index-v23 (lontoo2-8m) ja puut v2 (PuuRuudukko.Versiot; ämpärissä 17.17–17.18). PT:n ehto ennen junaa: MUISTIAJO
   iPad Pro 13 NS:n kautta, huippu ei saa kasvaa. Vesi-indeksi v24 varattu Prahan vesi v3:lle (praha3, KS), = v23 + praha3.
2. GREENWICHIN VIOLETTI VALO (KS:n selvitys _tyo/karttaseppa/greenwich-selvitys-20261014.md): Googlen leivottu varjopinta + kaupungin
   ilmakehän sininen ilmaperspektiivi. Arvioi LS1:n v5-uusinnan k08-kuvasta; tarvittaessa ilmaperspektiivi varjopuolille.
3. KUUN TELE-ERÄ (junan jälkeen, PT): punaisen napin TELE-kuva Kuuhun tähdättynä (IssKameraKuva kuvaa nyt vain Maata; TELE 14° → Kuu
   ~4 % kuvan korkeudesta). Ikkunanäkymässä ei ole zoomia (LAAJA/TELE = valokuvan objektiivi).
4. IRTOAMISEN TUMMA SILUETTI (PK/PT, ei ehto): T+2:37–2:50 raketti lähes musta tummaa taivasta vasten; proto-3d/lokit/pk-nakyvissa-20261014/
   ajo2/arkki-nakyvyys.png (t=46–56) + lento.mp4. PK:n pelikoodari/raketti-nakyvissa-190 34d42eb4d koskee Telakointi.Kamera/KapselinLiioittelu.
5. 160 PT -LIPUN VÄISTÖ VILKKUU (PT: löydös, ei ehto): iPhone, tanko 160 pt, "ui lipputanko: piiloon paneelin alle / näkyviin" joka kehys
   (lokit/todistus-valovahti-iphone-lippu-varjo-190-20261014-1706 rivit 1256–); vanha väistö, tarvitsee hystereesin (NUI?).
6. Edelliseltä luovutukselta yhä: Lontoon kierroksen 5,3 s katko (Westminster), Prahan vesi v3 -kuva KS:lle (iltapäivä-luovutus).

## Muuta
- Tyojonot: Matkakirja-fable/scratchpad/tyojonot.md osio "Linssiseppä 2" (TELE, siluetti, väistö kirjattu).
- Worktreet (3): wt/proto-linssiseppa2-andoyakauko (andoya-kauko-190), wt/proto-linssiseppa2-lontoo (lontoo-korkeus-v2),
  wt/proto-linssiseppa2-yovalot190 (nyt lippu-varjo-190). Kaikki commitoitu. korostus-rinne-190 commitoitu ilman worktreetä
  (väliaikainen indeksi, _tyo-skripti scratchpadissa).
