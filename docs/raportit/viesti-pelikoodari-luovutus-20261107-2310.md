# Pelikoodari: luovutus 07.11.2026 klo 23.10

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (30 %). Vanhat työkalut ja opit: `git show 283a7eb52:docs/raportit/viesti-pelikoodari-luovutus-20261107-2125.md` kohta 3.

## 00. TILA 23.2x (PT 23.17 + kohta 0)
- PT 23.17 (omistaja 23.10): "Keisarin pitää juosta karkuun automaattisesti pelin alussa. Myös alun drone lennossa on teksti liian iso ja korkealla." TEHTY `1888141a9` (`pelikoodari/keisari-lahtee-itse`, 72e257a0b:n päällä, työpuu `wt/proto-pelikoodari-tarkastelu`): ohjauksen siirtyessä taso 1 keisari kääntyy itse oikealle vastaseinältä (JuoksupeliNakyma `itseLahto`); JuoksuOtsikkoPaikka 20 % korkeus / 55 % leveys, alareuna 31 %.
- Kohta 0 TEHTY `003ab5b9f` (`pelikoodari/muisti-latauskuvat`): VaakaOtsikko 1260 → 900 px, keskiY 143 → 190 px; lasketut kuvat `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/keisari-lahtee/latauskuva-otsikko-{ennen,jalkeen}-laskettu.png`.
- Esikatselua varten yhdistelmä `e26c3ad16` (`pelikoodari/esikatselu-otsikot-lahto`). Skenaario `_tyo/pelikoodari/keisari-lahtee/sk.txt`. JU:lta pyydetty vuoro 23.2x: 4 ajoa (ipad, iphone-vaaka × e26c3ad16 ja 72e257a0b). Kuvat PT:lle, PT → KK. Ei junaan ilman kuittausta.

## 00000000. TILA 02.3x (UUSIN)
- PT 02.05: OMISTAJAN PÄÄTÖS 02.0x (KK) "Kyllä" = 22dc4c06b junaan 221. EHTO: kääntymisohje "Pyyhkäise oikealla peukalolla…" näkyy ensimmäisessä risteyksessä, jossa pelaaja kääntää itse (27.10.). Varmista ehto, kuvapari KK:lle, sitten sha JU:lle junaan 221 (tarkista 221:n kärki). "Otsikot vain vähän alemmas (latauskuvassa ei hattuun)." TF ei lähde.
- Ehto EI täyttynyt 22dc4c06b:ssä (koneen käännös sytytti ja kuittasi ohjeen). KORJATTU `69f80037c`: haara `pelikoodari/keisari-221` (natiivi-backup, työpuu wt/proto-pelikoodari-tarkastelu) = juna-221 330a43515 + bb973922c + 22dc4c06b poimittuina + korjaus (JuoksuOpetus.KoneKaantaa). Testit Juoksu 208/208 (MK_JUURI = scratchpadin juuri: k06w-linkit + osamallit791-v6 mediasta `maailma-v4/`), unity-tarkistus 0.
- Kysytty PT:ltä 02.1x: otsikkolause muutospyyntö (latauskuvan keskiY 190 → ~170 px) vai kuvaus? Ei vastausta vielä.
- Esikatselu pyydetty JU:lta 02.3x: `_tyo/pelikoodari/keisari-lahtee/aja-ohje.sh` (sk-ohje.txt, 69f80037c ja 22dc4c06b ipad) → ajot-ohje.txt. Sitten parit KK:lle (PT:n kautta), sitten sha JU:lle.
- Latausmittaus: pari -2 + tahti4-1 JU:n iPad-jonossa; kuvatarkistus LOD tehty (parit-lod/, raportoitu PT:lle).

## 0000000. TILA 01.2x (UUSIN)
- PT 01.1x: "pyydä JU:lta toistopari -2 + kuvatarkistus (alun rakennukset ilman LOD-poksahdusta, iPad ja iPhone). CPU-kopioiden tahditus: saa kokeilla samaan haaraan, mutta mittaa muistihuippu latauksen aikana (raja 4080); jos huippu nousee selvästi, jätä pois. Junaan 221 vasta kuittauksellani toistoparin ja kuvien jälkeen."
- Pyydetty JU:lta 01.2x: iPad ennen-2/jalkeen-2 (sk-ipad-lataus.txt) + tahti4-1 (61f63adb9 + QA `ui juoksupeli palatsi kopiotahti 4000000`, sk-ipad-tahti4.txt, ei koodimuutosta) → `lokit/pelikoodari-lataus-*`; esikatselu `_tyo/pelikoodari/juoksu-lataus/aja-kuvat.sh` (sk-kuvat.txt, 4 ajoa) → ajot-kuvat.txt. Kun valmis: vertaa ajat + tarkka-huippu latauksen aikana; kuvaparit a–f PT:lle. Jos 4 M ok → oletus koodiin samaan haaraan ja uusi mittaus.

## 000000. TILA 01.0x (UUSIN)
- Latausmittaus TEHTY (JU:n pari 1): 44,1 s -> 27,3 s (-38 %), 61f63adb9 vs 3bfd18d9a; tiedot `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksu-lataus/TULOS-1.txt`. Raportoitu PT:lle; kysytty, pyydetäänkö JU:lta pari -2 + kuvatarkistus ennen junaa. Odottaa PT:n vastausta. Ei junaan ilman kuittausta.

## 00000. TILA 23.5x (UUSIN)
- Nollattu 23.40, luovutus luettu. PT 23.5x: kuvaparit 1–7 + 3b PT:n kuittaamat, KK:n kortti omistajalle odottaa. TF 221 "Ei vielä" (omistaja 23.37): odottaa illan korjauksia, myös latausaikaa. Lepo latausmittaukseen asti (JU, kansiot `lokit/pelikoodari-lataus-{ennen,jalkeen}-1`).

## 0000. TILA 23.37 (UUSIN)
- Kuva-ajot VALMIIT ja raportoitu PT:lle: parit `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/keisari-lahtee/parit/` (1–7, 3b). Keisarin itselähtö toimii (loki "keisari lähtee itse vastaseinältä (oikealle)", kuvat). Linja 1 vapautettu JU:lle. Odottaa PT:n/KK:n kuittausta; junaan vain kuittauksella (koodihaarat `pelikoodari/keisari-lahtee-itse` 1888141a9 ja `pelikoodari/muisti-latauskuvat` 003ab5b9f; 221:n päällä poiminnat `pelikoodari/esikatselu-221` 22dc4c06b).
- Huomio: jälkeen-kuvassa c näkyy opetusohje "käänny oikealle" keisarin jo juostessa (ohje seuraavaan risteykseen?) — tarkista, jos PT/KK huomauttaa.
- SEURAAVA TYÖ: latausajan mittaus iPadilla (ks. alla 000), koodi 61f63adb9.
- 23.5x: JU ajaa mittauksen (PT 23.5x) iPad-jonossa ASTC:n (~00.25) jälkeen. Ohje lähetetty: skenaario `_tyo/pelikoodari/juoksu-lataus/sk-ipad-lataus.txt`, 1 ennen (3bfd18d9a) + 1 jälkeen (61f63adb9), vahti pois, kansiot `lokit/pelikoodari-lataus-{ennen,jalkeen}-1`. Kun JU ilmoittaa: ositus `vaiheet.py <muisti-tarkka.log>` + LOD-kierrosrivit → ≤ 3 riviä PT:lle.

## 000. TILA 23.2x, JATKO
- PT 23.3x: 1888141a9 kuitattu koodina; kuva-ajo junan 221 (3bfd18d9a) päälle. Kuva-ajot käynnissä JU:n vuorolla (linja 1, alku 23.18): `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/keisari-lahtee/aja4.sh`, tulokset `.../keisari-lahtee/ajot.txt` (ajo → lokikansio). Jälkeen = `22dc4c06b` (`pelikoodari/esikatselu-221`: 221 + keisarin lähtö + latauskuvan otsikko), ennen = 3bfd18d9a; ipad ja iphone-vaaka. Kuvat: 0-latauskuva, a-otsikko, b-laskenta-1-seinalla, c/d/e-lahto. Lokista tarkista rivi "keisari lähtee itse vastaseinältä (oikealle)". Kun valmis: linja vapaa → rivi JU:lle; parit PT:lle (≤ 3 riviä + polku), PT → KK.
- LATAUSAIKA (kohta 1): koodi `61f63adb9` (`pelikoodari/lataus-esihaku`, 221:n päällä, työpuu `wt/proto-pelikoodari-muisti`): A esihaku (EsihakuN 3) + B LOD2 pois rakennuksilta (Lod2Ohitus). Lokirivit "palatsi v2: LODn-kierros X s (esihaku osui …)". EI MITATTU. Seuraavaksi: iPad-mittaus JU:n jonossa ennen (3bfd18d9a) ja jälkeen (61f63adb9) samalla laitteella, 2 avausta kummastakin (`ui juoksupeli v4`, vain loki), ositus `_tyo/pelikoodari/juoksu-lataus/vaiheet.py`. PT:n ehto: sama laite ennen/jälkeen. Ei junaan ilman kuittausta.

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
