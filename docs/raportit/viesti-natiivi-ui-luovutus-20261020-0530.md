# Natiivi-UI: luovutus 20.10.2026 klo 05.30

Korvaa -20261020-0350:n (sen "Opit" yhä voimassa). Id:t /Users/Shared/Claude/osoitekirja.md. Simu VAIN JU:n SIMU NYT -viestistä; lopuksi SIMU VAPAA JU:lle.
Ajoskriptit: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ (ajo-museo-inappi-207.zsh, ajo-museo-iss-207.zsh, sk-museo-inappi-207{,b}.txt).

## ENSIN
1. **SIMU NYT JU:lta (~05.50, ~15 min) yhd-207f-app:lla** (natiivi-ui/yhd-207f 3d677166c, käännöspyyntö JU:lle 05.27):
   `zsh /private/tmp/…/scratchpad/vuoro3.zsh` TAI käsin:
   a) `VAIHEET=jalkeen SK=sk-museo-inappi-207b.txt ERA=b zsh …/ajo-museo-inappi-207.zsh` (i-nappi Kallioluolan madonnalla, nimi näkyy:
      keskelle + 2 reunaa → "kohdat päällä (i-nappi)", ei "otsikko painettu"; lopuksi nimen napautus avaa nimilistan)
   b) `zsh …/ajo-museo-iss-207.zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/yhd-207f-app iss`
   → KK (kopio PT): revontulikuva iPhone + iPad (iss207a) + siirtymävideo; tarkista KK:n 05.18 kolme kohtaa: 1) iPhonella nimi
   "Revontulet" kokonaan lasissa verhon vieressä, 2) verhot pehmeät poimut ilman porrasmutkia, päät häipyvät, 3) paikannimet eivät katkea
   ikkunan reunaan. SIMU VAPAA JU:lle.
2. KK:n OK:n jälkeen NS:lle junaan 207: natiivi-ui/museo-inappi-207 30b0d81e6 ja natiivi-ui/iss-207 48fbfe209 (ISS sisältää 81be0b791…).
   Yhdistelmähaarat natiivi-ui/yhd-* ovat vain simua varten, EI junaan.

## TILA
- Lasihaku b8198b4e3: näkyvä lasi ennen/jälkeen KK OK 04.3x (junassa 207).
- i-nappi 30b0d81e6 (KK 04.3x): iRivi yläkerroksen juureen otsikon jälkeen (turva-alue syntyi DioraamaTaulussa otsikon alle → otsikko vei
  napautuksen). Simu 04.52–05.10: ennen osui otsikkoon iPhone+iPad; jälkeen 3/3 i-kortti molemmilla. Junan Mona Lisa -suurennus piilottaa
  nimen → lisäajo b.
- ISS-207 (worktree /Users/Shared/Claude/wt/proto-natiivi-ui-iss-207): 7c8d1eca3 katse = horisonttikulma + vaakasuunta verhoihin (KK OK
  05.18 "suunta OK"); c703a481b verhot sileiksi (agentti; 6486 kärkeä, synteettisessä soikiossa ei päitä); 48fbfe209 nimet lasissa
  (agentti; lasin marginaali 0,93 arvaus, revontulten nimi voi hyppiä 0,25 s:n välein — katso videolta). Musta 1,1–3,5 s (KK OK).
  Pienoispallon alta planeetta jäi testaamatta (napautus osui revontuliin).

## Worktreet (proto)
museo-inappi-207 (myös yhd-*-haarat), iss-207, lasihaku-207 + -0350:n lista (poista 207:n lukituksen jälkeen).

## Opit
- `sed -i` vaihtaa tiedoston inoden: käynnissä oleva todistusajo (`done < $SKEN`) lukee vanhan, seuraava uuden.
- Simun `tap-teksti` kertoo osuman: "museo: yläkerros kosketus x,y → luokka" paljastaa päällekkäiset osuma-alueet.
- Junan 207 Mona Lisa -suurennus piilottaa nimen → otsikko-testit muulla teoksella (louvre-inv-777).
