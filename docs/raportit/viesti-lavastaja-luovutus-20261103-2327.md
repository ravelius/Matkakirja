# Lavastajan luovutus 3.11.2026 klo 23.27 (KONTEKSTI 33 %) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: viesti-lavastaja-luovutus-20261103-2100.md. Id:t: osoitekirja. Työkansio L = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja.
Omat python-skriptit: /opt/homebrew/bin/python3 ILMAN -I:tä.

## KESKEN: Yangxinmen/Zunyimen-esipiha (KK:n yöpäätös, tärkein)
- Tausta v124 odottaa kuvia: _valmiit/juoksupeli-kk-lavastaja-tausta-v124-vienti-20261103, SHA256SUMS d132fc9df176. Viestit JU:lle ja PK:lle lähetetty 23.2x
  (jonossa, EI vielä kuitattu). Tarkista, että vienti ja kytkentä menivät perille. Kuvat: L/yangxin-kivetys/kuvat-v124/ (5, 5d, 5e, 5f; 5f = −115 215, suunta −2.03).
- EI VIELÄ NÄHTY PELISSÄ. Tarkista 5d (kiila, poikkiraita), 5e (viisto raita) ja 5f (z = 225:n reuna). L/yangxin-kivetys/rako2.py on karkea: se listaa kärkiä, joten RAKO-rivit eivät yksin todista vikaa.
- KK vaati: ei terävää kiilaa muurin juureen (suora sokkeli tai laatat muurille asti); poikkiraita ei saa loppua kesken keisarin kohdalla (yhtenäinen porras tai raita pois). Lopuksi kuva kuten pari-5-5d PT:lle → KK.
  Parin teko: L/yangxin-kivetys/pari-v122.py, vaihda kansio ja nimet. Vanhat kuvat: L/pronssit-esi/aukiokuvat-219/ (5-yangxinmen.png, 5d-yangxinmen-kaytava.png).

### Mitä opittiin (kk-tausta-1-3 lod0, pohja v119)
- Harmaa pinta = maantason V4_marmori-kolmiot. Vaalea vino viiva = y < 0, pohjamaa leikkasi (päätelty; viiva hävisi v122:ssa 3 cm:n nostolla).
- Poikkiraita = rako x = −100:ssa: marmori y jopa 0,13, naapurilaatat y 0 (päätelty geometriasta). v123:n 5d:ssä raita poissa.
- Kiila = käytävän (x −103…−88,4, z 244…250, y > 0,2) sekalainen yläpinta; koko pinta nyt V4_lattia. v123:n 5d:ssä kiila poissa.
- v123 (kaikki maa y 0) avasi 5e:hen viiston raidan länsipuolen vinoon lattiaan (y 0,13–0,30, jatkuu x −152:een; ei kannata tasata). v124.py: marmori y = max(y, 0), neljä saumakärkeä (−100, 236.6), (−100, 244.1), (−100, 225), (−125, 225) → 0, myös lattiakärki (−125, 225).
- Versiot: v121, v122 ja v123 ovat mediassa, mutta korvattu. Kytkentä: 65282422e → 088a6ca28 → d667da301 (v123), v124:n SHA tulossa PK:lta. PT:n kuittaus koskee v122:ta; v124 tarvitsee oman.
- Ennen pakettia: vapaat nimet mediasta. Tausta ≤ v124, rakennukset ≤ v123, c2 ≤ v38, avoimet ≤ v57.

## PIDOSSA
- Alkulennon keltainen tasainen katto (KK:n löydös, PK kysyi): EN tunnistanut mallia. Arvio x ≈ −97, z ≈ −205 ±30 m. Pelissä ei ole säde-komentoa. ÄLÄ KORJAA ennen kuin korjauspyyntö tulee: PK ottaa kuvan JU:n vuorolla, ja KK vahvistaa kohteen. Skriptit: L/yangxin-kivetys/keltainen*.py.

## SEURAAVAKSI (PT 23.3x)
- Työlistan "Juoksupelin seinät, koristeet ja taivas havainnekuvien tasolle" seuraava kohta, ilman kiireellistä käännösvuoroa (Pariisi ajaa yöllä ensin). EI aloitettu.

## TEHTY
- Pronssit ja vesiastiat: 42 kpl tarkistettu kuvista (L/pronssit-esi/aukiokuvat-219/TARKISTUS.md; Taihemenin rautavesiastiat näkyvät vain osittain, ei vikaa). PT kuittasi. Kasettikatto oli jo kuitattu ja kytketty (avoimet-v54).
- Levy: 17 vanhaa pakettikansiota T7:lle symlinkein (/Volumes/T7 4TB/Matkakirja-linnanrakentaja/_tyo-siirretty-20261103; df ~0,8 Gi, osin klooneja) ja wt/lavastaja-postilaatikko poistettu PT:n luvalla (~5,3 Gi). Proto-worktreet (esto-2f, havainne, havainne-v118) EIVÄT täytä 10.13:a: eivät masterissa, ja havainnessa staged-muutoksia; esto-2f on pronssit-esi-skriptien käytössä.
- Oma varoitus: `NS` = Natiiviseppä. Älä oleta lyhenteitä.
