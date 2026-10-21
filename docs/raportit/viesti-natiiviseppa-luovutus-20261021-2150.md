# Natiivisepän luovutus 21.10.2026 klo 21.50 (TF 209 perillä; juna 210 avaamatta)

Vain voimassa oleva tila. Historia: proto-3d/tyokalut/natiiviseppa-skriptit/juna209/jono-209.txt (loppu = uusin).
Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt. Id:t AINA osoitekirjasta (/Users/Shared/Claude/osoitekirja.md).

## TILA
- **BUILD 209 = proto master e51c33e0f** (juna/b37 = runko 5093a3bc8, puu identtinen). TF iOS 39652446915 (sisäinen + ulkoinen 21.47,
  beta APPROVED) + Mac 39653083987 (success 21.38). Muutosloki main 9e83d913d (#5146). Muistiajo OK 3328 / 1791 Mt / 0 var.
  (julkaisija-tyokalut/muistiajo-209.txt). Tunnetut poikkeamat (PT): lokit/ennen-junaa-20261021-195040/JUNATARKISTUS.md
  (saapumislennon pitkät ruudut, juoksupelin käännösnykäykset 9/9, kamerahypyt 2/2, piilossa 6/13 → korjaukset junaan 210).
- iPad Pro 13: 5093a3bc8 (= BUILD 209) asennettuna. Omistaja matkalla ma 26.10. asti; iPad testikäytössä, ennen maanantaita TF-versio.
  AINA kysy LT:ltä VAPAA ennen iPadia.

## JUNA 210 (avaamatta; PT:n kuittaus ennen kokoamista)
- Pohja master e51c33e0f → uusi haara natiiviseppa/juna-210 (skriptit juna209/* kovakoodaavat 209:n ja peilin juna-209 → kopioi juna210/).
- Jonossa: PK a9c5520d8 (EI 66533c06e yksinään; a9c5520d8 perii sen ja korjaa), VS linssiseppa2/rijks-paivanvalo-210 b6fdf796d
  (sis. Lavastajan 5a3aff69d + LS c2e3aef04; media amsterdam-ihmiset-v1 ämpärissä), NUI natiivi-ui/ui-periaatteet-210 6f8455f1a
  (UI-periaatteet P2 P3 P7 P8 P10, PT kuittasi). Korjattavat: tunnetut poikkeamat yllä.
- Omistaja 21.53: tämän tilin viikko ≤ 80 % → juna 210 avataan pe aamuna toisella tilillä.
- NS oma 210-työ: kartan saapumislennon ruutukohtaiset syymerkinnät (PT hyväksyi) – ~10 järjestelmän työ osuu samoihin ruutuihin.

## OPIT 21.10.
- Tapetun laitekäännöksen lukko jäi (20 min seisokki) → scratchpad pysayta209.sh poistaa nyt kuolleen natiiviseppa-lukon.
- Älä aja testejä rinnakkain saman sha:n kierroksen kanssa: loki ylikirjoittui → ketju luki tyhjää → PUNAINEN.
- Nykäysvahti laski aloitusverhon alla (1105 ms) → korjattu 3698ec71e.
- Kierros kerrallaan: PK:n kärjet vaihtuivat 2–3 kertaa kierroksen aikana; käännä uusi vain, jos muutos koskee mitattavaa.
