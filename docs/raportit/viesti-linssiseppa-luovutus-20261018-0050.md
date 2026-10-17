# Linssisepän luovutus 18.10.2026 klo 00.50 (omistajan tilinvaihto 00.34, PT: ei uusia töitä)

Edellinen: viesti-linssiseppa-luovutus-20261017-2300.md (osoitteet, pyramidin historia, Mona Lisan omistajan sanatarkat pyynnöt).
Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia), ajot proto-3d/tyokalut/linssiseppa-ajot/.
Viestit AINA send_message id:llä (osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, LR local_996d60ab-b4af-4172-ad31-f8e948f141a3,
PK local_7fcab04b-864c-4ec2-98bd-46e171326701. Juna 201 on auki ~06 asti (odottaa NUI:ta), joten "202"-työt menevät vielä 201:een.

## 1. ENSIN: MONA LISAN LIIKE + AUTO ZOOM -SIMU (PT 00.38 kohdat 2–3; KK lupasi omistajalle, TF 201 ei lähde ilman)
- Haara linssiseppa/monalisa-201, worktree /Users/Shared/Claude/wt/proto-linssiseppa-monalisa (juna-201-pohja 310541004):
  f7952e7b3 (JO RUNGOSSA 21d5712be: kaiteen eteen, kesto suora/1,3 m/s, kääntö ≤ 15°) → d3b2d15d9 (korkeus samassa osassa)
  → **916c98c86** (UUSI, ei vielä rungossa): napautus penkkien yli (KulkuHaku), suora kierros (SuoraKierros päällä; korjattu
  teoskierroksen else-haara ja perillä kulkusuunnan hyppy), katse kohti lopullista suuntaa (vierekkäiset taulut sivuttain, ei
  ~60° kääntöä matkalla), TUMMA VÄLÄHDYS yli 60°:n käännöksessä (Kierros.Valahdykset → MuseoSovitin.TarkistaValahdys →
  näyttelyn valinnan musta kalvo). Testit: MuseoKaideTestit (Mona Lisa kaiteen edessä, vain sillä kaide; Louvren siirrot kääntö
  ≤ 40°, kesto ≈ suora/1,3), PenkinYliLattiaanJaReittiSuoraanPenkinYli. Linssit 2017/2017.
- AJO KÄYNNISSÄ: ajo-monalisa201b.zsh (pid 50748): käännös L2 alkoi 00.48 (~16 min) → odottaa `simu-monalisa201b.nyt`.
  Pyydä JU:lta iPhone-simuvuoro (~5 min) → `touch …/linssiseppa-ajot/simu-monalisa201b.nyt` → "SIMU VAPAA" JU:lle.
  Skenaario sk-monalisa-201b-iphone.txt: z0–z2 (auto zoom Mona Lisalla), video L/liike.mp4 (jatka → 777 välähdyksellä, jatka →
  775 sivuttain, vapaa, Kaanaan häät → Mona Lisa), m2. Todistus proto-3d/lokit/todistus-monalisa201b-iphone-*/.
- TARKISTA TÄYSIKOKOISENA: (a) auto zoom: kamera liikkuu lähemmäs, kehys + maalaus kasvavat yhdessä, kehys poistuu reunoilta
  (ei kuvan suurennusta kehyksen sisällä) – auto zoomia EI muutettu, kaiteen takaa kamera on nyt 3 m:ssä kapeammalla
  kuvakulmalla (kaideIhanne/LaajaTavoite < 1); (b) välähdys ei näytä ruutua ennen mustaa (QA-komennosta 1 ruudun viive mahdollinen;
  napautuksessa sama ruutu); (c) sivuttaisliike. Video < 1 min + zoom-still PT:lle → KK → NS:lle cherry-pick d3b2d15d9 + 916c98c86.
- Huom: kaannos.txt näyttää käännöspalvelun commitin (esim. ff130e7b9 = f7952e7b3 + palvelukommitti) → ajoskriptit tarkistavat
  "^KÄÄNNETTY"-rivin, ei sha-alkua (vanhat ajo-monalisa201.zsh / ajo-louvreavaus202a.zsh pysähtyivät siihen turhaan).

## 2. PYRAMIDI v2.4 (PT: kontakti OK) – 0,2-VAIHTOEHTO VASTA KK:N PÄÄTÖKSELLÄ
- Haara linssiseppa/orsay-valinnaiset-200 (worktree wt/proto-linssiseppa-orsay): **ffa433c76** = LR:n sarjasääntö (soikio 1,05 ×
  pohjan leveys, korkeus 0,3 × leveys, reuna ≤ 1 px, ei siirtoa, peitto 0,5; reunus 1,06 × sivu, kansi PergamenttiRamppi3). Vain
  Assets/Matkakirja/UI/KaupunkiPalloKuva.cs. Kuvat _valmiit/louvre-pyramidi-200-20261017/Q1z-/Q1zz-/Q1-, LUE-v2.md v2.4.
  Sha lähetetty LR:lle ja PK:lle (PK yhdistää galleria-200:aan). Edelliset: v2.2 ede9300b hylätty (omistaja 23.46 "leijuu"),
  v2.3 ec04fbaf5 ei esitetty (varjo lähes näkymätön).
- PT suosittaa KK:lle tiiviimpää soikiota 0,2 × leveys (iso soikio näkyy lasin läpi). ÄLÄ aloita ennen KK:n/PT:n päätöstä;
  silloin SarjaVarjoKorkeus 0,3 → 0,2 (KaupunkiPalloKuva.cs) → käännös L2 (ajo-louvreavaus202c.zsh mallina, APP
  _tyo/linssiseppa/pyramidi-app) → simu → lähikuva + 4× PT:lle. Pyramidi ei ole rungossa (NS:lle sha vasta KK:n kuittauksen jälkeen).

## 3. MUUT AVOIMET
- KEHYS = LR, valmis: proto linnanrakentaja/louvre-kehykset-201 3aeac4c8d (MuseoGeometria/MuseoRakennus.cs, MuseoValaistu.shader,
  ranska/sali.json, pinnat/kehys-kultaveisto.png); ei yhteisiä tiedostoja monalisa-201:n kanssa (tarkistettu). Simu JU:n seuraajalla
  (LR luovutus 1c309e97f). Älä koske MuseoRakennus.cs:ään.
- PK: ffa433c76 kirjattu PK:n luovutukseen (c1a782be9); seuraava PK cherry-pickaa galleria-200:aan LR:n vahvistuksella.
- Äänittäjän Louvre-puheviittaukset: Louvren puheet ÄÄ:n uusiin ottoihin, kun polut tulevat (Postivahdin aloitusviesti 23.2x).
- PT:n havainto m0: Kaanaan häät (louvre-inv-142, keskipiste y 4,445) – yläosa vaalea, alaosa musta: kamera taulun korkeudella
  ~4,4 m, alla seinä pimeässä. Ei estä; korjaus myöhemmin (katsekorkeus/valo korkealle teokselle).
- Codexin #361 sn1-pelitoimitus ei tullut (KTX2 + portti + vienti samana tuntina, kun tulee).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun (älä committaa).

## 4. TEHTY TÄLLÄ VUOROLLA (17.10. 23.2x – 18.10. 00.50)
- Mona Lisa f7952e7b3 junaan 201 (PT testien perusteella); laitekuvat L2 ff130e7b9 ja junan todisteapp 0fee93fb OK
  (proto-3d/lokit/todistus-monalisa201l2-iphone-20261018-0021, todistus-monalisa201juna-iphone-20261018-0029; PT/KK hyväksyi m2:n).
- Pyramidi v2.2 simu (ede9300b), v2.3 (ec04fbaf5), v2.4 (ffa433c76) simut; NUI:n SyoteLukko-ohje kirjattu (täydennys 8).
- Opit: else-haara if-ehdon laajennuksessa (teoskierros && !x → teoskierros { if (!x) }); lyhyen siirron nykäys syntyi
  kulkusuunnan vaihdosta viimeisillä 5 cm:llä (sivuhuojunta); väliaikainen debug-testi Linssit-testit/Testit/Tmp*.cs – muista poistaa.

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261018-0050.md).
Ensin kohta 1 (ajo-monalisa201b: käännös L2 → JU:n simuvuoro → video + zoom-still täysikokoisena → PT), sitten kohta 2 vain
PT:n/KK:n päätöksellä, sitten kohta 3.
