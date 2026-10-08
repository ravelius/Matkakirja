#!/bin/zsh
# EDITORIN BURST-JIT POIS KÄÄNNÖSAJON AJAKSI (Päätoimittaja 8.10.2026, juurikorjaus junaan 167; Natiiviseppä).
# Syy: Rakennus.Kaanna kytki JIT:n pois vasta Unityn käynnistyttyä ja kutsui BurstCompiler.Cancel kesken käynnistyksen
# JIT-linkityksen → mono-segv 7–8 s kohdalla (7.10. 15.43, 22.39; 8.10. 09.27). Kun EditorPrefs BurstCompilation = 0 jo ennen
# Unityn käynnistystä, editori ei aloita JIT-jonoa lainkaan (pelaajan AOT ei käytä tätä asetusta) eikä Cancelia tarvita.
# Asetus on koodaus-käyttäjän yhteinen (~/Library/Preferences/com.unity3d.UnityEditor5.x.plist), joten se rajataan
# käännöslukon sisään: burst_jit_pois ennen Unityä, burst_jit_palauta lopuksi (trap EXIT). Kaatuneen ajon jäljiltä
# merkkitiedosto palauttaa alkuperäisen arvon seuraavan ajon alussa.
#   source /Users/Shared/Claude/proto-3d/tyokalut/burst-jit.sh; burst_jit_pois; trap burst_jit_palauta EXIT
MK_BURST_DOM=com.unity3d.UnityEditor5.x
MK_BURST_MERKKI=/tmp/matkakirja-burst-jit-alkuperainen
burst_jit_palauta() {
  [[ -f $MK_BURST_MERKKI ]] || return 0
  defaults write $MK_BURST_DOM BurstCompilation -int "$(cat $MK_BURST_MERKKI)" && rm -f $MK_BURST_MERKKI
}
burst_jit_pois() {
  burst_jit_palauta   # edellinen ajo kaatui ennen palautusta → alkuperäinen arvo ensin takaisin
  print -r -- "$(defaults read $MK_BURST_DOM BurstCompilation 2>/dev/null || echo 1)" > $MK_BURST_MERKKI
  defaults write $MK_BURST_DOM BurstCompilation -int 0
}
