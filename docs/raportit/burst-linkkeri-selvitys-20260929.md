# Käännöspalvelun Burst-kaatuminen: juurisyy ja korjausehdotus (Natiiviseppä 29.9.2026)

## Oire
Käännöspalvelun (proto-3d/tyokalut/proto-kaanna.sh) Unity-vaihe kaatuu välillä 12–34 s:ssa:
"Burst internal compiler error: AotLinkerException: Non 0 exit code | The native link step failed".
Uusinta menee läpi. Tapaukset: 28.9. 17.05 ja 22.18–22.20, 29.9. 05.00, 05.26 sekä 10.04–10.06.

## Mitä loki näyttää
Loki on talletettu kansioon proto-3d/lokit/kaannospalvelu/vika-ajastin-20260929-1006/ (sim.log, luo.log).
- Kaatuvat linkkaukset eivät koske iOS-käännöstä. Ne ovat Burstin editorille tekemän "eager"-esikäännöksen
  macOS-isännän dylib-bundleja:
  `burst-lld-21-hostmac -flavor darwin -platform_version macos 11 11 -dylib -o <kopio>/Temp/Burst/burst-aot*/<hash>.bundle`
  ja `-filelist /var/folders/…/T/tmp*.tmp`. Yhdessä ajossa kaatuu yhdeksän linkkausta.
- Esikäännös käynnistyy jokaisessa domain reloadissa (BurstLoader.cs 219–227 → BurstCompiler.DomainReload). Linkkaus
  tapahtuu Burstin omassa kääntäjäpalvelimessa bcl.exe (gRPC), ja lld:n virheteksti ei päädy Unityn lokiin.
- LuoPallo sietää virheen ("Exiting batchmode successfully"), mutta IosSimulaattori ei (Build Finished, Result: Failure → return 16).

## Juurisyy (paras tuki)
Kaatunut ajo alkaa sekunteja tai minuutteja edellisen käännöksen jälkeen samassa käännöskopiossa. Edellisen ajon
Burst-palvelin (bcl.exe) ja linkkeriprosessit sekä yhteinen Temp/Burst ja $TMPDIR häiritsevät uuden ajon linkkausta.
Tiukasti ajoitettuja tapauksia on kolme viidestä: 22.18 → 22.20, 05.26 → 05.26 ja 10.04 → 10.06. Kahdessa jälkimmäisessä
ajastin käänsi saman junan uudelleen heti vahdin KÄÄNNETTY-rivin jälkeen. Tapaukset 17.05 ja 05.00 eivät ole ristiriidassa
tämän kanssa, mutta niitä ei ole todennettu. Lisenssivirhe sim.login rivillä 21 korjautuu alle sekunnissa, eikä se liity kaatumiseen.

## Korjausehdotus (proto-kaanna.sh, vaatii omistajan luvan: jaettu käännöspalvelu)
1. Ennen Unityä odotetaan (enintään 30 s), kunnes mikään käännöskopioon viittaava prosessi ei ole käynnissä. Lisäksi
   jokaiselle ajolle annetaan oma TMPDIR:
   ```sh
   for i in {1..30}; do pgrep -f "$KOPIO" >/dev/null 2>&1 || break; sleep 1; done
   export TMPDIR=$(mktemp -d "${TMPDIR:-/tmp}/matkakirja-kaanna.XXXXXX")
   trap "rm -rf $LUKKO; rm -rf \$TMPDIR" EXIT
   ```
2. LuoPallo-riville (r. 68) `UNITY_BURST_DISABLE_COMPILATION=1`, koska vaihe ei rakenna pelaajaa. Samaa EI saa lisätä
   IosSimulaattori-riville (r. 70): muuttuja asettaa ForceDisableBurstCompilation-lipun (BurstCompilerOptions.cs 766–769),
   joka ohittaa myös iOS:n AOT-kirjastot (BurstAotCompiler.cs 377, 403).
3. (juna-ajo.sh) Ajastin ohittaa ajon, jos juna-viimeisin.txt on sama kuin junan kärki, eli ei käännä juuri käännettyä
   junaa uudelleen. Tämä poistaa kaksi viidestä tapauksesta suoraan ja säästää lukkoaikaa.

Ennen hyväksyntää talteenottovahti (Natiiviseppä, scratchpad/burst-vahti.sh, klo 14 asti) tallentaa seuraavan kaatumisen
lokit kansioon lokit/kaannospalvelu/burst-vika-<ajo>/.

## Toteutettu 29.9.2026 klo 10.33 (omistajan hyväksyntä Natiivisepän sessiossa)
- Varmuuskopiot: tyokalut/proto-kaanna.sh.ennen-burst-20260929 ja tyokalut/juna-ajo.sh.ennen-burst-20260929.
- proto-kaanna.sh: lukon jälkeen `cd /` ja enintään 30 s:n odotus, kunnes kopioon ei viittaa yksikään prosessi
  (pgrep -f ja lsof cwd). Odotus kirjataan ajon lokiin. Lisäksi oma `TMPDIR=/tmp/mkk.XXXXXX`, jonka EXIT-trap poistaa
  lukon ohella, ja LuoPallo-vaiheeseen `UNITY_BURST_DISABLE_COMPILATION=1` (ei IosSimulaattoriin).
- juna-ajo.sh: ennen proto-kaanna.sh:ta odotetaan, kunnes jono on vapaa (enintään 60 min). Sen jälkeen junan kärki luetaan
  uudelleen, ja jos juna-viimeisin.txt on jo sama, ajo ohitetaan ("käännettiin jo jonon aikana, ohitetaan").
- Testit hiekkalaatikossa, jossa kopio, lukko ja lokit olivat testipolkuja:
  - tuntematon haara → VIKA merge, lukko ja TMPDIR poistuvat
  - roikkuva prosessi kopiossa → odotus 4 s ja lokirivi
  - juna-ajon lohko: jo käännetty ohitetaan jonon kanssa ja ilman, uusi kärki käännetään
- Seuraava todellinen testi on 1.0.45-junan käännös.
