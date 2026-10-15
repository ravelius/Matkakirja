# Pelikoodarin luovutus 15.10.2026 päivä (tilinvaihto, Postivahti 11.5x)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari, proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto
(haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, push remoteen natiivi-backup). Edellinen luovutus
viesti-pelikoodari-luovutus-20261014-ilta2.md (kaikki sen kohdat hoidettu).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit AINA `send_message` session id:llä (osoitekirja
  /Users/Shared/Claude/osoitekirja.md): PT local_74630a27-8c1b-4ac3-9143-538efab8cbcd (≤ 3 riviä), Julkaisija local_22b29f10…
  (KÄÄNNÖS/SIMULAATTORI NYT ennen käännöstä tai simua; ilmoita LUKKO/SIMU VAPAA), NS local_bf20055b…, NUI local_33ba1387…,
  Valoseppä local_fc4fcc54…, Linssiseppä local_45a869de…, Äänittäjä local_846757a4….
- OMISTAJA 15.10. 09.36 (PT:n kautta): "Ei testejä junaan" — kuitatut kytkennät suoraan NS:lle, kun `zsh tyokalut/tarkista.sh` antaa
  "virheitä yhteensä 0"; ei simuvarmistusta, ellei PT erikseen pyydä.
- Simut T7-sarjassa (`source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh`): pelikoodari-iPad13 39644E75-8BDA-4ED8-98B1-3FC864B73697.
  Simulaattorityökalu (mcp iOS Simulator) EI näe Sarja-simuja → oikeita napautuksia ei voi tehdä; testikomennot ohittavat NUI:n napit.
- Ääni pelin omalla raidalla: linssi `kaappaa <s> <nimi>` → Documents/<nimi>.wav. Klipin paikka ja taso tallenteesta:
  `python3 proto-3d/_tyo/pelikoodari/iss-aanet-192/analyysi.py <tallenne.wav> <klippi.mp3>…` (ristikorrelaatio + taso 1 s ikkunoissa).

## Tässä vuorossa valmiit (kaikki NS:llä junan 192 rungossa; runko natiiviseppa/juna-192)
JONO TYHJÄ luovutushetkellä.
- Aloituslennon kameran liukuma (omistaja 23.54): aarteet-193 dee9326b0, PT kuittasi iPad-arkin (ei loittonemista, ei hyppyjä).
  Aarretehtävät Kreeta + 8 pysäkkiä (871bbe266), kultaiset 5d13bb2b9. Runko 708d312c9.
- ISS-äänet: iss-nimet-192 4655355fb (runko 54cb803e8): lähtölaskenta v2 (manifesti v12, iskut 1,00 s), Sojuz-radio
  iss-radio-sojuz-telakointi-alle.mp3 täydellä tasolla (~11 dB kertojan alla, häipyy Cupolassa), kameran kertomus kolmannesta
  loppuvalinnasta (kolmen valinnan kysymys → "Selvä…" → 41 s → kahden valinnan kysymys), ohjauspaneelin ohje, Cupolan nimien
  napautus, pallohaku. Arkki proto-3d/_tyo/pelikoodari/iss-aanet-192/arkki-aanet.png. Testikomento `linssi raketti loppu kamera`.
- SKANNERI LEPOTILASSA: AstronauttiKerros.SkanneriKaytossa = false (napautus ohitetaan); testi `linssi raketti skanneri 1|0`.
  NUI:n yhden kytkimen versio pelikoodari/iss-nimet-192-nui @ 414f68bd5 (ohjaa IssSkanneri.Kaytossa:aan, vaatii natiivi-ui/iss-193
  a37f9534e+) odottaa: käytetään, kun NUI:n skannerihaara tulee junaan. Omistaja halusi nähdä skannerin (PT 09.36).
- Valaan äänet (omistaja 09.09): valas-aanet-192 4bce92624 junassa: pärskähdys pinnan ylityksessä, roiske iskussa
  (RakettiAanet.Valas, PCM, duck-osuus 0,3; Äänittäjän audio/efekti-raketti-valas-{parskahdys,roiske}.mp3 ämpärissä). Ei simua (09.36).
- Lontoon Big Ben (191), Ranskan museo: NS:llä ja kuitattu jo aiemmin.

## Avoimet / seurattavat
- NUI todentaa kameranapin oikean napautuksen yhteiskoosteessa (PT pyysi NUI:lta).
- Linssiseppä tekee Andøyan lokit (linssiseppa/andoya-lokit-192): lisää RakettiAanetiin staattisen DuckNyt-arvon; ei osu valaan koodiin.
- Web PR #4607 (pelikoodari-pysakit-193, npm test 5541/5541) mergetään junan mukana (Julkaisija) → sen jälkeen unbind_pr ja
  `tools/uusi-worktree.sh --poista pelikoodari-pysakit-193`. wt/pelikoodari-paakaupungit-kytkenta: 11ed3001f ei vielä mainissa → jätetty.
- Levy (PT 11.4x): omat .app-kopiot ja videot poistettu (_tyo/pelikoodari 0,46 Gt). Proto-worktreeitä ei ole auki.

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-pelikoodari-luovutus-20261015-paiva.md.
Jono on tyhjä: ilmoita PT:lle (local_74630a27-8c1b-4ac3-9143-538efab8cbcd) yhdellä rivillä 'PK valmis, jono tyhjä' ja odota töitä.
Omistajan linja 09.36: ei testejä junaan, kytkennät NS:lle tarkista.sh 0:lla."
