# Linssisepän luovutus 17.10.2026 klo 23.00 (KOVA RAJA 36 %, Postivahti)

Edellinen: viesti-linssiseppa-luovutus-20261017-1922.md (osoitteet, yleisohjeet). Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto
(paikalliset haarat, ei pushia), ajot proto-3d/tyokalut/linssiseppa-ajot/. Viestit AINA send_message id:llä: PT local_5df52e10-10e4-4b72-9554-0049db300dfe
(≤ 3 riviä), JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, LR local_996d60ab-b4af-4172-ad31-f8e948f141a3,
VS local_c238f4af-ae73-44e7-81f1-92848acd9217.

## !!! AIKARAJA (PT 23.21: omistaja pyysi julkaisua 23.21 → JUNA 201 LUKITAAN KLO 00.30) !!!
- Mona Lisa -paketti (kohta 00: napautus kaiteelle, kehys, auto zoom, himmeä ‹ ⏸ › -napautus, suora kävely vähin käännöksin) ja
  pyramidin simu (kohta 1): sha + video/kuvat PT:lle VIIMEISTÄÄN 00.15. Mikä ei ehdi → juna 202 (kerro PT:lle heti, mitä jää).
- Järjestys: pyramidi on jo käännetty (ede9300b) → pyydä JU:lta simuvuoro HETI alussa ja tee Mona Lisaa vuoroa odottaessa.

## TILA 23.38 (LS jatkoi itse): Mona Lisa f7952e7b3 (proto linssiseppa/monalisa-201, worktree wt/proto-linssiseppa-monalisa, juna-201-pohja)
- TEHTY: katseluasento kaiteen eteen (ohut este < 0,25 m teoksen ja katsojan välissä → 0,6 m kaiteen eteen, kuvakulma kapenee:
  kaideIhanne/LaajaTavoite), V2-kesto = suora etäisyys / 1,3 m/s (V2SuoraMs, V2MaxMs, V2MinS 1,5 s), kääntö menosuuntaan ≤ 15°
  (V2KulkuKaantoAste), vilkaisut pois (V2Vilkaisut). MuseoKaideTestit; pehmeän liikkeen raja 3 → 6 m/s². Linssit 2015/2015.
- KÄÄNNÖS: ajo-monalisa201.zsh (linja 2, APP _tyo/linssiseppa/monalisa-app) → .nyt-tiedosto simu-monalisa201.nyt JU:n vuorolla;
  skenaario sk-monalisa-201-iphone.txt (Kaanaan häät → Mona Lisa, kuvat m0–m2). PT:lle kerrottu 23.37 (kysytty: junaan testien perusteella?).
- JUNAAN 202: kehys (Commons mallina), SuoraKierros-kytkin (pois: lyhyillä siirroilla 14 m/s², testi KierrosLiikkuuPehmeastiIlmanHyppyja),
  musta välähdys isossa suunnanmuutoksessa, SyoteLukko-kutsu museon maailmanapautuksiin NUI:n haaran mergen jälkeen.
- Pyramidin simu ede9300b: JU:lle simuvuoropyyntö 23.23 (jonossa).

## 00. ENSIN (PT 23.2x, OMISTAJAN HAVAINTO 23.07, juna 201): MONA LISAN NAPAUTUS EI VIE SUORAAN TEOKSEN ETEEN
- Omistaja: "NApauttamalla ei pääse suoraan monalisan luo." Kuva docs/raportit/kaappaukset/omistaja-20261017/louvre-monalisa-napautus-2307.png.
- Tavoite (KK): louvre-inv-779:n napautus vie suoraan kaiteelle teoksen eteen, rajaus samankokoinen kuin muiden lähikuvissa; kaide pysyy.
- Epäillyt: reitinhaku pitää kaiteen sisäpuolta esteenä / katselupiste kaiteen sisällä / kaiteen törmäysalue nappaa napautuksen.
  QA "museo kavele teos louvre-inv-779", "museo napauta", loki "museo: kävely kohteeseen". Tarkista KAIKKI kaiteelliset teokset.
- Kuvapari (nyt | korjattu) täysikokoisena PT:lle, ei videota. Sha NS:lle junaan 201 PT:n kuittauksen jälkeen.
- SAMAAN KORJAUKSEEN (OMISTAJAN HAVAINNOT 23.10 PT:n kautta): "monalisan kehys on huonon näköinen ja autozoom zoomaa kuvaa lähemmäs niin että
  kehys pysyy näkyvissä mutta kuva zoomautuu sen sisällä lähemmäs. myös kun painoin pausenappulaa näkyviin, niin peli otti ensimmäisen ruudun
  painon jo heti käskynä vastaan vaikka olisi pitänyt tuoda vain pause nappula näkyviin"
  (1) KEHYS: oikean näköinen (Commonsin kuva mallina), terävä myös lähikuvassa (nyt laatikkomainen, suttuinen); tarkista muut Louvren
      kehykset; kehysmalli tarvittaessa LR:lle.
  (2) AUTO ZOOM: kamera liukuu lähemmäs, kehys + maalaus suurenevat yhdessä ja kehys poistuu kuvasta luonnollisesti (kangas täyttää
      ruudun); selvitä, onko syy kaide (kamera ei pääse) vai kohtazoom tekstuurin sisällä.
  (3) Kun ‹ ⏸ › ovat piilossa, ensimmäinen napautus vain tuo ne esiin eikä tee muuta (epäilty: piilonapin kohta laukaisee ALAREUNA
      TAAKSE -alueen, alin 18 %, liuku 3 m); himmeän napin painallus toimii suoraan. Kuvapari tai < 1 min video täysikokoisena PT:lle.
- SAMAAN KORJAUKSEEN (OMISTAJAN PYYNTÖ 23.14 PT:n kautta, sanatarkasti): "kävely monalisan luo on liian hidas. peli voi aivan hyvin oikoa
  esteiden ohi. ei haittaa vaikka se ei olisi oikeasti mahdollista. näin saadaan järkevämmät lähestymiskulmat ja nopeampi siirtyminen.
  näkymän pyörittäminen on katsojalle ikävää, joten sitä pitää välttää kaikin mahdollisin keinoin. liikuttaessa museossa esim kahden
  vierekkäisen taulun välillä, riittää että kameraa käännetään hieman menosuuntaan, mutta ei kokonaan ja kamera voi edetä sivuttain ja
  lopuksi kamera käännetään taksin kohti seuraavaa maalausta, aivan kuin henkilö kävelisi sivuttain. näin voidaan välttää liika kameran
  kääntely oman akselinsa ympäri mikä on ikävän näköistä pelaajan katsoa."
  PT:n tavoite: (1) SUORA LINJA: napautus ja kierroksen siirrot suoraan teoksen eteen kaiteiden, penkkien, jalustojen ja kävijöiden läpi;
      reitinhaku vain seinien/oviaukkojen takia; Mona Lisan eteen suoraan edestä. (2) NOPEUS — KORJATTU (omistaja 23.17: "siirtymä voi olla pidempi
      kuin sekuntti. nyt se kesti noin 10sek mikä oli liian pitkä. aika voi vaihdella etäisyyden mukaan ja normaali kävelynopeus riittää,
      tärkeintä että päästään kulkemaan suorinta reittiä ja kameraa ei tarvitse käännellä niin aikaa säästyy paljon"): "1–1,5 s" KUMOTTU;
      kesto = suora etäisyys normaalilla kävelynopeudella, pehmeät lähdöt ja pysähdykset. (3) VÄHÄN KÄÄNTÖÄ: eteneminen sivuttain/vinosti, käännös menosuuntaan vain ~15°, lopuksi
      käännös kohti teosta; isossa suunnanmuutoksessa (vastakkainen seinä, toinen sali) musta välähdys (NÄYTTELYN VALINTA OVENSUULTA,
      < 250 ms) pyörityksen sijaan. (4) Automaattinen testi siirron kokonaiskäännölle ja kestolle (kesto ≈ suora etäisyys / kävelynopeus, ei kiertoreittiä). < 1 min video täysikokoisena PT:lle.
- TÄYDENNYS (omistaja 23.16 PT:n kautta; korvaa kohdan (3) "ensimmäinen napautus vain tuo ‹ ⏸ ›"): museon ‹ ⏸ › eivät enää piiloudu kokonaan
  vaan himmenevät. Himmeässä tilassa napautus mihin tahansa muualle kuin nappiin (lattia, teos, alareuna, tuplanapautus) vain tuo napit
  esiin; näkyvässä tilassa napautukset toimivat suunnitellusti ja nollaavat 5 s ajastimen; vedot/nipistykset aina suoraan. Toteutus
  yhdessä NUI:n kehysnappien häivytyksen kanssa (yksi yhteinen paikka; sovi NUI:n kanssa). Testi: himmeä + lattia → ei kävelyä.
  NUI 23.2x: yhteinen toteutus valmis haarassa natiivi-ui/kehyshaivytys-201 ec5819d17 (juna-200-pohja, käännöksessä): KehysNapit
  häivyttää kaikkien linssikerrosten mk-ohjausryhma-ryhmät (myös museon ‹ ⏸ ›) 5 s jälkeen 20 %:iin ja nielee UI-pintojen klikkaukset.
  SINUN OSUUTESI: museon maailman napautuksiin (lattia → kävely, teos) irrotuksessa ennen toimintoa
  `if (SyoteLukko.NapautusNielty(ruutuPx)) return;` (Scripts/Peli/SyoteLukko.cs; pikselit, origo vasen alakulma) — pallo, Kipin
  Mikä tämä on, tehtäväkohteet ja dioraama tekevät jo niin. Museon oman automaattiesityksen inline-opacity voittaa NUI:n luokan (ei
  ristiriitaa). NUI:n testi KehysHaivytysTestit.HimmeanaLattiaanEiKavelyaNakyvanaKavely. SyoteLukko on vain proto-gitin NUI-haarassa → pohjaksi se tai odota sen mergeä.
- NS (local_674b9ec4-…) tekee junaan 201 "koko ruudun UI peittää 3D:n" -lepotilan ja rekisteröinnin MuseoSovitin.cs:ään: sovi NS:n kanssa
  ennen MuseoSovitin.cs/MuseoNayttamo.cs-muutoksia (vastasin 23.2x: minulla ei kesken muutoksia niihin).

## 0. TEHTY 23.1x: Louvren puhe ja salien 1–2 avaukset ÄÄ:n uusiin ottoihin = 133e7c00e (huoneet.json, lahestyminen.json,
MuseoMaaTestit; Linssit 1993/1993) → NS:lle cherry-pickinä runkoon 201 (vain tämä commit), PT:lle kerrottu. Tarkista NS:n kuittaus.

## 1. ENSIMMÄISEKSI: LOUVREN PYRAMIDIN TERÄVÄ VARJO -SIMU (OMISTAJAN PÄÄTÖS 22.27 PT:n kautta)
Omistaja 22.27 pyramidi v2.1:stä: "Pitää olla terävä mutta pieni varjo ei pehmeä. Muuten ok" → hyväksytty junaan 201, kun varjo on
TERÄVÄREUNAINEN, PIENI, tiiviisti pohjan alla, tummuus = pelinappulan varjo.
- Haara linssiseppa/orsay-valinnaiset-200, worktree /Users/Shared/Claude/wt/proto-linssiseppa-orsay. Uusin 22ce38984 (TeravaPeitto 0,8,
  TeravaSiirtoY 0,028). Edellinen simu f59dd7e7 (736739247, peitto 0,6): terävä ja kiinni, mutta ≈ RGB 160/145/110 vs. nappula 130/101/45.
- KÄÄNNÖS VALMIS 23.11: ede9300b (sisältää 22ce38984; ajo ajo-louvreavaus201c.zsh odottaa .nyt-tiedostoa, `pgrep -fl ajo-louvreavaus201c`;
  jos ajo on kuollut, käynnistä uudelleen, se kääntää ensin). Seuraavaksi → JU:lle simuvuoropyyntö (iPhone BD64C8E4 ~4 min) → JU:n
  SIMU NYT → `touch …/linssiseppa-ajot/simu-louvreavaus201c.nyt` → odota "SIMU ALAS" → "SIMU VAPAA" JU:lle.
- Tarkista TÄYSIKOKOISENA (PT 21.5x työtapa): rajaus raaka-G1:stä (386,392,1110,1047) = lähikuva ja (560,800,860,1000) × 4 = pyramidi +
  nappula. Mittaa varjo (esim. x 650/710/780, y 940–962) vs. nappulan varjo (634,831) ≈ 130/101/45. Jos yhä selvästi vaaleampi: nosta
  TeravaPeitto (KaupunkiPalloKuva.cs, TeravaVarjo) tai leveämpi TeravaSiirtoY.
- Kuvat _valmiit/louvre-pyramidi-200-20261017/ (O1z-…, O1zz-…, täysikoko O1-…) + LUE-v2.md:hen v2.2-osio. PT:lle 3 riviä → PT vie KK:lle.
  Ei videota (omistaja 22.02: paikallaan pysyvä muutos = kuvapari). NS:lle sha junaan 201 VASTA KK:n kuittauksen jälkeen.

## 2. TÄNÄÄN (17.10. ilta, kaikki orsay-valinnaiset-200)
- Pyramidi v1 (bc1748db0) omistaja 20.21 "Ei hyvä. Katso itse" → v2: KarttaLasi.shader (esikerrottu läpikuultava lasi VS:n Louvren
  pihapyramidin arvoin, 9 riviä ristikkoa fwidth:llä, valoreuna, siniharmaa yläosa) + KarttaLasiSuoraksi.shader (Blit → tavallinen alfa),
  LR:n sarjan koko (leveys 0,85 × KarttaesineKoko, SarjaLeveysOsuus), siirto alaoikealle (SiirtoX 0,45 / uusi SiirtoY 0,5), pohjan
  muotoinen kivireunus (35°, 1,12 ×, 0,8 m; PT: poikkeus LR:n sarjaan), terävä pohjavarjo (TeravaVarjo).
- MAGENTAN SYY b6e54fcce: KaupunkiPallot.Ruutu ei kutsunut museoKuva/louvreKuva.Askel → Rijksin ja Louvren kamerat piirsivät joka ruudun
  eikä lasin kuvaa muunnettu. LR:lle kerrottu (galleria-200 tarvitsee mergen).
- 86ef197d2 VihjeVarjo kaikille nostoille (PT hyväksyi LR:n arvot): Peitto 0,5, Korkeus 0,35, MinLeveysPt 28 (Aloitusvihjeet laiteskaalalla).
- Levy: 6 proto-worktreetä poistettu (houkutin, pystyvipu, vipu, kerrospiilo, louvre, puutomat191); jäljellä orsay + kierrokset195 (T=).
- Muistiin: testaus-vain-automaattiset.md ← omistajan 22.02 "nauhoitusta voisi vähentää" (kuvapari, ei videota).

## 3. AVOIMET
- Codexin #361 sn1-pelitoimitus ei tullut (viimeisin b5cc72fea). Tullessa KTX2 + portti + vienti samana tuntina.
- Opit: Mathf.SmoothStep(a, b, t) ≠ GLSL smoothstep; uusi KaupunkiPalloKuva tarvitsee Askel-kutsun KaupunkiPallot.Ruudussa; varjostimen
  Color-ominaisuudet muunnetaan sRGB:stä → lineaariset arvot Vector-ominaisuuksina; pohjavahti estää new Color(…) UI/*.cs:ssä → tyylikirjan
  arvot; L1-lukon alla varjostintarkistus: linssiseppa-ajot/lasitarkistus.zsh (editorissa 0 virhettä ei todista laitetta).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261017-2300.md).
AIKARAJA: juna 201 lukitaan 00.30, sha + kuvat/video PT:lle viimeistään 00.15 (ks. AIKARAJA-osio alussa); mikä ei ehdi → juna 202.
Ensin kohta 00 (Mona Lisan napautus suoraan kaiteelle), sitten kohta 1 (pyramidin terävän varjon simu ede9300b JU:n vuorolla → mittaus nappulaa vasten → lähikuva + 4× PT:lle → KK:n kuittauksen
jälkeen sha NS:lle junaan 201), sitten Codexin sn1-toimitus kun se tulee.
