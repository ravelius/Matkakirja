# Web-jono: webiin myöhemmin yhtenä eränä tehtävät muutokset

Omistaja 29.9.2026: sovellus johtaa, web-pelin käyttöliittymä on tauolla (Raamattu, Ydinajatus "NATIIVI ENSIN,
WEB RAJATUMPI"). Tähän kirjataan jokainen webiin kuuluva muutos: omistajan päätös, lokiviite ja natiivin commit tai
keskeneräinen web-haara. Rivit lähetetään Päätoimittajalle, joka ylläpitää tiedostoa. Linssejä ja linnaa ei tuoda
webiin, jos ne on tehty natiivissa paremmin.

| Pvm | Muutos | Loki | Natiivi | Web-haara (kesken) |
|---|---|---|---|---|
| 29.9. | Yläpalkin logo ja pilleri pois kulmista, iPhone-palkki korkeammaksi (saaren ylä/ala sama nahka + tikkaus) | OMISTAJA: IPHONEN NAHKAPALKKI KORKEAMMAKSI | natiivi-ui/palaute-1050 | pelikoodari-ylapalkki-nahka 7fa43ff13 (valmis: nahka, pillerin himmennyskorjaus, Asetukset-näkymä, Linssit/Aarteet kaksipalstaisina + oranssi rivinappi; savuke 141/141, npm test 4932/4933 (ainoa epäonnistunut matkalaukun-linssit korjattu ja ajettu tiedostona, koko sarja ajamatta korjauksen jälkeen); puuttuu versionnosto, koko testisarja ja PR; kooste proto-3d/lokit/ylapalkki-nahka/v2/) |
| 29.9. | Matkalaukku: säätimet, Pieni liike, Kuljettu reitti, Ehdota ja Offline Asetuksiin; Retkikunta Uusi peli -napin viereen; Kehittäjä-nappi Asetuksiin; Näytä huntu Asetuksiin; Asetukset leveämmäksi, Äänet-napit pois | OMISTAJA: MATKALAUKKU JA ASETUKSET UUSIKSI | natiivi-ui/palaute-1050 | sisältyy haaraan pelikoodari-ylapalkki-nahka 7fa43ff13 |
| 29.9. | Linssit ja Aarteet: lista oikeaan reunaan, valittu rivi oranssiksi Aktivoi/Näytä-napiksi | OMISTAJA: AARTEET SAMOIN KUIN LINSSIT | natiivi-ui/palaute-1050 0b1f838d | sisältyy haaraan pelikoodari-ylapalkki-nahka 7fa43ff13 |
| 29.9. | iPadin Maailma-nappi pois kartalta, nostot näkyvät maakuntatilassa, iPadin nahkapalkki 89 pt | OMISTAJA: NOSTOT NÄKYVÄT MAAKUNTATILASSA | natiivi-ui/ipad-nahka 85be3e3e | ei aloitettu: iPad-nahka turva + 57 pt, tikkaus 19 pt, logo 28 / pilleri 34 pt, reunat 36 pt (Codex ipad/-paketti) |
| 29.9. | Pulun chat: nostojen äänikontrollit ja asetussäädöt chat-ikkunan yläreunaan; Näytä puhekuplat ja Ehdota sisältöä ikoneiksi | OMISTAJA: PULUN CHATIN YLÄREUNAAN ÄÄNIKONTROLLIT | Pelikoodari (tulossa) | ei aloitettu |
| 29.9. | Maarajat: maa–maa-raja #5a4330 50 % 2,2 px + kaikki rannat saarineen #5a4330 22 % 1,2 px | OMISTAJA: MAARAJAT KEVYIKSI, HENTO RANTA KAIKKIALLA | Natiiviseppä (tulossa) | ei aloitettu: pelaajan maan kehä pallolla (js/pallovektorit.js korostaMaa), rannat maapolygonit.json, raja tools/maarajat-maamaa.mjs, ei rannikon naulausta; malli pyramidi-poltto/maakehat-koe/raja-ja-rannat-*.jpg |
