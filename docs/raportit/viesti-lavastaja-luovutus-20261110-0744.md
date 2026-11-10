# Lavastajan luovutus 10.11.2026 07.44 (korvaa 06.16; lue kokonaan)

Syy: konteksti pehmeällä rajalla (25 %). Agentit vain Opus tai Sonnet. Työkansio /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja, loki muuri/KORJAUS.md (10.11. 06.2x–07.3x).
TYÖLISTA ON JONO (omistaja 07.40): T=/Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py; `python3 -I $T seuraava LAV`, `tehty`, `este`.

## Tehty
- PIIKKI KORJATTU ja katsottu (muuri/piikki/: tee_piikki1.py, vara.py, vertaa.py; koejuuri katot-v125/koejuuri-piikki1):
  syy = hallin (kk-tausta-1-3) päätykolmiot nousivat kaarevan katon läpi 0,3 m (lod0), 0,15–0,2 (lod1). Päätykolmio -> viuhka katto - 0,06 alle (UV1 barysentrisesti), seinäkulmat katto - 0,06.
  Pari JU 06.27: kaista + kolmiosiivu POISSA (piikki/parit/piikki1-a-rajaus.png), PT:lle lähetetty 06.28.
- RAJA3 sokkeli (PT 06.2x): alin kivi tumma = UUSI vika (lattia1:stä asti).
  - lattia8 (lattia-uusi/tee_lattia8.py, koejuuri-lattia8b, sis. piikki1): maanalaiset seinäkolmiot leikattu y -0,005:een. JU 07.23 kuvat: EI riittänyt (parit8/raja3-perus-l7-l8.png).
  - Tarkka syy (apu-20261110/uv1raja3.py): sokkelin nelikulmion kolmiot ERI UV1-saaria (kärjet eivät yhteisiä), tekseli 0,69 m -> alempi kapea kolmio yksi tumma valo.
  - lattia9 (tee_lattia9.py, koejuuri-lattia9 = lattia8b + kärkien hitsaus: sijainti 1 mm, normaali 0,01, UV0 0,002 ahne; ajettu 2 kertaa, ks. tee_lattia9b.log): raja3-kolmiot jakavat kärjet.
- Ovet: kujaporttien kynnykset mitattu (ovet9/kynnykset.py): kaikki y 0, lattia y 0, ei vikaa. PT perui kuvat (ovet9/PERUTTU.txt).
- koejuuri-lattia8 (ensimmäinen ajo) ei käytössä.

## Seuraava
0. JU ajaa leivo-lattia9.zsh + aja-lattia9.zsh 1 b804a87d6 (pyydetty 07.26). Kun valmis-rivi tulee: `python3 parit8.py`-mallilla parit9 (kuvat-lattia9-uusi vs kuvat-lattia7-uusi ja perus), katso kaikki 40 (reiät/uudet viat hitsauksesta),
   raja3-pari (perus | l7 | l9, sama rajaus: rivi4.py-tyyli 1700 500 2752 2064) PT:lle. Sitten AVOIMET-s4e.md (muuri/palkki/) kohdat 6 (ovi: sininen pala) ja 13 (ovi: katkoviiva) VAIN jos näkyvät lattia9:n ovi-kuvassa.
   Työlistassa "Juoksupeli: uusi yhtenäinen lattia" = este (odottaa JU:ta); kun kuvat hyvät -> `tehty`.
1. Lattian Kelpaa (KK) -> SUUNNITELMA.md vaiheet 5–6: vienti kielletty-tausta-v130 nyt lattia9:stä (sis. piikki1 ja maanalaiset), + esto PK:lla. Ei vientiä ilman PT:tä.
2. Työlistan NYT: "Muurin juuri koeversioon, avoimet viat" (aloita kun lattia odottaa), sitten "Juoksupeli: tason 1 kulkualue".

## Voimassa
Asemataulu jäädytetty (työlista toimii tyolista.py:llä). Blender ja Mac vain JU:n vuorolla (JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd). PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, viestit ≤ 3 riviä.
