# PT:n luovutus 1.11.2026 klo 05.15

Edellinen: viesti-fable-luovutus-20261101-0255.md. Tallenne /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-11-01-klo-0259-0513.md.
Osoitteet: /Users/Shared/Claude/osoitekirja.md. Viestit aina mcp__ccd_session_mgmt__send_message id:llä.
YÖLUPA (KK 23.42) voimassa aamuun: ei ostoja, ei uusia pysyviä poistoja, ei asetuksia/avaimia/CLAUDE.md.

## JUNA 216 (runko 28d8f3486 = bb115574d + VieritysHeratys d152a0278, NS)
- Ehdot ennallaan: (1) Pariisin uusi kartta KK:n hyväksymänä, (2) valo hyväksytty.
- NS: GC-kevennys 1 (72b039301) KUITATTU 05.2x (GC max 30 → 18 ms, nimikuvat ennallaan) → NS vie runkoon ja luovuttaa; uusi
  runko-SHA NS:n viestistä/luovutuksesta.

## PARIISI (KS) – kartta koottu, KK:n korjauskierros
- Codexin 97/97 palaa 1 m/px (PT valitsi 1 m/px: katot erottuvat), koodikerros (puut, elämä) ja 15 karikatyyriä (6 uutta).
  Kooste: proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/kooste-97-20261101/. Pelilaatat kokoelma/G1m valmiina.
- KK 05.5x: kadut, Seine, karikatyyrit OK; EI junaan ennen: pohjan sävy vaaleammaksi/lämpimämmäksi G:tä kohti, puut G:n riveinä,
  veneet/ihmiset/autot G:n tiheyteen, puistoihin käytävät + suihkulähteet (koodikerroksessa) → pari pelistä G:n rinnalle KK:lle.
  KS luovutti (PR 5811, kohta 4); seuraaja tekee nämä + pelikytkennän.

## VALO (VS + LAV)
- Löydös: peli piirsi Meridiaaniportin, Taihemenin, G-jalustan ja muurikatteen LOD0:n LEIPOMATTOMISTA glb:istä. Korjattu:
  kaiteeton-v2 (c2-v30, PK eaf42a83f) ja muurikate-v35 (ilman osasarjavarjostajaa, PK 6fbd10a68). Kulmatornit: pelin valolla (PT).
- -dil-leivonta (SOLU_SYL=1, DILAATIO=4) poisti pylväsraidat (k06z5) → LAV:n oletus; leivonta v4 rakennusvaihe alusta 04.52.
- LEVYRAJA laskettu 82 → 70 Gi kaikille ajoille (PT). Levy 72 Gi 05.13 → LAV siivoaa _tyo-kansiotaan.
- Auki: räystäiden alusvarjo yhä tasainen (VS: täyttöpeittokoe -dil-mallilla); muurikatto v29 vs v35 -pari; edusta Duanmen/Chaofang v92.
- Taivas 8192 (12 palaa, dd0d5d743) PT:n kuittaama suunnaksi (948 vs 1400 = pilvien tiheys). iPad-GPU-mittaus: VS:n laitekomennot
  _tyo/linssiseppa2/taivas8192-laite/, JU:n seuraaja ajaa (xctrace käynnissä 05.14).

## REITTI (PK)
- Maalikamera kuitattu (c5i: Puyi ~1/4 tunnelinsuulla, hidas nousu räystääseen). c5j-video eaf42a83f:sta odotusajolla →
  PT → KK (myös sivueunukin ennakoitavuus ≥ 2,5 s).

## MUUT
- Cloudflare valmis: ämpäri 204 Gt ≈ 3 $/kk; maasto 2026-09-24 (0,18 $/kk) jätetään. NAS-arkistoskripti korjattu (PR 5800, kuiva-ajo
  oletus, --aja vain PT:n kuittauksella). Lokit: esikatselu-/todistus-* ovat T7-symlinkkejä, ei sisälevyä.
- Natiivi-UI lepää oikeutetusti (ei avointa erää).

## Säännöt, jotka opin
- Tarkista, mistä glb:stä peli oikeasti lataa (Muurikate.cs, kulmatorni.json), ennen kuin leivottua pakettia pidetään tehtynä.
- Taulun ts aina millisekunteina (int), myös ylätasolla.
