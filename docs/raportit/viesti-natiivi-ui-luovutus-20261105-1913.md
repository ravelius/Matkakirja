# Natiivi-UI: luovutus 5.11.2026 klo 19.13 (konteksti 27 %)

Korvaa -1842:n. Työhaara proto-repossa: `natiivi-ui/kyltit-219`, kärki b34cec7ed, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219 (sama kärki). Haaraa ei ole Matkakirja-repon originissa.

## Ensin
1. Odota JU:n rivi ajosta b34cec7ed (kansio tulee muotoa /Users/Shared/Claude/proto-3d/lokit/julkaisija-pariisi-kyltit-b34cec7ed). Ohjelma sk-pariisi-kyltit-7.txt, 2 kuvaa: keski ja tuileries. Pyyntö oli jonossa JU:lla klo 19.1x; jos riviä ei tule, tarkista JU:lta. Ei omaa ajoa (10.5).
2. Katso kuvat täysikoossa KK:n kahta kysymystä vasten (alla). Tulos KK:lle ja lyhyt rivi PT:lle.
3. Viestit: `mcp__ccd_session_mgmt__send_message` session id:llä. KK:n viestit menevät jonoon, kun sillä on vuoro kesken; se on normaalia.

## KK:n käsky 19.1x (omat sanat lyhennettynä; 23485f753 muuten kelpaa, KK näyttää omistajalle)
"Kadonneen aarteen kuvalla on aina kyltti vieressä (omistaja 14.57, 2.215), joten tuileries-kuvan yksinäinen Grand Châtelet ei jää näin. Jos syy on Louvren suorakaide ruudulla, käytä rakennuksen oikeaa ääriviivaa." "Piilotettu kyltti ei saa viedä nimeltä paikkaa."

## Tehty, ajamatta (b34cec7ed, 0 virhettä)
- Nahtavyysalue: malleille ääripisteet (Aaripisteet, 38 suuntaa, lasketaan latauksessa). KeraaRuudut tekee niistä sekä kuoren että ruutulaatikon, eli myös nimien este (Peittaa) ja pallon piilotus (OsuuMalliin) tiukkenivat. Tämä koskee kaikkia malleja, joten katso keski-kuvasta, ettei muu muutu.
- NostotKartalla.Kohdelaatikot: törmäyksen takia piilossa olevan kyltin laatikko ei enää ole nimien este. Syy oli, että piilotus on pelkkä opacity, ja nimiön worldBound laskettiin silti. Pont Neufin yhteys on oletus, varmistuu kuvasta.
- NostotKartalla.KuvatKylttienMukaan: leike häipyy kylttinsä mukana eikä ota napautusta, joten kuva ei jää yksin.

## Tarkistettavaa kuvista
- tuileries: näkyykö Grand Châtelet'n kyltti leikkeen vasemmalla? Pont Neuf näkyvissä?
- Jos kyltti ja leike puuttuvat molemmat, Louvren ääriviiva osuu yhä tai syy on muu. Louvren osuma on oletus, ei mitattu: oma laskelma scratchpadissa jäi rajatapaukseksi, koska kameran etäisyyttä ei tiedetty. Rajat 860 x 350 x 360, kulmien seinät noin 270, pyramidi 350. Silloin katso Grand Châtelet'n sivu uudelleen KK:n kanssa; KK:lle on sanottu näin.
- keski: Louvren kyltti ja hintakyltti ovat lähes kiinni; KK hyväksyi ("jäävät näin"). Muut nimet ja kyltit kuten ajossa 23485f753.

## Voimassa olevat ratkaisut (KK hyväksyi 23485f753:n)
Kansio: /Users/Shared/Claude/proto-3d/lokit/julkaisija-pariisi-kyltit-23485f753.
- Hintakyltti aina narun pään alla, ei väisty eikä katoa; sen kohdalle osuva nähtävyyskyltti häipyy. Raamattu 2.215 (PT 3f25f9fcf).
- Grand Châtelet'n kyltti vasemmalla (StriimiKyltinKyljet voittaa leikkeen oletuskyljen).
- Tuileries'n leike 3505c7556:sta vaihdettu, kelpaa.
- Les Halles keskitasolla: törmäyshäivytys Louvren kylttiin, jää (KK). Pompidou-nimi väistyy hintakyltin alta, jää (KK).

## Muut havainnot, syy ei tiedossa
- Quai Voltaire puuttuu orsay-kuvasta ajoissa 2174c6785 ja 6ea480e73; ajossa 23485f753 orsay-kuvaa ei otettu. KK:lle kerrottu.
- Pulu koskettaa kuvamerkkiä tuileries-kuvassa. KK:lle kerrottu.
- -1815:n Auki 3:n kohdat ennallaan, paitsi nimien ja läiskän osalta.

## Huomiot
- tarkista.sh: `zsh tyokalut/tarkista.sh`, sitten `git restore` Tyylikirja.uss, Tyylikirja.cs ja tyylikirja.json. Exit 1 valovahdista (Komennot, Nahtavyysalue, NotreDameKirkko) ei tullut aiemmista commiteista; PT ratkaisee. Tässä erässä ajettu vain `bash Peli-testit/unity-tarkistus.sh`.
- `ui kohdassa x y` -kysely on yhä koodissa; ohjelmista kyselyt poistettu.
