# Pelikoodari: luovutus 07.11.2026 klo 23.10

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (30 %). Vanhat työkalut ja opit: `git show 283a7eb52:docs/raportit/viesti-pelikoodari-luovutus-20261107-2125.md` kohta 3.

## 0. ENSIN (PT 23.10, omistajan havainto 23.06), ennen kohtaa 1
"Viimeinen keisari teksti lataus kuvassa on liian isolla ja liian ylhäällä." Tavoite: otsikko pienempi ja alempana. Tee latauskuvahaaraan `pelikoodari/muisti-latauskuvat` (190d6c094:n päälle, työpuu `wt/proto-pelikoodari-muisti`). Kuva iPadin ja iPhonen kokoisena PT:lle → KK ennen junaa. Otsikon paikka lokissa: "latauspalkki paikka (448, 925) pt, otsikko (136, 33, 1093×182), isäntä 1366×1024" (iPad, TF 219), koodi `UI/Pelit/JuoksupeliNakyma.cs` noin rivit 290-360. Ei aloitettu.
Lisätieto PT:ltä: latauksen hitaus näkyi iPhonella ja pienellä iPadilla.

## 1. TYÖ NYT: juoksupelin lataus nopeammaksi (PT 23.07, omistajan pyyntö 23.05)
PT:n sana: "Saako juoksupelin latausta nopeutettua? Se kestää todella kauan." Tavoite: juoksupeli alkaa selvästi nopeammin. 1) Mittaa nykyinen latausaika laitteelta (iPad JU:n vuorolla muistijonon jälkeen, junan 220 sha 72e257a0b) ja osita syyt lokiriveistä. 2) Korjaa isoimmat omalle haaralle, sama mittaus uudelleen. Ei junaan ilman PT:n kuittausta. Ositus ja luvut enintään 3 riviä PT:lle; KK:lle PT välittää.
TILA: JU:lta EI VIELÄ pyydetty laiteajoa. Koodia ei muutettu.
PT 23.1x (sanatarkasti): "Ositus kuitattu. Molemmat ehdokkaat (esihaku taustasäikeessä, LOD2-kierros pois) saa tehdä omalle haaralle; 220-mittaus ennen ja jälkeen samalla laitteella. Ei junaan ilman kuittausta." Hitaus näkyi iPhonella ja pienellä iPadilla: mittaa samalla laitteella ennen ja jälkeen (PT:n ehto).

### Ositus vanhoista iPad-lokeista (MITATTU, mutta ei junan 220 shasta)
Lähde: `lokit/pelikoodari-tf219-a8b873e5d-juoksu2/muisti-tarkka.log` (L-rivit ms-aikaleimoin) ja `lokit/linnanrakentaja-seina5-ipad/`. "avataan" → "latauskuva pois": 43,6 s (TF 219) ja 37,0 s. Latauskuva näkyy 0,1-0,2 s:ssa, ongelma on sen jälkeen.
Aikajana (TF 219): 0-2,8 s taivas, Puyi, palatsin pohja; 2,8-5,8 avoimet huoneet, lähipuut 4935, lähikoristeet 29901; 5,8-12,9 LOD2-kierros (noin 7 s); 12,9 peittokartta LOD2 0,8 s; 13,7-20,3 LOD1-kierros (noin 6,6 s); 20,3 peittokartta LOD1 0,8 s; 20,3-30 LOD0-kierros (noin 9,7 s, leivottu valo, kujaportit); 30-34 osasarja, kaiteet, C1-räystäät, varjot; 34-39,2 verkkojen CPU-kopiot vapautetaan TAHDITETUSTI (5,6 s, tahti 2 000 000 kärkeä/s, tarkoituksellinen: `JuoksuSokkeloMaailma.Palatsi.cs:672` "Lataus pitenee noin 6 s"); 40,7 korttipuut, kääretaulu; 43,6 valmis.
Kuvataajuus latauksen aikana noin 40 ruutua/s (mittari: 402 ruutua 10 s:ssa): pääsäie EI ole täynnä, eli lataus odottaa enimmäkseen.
SYY (koodista, ei todistettu ajolla): `LataaPalatsiMallit` (`Palatsi.cs:398-540`) lataa jokaisen osan (LOD2, LOD1, LOD0, noin 100 osaa kukin) peräkkäin: `JuoksuHahmot.Hae` (levyvälimuisti `Levytausta.Lue`, vähintään 1 ruutu) → `Task.Run(DioraamaGlb.Lue)` + `while (!t.IsCompleted) yield return null` → rakennus pääsäikeessä → seuraava. Vähintään 2 ruutua per osa.

### Korjausehdokkaat (järjestys: hyöty/riski), ei aloitettu
A. ESIHAKU: käynnistä seuraavien 3-4 osan levyluku + jäsennys taustasäikeessä (`Task.Run`: `File.ReadAllBytes(JuoksuHahmot.Valimuistissa(url))` + `DioraamaGlb.Lue`), kun nykyistä rakennetaan; jos tiedosto ei ole välimuistissa, vanha polku. Huomioi kaiteeton-haara (C2-tiedosto ensin) ja tornien kopiot. Muisti: K jäsennettyä mallia kerralla, pidä K pienenä.
B. LOD2-KIERROS POIS, kun `Lod2Purku` on päällä: LOD2 tuhotaan kuitenkin LOD1:n jälkeen (`PuraLod2`, rivi 719), joten noin 7 s + peittokartta 0,8 s menee hukkaan. TARKISTA ENNEN: taustan LOD2:sta kerätään korttipuiden atlas (`KirjaaKorttiKuva`, rivi 434), rivin 612 kommentti "JuoksuKorkeusKartta LOD2-malleista", `RakennaPeitto(1)` ei saa riippua LOD2-kartasta, ja osa ilman LOD1:tä pitää LOD2:n.
C. CPU-kopioiden 5,6 s:n tahditus: tarkoituksellinen muistin takia; muutos vain PT:n sanalla.
Mittaus: skriptit `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksu-lataus/` (`vaiheet.py <muisti-tarkka.log>` ositus, `aikajana.py <log> N` suurimmat raot, `vali.py <log> alku loppu raja`). Laiteajo: avaa juoksupeli komennolla (`ui juoksupeli v4`), vain loki, ei kuvia; vahti voi pysäyttää komennot VIKA-rajalla (4 080 Mt), joten pyydä kytkin pois PT:ltä. Ennen ja jälkeen samalla skenaariolla, mielellään 2 avausta kummastakin. Kylmää välimuistia ei mitattu.
NS:n vaihe12-ajo (`lokit/natiiviseppa-muisti-12`, 10604363c) voi sisältää juoksupelin avauksen: tarkista ennen oman ajon pyytämistä.

## 2. Lontoo (PT 22.0x, valmis, raportoitu)
Maanpinta `a7ad5fc24` (`pelikoodari/lontoo-maanpinta`, natiivi-backup, työpuu `wt/proto-pelikoodari-kortti`): siirtymä totta mutta pieni (45° 3-14 px, 70° 22-39 px / 2752), hinta iso (nimet odottivat ruudulla enintään 24 s, merkit 81 s). Suositus: jää haaralle. PT:llä, ei vastausta. TULOS ja parit `lokit/pelikoodari-lontoo-m1-parit/`. Palatyyliä ja avainvikaa (`tee-palat-lontoo.py`) ei muuteta ilman PT:n sanaa; muurin ovien avoimet eivät ole työtä (omistaja 20.55).

## 3. Odottaa muilta (ennallaan)
Kulkukartta `10e9b6c4a` PT:n sanaa ja LAV:n iPad-ajoa. Latauskuvat `190d6c094` NS:n vaihe12:ssa: kun NS kertoo rivin "latauskuva näkyy ... odotus X s" ja muistieron, rivi PT:lle.
