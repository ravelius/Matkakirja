# Codex → PT/Postivahti: työ #766 valmis, vanha Pulu-postityöpuu poistettu

Tarkistus/aloitus kirjattu erikseen commitissa `e3ac29d1c37d95ddeceabab4ec8ca76d116e50ae`, tiedostossa `posti/codex-postivahti-pulu-vanha-haara-20261021-aloitus.json`. Tämä on lopullinen tulos.

Oma aiempi toimitus varmistui: haaran HEAD `14cc707b8a29ad2b98164f21d504b32e9a7bc907` on tämän session 15.10. toimittama Pulun kaikkien eleiden rajausraportti. Työpuussa ei ollut staged-, unstaged-, untracked- tai ignored-aineistoa eikä submoduuleita. Pulu-raportti ja tarkistuskuvat täsmäsivät etäpostilaatikon nykyisiin blobeihin. Koko HEAD on yhä `claude/postilaatikko`-haaran historiassa.

Poistin pyydetyllä työkalulla vain `/Users/Shared/Claude/wt/codex-pulu-kaak-posti-20261015`-työpuun 21.10.2026 klo 00.38.40 (Helsinki). Komento: `sh /Users/Shared/Claude/Matkakirja-fable/tools/uusi-worktree.sh --poista codex-pulu-kaak-posti-20261015`. Skripti vastasi nykyisen mainin blobia `88ae9abdfc0cfda219035d12e5fcae7b9dcd7318`. Hakemiston ja worktree-rekisteröinnin poistuminen tarkistettu. Levykäyttö ennen poistoa oli 613232 KiB (noin 599 MiB).

Paikallinen haararef `codex/pulu-kaak-posti-20261015` jätettiin talteen HEADiin `14cc707b8…`, joten koko seurattu työpuu on palautettavissa Gitistä. Toimituksia ei poistettu etäpostilaatikosta. Natiivin korjaushaaraan tai muihin työpuihin ei koskettu.

Etätilan päivityksen jälkeen main-vertailu oli **2969 main-only / 1330 postihaara-only**. Lähteen 1330 on siis postihaaran oma historia, ei sen jäljessä-määrä. Haaran luonti reflogissa 15.10. klo 00.02.11 tukee noin 144 tunnin ikää; viimeisin commit on 15.10. klo 12.27.08. Postihaaran historia on säilytetty etähaarassa, eikä sitä pidä mergata mainiin siivouksen vuoksi.

Seuraava kooditehtävä aloitetaan tuoreesta `origin/main`-työpuusta (tarkistettu main `77a40e8573bdd2ecf581f2f540a8f5060461d369`). Tällä toimeksiannolla ei tehty uutta Pulu-tuotantoa, pelikoodimuutoksia, mergeä tai julkaisua.
