# Natiivi-UI: luovutus 5.11.2026 klo 19.13 (konteksti 27 %)

Korvaa -1842:n. Työhaara proto-repossa: `natiivi-ui/kyltit-219`, kärki b34cec7ed, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219 (sama kärki). Haaraa ei ole Matkakirja-repon originissa.

## Ensin
KK hyväksyi b34cec7ed:n, ja Pont Neuf saa väistyä tällä kameralla (KK 19.2x). Kuvat: /Users/Shared/Claude/proto-3d/lokit/julkaisija-pariisi-kyltit-b34cec7ed. Viestit: `mcp__ccd_session_mgmt__send_message` session id:llä.

## PT:n työ 19.2x, tekemättä (ei uutta ajoa ennen JU:n vuoroa)
PT: pyöreitä kuvamerkkejä ilman kylttiä näkyy yhä, px 2000-leveässä kuvassa: keski 434,423 · 810,690 · 840,816 · 1088,781; tuileries 1007,1057 · 1094,1439 · 1836,1332. Selvitä koodista ja lokista, mitä kohteita ne ovat ja onko kyltti törmäyksen takia piilossa. Omistajan 15.01 linja: pyöreät merkit jäävät ja napautus kylttiin. Samalla syy Pont Neufin puuttumiseen ja karttanimien vaihtumiseen (Hôtel Matignon hipoo merkkiä), jos sama. Tulos rivillä PT:lle: kohteet, syy, korjaus tai "näin kuuluu".

Tähän asti (ei varmistettu):
- Ne eivät ole piirros-pariisi.json:n kohdenostoja: lähin keski-kuvan neljästä on 76 px päässä. Kalibrointi keski-kuvassa: x = 1056 + (lon - 2.3422) * 18362, y = 750 - (lat - 48.8566) * 27900 (Panthéon ja Eiffel). Sillä pisteet ovat noin 48.8683/2.3083, 48.8588/2.3288, 48.8542/2.3304, 48.8555/2.3439.
- Törmäys ei ole ilmeinen syy: NostotKartalla.KuvatKylttienMukaan häivyttää m.Kuvan kyltin törmätessä, ja eiKuvaa (rivi noin 2180) estää m.Kuvan ilman kylttiä. Selvitä siis, mikä elementti ne ovat. Ehdokas: Symboli kuvamerkillä, kun PariisinKyltti on epätosi (rivit 567 ja 2062: s.Kaupunkimerkki, !OnPariisissa). Data on NostoKerros, ei kohdenostot.
- KK sanoi jo 6ea480e73:n kohdalla: kuvamerkki Notre-Damen pohjoispuolella saa jäädä; se on todennäköisesti 1088,781.
- Työkalut: rivien 580-583 merkkilista (Id, Piste, PIILO) ja `ui kohdassa x y` lokiin seuraavalla JU:n ajolla. DrawMesh-piirto ei näy kyselyssä.
- Karttanimien vaihtuminen: todennäköisesti b34cec7ed, koska KeraaRuudut tiukkeni ja piilossa oleva kyltti ei enää ole este. Pont Neuf näyttää väistyvän näkyvää Grand Châtelet'n kylttiä.

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
