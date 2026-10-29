# Postivahdin kierros (pysyvä ohje; PT 9.10.2026)

Kaikki viestit suomeksi, yksi rivi PT:lle (PÄÄTOIMITTAJA local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, 14.10. alkaen; local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe on nyt KESKUSTELUKANAVA, sitä ei nollata eikä sille lähetetä rutiinia). Ei pushia omistajalle.
OSOITTEET: /Users/Shared/Claude/osoitekirja.md (send_message id:llä). ROOLIEN NOLLAUKSET: NOLLAUS.md (Postivahti hoitaa alusta loppuun, omistaja 14.10.).
Kierros 4–5 min välein ScheduleWakeup, prompt: "Lue /Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan".

## Joka kierroksella
1. `get_usage` (ilman id:tä): 5 h ikkuna ja viikko.
2. `list_sessions` (limit 14): isRunning, lastActivityAt.
3. KONTEKSTIT – PAKOLLINEN JOKA KIERROKSELLA, myös harvennetulla (omistaja 15.10. 14.39: "varmista että jatkossa ei tapahdu"; 12.19–14.34 tämä jäi 21 kierroksella tekemättä ja PT ehti 59 %:iin): `get_usage(session_id)` AINA Päätoimittajalle (local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc) ja Keskustelukanavalle (local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe) sekä jokaiselle roolille, jonka lastActivityAt on muuttunut edellisen luennan jälkeen. Kierroksen loppuriville luvut muodossa "PT 31 %, KK 22 %, PK 18 %"; kierros ilman PT:n lukua on kesken.
4. Levy: `df -h /`.
5. Talon tila 10 min välein (tiedosto /Users/Shared/Claude/Matkakirja-fable/scratchpad/talon-tila.json, kentät `paivitetty` (date +%H.%M) ja `roolit`; älä koske `junat`/`huom`). Kirjoita python3:lla .tmp → os.replace.

## Hälytysrajat (rivi PT:lle, kukin vain kerran per raja)
- Nollausrajat liukumalla (omistaja 14.10. 22.52–22.58): pehmeä raja → nollaus ensimmäisellä luontevalla tauolla (tehtävä valmis, muutos pushattu tai odotus käännökseen); kova raja = pehmeä +10 %-yks. Pehmeä–kova: Postivahti 20–30; koodi-, kartta- ja sisältöroolit + Julkaisija + Asemataulu 25–35; PT + Laitetestaaja + Äänittäjä 30–40; Keskustelukanava 40–50. Rooli konteksti ≥ pehmeä raja → rivi PT:lle kerran roolia kohden (uudelleen kovalla rajalla). KOVALLA RAJALLA rivi myös SUORAAN ROOLILLE (KK 15.10. 16.1x: Linnanrakentaja kasvoi 39 → 48 %, kun PT oli omassa nollauksessaan): "KOVA RAJA <x> % (raja <k>): viimeistele käynnissä oleva askel, tee luovutus + push ja lähetä Postivahdille LUOVUTUS VALMIS". Kun rooli luovuttaa (LUOVUTUS VALMIS), Postivahti nollaa NOLLAUS.md:n mukaan. Roolit saavat nollata itsensä heti luovutuksen jälkeen kysymättä omistajalta (pysyvä lupa 22.52).
- EI NOLLAUSTA KÄYNNISSÄ OLEVAN KÄÄNNÖKSEN/LUKITUKSEN PÄÄLLE (PT 17.10. 21.5x: NS:n nollaus 21.55 tappoi käynnissä olleen LUKITSE 200 -käännöksen, omistajan julkaisupyyntö viivästyi): jos roolin LUOVUTUS VALMIS -rivi tai luovutus mainitsee käynnissä olevan käännöksen/lukituksen/pitkän ajon, tai rooli sanoo "vien X loppuun ennen nollausta", ÄLÄ lähetä NOLLAUS-viestiä eikä clear_session: odota roolin uutta LUOVUTUS VALMIS -riviä (ajon valmistuttua). Kovan rajan yli saa mennä siihen asti. Tarkista ennen jokaista NOLLAUS-viestiä luovutuksen teksti (git show / luovutustiedosto) tällaisen käynnissä olevan ajon varalta; epäselvässä tapauksessa kysy rooliin yhdellä rivillä.
- KÄÄNTEINEN CODEX-VAHTI (PT 17.10. 22.0x, omistaja 22.02, KK päätti): jokaisesta Claude→Codex-tilauksesta haarassa claude/postilaatikko (posti/<rooli>-codex-<aihe>-*, esim. paatoimittaja-codex-*, pelikoodari-codex-*), johon ei 60 min kuluessa ole tullut Codexin kuittausta tai toimitusta (posti/codex-*-tiedosto/kansio tai Codexin commit samasta aiheesta), rivi KK:lle (local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe) KERRAN: "Codex hiljaa <tilaus> klo X:stä". Täydennykset samaan aiheeseen (esim. j8–j10 täydennys 1–3) lasketaan samaksi tilaukseksi: aika = ENSIMMÄINEN tilaus. Joka kierroksella: `git -C /Users/Shared/Claude/Matkakirja-fable fetch origin claude/postilaatikko` + `git log origin/claude/postilaatikko --since='3 hours ago' --format='%h %ci %s'` + `git ls-tree -r --name-only origin/claude/postilaatikko | grep '^posti/'`. Auki 22.02: j8–j10 (e97acee09, 21.52) → raja 22.52.
- PÄÄTOIMITTAJA (KK 15.10. 14.5x omistajan pyynnöstä 14.39): ≥ 30 % → rivi PT:lle "KONTEKSTI PT <x> % ≥ 30: ei uusia isoja tehtäviä, luovutus seuraavalla tauolla" (kerran). ≥ 40 % = PAKKONOLLAUS: rivi PT:lle "KOVA RAJA PT <x> %: kirjoita luovutus ja aloitusviesti nyt, tallenna keskustelu ja lähetä LUOVUTUS VALMIS" ja sama tieto Keskustelukanavalle yhdellä rivillä. LUOVUTUS VALMIS → nollaa NOLLAUS.md:n mukaan. Jos luovutusta ei tule 20 minuutissa → rivi Keskustelukanavalle "PT JUMI KOVALLA RAJALLA <x> %".
- KK 18.10. 02.0x (omistaja nukkumassa 02.02): ei KK-muistutuksia yöllä; seuraava vasta jos KK ≥ 55 %. Nollauskortti aamulla.
- Keskustelukanava local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe (omistaja 14.10. 22.55): konteksti ≥ 35 % → rivi KESKUSTELUKANAVALLE "päivitä aloitus.md"; ≥ 40 % → rivi KESKUSTELUKANAVALLE "kysy omistajalta nollaus" (ei 55/65). Ei itsenäistä nollausta; vain Keskustelukanavan nollaus kysytään omistajalta kortilla.
- 5 h ikkuna 70, 85, 95 % (+ arvioitu täyttymisaika); tauko 98 %:ssa.
- Viikkoraja tällä päätilillä (omistaja 18.10. 01.03): 99 %, juna 201 valmiiksi; nollautuu ma 19.10. klo 09.59. Hälytykset 96 % ja 99 % (99 %:ssa vain rivi KK:lle). Ei 50 %:n siirtopromptia.
- OMISTAJAN PÄÄTÖS 18.10. klo 16.10 (KK välitti): luovutuspromptia ei tarvitse tehdä, voi käyttää koko 100 % → päätilin viikkoraja 100 % (nollautuu ma 19.10. klo 10.00): EI 98 %/99 % -hälytyksiä siirtopromptin tai luovutuksen vuoksi, ei sessioiden pysäytystä. Juna 202 julkaistu 14.50. Kierros 20–25 min kun roolit levossa.
- OMISTAJAN PÄÄTÖS 18.10. klo 16.19 (KK välitti): "älä tee mitään, kredittejä enää 2 % … ei jutella enempää ellei pakko" → EI muistutuksia KK:lle (konteksti, aloitus.md, nollaus) eikä muita rutiiniviestejä ennen ma 19.10. klo 10.00; KK ei nollaudu tänään. Kierrokset minimiin: vain tunnin välein ScheduleWakeup ilman get_usage-kyselyjä; viestit vain jos pakko (levy <25 Gi tai Codex >60 min).
- Viikko: 96 % → rivi PT:lle (EI siirtopromptipyyntöä; omistaja nollaa kiintiön 99 %:ssa); 99 % → vain rivi PT:lle.
- Levy < 50 Gi tai lasku > 1 Gi/min yli 5 min; < 38 Gi ilmoitus, < 31 kriittinen.
- LEPÄÄ: rooli levossa > 15 min eikä jonossa aloitettavaa (scratchpad/tyojonot.md Päätoimittajan checkoutissa) → "LEPÄÄ: <rooli>, jono tyhjä". Oikeutetut levot (Laitetestaaja, Karttaseppä, omistajaa odottavat) eivät hälytä.

## Tyhjäkäyntivahti (Keskustelukanava 14.10.2026 klo 20.2x, omistaja: "kuka pitää huolen että codex ja claude eivät jää vahigossa tyhjäkäynnille?")
- CLAUDE: rooli levossa (isRunning false) yli 20 min, ja työlistalla (/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/data/talo/tyolista.json, tila "työn alla", rooli lisa-kentässä) tai junan ehdoissa on sille auki olevaa työtä → rivi PT:lle "TYHJÄKÄYNTI: <rooli> <min> min, auki: <kohde>" (kerran tunnissa roolia kohden). Jos tilanne jatkuu 20 min hälytyksen jälkeen, lähetä rivi myös Keskustelukanavalle (local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe). Tämä ei ole rutiinia.
- CODEX (korjattu omistajan kortilla 17.10.2026 klo 07.25): aja joka kierroksella `python3 -I /Users/Shared/Claude/Matkakirja-posti/codex-odottaa.py`. Se katsoo KAIKKI Codexin viestit posti/codex-<rooli>-* ja vastaukset posti/<rooli>-codex-* (72 h). "CODEX ODOTTAA <min> min: …" (≥ 30 min) → rivi PT:lle (kerran viestiä kohden; PT vastaa itse tai antaa roolille). "CODEX ODOTTAA YLI 60 MIN …" → rivi myös Keskustelukanavalle JA Asemataulun VAATII TOIMIA -rivi (talo toimi-codex-odottaa), kunnes skripti ei enää tulosta viestiä; sitten rivi pois.
- CODEXIN TAHTI (omistaja 16.10.2026 klo 18.05 PT:n välittämänä, Raamattu #4711; PT tarkensi 18.1x): yleistä ledger.jsonia ei ole (peking342:n tavuledger ei ole käytössä). Tarkista vain claude/postilaatikko: uusin codex-*-toimitus (commit-aika) vs. uusin Clauden vastaus samaan aiheeseen (esim. *-peking360-*). Toimitus ilman vastausta yli 30 min → rivi PT:lle "CODEX ODOTTAA <tiedosto> <min>" (kerran toimitusta kohden). Tämän hoitaa codex-odottaa.py; ajetaan joka kierroksella (yllä).

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
Session local_f8fe7e20-fba8-433d-ba8e-184a325037ef, checkout /Users/Shared/Claude/Matkakirja-aanittaja (musiikki ja äänet). Kierroksella: get_usage(id) roolina 13, roolit.json-riviksi malli Sonnet, hälytysrajat kuten muilla. Rooleja nyt 13 (PT + 12 muuta).

## Omistajan vahvistus 14.10. 22.4x (chatissa): PT:n pyynnöt 22.20 ja 22.34
- TF-ketju: joka kierroksella lue uusin `/Users/Shared/Claude/julkaisija-tyokalut/tf*-ketju.log`. Jos SISÄINEN/ULKOINEN-rivi on uusi eikä talo/eteneminen tai PT ole saanut sitä → rivi PT:lle ja Keskustelukanavalle (local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe): "TF N sisäisillä klo HH.MM".
- Herättäjä (PT:n JONOKIERROS-cron poistuu): herätä PT send_messagella vain kun on tehtävää: rooli levossa ilman jonoa tai hiljaa > 20 min; uusi Codex-posti (origin/claude/postilaatikko posti/codex-*, kaikki vastaanottajat); uusi omistajan äänisivuvalinta (`node scratchpad/aanisivu-valinnat.mjs --nyt` Päätoimittajan checkoutissa); levy < 80 Gi; kontekstiraja; TF-ketjun vaihe; ODOTTAA. Yksi koottu rivi per herätys.
- Kierrosväli: 20 min, kun kaikki roolit lepäävät eikä junaa ole käynnissä; muuten 4–5 min.
- Raati/Testaajat-harvennus vahvistettu 22.40 ja roolien nollausraja 35 % vahvistettu 22.50 (ks. yllä ja Hälytysrajat). EI vielä vahvistettu: wt/-siivousrivi rooleille.

## Asemataulun BOOST (omistaja 14.10. 23.39, PT:n välittämä)
Joka kierroksella lue tämän tilin taulun (osoite: kenttä `taulu` tiedostossa /Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/nykyinen.json; speksi docs/moduulit/asemataulu.md luku 1) `talo/boost` (ArtifactData get). Jos `paalla:true` ja `paattyy` > nyt eikä Asemataulua ole herätetty tämän boostin aikana, herätä Asemataulu-sessio (id: kenttä `idt.asemataulu` samassa nykyinen.json-tiedostossa) send_messagella: "BOOST päällä klo HH.MM–HH.MM". Kirjaa herätys muistiin (boostin `paattyy`), ettei herätä kahdesti. Muulloin Asemataulua ei herätetä mittareita varten.

## ASEMATAULUTAUKO PÄÄTTYI (omistaja 15.10. 08.11: "käynnistä taulu"; viennit, juna-edistys, talon tilan taulukirjaus ja BOOST-herätys jatkuvat normaalisti). Vanha tauko-ohje historiana (omistaja 15.10. 01.32: "lopeta asemataulun päivitys. menen nukkumaan")
Ei vientejä Asemataululle (syke.py/artefaktivienti, talon-tilan taulukirjaus, juna-edistyksen ArtifactData-kirjaus) eikä viestejä Asemataulu-sessiolle (BOOST-herätys mukaan lukien), ennen kuin Keskustelukanava välittää omistajan käskyn jatkaa. Muu kierros ennallaan.

## Yöajo: simujen taustakuvavälimuisti (PT 17.10. 10.1x, JU:n ehdotus)
Kerran vuorokaudessa yökierroksella (klo 02–05, ei hiljaisella tunnilla): `zsh /Users/Shared/Claude/julkaisija-tyokalut/poster-tyhjennys.zsh`. Skripti ohittaa käynnissä olevat simut ja tyhjentää vain sammutettujen T7-simujen PRBPosterExtensionDataStore-kansion. Tuloksen viimeinen rivi (T7 vapaa) PT:lle vain, jos skripti epäonnistuu.

## Ohjetarkistus (PT 20.10. 22.2x, omistajan päätös 22.24 C1)
Kun PR #5072 on mainissa (tools/tarkista-ohjeet.sh löytyy origin/mainista): kerran tunnissa `git fetch origin` ja aja `bash tools/tarkista-ohjeet.sh` origin/mainin versiosta. Uudet löydökset yhtenä rivinä PT:lle; sama löydös vain kerran. Viestit varakanavalla (mcp__ccd_session_mgmt__send_message), jos SendMessage-raja on täynnä.
