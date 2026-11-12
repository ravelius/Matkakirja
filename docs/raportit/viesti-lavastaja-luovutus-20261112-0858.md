# Lavastaja: luovutus 12.11.2026 klo 08.58 (konteksti pehmeä raja)

Edellinen: viesti-lavastaja-luovutus-20261111-2148.md (871a20912, haara lavastaja/luovutus-20261111-2148) – sen "PALA 3.1b" -osa yhä taustaksi.
Id:t: KK local_d5f31591, PT local_8d8ebf72, NS local_0f7f169f, JU local_2a7d6c96, PK local_d3bb1f78, Postivahti local_1f31f830.
W = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/leivonta-v5-tyo, A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/a2-nyt.

## KÄRKI NYT: A-KOHTIEN ERÄ (KK:N PÄÄTÖS 08.49, ennen pala 3:n B-koeparia; omistaja 10.11. 17.30 rakenteet ennen varjoja)
- Vertailu tehty: A/arkki-224-1..4.jpg (vas. PK:n m1-varmistus, oik. nykypeli juna-224 67092d8d5, tausta-v133c), A/TULOS.txt. 11 + a22 suljettu.
  (A/kuvat = virheajo bcf32314c, se lataa tausta-v132 → ei käytetä.)
- SYYT mika-ajosta (JU 08.54, A/kuvat-mika/unity.log): LUE A/SYYT-mika.txt. Lyhyesti: (1) valkoinen viiva a13/a21/a35 = reunakiven etupinta alkaa
  y 0,05–0,16 (kk-tausta-3-4) → raosta näkyy maataso y −4,5; (2) a34 = kk-tausta-3-3 jättikolmiot (z −15…563) + kalteva lattia y 0,38–0,52;
  (3) a41 = 2-2 seinän pääty V4_red / ikkunalauta y 1,52 ulkonee x 122,3:een (tarkista kumpi on punainen siiveke); (4) a20 = 1-3 lattiapala koholla
  6–13 cm + REIKÄ lattiassa → mukaan erään (pala 3.3 ei rakenna lattiaverkkoa uudelleen); a22 vino sauma = UV0-kuvio → korvautuu lattiatyössä.
  Syyt lähetetty KK:lle 08.57.
- TEE: korjaukset v133c-pohjaan (lähde _valmiit/juoksupeli-kk-lavastaja-tausta-v133c-vienti-20261111/…/kielletty-tausta-v133c; HUOM v5:n
  W/kielletty-tausta-v134 on leivottu v133c:stä → sama korjaus myös v134:ään tai v5:n paketin jälkeen) → uusi tausta (v133d) → Mac-parit
  SAMOILLA kameroilla täysikokoisina (a13, a21, a35, a34, a41, a20; kamerat A/sk-a2-nyt.txt, ajo JU:lla: sha 67092d8d5 + `palatsi korvaa`
  tai `palatsi mallit file://…`) → KK:lle → junasana. Työkalut: scratchpadin lahella.py-tyyppinen haku (kolmiot (x,z):n lähellä) kannattaa
  kirjoittaa A/-kansioon. Mika-skenaarion malli A/sk-mika.txt.

## LEIVONTA V5 (PYSÄYTETTY 11.11. 21.55, PT/KK: täysi leivonta vain yöllä ja vasta KK:n sanalla pala 3:n parin jälkeen)
- Osasarjasta 10 ruutua valmiina; jatko: nohup zsh leivonta-216/uusinta/leivonta-v5.zsh >> ajo-leivonta-v5.log (JATKA ohittaa valmiit).
  Sali: pieni koe OK 21.53 (avoin_uv2.py korjattu: tyhjät primitiivit ohitetaan; kuva W/sali-koe/sali-koe-dekoodattu-1000.png), W/SALI-KOE-OK annettu
  → v5 leipoo salin ja paketin itse. LAHTEET-leivonta-v5.md kirjoitettu (leivonta-216/uusinta/).
- kk-tausta-1-2 lod0 korjattu 21.52: v97/v98 (Longzongmenin päätyseinät y ≥ 4 kattoon + kansi) puuttuivat → paadyt_kattoon.py + kansi.py
  (katto 1040 kolmiota, v133c 1041); tausta-1-2.zsh päivitetty; alkuperäinen W/t12/paadyt/alkup-ilman-paatyja.glb.
- Levy: muuri/ ja katot-v125/ siirretty NAS:lle (JU, linkit takaisin). W pidetään paikallaan.

## PALA 3.1b (B-koepari)
- NS:n pari-b (03.28, proto-3d/lokit/natiiviseppa-juoksu-pala3-pari-b) EI mittaa lattiaa: pelaajan alla osuma "osasarja kauko0 -3,-4".
  Osasarjan atlas on jo 3–9 cm (valo.json 11,5–32 px/m). NS tarkistaa pelistä, piirtyykö kohdassa −136 336 lähitaso/atlas vai kauko0
  (kärkivärit) ja latautuvatko r_*.png → sen jälkeen tiedetään, onko vika pelissä vai leivonnassa. Ei uutta koeleivontaa ennen sitä.
