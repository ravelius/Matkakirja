# Linssiseppä 2 – luovutus 11.10.2026 klo 05.5x

Rooli ja työkalut: viesti-linssiseppa2-luovutus-20261010-paiva.md (alkuosa). PT = PÄÄTOIMITTAJA (Opus, max). Julkaisija jakaa käännös- ja
simuvuorot (KÄÄNNÖS NYT / SIMULAATTORI NYT → lopuksi "KÄÄNNETTY + SHA" / "SIMU VAPAA"); todistusajo tarvitsee Julkaisijan vuorolla
lipun `--nyt`. Pitkät ajot: `perl -e 'use POSIX qw(setsid); exit if fork; setsid(); exec @ARGV' zsh <skripti>`. Ämpäriin vain Julkaisijan
vie-paketti.sh:lla (_valmiit/<nimi>-vienti-<pvm>/ + SHA256SUMS + LAHTEET.md). Peking ja pyörimislinssi TAUOLLA (omistaja 10.10.).

## VALMIS TÄSSÄ SESSIOSSA
- **TAIDEMUSEO KUITATTU JUNAAN 181** (PT 05.4x): proto `linssiseppa2/museo-180` (wt/proto-linssiseppa2-muisti) kärki **2c92d79da**,
  käännös 108dda85e. SHA lähti Natiivisepälle; muistia lisäävä → junan iPad-muistiajo ennen VIE.
  - f88b1cd55: kierros pysähtyy jokaisella kertojan teoksella (Resources/Museo/alankomaat/kierros.json, 33 teosta huoneittain),
    pysähdys = katseluasento (teos 65 % ruudun korkeudesta, keskipiste 48 %), siirtymät osasta toiseen oviaukkojen kautta
    (MuseoKierros.Ovet), sentripetaalinen Catmull–Rom + kaaripituustaulukko. Ilman listaa LR:n reitti kuten ennen.
  - 2c92d79da: RP-P-OB-612 ja -616 grafiikkakabinetin oven seinälle (sali.json graf-i1/graf-i2 + tekstitaulut, teokset.json 64).
    ASTC-paketit viety (_valmiit/taidemuseo-alankomaat-grafiikka-612-616-astc-vienti-20261011).
  - Todisteet: docs/raportit/kaappaukset/linssiseppa2-museo181-20261011/ (iPhone-arkit 4291deece, iPad-video äänellä c0b7dc624).
    iPad-läpipeluu: proto-3d/lokit/todistus-museo-lapipeluu-181-20261011-0517 (kertoja −19 LUFS, saliääni −47 LUFS = voima 0,22 ennallaan).
  - Skenaariot proto-3d/_tyo/linssiseppa2/museo-lapipeluu/: sk-museo-teokset.txt (64 + k01–k33), sk-museo-lapipeluu.txt (33 pysähdystä;
    ohjausnapit ja avaus komennoilla, ks. NUI-vika 2; Taidemuseo näkyy valitsimessa vain Alankomaissa = oikein, PT).
- **NUI-vikalista lähetetty**: 1) nimikyltin tekijärivi liian himmeä punaisella/tummalla seinällä, 2) Ohjausnappi-nimet vain tooltipissä
  → `ui puu` nimi '' (tap-teksti ei löydä ⏭/Esittele/Vapaa kulku). NUI rebasettaa museo-180:n päälle.
- **ND v5g HYVÄKSYTTY** (PT 00.5x): mittaus lyijykatto 161/162/162 vs IGN 159/164/165, aukio 140/146/143 vs 148/151/145 (arkki 6b67834ae).
  Viety omat mallit **v6k16** (= v6k14 + v5g; _valmiit/omat-mallit-vienti-20261011a). OSOITIN uusin-4 → v6k16 vasta omistajan
  hyväksynnällä (Julkaisija). Peking (v6k15) ei mukana.
- Levy: 8 vanhaa appikopiota poistettu (3,7 Gi); _tyo/linssiseppa2:n 8 yli vuorokauden käyttämätöntä kansiota (5,4 Gi) T7:lle symlinkillä
  (siirra-t7.zsh, loki siirra-t7.log; kohde /Volumes/T7 4TB/koodaus/linssiseppa2/).

## JONO
0. NUI:n museokorjaukset natiivi-ui/taidemuseo-ui 2e409cc62 (museo-180:n päällä): simutodennus tekijärivistä punaisella seinällä, kun PT antaa vuoron.
1. Junan 181 tuki: jos Natiiviseppä/NUI löytää museosta vian, korjaus 2c92d79da:n päälle (MuseoKierros.cs, kierros.json, MuseoSovitin.cs).
2. **Pariisin korttelit v2** (LR, _valmiit/pariisi-korttelit-v2): OmatMallit tukee vain YHTÄ leikkausrengasta/kohde → lisää "leikkaukset"
   (useita renkaita, CesiumOmatMallit.Polygoni per rengas) omaan haaraan + omat mallit -paketti (seuraava vapaa versio ämpärissä: v6k17;
   pohjaksi v6k16) + pelikuvat Concorde/Louvre/Eiffel (saumat, portikko).
3. Tunnettu: vapaaseen kulkuun siirryttäessä kamera putoaa pysähdyksen silmäkorkeudesta 1,6 m:iin (korkealla roikkuvilla teoksilla
   hyppy) → harkitse liukua.
4. Peking (kierros 4, LR v6) ja pyörimislinssi 2b (51b4342e4) TAUOLLA.

## PÄIVITYS 11.10. klo 11.5x: JUNA 182 MUSEO KUITATTU
- proto `linssiseppa2/museo-182` kärki **7a6051553** (PT kuittasi, SHA Natiivisepälle): omistajan "teos läheltä" (95 %), salin himmennys
  pysähdyksessä, valo katosta 30° pään yläpuolelta tasaisesti (MuseoValo.KattoKeila, _TeosKeski), kehykset (aalto, lakka, kultahelmi,
  3 kultakehystä, vanha kulta), seinä 3× toisto + aniso, siirtymän katse vaakatasossa, tekstitysdata + NUI:n kaistale ja ☰ (79fbb7a35),
  yli 120 merkin virkkeet kahtia. Arkit docs/raportit/kaappaukset/linssiseppa2-museo182-20261011/ (v3 7636d8219).
- iPad Pro 13 (Release 7a6051553): fp ≤ 2615 Mt, vapaa ≥ 2504 Mt, ~30 fps. Skripti museo-lapipeluu/ipad-muisti-182.zsh.
- Käännökset: pyydä AINA KÄÄNNÖS NYT; linja 2 = PROTO_LINJA=2 (linjan 2 iPad-simuun tulee käynnistyksessä Development Console -rivejä,
  Natiivisepän juurisyyjonossa). Älä tapa proto-kaanna.sh:ta, jos lukko on jo oma.
- JONO nyt: Pariisin korttelit v2 (kohta 2 alla), sitten vapaan kulun pikkuviat.
