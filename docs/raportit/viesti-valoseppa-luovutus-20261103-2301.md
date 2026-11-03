# Valosepän luovutus 3.11.2026 klo 23.01

Syy: kontekstiraja 26 % (Raamattu 7.37), luonteva tauko: odotan JU:n k11-ajoa ja laitekuvaa.
Edellinen: viesti-valoseppa-luovutus-20261103-2227.md (pysyvät työtavat -20261101-2124.md, -2220.md voimassa). Loki:
`/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B = tämä kansio). Python: `$B/tulivuoret/venv/bin/python -I`.
Esikatselu vain JU:n vuorolla (JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd). Viestit PT:lle ≤ 3 riviä.

## Tehtävä: YÖTYÖ (omistaja 22.31 "Koita saada Pariisin kartta tehtyä kokonaan"; KK hyväksyy yöllä)
Ohje: Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261103-pariisi-ylaviisto-ja-osakirjasto.md, osio YÖ 3.–4.11. (VS = kohta 2).

## Tila (kaikki natiivi-backupissa, EI pelissä eikä junassa)
- **k11 = 43df66241** (linssiseppa2/pariisi-katot, wt /Users/Shared/Claude/wt/proto-linssiseppa2-katot), Kartta-testit 597/597. Sisältää:
  koko Pariisi 135e03994 (raja 48.8150–48.9030, 2.2230–2.4710, korttelipinnan 4 satunnaissiirtoa "@dx,dy"), p11-pinta
  ($B/pariisi-tyyli/katot-k11/katot-kontrasti.py; parametrit KONTRASTI 1.28, SININEN 6, kylläisyys −22 %, B ×1,06), pienet pihat ≤ 4000 m²
  korttelipinnalla (ElavaMaski.PienetAlueet), Z11–Z12 korttelimassa soikiona + Seine leveänä.
- **k11 JU:n jonossa NS:n sijoitusten jälkeen**: $B/pariisi-tyyli/k11/ajo.zsh (SHA päivitetty; JU sai 43df66241:n, viesti oli jonossa, kun kirjoitin). Ajo ei ollut alkanut 23.00.
  Kun valmis: puolikkaat k11/pari/ ja täysi rajaus 2029:ää vasten kuten k10 ($B/pariisi-tyyli/k10/pari/, 2029: _tyo/codex/pariisi-nahtavyysalue-notre-dame-20261103/tyyli-2029-kortteli.jpg), TULOS k11/TULOS.md → PT.
- Laitekuva terävyydestä pyydetty JU:lta (PT:n pyyntö), komennot viestissä: elavakartta pariisi 1; karikatyyri pois; aja 48.8540 2.3480 0.012 2; 40 s; ruutukuva. JU ei ollut vielä kuitannut.
- k10 d64f74a56 (TULOS k10/TULOS.md): PT vei KK:lle suosituksella palauttaa (katot ruskeat, vaaleat L-läiskät, pystysauma, pehmeys). KK:n vastaus odottaa.
- Koko 135e03994 (koko/TULOS.md): Montmartre ja Eiffel toimivat, koko kaupunki oli tyhjä → korjattu k11:ssä, EI vielä todennettu pelissä.

## Epävarmat, tarkista k11:n kuvista
- p11:n väri on arvioitu paikallisista paloista; ensimmäinen yritys (sininen 26) oli violetti. Pelin ruutu on paloja lämpimämpi (yksi mittaus: G ×0,93–0,97, B ×0,90); syytä ei löydetty (Valopohja/KaupunkiKuva epäiltyjä, ei tutkittu), ja jos se riippuu kellonajasta, vastapaino on väärä.
- Z12-massa on paikallisesti hieman punertava; katso pelin ruudussa. Soikio on suorakaiteeseen piirretty, ei oikea kaupungin raja. Bois de Vincennes on osin soikion ulkopuolella.
- PienetAlueet: reunavaran koskettava alue jää täyttämättä, joten palarajalle voi jäädä piha-sauma varsinkin Z16–Z17:llä (ei nähty Z15:llä). Sulje-versio hylättiin: söi sivukadut.

## Avoimet
- PYSTYSAUMA (k10 lähi/keski) ei korjattu; PT mainitsi sen palautteessa. k5/k8: Cesiumin tasovalinta lon ≈ 2,351.
- PEHMEYS: esikatselun ruutu 640×480; lokissa enintään Z15-pyyntöjä (Z16–17 ei lainkaan). Oletus: Cesium valitsee tason ruudun mukaan. Laitekuva ratkaisee.
- Kun KK hyväksyy: yhdistä pariisi-katot pariisi-tyyli-haaraan (nyt d64f74a56), junaan vain omistajan linjan mukaan; TF vain omistajan pyynnöstä, kesken jäävä kirjataan aamuksi.
- Korttelisiirron tarkistus suurella näkymällä; seinän korkeus kapeilla kaduilla; muste segmenteittäin; käännetty kartta.
- ND k4 ja muut nähtävyysalueet: KS + NS, VS tekee pohjan vain KS:n pyynnöstä.

## Muuta
- Wt:t: proto-linssiseppa2-koko (135e03994) poistettavissa, kun k11 hyväksytty; proto-linssiseppa2-korjaus, kun 99ebdaf89 junassa.
- Paikallinen koe: `ELAVA_KOE=<data> ELAVA_Z=15 ELAVA_PINNAT=<wt>/Assets/StreamingAssets/ElavaKoealue sh <wt>/Kartta-testit/kaanna.sh ElavaKoe`; data 2×2 Z14: $B/pariisi-tyyli/nahtavyysalue-notre-dame/data (kopioi, cs/ kirjoitetaan sinne). Z12:n 9 palaa: $B/pariisi-tyyli/k11/mvt12 (OpenFreeMap, robots.txt 403, ei kieltoa).
- Sade (5ed5f95e2) odottaa äänen laitetarkistusta; rakettivideo tauolla.
- Viestiraja: SendMessage toimi tässä sessiossa; varakanava mcp__ccd_session_mgmt__send_message.
