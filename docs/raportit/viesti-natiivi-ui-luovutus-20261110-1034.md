# Natiivi-UI: luovutus 10.11.2026 klo 10.34, päivitetty 10.4x (kontekstivahti 27 %; korvaa -20261110-1010:n)

## PÄIVITYS 10.4x (OMISTAJA 10.34 KK:n ja PT:n kautta) — LUE ENSIN, kumoaa alta PR 6553:n yhdistämisen
- PR 6553 PIDOSSA (draft + kommentti): EI YHDISTETÄ, EI VIEDÄ. Sulkeminen vain PT:n sanalla. Muut-luokittelu oli väärään suuntaan.
- Tilalle SÄÄNTÖ natiivissa: 761535b9e (natiivi-ui/nostoluettelo-kaupungit = e642441b4 + 1): AiheetonNahtavyys — Muut-ryhmästä pois
  kohdekartan kartalla olevat kohteet (KaupunkiNosto.Kohde != null && !Tarina; ne ovat jo Nähtävyyksissä), tarinakohteet jäävät, tyhjä Muut
  piiloon; kaupunkilistan määrä laskee samoin. Unity 0 virhettä. JU:lta pyydetty sk-nostoluettelo-kaupungit-3-mac →
  lokit/nui-nostoluettelo-kaupungit-3-mac-761535b9e (kattaa -2:n; jos -2 ehti valmistua, katso molemmat). Tarkista q-1: Pariisin
  kategorioissa EI "Muut"; muut odotukset kuten -2 alla. Kuvat PT:lle → PT:n sanalla MR JU:lle: natiivi-ui/nostoluettelo-kaupungit
  761535b9e (ILMAN PR 6553:a). Lontoon tarkistus (14 kohdetta pois Muut-ryhmästä) puuttuu skenaariosta: lisää Lontoo-ajo tarvittaessa.
- UUSI 2) Kaupungin nimen napautus (Pariisi ja muut): nykyinen kortti pois, tilalle peli zoomaa kaupunkiin. Työlistalla, tekijä NUI.
  Lähtökohta: kaupunkimerkin napautus NostotKartalla (Kaupunkimerkki) ja kamera PalloKierto/NostonLento. Mac-pari PT:lle.
- UUSI 3) Kaupunkilehti + turisti-info näkyville kaupungissa: EHDOTUS KUVANA KK:lle (kaksi selkeää nappia kaupungin nimen yhteyteen,
  sovitettuna 09.28 pienoiskarttaan 5d01e2c25 ja nimikilpeen/kartussiin). EI KOODIA ennen KK:n sanaa.


PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
PK local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7. Natiivirepo /Users/Shared/Claude/proto-3d/Matkakirja-proto (remote natiivi-backup).
Tarkistus `sh Linssit-testit/unity-tarkistus.sh`. Skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/, lokit /Users/Shared/Claude/proto-3d/lokit/.
Jono: T=/Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py (`seuraava NUI`, `tehty`, `tilanne`).
Kuvat katsotaan sips -Z 1000 / -c rajauksena scratchpadiin (valikko ipad-kuvassa n. x 2000–2560, y 120–1120).

## 1. NOSTOLUETTELO (Kaupungit-kärki) — työn alla
- KADONNEET-VIKA: TEHTY. 0fb0ebfae (natiivi-ui/nostoluettelo-kadonneet) PT kuittasi, JU:n jonossa junaan 224 (MR5 → 224.15). Ei toimia.
- KAUPUNGIT-KOHTA JA JAOTTELU: haara natiivi-ui/nostoluettelo-kaupungit (worktree /Users/Shared/Claude/wt/proto-nui-pienoiskartta),
  ad96c30df (Kaupungit (n) maan tason ensimmäisenä → kaupunkilista nostomäärineen → kaupungin kategoriat, takaisin "‹ Kaupungit";
  kiinteä järjestys Jarjesta: Nähtävyydet, Kadonneet ihmeet, karttaselite, Muut; kaupungin ★-kyltit/leikkeet Kadonneet ihmeet -osioon)
  + e642441b4 KK:n 10.3x korjaukset: (1) kaupungin nimi valikon otsikoksi (Valiotsikko) molemmilla reiteillä, paluurivi alla;
  (2) maan tasolle Kadonneet ihmeet toiseksi (musterajaus pudotti ne: Ranskassa 11 pääkartan ihmettä; nyt ilman musterajausta +
  kaupunkien ihmeet YhdistaIhmeet-funktiolla kerran). Testipalaute `ui nostovalikko` kertoo "otsikko X", "kadonneita listassa N".
  ad96c30df:n Mac-pari (lokit/nui-nostoluettelo-kaupungit-1-mac-ad96c30df) PT kelpuutti → KK antoi sanan korjauksin.
  SEURAAVAKSI: JU ajaa sk-nostoluettelo-kaupungit-2-mac → lokit/nui-nostoluettelo-kaupungit-2-mac-e642441b4 (pyydetty 10.3x, JU:n NZ).
  Tarkista: q-1 otsikko PARIISI + "‹ Ranska"; q-2 maan taso Kaupungit, Nähtävyydet, Kadonneet ihmeet (≥ 11) toisena; q-3 ihmeet auki;
  q-4 MARSEILLE + "‹ Kaupungit". Kuvat PT:lle (≤ 3 riviä) → PT:n sanalla MR-pyyntö JU:lle: natiivi-ui/nostoluettelo-kaupungit e642441b4
  (PÄIVITYS: 761535b9e, ilman PR 6553:a). Sitten `tehty "Nostoluettelo: Kaupungit-kohta ja jaottelu"`.
- MUUT-KOHTEET AIHEISIIN (vienti): web-PR https://github.com/ravelius/Matkakirja/pull/6553 (4b6505b84, haara natiivi-ui/muut-aiheet,
  worktree /Users/Shared/Claude/wt/web-nui-muut-aiheet): maakartat.js aihe 18 kohteelle (KK:n luokittelu
  /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/nostoluettelo-muut-luokittelu-20261110.md) + lehdet.mjs vie aiheen +
  karttavalot.mjs rikastaKohdekartat: linkin aihe voittaa, muuten datan oma (aiemmin vienti ylikirjoitti nulliksi). Paikallinen vienti:
  Muut 0, luvut = KK:n odotus; testit 44/44. PK kuittasi viittaukset 10.2x. KUMOTTU 10.34 (ks. PÄIVITYS): PR pidossa, ei yhdistetä.
- KK:lle tehty lista: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/nostoluettelo-muut-pariisi-lontoo-20261110.md (laskin scratchpadissa,
  logiikka = KaupunkiNostot.Nostot; Pariisin luvut täsmäsivät peliin).

## 2. KLIKATTAVAT ESITTELYNÄ (3edc0a5e5, natiivi-ui/klikattavat-esittelyt) — ajo katsottu, AVOIN
JU:n ajot lokit/nui-klikattavat-1-{pariisi,lontoo}-mac-3edc0a5e5 (Mac iphone, rc 0): KUOLLUT 0; "tietokortti (ei kirjoitettua esittelyä)"
-rivit ovat TOISEN kaupungin kylttejä (Pariisissa Lontoon, Lontoossa Pariisin; omassa kaupungissa esittely) → ei sisältöpuutetta (PT:lle kerrottu).
AVOIN: `ui klikattavat napauta tavallinen` → "ei näkyvää merkkiä" molemmissa, eli b-1/b-2 eivät todista korjausta (tavallinen nosto
palkkina + kierto). Listassa ei ole yhtään tavallista nostoa merkkinä: selvitä, näkyvätkö kohdekaupungin tavalliset nostot (skandaalit,
hetket) NostotKartalla.merkit-listassa kaupunkizoomissa lainkaan (KaupunginNosto: Kohdenostot.Lahella + NostonLento.KaupunkiNostolle).
Jos eivät näy → korjaus on tarpeeton tällä tasolla, kerro PT:lle; jos näkyvät muualla → skenaarioon kamera sinne ja uusi ajo. Sitten `tehty`.

## 3. MUUT JONOSSA (koodattu, JU:n Mac-ajot jonossa; ohjeet luovutuksessa c72f50268 kohdat 2–5)
Museon latausilmaisin 37eba712e, kerronnan tauko a8bfc9d3e, maan pienoiskartta 5d01e2c25, kuvakyltti 153602c0f (koe, ei junaan ilman korttia).

## AVOIN EDELLISESTÄ
- Lyhyt versio 14877fa07: JU:n iPad-☰-kuva linkistä 224.7 katsomatta → katso, kun JU lähettää.
