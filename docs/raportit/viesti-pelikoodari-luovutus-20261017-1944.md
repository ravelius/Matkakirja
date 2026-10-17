# Pelikoodarin luovutus 17.10.2026 klo 19.44 (KOVA RAJA 35 %, Postivahti + PT)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261017-1721 (de8fc4204).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (/Users/Shared/Claude/osoitekirja.md):
  PT local_5df52e10-…, JU (Julkaisija, käännökset ja laitteet) local_5cb16c00-…, KS local_eec7f158-…, NUI local_44392b3c-…,
  NS local_674b9ec4-…, LR local_996d60ab-b4af-…, VS local_c238f4af-…, Postivahti local_a24c43c0-….
- Ajotyökalut: skenaariot /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/sk-*.txt (peli-komennot `peli <x>`, UI `ui <x>`,
  linssi `linssi <x>`; HUOM `kuva` = vain tilarivi laitteella, ei tallenna kuvaa). Jäsentimet samassa kansiossa:
  cupola_jaksot2.py <ajokansio> (gpuMs/fps jaksoittain merkit.txt:n riveistä), muistihuippu.py <muisti-tarkka.log…> ( fp/gfx-huippu).

## ENSIN (PT 19.4x): KARTAN 3D-ELEMENTTIEN GALLERIA (omistaja 19.27 "Ne kaikki kartan 3d elementit pitäisi olla jotenkin
## yhdenmukaisen värisiä ja kokoisia"; LR vetää; EI junaan ennen omistajan hyväksyntää)
- Suunnitelma ja säännöt: /Users/Shared/Claude/proto-3d/_valmiit/kartan-pienoismallit-v1/SUUNNITELMA.md + LR:n viesti 19.4x:
  1) maamerkit (ei pallot/nappula) luminanssi → seepia 70,51,31 / okra 196,162,108 / kerma 230,216,186, lasi+vesi liuske 146,154,152,
  korostukset messinki 205,178,128; 2) ääriviiva seepia 1,2 pt kaikille; 3) KOKO = KaupunkiPalloMitat.KarttaesineKoko(pk) =
  max(44, 0,8 × pallo) (EI kiinteä 44 pt kuten nyt tehty!), KokoKerroin 0,85–1,15, nappula samalla, pallo Koko(pk); 4) valo 58°, x 0,35;
  5) LS:n MaaVarjo kaikille, maakontaktilevy #887858 pois; 6) tunnistevärit pallo/kipsi/nappula.
- TEHTY: **d7ccd9e71** (pelikoodari/galleria-200 = juna 200 62853a8b8 + 1 commit, worktree wt/proto-pelikoodari-galleria, tarkista 0):
  QA `ui galleria nyt|yhtenainen|pois|tila` (UI/KarttaesineGalleria.cs): kamera meren yllä 48 N 32 W 2000 km 35°, ruudukko 11 saraketta,
  nimi alle. Rivi 1: B (ilmapallo, kipsi, raketti, torni, Rijks, Louvre = KaupunkiPalloKuva UI-kuvina), C Maamerkit (Maamerkit.Galleria/
  GalleriaPois: taulukko talteen), D pelinappula (Nappula.NappulanKuva UI-kuvana), E kipsipäät (AjattelijaPaat); sitten A
  (Symbolimallit.Galleria.cs: 21 erikoismallia liikkuvine osineen, Tiger Moth, 15 arkkityyppiä, 14 kategoriaa; paikat ruudulta pallolle
  RuudultaPallolle). Kytkin Kartta/Karttaesineet.cs (Yhtenainen, Korkeus) – A (Symbolimallit.Paivita + galleria) ja C (Maamerkit.LateUpdate)
  lukevat lipun omissa poluissaan, B/D/E koko galleriassa. KaupunkiPalloKuva.Tuhoa() lisätty.
- **PÄIVITYS 19.5x (LR): VS:n varjostimet valmiina linssiseppa2/kartta-seepia 6a2659c59 (pohja master 6339b1aec): kytkin
  `Matkakirja.KarttaSeepia.Aseta(true/false)` ennen piirtoa, kattaa A, B ja E → yhdistä haara galleria-200:aan ja kutsu Aseta
  Karttaesineet.Yhtenainen-kytkimestä. Kohdat b) ja c) alla KORVAUTUVAT tällä: EI _KarttaYhtenainen-globaalia itse, EI CPU-ramppia
  (Seepiaramppi.cs.txt pois kokonaan, ramppi vain varjostimessa). Pelikoodarille jää: (1) C-polku: Maamerkit.cs:n materiaali
  AjattelijaPaa-varjostimelle, kun Yhtenainen päällä (tekstuuri säilyy); (2) MaaVarjo-soikio kaikkien alle; (3) kokosääntö a).
  Valmis sha + tarvittava ajo (simu sk-galleria) → LR, joka pyytää JU:lta vuoron.**
- JÄLJELLÄ (järjestys):
  a) Koko LR:n sääntöön: Karttaesineet.Korkeus → KarttaesineKoko(Koko(kameran korkeus)) (A/C tarvitsevat kameran korkeuden: PalloKierto.korkeus).
  b) `Karttaesineet.Yhtenainen` propertyksi, joka asettaa `Shader.SetGlobalFloat("_KarttaYhtenainen", 0|1)` (VS:n KarttaSeepia.hlsl,
     haara linssiseppa2/kartta-seepia k83:n jälkeen: AjattelijaPaa, Symbolimalli ja Maamerkit → AjattelijaPaa).
  c) Siihen asti B-polun CPU-ramppi LR:ltä: /Users/Shared/Claude/proto-3d/_valmiit/kartan-pienoismallit-v1/Seepiaramppi.cs.txt →
     Seepiaksi(Texture2D) KaupunkiPalloKuva.Harmaaksi():n viereen, kutsu Rakenna():ssa kun !kipsi && Karttaesineet.Yhtenainen ja malli
     raketti/torni/museo (ei ilmapallo, Louvren lasi ennallaan). Galleria luo B-kuvat uudelleen kytkimen vaihtuessa. POISTA, kun VS:n haara
     on mukana (ramppi vain yhdessä paikassa).
  d) RATKAISTU (LR 19.5x): karttatausta parempi kuin kerma (todellinen ilme) → ei kermaa. (Alkuperäinen: LR halusi kermataustan (230,216,186) + PNG:n: nykyinen galleria on oikean karttakameran päällä (todellinen ilme ja koko) – kerro LR:lle,
     tarvitaanko kerma (esim. Cesium-laatat piiloon `pallo pohja paljas paalle` = Kartta/Komennot.cs, ei peli-komento).
  e) Uusi sha → JU: iPad-simukäännös + /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/sk-galleria.txt (simussa `kuva` tallentaa) →
     arkki-kuvapari LR:lle (LR vie PT:lle). JU:lle sanottu "d7ccd9e71 SEIS, uusi sha tulossa".

## SITTEN: CUPOLA KIERROS 3 (PT: suunta kuitattu; 1,0 | 0,7 -kuvapari → PT tekee yhden suosituksen KK:lle; ei junaan ennen sitä)
- Kierros 1 (lontoo2 17.43) ja 2 (19.04): GPU-ajan kasvu 52 → 86 ms = iPadin kuumeneminen (kello hidastuu), iOS:n "Serious" → pelin lämpösuoja
  (renderScale 0,7, bloom pois) → 15–22 ms, 30 kuvaa/s. Kehys/pilvet/ilmakehä eivät syy. Tulkinnat: lokit/cupola-kustannus-ipad-lontoo2-
  20261017-1743/TULKINTA-pelikoodari.md ja lokit/cupola-kustannus2-ipad-20261017-1904/TULKINTA-pelikoodari.md.
- Kierros 3 (JU 19.36): /Users/Shared/Claude/proto-3d/lokit/cupola-kustannus3-ipad-20261017-1928 – TULKITSEMATTA. JU: jo c-taysi-kohdassa
  sovelluksen lämpö = Kuuma (thermalState 0 → peli pakotti?) → viileää täysprofiilia ei saatu; appi ei tallenna kuvia (`kuva` = tilarivi).
  Tarkista ensin miksi Lampo oli Kuuma (Lampo.Pakotettu jäänyt edellisestä ajosta? `peli lampo auto` ennen alkua) ja aja uudelleen
  (sk-cupola-kustannus3.txt, lisää alkuun `peli lampo auto`). Kuvapari 1,0 | 0,7 tarvitsee simun (laite ei tallenna) tai JU:n ruutukaappauksen.
- Suositus PT:lle: Cupola M1-iPadeilla (iPad13,x) suoraan lämpösuojan profiilissa.

## Valmiit tänään tässä sessiossa
- **Pariisin uuden pelin kaatuminen iPad Pro 12.9 M1:llä** (myös TF 199 rajalla): syy intron TraileriTaustan UITK-sumennus kerroksiin
  (gfx 1,07 → 3,5–3,9 Gt) → korjaus sumennus 2,5 s viiveellä **7e2e28368** → NS junaan 200 (runko 2f155feec). iPad 2/2: 2,6 Gt, 0 muistivaroitusta.
- **Cupolan LCD "PARIISI · 14 541 KM"** (NUI): siirretyllä aluksella vain nimi **43439f3b5** → junassa 200 (runko 62853a8b8).
- **Kiina**: avauspysäkki 221 eaa. kiinteä laaja **d8f65ec23**; kevyt taistelu selkeällä kartalla (18° kallistus laajassa) **269f285d8**
  (pelikoodari/kiina-kamera-laaja = KS:n 1af33ce7f + 1, KS yhdistää). Sui 589 -pari tarkistettu (kamera OK).
- Levy: 14 omaa worktreetä + 2 appia poistettu.

## Worktreet
wt/proto-pelikoodari-galleria (ENSIN-työ), -kiina-kertova-kamera (269f285d8), -fft-meri (ce479c342, Cupolan laitekäännös), -laukaisin
(e43d3b3ff, ei yhdistetty – tarkista tarvitaanko), -tivoli-vapaa-lento-200 + wt/pelikoodari-vapaa-lento-osio (Tivoli tauolla), wt/pelikoodari-posti.

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md ja docs/raportit/viesti-pelikoodari-luovutus-20261017-1944.md (haara
pelikoodari-luovutus-20261014-paiva). ENSIN gallerian viimeistely (koko LR:n sääntöön, _KarttaYhtenainen-globaali, B:n CPU-ramppi) →
uusi sha JU:lle simuajoon sk-galleria → arkki LR:lle; sitten Cupola kierros 3 -tulkinta ja uusinta."
