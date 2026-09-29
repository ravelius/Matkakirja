# Dioraamamoottorin rajapinnat, erä 1 (Linnanrakentaja 29.9.2026)

Sitova speksi erän 1 ali-agenteille. Suunnitelma: docs/raportit/linnanrakentaja-suunnitelma-20260929.md
(haara linnanrakentaja-tyo-20260929). Nimet ovat tarkkoja: käytä niitä sellaisinaan, jotta osat liittyvät
toisiinsa ilman korjauksia. Jos jokin on mahdoton, kirjaa poikkeama raporttiin; älä keksi omaa nimeä hiljaa.

## 0. Yleiset

- Ei uusia npm- eikä Unity-paketteja. Node 20+, ES-moduulit, `node --test`. Kommentit suomeksi talon tyyliin.
- Koordinaatisto (KANONINEN): metrit; +X = itä, +Y = ylös, +Z = etelä (oikeakätinen = glTF = three.js).
  Unity: sijainti (x, y, −z) ja kolmion kiertosuunta käännetään (i0, i2, i1). +Z_unity = pohjoinen.
- Suunta (kompassiasteet) s: 0 = katsoo pohjoiseen, 90 = itään. Etuvektori f = (sin s, 0, −cos s),
  oikea r = (cos s, 0, sin s). Paikallinen piste (u, y, w) → maailma: paikka + u·r + y·(0,1,0) + w·f.
- Kaikki satunnaisuus siemenellä (deterministinen): mulberry32(siemen).
- Aika sekunteina (double). Kulmat asteina datassa, radiaaneina vain sisäisesti.

## 1. Lähdedata (pelin repo, A2 kirjoittaa)

`js/dioraama/pankit/pinnat.js`:
```js
export const PINNAT = {
  kivi:     { vari: '#b8ad9c', toisto_m: 2.0 },
  leikkaus: { vari: '#d9ceb8', toisto_m: 1.0 },
  rappaus:  { vari: '#e7d7bd', toisto_m: 2.0 },
  lankku:   { vari: '#caa678', toisto_m: 1.5 },
  puu:      { vari: '#8a6a48', toisto_m: 1.0 },
  katto:    { vari: '#5c5652', toisto_m: 1.5 },
  tiili:    { vari: '#9c7b6a', toisto_m: 1.0 },
  kallio:   { vari: '#8f8a7e', toisto_m: 4.0 },
  vesi:     { vari: '#465e68', toisto_m: 8.0 },
  metalli:  { vari: '#3d3a38', toisto_m: 0.5 },
  kangas:   { vari: '#cdbf9e', toisto_m: 0.5 },
  hiillos:  { vari: '#d38c41', toisto_m: 1.0, hehku: 1 },
};
```
`js/dioraama/pankit/henkilot.js` (erä 1 paikkamerkit; atlas tehdään rakennusajossa, ks. 3):
```js
export const HENKILOT = {
  'kokki-1500': { nimi: 'Kokki', paikkamerkki: { vari: '#7a3b2e', esiliina: '#e8e0cc', paine: 'myssy' },
    ruutu: [128, 192], sarakkeet: 8, pivot: [0.5, 0.04], korkeus_m: 1.72,
    silmukat: { idle: { rivi: 0, ruudut: 4, fps: 6 }, tyo: { rivi: 1, ruudut: 8, fps: 10 },
                puhe: { rivi: 2, ruudut: 4, fps: 8 }, kavely: { rivi: 3, ruudut: 8, fps: 10 } },
    lisenssi: 'oma paikkamerkki' },
  // 'apulainen-1500' (vari '#4f5d3a', paine 'huivi'), 'vesipoika-1500' (vari '#5a4a6e', paine 'paljas', korkeus_m 1.45)
};
```
`js/dioraama/pankit/aanet.js`: `export const AANET = {};` (erä 1 tyhjä; muoto { tiedosto, silmukka, voimakkuus, kesto_s, lisenssi }).

`js/dioraama/rakennukset/olavinlinna.js`:
```js
export const RAKENNUS = {
  id: 'olavinlinna', nimi: 'Olavinlinna', otsikko: 'Olavinlinna – elävä linna', versio: 1,
  lahteet: [{ nimi: 'Kansallismuseo: Olavinlinnan historiaa', osoite: 'https://www.kansallismuseo.fi/fi/olavinlinna/historiaa' }],
  geoAnkkuri: { lat: 61.8639, lon: 28.9011, suuntima: 0 },
  aikakerros: { id: 'n1500', nimi: '1500-luvun alku (tulkinta)' },
  yleiskamera: { vaaka: ASENTO, pysty: ASENTO },
  pulu: { laskeutuminen: [x, y, z] },                 // linnan taulun kohta yleisnäkymässä
  taulu: TAULU,                                       // linnan 3 ydinasiaa
  tilat: [TILA, ...],
};
// ASENTO = { kohde: [x,y,z], atsimuutti, korkeus, etaisyys, fov, aukko }   (aukko 0–1 = DoF-sumennus, erä 2)
// TAULU  = { otsikko, tila: 'luonnos', kohdat: [{ teksti, lahde }, ×3] }
// TILA = {
//   id, nimi, kohdistettava: true|false, rajat: { min: [x,y,z], max: [x,y,z] }, naapurit: [id],
//   kamera: ASENTO, pulu: { laskeutuminen: [x,y,z], taulupuoli: 'vasen'|'oikea' }, taulu: TAULU,
//   valot: [{ paikka: [x,y,z], sade: m, voima: 0–1 }],         // rakennuskone leipoo lämmön COLOR_0.G:hen
//   palikat: [{ resepti, paikka: [x,y,z], suunta, ...parametrit, pinnat?: { rooli: pintaId } }],
//   hahmot: [HAHMO], aanet: [],
//   kasikirjoitus: [ASKEL],
// }
// HAHMO = { id, henkilo, paikka: [x,y,z], suunta, peilattu: false, silmukka: 'tyo', heraa: 1|2,
//           reitti: null | { pisteet: [[x,y,z], ...], nopeus: m/s, tauko: s },
//           repliikit: [{ id, teksti, aani: null }], reaktio: { id, teksti, aani: null } }
// ASKEL = { tee: 'pulu-lenna' } | { tee: 'taulu' } | { tee: 'kohta', n: 0|1|2 } |
//         { tee: 'repliikki', hahmo: id } | { tee: 'reaktio', hahmo: id } | { tee: 'odota', s }
```
Massa (koko linnan karkea muoto yleisnäkymään) on tila `{ id: 'massa', kohdistettava: false, ... }`.

## 2. Reseptit (A1 toteuttaa, A2 käyttää)

Paikallinen kehys (u, y, w) kuten kohdassa 0; origo = kohteen pohjan keskipiste, ellei toisin sanota.
Pinnan rooli → oletuspinta suluissa; `pinnat`-kenttä ohittaa.

| resepti | parametrit (oletus) | geometria | roolit |
|---|---|---|---|
| `laatta` | leveys, syvyys, paksuus (0,4) | laatikko u ±leveys/2, w ±syvyys/2, y −paksuus…0 | yla (lankku), sivu (leikkaus), ala (rappaus) |
| `seina` | pituus, korkeus, paksuus, aukot [{u, y, leveys, korkeus}], leikkaus {vasen, oikea, yla} (false) | u ±pituus/2, y 0…korkeus, w ±paksuus/2; aukot läpi (reunoilla pieliset) | etu (kivi, w+), taka (rappaus, w−), leikkaus (leikkaus: leikatut päät/yläpinta), pieli (kivi) |
| `torni` | sade, korkeus, paksuus (2), segmentit (32), auki {alku, loppu} tai null, vyo {y, korkeus} tai null | sylinterikuori ulkosäde sade; auki = poistettu kompassisektori tornin keskeltä katsoen; leikkauspinnat sektorin reunoille ja kuoren yläreunaan jos auki | ulko (kivi), sisa (rappaus), leikkaus, vyo (tiili) |
| `kartiokatto` | sade, korkeus, ylitys (0,6), segmentit (32) | kartio pohjasäde sade+ylitys, huippu y=korkeus | katto (katto) |
| `harjakatto` | leveys, syvyys, korkeus, ylitys (0,4) | harja u-akselilla | lappe (katto), paaty (kivi) |
| `porras` | leveys, askelmat, nousu (0,18), etenema (0,28) | nousee kohti +w | askel (kivi) |
| `kallio` | leveys, syvyys, korkeus, siemen, kohina (0,25) | yläpinta y=0, kyljet alas −korkeus, kohinalla pullistetut | kallio (kallio) |
| `vesi` | leveys, syvyys | taso y=0 | vesi (vesi) |
| `poyta` | leveys, syvyys, korkeus (0,8) | kansi 6 cm + 4 jalkaa 8 cm | puu (puu) |
| `penkki` | leveys, syvyys (0,3), korkeus (0,45) | istuin + 2 jalkaa | puu (puu) |
| `tynnyri` | sade (0,35), korkeus (0,9), segmentit (16) | pullea sylinteri + 2 vannetta | puu (puu), vanne (metalli) |
| `pata` | sade (0,3), korkeus (0,35) | kulho + reuna | metalli (metalli) |
| `sakki` | sade (0,3), korkeus (0,6), siemen | pehmeä pisara | kangas (kangas) |
| `tulisija` | leveys (3), syvyys (1,2), korkeus (0,9), huuva {korkeus (1,6), yla (4)} | kivijalka, hiilloskansi, huuva kapenee savupiippuun | kivi (kivi), hiillos (hiillos), huuva (rappaus) |
| `hylly` | leveys, korkeus, syvyys (0,4), hyllyt (3) | pystyt + tasot | puu (puu) |

## 3. Rakennuskone (A1): `tools/dioraama/rakenna.mjs`

`node tools/dioraama/rakenna.mjs olavinlinna [--ulos dist/dioraama]` → kansio `dist/dioraama/olavinlinna/`:
- `tilat/<tila>.glb` jokaiselle tilalle (myös massa). glTF 2.0 -binääri:
  - yksi mesh, yksi solmu (nimi = tilan id), yksi primitiivi JOKAISTA KÄYTETTYÄ PINTAA KOHDEN
    (materiaalin nimi = pinnan id, `extras.pinta` = id, baseColorFactor = pinnan väri lineaarisena).
  - attribuutit: POSITION (float32, kanoninen), NORMAL (float32), TEXCOORD_0 (float32: maailmatasoprojektio
    normaalin pääakselin mukaan / pinnan toisto_m, jotta toistuva tekstuuri jatkuu palikasta toiseen),
    COLOR_0 (UNSIGNED_BYTE normalized VEC4: R = AO 0–1 (1 = avoin), G = lämpö tilan `valot`-listasta
    Σ voima·(1 − d/sade)² rajattuna 0–1 + pinnan hehku, B = 0, A = 255). Indeksit uint32.
  - AO leivotaan: 48 kiinteää puolipallosädettä per kärki, max 3 m, tilan omat + naapuritilojen kolmiot,
    BVH. Deterministinen.
- `rakennus.json` = lähdedata sellaisenaan + jokaiselle tilalle `glb: { tiedosto, sha256, kolmiot, karkia }`,
  mukana käytetyt `pinnat`, `henkilot` (+ `atlas: 'hahmot/<id>.png'`), `aanet`.
- `hahmot/<henkilo>.png`: paikkamerkkiatlas (A5:n `teePaikkamerkkiAtlas(henkilo) → Buffer`, PNG).
- `manifest.json` = { rakennus, versio, hash (sha256 rakennus.jsonista), tiedostot: [{ polku, sha256, tavuja }] }
  aakkosjärjestyksessä. Ei aikaleimoja → sama syöte = sama tavujono.
- Testit `tests/dioraama-rakennuskone.test.mjs`: glb jäsentyy (oma pieni lukija testissä), kärki-/kolmiomäärät,
  rajat, normaalit yksikköpituisia, AO-väli, deterministisyys (kaksi ajoa = sama sha), reseptien ääriarvot.

## 4. Puhdas logiikka JS-viitteenä (A2) ja C#:ssa (A3), samat kaavat

`js/dioraama/kamera.js` ja `Kameraliike` (C#):
- `smootherstep(t) = t³(t(6t − 15) + 10)`, t rajattu 0–1.
- `asentoSijainti(p)`: k = korkeus, a = atsimuutti (kompassi: kohteesta kameraan päin),
  sijainti = kohde + etaisyys·(cos k·sin a, sin k, −cos k·cos a) … HUOM: a = 180 = kamera kohteen ETELÄPUOLELLA
  → (0, sin k, +cos k) eli +Z. Palauttaa { sijainti, kohde, fov, etaisyys, aukko }.
- `siirtymanKesto(p0, p1)`: Δ = |kohde1 − kohde0| + |etaisyys1 − etaisyys0|; T = clamp(1,6 + 0,35·√Δ, 2,0, 3,8).
- `siirtymaAsento(p0, p1, t)`: e = smootherstep(t); kohde = lerp(kohde0, kohde1, e);
  atsimuutti = a0 + kiertoero(a0 → a1)·e (lyhin, väli −180…180); korkeus, fov, aukko = lerp(·, e);
  etaisyys = lerp(d0, d1, e) + 0,25·|kohde1 − kohde0|·sin(π·t).
- `pelaajanAsento(p, { da, dk, zoom })`: da rajataan ±20, dk ±10, zoom 0,75–1,3 → atsimuutti + da,
  korkeus + dk, etaisyys·zoom.

`js/dioraama/heratys.js` ja `Heratys` (C#). Syöte = rakennus + kamera-aikataulu
`[{ hetki, kohde: tilaId | null, kesto }]` (null = yleisnäkymä; ensimmäinen tapahtuma hetkellä 0, kesto 0).
- Tavoitetaso tapahtumalle: kohde → 2; kohteen naapurit → 1; muut → 0; kohde null → kaikki kohdistettavat 1.
- Tason muutos: LASKU tapahtuu heti tapahtuman hetkellä; NOUSU hetkellä hetki + 0,6·kesto.
- `tilanTaso(rak, aikataulu, tilaId, t) → { taso, alkoi }` (alkoi = hetki, jolloin nykyinen taso alkoi).
- `hahmonTila(rak, aikataulu, tilaId, hahmoIndeksi, t) → { naky, silmukka, ruutu }`:
  hahmon herääminen = tason alkoi + 0,2·hahmoIndeksi. Taso 2 ja t ≥ herääminen → silmukka = hahmon oma,
  fps silmukasta; taso 1 → 'idle' fps/2; taso 0 → 'idle' ruutu 0 (pysähdys). Reittihahmo (reitti ≠ null)
  näkyy vain tasolla 2. Yleisnäkymässä (viimeisin kohde null) fps rajataan 6:een.
  ruutu = floor((t − herääminen)·fps) mod ruudut (≥ 0).
- `aanenVoimakkuus(taso, alkoi, edellinenTaso, t)`: tavoite 0 / 0,25 / 1; lineaarinen liuku 1,2 s edellisestä.

`js/dioraama/ohjaaja.js` ja `Ohjaaja` (C#):
- Askeleen kesto: pulu-lenna 1,8; taulu 0,25; kohta = max(3, 0,06·merkit); repliikki/reaktio = max(2, 0,06·merkit);
  odota = s. (Kun ääni tulee, kesto = äänen kesto_s.)
- `kasikirjoitusHetkella(askeleet, kestot, napautukset[], t) → { indeksi, alku, paikallinen, valmis }`:
  napautus päättää meneillään olevan askeleen napautushetkellä.
- `puluLento(alku, loppu, t01) → [x,y,z]`: toisen asteen Bézier, huippu = keskipiste + (0, 0,3·|loppu − alku| + 1, 0),
  parametri smootherstep(t01).

Testivektorit: `tools/dioraama/tee-vektorit.mjs` → `tests/fixtures/dioraama/vektorit.json`
(kamera: 5 asentoparia × t ∈ {0, 0,1, …, 1}; heratys: 1 aikataulu × 12 hetkeä kaikille tiloille ja hahmoille;
ohjaaja: 1 käsikirjoitus + 2 napautusta × 10 hetkeä; pulu: 3 lentoa × 5 näytettä). Toleranssi 1e−6.
JS-testi `tests/dioraama-logiikka.test.mjs` ajaa vektorit; C#-testi lukee saman tiedoston kopiona
`Linssit-testit/kultaiset/dioraama-vektorit.json`.

## 5. C#-ydin (A3): `Assets/Matkakirja/Linssit/Ydin/Dioraama/`, namespace `Matkakirja.Linssit.Dioraama`

Asmdef `Matkakirja.Linssit.Ydin` (noEngineReferences; käytössä MiniJson `Matkakirja.Peli.MiniJson.Jasenna`).
Linssit-testit/kaanna.sh kääntää vain Ydin + Testit + MiniJson.cs + Paataso.cs → ei muita riippuvuuksia.
- `V3` (struct, double X, Y, Z; +, −, *, Pituus, Lerp).
- `DioraamaData.cs`: `Rakennus Lue(string json)` → luokat `Rakennus { Id, Nimi, Otsikko, Versio, Asento YleisVaaka,
  YleisPysty, V3 PuluLaskeutuminen, Taulu Taulu, List<Tila> Tilat, Dictionary<string, Henkilo> Henkilot,
  Dictionary<string, Pinta> Pinnat, Tila Tila(string id) }`, `Tila { Id, Nimi, Kohdistettava, V3 RajaMin, RajaMax,
  List<string> Naapurit, Asento Kamera, V3 PuluLaskeutuminen, string Taulupuoli, Taulu Taulu, List<Hahmo> Hahmot,
  List<Askel> Kasikirjoitus, string GlbTiedosto, string GlbSha256 }`, `Asento (struct) { V3 Kohde, double Atsimuutti,
  Korkeus, Etaisyys, Fov, Aukko }`, `Hahmo { Id, HenkiloId, V3 Paikka, double Suunta, bool Peilattu, string Silmukka,
  int Heraa, Reitti Reitti, List<Repliikki> Repliikit, Repliikki Reaktio }`, `Henkilo { Id, Nimi, string Atlas,
  int RuutuL, RuutuK, Sarakkeet, double PivotX, PivotY, KorkeusM, Dictionary<string, Silmukka> Silmukat }`,
  `Silmukka { Rivi, Ruudut, Fps }`, `Pinta { Id, string Vari, double ToistoM, double Hehku }`,
  `Taulu { Otsikko, Tila, List<Kohta> Kohdat }`, `Kohta { Teksti, Lahde }`, `Askel { Tee, N, HahmoId, S }`,
  `Repliikki { Id, Teksti, Aani }`, `Reitti { List<V3> Pisteet, Nopeus, Tauko }`.
- `DioraamaGlb.cs`: `GlbMalli Lue(byte[] glb, bool unityyn)` → `GlbMalli { string Nimi, List<GlbOsa> Osat }`,
  `GlbOsa { string Pinta, float[] Paikat, float[] Normaalit, float[] Uv, byte[] Varit (RGBA), int[] Kolmiot }`.
  unityyn = true → z ja normaalin z negatoidaan, kolmiot (i0, i2, i1). Hylkää sparse/skin/morph/ulkoiset.
- `Kameraliike.cs`, `Heratys.cs`, `Ohjaaja.cs`: kohdan 4 kaavat staattisina metodeina, nimet:
  `Kameraliike.Smootherstep, AsentoSijainti(Asento) → (V3 sijainti, V3 kohde)`, `SiirtymanKesto(Asento, Asento)`,
  `SiirtymaAsento(Asento, Asento, double t)`, `PelaajanAsento(Asento, double da, double dk, double zoom)`;
  `Heratys.TilanTaso(Rakennus, IReadOnlyList<Kameratapahtuma>, string tilaId, double t) → (int taso, double alkoi)`,
  `Heratys.HahmonTila(…, string tilaId, int hahmoIndeksi, double t) → HahmonTila { bool Naky; string Silmukka; int Ruutu }`,
  `Heratys.AanenVoimakkuus(int taso, double alkoi, int edellinenTaso, double t)`;
  `Kameratapahtuma (struct) { double Hetki; string Kohde; double Kesto }`;
  `Ohjaaja.AskeleenKesto(Askel, Tila, Rakennus)`, `Ohjaaja.KasikirjoitusHetkella(IReadOnlyList<double> kestot,
  IReadOnlyList<double> napautukset, double t) → KasikirjoitusTila { int Indeksi; double Alku, Paikallinen; bool Valmis }`,
  `Ohjaaja.PuluLento(V3 alku, V3 loppu, double t01) → V3`.
- `PoikkileikkausLinssi.cs`: `LinssiTiedot Tiedot` (Id "poikkileikkaus", Nimi "Poikkileikkaus",
  Lyhyt "Olavinlinna aukileikattuna", Jarjestys 250, Kesken = true, Ikoni = 24×24 SVG-polku (linnan torni ja
  leikkausviiva)), `Rakennus Rakennus`, `bool Auki`, `Avaa(Rakennus, double t)`, `Sulje()`, `Kohdista(string tilaId, double t)`
  (null = yleis; lisää Kameratapahtuman kestolla SiirtymanKesto), `Napauta(double t)`, `NakymaHetkella(double t, bool pysty)
  → Nakyma { Asento Kamera; Dictionary<string, int> Tasot; List<HahmoNakyma> Hahmot (TilaId, HahmoId, Naky, Silmukka,
  Ruutu); V3 Pulu; bool PuluLentaa; bool TauluAuki; int Kohta; string KohdeTila }`. Kaikki johdetaan ajasta ja
  tapahtumista (ElavaKohtaus-malli): sama t = sama näkymä (pysäytyskuvat).
- Testit `Linssit-testit/Testit/DioraamaTestit.cs` talon Ajuri.cs-kaavalla: vektorit, glb-lukija (pieni testi-glb
  tavutaulukkona), jäsennys (keittiön fixture), koordinaattimuunnos.

## 6. Unity-puoli (A4): `Assets/Matkakirja/Linssit/Unity/`, namespace `Matkakirja.Natiivi`

- `DioraamaSovitin : ILinssi` (MaapallonVuosiSovitin-malli). Avaa: lataa paketin (juuri =
  `https://media.matkakirja.app/dioraama/olavinlinna/` tai peili `file:///…/dist/dioraama/olavinlinna/`),
  luo `DioraamaNayttamo`, `ymparisto.Pelikerrokset(false)`, `MusiikkiPitoon(true)`, `Peite` 0,3 s. Sulje palauttaa kaiken.
  `Komento(string[] osat)`: `poikki peili <url|pois> | yleis | tila <id> | aika <s|pois> | taso <tila> <0-2> |
  napauta | lataa | mittaus | tila` → `o.Kirjaa(...)`.
- `DioraamaNayttamo : MonoBehaviour`: oma Camera (depth pallon kameran yläpuolella, clear SolidColor #cfd6d6
  (erä 1 tausta), culling = oma kerros), oma kerros (vapaa numero TagManagerista; kirjaa valinta), juuri origossa.
  Pallon kamera `enabled = false` avatessa ja palautus sulkiessa (erän 1 väliaikainen ratkaisu; merkitse
  kommentilla NAYTTAMO-RAJAPINTA, Natiiviseppä tekee virallisen).
- `DioraamaRakennus`: GlbMalli (unityyn) → GameObject per tila, Mesh (UInt32 indeksit) per tila, submesh per osa,
  jaettu Material per pinta (`Linssit/Resources/Varjostimet/DioraamaMaalattu.shader`).
- `DioraamaHahmot`: hahmo = quad (oma 4 kärjen Mesh, UV vaihdetaan kun ruutu vaihtuu), pivot jaloissa,
  korkeus korkeus_m, pystyakselin ympäri kameraa kohti kääntyvä (sylinteribillboard), peilattu = u käännetty;
  jaettu Material per atlas (`DioraamaHahmo.shader`, alpha-cutout 0,5). EI MaterialPropertyBlockia.
- Varjostimet (URP, käsin HLSL, SRP Batcher: CBUFFER_START(UnityPerMaterial), ei float4x4 ilman Propertiesia):
  `DioraamaMaalattu`: unlit; väri = _Vari · (0,72 + 0,28·saturate(dot(N, _Valo))) · lerp(1, AO, 0,85) +
  _Lampo · COLOR.G · globaali `_DioraamaLepatus`; `DioraamaHahmo`: _MainTex, clip(alfa − 0,5), sama lämpö.
- `UI/Linssit/DioraamaTaulu.cs` (UI Toolkit): taulu Pulun vieressä, otsikko + aktiivinen kohta + "1/3",
  napautus = seuraava; peitto ≤ 45 %, reunus 8 pt, animaatio < 250 ms, EI koristeita. Pulu = oma `LiviaKuva`-elementti
  (UI/Livia, vain käyttö, ei muutoksia Natiivi-UI:n tiedostoihin) ankkuroituna Pulun 3D-paikan ruutupisteeseen.
- Syöte: napautus tilan rajoihin (säde–AABB Ytimessä) → Kohdista; veto → da/dk; nipistys → zoom. Selvitä miten muut
  linssit ottavat kosketuksen (esim. Maat.Napauta) ja käytä samaa reittiä.
- Rekisteröinti `LinssiOhjain.cs`: yksi `rekisteri.Lisaa(poikki = new DioraamaSovitin(this, k));` ja yksi
  `else if (osat[0] == "poikki") poikki.Komento(osat);` — ei muita muutoksia yhteiseen tiedostoon.
- Käännöstarkistus: `Peli-testit/unity-tarkistus.sh` 0 virhettä (ei simulaattoria, ei proto-kaanna.sh:ta).

## 3b. Rakennuskoneen jako kolmeen moduuliin (tarkennus 29.9. klo 01.4x)

Kirjoita jokainen tiedosto PIENISSÄ osissa (yksi Write ≤ 250 riviä, loput Edit-lisäyksinä) — edellinen yritys
kaatui tulosterajaan.

**B2 `tools/dioraama/reseptit.mjs`** (reseptit → kolmiot):
```js
// Kolmio = { p: [[x,y,z],[x,y,z],[x,y,z]], n?: [[nx,ny,nz],[…],[…]], rooli }   (n = valinnainen pehmeä normaali
//   per kärki; puuttuu = litteä). Reseptit tuottavat kolmiot PAIKALLISESSA kehyksessä (u, y, w), jota käsitellään
//   oikeakätisenä (u = x, y = y, w = z): kärjet vastapäivään ulkoa katsottuna, eli (p1 − p0) × (p2 − p0) osoittaa ulos.
export const RESEPTIT = { laatta(param) → Kolmio[], seina(param) → Kolmio[], … }   // kohdan 2 taulukko, oletukset
export const OLETUSPINNAT = { laatta: { yla: 'lankku', sivu: 'leikkaus', ala: 'rappaus' }, … } // rooli → pinta
export function sijoita(instanssi) → Kolmio[]   // maailmaan + kenttä `pinta` (instanssi.pinnat[rooli] ?? OLETUSPINNAT)
//   maailma = paikka + u·r + y·(0,1,0) + w·f, r = (cos s, 0, sin s), f = (sin s, 0, −cos s), s = suunta (astetta).
//   (r, ylös, f) on VASENKÄTINEN → sijoita VAIHTAA kiertosuunnan (p1 ↔ p2, n1 ↔ n2) ja kuvaa normaalit samalla
//   lineaarikuvauksella, jotta maailman normaalit osoittavat yhä ulos.
```
**B1 `tools/dioraama/glb.mjs`** (glTF 2.0 -binääri):
```js
export function kirjoitaGlb({ nimi, osat: [{ pinta, vari: '#rrggbb', paikat: Float32Array, normaalit: Float32Array,
  uv: Float32Array, varit: Uint8Array /* RGBA */, kolmiot: Uint32Array }] }) → Buffer
export function lueGlb(buffer) → { nimi, osat: [{ pinta, vari: [r,g,b,a] /* lineaarinen */, paikat, normaalit, uv, varit, kolmiot }] }
```
**B3 `tools/dioraama/ao.mjs` + `tools/dioraama/rakenna.mjs`:**
```js
export function luoBvh(kolmiot /* Float32Array, 9 lukua per kolmio */) → bvh
export function leivoAO(bvh, pisteet, normaalit, { saateita = 48, max = 3 } = {}) → Float32Array  // 1 = avoin
export function lampo(pisteet, valot /* [{ paikka, sade, voima }] */) → Float32Array               // 0–1
```
rakenna.mjs: tilan kolmiot = palikat.flatMap(sijoita) → ryhmittely pinnan mukaan → kärjet (normaali: pehmeä jos
annettu, muuten litteä; yhdistys vain saman pinnan, paikan (1e−4) ja normaalin (1e−3) kärjille) → UV maailmatasolla
normaalin pääakselin mukaan (|nx| suurin → (z, y), |ny| → (x, z), |nz| → (x, y)) / toisto_m → AO (peittäjät: oma tila +
naapurit + 'massa') → lämpö + pinnan hehku → COLOR_0 → kirjoitaGlb. Muut kohdan 3 tuotokset ennallaan.
