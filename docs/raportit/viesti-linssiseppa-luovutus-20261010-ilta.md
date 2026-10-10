# Linssisepän luovutus 10.10.2026 klo 18.0x (nollaus, konteksti 55 %)

Proto-haarat ovat paikallisia (sama git /Users/Shared/Claude/proto-3d/Matkakirja-proto, ei pushia). Worktreet:
`wt/proto-linssiseppa-taidemuseo` (nyt linssiseppa/museo-varjot-180; todistusajo.sh asuu täällä) ja
`wt/proto-linssiseppa-kaupunkiaanet` (nyt linssiseppa/pariisi-esittely-179). Simu- ja käännösvuorot vain Julkaisijalta.
Käännös: `PROTO_APP_KOPIO=<lokit/linssiseppa-app/<nimi>> proto-kaanna.sh <haara>` (ei asennusta), todistusajot
`<taidemuseo-wt>/tyokalut/todistusajo/todistusajo.sh --era … --udid … --app … --sha … --haara … --laite ipad|iphone --nyt --skenaario …`.

## Kuitattu tänään (tilinvaihdon jälkeen)
- Juna 178: pallomerkit-paivitys d74c8142c, opas-kori-178 063fba058, pariisi-mac-178 92cda8472 (kaupunkipallo avaa oppaan ohi
  linssien saatavuuden), tuileries-pois-178 197610afd (omistajan "harmaa möntti" = ElavatElementit kokeilu 3).
- Juna 179: museo-kombo-178 691969c66 (museo2: Poistu tumma KORTTI-rivi, teoskyltit vaaleiksi, NUI 9f7ea98ac, Natiivisepän
  museo-muisti, nimikyltti puhelimella Otsikko-koossa) ja **pariisi-esittely-179 a6771263c** (omistaja 17.3x sitova: Pariisin
  esittely EI kuumailmapalloon → Saapumisesitys.NykyIntro jatkaa luennan pakkaa + Ohitaa C1–C5:llä musiikin tahdissa;
  OpasSovitin.IntroPallossa = false). Hylätty: 550b2d6cd (kippi auki saapuessa) — EI junaan.
- Pulun kiipeäminen yläpalkkiin: NUI 2c05d4700. Museon Yövartio-kortti: NUI 9f7ea98ac.

## KESKEN: museon varjot + lattiaheijastus (juna 180, PT kuittasi suunnitelman 17.3x)
- **Lattiaheijastus TEHTY, todentamatta:** linssiseppa/museo-varjot-180 45e35e9e6 (691969c66:n päällä): MuseoNayttamon
  peilikamera (peilimatriisi + vino lähitaso y = 0, puoliresoluutio HDR + mipit), MuseoValaistu `_Heijastus` (parketti 0,3,
  marmori 0,5) Fresnel + karheus-mip; QA `museo heijastus 0|1|tila`. unity 0, tarkista ok. Käännös + 2 simua pyydetty
  Julkaisijalta (ei vielä ajettu). Skenaariot `tyokalut/linssiseppa-ajot/sk-museo-heijastus-180.txt` (iPad vaaka) ja
  `-puhelin.txt` (pysty): sama asento heijastus 0/1 aulassa, Kunniagalleriassa, Yövartiossa → kuvapari PT:lle. Tarkista
  kuvasta, ettei heijastus ole pystysuunnassa käänteinen (GetNormalizedScreenSpaceUV + RT-origo); jos on, käännä suv.y.
  PT mainitsi "LS2:n lattiaheijastus kytkettäväksi" — en ole saanut LS2:lta mitään; kysy LS2:lta ennen kuin teet päällekkäistä.
- **Varjot (LR):** v2e valmis (_valmiit/taidemuseo-alankomaat-v2e: kehysten ja 34 patsaan varjot valoatlaksessa). Pyysin LR:ltä
  v2f:n, jossa m2-v1 = RP-P-OB-444 ja m2-v2 = RP-P-OB-602 (kierroksen pysähdys 3; v2e:ssä 612/616 → ei kehystä/varjoa).
  Kytkentä v2f:llä: (1) `tyokalut/museo_sali_paketti.py` versioparametri → sali-v2-vientipaketti (_valmiit/*-vienti-*/,
  LAHTEET.md, SHA256SUMS; Julkaisija vie vie-paketti.sh:lla), (2) Resources/Museo/alankomaat/sali.json = v2f:n sali.json,
  (3) MuseoRakennus `sali-v1/` → `sali-v2/`, (4) veistokset.json sijoitus v2f:n 34 veistospaikkaa (kaikki 34 patsasta jo
  astc-v1-paketissa ämpärissä; kg-v1/kg-v2/leiden-v4 poistuneet). Maakontakti patsaille tulee LR:n leivonnasta (ei koodia).
- **Mittaus:** iPad Pro 13 (00008103) Release, kävely Yövartioon: fp huippu, gc, fps p50/p95 ennen/jälkeen (laitevuoro Julkaisijalta).

## Huomiot
- iPhonen saapumisesityksessä (arkki todistus-pariisi-esittely-179b-20261010-1755, 8 s / 25 s) Pulu seisoo valokuvapakan päällä
  → tarkista, onko vanha (sama tilanne ennen 179:ää?) vai uusi; jos uusi, NUI:lle.
- NL-sali v2d/v2e/v2f korvaa toisensa; käytä aina uusinta LR:n ilmoittamaa.
- Mac TF -appi: PlayerPrefs ~/Library/Preferences/unity.Matkakirja.Matkakirja 3D.plist; rulla .line = zoom, .pixel = panorointi;
  Mac-toisto vain kun HIDIdleTime > 5 min, appi suljetaan omalla pid:llä.
