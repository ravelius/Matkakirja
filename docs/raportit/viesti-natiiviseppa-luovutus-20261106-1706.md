# Natiivisepän luovutus 6.11.2026 klo 17.06 (konteksti 26 %, 7.37)

Korvaa -1636:n Tilan, LISÄYKSEN ja SEURAAVA TYÖ:n. -1636:n Opit ja -1611:n Linjaukset, Mitattu ja Opit pätevät; samoin niiden viittaamat vanhemmat osat. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja.
ENSIN: cron "4 9 * * *" (session-only, Raamattu 7.41), skripti /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py. Remote Controliin ei kosketa.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe, D = P/selvitys-tarina-4b, O = P/valmis-origo, L = /Users/Shared/Claude/proto-3d/lokit. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-palikka, haara natiiviseppa/origo-koe, peili natiivi-backup.

## LISÄYS 17.1x (PT, KK 17.08): KORVAA KOHDAN 1 JA "ODOTA PT:N SANAA"
- Origokokeen iPad 5 saa ajaa KERRAN LAV:n leivonnan jälkeen, 0 palaa ja vahti päällä. PT on kertonut JU:lle, JU kuittasi perumisen (ajo ei alkanut). NS EI anna toista lupaa eikä uutta lupaa: odota vain tulosta tälle session-id:lle.
- KK: 17.05 koskee vain korvauksen mittausta. Tulos KK:lle myös, jos se on "ei tulosta"; omistajalle on luvattu kertoa se. Koe suljetaan tähän ajoon.
- C1 ja D2: tulkintani (kohta 4) on tehty ennen tätä tarkennusta. Kysy PT:ltä, kun koe on suljettu, ei aloiteta omin päin.

## Linjaukset
- OMISTAJAN PÄÄTÖS 17.05 (KK, PT:n kautta): palikoiden iPad-mittaus odottaa, kunnes Pariisi on valmis ja muistia on kevennetty. Ei uusia palikka-ajoja iPadilla eikä kevennystä nyt. Nykyiset talot ja vahti pysyvät, Macin kuvat jatkuvat.
- PT 17.0x: origokoe ei mittaa korvausta. PT:n tulkinta: iPad 5 vain 0 palalla ja vahti päällä, ellei KK kiellä; vahdin keskeytys = "ei tulosta", ei uusintaa. ODOTA PT:N SANAA KK:N KANNASTA ennen iPad 5:n lupaa.
- PT 16.5x: tämä on origokokeen viimeinen kierros. Ei uutta koekomentoa eikä kolmatta kierrosta. Tulos KK:lle suoraan, kyltit-rivi ei muutu. Kallistuvat nähtävyydet kirjataan toteutuksen esteeksi, ei korjata nyt.

## Tila
- iPad 3c käsitelty, ei toimia (-1636:n kohta 1).
- Mac-12 0f152ced2: origo toimi, mutta B:ssä nähtävyydet ja sillat kallistuivat ja puut puuttuivat mittaruuduissa, joten iPad jäi ajamatta. O/mac12-tulos.md, O/4b-ruudut.png, O/hyppy2-ruudut.py (ruutukohtainen jäännös).
- Koekomento palikat esineet 0|1, commit d907286cb, peilissä; piilottaa nähtävyysalueet puineen, ohjelmakohteet (sillat mukana) ja nappulan. Ehtojen lisäys kirjattu ennen ajoa: D/origokoe-ehdot.md, lopussa.
- Mac-13 d907286cb kelpaa: O/mac13-tulos.md. Ei esineitä missään jaksossa, kartta ehjä. Nappulan piilotusta ei voinut todentaa Macilla.
- JU: iPad 5 d907286cb (O/ajopyynto-ipad-5.md, lokit L/natiiviseppa-origo-ipad5-d907286cb) on jonossa LAV:n leivonnan jälkeen. ANNOIN LUVAN 16.59 ENNEN OMISTAJAN PÄÄTÖSTÄ JA PERUIN SEN 17.06. JU:n kuittausta perumiseen ei ollut vielä luovutushetkellä: tarkista se ensin, ja jos ajo ehti alkaa, rivi PT:lle heti.

## SEURAAVA TYÖ, järjestyksessä
1. Odota PT:n sanaa KK:n kannasta. KYLLÄ: uusi lupa JU:lle viestillä. EI: rivi JU:lle, että iPad 5 pois jonosta, ja koe suljetaan PT:n ohjeen mukaan: Mac todisti vain, että komento toimii, ei kuvajäännöstä.
2. IPAD 5 -TULOS, jos ajetaan: tarkista "talot: 0 palaa kansiossa", "palikat: esineet pois, kerrokset ok" ja konsolista, että origo-rivi on ennen jälki-riviä. VIKA = EI TULOSTA, ei uusintaa. Aja P/valmis-jalki2/jalki2.py kaikille 7 jäljelle ja D/hyppy2.py:
   hyppy2.py <kansio> r4-a1 r4-a1-t; hyppy2.py <kansio> r4-b r4-b-t --origo 48.8585 2.3586 0; hyppy2.py <kansio> r4-a2 r4-a2-t; eteen-a/eteen-a-t; eteen-b/eteen-b-t --origo …; sivu-*: lisää --alku 20. Kuvat ovat laitteelta ylösalaisin (D/kaanna.py). Katso sarjoista, onko nappula poissa, ja vertaa kuvia ehtojen kohdan 3 mukaan.
   Sulje kokeen tulos yhteen ehtojen lisäyksen neljästä: ORIGO AUTTAA, ORIGO EI AUTA, MITTARI EI EROTA KOHINASTA, EI TULOSTA. Älä muuta ehtoja. Tuloksessa mukana: kallistuvat nähtävyydet ovat toteutuksen este. Pätkät A/B: P/valmis-jalki2/sarja.py käännetyille kuville, KK:lle, EI omistajalle. Tulos suoraan KK:lle ja rivi PT:lle. Riski luvussa: veden ruuduissa kuvio on heikko (O/mac13-tulos.md).
3. Toteutusehdotus vain, jos PT sitä pyytää. Jäännöksestä suurin osa jää odotuksenkin mukaan selittämättä, sano se.
4. C1 ja D2 (-1247:n kohta 6): tarvitsevat iPad-mittauksia palikoilla, joten omistajan päätös 17.05 pysäyttää ne tulkintani mukaan. Älä aloita ilman PT:n sanaa. Jos jono muuten tyhjenee, rivi PT:lle "JONO TYHJÄ: natiiviseppä".

## Opit
- KATSO B-KUVA ENNEN LUPAA: Mac-12:n luvut läpäisivät kaiken, ja vain täysikokoinen kuva paljasti kallistuneet kohteet. Jäljen kolmiot ja kutsut näyttävät vain kartan.
- ORIGON SIIRTO AJON AIKANA kallistaa nähtävyydet ja sillat ja vie puut; palauttaminen korjaa ne. Syytä ei ole selvitetty.
- MITTARI: ruutujen sisällön ero on samaa suuruusluokkaa kuin odotettu lasku (4b: vasen sarake 0,18–0,21 px muita suurempi). Tarkista ruuduittain ennen pieniä vertailuja.
- TYYPPITARKISTUS: V/tyyppitarkistus.zsh kääntää vanhan kopion PalikkaKerros.cs:stä, joten sen 0 virhettä ei todista työpuun muokkausta. Käytä O/tyyppitarkistus-tyopuu.zsh ja vaihda sen S omaan scratchpadiin.
- ERÄAJO ohittaa kuvasarjat, joten Macilla ei saa kuvajäännöstä.
- LUPA VOI VANHETA: omistajan päätös tuli tunnin sisällä luvasta. Peru heti, kerro PT:lle, älä oleta.
