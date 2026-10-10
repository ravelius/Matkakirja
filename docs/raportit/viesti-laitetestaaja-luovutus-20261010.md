# Laitetestaaja: luovutus 10.10.2026 aamulla (nollaus, kontekstiraja 50 %)

## Tila: OIKEUTETTU LEPO
Ei käynnissä olevia ajoja, omat simulaattorit (iPhone 0AC1815C, iPad 3622D89D) sammutettu, ei omia worktreitä (koonti-worktree poistettu). Haara `laitetestaaja-savukierros-b13`, kaikki pushattu (kärki: ks. `git log -1`). Älä aja mitään ennen Päätoimittajan/Siirtosepän pyyntöä; vain automaattiset testit (omistajan linjaus 7.10.), simu vain erikseen pyydettynä.

## Jonossa (järjestys)
1. **Junan 173 Pariisin portti** menee edelle (Julkaisijan/LS1:n laitevuoro).
2. **Junan 174 iPad-muistiportti Olavinlinnassa** (iPad Pro 13 `00008103-001819421413401E`, omistajan lupa 30.9.), kun 174:n Release-laitekäännös on laitteessa ja Julkaisijan vuoro annettu: `/Users/Shared/Claude/proto-3d/tyokalut/siirtoseppa-ajot/muistitarkka-olavinlinna-ipad.sh j174 420` (Siirtoseppä, ajamaton; jos vaihe ei etene → kerro Siirtosepälle). Tulos `lokit/olavinlinna-muistiportti-<aika>-j174/` (analyysi.txt, poiminta.txt). RAJA: jetsam/sovellus kuoli TAI pienin vapaa < 500 Mt → juna seis, rivi PT:lle; muuten rivi PT:lle + Siirtosepälle: pienin vapaa, suurin fp, tex huippu, onko "seikkailu: tehosteet" 11 riviä.
3. **Varjomittaus TF 173:n jälkeen** — ohje commitissa `b389b5ab8` (lue se ensin; en ole nähnyt sisältöä).
4. Junan 169 TF:n jälkeen (jos PT yhä haluaa): Olavinlinnan avaus + kaksi ylöskatsetta (Pariisi, Tukholma), kun Postivahti ilmoittaa kuorman < 20. Skenaario valmiina: `docs/raportit/laitetestaaja-video-tyokalut-20261010/sk-video168.txt` + `video168b.sh` (päivitä `--app` ja `--sha` uuteen buildiin; kaannos.txt = `Data/Raw/kaannos.txt`, ei BUILD-SHA).

## Tehty tässä sessiossa (8.–10.10.)
- PR-katsaukset `pr-katsaus-20261008.md` ja `pr-katsaus-20261009.md` (vain luku).
- Miniatyyrikooste (24 kaupunkia, 71 kuvaa) → PR #4184 mergetty.
- Videotarkistukset ruutu ruudulta: video164 (7 virhekohtaa, PT välitti), video164b-4 (kiihdytys/hidastus, valokorostus, 60 fps), TF 166 savu OK (01/11/04), TF 167 savu OK; TF 167 -video EI kelvannut (linna ei auennut, kuorma 190) → peruttu PT:n päätöksellä; 168:n uusinta peruttu (Olavinlinnan latausvika, korjaus 169).

## Menetelmämuistiinpanot (opittu kantapään kautta)
- **Kone**: video/A-V kelpaa vain kun load < 20 (muiden Unity-käännökset ja LinssiTestit nostavat sen helposti 70–190:een). Tarkista `sysctl -n vm.loadavg` ja `pgrep -f "Unity -batchmode|LinssiTestit"`.
- **Simulaattori**: T7-sarja; kaikki `xcrun simctl` vain `zsh /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh simctl …`. Omat: iPhone 0AC1815C (vanha 1572C658), iPad Pro 13 3622D89D (vanha 3B4CDACB). Ajo taustalle `perl -e 'use POSIX; if(fork()){exit 0} setsid(); …exec("zsh","skripti.sh")'`; EI `zsh -c`/`bash -c`/eval (PT:n sitova ohje 8.10.), pidemmät skriptit tiedostoon.
- **todistusajo.sh** (`proto-3d/Matkakirja-proto/tyokalut/todistusajo/`): `--era --udid --app --sha --skenaario [--laite ipad] --nyt`; app asennetaan itse; `--sha` = `Data/Raw/kaannos.txt` (esim. 6a67a9b1), ei BUILD-SHA. Vakiosarja `sarja.sh --vain 01,11` (04-linna: käytä `odota 75`, muuten Keittiön kuunnelma ei ehdi).
- **Videoajon sudenkuopat**: (a) ÄLÄ käytä `kuva`-askelta `video-alku`:n ja `video-loppu`:n välissä (jumitti 15 min); (b) polku-muotoinen `veto x,y,dt …` jumitti `.simkosketus`:in kymmeniä minuutteja → käytä yksinkertaista `veto x1 y1 x2 y2 dur` (koordinaatit vaakapaneelin pisteitä 1376×1032, keskipiste 688,516); ylöskatse vaatii 3 peräkkäistä vetoa (herkkyys 1×, katse palaa ~1,5 s), LS1:n vinkki; (c) linssivalitsin avautuu joskus vasta toisella napautuksella ja muistaa viimeisen välilehden → `tap 993 1297 0.1`, `odota 3`, `tap-teksti LINSSIT` (tai PELIT) ennen valintaa; (d) Pelit › Keskeneräiset › Olavinlinna vaatii kehittäjätilan (todistusajo asettaa `kehittaja 1`); linnan ☰-valikko: Vihje, Äänet (› Mikseri), Lähteet (› Kartta-aineistot), Kuori, Sulje linna; (e) linnan avaus kestää kuormassa > 160 s.
- **Ääni videoon**: `linssi kaappaa <s> <nimi>` + `linssi merkki` (välähdys + piippaus samaan hetkeen). Unity-wav kirjoitetaan vasta kaappauksen LOPUSSA (sim ei saa sammua kesken) — natiivi `<nimi>-natiivi.wav` kirjoittuu jatkuvasti (kopioi simulaattorin Documents-kansiosta T7:ltä `/Volumes/T7 4TB/Simulaattorit/Sarja/<UDID>/data/Containers/Data/Application/*/Documents/`). A/V-siirtymä: video edelsi ääntä 2,32 s (välähdys 2,81 s, piippaus 0,49 s) → `adelay=2316|2316`. Muunnos: `fps=60,transpose=2,scale=1376:1032` (sim tallentaa pystyyn kierrettynä).
- **Analyysi ffmpegillä**: ei drawtextiä eikä numpy:ta; kuva-arkit `fps=1/3,scale=320:-1,tile=5x4`; kaksoisruudut/nykäykset raakagray-diffistä (python3 -I), VFR-videon aukot `ffprobe -show_entries frame=pts_time`. Työkalut: `docs/raportit/laitetestaaja-video-tyokalut-20261010/` (mk.py = montaasi tietyistä ajoista, arkki.cjs = ennen/jälkeen-arkki sharpilla).
- **Disk**: raakavideo ~1,5 Gi/6 min → poista heti muuntamisen jälkeen (literal-polulla).

## Kanavat (id:t voivat vaihtua; Postivahdin tilataulu)
Päätoimittaja local_593b89a1-2514-4d74-b956-2a73db862382; Natiiviseppä local_bf20055b-d582-4812-ba2b-b59c37a5e7b8; Siirtoseppä local_b50bb32e-18e2-47c5-a597-8a18d56874e1; Karttaseppä local_37708e68-5a58-45ca-8dee-c13620993531; Postivahti local_e6d70b5a-fc8a-430c-a2a2-8c8da7f3fcc7; Linssiseppä local_45a869de-4d6b-4ed6-a6c9-30fd8442587e. Viesti vain valmis erä/jumi/kysymys, ≤ 8 riviä.
