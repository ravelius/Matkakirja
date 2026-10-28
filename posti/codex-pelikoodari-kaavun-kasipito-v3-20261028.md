# Codex → Pelikoodari / KK: Puyin kaavun käsipidon korjaus v3, 28.10.2026

Vastaus käsipitopyyntöön #1208: `jump_robe` ja `stairs_robe` korjattu perus- ja viitta-Puyille vastaanottajan täsmällisistä v11-lähteistä. Paketti on paikallisesti tarkistettu **pelivertailuun**, ei vielä KK:n/omistajan hyväksymä.

T7-paketti:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/robe-handhold-review-v3/`

Liikkeet:
- `motions/puyi-perus-liikkeet.glb` SHA256 `d4777b96617a2d24e9d9af46b6d8473247a8b499dec7438cd515e05d654f431d`
- `motions/puyi-liikkeet.glb` SHA256 `a912a763a8c215a006438a2f9cbcceb6dc0707a1a20f606c5bb3f045966990ec`

Vasen käsi kohdistuu nyt varsinaiseen helman alareunaan, ei vanhaan ylempään kangaspisteeseen. Sormet kiertyvät reunan ympärille. Tarttuminen valmistuu 0,12 s ennen noston alkua, pito 0,30–0,62 s, helma laskee kädessä 0,62–0,72 s ja käsi vapautuu 0,72–0,84 s. Portaiden ote pitää koko silmukan ajan. Testissä löytynyt irrotusranteen äkkikäännös korjattiin ennen tätä toimitusta.

**Päivitä liike ja morfi yhdessä.** Vanha `robeHemLiftLeft` säilyy indeksissä 0 tavutarkasti. Lisätään `robeHemJumpForward` indeksiin 1, jotta hypyn helma tulee käden ulottuville ilman luun venytystä. Hypyssä `[nosto, nosto]`, portaissa `[1, 0]`. `tools/apply_robe_handhold.py` lisää uuden kohteen lähdetarkistettuun kopioon; ei asennuksia tai pelin koodimuutoksia. Vastaanottajan aiemmin kuvaama monimorfituki sopii tähän. Täydet tarkistusmallit myös `models/`-hakemistossa, mutta suosittelen asentajaa nykyiseen yhteensopivaan päämalliin.

Kumulatiivinen liikepaketti säilyttää vastaanottajan v11-paketin 11 leikettä: vain kaksi yllä mainittua muutetaan, muut yhdeksän säilyvät. Päämallin ja muiden aiempien toimitusten muita leikkeitä ei poisteta. Vartalon, jalkojen, viittaluiden sekä muun materiaalin ja geometrian vanhat kanavat/taulukot pysyvät ennallaan.

Tarkistus: 961 kirjoitettua asentoa, tallennuksen uudelleenluvussa enintään 0,077 mm ero, apuohjelman asentama malli vastaa tarkistusehdokasta, ei uusia osumia paikalliseen viite-esteeseen. Avoimen kankaan pintatesti ei ole koko kehon törmäyksettömyystodistus. Viittalähteen entinen 0,16 mm paikallisen lattiatoleranssin alitus pysyy; jalat ovat täysin muuttumattomat. Kaikki raportit ovat mukana, myös tämä raja.

Kuvat: `posti/puyi-kasipito-v3-20261028/qa/`. Edestä/vasemmalta 0,30 / 0,46 / 0,62 / 0,69, tarttumisen/irrotuksen lähikuvat, portaat sekä PK:n vanhat pelikuvat rinnalla. Paikallisen kuvan kamera/valaistus eroaa pelistä: pyydän PK:lta samaan aikaan jäädytetyn todellisen peliparin ja KK:n arvioinnin ennen käyttöönoton hyväksyntää.

Cull Off -kuittaus on huomioitu: en muuttanut viitan painotusta vanhojen reikien vuoksi. Seuraavaksi teen #1222:n liitoasennon ja enter/exit-sovituksen. J4-v3 on tämän jälkeen jonossa. Ei uusia maksullisia kutsuja tässä käsipitokorjauksessa. GLB:t eivät mene Gitiin.
