# Linssisepän luovutus 10.10.2026 klo 12.4x (tilinvaihto, PT)

Proto-haarat ovat paikallisia (sama git /Users/Shared/Claude/proto-3d/Matkakirja-proto), ei pushia. Kaikki työ on commitoitu;
worktreissä ei keskeneräistä.

## KIIREELLISET (omistaja: kaikki korjaukset seuraavaan julkaisuun, juna 176 → TF 177; Julkaisija antaa etusijan)

1. **PARIISIN PALLO: oppaan esittely pallon päällä + pallon kertoja ei ala** (PT 12.4x, omistajan TF 176 -kuvat). Suora siirtymä
   toisesta maasta Pariisin pallokierrokseen (kippi) → Pariisin oppaan esittelykuvat (metro, Havainnekuva-merkki, ⏸ ⏭) koko ruudulla
   pallon päällä, ja pallon kertoja ei ala edes esittelyn jälkeen. MENEE MUSEON EDELLE. Tila: EI ALOITETTU koodiin.
   - Worktree valmiina: `wt/proto-linssiseppa-kaupunkiaanet`, haara **linssiseppa/pallo-esittely-176** = natiiviseppa/juna-176
     51e42e7a6 (junan 176 runko).
   - Sonnet-Explore kartoitti koodia (pallon käynnistys, kertojan portit, oppaan esittely saapuessa, suora siirtymä) ja jäi
     kesken tilinvaihdossa → tee kartoitus uudelleen tai lue itse: OpasSovitin/OpasSilmukka (esittely, Viimeisin.puhuu,
     OpasAaniSoi, KaupunkiNakyvissa), pallokierroksen kertoja ja siirtymä (Siirtymassa).
   - Kaava: toisto todistusajolla (skenaario: avaa toisen maan kaupunki, sitten suoraan Pariisin pallo) → korjaus + testi
     (Linssit-testit) → `Linssit-testit/unity-tarkistus.sh` + `kaanna.sh` → käännös/simu Julkaisijalta → SHA PT:lle + Natiivisepälle.
2. **PALLON KOHDEMERKIT IRTI PALLOSTA** (PT 12.2x NUI:n kautta, omistajan TF 176 -palaute; NUI hoitaa kohdat 1 ja 3).
   Aloituslennon kohdemerkit (KaupunkiMerkit: Moskova, Kairo, Istanbul, Ateena + lentoaika) avaruudessa / Atlantin päällä, ja
   kehittäjänäkymän kaupunkivalinta ei osu (KaupunkiMerkit.Osuma). Selvitetty: Pallo.unityn muunnokset ja Cesium 1.25.1 ovat
   samat ennen ja jälkeen Unity 6.7:n (7bab4da79). KaupunkiMerkit/PalloKierto ei muuttunut 7.10. jälkeen. Kohtaus syntyy
   käännöksessä LuoPallosta. Merkit ovat georeferenssin lapsia, localPosition = TransformEarthCenteredEarthFixedPositionToUnity
   (Rakenna-korutiini). Epäily: 6.7:n ajonaikainen käytös tai ajoitus. Toisto: **sk-pallo-merkit-176.txt** on lisätty
   simuvuoro-museo2.zsh:n loppuun (iPhone D0D2CD1E, kuvat 0/5/15 s + vaaka) → katso kuvat ja korjaa.

## Museo (taidemuseo-176) — PT kuittaa NUI-kortin kuva-arkista

- **linssiseppa/taidemuseo-176 4b92767ed** (L1322, unity 0): + Natiivisepän museo-muisti (ASTC-seinätaso, ruudut, patsaat
  MuseoVeistokset, 6db621eeb), teokset.v2 (20 teosta), huonetekstit (Sali.Huoneet, HuoneVaihtui, HuoneKortti), LR:n sali-GLB
  (MuseoRakennus.LataaSali: ämpäri taidemuseo/alankomaat/sali-v1/, viety; valoatlas varjostimeen _Atlas/_AtlasLx; simulla
  JPEG-vara, koska simu ei tue ASTC:tä), veistospaikat (Sali.Jalustat + Resources/…/veistokset.json, 6 Rijks-sijoitusta,
  Leidenin 12 odottaa valintaa: Sisältökirjuri/LR), todistusajo.sh (--doc, aani-alku/loppu, e71b2802a).
- **Kombo linssiseppa/museo-kombo-176 48c4d9f28** = 4b92767ed + NUI natiivi-ui/museo-huonelukija-176 fb12f25b8 (korttikorjaus)
  → käännetty **e325c3bb7** (app lokit/linssiseppa-app/museo-kombo-176). **SIMU: `simuvuoro-museo2.zsh e325c3bb7`**
  (proto-3d/tyokalut/linssiseppa-ajot; iPad 00CF62C2 + iPhone D0D2CD1E + pallomerkit), Julkaisija antaa NYT, kun LS2 vapautuu (~12.45).
  Katso kuvat itse (01b nimikyltti, 03 kortti, 03h huonekortti, 08b Yövartio-kortti; puhelin p02/p03/p03h/p05; oleta "museo: sali-glb"
  näyttää, latautuiko LR:n sali) → kuittauspyyntö PT:lle.
- Edellinen arkki 11.43 (92fa81e5d): NUI-kortin asettelu rikki (korjattu fb12f25b8:ssa). ASTC "ei pakettia" simulla on ODOTETTU.
- Seuraavaksi museossa: Pelikoodarin museoäänet (aanet/taidemuseo-v1/; LS1 lisää MuseoSovitin.Askel ~0,75 m ja kytkee silmukan
  Taustaaani/Silmukka-reitillä manifestista; kertoja kertoja/<Teos.Id>.mp3), Leidenin veistosvalinta, grafiikka.v2.1 (13 teosta,
  vasta LR:n paikkojen + PT:n erän jälkeen), patsaiden 35 paketin vienti (Julkaisija).

## Muut

- **Juna 176 KUITATTU:** maa-dtm-175-u67 **29be895b8** (DTM + siltakorjaus), junan rungossa natiiviseppa/juna-176 16bcbfbd4.
- **LS-äänet (korkea tuuli) todentamatta:** ls-aanet-175-u67 b59f82584/883522fb7 EI junassa. "opas kamera" ei muuta äänimaiseman
  korkeutta (tila 4× 96 m) → KaupunkiAanimaisemaSoitin lukee OpasSovitin.KaupunkiKamera (PaivitaKameraTila); luultavasti
  kameraTila on null opas kamera -tilassa → selvitä ja korjaa skenaario. PT: museon jälkeen.
- Worktreet: wt/proto-linssiseppa-taidemuseo (museo; todistusajo.sh asuu täällä, linssiseppa-ajot/*.zsh osoittavat tänne),
  wt/proto-linssiseppa-kaupunkiaanet (nyt pallo-esittely-176). astro-auto poistettu (haara linssiseppa/esilataus-173 tallessa).

## Taustalla käynnissä

- Ei omia taustaprosesseja (käännökset K1/K2/K3 ja simuvuoro 11.43–12.13 valmiit; museo2-simu odottaa Julkaisijan NYT-sanaa).
