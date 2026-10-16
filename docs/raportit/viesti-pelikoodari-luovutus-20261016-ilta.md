# Pelikoodarin luovutus 16.10.2026 ilta (KOVA RAJA 35 %, Postivahti, klo 21.58)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261016-iltapaiva: tehty loppuun (kori-varjo alla).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti, **docs/moduulit/yhteiset-pohjat.md (PR #4727, pohjien standardi)**.
- Viestit `send_message` session id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe,
  JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832,
  Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
- Testit (proto-worktreen juuressa): `sh Linssit-testit/kaanna.sh`, `sh Linssit-testit/unity-tarkistus.sh`. Ajotyökalut
  /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/. Oma simu iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19. _tyo/pelikoodari: ≤ 2 .app.

## 1. ENSIMMÄISENÄ: LIIKEPOHJA (omistaja 20.54) + museo ensimmäisenä käyttäjänä (omistaja 19.56–19.57 + 20.47), juna 197 (ei ehdi → sano PT:lle heti → 198)
Omistaja 20.54 "Kyllä, kaikki yhtä aikaa": pehmeä liike yhteiseksi pohjaksi kuten lasikortit; parannus pohjaan leviää kaikkiin linsseihin ja
peleihin; uudet vain pohjilla; ei väliaikaisia paikallisia korjauksia. PT: älä tee erillistä paikallista pehmennystä museoon.
- **Avaimet päätetty** (PT, NUI:n ehdotus): tyylikirja.json `liike.liikkeet` = kavely {2500 vähimmäiskesto, pehmea}, liuku {1200, pehmea},
  suurennus {450, pehmea}, katseenKaanto {1000 = 180°, pehmea}, korttiAvaus {220, sisaan}, korttiSulku {200, ulos}; käyrät nimettyinä
  (liike.sisaan/pehmea/ulos, cubic-bezier). Web #4728, natiivi NUI 9c21f8ffd: `Tyylikirja.Liikkeet.<Nimi>` = (int Kesto, Vector4 Kayra),
  `Tyylikirja.Kayrat.Sisaan/Pehmea/Ulos`, Ponnahdus.Kaari. **Käyrän arvioija (Bezier → t) on liikepohjan eli sinun.** Arvot voi päivittää
  pehmeiksi (ks. alla mitatut: suurennus Auto Zoomissa 1800/1600 ms, kohdat 2000 ms) – sovi NUI:n kanssa tyylikirjan arvoista.
- Tee pohja (Ydin, puhdas C#, esim. Linssit/Ydin/Kamera/Liikepohja.cs): nimetyt liikkeet → kesto + käyrä, Bezier-arvioija, SKayra-tyyppinen
  "tasainen vauhti rampeilla" kävelylle (MuseoKavely.SKayra on valmis malli), lähtökohtana pallokameran IKamera.Aja + siirtoajonPehmennys.
- **Automaattinen tarkistus** (testi): listaa pohjan ohittavat omat liikkeet (omat Lerp/SmoothStep/Pehmea kameroissa ja UI-animaatioissa;
  ~90 tiedostoa: Linssit/Unity 40, Linssit/Ydin 17, UI/Linssit 8) – vanhat sallittuna siirtolistana, uudet ei.
- **Museo ensimmäisenä käyttäjänä** – pohjana NUI:n **museo-nimi-197 0048e60e6** (Auto Zoom alkaa AutoZoomViive 2,5 s saapumisesta, nimi ensin;
  AjastaAutoZoom/PaivitaAutoOdotus/autoOdottaa). Omistaja 20.47 (kuva docs/raportit/kaappaukset/omistaja-20261016/museo-laivamalli-nimi-nakyy-2047.png):
  ensin koko teos + nimi rauhassa (ehtii lukea), vasta sitten pehmeä liuku lähemmäs ja nimi piiloutuu; nimen näkyvyysvikaa ei ole.
- **Valmis analyysi ja korjaukset (ota mukaan pohjan päälle, älä paikallisena):** haara `pelikoodari/museo-pehmea-197` **9b61757d8** (pohja juna-197
  5ce850087, peilattu; worktree /Users/Shared/Claude/wt/proto-pelikoodari-museo-pehmea-197). Syyt 196:n nykimiseen (mitattu uudella testillä
  MuseoAutoZoomTestit.KierrosLiikkuuPehmeastiIlmanHyppyja, 60 fps): (a) SilmaPaino hyppäsi 1:een zoomin alkaessa (Zoom = tavoite > 1) → kamera
  silmänkorkeudelta taulun keskelle yhdessä ruudussa (10 cm/ruutu, 360 m/s², katse 73 000 °/s²) → korjattu: paino log-suurennuksen mukaan silmaRef:iin;
  (b) Auto Zoom käytti ZoomS 0,45 s → AutoZoomS 1,8 / ulos 1,6 / KohtaLiukuS 2,0 / ZoomS 0,6; (c) lähimmän etäisyyden kova max() → pehmeä raja
  (ZoomEtaisyys, PehmeaRajaM 0,25; KerroinPuolikorkeudelle puolitushaulla); (d) kävely smootherstep → MuseoKavely.SKayra (tasainen vauhti);
  Pehmenna() polulle 0,7 m + MittaaKaarteet (sivukiihtyvyys ≤ 0,6 m/s², KaarreMinOsuus 0,12); (e) katseen sekoitus kulmina muistilla
  (Sekoita ref ero, ei ±180°-hyppyä); vilkaisuille omat jousipainot (Vilkaisu-lista). Tulos: 1,3 cm/ruutu, 2,5 m/s², 225 °/s², zoom 1,35 ln/s.
  Kameran päivitys tarkistettu: Update joka ruutu, unscaledDeltaTime, linssi pitää täyden tahdin (PeliOhjain Aktiivinen). Linssit 1930/1930.
  **KONFLIKTI NUI:n kanssa:** minun autoZoomOdottaa/AutoZoomViiveS 0,5 vs NUI:n autoOdottaa/AutoZoomViive 2,5 – käytä NUI:n mekanismia
  (rebase 0048e60e6:n päälle, poista omani), AutoZoomValmisS-testivakio → AutoZoomViive + liuku.
- JU:lla jonossa käännös 9b61757d8:stä (L2 seis levyn takia, käynnistyy > 26 Gi) → _tyo/pelikoodari/museo-pehmea-197-app. Kun KÄÄNNETTY tulee,
  aja "ennen-pohjaa"-video halutessasi: `SHA=<käännös> UDID=96044270-92AA-4BD3-BE2D-772C8495AB19 zsh .../pelikoodari-ajot/ajo-museo-pehmea-197.zsh`
  (skenaario sk-museo-pehmea-197.txt: Punainen kabinetti, 3 teosta, Auto Zoom + kävely, ääni) → SIMU VAPAA JU:lle. Ennen-video = juna 196 -käännös.
- Lopuksi: video ennen/jälkeen PT:lle → KK, NS:lle junakärki vasta videon jälkeen, valmis-rivi PT:lle ≤ 3 riviä.

## 2. Prahan ja Ateenan historiaosiot peliin (PT 21.xx, omistaja 19.51 + PT:n tarkistus), juna 197 jos ehtii, muuten 198
Äänittäjä uusi 2 Prahan osiota v3-nimillä: aanet/pallokierros-praha-v2/historia-heittoikkuna-v3.mp3, historia-venceslauksen-aukio-v3.mp3,
ajat-historia-v3.json (ämpärissä); loput ennallaan. Etsi kytkentäkohta (grep "historia" pallokierros-praha / OpasPallokierros), ilmoita NS:lle.

## Tässä vuorossa valmiit
- **Kori-varjo 197 valmis:** pelikoodari/kori-varjo-197 **294914947** (solmukaulus 0,7 / lenkit 0,85 vain kuvun varjossa, _VarjoKerroin;
  mallin takila-sidos piiloon KoysiSidonnan kanssa, TakilaSidos/PaivitaTakilaSidos). Simu kori-varjo6-197 15.41 OK; kuvat
  _tyo/pelikoodari/kori-varjo-197/solmu-ennen-nyt.jpg ja solmu-lahikuva-e520-2949.jpg PT:lle. NS:lle junakärki (PT: menee junaan 196).
- **Juoksupeli (Kielletty kaupunki, omistaja 18.18, 19.41, 19.46):** suunnitelma main docs/suunnitelmat/juoksupeli-kielletty-kaupunki.md
  (#4714, #4715 kesä + näköala 1914, #4719 kamera takaa yläviistosta). Codex-kuvat j1–j4 hyväksytty ja kuitattu (postilaatikko 10000556d,
  aec1ba363), kopiot _tyo/pelikoodari/juoksupeli/havainne-j1…j4.png, kaikki PT:lle. Kiintiö käytetty; ei rakentamista ennen Codexin Pekingiä.
- Pulun 5 ISS-ottoa olivat jo junassa 196 (30e07d6f1) – ei kytkettävää.

## Avoimet / huomiot
- Worktreet: proto-pelikoodari-museo-pehmea-197 (työ jatkuu), -kori-varjo-197 ja -kori-koydet-197 ja -iss-revontulet-197 (poista kun NS on
  yhdistänyt junaan), -raketti-kamera-196 (kunnes Valoseppä on ottanut af52dcc6e); /Users/Shared/Claude/wt/pelikoodari-posti (detached, postilaatikko).
- _tyo/pelikoodari: kori-varjo-197-app (vanhenee kun kori junassa), tuleva museo-pehmea-197-app.

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2, docs/moduulit/yhteiset-pohjat.md ja
docs/raportit/viesti-pelikoodari-luovutus-20261016-ilta.md (haara pelikoodari-luovutus-20261014-paiva). Ensin LIIKEPOHJA ja museo sen
ensimmäisenä käyttäjänä (NUI 0048e60e6 pohjana, analyysi 9b61757d8), juna 197 tai sano PT:lle 198."
