# Kehyksen hinta levossa (25.9.2026)

Fablen erä 25.9. klo 22.4x. Tavoite on enintään 16 ms kehystä kohden iPadilla. Natiivisepän agentti mittaa GPU- ja
laattapuolen (oma osio), Pelikoodari pääsäikeen CPU:n.

## CPU (Pelikoodari)

### Mittari

Proto `pelikoodari/cpu-mittari` (pohja build 16 = master bf70290d), `Kartta/CpuMittari.cs`. Mittari ei tarvitse editoria:
se lukee Profilerin merkit laitteessa ProfilerRecorderilla ja kirjoittaa tuloksen `Documents/cpu-mittaus.txt`-tiedostoon.

- `cpu profiler` kytkee Profilerin päälle. Vasta silloin moottori luo skriptikohtaiset merkit ("Luokka.Update() [Invoke]").
- `cpu lista` listaa kaikki aikamerkit (3 087 kpl).
- `cpu mittaa 15 - [piirto]` mittaa jokaisesta merkistä keskiarvon ms/kehys, p95:n, maksimin ja kutsut kehystä kohden.
  Valinnalla `piirto` Ruudunpaivitys pakotetaan LEPO-tilaan, jossa jokainen kehys piirretään. Ilman sitä tila on
  PAIKALLAAN (piirto 2 s välein).

Skriptimerkit vaativat Development-käännöksen. Käännöspalvelussa se tehdään komennolla
`MATKAKIRJA_KEHITYS=1 proto-kaanna.sh pelikoodari/cpu-mittari` (Rakennus.IosSimulaattori noudattaa samaa muuttujaa kuin
laitekäännös).

### Mittaus ennen muutoksia

Mittausolot: pariteetti-iPad11-834 (C1D5E34C, simulaattori Mac Studiolla), Ateena levossa, noin 60 s luennan jälkeen, kumpikin
jakso 15 s ja 450 kehystä, 30 fps. Lokit: `proto-3d/lokit/kehyksen-hinta/ipad11-3/`.

| Pääsäie, ms/kehys | PAIKALLAAN (piirto 2 s välein) | LEPO (piirto joka kehys) |
|---|---|---|
| CPU Main Thread Frame Time, ka / p95 | 2,81 / 3,76 | 3,97 / 5,34 |
| Skriptien Update (ScriptRunBehaviourUpdate) | 0,81 | 0,76 |
| Skriptien LateUpdate | 0,47 | 0,45 |
| Renderöinnin CPU-osa (URP RenderSingleCamera) | 0,03 | 1,51 |
| UI Toolkit (UpdatePanels + RepaintPanels) | 0,15 | 0,42 |

**Viisi kalleinta levossa (LEPO, piirto joka kehys):**

1. **URP:n kameran renderöinnin CPU-osa** 1,51 ms (FinishFrameRendering 1,05 ms). Piirtokutsut ja culling: Natiivisepän GPU-osio.
   PAIKALLAAN-tilassa tätä ei ole.
2. **Cesium3DTileset.Update** 0,53–0,57 ms. Cesiumin traversal kulkee joka kehys myös silloin, kun kamera on paikallaan
   ja laatat ovat valmiit.
3. **UI Toolkit** 0,42 ms (RepaintPanels 0,29, UpdatePanels 0,14). Näistä 16 UIDocumentia, asettelu 0,007 ms.
4. **KaupunkiMerkit.LateUpdate** 0,23–0,24 ms. Kaikkien merkkien projektio ja nimiölatonta lasketaan joka kehys, vaikka
   kamera ei liiku.
5. **Muut pelin skriptit yhteensä** noin 0,3 ms. Suurimmat: NostoKerros.LateUpdate 0,05, PeliOhjain.Update 0,05,
   Nimikerros.LateUpdate 0,04 (p95 0,17–0,18), UiKerros.Update 0,04, Vektorikerros.LateUpdate 0,03 (2 kpl) ja
   PalloKierto.Update 0,02. MaisemaKompressori.OnAudioFilterRead (0,05–0,07) ajetaan äänisäikeessä.

Mittarin oma korutiini (0,19 ms) on jätetty pois. Profilerin päällä olo lisää kustannusta: ilman sitä
PAIKALLAAN-tilan pääsäie oli 1,47 ms/kehys (`ipad11-1`).

### Johtopäätös

Pääsäikeen CPU on levossa 3–4 ms kehystä kohden simulaattorissa (Mac Studion suoritin). Oikean iPadin suoritin on arviolta
1,5–3 kertaa hitaampi, mikä tekisi noin 6–12 ms. Arvio on mittaamaton, ja luku pitää varmistaa laitteella (alla). Pelin
omat Update- ja LateUpdate-silmukat ovat yhteensä noin 0,8 ms, joten niiden muuttaminen tapahtumaohjatuiksi säästää
alle 1 ms. Suurimmat CPU-erät levossa ovat renderöinti (hoituu PAIKALLAAN-tilalla ja Natiivisepän GPU-työllä), Cesiumin
traversal ja KaupunkiMerkit.

Korjausjärjestys hyödyn mukaan:
1. KaupunkiMerkit.LateUpdate ja Nimikerros: lasketaan vain, kun kamera, näkyvyys tai valinnat muuttuvat (PallonLepo
   kertoo kameran levon). Arvioitu säästö noin 0,25 ms.
2. Cesium3DTileset-päivitys levossa: kysymys Natiivisepälle, voiko traversalin ohittaa, kun PallonLepo lepää ja laatat
   ovat valmiit (0,5 ms).
3. Pienet Update-silmukat (PeliOhjain, UiKerros, NostoKerros): tapahtumaohjatuiksi, yhteensä noin 0,15 ms.

**Laitemittaus:** sama `cpu`-komento toimii iPadilla Development-laitekäännöksessä (`MATKAKIRJA_KEHITYS=1`,
`pelikoodari/cpu-mittari`). Komentosarja: `cpu profiler`, sitten `cpu mittaa 15 -` ja `cpu mittaa 15 - piirto`.
