# Valoseppä – luovutus 20.10.2026 klo 13.00 (Postivahdin KOVA RAJA 37 %)

Luovuttaja: Valoseppä (Opus, high). Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 (≤ 3 riviä),
KK local_8e4fcfed-fc40-464c-854a-1d031b005332, JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b, NS local_fcc10552-5810-49bf-b0cf-188456f1231c,
NUI local_c6d63773-0270-4873-96f8-63c66cf52794, PK local_11aca9cd-eda6-4db9-9019-8a153c8b8795, LS local_7a457b99-7ecd-4634-93a0-0c02b53e8d24,
Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b. D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2 (päiväkirja $D/JONO.md – lue loppu ensin).
Proto-wt /Users/Shared/Claude/wt/proto-linssiseppa2-jalki (haarat paikallisia; nyt checkoutattuna linssiseppa2/louvre-varjo-208).
Simu vain JU:n SIMU NYT -viestillä, perään SIMU VAPAA. OMISTAJA 11.45: simu vain uudelle tekniikalle (esim. varjostin), omistajan pyytämille
kuville ja yöjunan laitekierrokselle; parametrisäädöt ilman simua → PT → NS.

## 0. ENSIN: KEILATON LOUVRE-ATLAS (juna 209, PT 12.5x: "tee itse uusi leivonta", ei naapurivertailua; parit PT:lle)
Syy: Horatiuksen punainen soikio on LEIVOTTU sali-v2q:n valoatlakseen (LR:n leivo_sali.py leipoo kohdevalokeilat seinille), joten ajonaikainen
varjostin ei saa sitä pois (k5–k7 vain himmensivät: R 165 → 66, tausta 36).
- Kopio LR:n kansiosta: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/louvre-atlas-209 (LR:n louvre-pilotti-v2k:hon EI kosketa).
- KÄYNNISSÄ nohupilla (kestää nollauksen): lokit/aja_k0b.zsh → lod1 k0, lod0 k1.6 + k0 (Blender ~4 min/leivonta), sitten lokit/yhdista.py
  molemmille lodeille: seinien pystypinnat (seinämateriaalit, |n_y| ≤ 0,3, +6 px bleed) --keila 0 -leivonnasta, kaikki muu (lattioiden valoläikät)
  --keila 1.6:sta. Tulos lokit/k0/sali-lod{0,1}-keilaton.jpg + vertailu-lod{0,1}.jpg (k1.6 | k0 | yhdistetty); valmis-rivi JONO.md:hen ja
  lokit/k0/aja_k0b.out ("K0B VALMIS"). lod1 k1.6 tehty jo 12.58 (lokit/k0/sali-lod1-k1.6.*).
- TARKISTA: vertailukuvat täysikokoisina (Horatiuksen sali da: seinä tasainen, kehysvarjot jäävät; lattialäikät ennallaan); k1.6-leivonnan
  pitää vastata LR:n v2q-atlasta (/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/louvre-pilotti-v2k/valot/sali-lod0.jpg) – jos UV-pakkaus
  poikkeaa, käytä k1.6:ta ja k0:aa yhdessä (sama ajo, sama UV) ja vie myös uusi glb.
- SITTEN: kopioi keilaton jpg → $W/valot/sali-lodL.jpg ja k0-glb → $W/glb/sali-lodL.glb, paketti
  `/Users/Shared/Claude/proto-3d/_lahteet/venv-rembg/bin/python -I lahde/paketti_v2.py <ulos> v2r` (W:n juuresta) → _valmiit/taidemuseo-ranska-v2r-vienti-…
  → JU ämpäriin; proto: Assets/Matkakirja/Linssit/Resources/Museo/ranska/sali.json "glb": {"kansio": "sali-v2r/"} haaraan louvre-varjo-208:n päälle
  → JU käännös → simu Horatius + madonna + Kythera (sk-k7-iphone.txt, $D/louvre-varjo/aja-k6.zsh KIER=k8 SK=… APP=…) → parit PT:lle → NS juna 209.
  Varjostimen k5–k7-puristus (MuseoValaistu) saa jäädä (vaikuttaa vain keilaan, jota ei enää ole).

## 1. JUNA 208: TILA
- Louvre: PT OK → NS: k7 **db430a614** (louvre-varjo-208 ⊃ 28bc7aacc: madonnan kaarivarjo MuseoVarjo haal.w + MuseoRakennus Lisaa(kaari)
  – omistaja 12.33 "varjo hyvä"; keila taulun kohdalle k2/k3; atlaksen puristus pystyseinässä k5–k7; NUI 7d5e492e2 valkoinen nimi; muiden
  kehysvarjo = 0cebcc31c, omistaja "muut ok"). Madonnan kuvat KK:lla (omistaja). NUI-huomio PT:n kautta: seinän tummuessa madonnan nimi
  vaihtuu vaaleaksi beigellä (tekstin taustakynnys).
- Joki: vesi k6 9a82a1fa0 (jade + taivas varjossa, _Uoma) junassa (PK 83ba2501e → runko df83610ab).
- JUOKSUPELIN RAJA (omistaja 12.34 iPadilla "terävän ja epäterävän raja liian selkeä"): rungossa df83610ab syväterävyys on POIS (SyvaSade 0,
  ei DoF-komponenttia; 3be53bf0d vain säilyttää varjostimen). LT:n jäädytetty W1a näyttää rajan siltojen takana = laattasaumojen lyhyt haalistus.
  Haara linssiseppa2/liike-208 **0dad6f92c** (df83610ab + cadf8241d liike-epäterävyys Low → Medium + lattia k6 Sauma/hieno pitkä liuku
  4 → 14 × leveys) → PT:lle 12.5x, ODOTTAA PT:n OK:ta → NS. GPU-mittaus LT:n iPadilla ennen julkaisua (Medium-liike).

## 2. MUUT
- Työkalut: $D/louvre-varjo/aja-k4.zsh (iPhone+iPad, KIER/U/APP), aja-k6.zsh (vain iPhone, KIER/SK/APP), madonna.py (oikea Louvre | peli),
  vertailu.py; JU:n appit 208d–g voi poistaa (JU tietää).
- Pidossa ennallaan: louvre-valo-208 (88d06bb45 hylätty), tulivuoret k13, pimennys L1, rakettivideo yöllä, sillan heijastus (palatsin vaihe 4).

## 3. OPIT
- Museon seinät sali-GLB:ssä tulevat atlaksesta (hajaSpot 0): ajonaikaiset keilamuutokset eivät näy niissä → tarkista ensin, onko efekti leivottu
  (S0 = S1 simussa = leivottu).
- Omistajan "muut ok" = kaikki muu jää kuten hänen näkemissään kuvissa; älä voimista samaan erään (k3:n kehysvarjovoimistus peruttiin).
- "Syväterävyys säilyy" -lokirivi ≠ efekti päällä; tarkista profiilin arvo (SyvaSade) rungosta ennen säätöä.
- Pysäytetyn taustatehtävän Blender jäi eloon; pgrep ennen kill:iä ja tarkista, kumman ajon prosessi on.
