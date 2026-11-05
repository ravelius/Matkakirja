# PT:n luovutus 5.11.2026 klo 21.02 (konteksti 30 %)

Edellinen: viesti-fable-luovutus-20261105-2010.md (opit voimassa). Muistin PT-tila fable-tila-20261019-1910.md on tätä yksityiskohtaisempi.

## OMISTAJAN PÄÄTÖKSET TÄSSÄ VUOROSSA (lokissa, Raamattu)
- 20.20 aloittava pelaaja saa Pariisiin aloituslennon vanhan intron tilalle (2.161, 2.210; PR 6311).
- 20.25 Pariisin horisontti kauemmas, matalassa noin 2 × (2.215; PR 6312).
- Noin 20.3x, käsitelty 20.41: alustat Codexilta, Riemukaaresta koko aukio (2.215; PR 6312). Tiedostonimen 2031 aika on KK:n arvaus.
- 20.44 ohjelmana tehdyt kohteet nyt rinnakkain (2.213; PR 6312).
- 20.51 "Näitä mini rakennuksia ei saa olla" (2.215; PR 6313, yhdistä vihreänä, worktree fable-raamattu-minirak).
- KK:n tulkintoja, ei omistajan sanoja: 2.161:n kohdat 2–3 pysyvät, kierto hiipuu Pulun aloituksen alkupuolella, Tuileries-kuva ei nouse aloittavalle, "näitä" = kaikki viisi.

## AUKI OMISTAJALLA KK:N KAUTTA
- Isoisän luenta aloituskaupungeissa: unen poisto 17.10. palautti sen vastoin 2.161:n kohtaa 2 (NS:n löydös, en tarkistanut koodista). Uusi KK kysyy kortilla, koska omistaja on pelannut luennan kanssa. Ei muutoksia muihin kaupunkeihin ennen vastausta; 08a0ec8ea pois junasta. Vastauksen jälkeen tarkista 2.161:n ja 2.210:n KK:n tulkinnat.
- Koskeeko minirakennuspäätös muita kaupunkeja (2.204)? Kysyin KK:lta, suositus sama linja; vastausta ei ole. Varmista, että uusi KK sai viestin.

## ROOLIT
| Rooli | Tila | Auki, tarkista |
|---|---|---|
| KS | Nollattu, luovutus e72d9288d | 1) Horisontti e3fa7298a ei kuitattu: 85°:ssa Grand Palais puuttuu, Eiffel katoaa pohjaansa aiemmin. En ole katsonut kuvia esikatselu-20261105-204213. 2) Pystysauma Tuileries'n luona on todellinen, kadut katkeavat (katsoin rajauksen); viesti jonossa, varmista perilletulo. 3) Riemukaaren aukio 24p (41559f34d), muut sen kuittauksen jälkeen; katon korjaus aukion jälkeen. 4) Montparnasse tilattu 34bc5c032; Opéra otto 1 odottaa KK:n hyväksyntää; Invalidit 24o jatkuu. Mallipäätökset KK:lta ensin. |
| NS | Aloituslento 08a0ec8ea, ei nähty | JU ajaa uudelleen, oma skenaariovirhe korjattu. Tulos KK:lle, Pulu ei saa alkaa esityksen päällä, luennan palautuksen koko kerrottava. Vaakasauma oli Mac-harha. |
| NUI | Minirakennukset ja Parvis-nimi | Ajo JU:lta, ylhäältä + 45°, napautus ja lento varmistettava; tulos KK:lle. b7e7a1de0 kuvat KK:lla. tarkista.sh jäänyt kahdesti valovahtiin: selvittämättä. Vesisääntö voittaa KS:n 7a4b98e62:n vesiosan. |
| LAV | 24c lupa | Ensin koko vyöhykkeen automaattinen tarkistus, todennettu 23:lla ja 24b:llä; sitten ajo, enintään 5 kuvaa, ei vientiä. Ei viidettä paikkausta ilman PT:tä. |
| PK | sk-n JU:n jonossa | Sivulta tuleva ja kynnysviesti näkemättä, ympärikäännös vain testeillä; ei vielä KK:lle. |
| VS | Nollattu, luovutus 96cf75efc | Hôtel de Ville, Pont Neuf, Pont Alexandre III: suunnitelma, ei koodia. Oma haara, kuvat Tripon rinnalle, KK:lle. Pariisin valokokeet seis. |
| JU | Uusi | Runko julkaisija/runko-219-muisti 7bbf04e09 (mukana 627a664c4, 7de953bc9), kääntämättä. Jonon sisältö: kysy JU:lta. |
| KK | Uusi | Sai edellisen KK:n siirron; kaksi yllä olevaa kysymystä varmistettava. |

## AUKI PT:LLÄ
- En virittänyt postilaatikkomonitoria tässä vuorossa enkä tarkistanut Codex-postia; bn2nkuhpy päättyi noin 20.44. Viritä heti ja tarkista posti.
- SendMessage osui viestirajaan 20.3x; käytin varakanavaa send_message.
- Työlistan rivit ilman tilannetta: Juoksupeli: ovet kaikkiin rakennuksiin; Uusien 3D-kohteiden vaaleat kyltit; Nimet häipyvät horisontissa kartan mukana. En päivittänyt; kysy tekijöiltä.
- Työlistan Tiny Warsaw -rivin lisätieto sanoo yhä "odottaa sarjaa"; tilanne on oikein.
- Junarivi 219: eunukin vanha teksti "93cc59596, matkalla JU:lle" tarkistamatta. Vanhat postilaatikkopuut (noin 22 Gi): käsky ei mennyt.
- Burst: editorin BurstCompilation 0, alkuperä tuntematon; jätin ennalleen, asia suljettu (vaikuttaa vain Unityn käsin avaamiseen).

## LEVY
119 Gi 21.00 (raja 100).

## OPIT
- `gh pr merge --delete-branch` vei myös PR:n worktreen; seuraava kirjaus uuteen worktreehen.
- Yhdistä vihreä Raamattu-PR ennen uutta kirjausta: uusi commit käynnistää testit alusta.
- Sama tekijä toi kolme peräkkäistä uutta vikaa paikkauksilla: vaadi automaattinen tarkistus ennen seuraavaa kuva-ajoa.
- Tekijän ilmoittama "hyväksytty" Tripolle tai Codexille: tarkista, kuka päätti. KS oli päättänyt kolme mallia itse.

Tallenne: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-11-05-klo-2020-2100.md
