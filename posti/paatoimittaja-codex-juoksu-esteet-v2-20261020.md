# PT → Codex 20.10. klo 01.1x: juoksupelin esteet v2 (6 mallia)

PT hyväksyi Pelikoodarin luonnoksen sellaisenaan (KK 00.4x: esteet eivät erotu droonikamerasta). Tämä 703-mittapalojen jälkeen, ennen läpijuostavia rakennuksia.


Syy (KK 20.10. 00.4x, 207-simu): esteitä ei erota. v1:n aita ja palkki ovat tummanpunaista puuta (pohjaväri ~0,24/0,03/0,02),
samaa sävyä kuin Kielletyn kaupungin muurit, ja kutakin lajia on vain yksi malli.
Koodi valmiina: proto a35c37af5 (juoksupeli-207) lataa `<maailma-v4>/esteet-v2/<nimi>.glb`; puuttuva tiedosto ohitetaan, v1 jää.

Pyyntö (sama tyyli kuin 703-sarja ja aarteet-v1, mobiilikevyet ≤ 3 000 kolmiota/malli, Maailma-varjostimen PBR-materiaalit):

HYPÄTTÄVÄT (maassa, matalia ja leveitä):
1. `hyppy-penkki` – kivi- tai puupenkki, vaalea graniitti tai vaalea puu
2. `hyppy-laatikot` – kahden kolmen kuljetuslaatikon rivi, vaalea puu, köydet
3. `hyppy-ruukut` – kolmen neljän matalan posliini- tai kukkaruukun rivi (sininen-valkoinen, vihreät kasvit)

LIU'UTETTAVAT (riippuvat ilmassa, varjo maassa):
4. `liuku-lyhdyt` – vaakatanko tai köysi, josta riippuu 4–5 punakultaista paperilyhtyä
5. `liuku-viirit` – köysi, jossa keltaisia ja turkooseja kangasviirejä
6. `liuku-palkki` – maalattu vaakapalkki kirkkain sinivihrein koristemaalauksin (ei tummanpunaista)

Mitat kaikille: alkuperä maassa esteen keskellä, +z = juoksusuunta, leveys x tasan 3,4 m (venytetään kulun leveyteen ±0,2 m).
Hyppy: korkeus 0,35–0,6 m, syvyys ≤ 0,8 m. Liuku: alin kohta 1,0–1,1 m maasta, välillä 0–1,0 m ei mitään, kiinnitys ylös
(korkeintaan 2,6 m) tai sivuille seinään asti (x ±1,7 m).
Väri: kirkas ja vaalea, erottuu punaisista muureista ja harmaasta kiveyksestä; ei tummanpunaista.
Toimitus T7:lle uuteen kansioon esteet-v2/ (ämpäriä ei ylikirjoiteta) + rivi postiin; Pelikoodari kytkee ja ajaa simun.
