# Karttaseppä: luovutus 10.11.2026 klo 23.35 (KS)
Syy: konteksti 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -2300:n (taustat: git show 21cc01087:docs/raportit/viesti-karttaseppa-luovutus-20261110-2300.md).
HUOM kello: aja `date` ennen jokaista aikaleimaa. Tyyliohje (KK, sitova): /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-pariisin-nahtavyydet-tyyliohje.md
NÄKYVÄ TYÖ: karkea kuva KK:lle (local_d5f31591-21fa-4cb0-bab3-bcd3435d075a) suoraan, kopio PT:lle; junaan vasta KK:n katsottua. Ruudukko Tripo | koodi + kaukaa.
Worktree: /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna (remote natiivi-backup), nyt haarassa karttaseppa/nahtavyydet-1-1 (puhdas).
Työkansio: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna/ (ajopyynto.md = JU:n jono, LISÄYKSET 23.15–23.45).
Testit: `sh Kartta-testit/kaanna.sh` (753) ja `sh Peli-testit/kaanna.sh` (899), `sh Peli-testit/unity-tarkistus.sh` (aina sh).

## TEHTY tässä sessiossa (23.11–23.35)
- OSM-haku: pid 1408 oli kuollut tyhjällä lokilla (planeetta 95 Gt). Ajettu Île-de-Francen otteesta (T7 vesimaski/lahteet/ile-de-france-latest.osm.pbf, 8.10.):
  nd-puisto/hae-cite-idf.mjs → cite-osm.json (2153 puuta, 3465 tietä) alle minuutissa. Sama tapa louvre-altaat/hae-louvre.mjs:ssä. Planeettaa ei enää tarvita.
- ND-PUISTO 5f00b2ee6 (haara karttaseppa/nd-puisto = d7d781e53 + data, pushattu): tee-puisto.py rajattu Île de la Citén polygoniin (way/55693529;
  ennen mukana rantojen puistot, Viviani ym.): Square Jean XXIII, eteläkaista, Île-de-France-aukio, Hôtel-Dieun piha; pala nd-koodi-puisto X 629 Y 537
  400 × 387 (17 008 m²), 51 OSM-puuta NotreDamenKoodiPuut, KoodiPuutAvain NdKoodi. Peli 899/899, unity 0. KARTTA-TESTIT AJAMATTA tällä haaralla → aja ennen junaa.
  Esikatselu nd-puisto/esikatselu.jpg (katsottu). VIHREA (178,172,108) yhä arvio → tarkista KJ12:sta.
- KJ11 Invalidit (b7c9414e8) katsottu: kupoli kultainen, katot siniharmaat, talot palanneet; LÄHIKUVA EPÄONNISTUI (Vaubanin aukio). Unityn
  ArgumentOutOfRange = UnityEditor.Search, ei meidän. Ruudukko KK:lle + PT:lle 23.2x: koodijuna/parit-kj11-b7c9414e8/ruudukko-in11-tripo-koodi.jpg
  (rivit yleis, pohjoinen, Dôme, kaukaa; vasen Tripo). KK:lta kysytty katon sävy. m² PT:lle lähetetty.
- nahtavyydet-1-1 (kaikki pushattu natiivi-backupiin), kukin koe, ei junaan:
  f9daa9b32 OPÉRA: kupolit 0x8EA394 harmaanvihreä, muut katot 0x8E979D, näyttämötorniin kiviset kolmiopäädyt molempiin päihin, kivi TaloKivi × 1,12,
    PohjaPoisKoodilla opera:Opéra. Talot raivaus-1-1-opera (19 → 1), palat-v25-opera-1-1 = invalides-1-1 + 3 palaa.
  ed4abf5d1 LOUVRE: pyramidin lasi kirkas, särmät vaaleat (koko ennallaan), Cour Napoléonin 7 allasta OSM:stä (louvre-altaat/muunna.py + kolmioi.py,
    muunnos tarkistettu pikkupyramideista), liuske 0x838A92 / sinkki 0x979CA1. Talot raivaus-1-1-louvre (tee-maskit.py:hin PIDA = Carrousel'n kaari
    way/227483542 jää; 171 → 7), palat-v25-louvre-opera-1-1 = opera + 5 palaa. (Kaari-pois-versio *-kaaripois jätetty vertailuun.)
  bf172309d SACRÉ-CŒUR: munakupolit (pääkupoli 24 m suippo), kulmakupolit säde 4,2 rumpu 6, pääkupolin rumpuun pylväskehä, rungon katot 0x8E979D,
    kivi 0xF3EAD6. EI raivausta eikä PohjaPoisKoodilla: Tripo-mäki jää, talot törmäisivät mäkeen → ratkaise mäki ensin (KK/PT).
  4eed281af SAINTE-CHAPELLE: ikkunat 8 m → räystään alle, lasi 0x2C3D7A, kivi TaloKivi × 1,12, eteiseen välilista + kaidevyö. Ei raivausta (ND-alueen KSC 2).
  Testit jokaisessa: Kartta 753/753, unity 0.

## JU:N JONO (ajopyynto.md; kuittaukset KS:lle) → katso täysikokoisina, ruudukko Tripo | koodi KK:lle, kopio PT:lle
1) KJ12 ND-puisto 5f00b2ee6 → lokit/karttaseppa-nd-puisto-kj12-5f00b2ee6 (8 kuvaa nd12-*: tripo/koodi kaukaa+lähelta, koodi-ita, koodi-pohjoinen,
   lahi-lansi, lahi-ita). Tarkista KK:n kohdat: aukion irtovarjot/pohjan katkoviiva (lahi-lansi), puisto vihreä ja puut, katto näkyy, kulmat aidosti eri.
   Hyvä → KK:lle; KK:n OK → PT:lle 224.47-ehdokas (haara nd-puisto; 224.47 = 321324163 Panthéon, nd-puisto ei sisällä sitä → PT/JU yhdistää).
2) KJ13 Opéra + Invalidien uusi lähikuva (in13-koodi-lahi-piha, -dome) → lokit/karttaseppa-opera-kj13-f9daa9b32 (tai -4eed281af, jos JU ajoi yhdellä käännöksellä).
3) KJ14 Louvre → lokit/karttaseppa-louvre-kj14-ed4abf5d1 (10 kuvaa lv14-*).
4) KJ15 Sacré-Cœur → lokit/karttaseppa-sacre-coeur-kj15-bf172309d (7 kuvaa sc15-*).
5) KJ16 Sainte-Chapelle → lokit/karttaseppa-sainte-chapelle-kj16-4eed281af (7 kuvaa sch16-*).
JU:lle sanottu: KJ13–16 voi ajaa yhdellä käännöksellä 4eed281af → lokikansion nimi voi poiketa; etsi `ls -dt lokit/karttaseppa-*kj1[3-6]*`.

## AVOIMET
- KK:n vastaus KJ11:een (katon sävy) → korjaa Invalidit tarvittaessa.
- Panthéonin KK-huomiot (aukion kiveys/reunaviiva; pylväiden välit tummanruskea seinä + ovi) seuraavaan kierrokseen.
- Kyltit irti 1:1-mallista: NUI tekee (haara natiivi-ui/nahtavyys-paisuu) → KS katsoo ennen junaa.
- Invalidien paketti v5 ym. vasta KK:n hyväksynnän jälkeen; palojen ketju nyt: kolme → pantheon (v4, 224.47) → invalides → opera → louvre-opera.
- Jono tyhjä KJ16:n jälkeen (Opéra, Louvre, SC, Sainte-Chapelle tehty) → KK:n palautteiden korjaukset, sitten "JONO TYHJÄ: Karttaseppä" PT:lle.

## Vahdit (uusi sessio virittää)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min).
- OSM-hakua ei enää käynnissä.

## LISÄYS 23.4x: KK:n palaute KJ11 Invalidit (EI junaan; korjaa ENNEN Opérata, KK: "uusi pari näiden jälkeen; sitten Opéra")
1) Seinät liian tummat (ruskea kuin talot) → sama vaalea kalkkikivi kuin ND:ssä: InKivi = NahtavyysKivi.Seina (nyt TaloKivi × 1,12), varjo samassa suhteessa
   (Tripo-version kermanvaalea on oikea sävy). Huom: KK sanoo "kuin Panthéonissa" – Panthéon on TaloKivi × 1,12; tarkista, ettei Panthéonkin näytä ruskealta.
2) Kupoli tynkä → lyhty + risti huippuun, kupoli hieman korkeammaksi rumpuun nähden; kupolikirkon (Dôme) eteen pylväspääty OhjelmaKohdeOsat.OsaPylvasPaaty.
3) Maa: Tripo-pohjan pois jättäminen (PohjaPoisKoodilla) jätti haalean sumean laikun, nurmet katosivat, etelässä tumma lammikkoläiskä → nurmet ja käytävät
   takaisin kuten Tripo-kuvassa (esim. ND-puiston tapaan OSM-nurmet palana vain koodilla: tee-puisto.py-resepti, alue invalides, leisure/landuse=grass).
4) Lähikuva epäonnistui taas → YKSI toimiva lähikuvaresepti kaikkiin kohteisiin: kohde keskellä, noin puolet ruudusta, katto näkyy, viistosti etuviistosta.
   Testaa kerran (esim. Invalidit) ja käytä sitten kaikissa. KJ12–16:n lahizoomi-kuvat voivat epäonnistua samoin → älä vie niitä KK:lle ennen katsomista.
KJ13 (Opéra) on jo JU:n jonossa; Invalidien korjausten pari ajetaan sen jälkeen, ja KK katsoo Invalidit ennen Opérata.

## LISÄYS 23.4x (2): viestit nollauksen odottaessa
- KAMERA LÄHIN 2,7× TEHTY (KK 23.1x, PT): b5ef8b0c9 natiivi-backup karttaseppa/lahin-2-7x = 321324163 + IsoisaLahinLeveys 0,525 → 0,195 (~0,65 km),
  PiirrosLahinTestit 0,55–0,75 km. Kartta 753/753, unity 0. Sha NUI:lle ja PT:lle lähetetty. NUI ajaa KK:n tarkistuskuvat (pari kuten
  _tyo/natiivi-ui/paisunta/paisunta-5-pari-lahin-nyt-vs-2-7x.jpg Mac-kuvana + Riemukaari lähimmästä) → KK, kopio PT. Seuraa KK:n vastausta; junaan PT:n kautta.
- KK 23.3x: KATOT yksi yhteinen liuskekiven sävy kaikille kohteille = Panthéonin katto (PnKatto 0x8E979D); Invalidien katot nyt liian siniset/kirkkaat
  → hieman tummemmiksi ja harmaammiksi samaan sävyyn. Tarkista samalla Louvre (LvLiuske 0x838A92 / LvSinkki 0x979CA1) ja Opéra → sama sävy.
- JÄRJESTYS (KK/PT): kameramuutos (tehty) → Invalidien korjaukset (LISÄYS 23.4x 1–4 + katot) → uusi pari KK:lle → sitten Opéra.
- NUI: OMISTAJAN PÄÄTÖS 23.29: nähtävyyden paisuminen PELIIN kaikille kylttikorjauksen kanssa. KS:N KATSOTTAVA ennen junaa: natiivi-backup
  natiivi-ui/nahtavyys-paisuu (kärki 714266606): kylttikorjaus 7b1605f21 (OhjelmaKohteet.KoodiMalli, Nahtavyysalue.Kylttikohde) + PaisuntaTila.cs.
  NUI:lle sanottu: otsikon "KOE, ei junaan" saa muuttaa itse. Kuittaus NUI:lle (local_4b84cd90-123f-46c5-bc07-75760ed4c80b) katsomisen jälkeen.
- NUMEROINTI (PT): 224.47 = Panthéon 321324163 (MR39b), 224.48 = PK koneportaat (MR40). ND-puisto saa seuraavan vapaan numeron KK:n katsottua (JU antaa).
- JU: KJ12 ajossa (5f00b2ee6), KJ13 f9daa9b32:lla, KJ14–16 kaikki 4eed281af:llä → lokit/karttaseppa-{louvre-kj14,sacre-coeur-kj15,sainte-chapelle-kj16}-4eed281af.
  JU-sivusessio nollautuu; tulosrivit JU:n jonolokissa ("AJO KS …").

## LISÄYS 23.5x (3): KIIREELLISIN ENSIN
0) JUNA KAATUI (JU, MR39b 224.47): 321324163 ei sisällä junan talot v3:a (6d82a050c, palat-v25-kolme-1-1) → ristiriita StreamingAssets/talot/pariisi.json;
   juna palautettu 7b5a45561:een (julkaisija/juna-224). TEE: talot v4 junan päälle (merge/rebase julkaisija/juna-224 7b5a45561; pariisi.json = kolme 1:1
   + Panthéon eli palat-v25-pantheon-1-1, joka on kolme-1-1:n päällä), uusi paketti ämpäriin (--edellinen = junan v3) ja uusi sha JU:lle.
   TARKISTA ämpärin v4-paketti (23.04, talot-paketti-pariisi-v4): tehty ilman v3:a → puuttuuko RK/ND/Eiffel-raivaus. Kirjoita uusi palat-ok vasta korjatusta.
   Rebasettaa myös b5ef8b0c9 (lähin 2,7×, yksi vakio) junan päälle tarvittaessa; sha NUI:lle, VS:lle (local_5ebb0658-96f6-434d-8a38-b122eb53032f) ja PT:lle lähetetty.
   PT: lähimmän tarkistuskuvat ajaa NUI (sovittu 23.38): pari Mac-kuvana + Riemukaari lähimmästä → KK. Varmista NUI:lta, että ajo on JU:n jonossa.
1) OPÉRA (KJ13 f9daa9b32): KK "NÄYTTÄÄ OIKEALTA → saa mennä junaan", paras koodimalli, taso muille. Junaan PT:n/JU:n kautta (Opéra-koodi + raivaus-1-1-opera
   -palat; huom. talojen ketju pitää rakentaa junan v3/v4:n päälle, ei invalides-ketjun). op13-koodi-lahi = LÄHIKUVARESEPTI kaikille kohteille
   (lahizoomi 8, kallista 45 → hieman ylemmäs eli kallista ~40, etäisyys 0,0025, suunta etuviistosta), ettei kupolin huippu rajaudu.
2) ND-PUISTO (KJ12 5f00b2ee6) EI junaan: a) PUUT LIIAN ISOT 1:1-katedraalin vieressä → puu ≤ ~15–20 m (tornit 69 m); sama tarkistus muiden 1:1-kohteiden
   puihin (Eiffelin juuri KJ9). Etsi puun koko (koko 0,80–0,92 tee-puisto.py:ssä; mikä mittakaava = metrit?) ja pienennä KoodiPuut. b) Parvis (länsi)
   avoimeksi: puut vain etelä- ja itäpuoleen (Square Jean-XXIII); rajaa tee-puisto.py:ssä x > julkisivun linja. c) E-muotoinen irtovarjo yhä aukiolla
   (lahi-lansi alareuna) → poistettujen talojen varjot/pohjat (talot poisto 1). d) lähikuvat reseptillä 1).
3) INVALIDIT (in13-koodi-lahi-dome): katot nyt oikean harmaat. Vielä: seinät samaan vaaleaan kuin Opérassa (nyt hiekanruskeat; HUOM InKivi = OpKivi =
   TaloKivi × 1,12 → ero ei ole värivakiossa: tarkista InVarjo/Sauma/AO tai valaistus; vertaa kuvia), kupolin lyhty + kärki (uusi kuva koko kupolista),
   etukentän kaksi irtonaista pikkutaloa pois (raivaus), haalea varjolaikku kentällä. Ei junaan ennen uutta kuvaa.
Järjestys KK: (0 juna) → lähin 2,7× tarkistus → ND:n puiden mittakaava → Invalidit. KJ14–16 (4eed281af) ajossa JU:lla.
