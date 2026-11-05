# Lavastajan luovutus 5.11.2026 08.5x — LUE TÄMÄ, ÄLÄ VANHOJA

Korvaa -20261104-2013:n. Yhä auki siitä ja vanhemmista: uusi muuriosa tummempi, terassi-v1b, portaat ja 弘义阁-palkki. Y = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen. Mittaukset: muuri/KORJAUS.md loppu. Ei vientejä. Yötila päättyi aamulla: tarkista PT:ltä.

## 1. Kk2r: tumma aukio ei ole leivontavika (päätelty, kuvat puuttuvat)
d9cde0f50 lukee rakennukset-v118:aa (loki, paketit-rivi); juurissa koejuuri-rungolle ja -kk2r on vain v126. Taihedian ja terassi puuttuivat myös verrokista, ja niiden alta paljastui lattia. Tumma alue on atlaksessa terassin pohja. Oikea runko 980bb115c (rakennukset-v126, c2-v40).
ODOTTAA: JU ajaa Y/kk2r/aja-980.zsh (T/lav-980.zsh, Mac L1, TF 218:n ja KS Louvren jälkeen), kuvat Y/kk2r/kuvat-980/. Katso parit koko koossa: onko tumma alue poissa, ja vyöt (vaalea harmaa, ylempi tumma). Sitten parit PT:lle ja KK:lle.
Saman virheen alla 4.11.: kk2r, kansi, friisi. Kansi-parin tulos taustan paloista pysyy. Friisin vaihtelua ei ole katsottu rakennusten kanssa.

## 2. Kultakolmio ja turkoosi: koe valmis, kuvat puuttuvat
Juuri koejuuri-rungolle-irto (Y/palat/irto/tee.zsh, irto_pois.py). kk-tausta-3-1: lod0 130 turkoosia (199 m²) ja kultakolmio; lod1 20 turkoosia. Jäivät: 76-190 kolmion kappaleet. JU:lle pyydetty Y/palat/irto/aja.zsh; JU:n kuittaus mainitsi vain aja-980:n, joten VARMISTA, että tämä on jonossa. Katso: räystäskoristeet tallella? Kk2r:ään vasta kuvien jälkeen. Huom: kohta 3 voi korvata tämän.

## 3. PT:n uusi tilaus: tumma levy (四神祠, 碧螺亭, 中正殿), V4_ikkunakehys
PT:n sanat: "Korjaa syy, ei paikkoja yksitellen. Kuvapari samalta kameralta ennen ja jälkeen, kohde kokonaan; kuvat ensin minulle. Ei junaan ilman lupaani." Lista: proto-3d/_tyo/pelikoodari/tayte/8cd/levyt.json. Todentamatta: 储秀宫:n juovan yhteys.
Mitattu: isoja (> 1 m²) vaakakolmioita v57 0, v59 424, v115 412 (1583 m²). Syntyvät välissä tliitokset-v57e (0) → yksikerros-v59 (308): tyokalut/vaaka_yksi_kerros.py.
Syy, ei todistettu suoraan: askel 3 valitsee solun korkeuden ja materiaalin pisteestä f.calc_center_median(). Koverassa solussa kärkien keskiarvo voi osua toisen pinnan kolmioon, ja koko solu nousee sen korkeudelle ja materiaaliin. Tukee: levyjen kärjet ovat palojen rajoilla ja ikkunalaudoilla; alla ennen ajoa oli muuta (Y/levyt/nousseet.py).
Sama mittaus yli 0,5 m²:n kolmioille, ei ennen ajoa pintaa tällä korkeudella: gold 23 043 m², marmori 23 005, harmaa 18 791, vesi 30 398, sokkeli_kansi 1974, kivireunus 1768, ikkunakehys 1136, teal 811, lattia 606. EI siis vain ikkunakehys. Luvut ovat ylärajoja (mittari ei erota näkyvää; vesi tarkistamatta). Epäily: myös kansi_pois:n "taivaan katon palat" ja kultakolmio tulevat tästä; TODISTAMATTA.
Seuraavaksi: 1) korjaa työkalu: piste varmasti solun sisältä (esim. isoimman kolmioinnin kolmion keskipiste), aja yhdelle palalle (1-3) koejuurena, varmista nousseet.py:llä, että levyt häviävät ja lattia on alla. 2) Päätä, miten v115 korjataan: koko ketjun uudelleenajo v57e:stä on raskas (leivonta, myöhemmät korjaukset), joten etsi tapa korjata nousseet solut suoraan. Kerro PT:lle, jos tarvitaan leivonta. 3) Kuvapari.

Rivi työlistalle ja junaan: PT.
