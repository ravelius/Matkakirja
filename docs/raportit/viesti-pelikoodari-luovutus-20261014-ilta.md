# Pelikoodarin luovutus 14.10.2026 ilta (nollaus, PT: konteksti 50 %)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari, proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto
(haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, push remoteen natiivi-backup). Edellinen luovutus
viesti-pelikoodari-luovutus-20261014-iltapaiva.md (kaikki sen kohdat hoidettu tai alla).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti kokonaan. Osoitekirja /Users/Shared/Claude/osoitekirja.md: viestit AINA
  `send_message` session id:llä. PT local_74630a27-8c1b-4ac3-9143-538efab8cbcd (≤ 3 riviä), Julkaisija local_22b29f10… (KÄÄNNÖS/SIMU NYT,
  ilmoita LUKKO VAPAA / SIMU VAPAA), NUI local_33ba1387…, KS local_37708e68…, NS local_bf20055b…, Äänittäjä local_846757a4….
- Simut T7-sarjassa: `source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh` ennen `xcrun simctl`. Oma simu pelikoodari-iPad13
  39644E75-8BDA-4ED8-98B1-3FC864B73697 (ja pelikoodari-iPhone 3E6A1D4D-9B21-4296-ADB7-24FF25267E15). `ui napauta x y` (pt). iPadin
  kuvakaappaus vaakana tulee 90° kääntyneenä (sips -r 270). Jokainen ajo alkaa `aani mykistys 1`.

## 1. ETUSIJA: RAKETTI NÄKYVISSÄ KOKO LENNON (omistajan junan 190 ehto)
Omistaja (PT 14.10. 15.4x, sanatarkasti): "Ja avaruusraketti-animaation aikana itse raketti ei saa hävitä kuvasta missään kohdassa, vaan
sen pitäisi löytää ISS ja telakoitua niin, että raketti pysyy koko ajan näkyvissä, jos ei muuten niin hyvin pienenä."
PT:n todistusvaatimus: raketti/kapseli ruudulla lähdöstä telakointiin (kaukana saa olla pieni, kamera seuraa tarvittaessa); kuva 1 s välein
koko lennosta + automaattinen tarkistus (projektio ruudun sisällä ja edessä, ≥ muutama px) jokaisessa kuvassa vaiheittain (nousu, Max Q,
erotus, kiertorata, lähestyminen, telakointi) + kuva-arkki PT:lle. Huom: Valosepän arkissa "nousu +11 s" raketti oli vain pieni piste –
tarkista nimenomaan kiertorata/lähestyminen.
- TEHTY (ei vielä simussa): haara pelikoodari/raketti-nakyvissa-190 @ 27ba52d80 (natiiviseppa/juna-190 4df035f31 päällä).
  Syy: lähestymisessä kamera siirtyi ISS:n seurantaan (IssKuvakulma.SeurannanEtaisyysM 1 200 km, matkalla Nousu.Lahestyminen-nousukaari
  tuhansiin km), mutta raketti jäi omalle radalleen (3 000 km Andøyasta, ISS voi olla missä vain) ja liioittelu oli rajattu ×200:aan.
  Korjaus: Nousu.Paikka(l, osuus, iss) sekoittaa raketin radalta Telakointi.AlkuPaikka(iss):iin samalla isoympyräsekoituksella ja
  LahestymisOsuudella kuin kameran katsekohde; RakettiLento.Liioittelu(…, lahestyminen) poistaa katon (vähintään 3 % ruudusta);
  RakettiMalli.Nakyvyys + RakettiLaukaisu.KirjaaNakyvyys kirjaa sekunnin välein
  "raketti: näkyvyys t=… T+… vaihe V edessä 0|1 ruudulla 0|1 (x, y) koko N px". Linssit 1779/1779, tarkista.sh 0.
- KÄÄNNÖS käynnistetty irrallisena 16.1x Julkaisijan KÄÄNNÖS NYT L2 -vuorolla: loki proto-3d/lokit/pk-nakyvissa-20261014/kaanna.log,
  appikopio …/app-27ba52d80/Matkakirja3D.app. Kun valmis: LUKKO VAPAA Julkaisijalle. SIMU 39644E75 on Julkaisijan jonossa 1:nä
  (odota SIMU NYT).
- AJA: `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/iss-palaute/ajo-nakyvissa.sh <ulos> <app>` (täysi lento laukaise 1 auto →
  telakointi → Cupola, video lento.mp4 + aikaleimat.log + video-alku.txt), sitten
  `python3 …/iss-palaute/tarkista-nakyvissa.py <ulos> [min_px=4]` → nakyvyys.tsv, yhteenveto vaiheittain ja arkki-nakyvyys.png
  (jokainen sekunti, hylätyt punaisella). Tarkista myös silmällä: raketti oikeasti näkyy (ei vain bbox), telakoinnin alussa ei hyppyä
  (raketin suunta kääntyy telakoinnissa – LS2:n AsetaTelakointi), avaus/alusta. Jos hylättyjä → korjaa → uusinta.
- Huomioita: telakoinnin aikana mitataan kapseli (kapseliT). Lähikuvat (Pulu) kääntävät kameran Puluun – mittaus tehdään niiden jälkeen.

## 2. ISS-palaute 190: haara pelikoodari/iss-palaute-190 @ 19652ed2c (worktree wt/proto-pelikoodari-isspalaute)
- Kohta 9 Max Q KUITATTU (PT). Kohta 8 äänitasot KUITATTU (manifesti v10: kertoja −15…−16 LUFS, ducking 0,2/0,35).
- Kohta 7 (lauseet loppuun + loppukysymys): odottaa NUI:n uusintaa (natiivi-ui/iss-loppu-190 db8e7b193, sisältää aa1623d61; skenaario
  ilman `loppu kysy`, kysymys tulee itse 5 s v2-perillän jälkeen). Kun NUI lähettää TODISTUS-kansion (aikaleimat.log + video-alku.txt):
  `python3 /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/iss-palaute/kokoa-loppu.py <kansio> - <video.mp4>` → *-aanella.mp4 → PT:lle.
  Edellinen ajo (todistus-issloppu2-iphone-20261014-1523) näytti jonon toimivan; testikomento katkaisi v2-perillän (korjattu).
- Kuittauksen jälkeen haara junaan 190 (NS yhdistää; PT: vasta kun kohta 7 kuitattu).

## 3. 44 pääkaupunkikarttaa: KS:n PR #4593 VALMIS (KS 16.1x)
Kytkentä 4c4c4d636 (vain maakartat.js: 44 riviä, 30 kohteellista + 14 aluekarttaa kohteet: [], SK:n esittelyt 93/93, vanhat rivit 0
muutosta) + KS:n Moroni 11ed3001f. npm test 5531/0. Ei toimia, ellei PT pyydä. Opit: kytke-pilvisisalto.mjs lisää taulujen LOPPUUN →
älä aja sitä uudelleen sisällölle, joka on jo mainissa (#4573); T7:n paakaupungit-pilvi-20261013 on vanhempi kuin korjauskierros 2.
Worktree /Users/Shared/Claude/wt/pelikoodari-paakaupungit-kytkenta (poista mergen jälkeen: tools/uusi-worktree.sh --poista
pelikoodari-paakaupungit-kytkenta).

## Valmiit tässä vuorossa
- Ateena-vika KORJATTU (uusi peli / aloita alusta nollaa kaupunkirajauksen), 800bb45c4 rungossa 190, todistettu iPad vaaka + iPhone.
- Telakointi: vahdin musta i1 ei regressio (vahdin käännös ilman telakointi-190:tä); rungolla todistettu (arkki-telakointi-runko190-20261014.png).
- Kuitatut lokit NAS:lle (pk-kupoli-v2, pk-alkulento). Proto-worktreet: isspalaute, nakyvissa, uusipeli, kupoli (iss-kupoli-190, ei
  junaan, LS2:n 98d4de0f3). uusipeli voi poistaa (800bb45c4 rungossa).

## Työkalut (proto-3d/_tyo/pelikoodari/)
- iss-palaute/: ajo-maxq.sh, kokoa-maxq.py, ajo-telakointi-runko.sh, ajo-nakyvissa.sh, tarkista-nakyvissa.py, kokoa-loppu.py.
- alkulento/ajo-uusipeli.sh (Ateena-todiste, napautukset käsin).
