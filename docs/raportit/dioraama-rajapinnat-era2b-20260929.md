# Dioraama erä 2b: vapaa 3D, valot, proseduraaliset pinnat ja 3D-hahmot (Linnanrakentaja 29.9.2026)

Omistajan linjaus 29.9. klo 07.5x (Päätoimittajan kautta): linnan pitää tuntua vapaasti pyöritettävältä 3D:ltä,
siirtymät ovat vapaita kaarilentoja, eikä mikään kulma saa paljastaa pahvia. Keittiön v1:ssä verrataan samassa
näkymässä A) proseduraalista 3D:tä (materiaalit, valot ja rekvisiitta koodilla) ja B) Codexin maalattuja pintoja.
Hahmot ovat 3D-pienoisfiguureja. Referenssi: selaimessa pyörivä "Room 06, scale 1:12" -keittiö (tiheä rekvisiitta,
aurinko + lamput + liesi, varjot, pienoismallin tuntu). Aiemmat speksit (erä 1 ja 2) pätevät, ellei tässä toisin.

**Periaate:** geometria, jaottelu ja värivaihtelu tehdään rakennuskoneessa (sama data natiiville ja webille).
Varjostin on kevyt: valaistus, AO, lämpö ja pieni kuvio. Nimet ovat tarkkoja; poikkeama kirjataan raporttiin.

## 1. Data (pelin repo)

- `RAKENNUS.valaistus = { aurinko: { atsimuutti: 215, korkeus: 38, vari: '#fff0d8', voima: 0.85 },
  taivas: { yla: '#b9cddd', ala: '#5d4c3c', voima: 0.35 }, sumu: null }` (kompassiasteet; valo tulee atsimuutin
  suunnasta).
- Tilan `valot: [{ paikka, sade, voima, vari?: '#ffb070', lepatus?: 0–1 }]`: sama lista leipoo lämmön (G) KUTEN NYT ja
  on lisäksi reaaliaikainen pistevalo (range = sade, intensiteetti = voima · 1,0; natiivissa Neutral-tonemappaus, Bloom-kynnys 1,2, lämpö g²·0,45). Tulisijalla lepatus 0,35.
- `PINNAT[id].kuvio = { tyyppi, koko_m?: [u, v], sauma_m?, vaihtelu?: 0–1 }`, tyypit: `tasainen | kivi | puu | lankku |
  rappaus | tiili | kallio | vesi | metalli | kangas | olki`. rakennus.json → `pinnat[id].kuvio` sellaisenaan.
- **COLOR_0.B** (oli 0) = osan satunnaisluku 0–1 (palikka, lankku, laatta, kivi): rakennuskone arpoo sen siemenellä
  osa kerrallaan. Varjostin sävyttää albedoa: kirkkaus · (1 + vaihtelu · (B − 0,5)) ja pieni sävysiirto.
- Kamera: jokaiseen ASENTOon valinnainen `kierto = { atsimuutti: [−a, +a] | null, korkeus: [min, max],
  etaisyys: [kerroin_min, kerroin_max] }` (suhteessa perusasentoon; null = vapaa 360°). Oletus tiloille
  { atsimuutti: [−55, 55], korkeus: [6, 65], etaisyys: [0.55, 1.6] }, yleisnäkymälle { atsimuutti: null, korkeus:
  [8, 70], etaisyys: [0.45, 1.8] }.
- Henkilön `malli3d` (ks. kohta 4). Reseptit ja rekvisiitta: kohta 3.

## 2. Natiivi: valaistus ja pinnat

- Uusi `Resources/Varjostimet/DioraamaValaistu.shader` (URP forward, käsin HLSL, SRP Batcher): päävalo +
  varjot (`_MAIN_LIGHT_SHADOWS`), lisävalot per pikseli (`_ADDITIONAL_LIGHTS`), ei lisävalojen varjoja.
  Väri = albedo · (taivas(N.y) + Σ valo · wrapLambert(0,3) · varjo) · lerp(1, AO, 0,85) + lämpö · G · `_Lampo`.
  albedo = `_Tila` 0 (A, proseduraalinen): pinnan väri · DioraamaKuvio(...); 1 (B, maalattu): väri · `_PohjaKuva`.
- `Resources/Varjostimet/DioraamaKuviot.hlsl`: `float3 DioraamaKuvio(int tyyppi, float4 parametrit, float2 uv,
  float3 maailma, float satunnainen)` palauttaa albedon kertoimen (≈ 0,75–1,15). Halpa (arvokohina, ei tekstuureja).
  Parametrit: (koko_u, koko_v, sauma, vaihtelu). Sama kaava GLSL:nä esikatselussa (`tools/dioraama/kuviot.glsl.mjs`).
- `DioraamaValot.cs`: aurinko (Directional, varjot Hard, cullingMask = näyttämön kerros) ja tilojen pistevalot
  (lepatus: kohina ajasta). Avatessa URP-assetin shadowDistance = näkymän mukaan (tila 30 m, yleis 160 m) ja
  varjokartta 2048, ambient = taivas; kaikki palautetaan sulkiessa. Komennot: `poikki valo aurinko|lamput|tuli 0|1`,
  `poikki valaistus 0|1` (0 = vanha valaisematon DioraamaMaalattu), `poikki pinnat a|b` (A/B-vertailu).
- Taulussa A/B-kytkin vain kehittäjätilassa (ei pelaajille).

## 3. Rekvisiitta ja lattiat (rakennuskone)

- Uudet reseptit `tools/dioraama/reseptit-rekvisiitta.mjs` (rekisteröinti reseptit.mjs:ään): orsi-leivat (reikäleivät
  orrella), yrttinippu, riippupata (ketju + pata), kattila, kauha, leikkuulauta, veitsi, kala, leipä, nauris-kori,
  puukasa, vesisanko, saavi, kirnu, huhmar, suolalaatikko, kynttilänjalka (+ valo), öljylamppu (+ valo), vati,
  ruukku, pullo, luuta, hiillospihdit. Kukin ≤ 400 kolmiota, pyöristetyt reunat (viiste 1–3 cm), roolit pintoihin.
- Uudet pinnat: savi, leipa, kala, vihannes, olki, kupari, rauta, nahka, vaha (hehku pieni), kivilattia.
- Lattiat: `kivilattia` (laatat 0,4–0,7 m, saumat 1,5 cm, korkeusvaihtelu ±4 mm, B per laatta), `lankkulattia`
  (lankut 0,18–0,26 m, B per lankku). Keittiön lattia kivilattiaksi.
- Keittiö täytetään tiheästi (referenssin tiheys): tulisijan ympärys, pöydät katettuina, hyllyt täynnä, katossa
  roikkuvaa. Kolmiobudjetti tilalle ≤ 180 000.

## 4. 3D-hahmot (pienoisfiguurit)

- `HENKILOT[id].malli3d = { mittasuhteet: { pituus_m, hartiat_m, lantio_m, paa_m }, vaatteet: { paita, housut|hame,
  esiliina?, paahine?: 'myssy'|'huivi'|'hattu'|null }, varit: {...}, esine?: 'kauha'|'sanko'|null }`.
- Rakennuskone tekee `hahmot3d/<henkilo>.glb`: solmuhierarkia nivelinä (nimet: lantio, selka, kaula, paa,
  olka_v, kyynar_v, kasi_v, olka_o, kyynar_o, kasi_o, lonkka_v, polvi_v, nilkka_v, lonkka_o, polvi_o, nilkka_o;
  _v = vasen, _o = oikea), jokaisella solmulla oma mesh (jäykät osat, pyöristetyt, ≤ 3 000 kolmiota hahmo),
  primitiivi per pinta (iho, vaate, esiliina, hiukset, kengat, esine). Pivot nivelessä. Kasvot: nenä ja
  maalatut silmät (tumma pinta), ei ilmeitä.
- Silmukat datana `js/dioraama/pankit/liikkeet.js`: `LIIKKEET[silmukka] = { kesto_s, avaimet: { <nivel>:
  [[t01, rx, ry, rz], ...] }, juuri?: { nousu_m } }` (asteet, silmukka sulkeutuu). Silmukat: idle, tyo
  (hämmennys: oikea käsi kehää), kavely, kanto (kävely + sanko), puhe (pää ja käsi). Näytteistys: smoothstep
  avainten välillä. Puhdas funktio `nivelKulmat(silmukka, t)` JS:ssä (`js/dioraama/liikkeet.js`) ja C#:ssa
  (`Ydin/Dioraama/Liikkeet.cs`) + kultaiset vektorit.
- Natiivi `DioraamaHahmot3D.cs`: lataa glb:n (DioraamaGlb laajenee monisolmuiseksi: solmujen TRS + hierarkia),
  asettaa nivelten kierrot silmukasta, liikkuu reittiä pitkin kasvot kulkusuuntaan. `poikki hahmot 2d|3d`
  (oletus 3d, kortit varalla).

## 5. Kamera: vapaa kierto ja kaarilennot (Ydin + JS, pariteetti)

- `Kameraliike.SiirtymaAsento`: kaari — keskellä lentoa korkeus += nousu · sin(πs) ja etäisyys · (1 + 0,35 ·
  matka01 · sin(πs)), atsimuutti lyhintä reittiä; matka01 = kohteiden etäisyys / 60 m rajattuna 0–1.
- `Kameraliike.RajaaKierto(perus, asento)` rajaa pelaajan kierron kohdan 1 `kierto`-rajoihin.
- `Kameraliike.Leijunta(asento, t)`: hidas ajelehtiminen (atsimuutti ± 3° / 24 s, korkeus ± 1,5° / 31 s),
  `poikki drift 0|1`.
- Veto kiertää, nipistys zoomaa; kamera jää pelaajan asentoon seuraavaan kohdistukseen asti.

## 6. Liekit 3D:nä

- `DioraamaLiekit` piirtää liekin 3D-pisaramuotona (venytetty pallo, 16 × 10), jota verteksivarjostin vääntää ajasta
  (kohina), additiivinen väri korkeuden mukaan (valkoinen ydin → keltainen → oranssi → punainen reuna,
  fresnel-häivytys) sekä 24 kipinää (pienet kameraa kohti kääntyvät pisteet, nousevat ja sammuvat). Toimii
  kaikista kulmista myös ylhäältä. Atlasliekki jää varalle.

## 7. Esikatselu (web, kehittäjälle)

`tools/dioraama/esikatselu*.mjs` peilaa natiivia: valot ja varjot, kuviot (sama GLSL), 3D-hahmot silmukoineen,
kierto rajoineen ja kaarilennot tilasta toiseen, kytkimet (aurinko, lamput, tuli, A/B, 2d/3d). Tästä tulee myöhemmin
web-version pohja (Siirtoseppä).
