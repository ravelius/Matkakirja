# Pelikoodari: kuja 02:n vasen muuri (luovutuksen -2245 kohta 2a), 30.10.2026 klo 22.52

**Tulos: ei vikaa junan 216 rungossa (a2d9e0c7b).** Selvitetty koodista, ei Unity-ajoja (PT 22.5x).

- Klo 21.48:n editoriajo (`havainne-editori-20261030-214850`) ajettiin REF:llä 00e19dfb0 (osasarja-v3-koodi).
  Se on ennen commitia e0658fd3c ("osasarjan nippuihin ja osamalleihin materiaalin väri, alfaraja ja kaksipuolisuus").
- Osasarjan `osat.glb`:ssä (v3 ja v5) materiaali **V4_red on `doubleSided: true`**: muurin punainen pinta on yksipuolinen levy, joka luottaa kaksipuoliseen piirtoon.
  Ennen e0658fd3c:tä kokoaja ei kopioinut kaksipuolisuutta nippuihin, joten levyn takapinta karsittiin.
  - Länsimuuri (muuri-lansi-pohj-23, kierto 87,7°) näyttää kujalle takapintansa → punainen puuttui, kivijalka ja pilarit näkyivät.
  - Itämuuri (muuri-lansi-pohj-33, kierto −91,4°) näyttää etupintansa → näkyi.
- Ladonta on sama: muuri-lansi-pohj-23 ja -33 ovat identtiset osasarjoissa v3, v4 ja v5 (seina-2m, samat solmut ja pursotukset).
- Klo 20.59:n ajo (147730811, osasarja-v4, e0658fd3c mukana) näyttää vasemman muurin kokonaisena.
- e0658fd3c on junan 216 rungon a2d9e0c7b esivanhempi (`git merge-base --is-ancestor`).
- Luovutuksen epäillyt (b) pk7-pohja ja (c) frustum/LOD1 eivät ole syy: ne eivät erota itä- ja länsimuuria toisistaan, mutta kaksipuolisuus erottaa.

**Jäljelle jää:** kuvavarmistus `tyokalut/havainne/editori.sh 02 a2d9e0c7b ipad`, kun Unity-ajot taas sallitaan (levy > 95 Gi ja PT:n lupa).
Diagnoositesti `Peli-testit/Testit/ZDiagKuja02.cs` on yhä proto-worktreessä committoimatta.

Kohta 2b (21 puuta kujalla 02): kysytty LAV:lta klo 22.5x, tekeekö LAV vai PK lahipuut-v12-suodatuksen.
