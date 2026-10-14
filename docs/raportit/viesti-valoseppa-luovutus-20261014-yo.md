# Valoseppä – luovutus 14.10.2026 yö (22.4x)

Luovuttaja: Valoseppä (Opus, high). Edellinen: viesti-valoseppa-luovutus-20261014-ilta.md (sen kohdat 1, 2, 4 hoidettu tai siirretty, ks. alla).
Viestit `send_message` id:llä (/Users/Shared/Claude/osoitekirja.md); PT local_74630a27 (≤ 3 riviä + polut), Julkaisija local_22b29f10,
NS local_bf20055b, LS1 local_45a869de, LR local_08e82dfc, PK local_97810d35, Siirtoseppä local_b50bb32e, Postivahti local_e6d70b5a.

## Valmista tänään (ilta–yö)
- JUNA 190 (PT kuittasi, NS:llä): lipun varjo pehmenee korkeuden mukaan (lippu-varjo-190 f4990e105 + 1e4dd8624, runko e96faed96) ja
  valas (iss-kooste-190 @ 3b8eb2011 = andoya-kauko-190 @ 51f9fafab: hyppy kameran edessä 125 m alustasta 61°, keskellä kuvaa,
  pystynousu 17 m/s, koko vartalo ilmassa huipulla, kaatuu kyljelleen). Roiske junassa 190 ei näy (malli ei vielä piirtynyt) – PT hyväksyi.
- Siirretty muille: Lontoo-haara (lontoo-korkeus-v2) → PK (pelikoodari/lontoo-191); irtoamisen siluetti → Siirtoseppä
  (siirtoseppa/raketti-valo-191); Greenwichin violetti puu = Googlen fotogrammetria (LS1 ehdotti PT:lle hyväksyntää).

## AVOIMET (järjestys)
1. VALAAN ROISKE v8b → JUNA 192 (PT 22.1x: "ei näytä vedeltä" v7c:ssä). Haara linssiseppa2/andoya-kauko-190 d07effc9b, kooste
   linssiseppa2/iss-kooste-190 58f701a66 vahdissa (odotti vapaata linjaa 22.41). Tila: LR:n roiske.glb meshinä (RakettiValasRoiske,
   yksi verkko, kärjet joka kehys), v8: pehmeät reunat uv-peitteellä, läpikuultavuus 0,75, pisarat + rengasaalto + vaahtolaikku + kuohu;
   v8b keventää kruunun/suihkun häivytystä (v8:ssa ne katosivat, vahti 22.28). PT haluaa NYK|UUSI täydellä tarkkuudella:
   NYK = v7c lokit/todistus-valovahti-iss-kooste-190-20261014-2158/kuvat/r0a–r0d, UUSI = v8b-ajon r0a–r0d. Väri vielä harmahtava
   illan valossa (RoiskeenVari 2,3). Todistus: sk-vakio pysäyttää valaan (`linssi linssi raketti valas <s>|jatka`; pysäytys pysäyttää
   myös avauksen kellon ja roiskeen animaation valaan kellon mukaan): r0a 1,0 / r0b 1,73 / r0c 3,3 / r0d 4,4.
   HUOM vahdin r1-alusta-kuva otetaan nyt liian aikaisin (avaus pysähtyi kuvien ajaksi) – sk-vakioon odotus "avaus ohi" jälkeen tarvittaessa.
2. EIFFEL v2d + LEIKKAUKSEN ALARAJA → JUNA 192, kun f1 voittaa (PT 22.4x: lähi f2 HYVÄ, kaukaa f1 ei vielä: tummempi pronssi, AO
   myös lod1/lod2, yläosan/huipun rakenne). Koodi: linssiseppa2/leikkaus-ala-191 7a6c392c3 (worktree wt/proto-linssiseppa2-leikkausala,
   natiiviseppa/juna-191 1610b8ac8 päällä; vahdissa poissuljettu, Julkaisija). Kenttä mallit.json "leikkaus_ala_m": IlmakehaLaatat jättää
   polygonin sisällä Googlen pinnan rajan alta; alarajallisen kohteen kanssa excludeSelectedTiles pois. Testit OmatMallit 5/5.
   Odottaa LR:n seuraavaa versiota (v2d2 ed472ea2 korjasi vain latvan → en ajanut). Ajo: `python3 -I _tyo/linssiseppa2/omat191/rakenna.py
   <nimi>` (lisää KOHTEET-riviin + ALARAJA), sitten Julkaisijalta käännös (PROTO_LINJA=2 PROTO_APP_KOPIO=… tyokalut/proto-kaanna.sh
   7a6c392c3, tai valmis appi omat191/app-ala3 = 7e95b0782) ja SIMU NYT: `APP=…/app-ala3/Matkakirja3D.app AJOT=uusi:v6k18-<nimi>:eif1:pariisi
   LISA=-<nimi> zsh _tyo/linssiseppa2/omat191/kuvat.zsh` (mykistys ja "kaupunki google 1" skriptissä; simctl vain simusarja.sh:n kautta).
   NYK = lokit/valoseppa-omat191-pariisi-nyk. Parit omat191/parit/ + HAVAINNOT.md.
   UUSIN: LR:n v2e (lod0 711a7fe5, kaukonäkymä PT:n f1-palautteen mukaan) paketti VALMIS omat191/v6k18-eif2e (portti 0, leikkaus_ala_m 1,5)
   → seuraavaksi SIMU NYT Julkaisijalta: `APP=…/omat191/app-ala3/Matkakirja3D.app AJOT=uusi:v6k18-eif2e:eif1:pariisi LISA=-eif2e zsh kuvat.zsh`
   ja parit f0/f1/f2 PT:lle (+ LR).
3. KAUPUNGINTALO v3b: PT hylkäsi (tasavärit, lyhty, vino tanko, katot) → LR: "KT jäihin", ei uutta versiota. Paketti v6k18-sh3 tallessa.
4. TOWER BRIDGEN KUMMUT (PT 22.0x, 191, ei kiire): siltapilarien alla joessa telttamaiset kummut – Lontoon 10 km vesi (index-v23,
   lontoo2-8m) seuraa pintamallia pilareissa. Kuvat proto-3d/lokit/pk-lontoo-191-20261014/towerbridge-kummut-*.jpg. Veden tuotantoketju
   _tyo/linssiseppa2/lontoo-praha/ketju-lontoo2*.zsh; korjaus: vesialueella korkeus tasoon (ei pilarikumpuja). PK omistaa Lontoo-haaran.
5. LS1 teki puuohituksen omien mallien leikkausalueille (linssiseppa/puut-omat-191 a239512e3) – PT: ei tarvita, kun Eiffelin aukio poistui.
6. Edelliseltä: Kuun TELE-erä (junan jälkeen), 160 pt -lipun väistö (NUI:n lippu-vaisto-191 fb5354b4d korjaa), Prahan vesi v3 -kuva KS:lle.

## Linjaus (PT 22.5x)
- Välivaiheiden kuva-arkit Sonnet-apuagentille, itse vain lopullinen pari PT:lle. Konteksti: luovutus viimeistään 35 %:ssa.

## Työtilat
- wt/proto-linssiseppa2-andoyakauko (andoya-kauko-190, roiske), wt/proto-linssiseppa2-leikkausala (leikkaus-ala-191), wt/proto-linssiseppa2-lontoo
  (PK:lle luovutettu, ei enää minun), wt/proto-linssiseppa2-yovalot190 (lippu-varjo-190, junassa). Kaikki commitoitu.
- Vahti: valoseppa-haarat.txt – iss-kooste-190 taas vahdissa; leikkaus-ala-191 poissuljettu (Julkaisija).
