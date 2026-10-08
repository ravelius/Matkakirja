# UI-kuvien terävyys (Natiivi-UI 8.10.2026, juna 169/170)

Päätoimittajan erä (omistajan linja 19.5x: kaikki grafiikan parannukset): ladataanko käyttöliittymän kuvat laitteen näytön
tarkkuudella (iPhone 3×, iPad 2×, Mac Retina 2×)? Kartoitus: kaksi Sonnet-agenttia (kuvien lataus; piirretyt tekstuurit, ikonit ja
Resources), koodi luettu, ei laiteajoa. Tarvittava = näyttökoko pt × pikselisuhde.

Proto natiivi-ui/terava-170 346435604 (e56225d0b:n päällä). Testit: tarkista.sh 0, Linssit 953, Peli 419, Kartta 448, pohjavahti ok.

## Kunnossa

- SVG-ikonit (Ikonit.cs → SvgIkoni, Painter2D) piirretään vektoreina näytön pisteisiin: ei rasterointia, reunat näytön tarkkuudella.
- Laitekohtaiset kuvat: yläpalkki, ISS-paneeli, -ohjaamo ja -ohjaus, kävelykerrokset, linnan laput ja Olavinlinnan minikartta
  ovat valmiiksi @3x (iPhone) ja @2x (iPad). Kaupunkipallot 360 px (120 pt × 3), kartussin lippu skaalautuu jo pikselisuhteella.
- Kuvat.Hae ei rajoita kokoa (purku vain pitkä sivu ≤ 2732), joten valokuvien terävyys riippuu ämpärin tiedoston koosta.

## Korjattu koodissa (ulkoasu ennallaan)

| Pinta | Ennen px | Näytöllä pt | Tarvitaan (3× / 2×) | Nyt px |
|---|---|---|---|---|
| Maakunnan minikartta, suurennos | 512 | 354 iPhone, 738–900 iPad | 1062 / 1800 | min(1024, pt × suhde), piirretään avauksen jälkeen; viivat samassa suhteessa |
| Aikajanan repaleinen pergamentti | 400 | 317 iPhone, 496 iPad | 951 / 992 | laatikko × suhde, ≤ 1000 (muodot skaalautuvat w / 400:lla) |
| Valokeila (aikajanan havainne) | 640 × 400 | ~365 / ~680 | 1095 / 1360 | 1152 × 720 |
| Kertomuskuva I / II | 600 × 400 / 960 × 640 | ~350 / puoli ruutua | ~1050 / ~1200 | 1080 × 720 / 1200 × 800 |
| Keksijäkaruselli, keskikortti | 240 × 300 | 162 | 487 | 480 × 600 |
| Lehden sisällyskuvat | 104 | 52 | 156 / 104 | 52 × suhde |
| Ajattelijoiden päät (kartta) | 192 | 96 | 288 / 192 | 96 × suhde |
| Puhujakuva (linnan dioraama) | ≤ 256 | 72–140 | 420 / 280 | ≤ 512 (hyöty vain 512 px lähteille) |
| Sijaintipallo, RenderTexture | 320 / 640 | 120 / 240 | 360 / 720 | 360 / 720 |
| Visan Commons-vara (kuva / lippu / pulma) | 640 / 320 / 480 | 190–300 | 675–1020 | 1280 / 960 / 960 (peilatut ensin kuten ennen) |
| logo.png 720 × 176 ja 13 symbolia 96 × 96 | Unity skaalasi kahden potenssiin (logo 512 × 128) | 224 × 55 | 672 | alkuperäinen koko (nPOTScale None) |

Muisti: valokeilan välimuisti 12 → 8 kuvaa (enintään ~27 Mt). Minikartan iso kuva vapautetaan sulkiessa; piirto 2 × 1024
ylinäytteistettynä ~50 Mt hetkellisesti.

## Vaatii isommat lähdekuvat (ämpäri tai Resources) — tekijä Päätoimittajan päätöksellä

| Pinta | Nyt | Tarvitaan | Ehdotettu tekijä |
|---|---|---|---|
| Liput: iso lippuikkuna ja lippukysymys | R2 liput/ 320 px (peilaa-media.mjs) | ~1000 px | Julkaisija: liput uudelleen ≥ 1024 px uuteen polkuun (CDN välimuistittaa vanhan) |
| Kuvasuurennos iPadilla (koko ruutu) | R2 kuvat/ 1200 px | 1640 pysty / 2360 vaaka | Julkaisija: suurennoksen kuvat ≥ 2048 px (ehdotus: vain kuvat, joita suurennos näyttää) |
| Julisteiden galleria | tuotanto/pieni 360 px | ~472 px (pitkä sivu) | Julkaisija tai Pelikoodari (tee-pienet-kuvat) 480 px |
| Livian kerroskuvat (LiviaEva) ja kypärä | @2x 304 × 608, kypärä 192 | @3x 456 × 912, kypärä 378 | Livian kuvien tekijä (Pelikoodari) @3x-versiot |
| Puhujakuvat 256 × 256 | 256 | ~420 | Linnan kuvien tekijä (Siirtoseppä / Codex) 512 px |
| Sijaintipallon pinta | 4 BMNG z1 -laattaa → 512 px (pallonpuolisko ~256 px) | ~720 | Karttaseppä tai LS1: z2-laatat (1024) |

## Jätetty ennalleen

- ISS:n omien kuvien paikkakuva 256 px (näkyy ~2 s ennen täyttä kuvaa).
- Proseduraaliset pergamentti-, vinjetti- ja sumutaustat 128–256 px: pehmeä liukuma ja rae tarkoituksella.
- 3D-näyttämöiden RenderTexturet (ajattelija 2/3, dioraama 0,8 ruudusta): suorituskyvyn takia, ei UI-terävyyttä.
- Lautapelien nappulat 160–256 px (~1,1–1,2 × tarve): rajalla, ei mitattu.
