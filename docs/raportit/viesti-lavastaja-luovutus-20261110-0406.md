# Lavastajan luovutus 10.11.2026 04.06 (korvaa 01.30; lue kokonaan)

Syy: konteksti pehmeällä rajalla. Agentit vain Opus tai Sonnet. Työkansio /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja, loki muuri/KORJAUS.md (10.11. 01.38–03.58).

## Tehty tässä vuorossa
- Ovet rakennukset-v127: pari katsottu, PT kuittasi 02.3x, PK:lle "kielletty-rakennukset-v127 ämpärissä" lähetetty. VALMIS.
- Uusi lattia (muuri/lattia-uusi/): lattia2 -> lattia3 -> lattia4 leivottu ja kuvattu (JU, runko b804a87d6). Parit parit2/ parit3/ parit4/ (parit2.py..parit4.py, vasen = kuvat-lattia1-perus).
  - lattia3 (tee_lattia3.py): UV0-luokat YHTEISELLÄ kolmioinnilla (luokkarajat solmittu, polygonize) -> lattia2:n terävät kolmiovalot (laatta1) POISSA.
  - lattia4 (tee_lattia4.py, koejuuri-lattia4, leivottu4/, kuvat-lattia4-uusi): = lattia3 + alaspäin katsovat sokkelipohjat y -0,01:een (ei poistoa). PARAS TOISTAISEKSI:
    raja3-hampaat, rako0-raita, raja1-katkoviiva, kolmiovalot poissa; 404 sama 4. raja4 lattia tummempi = uudelleenleivonta (jo lattia1), seinä vaaleampi, ei lattian vika.
  - lattia5-kokeet (tee_lattia5.py, LAT_SIMP / LAT_RUUTU) HYLÄTTY (neulat 1878 + T-liitokset 166; ruutu 2 m = 439 487 kolmiota). Ei leivottu. koejuuri-lattia5 on kuivan ajon kopio, käyttämätön.

## AVOIN: v-LP-materiaalin kiila (PT 03.5x: "B – etsi rako ja leivo lattia5", omistajalle ei tunnettua vikaa; pari PT:lle sama rajaus + v-LP täysikoossa)
- Kamera v-LP-materiaali: tarkastelu -245.3 1.7 382.4 180 14 70 (sk-lattia4-uusi.txt). Kuvassa varjon sisällä kapea vaalea kiila (rajaus x 1100-2400, y 1000-2064).
- Valokartta ylhäältä (työkalut alla): valkoinen kapea raita näkyy lattian valokartassa jo lattia1:ssä (leivottu/) ja lattia4:ssä (leivottu4/) samoin; se on ISON UV1-saaren sisällä
  (ei neula- tai pienisaarivika). Lattia1:ssä sokkelipohjat y0 peittivät sen. Arvioitu paikka x -267..-258, z 383..386 (glb-koordinaatit, kartan rivit z kasvaa alas) – EPÄVARMA.
- Säteet kohti aurinkoa (AZ 39,97°, EL 45°; glb-suunta (sin AZ cos EL, sin EL, cos AZ cos EL)) vain tausta-paloja 0-2..1-4 + muurikate + osasarja vastaan: arviopaikka on näillä VALAISTU
  -> varjo tulee todennäköisesti rakennuksista/avoimista (rakennukset.json, avoimet-sijoitus.json), joita säde-skripti ei vielä lataa. Seuraava: lisää ne, vertaa leivottu4-valokarttaan
  (sama alue), löydä varjostajan rako; korjaa (tulppa tai sauma) koejuureen, leivo lattia5 (leivo-lattia4.zsh:n kopio) + kuvat JU:n vuorolla.
- Apuskriptit (kopioi scratchpadista työkansioon ennen käyttöä, scratchpad häviää): lmkartta.py (lattian valokartta ylhäältä, punaiset kolmioreunat), sade.py (varjosäteet, 7 min),
  saaret.py (UV1-saaret), neulat.py, kiila.py, tl.py (T-liitokset). Kopiot: muuri/lattia-uusi/apu-20261110/.

## Sitten
Pari PT:lle (3 riviä) -> PT -> KK Kelpaa-kortti. Hyväksynnän jälkeen SUUNNITELMA.md vaiheet 5–6: vienti kielletty-tausta-v130 (+ esto PK:lla), PK:lle kansionimet.

## Voimassa
Asemataulu jäädytetty. Ei vientiä ilman PT:tä. Blender ja Mac vain JU:n vuorolla (JU local_2a7d6c96).
