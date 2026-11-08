# Natiivisepän luovutus 8.11.2026 klo 15.45

KAIKKI VANHEMMAT LUOVUTUKSET, viittausketjua ei ole (alla 15.22:n TILA-osa sellaisenaan taustaksi; sitä vanhemmat: git show
e742a3862:docs/raportit/viesti-natiiviseppa-luovutus-20261108-1522.md). Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi.
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7,
KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, NUI local_43962c89-fc14-4098-9dd7-6153133ffcea, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b.
Nollauksen syy: konteksti pehmeällä rajalla 26 % (7.37) 15.4x. Luovutushaara natiiviseppa-luovutus-20261108-1545.
Cron "4 9 * * *" (unity-julkaisut.py, /opt/homebrew/bin/python3.14 ILMAN -I:tä, Raamattu 7.41) luotu 15.24 (2340ef27): LUO UUDELLEEN.
Numpy/PIL: /opt/homebrew/bin/python3.14 -P skripti.py (EI -I: user site puuttuu → ModuleNotFoundError).

## TILA 8.11. 15.45 (VOITTAA kaikki alla olevat)
1. BEIGE NAVAT 9e98f55e5 = JUNAN 222 TF-ESTE, PIDOSSA (PT 15.3x). JU ajoi 15.30 (lokit/natiiviseppa-navat-koho/beige/, 3/3, VIKA 0).
   Annoin 15.31 luvan, PT/KK PERUI: kalotin meri sileä (paperikuvio puuttuu), pehmeä raja entisen kiekon reunalla; KK:n rajaus
   Matkakirja-fable/scratchpad/keskustelukanava/kuvat/napameri-222/beige-etela-9e98f55e5-ylaosa.png. Oma rajaukseni oli kokonaan kalotin
   sisällä → mittasi ruutukohinan (0,27), ei kuvioeroa. VIRHE: älä kuittaa sileyttä pelkällä kohinarajauksella.
   KS POLTTAA kalotin meren uudelleen laattojen paperikuviolla. KUN KS ANTAA OSOITTEEN: kytke (KalottiVersioStriimi natiivi-backup
   natiiviseppa/navat-beige, wt /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, 9e98f55e5:n päälle), unity-tarkistus (sh), push,
   ajopyyntö JU:lle kuten _tyo/natiiviseppa/navat-koho/ajopyynto-beige.md, sitten MITTAA KUVIOTIHEYS kalotin sisältä ja ulkoa:
   skripti on kopioitu _tyo/natiiviseppa/navat-koho/beige-parit/kuvio.py (keskim. |g − boxblur r2/r6|, ikkunat pysty/vino/vasen ulko|sisä).
   Nykyinen beige: ulko r6 1,22/1,24/3,02, sisä 0,44/0,24/1,87 (TF sisä 0,61/0,46/2,53). Tavoite sisä ≈ ulko, ei näkyvää reunaa
   → parit täysikoossa + rajaus kuten KK:n → PT ≤ 3 riviä. Junaan vasta PT:n sanalla. Muut ehdot (ei kiekkoa/kehää/porrasta, oliivi vain
   mannerjalustoilla = KS:n "hyllyt oliivi", sama kuin laatoissa) täyttyivät jo: _tyo/natiiviseppa/navat-koho/beige-parit/MITTAUS.txt.
2. FPV-PIENOISMALLI A d1c8a074f EPÄONNISTUI (JU 15.38, lokit/natiiviseppa-fpv-pienoismalli/): pm-yla ok, mutta kaikissa 7 drone-kuvassa
   ei maastoa (vain kerma + taivas + nimet). Kamera oikein (konsoli "drone: … silmä 128583 m"; tietorivi näyttää korkeuden / 15).
   Epäily: NUI:n FPV-näkymä (ui fpvnakyma 1: KupoliNimet + Sijaintipallo, joka poistaa kerroksen 12 kaikilta kameroilta) tai korkea
   Kuvaa-tila; vanha kuvakoe 2efebff6e ilman näkymää näytti maaston. PT:lle kerrottu. Ei vielä NUI:lle (odota sk-fpv-ab:n tulos).
3. FPV B TOTEUTETTU 5a8933619 (natiivi-backup natiiviseppa/fpv-b, wt /Users/Shared/Claude/wt/proto-natiiviseppa-fpvb, pohja d1c8a074f):
   tee_tileset.py RadioHamaran alkuun _fpvLahi (paino, lähi m, kauko m, k): korkeus = ellipsoidikorkeus/k, MCOL-paletti (0,7 liuku +
   0,3 porras, ±180 m kohinaa), harjanteinen fBm 5 oktaavia 3,2 km:stä (häipyy < 3 px), kohouma ×k ddx/ddy-normaaliin, kallio jyrkillä,
   valo 315°/19°, AMB 0,24, SUORA 0,66/sin19 lineaarisena; meri/rannikko ennallaan (h ≤ 30 m). KorkeusKerroin.FpvLahi(bool),
   DroneKuva kytkee (lähi 15 km, kauko 50 km), komento "fpvlahi paino [lähi kauko]". unity-tarkistus 0; HLSL vasta käännöksessä
   (shadergraph generoitu uudelleen, id:t vaihtuivat koko tiedostossa: normaalia).
   JU:N JONOSSA (pid 52978) topoesittelyn jälkeen: _tyo/natiiviseppa/fpv-kuvakoe/ajopyynto-fpv-b.md, skenaario sk-fpv-ab.txt (A ja B
   samasta käännöksestä ilman FPV-näkymää: b-*/a-* × 7 + pm-yla) → lokit/natiiviseppa-fpv-b/. JU:lle sanottu skenaarion vaihto 15.5x.
   KUN KUITTAA: (a) Shader error? → korjaa tee_tileset.py; (b) jos a-* näyttää maaston → FPV-näkymä on vika → rivi NUI:lle + PT:lle
   (pm-*-kuvat todisteena); jos a-* yhä kerma → vika drone-korkeudessa/Kuvaa-tilassa, selvitä itse; (c) parit a | b täysikoossa
   kultakin etäisyydeltä, lähin siisti D METREINÄ kummastakin ja Skaala = D/3 → PT ≤ 3 riviä; KK tilaa superdronen kuvan.
4. TOPOESITTELY fdd642058: JU:n jonossa ennallaan (ajopyynto-topoesittely.md → lokit/natiiviseppa-topoesittely/kamera/), kuittaus kuten
   15.22 kohta 2.
5. JONO: KS:n beige-poltto (kun tulee) → topoesittelyn kuvat → FPV A/B (sk-fpv-ab) → kohokartan napakalotit (14.45 kohta 3) → FPV osa 4.
   Asemataulu: PT kirjaa junat; työlistan muiden rivit (Lontoo, iPhone, Muuri) eivät ole NS:n.

## LISÄYS 15.5x (luovutuksen jälkeen; VOITTAA kohdan 4)
- TOPOESITTELY fdd642058 KUITATTU PT:lle (JU Mac 8/8, Shader-error 0; lokit/natiiviseppa-topoesittely/kamera/es-*.png): perillä + kierto
  loppui 2×, kallistus pysyy, osittainen kierto. Seuraava: NUI kytkee valikkoon; esilataus ennen laskua avoin. Ei NS:n jonossa.
- JU 15.4x: FPV B sk-fpv-ab-ajo T/ns-fpv-ab.zsh (pid 68399) topoesittelyn jälkeen → lokit/natiiviseppa-fpv-b/.

## ---- 15.22:n TILA sellaisenaan ----
## TILA 8.11. 15.22 (VOITTAA kaikki alla olevat; alla olevan 14.45:n kohdat 1, LISÄYS 15.1x A ja 15.2x ovat VANHENTUNEET)
1. BEIGE NAVAT = JUNAN 222 TF:N ESTE, JONON KÄRKI. OMISTAJAN PÄÄTÖS 14.51 "Ei, beige säilyy" (korvasi 14.50:n "Kelpaa"; PT 15.3x/15.4x):
   avomeri beige kaikkialla myös navoilla kuten TF 5d6967444, ei oliivikiekkoa, kehää eikä porrasta, rannikon oliivi ennallaan.
   PT:n lainauskorjaus: 10.34 kortti oli "Korjataanko tavallisen kartan napa-alueet nyt?" → "Kyllä, nyt"; "Meri sininen napaan asti"
   EI ole omistajan sana (koodikommenteissa NapaKannet.cs/NapaTaytto.cs yhä väärin lainattuna: korjaa, kun seuraavan kerran kosket).
   TOTEUTUS natiivi-backup natiiviseppa/navat-beige (wt /Users/Shared/Claude/wt/proto-natiiviseppa-kierto):
   - bffbbb29a = 641fd439e + ffc355105:n vesiraja peruttu (ElavaTyyli.VariPikseli = TF:n kaava 180–190), -meri1-pääte pois (TF:n välimuisti kelpaa),
     testi AvomeriPysyyBeigena; Kartta 34/34 (ElavaKartta), unity 0.
   - 9e98f55e5 = + KalottiVersioStriimi "2026-11-08-beige" (KS e3b13e966, PR ravelius/Matkakirja#6500, CDN 3/3; avomeri beige, hyllyt oliivi
     Varitan läpi) + KermaMaaStriimi 52…62 (beige-kalotin meri R − B 36…50: pohjoinen 94 %, etelä 99 %; Grönlannin maa 60…90+). unity 0.
   AJO JU:lla ETUSIJALLA (JU pid 98030, 15.1x): ajopyynto-beige.md → lokit/natiiviseppa-navat-koho/beige/ (sk-navat-tav2 Pariisin kautta).
   KUN KUITTAA: ei kiekkoa/kehää/porrasta 60° S ja 80° N; kohina ≤ 0,3 (scratchpad-mittari: keskim. |g − boxblur1(g)|, rajaus (700,450)-(1300,900));
   reunan sävy (pystyprofiili x 1300–1430, rivit 100…780 askel 40; vaaka y 1050–1150) ≤ 2 tasoa, muuten StriimiSavyKerroin uudelleen;
   KS:n huomio: 80–84° N meri laikuttain beige/oliivi myös laatoissa (m ≈ 183 Varitan rajalla 180–190) → katso pohjoinen täysikoossa.
   Parit etelä, pohjoinen, Atlantti: vasen TF (lokit/natiiviseppa-navat-koho/tf-verrokki-5d6967444/tav-*.png) | oikea beige, täysikoossa → PT ≤ 3 riviä
   → KK ennen TF-korttia. Junaan PT:n sanalla 9e98f55e5 (EI 641fd439e, EI 29671be23).
   HYLÄTTY: 29671be23 natiiviseppa/vesiraja-rajattu (rajattu oliivi) ja meripari; savy 641fd439e poistettu JU:n jonosta (PT 15.5x).
2. TOPOESITTELYT OSA 3 TEHTY (KK:n suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261108-topokohteiden-esittelyt.md,
   PT hyväksyi 15.5x; KS:n luvut proto-3d/_tyo/karttaseppa-topokohteet-20261108/kohteet-pilotti.json): fdd642058 natiivi-backup
   natiiviseppa/topoesittely (wt /Users/Shared/Claude/wt/proto-natiiviseppa-fpv; juna 222 f9ab126ce +): KiertoOhje.Osittainen (Pariisin
   kierron yleistys: Kulma, AlkuSuuntima, LoppuSuuntima; lasku kääntää alkuun, ei täyttä kierrosta, Ohita → loppusuuntima),
   PalloKierto.AjaEsittelyyn(lat, lon, kaari, kallistus, alku, loppu, lentoS, kiertoS, valmis), komento
   "esittely lat lon kaari kallistus alku loppu [lentoS 5] [kiertoS 24]"; testi EsittelynOsittainenKierto; Linssit 2262/2262, unity 0.
   Mac-ajo JU:lla beigen ja pienoismallin jälkeen: proto-3d/_tyo/natiiviseppa/topoesittely/ajopyynto-topoesittely.md, sk-topoesittely-kamera.txt
   (Alpit 45.85 7.35 5 50 0 330; Himalaja 28.4 86.9 8 45 0 30) → lokit/natiiviseppa-topoesittely/kamera/. KUN KUITTAA: kuvat + "esittely: perillä",
   "kierto loppui", kallistus pysyy → PT/KK. Avoin: esilataus ennen laskua; NUI kytkee valikkoon (AjaEsittelyyn); VS valo kierron aikana.
3. FPV-PIENOISMALLI A: JU:n jonossa d1c8a074f (NUI: = b45bbe356 + PK 5a7b64bba + tietorivi + Automaatti|Manuaali), skenaario
   _tyo/natiiviseppa/fpv-kuvakoe/sk-fpv-pienoismalli-nui.txt → lokit/natiiviseppa-fpv-pienoismalli/. KUN KUITTAA: kuten 14.45 kohta 2
   (parit pm-yla | etäisyydet, lähin siisti D metreinä, Skaala = D/3 → PT; KK tilaa superdronen kuvan). NUI:n tikut 7ddc42970 seuraavaan.
4. FPV B EI ALOITETTU (PT 15.3x tarkennus, omistaja 14.4x): dronen lähelle KEKSITTY yksityiskohta (harjanteet, uomat, kalliopinta) samalla
   paletilla ja valolla kuin kohokartassa, ×15 pysyy, tavoite pienempi D. Lähtötiedot ja toteutussuunnitelma:
   proto-3d/_tyo/natiiviseppa/fpv-kuvakoe/fpv-b-parametrit.md (KS:n paletti MCOL, valo 315°/19°, AMB/SUORA; pelin puolella
   Lahde~/tee_tileset.py RadioHamara-fragmentti saa pos/keski/akseli/ita/nolla: lisää globaali _fpvLahi, korkeus pos:sta /k, normaali
   ddx/ddy:stä, ridged-fBm-bump derivaatoilla, rinnevalo; regenerointi python3 tee_tileset.py
   /Users/Shared/Claude/proto-3d/Matkakirja-proto-esikatselu/Library/PackageCache/com.cesium.unity@D454711FBE38 (1.26.0 = manifest) <kohde>).
   Pohja d1c8a074f (samat A/B-skenaariot). Varjostinvirheitä unity-tarkistus ei näe: Mac-esikatselu JU:lla.
5. JONO: beige-kuittaus → pienoismallin pari → topoesittelyn kuvat → FPV B → kohokartan napakalotit (14.45 kohta 3; KS:lle sanottu
   "beigen ja vesirajan jälkeen") → FPV osa 4 (NUI: lentomalli.Askel(dt, FpvTikut.Syote), FpvNakyma.Lentomalli/Muuttui).
   Asemataulun hook pyysi päivitystä junat.json/tyolista.json: ei tehty (PT kirjaa junat).
