# Pelikoodari → Codex: #948 lautasen basecolor, oranssit reunat atlaksen saarten ympäriltä (25.10.2026 klo 11.2x)

PT:n pyyntö 25.10. klo 11.1x: korjauspyyntö Codexille tavalliseen tapaan (alfareuna puhtaaksi). Pelikoodari ei muokkaa tekstuuria itse.

## Havainto

Pelissä (juoksupeli, lautaspöytä rikkoutuu, PT:n kuvapari 04e/04f) lautasten sirpaleiden reunoissa näkyy keltaoranssi ääriviiva.
Syy on #948:n `lautanen`-osan basecolor-atlaksessa: UV-saarten reunoilla on oranssi/keltainen raita (noin 2–4 % atlaksen leveydestä),
jota ei ole muistokuplan #949 lautasissa eikä esikuvassa (sinivalkoinen posliini ilman kultareunaa). Ehjässä lautasessa raita näkyy
reunan ohuena kultana; sirpaleissa (Lavastajan aarteet799-v3, sama atlas) se piirtyy jokaisen murtopinnan ympärille.

- Lähde: `osat/lautanen.glb` (SHA256 81a556ac…2a89), kartta `tekstuurit/lautanen-basecolor.png` 2048², SHA256 07dd1709…0fcd (MANIFEST.json).
- Pelin kuvat: `/Users/Shared/Claude/proto-3d/lokit/lautaspoyta-04e-pari-20261025/pari-kupla949-rikki.jpg` (näkyy selvästi) ja
  `lautaspoyta-04f-pari-20261025/`. Ote liitteenä: `posti/lautaspoyta948-reunat-20261025/sirpaleet-oranssi-reuna.jpg`.

## Pyyntö (korjaus olemassa olevaan karttaan; ei uutta Tripo-kutsua eikä generointia)

1. `lautanen-basecolor.png`: oranssi/keltainen raita UV-saarten reunoilta pois. Reuna-alue täytetään viereisen posliinin värillä
   (valkoinen tai sininen kuvio saaren sisältä, tavallinen reunan laajennus / dilate), jotta mipmapit eivät tuo reunaan uutta väriä.
   Jos raita on tarkoituksellinen kultareuna, se pois silti: esikuvassa ja #949:ssä ei ole kultaa.
2. Sama UV, sama resoluutio (2048²), sama nimi; normal- ja metallic-roughness-kartat ennallaan, ellei niissäkään ole reunaraitaa.
3. Lisäksi tasaisen valkoisen alueen sävy: pelissä valkoinen posliini palaa auringossa puhki. Jos kartan valkoinen on lähes 255,
   laske se luonnolliseksi posliinin norsunluunvalkoiseksi (noin sRGB 235–240), sininen kuvio ennallaan. (PT 11.0x: "ei puhki
   palanutta valkoista".)
4. Toimitus: `posti/lautaspoyta948-reunat-20261025/` → korjattu `lautanen-basecolor.png` + päivitetty `osat/lautanen.glb` (sama
   geometria) + SHA256SUMS + esikatselu ennen/jälkeen lähikuvana saaren reunasta.

Vastaanotto: Lavastaja pakkaa ehjän ja rikki-mallin uudelleen (aarteet799-v4), Pelikoodari kytkee ja kuvaa parin, PT näyttää omistajalle.
