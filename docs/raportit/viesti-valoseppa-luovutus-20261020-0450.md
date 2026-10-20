# Valoseppä – luovutus 20.10.2026 klo 04.50 (Postivahdin KOVA RAJA 35 %)

Luovuttaja: Valoseppä (Opus, high). Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 (≤ 3 riviä),
KK local_8e4fcfed-fc40-464c-854a-1d031b005332 (kuvaparit, kopio PT), JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b,
NS local_fcc10552-5810-49bf-b0cf-188456f1231c, PK local_11aca9cd-eda6-4db9-9019-8a153c8b8795, Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2 (päiväkirja $D/JONO.md – lue loppu ensin). Simu vain JU:n SIMU NYT -viestillä, perään SIMU VAPAA.

## 0. ENSIN
- 208 DoF iPadilla: syvyyskuvakorjaus EI auttanut (kohta 2) → seuraava koe MSAA pois pelin kamerasta (kohta 2). PT:lle rivi lähetetty.
- iPad-syväterävyyden vyöhykkeet: `python3 -I $D/sokkelo/vyoero.py <D1-eteen.png> <D0-eteen.png>` (tulos-ipad.txt → kuvat/).
  KK:n ehto: Puyi + keski-/lähisokkelo ≥ 95 %. OK → PT:lle rivi + LT:lle pyyntö: iPad Pro 13 laitepari da677242c:llä (vyöhykkeet,
  GPU-ms syvä 0/1, muistihuippu; PT 03.0x). EI OK → syy uudelleen (laitelokin rivi "jälkikäsittely laitteella … putki …, syvyyskuva …").

## 1. HAARAT (proto-repo, wt /Users/Shared/Claude/wt/proto-linssiseppa2-jalki; ei remotea, haarat paikallisia)
- linssiseppa2/juoksu-jalki-206 kärki 61afdf9c3 = 207 (NS:n runkoon pyydetty): sumea fe6c3b1bf, katot k5 94f840dac (KK OK), master-merge
  957ff9eb8, DoF-käännösvartija 3be53bf0d + fd311266d (Editor/SyvaterayysSailyy.cs: URP VolumeFeatures |= DoF/liike/rae, -nographics
  karsi DoF:n; laitelokiin "jälkikäsittely laitteella ok/PUUTTUU"), pöly 2459aeb85 (Polly/PollynSavy, PK kytkee), DoF POIS 61afdf9c3
  (KK:n ehto: iPad koko kuva sumea).
- linssiseppa2/syva-208 kärki da677242c: DoF takaisin (0,6/90/320) + pelin kamera requiresDepthOption On vain syvä 1:llä (epäilty syy:
  Mobile_RPAsset m_RequireDepthTexture 0, iPad renderScale 1 → tyhjä syvyys = kaukotaso → CoC täysi). 2b0da545e = sama ilman syvä-ehtoa.
- linssiseppa2/haivytys-208 kärki 07515cb4b: katon _Haivytys (Bayer 4×4 + clip) Maailma + Lattia + MV-passi, ei varjoa; testit 2/2 → PK
  kytkee (pelikoodari/korttelit-208 21f804e1a). Merge PK ja syva-208 puhtaat.
- 206: aabbb84fa (liike-epäterävyys hennoksi, hahmot terävät) lukittu rungossa 82e263c79.

## 2. SIMUTULOKSET
- yhteinen14 b9348d05: katot k5 C-parit ($D/sokkelo/parit-yhteinen14) → KK OK.
- yhteinen16 e056b25c8: DoF-varjostin mukana; vyöhykkeet iPhone Puyi/keski/lähi 100 %, taivas 86 %; iPad 5/14/30 % → DoF pois 207.
- yhteinen20 05fdde796 (04.42–04.52, Exception 0, SIMU VAPAA annettu): syvyyskuvakorjaus EI auttanut. iPad 12/7/14 %, Puyi 20 %
  (vartija hälytti), iPhone 100 % (taivas 84 %). Laiteloki kumosi epäillyn syyn: iPhone = Mobile_RPAsset, syvyyskuva False (ja toimii);
  iPad = Ultra_RPAsset, syvyyskuva True (ja sumenee). Parit $D/sokkelo/parit, vyöhykkeet $D/sokkelo/vyot-*.txt.
  UUSI PÄÄEPÄILTY: Ultra_RPAsset m_MSAA 4 (Mobile 1) – MSAA-syvyyden resolvointi/kopio Metalilla → tyhjä syvyys → CoC täysi. Muut erot:
  renderScale 1 vs 0,8, opaque-tekstuuri, 4 varjokaskadia. SEURAAVA KOE: syva-208:aan pelin kameralle allowMSAA = false syvä 1:llä
  (tai Kamera.GetUniversalAdditionalCameraData + msaa pois), simu iPad → vyoero. Jos ei auta: renderScale 0,8 iPadilla kokeeksi.
  da677242c:n requiresDepthOption on tällöin turha → poista samalla.

## 3. AVOIMET / JONO
- PT 05.3x (208, KK): korttelien puutarhan vesiuoma (Lavastajan v3, nyt tasainen väripinta) veden näköiseksi: tumma, heijastava,
  kevyt mobiilivarjostin (esim. JuoksuLattia uusi laji materiaalinimen mukaan: taivaan heijastus Fresnelillä JuoksuTaivasVari +
  hento aaltonormaali ajasta, ei läpinäkyvyyttä) → TEE kun PK:n korttelikytkentä on simussa; hae materiaalin nimi Lavastajan v3-glb:stä.
- _Haivytys katoille TEHTY 07515cb4b (PK:lle ilmoitettu).
- iPadin nykäys 2×/s (LT 206): renderöinti poissuljettu; pääepäilty UI Lasipohja.Etsi (0,5 s × 15 Query) + KehysNapit.Hae → NUI/PT.
- PK: pölyn kytkentä + kuva iskun jälkeen; häivytyksen kytkentä; parit KK:lle.
- Vyöhykevartija $D/sokkelo/aja.zsh: Puyi-laatikko on mitoitettu iPadin 2048-leveälle kuvalle (iPhonella likimäärin).
- Tulivuoret k13 (Etna-vana liian kultainen/raidallinen) ja pimennys L1 (kuun varjo ei näy) PIDOSSA; rakettivideo yöllä kun kone vapaa.
- Worktreet: proto-linssiseppa2-jalki (kaikki), -sumea206 (mergetty 206:een → poista), -juoksuvalo, -nostot, -tulivuoret, -pimennys,
  -rakettivideo, -mrivi.

## 4. OPIT
- Unity -nographics: DepthOfField.IsActive() vaatii näytönohjaimen → URP karsii DoF:n hiljaa; tarkista laitelokista "stripped".
- Mobile-putki ei tee syvyyskuvaa: jälkikäsittely joka lukee syvyyttä pitää pyytää kameralla (requiresDepthOption).
- URP:n liike-epäterävyys kameran kierrosta sumentaa koko ruudun → hiivutus kulmanopeudella; hahmot nollaliikkeellä.
- Cherry-pick samaan haaraan ja masteriin → konflikti tilarivissä; yhdistä master omaan haaraan ennen yhteistä.
