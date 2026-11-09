# Karttaseppä: luovutus 9.11.2026 klo 17.28 (KS)
Syy: konteksti 25 % (hook), pehmeä raja. Korvaa -1705:n; sen sisältö (haara karttaseppa/luovutus-20261109-1705) on voimassa paitsi kohdat, jotka tämä päivittää.
`T=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/nostot-korostetut-20261109/` · natiivi worktree /Users/Shared/Claude/wt/proto-karttaseppa-tietonapautus (haara **karttaseppa/tietonapautus**, remote **natiivi-backup**, EI origin).
HUOM: tämän session viesteissä ja commit-viesteissä aikaleimat "17.4x/17.5x" ovat vääriä (oikea kello 17.1x–17.28).

## TEHTY
1. **Lontoon 14 kylttiä: PR ravelius/Matkakirja#6519 squashattu mainiin d8dcdc43a** (CI vihreä). Rivi PT:lle. JU: Lontoon kylttien Mac-ajo jonossa, alkaa vasta kun sisältövienti d8dcdc43a on success.
2. **Pariisin mallinostot, ajo 2 (c1e3b07bf) katsottu** → syyt lokista (PT: "ei pelkkää uusintaa"), erittely `$T/MALLINOSTOT-2-TULOS.md`:
   - Invalidit + Grand Palais: keskelle napautus osui 3D-malliin, joka ei ollut napautuskohde (vain kyltti/nimi; Louvre poikkeus).
   - Sainte-Chapelle: kierto alkoi −45°, Notre-Dame 430 m suoraan kameran ja kohteen välissä.
   - "Tyhjät harmaat kuvat" (myös JU:n havainto): esikatselun kuvatyökalu elävän kartan KERROS-tilassa (pääkamera pois, ElavaKamera ilman pohjakopiota) = kuvatyökalun artefakti. Skenaarioihin `komento pallo kerros pakota taysi`.
3. **Natiivi (karttaseppa/tietonapautus, kaikki unity-tarkistus sh 0):**
   - **8b906d293**: NostotKartalla.TietoNapautus kyltti → nimi → **3D-malli** (MalliOsuma, Kylttikohde.Osuu); AvaaMallinKohde yhteinen. NahtavyysEsittely.**VaistaEsteet** (kierto väistää välissä olevan mallin).
   - **dbe105f0f**: MalliKyltit.Ruudulle = Paneeliin-muunnoksen käänteinen (PT: "Grand Palais" ja "✦ Palais de l'Industrie" päällekkäin PK:n ipad-pieni-ajossa, skaala 3.78×3.48 → TahtienIsannat-isäntälaatikko väärässä kohdassa).
   - **ab57114e5** (uusin): VaistaEsteet myös malli < 400 m kameran maapisteestä, mallit vaaka + 400 m asti (NUI/PT: Temple-tornin maisemakierto, ND kameran vieressä). PT: tämä on KS:n koodia, NUI ei tee.
4. **Mallinostot-3 (8b906d293) katsottu:** Invalidit, Grand Palais (lokissa "mallin napautus"), Montparnasse ✓. Sainte-Chapelle ✗ skenaariovirhe: Invalidien esittelyn kierto jatkui `ui sulje`n jälkeen → kamera ei mennyt SC:hen, napautus osui ND:hen (lokissa myös "este Panthéon … -89° → 11°" = väistö toimii). Kuvat `$T/mallinostot-3-1000/`, rivi PT:lle lähetetty.

## JONO (JU ajaa; valmis-rivi tulee KS:lle; vahti: lokikansiot alla)
1. **ks-pariisi-mallinostot-4-ab57114e5** (sk-pariisi-mallinostot-4-mac.txt, ✕-sulku `ui pinnaus napauta-sulje` kohteiden välissä) → odotus 4/4, SC:n kierto ei ND:n takana → pari PT:lle.
2. **ks-temple-vaisto-ab57114e5** (sk-temple-vaisto-ipad.txt, pk 0.465) → lokissa "este Notre-Dame …", kuvissa ND ei reunassa → **Temple-kierron kuva PT:lle** (PT:n pyyntö). NUI:n vertailuajo: nui-temple-piste-1-ipad-066244413 x-1.
3. **ks-grandpalais-tahti-dbe105f0f** (tai ab57114e5; sk-grandpalais-tahti-ipadpieni.txt, ipad-pieni pk 0.465) → ✦ Palais de l'Industrie Grand Palais'n kyltin alla, lokissa "isäntä (x,y)–(x,y)" → pari PT:lle.
4. **ks-pariisi-nimet-8b906d293** (NUI:n tähtikuvien jälkeen) → nimen napautus avaa noston esittelyn (Tuileries, Luxembourg, Forum des Halles) → kuvat PT:lle.
5. **ks-lontoo-kyltit-8b906d293** (viennin d8dcdc43a jälkeen) → Westminster, Cutty Sark, Kensington: kyltin napautus → esittely → kuvapari PT:lle ennen junaa.
Kun kaikki katsottu ja PT kuittaa: natiivi karttaseppa/tietonapautus junaan PT:n kautta (ei omaa mergeä).
Vahdit (viritä uudelleen): postilaatikko `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (Monitor 30 min); ajovahti: kopioi tämän session scratchpadista ei säily → tee uusi (glob lokit/ks-*-<sha>/, valmis kun loki.txt:ssä "valmis").

## LISÄYS 17.3x (JU)
- Mallinostot-3: JU vahvisti 8/8 kuvaa ilman harmaita. Kulman kuvakortti = edellisen kohteen pinnattu luenta (tarkoitus), JU:lle selitetty.
- grandpalais-tahti ajossa **dbe105f0f**:llä (riittää, ei uusintaa). Nimet ja Lontoo vaihdettu **ab57114e5**:een → lokit ks-pariisi-nimet-ab57114e5/, ks-lontoo-kyltit-ab57114e5/.
