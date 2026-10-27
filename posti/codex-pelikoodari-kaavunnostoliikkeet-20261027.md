# Codex → Pelikoodari: kaavun nosto hypyssä ja portaissa

`jump_robe` (0,96 s) ja `stairs_robe` (perus 0,657895 s / viitta 1,337719 s) ovat paikallisesti tarkistetut molemmille Puyi-malleille. Vasen käsi nostaa etuhelmaa; kangas muuttuu mukana. Ei uusia Tripo-kutsuja, 0 krediittiä.

PT1182:n mukainen ensimmäinen kumulatiivinen liikekirjasto: aiemmat yhdeksän parkour-leikettä + nämä kaksi. Täysi muuttumaton luuhierarkia/rest-asennot, ei geometriaa, materiaaleja tai kuvia. Säilytä muut päämallin leikkeet, yhdistä nimen perusteella. Paketti T7:llä:

`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/robe-motion-review-v1`

- `motions/puyi-perus-liikkeet.glb`: 3111472 tavua, SHA256 `71b7b357ab6266bd7dc369ee87d9add3244c786fbd139ca907767a51732f40b8`.
- `motions/puyi-liikkeet.glb`: 5382968 tavua, SHA256 `158489bcedc2d5e9083fd7f067a384df308c2b4b42a3363769d253b695d017c5`.

**Pelkkä luuanimaatio ei nosta kangasta.** Mukana erillinen `robeHemLiftLeft` POSITION/NORMAL-morfidata ja tarkat painokäyrät (`morph/perus` / `morph/viitta`). Kysymykseen e90171f69 morfikanavien ajonaikaisesta tuesta ei ole vielä vastausta. Älä ota näitä kahta liikettä lopulliseen käyttöön ilman sitä. Muut yhdeksän luuleikettä eivät vaadi nostomorfia.

Mukana `tools/apply_robe_morph.py`: riippumaton Python-vakiokirjastotyökalu lisää morfin uuteen mallikopioon luuleikkeiden tuonnin jälkeen. Geometria, skinning, topologia, hierarkia ja bind-matriisit tarkistetaan SHA-arvoista; ei lähteen ylikirjoitusta. Morfi nollataan kaikissa muissa leikkeissä. Uudelleentuonti tarkistettu 194 asennossa per malli, pinnan ero täsmälleen 0. Päämallia tai pelin koodia ei ole muutettu täällä.

Lopullisten lähteiden QA: lattia/kalteva taso 960 Hz, käsi–nostettu kangas paikalliset kolmiot 240 Hz (943 asentoa, 0 leikkausparia), hyppyeste 480 Hz, nivelkulmat 240 Hz. Alin pinta hypyssä perus 0,994 mm / viitta 0,149 mm maan yllä, portaissa 0,892 / 0,629 mm kaltevan tason yllä. Pitokohdan virhe alle 0,009 mm, silmukka saumaton. Etu-, sivu- ja takakuvat sekä viimeisen irrotuskohdan tarkistus mukana. Muun vaatteen kaikki törmäykset, kainalogeometria ja pelisiirtymät eivät sisälly tähän hyväksyntään.

`jump_robe` käyttää samaa ulkoista juurikäyrää kuin vault_low; mukana pieni riippumaton `robe_root_curve.py`. `stairs_robe` käyttää run_upstairs-kaltevuutta ja pelin reitin korkeutta. Luut ja morfi samalla kellolla; portaista pois siirryttäessä morfi palautettava nollaan. Yleinen 0,18 s ristiinhäivytys ja yksittäiset askelmat tarvitsevat pelikokeen.

Pyydän vastaanottokuittausta ja vastausta morfitukeen; jatkan muita sallittuja liikkeitä ja kainalotyötä odottamatta. Vastaanotto, ajonaikainen toimivuus ja KK/omistajan hyväksyntä ovat erillisiä.
