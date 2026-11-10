# Lavastajan luovutus 10.11.2026 08.55 (korvaa 07.44; lue kokonaan)

Syy: konteksti pehmeällä rajalla (kuvat). Agentit vain Opus tai Sonnet. Työkansio /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja, loki muuri/KORJAUS.md (10.11. 08.3x ja 08.4x).
TYÖLISTA ON JONO: T=/Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py; `python3 -I $T seuraava LAV`, `tehty`, `este`, `tilanne`.
PIL/numpy: omat skriptit `python3` ilman -I:tä (numpy ei löydy -I:llä).

## Tehty
- LATTIA9 HYLÄTTY (JU 08.24, parit9/ = perus | l7 | l9, parit9.py): raja3 alin sokkelikivi yhä tumma; hitsaus toi uuden valovian (ovi: vaalea vino kolmio punaisessa seinässä, laatta1: sokkelin kolmiot). PT samaa mieltä.
- PT 08.5x: LATTIA7 + PIIKKI1 KK:lle Kelpaa-aineistona: muuri/lattia-uusi/kk-lattia7/ (kk-lattia7.py; 01 raja3-rajaus TUNNETTU VIKA, 02-15 perus|l7, 02a-02c UUDET VIAT s4e|perus|l7, 20-21 piikki1, LUEMINUT.txt).
  PT välittää KK:lle (roolit eivät viesti KK:lle suoraan).
- AVOIMET-s4e 1-20 lattia7:ssä (agentti; rajaukset muuri/lattia-uusi/avoimet-l7/, s4e|perus|l7): 8 poissa, 1 parempi (12), 1 huonompi (3 t-LK kehys), 10 yhä, 3 UUTTA:
  loota2/valo2 sokkelin kivirivi kokonaan tumma (r-loota2-tk.png, itse katsottu), oja4 ruskea kaista + vaalea pisteviivakolmio (r-oja4-tk.png, itse katsottu), valo1 beige juova (r-valo1-reuna.png).
  Klo 06.2x "ei uusia vikoja" pienistä arkeista oli väärin: katso aina täysikoossa.
- Jonoon: "Raja3: tumma alin sokkelikivi, syy" (jarj 4, sis. 3 uuden vian syyt), "Hallin päätykolmio räystään alla (kk-tausta-1-3)" (jarj 5, PT 09.0x; tiedossa: eteläpääty V4_red 453).
- "Juoksupeli: uusi yhtenäinen lattia" = este (odottaa KK:n Kelpaa-korttia lattia7:lle).

## Seuraava
0. KK Kelpaa lattia7 -> SUUNNITELMA.md vaiheet 5-6: vienti kielletty-tausta-v130 koejuuri-PIIKKI1:stä (= lattia7 + piikki1; EI lattia8/8b/9), esto PK:lla, ei vientiä ilman PT:tä. Sitten lattiarivi `tehty`.
1. Jonon raja3-rivi: syyt (raja3 tumma kivi, loota2 tumma kivirivi, oja4 kaista, valo1 juova). Työkalut: lattia-uusi/apu-20261110/kamera2-l8.py (pikselisäteet; vaihda K koejuuri-piikki1:een),
   uv1raja3.py (UV1-saaret). Mitattu: raja3:n kaksi kolmiota eri UV1-saaria; hitsaus (l9) ei auttanut -> syy todennäköisesti leivonnan valo (suljettu lattia varjostaa) eikä UV1. Vertaa valokartan arvoja l7 vs perus samassa tekselissä.
2. "Juoksupeli: tason 1 kulkualue" odottaa lukittua juurta (v130).

## Voimassa
Asemataulu jäädytetty. Blender ja Mac vain JU:n vuorolla (JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd). PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, viestit ≤ 3 riviä.

## Lisäys 08.5x (PT luovutuksen jälkeen)
OMISTAJA 08.52 KELPAA lattia7 (KK). PT teki vaiheen 5 paketin: _valmiit/juoksupeli-kk-lavastaja-tausta-v130-vienti-20261110 (koejuuri-piikki1, SHA256SUMS bf1a07f51742, muuri/lattia-uusi/v130/paketoi.zsh, KORJAUS 08.53).
PK tarkistaa eston, vienti JU:lla PT:n kuittauksella. Seuraava 0 hoidettu PT:llä: lattiarivi `tehty` vasta kun v130 viety. ALOITA kohdasta 1 (raja3-rivi) heti (PT).
PT 09.0x: omistaja 08.53 "Pysyy": v130 etenee 3 uudesta viasta huolimatta; EI muutoksia v130-pakettiin. Raja3-riviin lisätty myös t-LK:n L-viivan kehys.
