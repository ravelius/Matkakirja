# Lavastajan luovutus 10.11.2026 11.38 (korvaa 08.55; lue kokonaan)

Syy: konteksti pehmeällä rajalla. Agentit vain Opus tai Sonnet. Työkansio /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja, loki muuri/KORJAUS.md (10.11. 10.5x ja 11.3x).
TYÖLISTA ON JONO: T=/Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py; `python3 -I $T seuraava LAV`, `tehty`, `este`, `tilanne "OTSIKKO" "teksti"`.
PIL/numpy: omat skriptit `python3` ilman -I:tä. Mac-ajot vain JU:n vuorolla (JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd); PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, viestit ≤ 3 riviä.
HUOM: /Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu on POISTETTU; aja-*.zsh:t cd:tä nyt /Users/Shared/Claude/wt/proto-lavastaja-esto-kivisivu (oma, puhdas).

## Tehty tällä vuorolla
- RAJA3 (jono jarj 4) MITATTU: VALO, ei väri. Kamera näkee sokkelin itäpinnan; tumma kivi = pitkän ohuen kolmion kärki (UV1 < 3 px), jonka tekselit ovat leivonnan
  reunatäyttöä (riippuu leivontakerrasta). Korjaus ilman leivontaa: muuri/lattia-uusi/raja3/reunatekselit.py (reunatekselit saman tason sisätekseleistä).
  Koejuuri katot-v125/koejuuri-raja3a = koejuuri-piikki1 (v130) + reunatekselit 20 lod0-palaan (aja-reunat.log, valmis 11.09). Mitattu 3-2: kärki 0,25-0,49 (perus 0,25-0,45),
  yksi kohta z 53,5 alin yhä 0,02. Muutos laaja (75-155 t reunatekseliä/pala) -> katso pari koko 40 kameralta uusien vikojen varalta.
  Kuvat: zsh muuri/lattia-uusi/raja3/aja-raja3a.zsh 1 b804a87d6 -> kuvat-raja3a-uusi (JU:n jonossa; 1. yritys 11.09 kaatui poistettuun wt:hen, korjattu).
- PÄÄTYKOLMIO (jono jarj 5, PT 11.5x: oma koejuuri): syy päätyseinän vino yläreuna -> rako päädyn alla. tee_paaty1.py: seinän yläkärjet päädyn alareunan päihin (lod0, lod1).
  Koejuuri koejuuri-paaty1 = koejuuri-piikki1 + korjaus (vain kk-tausta-1-3). Säteet: rako umpeen. Kuvat: zsh muuri/paaty1/aja-paaty1.zsh 1 b804a87d6
  (perus koejuuri-piikki1 | uusi koejuuri-paaty1, 7 kameraa, uusi paaty-maasta) JU:n jonossa.
- Hylätty: raja3/maanalainen_valo.py (maanalaiset tekselit ylhäältä) ei vaikuttanut kärkeen.

## Seuraava
1. JU:n valmis-rivit -> parit samasta rajauksesta täysikoossa PT:lle:
   raja3a: perus kuvat-lattia1-perus | l7 kuvat-lattia7-uusi | kuvat-raja3a-uusi (raja3 rajaus 1700 500 2752 2064, kuten parit9.py) + kaikki 40 kameraa uusien vikojen varalta
   (myös avoimet-l7: loota2/valo2 kivirivi, oja4 kaista, valo1 juova, t-LK kehys: korjasiko reunatäyttö ne?).
   paaty1: kuvat-paaty1-perus | -uusi (piikki1-a + paaty-maasta).
2. Raja3/päätyrivit `tehty` vasta PT:n kuittauksella. Ei vientiä, ei junaa ilman PT:tä.
3. "Juoksupeli: tason 1 kulkualue" odottaa lukittua juurta.
