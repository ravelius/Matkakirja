# Natiivisepän luovutus 9.11.2026 klo 22.26

Edellinen: git show aa4775374:docs/raportit/viesti-natiiviseppa-luovutus-20261109-2205.md (pelin koko osa 2, kattokuvion palaute).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Nollauksen syy: konteksti 26 % (kontekstivahti, 7.37).
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py,
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …").

## VALMIS TÄSSÄ SESSIOSSA
- Pelin koko osa 2 (talolukija b2273c132): ajo -2 katsottu ✓ 22.15, PT kuittasi, JU yhdisti junaan 224 (21069f8df, KS 94b11251a mukana), talot ämpäriin
  viennissä. NUI:lle kerrottu, että Offline-polku on ajettu. Ei avoimia töitä.

## ENSISIJAINEN: TÄRINÄKORJAUS KOKEENA (OMISTAJAN PÄÄTÖS 22.22, PT 22.5x; ETUSIJALLA osiin 3–4 nähden)
Suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261109-tarina-nollapiste.md, OSA 1. Ei junaan.
PT:n ohje: pohja 224-kärki 21069f8df, oma haara; KK:n mekanismioletus (piirto floatilla) mittaamaton → MITTAA ENSIN. Mac-kuvat: esineet + talot
päällä + tärinämittari kierrossa lähimmällä etäisyydellä (~320 m) JU:n vuorolla; sitten JU kehitysversio asennuslinkkiin (lisämuisti) → JU rivi KK:lle.
Rivi PT:lle mittauksista.
- HAARA natiiviseppa/nollapiste = 21069f8df, EI VIELÄ COMMITTEJA. Worktree /Users/Shared/Claude/wt/proto-natiiviseppa-koodikoko (vaihdettu
  koodikoko-haarasta tähän; koodikoko 7a8f024ed on natiivi-backupissa).
- Aiempi aineisto: _tyo/natiiviseppa/palikkakoe/valmis-origo/origokoe-tulos.md (origo auttoi ~80 %), selvitys-origo-hinta/selvitys-tulos.md
  (kallistus = OhjelmaKohteet localRotation vanhassa kehyksessä; nähtävyysalueet 6 400 km pois; 317 kutsua 88 tiedostossa).
- TÄRINÄMITTARI EI OLE 224:ssä: se on PalikkaKerros.cs:ssä (776 riviä) palikkakoehaarassa (d907286cb; komennot palikat jalki/ero/sarja, 4d81046e3,
  2bfb126b0). Poimi vain mittari (jälki: silmän askel/nykäys csv; sarja: kehyskuvat + kuvaero) omaksi pieneksi koeluokaksi, ei palikoita.
- Löydöksiä tästä sessiosta (kartoitus 21069f8df): TransformEarthCenteredEarthFixedPositionToUnity 185 kutsua/77 tiedostoa, ...UnityPositionToEcef
  41/25, Direction 97/44, ecefToLocalMatrix 8/5, CesiumGlobeAnchor 15/6. PalloKierto.cs:3014 ja 3155 kertovat jo georeferenssin transformilla
  (gt.TransformPoint(...)) ja 3239 käänteisesti (g.transform.InverseTransformPoint) → A2 (georeferenssin transform.position = −P, TrueOrigin,
  ei kääntöä) toimii kameralle sellaisenaan; P 0,5 m:n ruudukkoon, jolloin vähennys on tarkka. Tarkista, mitkä muut 77 tiedostosta käyttävät
  tulosta maailmana ilman transformia (ne siirtyisivät 6 400 km): lähtökohta grep "TransformEarthCenteredEarthFixedPositionToUnity" ja katso,
  onko edessä TransformPoint tai onko kohde georeferenssin lapsi. Directionit eivät muutu A2:ssa (pelkkä siirto).
- Ehdotettu järjestys: (1) mittari + koekomento "nollapiste <lat> <lon> | pois" A2:lla + KorkeusKerroin.Aseta siirron jälkeen; (2) unity-tarkistus
  sh:lla; (3) Mac-skenaario: Pariisi, esineet+talot, vasen tappi lähimmäs, kierto; A–B–A (pois–Pariisi–pois) samassa asennossa, kuvat ennen/jälkeen
  + mittari; (4) JU:n vuoro, kuvat täysikoossa; (5) PT:lle rivi; JU kehitysversio asennuslinkkiin.

## KESKEN: PELIN KOKO OSA 3 (jatkuu tärinäkokeen jälkeen)
- HAARA natiiviseppa/iso-sisalto = 661effb4c (natiivi-backup; pohja b2273c132), worktree /Users/Shared/Claude/wt/proto-natiiviseppa-iso.
  IsoSisalto.cs (talojen muoto yleisenä: julisteet/iso/tiedostot/<sha>.gz, hakemisto StreamingAssets/iso/<osa>.json, avain = entinen
  Resources-polku; Tavut/Teksti: levy → editorissa lähdekansio → Resources → puuttuu ja pyydetään Nakyva-tasolla; joutilaana kaikki osat),
  komennot iso ampari|lataus [tyhjenna|kaikki]|lue, tyokalut/iso_paketti.py. Pilotti: ISS-skannerin 3477 kaupunkitiedostoa
  UI/Resources/IssSkanneri → UI/Palvelimelta/IssSkanneri (ydin 6 tiedostoa jäi); osa iss v1 33,3 Mt ladattavaa / 39,1 Mt purettuna;
  hakemisto buildissa 636 kt. Linssit-testit 5/5, unity-tarkistus (sh) 0 virhettä.
- AJO PYYDETTY JU:lta 22.22: natiiviseppa-iso-1-mac-661effb4c, skenaario _tyo/natiiviseppa/iso/sk-iso-1.txt (ämpäri
  _tyo/natiiviseppa/iso/ampari-koe-1/julisteet/iso, siellä iss.json kopio hakemistosta). TARKISTA lokista: "iso sisältö: osa iss v1, 3477",
  ensimmäinen k-kiova = esimerkkipinta + "puuttui 1+", toinen = levyltä (kuva I2 oikea korkokuva), "iss kokonaan levyllä", lopussa iso lue
  → "luettu levy". Kuvat I1–I3 täysikoossa. Sitten PT:lle 3 riviä + ehdotus siirtojärjestyksestä alueiden tekijöille (Pariisin nähtävyydet
  NotreDameKoe/astc .bytes sopivat suoraan Tavut-kutsuun; png/jpg tarvitsevat ASTC-muunnoksen ennen siirtoa, muuten muisti kasvaa;
  KavelyKerrokset NUI, linssit VS/LS, pelit PK). Ämpärivienti: JU ajaa iso_paketti.py:n uudelleen _valmiit-kansioon (koe-kansio ei ole vientipaketti).

## KESKEN: PELIN KOKO OSA 4 (koodi)
- HAARA natiiviseppa/koodikoko = 7a8f024ed (natiivi-backup): Rakennus.Kaanna lukee MATKAKIRJA_KARSINTA (Minimal|Low|Medium|High) ja
  MATKAKIRJA_KOODIKOKO=1 (IL2CPP OptimizeSize), palautus finally-lohkossa. Editor-kokoonpanoa unity-tarkistus ei käännä: metodi käännetty
  erikseen 6.7b8:n UnityEngine/*-moduuleja vasten (ilman UnityEditor.dll:ää, muuten CS0433). Mittauspyyntö JU:lle 22.25 (jonossa iso-1:n
  jälkeen): neljä Release-laitekäännöstä (ei / Low / Medium / Medium+KOODIKOKO), UnityFramework + .ipa; nopeusajo vain selvästi pienentäville.

## TAUOLLA: KATTOKUVIO (ennallaan, ks. edellinen luovutus)

## LISÄYS 23.1x (PT): PK:N EHDOKAS TÄRINÄÄN – ARVIOI ENNEN OMAA TOTEUTUSTA
PK teki ennen pysäytystä vaihtoehdon: LÄHIORIGO (georeferenssi kameran alle, kun siirtymä < 1,2 km) + kamera doublena, natiivi-backup
pelikoodari/drone-lahelle dc2605d31; laskelmat /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kierto-tarina/LUE.md; Mac A/B JU:lla.
PT: NS OMISTAA KOKEEN. Arvioi PK:n ehdokas (pysyvätkö esineet, talot ja nostot paikallaan origon siirrossa? vrt. selvitys-origo-hinta:
OhjelmaKohteet kallistuu, Nahtavyysalue jää 6 400 km pois) omaa kaupunkikohtaista nollapistettä (A2) vastaan ja VALITSE YKSI.
Ei kahta rinnakkaista toteutusta kehitysversioon. Lue ensin LUE.md ja PK:n Mac A/B -tulos (JU), vasta sitten oma koodi.
