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

## Lisäys 11.4x (JU luovutuksen jälkeen)
- RAJA3A AJETTU 11.22 (JU): kuvat muuri/lattia-uusi/raja3/kuvat-raja3a-uusi (40 png). 404: 12 (lattia7: 4). Samat 4 + 8 uutta, kaikki media:-polkuja
  (hahmot-v6 eunukki/puyi/vartija, esteet kaaro-v2 kaaretaulut, ovi-v1 ovi-lehti-vasen): ajon runko/media, EI koejuuren tiedostoja -> ei vaikuta taustaan;
  mainitse PT:lle parin yhteydessä (eri worktree proto-lavastaja-esto-kivisivu). Parit katsomatta -> Seuraava 1 alkaa näistä.
- PAATY1 alkoi Macilla L1 11.38 (JU), PAATY1 AJETTU -rivi JU:lta tulossa.
- 11.5x LAV: PAATY1 katsottu (PT ok): kolmio pois, jäi kultalevy (kk-tausta-1-3 lod0 V4_gold 13 kolm., y 4,5, seinän edessä). paaty1b = koejuuri-paaty1b (tee_paaty1b.py),
  ajo zsh muuri/paaty1/aja-paaty1b.zsh 1 b804a87d6 JU:n Mac-jonossa -> kuvat-paaty1b; vertailu kuvat-paaty1-uusi (paaty-maasta, piikki-etela). Pari PT:lle.
- 12.0x PT: RAJA3A kelpaa. Kun paaty1b kelpaa: YKSI paketti v130:n päälle (raja3a + paaty1b): PK polut/viittaukset, SHA256SUMS, iso iPad JU:lla -> PT -> vienti/MR. Ei vientiä ennen PT:n sanaa.
- 11.57 LAV: yhdistelmä valmiina katot-v125/koejuuri-raja3a-paaty1b = koejuuri-raja3a + paaty1b:n kk-tausta-1-3 lod0/lod1, reunatekselit ajettu uudelleen 1-3-lod0:aan; mitattu: levy poissa, seinäkärjet kuten paaty1.
- 12.03 LAV: PT 12.0x paaty1b kelpaa + SANA paketti. TAUSTA-V131 = _valmiit/juoksupeli-kk-lavastaja-tausta-v131-vienti-20261110 (muuri/v131/paketoi.zsh), SHA256SUMS 59864a0a1029, 100 tiedostoa, 316M. PK:lle pyyntö polut/TaustaKansio + iPad-runko JU:lle. Seuraavaksi: iso iPad JU -> PT -> vienti. Ei vientiä ilman PT:tä. Välikopiot jätetty (levy 29 Gi, PT: ei ylimääräisiä kopioita).
- 12.0x PK: v131 vahvistettu, sha 8d22f34e4 (natiivi-backup pelikoodari/tausta-v131-224), TaustaKansio kielletty-tausta-v131, paketti-v5 SHA256SUMS 510da66d5069; iPad-runko JU:lle. Välikopiot paaty1/paaty1b/raja3a NAS:lle (Matkakirja-arkisto/lavastaja/katot-v125, diff ok), paikalliset pois; koejuuri-raja3a-paaty1b jää v131-vientiin asti. Seuraavaksi: JU:n iso iPad -tulos -> PT.
