# PT:n luovutus 6.11.2026 klo 23.45 (tili vvi@vvi.fi; konteksti 30 %)

Korvaa -2301:n AJOSSA-listan; sen OPIT, HUOM ja ALOITUKSESSA voimassa. Id:t osoitekirjassa. Taulu Qo5w6Wk4JSYRwYbyf2fJrm.

## ALOITUKSESSA
- set_remote_control self true.
- Monitorit: `python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py`, `/Users/Shared/Claude/hooks/codex-posti-vahti.sh` (30 min, viritä uudelleen) ja levyvahti: vapaa alle 20 Gi (df -g /Users/Shared, 20 s:n silmukka). Ei jonokierros-cronia.

## OMISTAJAN JA KK:N PÄÄTÖKSET TÄLLÄ VUOROLLA (lokissa, PR 6404 ja 6405)
- 23.07 YÖN SÄÄNTÖ: vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa → kokeen osa pois tai edellinen toimiva, rivi KK:lle (vika, kokeiltu, suositus), seuraavaan työhön.
- 23.22 YÖLLÄ VAIN Pariisi, Lontoo ja juoksupeli; tukityö vain niitä palvellen. Muu seis, ei uutta. Kielletty kaupunki, muuri ja katot = JUOKSUPELI, ei Peking-tauko (JU poisti ne erehdyksessä, palautettu 23.25).
- KK valtuutuksella: 23.11 Lontoo A: 15 kohdetta, planetaario pois, suojatut modernit yhtenä laatikkona. 23.26 ryhmä 2 v13 ja 25 m kokeena, irtotalot pois; Opéran pari omistajalle aamulla. 23.36 Invalidien varjo ennalleen. 23.38 ajojen 35 ja 36 Invalidien r2-kuvia ei omistajalle.

## AJOSSA JA ODOTTAA
1. KS: ajo 37 (Y eec08f293, skenaario _tyo/karttaseppa/sk-pariisi-yhteinen-37.txt) JU:lla. Kun valmis: Invalidit v13 | v16 ja Grand Palais -parit KK:lle PT:n kautta (KK arvioi Invalidit uudelleen); kuittaukset: peilikorjaus 8d6d72a1d, VS:n usva (uo-85), Palais Bourbon dac44e3d9, sillan valo 386945015, NUI f29ff0335 (Galerie). gr-8-m-pohjan vaihto: tallenne korkeammalta; jos ei toistu, rivi ja seuraavaan. IenanSilta kaatuu pohjallakin: KS katsoo kerran. Ajo 36: poistosääntö kuitattu kokeena, Eiffelin parin katsoin; Montparnassen rajauksia en avannut.
2. KK:n päätös odottaa: Jeu de Paume ja Orangerie (way/54188994, 54188996, nimet varmistettu) Louvren maskista; suositus takaisin. Viesti jonossa KK:lle; varmista.
3. NS: aloituslennon aukko Macilla 4,3 s verhon lähdöstä (lämmin), toinen notkahdus ajo j; iPad kylmä JU:lla, sitten korjausehdotus KK:lle. "Ei korjausta" EI kuitattu. Liiku cdcd533ab kokeena: kyltit paikoillaan (pari katsottu), nimet 24 → 25; Karsin lokirivi puuttuu; napin piiloutuminen testataan pelaajan napautuksella, viesti NS:n jonossa. Nimioletus 0c544d4ef ja NUI:n nimirivi c8a71c1cd kokeena.
4. LAV: levyt7s ja 7r+u jonossa JU:lla. Pari 7r|7u PT:lle; jos näyttää korjauksen, sama sääntö yhtenä koejuurena, ei leivontaa. UV-saaret ja kolmio uusiksi + koeleivonta: KK:n aamu, ei yöllä. B:n laikku auki.
5. PK: Lontoo B1 71b6e26ec JU:lla, levyn planeetasta. C–F jakamatta. Nollattu 23.2x.
6. VS: odottaa ajoa 37; meri seis; iPad-mittaus ääriviivoista pois yöltä, tehdään ennen junaa. Saumat oletuksella, varakeino ei kelpaa (KK:lla rivi). Sacré-Cœurin mäen ohut tumma kaari: syy varmistamatta.
7. JU: enintään 2 Unityä; raskaat ajot eivät päällekkäin planeetta-ajon kanssa. T7-siirto tehty.

## AAMUN KYSYMYKSET (KK:lla; varmista, että jonoviestit menivät perille)
Geofabrik: Pariisin talot tehty otteesta, jonka lataamisen robots.txt nyt kieltää; skriptit vaihdettu T7:n planeettaan (ajamatta), suositus Pariisi uudelleen, kun koe lukittu. Meren ruudukko (koko maailma, seis) ja suorareunainen tumma alue. Opéran pari. Pari 7r|7u, kk-2.

## HUOM
- Levy notkahti 14 Gi:hin 23.14: todennäköisesti vaihtotila (22,8 Gi käytössä), ei mitattu notkahduksen aikana. Nyt 50 Gi.
- Loki-PR:t (vain docs/) eivät käynnistä testejä tarkoituksella: "no checks" ei ole vika; yhdistä heti.
- SendMessage pysähtyy 10 viestiin; varakanava mcp__ccd_session_mgmt__send_message.

## OPIT
- Kun rajaus tulee, kerro roolille esimerkit: JU luki "Kielletty kaupunki" Pekingiksi.
- Roolin "ei korjausta" -suositus: tarkista mittari ensin. NS:n 0,7 s kumoutui 4,3 s:ksi, kun laskuri ei nähnyt puuttuvia laattoja.
- Hypoteesini kumoutuivat: git-paketti levyn syynä, r1-pohja gr-8-m:ssä. Merkitse hypoteesiksi.
