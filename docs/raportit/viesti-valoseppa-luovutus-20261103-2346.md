# Valosepän luovutus 3.11.2026 klo 23.46

Syy: konteksti 26 % (Raamattu 7.37), luonteva tauko: odotan KK:n vastausta k15:stä.
Edellinen: viesti-valoseppa-luovutus-20261103-2325.md (pysyvät työtavat, KK:n lista). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B = tämä kansio). Python: `$B/tulivuoret/venv/bin/python -I`.
Esikatselu vain JU:n vuorolla (JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd). Viestit PT:lle ≤ 3 riviä, mcp__ccd_session_mgmt__send_message id:llä. Haara linssiseppa2/pariisi-k12 → natiivi-backup, EI origin.

## Tila
- **k15 = 2d4eb4fad** (wt /Users/Shared/Claude/wt/proto-linssiseppa2-k12, p15, Kartta-testit 596/596). EI pelissä, EI nähty laitteella. Sisältää k14 + aukio-poisto + värit + 4 siirtoa. Pari: $B/pariisi-tyyli/k15/pari-sama-mittakaava-paikallinen.jpg, tulos k15/TULOS.md.
- k14 ed744428d / b9d044fb6 ohitettu. Pyysin JU:ta perumaan k14:n ajot; kuittaus puuttuu, tarkista JU:lta.
- **PT: laiteajo vasta KK:n vastauksen jälkeen, ellei vastaus tule pian.** Sitten JU:lle k15/ajo.zsh (sk-k15: p-odeon, lähi, keski, laaja) + iso iPad, kamera `aja 48.8515 2.3385 0.005 2`, kuva VS + PT.

## Seuraavaksi
1. Laitekuva tullut: vertaa KK:n kuvaan samassa mittakaavassa, varmista f (alla), pari PT:lle.
2. KS:n vastaus Montparnassesta (ehdotus: VS maa nurmipinnalla koko Pariisin vaiheessa, KS puut + hautakivet; landuse cemetery). Ei toteutettu. KS:lle pitää myös kertoa k15: hänen pintansa on nyt sovitettu väreihin (k15/pinta.py, lähde k15/kortteli-a2-k14.rgb); viesti ei ole vielä lähtenyt, jos tämä rivi on viimeinen merkintä.
3. Koko Pariisi on PT:n käskyllä tauolla, kunnes korttelit näyttävät 2029:ltä. Yhdistäessä: 135e03994:n siirrot ovat jo k15:ssä; PienetAlueet Z16–17 -versio 43df66241:ssä EI saa tulla takaisin.

## k14/k15:n ratkaisut
- Korttelikartta (ElavaTyyli.Korttelikartta): Z14-datapalasta 1,6 m ruudukko, täyttö alle 8000 m² ja alle 24 m raot; sama Z14–Z17:llä. Alue, joka ylittää Z14-palan rajan ja on yli 24 m leveä, jää täyttämättä molemmin puolin.
- Kadut piirretään talojen päälle; leveys metreinä (KatuLeveysM). KadunReunat poistettu; nauha ja muste kadun viivasta, vain talon päällä.
- Sisäseinät kattopinnalla, seinät 0,5, kattopinta mip+1 (KattoTiheys), aukiot 0,7 kohti kadun väriä.

## Epävarmat
- **f (ruudun lämmitys) = 250/240, 220/216, 152/164**: vain iPad a57c0b473:n yleisin väri (kadut) vs. Katu. Yksi väri, lähde koodissa löytämättä. Katu 234/212/183 ja pinta nojaavat tähän. Paikalliset parit on kerrottu f:llä; k14:n pari ei ollut, joten PT:n "liian sininen" osin johtui siitä.
- Väriraja: lon 2,373 = Z14 | Z13 -talokerros (p90 sama). x ≈ 950 ei ole sama: esikatselussa porras ~5, iPadilla ei portaata. Kameran samuutta ei varmistettu, esikatselun portaan syy auki. Lounaan talot lon < 2,329 selittämättä.
- Korttelikartan kulua iPadilla ei mitattu (paikallinen Z17 146–220 ms/pala koko testiajossa, 4 kattomaskia lisää muistia).
- 2029 on pehmeämpi ja talot pyöreämmät; pelin pinta raidallisempi. Isot kermaiset alueet Luxembourgin pohjoispuolella.

## Muuta
- NUI: lon 2,351 -saumaa ei näy isolla iPadilla A2-pinnalla (iso-a2-9528c1d53); pieni iPad mittaamatta, b116b65a5 odottaa JU:n A/B-ajoa, NUI ilmoittaa.
- Paikallinen koe: k14/paikallinen/data (4 Z14-palaa), `ELAVA_KOE=<data> ELAVA_Z=17 ELAVA_ALUE=66384,45091,66391,45098 ELAVA_PINNAT=<wt>/Assets/StreamingAssets/ElavaKoealue sh <wt>/Kartta-testit/kaanna.sh`; kokoa: k12/paikallinen/kokoa.py; pari: k15/pari.py.
- Wt proto-linssiseppa2-k12b poistettavissa (aukio-poisto tehty).
