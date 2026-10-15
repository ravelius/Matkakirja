# Postivahdin kierros (pysyvä ohje; PT 9.10.2026)

Kaikki viestit suomeksi, yksi rivi PT:lle (PÄÄTOIMITTAJA local_5df52e10-10e4-4b72-9554-0049db300dfe, 14.10. alkaen; local_dfa7296a on nyt KESKUSTELUKANAVA, sitä ei nollata eikä sille lähetetä rutiinia). Ei pushia omistajalle.
OSOITTEET: /Users/Shared/Claude/osoitekirja.md (send_message id:llä). ROOLIEN NOLLAUKSET: NOLLAUS.md (Postivahti hoitaa alusta loppuun, omistaja 14.10.).
Kierros 4–5 min välein ScheduleWakeup, prompt: "Lue /Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan".

## Joka kierroksella
1. `get_usage` (ilman id:tä): 5 h ikkuna ja viikko.
2. `list_sessions` (limit 14): isRunning, lastActivityAt.
3. `get_usage(session_id)` JOKAISELLE käynnissä olevalle roolisessiolle JA PÄÄTOIMITTAJALLE: konteksti %.
4. Levy: `df -h /`.
5. Talon tila 10 min välein (tiedosto /Users/Shared/Claude/Matkakirja-fable/scratchpad/talon-tila.json, kentät `paivitetty` (date +%H.%M) ja `roolit`; älä koske `junat`/`huom`). Kirjoita python3:lla .tmp → os.replace.

## Hälytysrajat (rivi PT:lle, kukin vain kerran per raja)
- Nollausrajat liukumalla (omistaja 14.10. 22.52–22.58): pehmeä raja → nollaus ensimmäisellä luontevalla tauolla (tehtävä valmis, muutos pushattu tai odotus käännökseen); kova raja = pehmeä +10 %-yks. Pehmeä–kova: Postivahti 20–30; koodi-, kartta- ja sisältöroolit + Julkaisija + Asemataulu 25–35; PT + Laitetestaaja + Äänittäjä 30–40; Keskustelukanava 40–50. Rooli konteksti ≥ pehmeä raja → rivi PT:lle kerran roolia kohden (uudelleen kovalla rajalla). Kun rooli luovuttaa (LUOVUTUS VALMIS), Postivahti nollaa NOLLAUS.md:n mukaan. Roolit saavat nollata itsensä heti luovutuksen jälkeen kysymättä omistajalta (pysyvä lupa 22.52).
- Keskustelukanava local_dfa7296a (omistaja 14.10. 22.55): konteksti ≥ 35 % → rivi KESKUSTELUKANAVALLE "päivitä aloitus.md"; ≥ 40 % → rivi KESKUSTELUKANAVALLE "kysy omistajalta nollaus" (ei 55/65). Ei itsenäistä nollausta; vain Keskustelukanavan nollaus kysytään omistajalta kortilla.
- 5 h ikkuna 70, 85, 95 % (+ arvioitu täyttymisaika); tauko 98 %:ssa.
- Viikko: 96 % → rivi PT:lle (EI siirtopromptipyyntöä; omistaja nollaa kiintiön 99 %:ssa); 99 % → vain rivi PT:lle.
- Levy < 50 Gi tai lasku > 1 Gi/min yli 5 min; < 38 Gi ilmoitus, < 31 kriittinen.
- LEPÄÄ: rooli levossa > 15 min eikä jonossa aloitettavaa (scratchpad/tyojonot.md Päätoimittajan checkoutissa) → "LEPÄÄ: <rooli>, jono tyhjä". Oikeutetut levot (Laitetestaaja, Karttaseppä, omistajaa odottavat) eivät hälytä.

## Tyhjäkäyntivahti (Keskustelukanava 14.10.2026 klo 20.2x, omistaja: "kuka pitää huolen että codex ja claude eivät jää vahigossa tyhjäkäynnille?")
- CLAUDE: rooli levossa (isRunning false) yli 20 min, ja työlistalla (/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/data/talo/tyolista.json, tila "työn alla", rooli lisa-kentässä) tai junan ehdoissa on sille auki olevaa työtä → rivi PT:lle "TYHJÄKÄYNTI: <rooli> <min> min, auki: <kohde>" (kerran tunnissa roolia kohden). Jos tilanne jatkuu 20 min hälytyksen jälkeen, lähetä rivi myös Keskustelukanavalle (local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589). Tämä ei ole rutiinia.
- CODEX: aja joka kierroksella `python3 -I /Users/Shared/Claude/Matkakirja-posti/codex-odottaa.py`. Jos se tulostaa "CODEX ODOTTAA …", lähetä rivi PT:lle (kerran toimitusta kohden). Jos odotus ylittää 60 min, lähetä rivi myös Keskustelukanavalle.

## Työtilat
Kansiot /Users/Shared/Claude/ (wt/ ja Matkakirja-<rooli>); `tools/tarkista-tyotilat.sh` kierroksella tarvittaessa.

## Nollaus-siirto
PT konteksti < 10 % tai "ei prosessia" → send_message aloitusviesti PT:n antamalla tekstillä; jos PT käynnistyy itse, älä lähetä mitään.

## Roolien sessio-id:t
Katso /Users/Shared/Claude/osoitekirja.md (ainoa ajantasainen lähde; Linssiseppä 2 = Valoseppä 14.10.).

## Levyn tilapäinen sääntö (PT 14.05)
Levyä 10 min välein; hälytä PT:lle vain jos vapaa < 45 Gi tai lasku > 1 Gi/min vielä 14.20 jälkeen (14.03 lasku oli swapia, dsymutil ja uudet Unity-worktreet).

## Levyn pysyvä raja (PT 15.20, omistaja; Raamattu LEVYJAKO)
Käynnistyslevyllä aina vähintään 100 Gi vapaana. Kirjoita PT:lle yksi rivi heti kun vapaa < 100 Gi. Korvaa aiemman 45 Gi:n ja 1 Gi/min -säännöt.

## Aloitusviestit
Korvattu 14.10.: Postivahti lähettää kaikkien roolien aloitusviestit ja RC:n NOLLAUS.md:n mukaan.

## Asemataulu, junan edistys ja raati (PT 11.10., omistajan toive)
- Vienti artefaktiin 5 min välein, kun katsojan syke on tuore (`tools/asemataulu/syke.py`); roolit.json:n ts päivitetään käsin vientiin.
- Kun junat-dokumentissa on juna tilassa "käännöksessä": aja `python3 -I tools/juna-edistys.py <ajo-id>` jokaisella kierroksella ja kirjoita `edistys` + `valmis_arvio` ArtifactDatan update-kutsulla if_versionilla (sykkeestä riippumatta; muihin kenttiin ei koskea). Vaiheessa 5 tila "TestFlightissa" + rivi PT:lle.
- Raati ja Testaajat (omistaja 14.10. 22.4x): `python3 -I tools/raati-seuranta.py` ja testaajaluvut vain kerran päivässä klo 08 ja kun uusi TF-juna saapuu TestFlightiin; ei joka kierroksella. Rivi PT:lle vain kun luku kasvaa.

## Muistutus (11.10. 14.45): listaa talo joka kierroksella
`syke.py` lukee `lista/talo/katsoja.json`-kopiota. Aja `ArtifactData list` (collection talo, out_dir lista) AINA ennen `syke.py`:tä, muuten kopio vanhenee ja syke näyttää VANHA vaikka sivu on auki (vika 12.32–14.41: vienti jäi väliin). Aseta myös roolit.json:n ts ennen vientiä.

## Uusi rooli 11.10. 18.30: Äänittäjä (Sonnet 5.5, high)
Session local_16ee69c8-b917-4dcd-9060-3542c5e03e67, checkout /Users/Shared/Claude/Matkakirja-aanittaja (musiikki ja äänet). Kierroksella: get_usage(id) roolina 13, roolit.json-riviksi malli Sonnet, hälytysrajat kuten muilla. Rooleja nyt 13 (PT + 12 muuta).

## Omistajan vahvistus 14.10. 22.4x (chatissa): PT:n pyynnöt 22.20 ja 22.34
- TF-ketju: joka kierroksella lue uusin `/Users/Shared/Claude/julkaisija-tyokalut/tf*-ketju.log`. Jos SISÄINEN/ULKOINEN-rivi on uusi eikä talo/eteneminen tai PT ole saanut sitä → rivi PT:lle ja Keskustelukanavalle (local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589): "TF N sisäisillä klo HH.MM".
- Herättäjä (PT:n JONOKIERROS-cron poistuu): herätä PT send_messagella vain kun on tehtävää: rooli levossa ilman jonoa tai hiljaa > 20 min; uusi Codex-posti (origin/claude/postilaatikko posti/codex-fable-*); uusi omistajan äänisivuvalinta (`node scratchpad/aanisivu-valinnat.mjs --nyt` Päätoimittajan checkoutissa); levy < 80 Gi; kontekstiraja; TF-ketjun vaihe; ODOTTAA. Yksi koottu rivi per herätys.
- Kierrosväli: 20 min, kun kaikki roolit lepäävät eikä junaa ole käynnissä; muuten 4–5 min.
- Raati/Testaajat-harvennus vahvistettu 22.40 ja roolien nollausraja 35 % vahvistettu 22.50 (ks. yllä ja Hälytysrajat). EI vielä vahvistettu: wt/-siivousrivi rooleille.

## Asemataulun BOOST (omistaja 14.10. 23.39, PT:n välittämä)
Joka kierroksella lue tämän tilin taulun (Qo5w6Wk4JSYRwYbyf2fJrm) `talo/boost` (ArtifactData get). Jos `paalla:true` ja `paattyy` > nyt eikä Asemataulua ole herätetty tämän boostin aikana, herätä Asemataulu-sessio (local_aea9822b-c1c9-40aa-aecc-e84d19148a8c) send_messagella: "BOOST päällä klo HH.MM–HH.MM". Kirjaa herätys muistiin (boostin `paattyy`), ettei herätä kahdesti. Muulloin Asemataulua ei herätetä mittareita varten.

## ASEMATAULUTAUKO PÄÄTTYI (omistaja 15.10. 08.11: "käynnistä taulu"; viennit, juna-edistys, talon tilan taulukirjaus ja BOOST-herätys jatkuvat normaalisti). Vanha tauko-ohje historiana (omistaja 15.10. 01.32: "lopeta asemataulun päivitys. menen nukkumaan")
Ei vientejä Asemataululle (syke.py/artefaktivienti, talon-tilan taulukirjaus, juna-edistyksen ArtifactData-kirjaus) eikä viestejä Asemataulu-sessiolle (BOOST-herätys mukaan lukien), ennen kuin Keskustelukanava välittää omistajan käskyn jatkaa. Muu kierros ennallaan.
