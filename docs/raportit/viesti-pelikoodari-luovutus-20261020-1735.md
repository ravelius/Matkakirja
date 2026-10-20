# Pelikoodarin luovutus 20.10.2026 klo 17.35 (Postivahdin KOVA RAJA 40 %)

Edellinen: viesti-pelikoodari-luovutus-20261020-1536.md (ENSIN-kohdat tehty: v5 simu ok, NS:n junassa, v4b-appi poistettu).
Rooli: Pelikoodari (Opus, high). Proto-repo paikallinen (ei pushia), worktree /Users/Shared/Claude/wt/proto-pelikoodari-kerattavat-206,
nykyinen haara **pelikoodari/avaus-208 = 1f1a75eec**. Seurannan ulkopuolella vain Peli-testit/Testit/TilapainenVerkkoVienti.cs (EI committia).
**PT 17.3x: viikkokiintiö 94 % → avauserä jatkuu uudessa sessiossa VASTA PT:n viestistä.**

## RUNGOSSA / JUNASSA
- GPU + jäätyminen: **pelikoodari/jaatyminen-208 = 10e6a5a68** NS:n runkoon e3f88ff4e (PT OK). Sisältää VS b6e253a6d (varjon heitto
  koon mukaan) + a53817ef2 (QA valo liike|mv|msaa|skaala) + PK: kokoluokat 7c0b1a0e9 (QA `ui juoksupeli kauko [tila|kaikki|kerroin]`),
  aarteiden sirpaleet vasta iskussa 5fd00f8b1, väistöaarteet jonosta 12/ruutu + PaivitaKappaleet ≤ 2×/s e10aebfc9, QA `valo msaa 2|4` 10e6a5a68.
- Jäätyminen KORJATTU (LT: juoksun alku max 133 ms, oli 0,3–3,2 s; syy ~870 väistöestettä × 5 mallia × ~21 sirpaletta samassa ruudussa).

## GPU EI VIELÄ RATKAISTU (LT:n korjaus 17.3x: aiempi 10,4 ms oli väärä kohta)
Raskas kohta (siemen 777, ~14 s, `valo jaady 1`), 10e6a5a68, GPU ms: P0 oletus 34,2 | skaala 0,8 26,9 | msaa 2 32,9 | P3 (0,8+msaa2) 25,3 |
P3 + `valo sumea 0` 10,5 | P3 + `valo syva 0` 24,2 | P3 + `valo liike kamera` 11,7; J 25 s P3:lla 9,6. Taulukko /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/gpu-208/lt-10e6.txt.
→ Syy: liike-epäterävyyden kappalepassi (JUOKSU-profiili MotionBlurMode.CameraAndObjects, Valopohja.cs ~360; kaukainen geometria
MotionVectors-passissa), ei resoluutio eikä varjot (varjot pois −0,3). Sisältö (kokoluokat) vain −4 ms.
**ENSIN:** LT:ltä pyydetty täydellä resoluutiolla P7 `valo liike kamera`, P8 `valo sumea 0`, P9 `valo mv 0` yksin + kuvapari P0/P7
(Puyin terävyys juoksussa). Jos P7 tai P9 ≤ 14 ms → oletukseksi (Jalki.cs: Valopohja.JuoksuLiikeKappaleet = false tai
SeinatLiikevektoreissa = false), muutos pieni; jos Puyi sumenee näkyvästi → rivi PT:lle (omistajan valinta). PT:lle lähetetty korjausrivi 17.3x.

## AVAUSERÄ (PT 17.17, omistaja; vetovastuu PK) – haara pelikoodari/avaus-208 (⊃ 10e6a5a68)
- 088f99027 JuoksuAvaus (Peli/Juoksupeli/JuoksuAvaus.cs, puhdas): aikajana LentoAlkaa 0 · PuyiLahtee 1,6 · KuvatekstiPois 3,4 ·
  MaataPitkin 3,6 · EunukitHuutavat 4,2 · PuyiKatsooTaakse 5,8 · PuyiHuutaa 6,2 · KiertaaPaikalleen 7,0 · OhjausPelaajalle 8,4 (Kesto) ·
  TakaaAjajatLiikkeelle 9,8; `JuoksuAvaus.Tapahtui` (VS, NUI, Äänittäjä kuuntelevat).
- 75a918ae2 avauslento: JuoksuAvaus.Drone (Hermite-avaimet Puyin kehyksessä, 70 m ylhäältä → maata pitkin → kasvot → sivukaari
  omalle paikalle, w sekoittaa pelin kameraan), AskelKerroin (Puyi seisoo kunnes drone näkee, juoksee bottina, pysähtyy 5,5–6,8 s),
  PuyiKaanto 180°. JuoksupeliNakyma.AvausKesken: vain Avaa-kutsussa (ei uusintajuoksuissa), syöte vasta 8,4 s, takaa-ajaja pidossa
  9,8 s asti, kosketus/näppäin ohittaa ja laukaisee loput tapahtumat; lokiin "MATKAKIRJA juoksupeli avaus: <tapahtuma> t".
  QA `ui juoksupeli avaus 0|1|nyt [siemen]`. HUOM simuskenaariot: `ui juoksupeli v4` toistaa nyt avauksen → vanhoihin `avaus 0` ensin.
- 1f1a75eec drone elää: DroneNosto.Elo (korkeus ±0,7, etäisyys ±0,5, sivu ±0,35 m, jaksot 2–8 s; sisällä 40 %, käännöksessä → 0
  30°:ssa, oviaukossa pois), EloSivu 0,9, kallistus 0,4 °/° katto 14°, oikaisu 1,8/s.
- Testit 683/683, unity-tarkistus 0, liike-/kamera-/kielivahti ok. EI simua eikä laitetta vielä (PT: automaattiset testit → NS).
- Tarjottu NS:lle 17.3x yhdessä: avaus-208 1f1a75eec + VS linssiseppa2/hehku-avaus-208 404a63482 (hehku MaataPitkin → Ohjaus)
  + NUI natiivi-ui/juoksu-kuvateksti-208 3cf7887fa (kuvateksti "Peking, kesä 1914 · Kielletty kaupunki"; NUI:n 1 rivi Sulje:ssa).
  NS 17.3x: avaus pidossa PT:n ohjeesta, kunnes erä valmis.
- KESKEN: Äänittäjä (local_726ba209…) tekee eunukit "Majesteetti!", Puyin huudon LAPSEN äänellä (omistaja 17.23: kesä 1914, Puyi ~8 v)
  "Ottakaa kiinni, jos saatte!" ja ~9 s avausmusiikin → polut tulevat PK:lle; kytke JuoksupeliNakyma: Tapahtui-kuuntelija
  (EunukitHuutavat / PuyiHuutaa → Hurraa(polku) tai SoitaHuuto; tekstitys kielitiedostoon tekstit.fi.json, ei kovakoodattuna),
  avausmusiikki LentoAlkaa → ristihäivytys pelimusiikkiin OhjausPelaajalle (PohjaLahde.Soita/Pysayta, JuoksuMusiikki.Ristihaivytys).
- Puyille ei ole taaksekatsomisleikettä (kierto koko hahmolla + idle); Codexilta leike myöhemmin, jos omistaja haluaa.
- Kartoitus ja sovitut kytkennät: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/avaus-208/kartoitus.md.
- Juoksun alun 133 ms ruutu: PT:n mukaan avauslento peittää latauksen (tarkista ensimmäisessä laiteajossa).

## AVOIMET / HUOMIOT
- NS:n käännöslokissa varoitus JuoksuLattia.shader(108) SokkelonPinta mahdollisesti alustamaton (metal) – ei PK:n muutos.
- valovahti: "2 pienentynyt: aja --kirjaa" (ei PK:n muutos).
- Varasokkelon solmurengas ja uuden juoksun ~3 s:n piilovaihe ennallaan (ks. edellinen luovutus).
- Osoitteet: PT local_8d8ebf72…, NS local_fcc10552…, VS local_e675f86d…, LT local_36a45147…, JU local_24e63224…, NUI local_c6d63773…, Äänittäjä local_726ba209….
