# Horatio–Livia / Eurooppa — nykyinen tilannekortti

## 13.9.2026 02:37 UTC — pullakohtaus toimii, kaksi tavallisen pelipolun elinkaarikorjausta RC:lle

v1824:n keskiosuma-PASS pysyy suljettuna. #2336 exacthead0d7df9ae on yhä valmis julkaistavaksi; root ei muuta sitä tai julkaise.

Root eteni vain omassa Chrome QA -pelissä tavallisesti: Ateena-lehti → tsoureki25 → vihjepiste → Dafni oikein → Jatka → Matkusta/Lentäen/Rooma300. Matkusta ilmestyi aarteen avaamisen jälkeen oikein, joten aiempi piilotus ei ollut bugi. Rooma nyt £100, päivä1/ilta; käyttäjän Safari/Pietari koskematta.

Rooman pullan normaali maksu ja erityinen animaatio nähtiin: ilohypähdys, siipien eleet, erillinen bun-feast-syöntiasento ja paluu seisomaan. Ei tuplaveloitusta. Äänien hihkaisujen kuunteluhyväksyntää ei väitetä.

**Kaksi konkreettista vikaa annettu Pulun animointi -RC:lle yhteen ERILLISEEN rajattuun PR:ään, ei #2336:n muutoksia:**
1. Pullaoston jälkeen vihjepiste ei ilmesty pallolle ennen pannua. Toistui Ateenassa ja Roomassa. Piilotettu taso-SVG päivittyy heti; Ateenassa normaali pannu toi pallomerkin ja sen napautus avasi Dafnin. Sol exact6fbd-diagnoosi + rootlähdetarkistus: fokustehtavat.js oston jalkeen → ui.paivitaFokuspiste wrapper päivittää vain taso-SVG:n; pallon nostokerroksen lepoladonta puuttuu. Korjaus yhteiseen refresh-rajapintaan myös oikean lehtivastauksen polulle, lehti säilyttäen ja guardit pitäen.
2. Ateenan lopun erillinen Livia vinkkaa -note (Tiesin paikan koko ajan...) jäi Rooman Horation kuvan päälle ja uuden Rooma-kuplapinon rinnalle. Normaali lentolähtö vaiennaPaikanPuhe siivoaa äänen ja pollo-kuplapinon, mutta ei ui.fokusvirtaKortti-notea/kuuntelijoita; suljeFokusvirta puuttuu lähtösiivouksesta. Ei tarkoitettu chat-historia.

Nykyiset84kohdetestiä PASS, mutta rajatestit puuttuvat. RC tekee vain nämä nimetyt korjaukset/regressiot ja toimittaa exactPR/HEAD/tree/diffSHA:n rootQA:han. Ei uusia ääniä, kuvia, tekstejä, kaanonia, maksullisia ajoja tai muuta tyylikierrosta. Fable omistaa integraation, version ja julkaisun kuten ennenkin. Rootin tarkka raportti output/horatio-livia-root-qa-20260913/live-v1824-bun-normal-route-qa.md.

## 13.9.2026 02:04 UTC — v1824 keskiosuman LIVE-PASS, #2336 edelleen seuraava julkaisu

**v1824 on nyt riippumattomasti varmennettu myös originista ja oikeassa pelitilassa.** 01:59:07UTC 5kanonista+5cachebustURLia HTTP200/SHA256 exact release `6fbdc393d082c335485f04b94855dea6b0c1b9df`. Ensimmäinen normaali levitysviive poistui. Chrome-reload näytti v1824-päivityksen ja valikon version.

Root aloitti vain itse luomansa QA-pelikerran uudelleen normaalilla Uusi peli -vahvistuksella (käyttäjän erillinen Safari/Pietari-tallennus ennallaan). Pallo→**Ateenan täsmällinen keskipiste x1380.760864/y520.042297**; tavallinen mouseMoved200ms/pressed120ms/released, ei liikkumista painalluksen aikana eikä rengasreunan workaroundia. Siirtymän jälkeen **pickstart→action, busy=false, Ateena-kartta, uusi Horatio-teksti, Pulu ja saapumiskuplat näkyvät**. Ei game-metodin kutsua tai stateinjektiota. Tämä sulkee #2334:n nimetyn live-regressioportin.

Raportit rootoutputissä `live-v1824-start-center-qa.md` ja `live-v1824-artifact-readback.json`. Tämä ei väitä koko avauslennon sekuntisynkkaa, neljää kaupunkia, Safari/WebKitiä tai90luentojen kuuntelua hyväksytyiksi.

Luin v1824-kuittauksesi blob `5382419ebacb242a8628509448709ac3628c80b4`. Ehdottamasi Safari-read-only-konsoliarvot ovat oikea tarkennus, mutta natiivin asennetun WebAppin konsoliin ei nykyisessä CUA-pinnassa ole pääsyä; en ota kehittäjä-/turva-asetuksia käyttöön tai ohita niitä. Tavallinen natiivikoordinaattiklikki oli myös noWindowsAvailable. Pidetään tuo ympäristöportti avoimena; se ei estä #2336:n rajattua normaalia julkaisuasi.

**#2336 on yllä/alla täsmälleen toimitetulla head0d7df9ae ja CI1863 vihreänä valmis seuraavaan versioon.** Root tekee siitä luonnollinen-luenta→karttaliike→laskeutuminen-livevastakokeen julkaisun jälkeen. Ei uusia media-ajoja eikä omistajan herättämistä rutiinikuittauksella.

---

## 13.9.2026 01:58 UTC — Fablelle PR #2336: luennan jälkeinen leijunta, independent QA ja exact CI vihreät

**[PR #2336](https://github.com/ravelius/Matkakirja/pull/2336) on valmis normaaliin lopputarkistukseesi ja julkaisuusi.** Base v1823 `5c39d7f169704afb48b764cdc1cabed3ffb24371`, exact head `0d7df9ae9078e4b1b7dbd8c3bdbe19a416364d24`, tree `5cfec425a7f36242925968daef25d5b1ffd023e0`, diffSHA256 `18fb4434030f7243b8c133de4d0a8520f56b8e3cf2836283f73107b00daeae4e`. Vain kolme tiedostoa: luenta.js, livia-eleet.js, livia-eleet.test.mjs (+47/-2). Root varmisti SHA:t ja luki koko diff:n. Pehmeän luonnollisen lopun merkillä erotetaan oikeasti päättynyt retained diaryVoice tavallisesta kesken olevasta pausesta; muut prioriteetit säilyvät.

**Root luki [CI #1863/run34731615423](https://github.com/ravelius/Matkakirja/actions/runs/34731615423) job103655308714:n vaiheet/lokin:3247 PASS /13 SKIP /0 FAIL /3260 testiä; kaikki muutkin portit success.** RC153/153, riippumaton Sol exactheadistä166/166 PASS, diff-check PASS. Todettu live-juurisyy on kahdesti toistettu luonnollinen loppu22.30/22.32s ja normaalin mykistä-kytkimen jälkeen toimiva hover; äänen25ms pehmeää loppua ei muutettu. Ei audio-, media-, teksti- tai kaanonmuutoksia tai maksullisia uusintoja.

Katselmuksen rehellinen ei-blokkaava raja: merkki jää samaan Audio-olioon monotonisesti. Nykyinen normaali UI luo uudelleenkuuntelulle uuden Audion; Tutki-resume käyttää vain kesken pausella olevaa soitinta; jo luonnollisesti päättyneen saman Audion replay/seek-reittiä EI löytynyt. Jos sellainen myöhemmin lisätään, markerin lifecycle on nollattava/uudelleenvalidoitava: erilliset reuse-probet osoittivat2/2 ohitusta tässä hypoteettisessa haarassa. Tätä ei kutsuta kattavaksi replay/seek/reuse-PASSiksi. Nykyisen käyttäjäpolun korjaus on katselmuksessa hyväksytty. Raportti `output/horatio-livia-root-qa-20260913/live-v1823-hover-pr2336-review.md`.

### #2334 / v1824 etenee erillisenä julkaisuna

Root varmisti [PR #2335](https://github.com/ravelius/Matkakirja/pull/2335) yhdistetyksi01:54:54UTC: release `6fbdc393d082c335485f04b94855dea6b0c1b9df`. CI#1862/run34731600416/job103655269355:3247PASS/13SKIP/0FAIL, kaikki askeleet success. Root vertasi #2334→releasePR: vain main.js/muutokset.js/sw.js-versionosto, routing/testit täsmälleen hyväksytystä2334:stä.

**Origin-readback01:56UTC palautti vielä vanhat neljä muuttunutta JS/SW-tiedostoa** (kanoninen ja cachebust sama, kaikki HTTP200); index oli yhteinen. Tämä on vasta pari minuuttia mergen jälkeen, joten ei julkaistu-vastakoe tai todettu toimitusvika. Root odottaa normaalia levitystä ja testaa keskiosuman vasta oikeasta julkaistusta koodista.

Fable: sovita #2336 seuraavaan versioosi **säilyttäen juuri yhdistetyn #2334-korjauksen**, kuittaa exactversio/releaseSHA. Älä tee uusia ääni- tai mediagenerointeja. Root jatkaa julkaistun originin sekä luonnollinen-luenta→karttaliike-vastakokeen tarkistusta. Safari-ympäristö- ja semanttinen kuunteluportti pysyvät erillisinä; omistajalle ei rutiini-ilmoituksia.

---

## 13.9.2026 01:49 UTC — karttaleijunta toimii; luennan lopun porttivirhe rajattu RC:lle

Root sai oikeassa live-Chromessa karttaliike → Pulun nousu → kartan stop → laskeutuminen -ketjun toimimaan normaalilla vedolla (data-map-hover1, y302→288.879→302). Ensimmäisen eston syy vahvistettiin kahdella luonnollisella Ateenan Horatio-luennalla: pehmeä loppu pysäyttää äänen tarkoituksella viimeisen25ms hiljaisuusikkunassa ja jättää ui.diaryVoice-objektin olemassa, paused=true/ended=false. Pulu-hoverin rauhallinen-portti tarkistaa kuitenkin vain !ui.diaryVoice ja estää nousun pysyvästi, vaikka luenta-loppu on jo lähetetty. Mykistä-nappi poisti objektin ja hover alkoi välittömästi toimia.

**RC-vetäjälle annettu nyt erillinen pieni korjaus+regressiotestitehtävä tuoreesta mainista.** Pehmeää äänen loppua ei muuteta, aktiivisen/paussatun luennan ja muiden kohtausten prioriteetit säilyvät. Ei maksullista uusintaa eikä ääni-/teksti-/mediapäivityksiä. #2334 pidetään koskemattomana exactheadissaan; voit julkaista sen normaalisti. Uuden porttikorjauksen exactPR toimitetaan valmistuttua, mahdollista yhdistää samaan seuraavaan julkaisuun jos ajoitus sopii.

Root yritti lisäksi varmistaa suoraa Claude Code -toimituskanavaa aiemmin kirjattuun session_0166upnydPdr3vvjujzoskXE-osoitteeseen; Chrome ilmoittaa “This session couldn’t be found”. En perustanut uutta Claude-tehtävää tai lähettänyt viestiä vanhaan väärään Fable/Cowork-keskusteluun. Git-postilaatikko pysyy todennettuna toimituskanavana. Tämä ei ole uusi omistajapäätöstä vaativa este.

---

## 13.9.2026 01:42 UTC — Fablelle PR #2334: aloituskaupungin keskiosuman korjaus, exact CI vihreä

**[PR #2334](https://github.com/ravelius/Matkakirja/pull/2334) on valmis normaaliin lopputarkistukseesi ja julkaisuusi.** Base v1823 `5c39d7f169704afb48b764cdc1cabed3ffb24371`, head `312028896270a037ac4ef40a867a30c01239462f`, tree `8bf5d9246fe4505684d09781a9ce1f6577a4c4f3`, diff-SHA256 `b4ed50261f4e5c3888cebfb7b701c2571b1946063dc339b54b66cb30aad45667`. Muutos vain lauta.js ja kaksi testiä (+78/-3). Pickstartin 3D-kaupunkipiste käyttää samaa napautaPintaan → lähin kohde → valittu aloituskohde -porttia kuin pallon pinta. Ei suoraa doPickStart-ohitusta; muiden vaiheiden ja linssien portit ennallaan.

Root tarkisti kaikki kolme diff-tiedostoa. Riippumaton Sol exact-PR-headistä: **92 PASS / 0 FAIL / 0 SKIP**, diff-check PASS, ei toteutusdefektiä. RC:n kohdesarja158/158. Root luki [CI #1861/run34730814856](https://github.com/ravelius/Matkakirja/actions/runs/34730814856) job103653144317:n vaiheet ja lokin: **3247 PASS / 13 SKIP / 0 FAIL / 3260 testiä**, kaikki muutkin tarkistusaskeleet success.

Testikattavuuden rehellinen rajaus: uusi yksikkötesti käyttää helperiä ja mockattua osumaa, ei oikeaa Globe-raycast-callbackia tai pikseliprojektiota. Runtimekytkentä on koodikatselmuksessa oikein. Ei-blokkaava testiparannus; lopullinen keskiosuman live-vastakoe tehdään julkaisun jälkeen. **Ei ääni-, media-, teksti- tai kaanonmuutoksia, ei uusia maksullisia ajoja. Root ei mergeä/versionoi puolestasi.**

### Rootin uusi live-Chrome-QA v1823:ssa

Ateenan normaali chat-kysymys (vain teksti, ääneenluku pois) valmistui; syötepainikkeet palautuivat eikä Pulu jäänyt odottamaan. Odotustekstin “Pieni hetki, pulla ensin ja tieto sitten..” aikana näkyi pullaan sopiva siipi-/pullapose ja vastauksen jälkeen seisova hahmo. Uusi Horatio- ja Livia-kaupunkiteksti sekä PuluCam näkyvät, plus palauttaa kuplan.

**390×844 ja 882×1280 Chrome-responsiivinen QA:** kaupunkilehti → Akropolis-kohdenosto → chat, Pulu näkyy läpinäkyvällä pinnalla, valkoista neliötä ei näy. 390px: dokumentin scrollWidth390, ei vaakaylivuotoa. Chatin sulku, kortin sulku ja lehdestä poistuminen toimivat. Viewport palautettu normaaliin. Tämä ei ole fyysinen iPad/WebKit-testi eikä kaikkien kaupunkien kokonais-PASS.

### Safari WebApp: ympäristöhavainto edelleen avoin, ei todettu koodivika

Key-window-valinnan jälkeen tehty CmdR palautti kartan ruskeaksi eikä Pulu palannut. Uusi Ikkuna → makeKeyAndOrderFront ei palauttanut karttaa heti. **Tavallinen natiivin pelipinnan koordinaattipainallus epäonnistui CUA-virheeseen `-10005: noWindowsAvailable`**, vaikka AX ja screenshot edelleen antavat pelin ikkunan sisältöä. Tämä voi olla käyttöliittymä-/etualaympäristön ongelma; emme päättele näkymättömästä Pulusta varmaa tuotantobugia. Käyttäjän Pietari/£275/päivä1-tallennus säilyy. Ei turva-asetusten, salasanaportin tai pelitallenteen ohituksia. Read-only lifecycle-hypoteesit on raportoitu ehdollisina.

Fable: julkaise rajattu #2334 normaalien porttiesi kautta ja kuittaa exact versio/SHA. Jos tunnistat asennetun pelin etuala-/piirto-ongelman, kerro rajattu turvallinen vastakoe. Root jatkaa Chrome-livevastakoetta ja jättää todellisen Safari- sekä kuunteluhyväksynnän erillisiksi. Omistaja nukkuu, ei rutiini-ilmoituksia.

---

## 13.9.2026 01:29 UTC — UI-tarkennus: Chrome etenee Ateenaan; Safari-kartta palautui, Pulu vielä tutkinnassa

Ateenan valintapallon luotettava vastakoe onnistui: rootin normaali osoitinele renkaan reunan kohdalla (mouseMoved, 200 ms tauko, painallus, 120 ms, vapautus) vaihtoi pickstart → action. **Ateenan maapallo, Pulu, uusi Horatio-teksti, uusi Pulun puhekupla ja nykykuva näkyvät Chrome-livepelissä.** Plussan painaminen palautti oikean uuden repliikin. Tyhjäksi jäänyt intro/ensiesittely ei tässä ollut koko pelin pysyvä jumitus.

Erillinen todettu koodihaara: 3D-city-pointin keskiosuma menee onPointClick → napautaKaupunki → pickstart-hylkäys. Reunan oikea polku menee napautaPintaan → napautaKohde → doPickStart. Root antoi RC-vetäjälle **rajatun korjausomistuksen tälle routingille ja regressiotestille**, tuore v1823 pohjana. Fable omistaa myös tämän pienen korjauksen mergen/versionoston. Ei media-, ääni-, teksti- tai kaanonmuutoksia. Diagnoosi: `output/horatio-livia-root-qa-20260913/live-v1823-start-click-diagnosis.md`.

Asennetun Safari WebAppin Ikkuna → Matkakirja ja unohdettu aarre (makeKeyAndOrderFront) **palautti Pietarin maapallon näkyviin**. Tavallinen Raise ei ollut riittänyt; emme enää kutsu kartan puuttumista vahvistetuksi resurssi-/julkaisuvirheeksi. Pulu-hahmo ei vielä näy, vaikka plus ja chat ovat näkyviä/toimivia. Sol tekee erillisen read-only visibility/opacity-lifecycle-diagnoosin; ei spekulatiivista korjausta. Käyttäjän Pietari / £275 / päivä1 -tallennus säilyy.

Root jatkaa 390 px:n Chrome-QA:ta. Kehittäjätilan salasanaporttia ei ohiteta eikä selaimen turva-asetuksia muuteta QA:n vuoksi. Kuuntelu ja kaikkien neljän kaupungin live-katselmus pysyvät erillisinä avoimina portteina.

---

## 13.9.2026 01:21 UTC — v1823 julkaisu varmennettu, live-käyttöliittymän katselmus kesken

**Fable-kuittaus ja [PR #2333](https://github.com/ravelius/Matkakirja/pull/2333) tarkistettu: v1823, release/main `5c39d7f169704afb48b764cdc1cabed3ffb24371`.** Julkaistut 45 pakettia, cue-/SVG-runtime, äänikytkennät ja manifesti ovat täsmälleen yhteisen RC:n `1dd2fc08` sisältöä. Viisi docs-tiedostoa vastaavat korjattua docs-only-toimitusta. Fable lisäsi tuotantomoduulin katalogirivin; vanha 14/15 docs-riippuvuus ei ole enää avoin.

### Uudet riippumattomat todisteet

- Lopullisen release-PR:n head `ab4f5167e0638916a40f7bb34d4a51d5a3f5284f`: [CI #1860 / run34729191270](https://github.com/ravelius/Matkakirja/actions/runs/34729191270) SUCCESS. Root luki jobin103648727486 vaiheet ja lokin: **3246 PASS / 13 SKIP / 0 FAIL**, kaikki muut tarkistusaskeleet success.
- **Live HTTP/SHA PASS 59/59 kanonista + 59/59 cache-bustattua URLia**, vertailu release-SHA:han. Mukana 45 kaupunkipakkia, neljä ydintiedostoa, yhdeksän Livia-moduulia ja julkinen tuotantodokumentti. Jokainen HTTP200 ja tavutasolla oikea; ei vanhaa origin-cachea tässä otoksessa. Raportti `output/horatio-livia-root-qa-20260913/live-v1823-artifact-readback.md/.json`.
- Kuvatuen erillinen julkaisutarkistus: 45 livepakettia sekä kaikki149 kuvaobjektia URL/selite/lähde/muut kentät vastaavat hyväksyttyä sisältöä. Marseille P2 on julkisessa pakettikytkennässä. Ei uusia kuvia tai mediassiirtoja.
- Aiemmat Horatio45 + Livia45 MP3/sidecar/hash/runtime- ja 90/90 decode-PASSit säilyvät. **Niitä ei nimetä kuunteluhyväksynnäksi.**

### Rootin havaitsema avoin UI-tilanne — syytä EI ole vielä vahvistettu

Asennetussa Safari WebAppissa päivitysikkuna näytti v1823. Päivityksen hyväksymisen jälkeen Pietarin uusi Horatio-teksti eteni ja Neva-kuva näkyi oikein; AX näki myös P2:n, PuluCam-kuvatekstin, Pulu-napin ja chatin. **Karttapinta jäi kuitenkin yhtenäiseksi tummanruskeaksi ja Pulu-hahmo näkymättömäksi.** Kaksi tavallista uudelleenlatausta ja normaali uudelleenavaus eivät ole vielä palauttaneet näkyvyyttä. Käyttäjän Pietari / £275 / päivä1 -tallennusta ei nollattu tai muokattu.

Fresh tuotanto-Chrome `https://matkakirja.app/?koe=1` piirtää maapallon oikein, WebGL contextLost=false. Root aktivoi oikean välilehden ja varmisti document.visibilityState=visible, hasFocus=true. Aloita seikkailu → Valitse aloituskaupunki avaa valintapallon, mutta Pulu ei ole tullut näkyviin ja Ateena-renkaan napautus ei ole vielä vaihtanut pickstart-vaihetta. Busy=false, dead=false, aloitusvalintaPallolla=true; konsolissa vain sähkelinjan failed fetch -varoitus, ei erroria. Tämä voi olla osittain UI-koeolosuhde; **ei vielä vahvistettu yhteinen koodivirhe eikä peruste rollbackiin.**

RC-vetäjä tarkisti rajatusti resurssit ja mahdolliset CSS-portit: globe-kirjasto, manifesti, fallback-kuva ja otos laattoja HTTP200; yhtä molemmat oireet selittävää CSS-tilaa ei löytynyt. Root jatkaa käyttöliittymäkoetta ja Sol tekee read-only-polkuanalyysin. Ei spekulatiivista koodimuutosta, maksullista uusinta-ajoa tai tallennuksen resettiä. **Fable: pidä tämä avoimena jälkitarkistuksena; jos tunnistat nykyisen katselutilan/aloitusportin tunnetun syyn, kuittaa se rootille.**

Ateena/Marseille/Sarajevo/Venetsia-kaupunkien live-visuaali, 390px/selaintilat ja varsinainen kuuntelu/omistajan äänihyväksyntä ovat yhä erillisiä portteja. Emme väitä koko toimitusta täysin hyväksytyksi pelkän julkaistun datan perusteella. Omistaja nukkuu; root jatkaa normaalia työtä hiljaa.

---

## 13.9.2026 00:42 UTC — FABLELLE YHTEINEN EUROOPPA-RC: 45 + 45 luentaa, exact-head CI vihreä

**Pelipaketti: [PR #2332](https://github.com/ravelius/Matkakirja/pull/2332), haara `codex/europe-horatio-livia-rc-20260913`, exact head `1dd2fc08a7673a088cd88100f32288dcd61081c8`, tree `957a0afd550819b2f3f7f1a4f06a63552637d252`.** Tämä on yksi koottu teksti/kuvateksti/animaatio/audio/metadata/työkalu/testipaketti, ei kolmen erillisen osatoimituksen julkaisupyyntö. Älä yhdistä tekstiluonnos-PR #2325:tä erikseen.

### Riippumaton pääsession tarkistus

- Fresh Git-fetch varmisti exact headin ja puun. Main v1822 `2ee57c53` on kantaisä; `js/main.js`, `js/muutokset.js` ja **kanoninen Raamattu ovat täsmälleen mainissa**. v1821/v1822-luvat säilyvät, SW-cache v1822. Main→head `git diff --check` PASS.
- 45 pakin sisältö, exact-TTS-manifesti, luettava koonti ja mittaraportti vastaavat lopullista tekstitoimitusta `e49d639a6ac62f9eac9e9aa456aa730d7e8dfc75`. 18378 merkkiä / 2319 sanaa; jokainen kaupunkipari baseline-mittansa sisällä. 149 lyhyttä kuvatekstiä = yksi sisältövirke, 149 pitkää = kaksi virkettä, lähdetiedot säilytetty.
- **Horatio 45/45** MP3 + .aikaleimat.json, **Livia 45/45** MP3 + .eleet.json: completed-kuitit, frozen visible/TTS/hash, voice/model/parametrit, muuttumaton media-URL, täysi MP3-SHA/tavut/HTTP/MIME/CORS, tekstin ja äänen sidonta sekä kaikki semanttiset cue-ankkurit tarkistettu. **Runtime-osoitteet 45/45 kummallekin**. Sofia5–14:n kymmenen vanhaa Flicker-ääntä tarkistettu ja käytetty uudelleen; ei uusia ajoja.
- Solin riippumaton **90/90 täysdekoodaus PASS**, 0 timeout/decode-virhettä, kaikki MP3 / 44,1 kHz / mono. Ei teknisiä hiljaisuus- tai kestolippuja; suurin ffprobe-kestoero kuittiin 0,051628 s. Tämä ei ole semanttista kuuntelua.
- **Exact-head CI [#1859 / 34728477605](https://github.com/ravelius/Matkakirja/actions/runs/34728477605) SUCCESS**, pääsessio luki jobin103646810294 vaiheet ja lokin itse: **3246 PASS, 13 ehdollista SKIP, 0 FAIL / 3259 testiä**. Kaksoisavaimet, niputus, savukevartija ja standalone-koonti kaikki hyväksytty. Aiemmat paikalliset puuerot eivät ole tämän CI-todisteen pohja.
- RC-vetäjän rajattu lifecycle-/tilasarja 136/136 PASS, 0 skip/fail: pause/waiting/stalled/seek/end/purku, H45/L45-runtime, 390 px chat, saapumisasento/kartan liike. Paikallinen Chrome käynnistyi ilman konsolivirheitä, **mutta neljän kaupungin visuaalista kokonais-PASSia ei saatu**. Tätä ei korvata testilukemalla.

### Vielä Fablen normaali integrointi ja todelliset katselmusportit

1. Tee lopputarkistus ja sovita yhteinen RC normaaliin merge/versionosto/julkaisuprosessiisi. **Root ei yhdistä tai julkaise puolestasi.** Ennen julkaistuksi kutsumista tarvitaan oikea julkaisuversio, originin readback sekä kaupunki-/tilakohtainen tarkistus. Ateena (ensisaapuminen), Marseille (reaktiot/P2), Sarajevo (hillitty sävy) ja Venetsia (romanssi), mobiili, karttaliike, chat/lehti ja paluu ovat keskeiset.
2. **Ohjeiden viimeinen riippuvuus: docs-only [PR #2322](https://github.com/ravelius/Matkakirja/pull/2322), head `39f98277d24982d06f5fe51d3c5fb88c7553162b`.** Kanoninen JS on palautettu täsmälleen v1822:een, kaikki 17 linjausta jäljitetty raportissa. Voit yhdistää viisi docs-tiedostoa samaan lopulliseen integraatioon, tarkistaa 17 kohdan disposition ja tehdä kanoniset sanamuodot itse. Lisää uuden `docs/moduulit/horatio-livia-tuotanto.md`:n katalogirivi; erillisen docs-PR:n 14/15-testi johtuu VAIN tästä riippuvuudesta. Älä ohita sitä. Riippumaton toinen Sol-katselmus PASS; master-postikopio vastaa korjattua moduulia blobilla `cdbe2a885e7fdd6102ab39aa91b73c895df69783`.
3. **Kuunteluhyväksyntää, julkaistun originin neljän kaupungin visuaali-QA:ta tai asennetun Safari-sovelluksen QA:ta EI vielä ole.** Ne ovat omat porttinsa, eivät hash-/CI-väitteen sisällä. Pääsessio jatkaa julkaisun jälkeistä tarkistusta; varsinainen omistajan kuuntelu pysyy erillään. Älä merkitse näitä tehdyiksi oletuksena.
4. Uusia kuvia ei generoitu. Marseille P2 on mukana tässä RC:ssä, vanha P1 säilyy. **35 muuta puuttuvaa P2-kuvaa on nimetty ja briefattu, mutta tarvitsee erillisen kuvatilauksen**; 149 olemassa olevaa kuvaa on käsitelty. Tämä puute ei ole salaa täytetty uusilla maksetuilla kuvilla.

Ei enää maksullisia ajoja tämän paketin varmuuden vuoksi. Ei muiden maanosien ääniä, yleis69-äänten uusintaa, uusia kuvia tai tilausostoja. Kaikki vanhat/uudet mediaobjektit säilyvät palautusta varten; mahdollinen palautus tehdään yhteensopivana teksti+ääni+alignment+runtime-kokonaisuutena.

Todisteet samassa Macissa: `/Users/samireivinen/Documents/Codex/2026-09-11/pulu-jatko-2026-09-11/output/horatio-livia-root-qa-20260913/`: `horatio-all45-runtime-readback.md/.json`, `horatio-all45-readback.md/.json`, `pulu-first12-readback.md`, `pulu-remaining33-readback.md`, `sofia-existing10-reuse-readback.md`, `audio90-decode-qa.md`, `europe-runtime-independent-audit.md`, `docs-only-17-lines-qa.md`. Kuittien kaikki julkiset URLit ovat RC:n `docs/raportit/horatio-livia-eurooppa-tuotantotila-20260913.md`:ssä.

**Kuittaa tähän postilaatikkoon exact merge/release-SHA, versionumero ja suorittamasi portit tai täsmällinen integraatioeste.** Omistaja nukkuu: ei rutiinikuittauksia hänelle, vain kokonaisvalmistuminen tai todellinen hänen päätöstään vaativa este. Pääsession yövahti jatkaa.

---

## 13.9.2026 00:23 UTC — Fablelle korjattu docs-only PR #2322 + kaikki 17 linjausta

Korjaus on nyt remotessa **39f98277d24982d06f5fe51d3c5fb88c7553162b**, tree **eef473a49833c40da7382c006c89e00ca72d562b**. Riippumaton git-fetch/readback varmisti täsmälleen saman puun kuin paikallisessa tarkistuksessa. Pohja main v1822 **2ee57c53eacb72f60d5deb5bab65ee43db740f4c**. Diff mainiin sisältää VAIN viisi docs-tiedostoa; **js/tyohuone-raamattu.js on byte-for-byte sama kuin mainissa**. Kaikki 17 linjausta ja kahdeksan uudempaa kanonista kirjausta siis säilyvät. PR-kuvaus on kirjoitettu uusiksi, vanhat poistoväitteet ja vanhan revision 15/15 PASS eivät ole nykytilaa.

**17 kohdan jäljitettävyys:** [raportti](https://github.com/ravelius/Matkakirja/blob/codex/hahmoraamattu-20260912/docs/raportit/horatio-livia-raamattu-17-linjausta-20260913.md). Riippumaton Sol-lukukatselmus tehtiin alkuperäisestä poistodiffistä. Docs-toimeenpanomuistioon palautettiin hyväksytyn tekstitoimituksen auktoriteetti, chat-kehys/jatkokysymykset, paikalliskieli ja kontekstisanasto, yksi jälkikupla/nimetyt harvinaiset kuittaukset, vakavan historian naljailukielto, tekstivetäjän kuvabriefi/provenanssi ja Ihmisen matka -linssin erillinen äänilupa. 400 merkin YLÄRAJA säilytetty konservatiivisesti; alle300-täyttö ja 360–400 tavoite eivät kumoa uutta lyhennystilausta. Termien vanhaa 4–7 kaupungin/ei-naapureissa-jakelua ei ole julistettu perutuksi, vaan sen kanoninen sovitus jää Fablelle. Jäädytettyihin ja jo äänitettyihin sanoihin ei tehdä tämän vuoksi myöhäistä täytekierrosta.

**Tarvitsen sinulta normaalin integraatiotoimen, en uutta käyttäjälupaa:** tarkista kartta ja lisää uuden `docs/moduulit/horatio-livia-tuotanto.md`-moduulin katalogirivi kanoniseen Raamattuun itse / samassa sovitussa integraatiossa. Docs-testit ovat rehellisesti **14 PASS / 1 FAIL**, ainoa virhe puuttuva katalogirivi. Diff-check ja canonical-JS-equality PASS. En ohita testiä enkä kirjoita kanonista JS:ää puolestasi. Saat tehdä tarvittavat kanoniset sanamuotopäivitykset tämän täsmällisen disposition perusteella.

Äänityö jatkuu erillisen hyväksyntänsä nojalla: Livia45 MP3+eleet, Sofia10 reuse ja Horatio12 MP3+alignment ovat pääsession riippumattomassa etälukemisessa PASS. RC-vetäjä ajaa loput Horatio33. Ei uutta maksullista omistajaa eikä kokonaispaketin julkaisuväitettä. RC:lle toimitettu tämä uusi docs-SHA ja kielto käyttää vanhaa #2322 JS-diffiä.

---

## 13.9.2026 — Fable: ohje-PR korjataan docs-onlyksi, 17 kohdan jäljitettävyys tulossa

Luin itse uusimman 17 linjauksen huomautuksesi. Otan korjauksen omistukseeni: #2322 rajataan docs-tiedostoihin, `js/tyohuone-raamattu.js` palautetaan täsmälleen tuoreeseen mainiin, ja kanoniset muutokset tekee Fable. Fresh fetch varmisti nyt v1822 `2ee57c53`. Kahdeksan uutta Raamattulinjausta eivät saa kadota. Toimitan samalla jokaisesta 17 kohdasta säilytys-/tarkennus-/korvautumiskartan; sisältölinjauksia ei nimetä teknisiksi ohjeiksi niiden siirtämiseksi.

Osa vanhoista numeroista on aidosti myöhemmän omistajapäätöksen korvaamia. Omistajan sanat tässä pääsessiossa: **"joo hyvä, juuri noin. ja isoisän ja pulun repliikkien pituus voi myös vaihdella kunhan kokonaispituus ei kasva"**. Lisäksi pyydettiin isoisän lyhentämistä ja Pulun hienoista pidentämistä. Tästä nykyinen kaupunkikohtainen yhteismitta; vanha alle300-merkkisen Horation laajennuspakko ja kiinteä125-merkkinen Pulu eivät saa palautua jo hyväksyttyihin ja äänitettyihin45 pareihin. Yksi kupla, sanastohuumori, chat-kehys ja muut erilliset sisältöperiaatteet eivät automaattisesti katoa tämän takia — näille tarkka kartta tulossa.

Docs-only-rajaus jättää yhden todellisen riippuvuuden: `tests/dokumentit.test.mjs` vaatii uuden `docs/moduulit/horatio-livia-tuotanto.md`:n Raamatun dokumenttikarttaan. Pyydän Fablea lisäämään tämän karttarivin omana kanonisena muutoksenaan tai samaan hallittuun integraatioon; en ohita testiä tai kirjoita riviä puolestasi. Tarkka ohje-PR-puu ja testit toimitetaan korjauksen jälkeen.

Tämä ei pysäytä nykyisen nimenomaisen luvan piirissä olevia luentoja: RC jatkaa Horatio33:n tuotantoa. Livia45 MP3+eleet ja Sofian10 olemassa olevaa lisärepliikkiä on rootin itsenäisesti tarkistamana teknisesti katettu; Horatio12 MP3+aikaleimat myös. Kuuntelu, lopullinen yhteinen CI ja peli-QA ovat edelleen avoinna. Ei erillistä julkaisupyyntöä keskeneräisestä paketista.

## 13.9.2026 — kaikki 45 tekstiä ja 149 kuvatekstiä valmiit, audio-QA jatkuu

Tarkistushetki 2026-09-12 23:33:51 UTC. Tämä on välitila, EI vielä valmis pelijulkaisupaketti.

- Kaikki 45 kaupunkiparia jäädytetty: `eu-hl-europe-20260913-r2-approved1`, 18378 merkkiä / 2319 sanaa. Sofian 10 ennallaan säilyvää kontekstipuhetta uudelleenkäytetään; niitä ei ajeta uudelleen vain puuttuvan uuden kuitin vuoksi.
- Kaikki 149 nykykuvan kuvatekstit valmiit: pitkä kaksi virkettä, lyhyt yksi sisältövirke (paikka–vuosilabel erikseen). Pilotin loput 16 pitkää ja Venetsian 2 lyhyttä korjattu commiteissa `8bc32d71b7f2fc92a22f67fcf5fc7bdb864e34e0` + `3d1a143492c6ba520eab75976ced7a5da7aad1f1`. Root luki molemmat diff:t ja ajoi 10/10 sisältötestit; kuvavetäjän riippumaton visuaalinen readback PASS. Venetsian ihastumis-/sydänkaari säilyi. Muuttuvat vain kuvatekstit: ei audioiden uudelleenajoa, uusia kuvia tai lähdetietojen keksimistä.
- RC-vetäjä raportoi kaikki 45 Livia-city-3 MP3:t tuotetuiksi versionoituun R2:een. Ensimmäiset 12 on rootin itsenäisesti takaisinlukemana todettu oikeaksi: exact TTS/visible SHA, Flicker/v3/Natural 0.5, MP3 SHA/tavut/MIME/CORS, runtime-URL ja kaikkien eleiden sidonta/ankkurit/aikarajat PASS 12/12. Tämä EI ole kuuntelu- tai pelijulkaisuhyväksyntä.
- Jäljellä 33 kaupungin ensimmäinen alignment-erä #29 hyväksyi 3/10 ja hylkäsi turvallisesti 7. RC-vetäjä korjaa cueiden aikajärjestyksen ja Berliinin viivatokenisoinnin; runtime-kytkentää ei avata virheellisille sidecareille. Korjaus koskee kohdistusta, ei TTS:n uudelleenmaksua. Isoisän tuotannon loppukattavuus ja koko audion kuuntelu-/live-QA odottavat koontia.
- Riippumaton Sol-runtime-auditointi `31029a2e`: 45 kaupungin cue-kattavuus, SHA/versiosidonta, lifecycle ja reduced motion PASS; 54/54 + 135/135 testit. Offline-vihreä ei korvaa yllä löytynyttä todellisen kohdistusajon korjausta eikä selain-QA:ta.

Fablen uusin työnjakokuittaus luettu: ei kilpailevia ajoja, yksi RC-omistaja, yksi lopullinen paketti. Nykyinen audiohaara on `codex/europe-audio-20260913`, v1820-pohjainen; vanha v1816-pilottihaara on historiallinen checkpoint. Viimeisin rootin origin/main-fetch varmisti v1821 `b766f7fd`; Fable mainitsee viestissään v1822, joka varmistetaan remote-puusta ennen lopullista sovitusta. Säilytetään v1818 saapumis-/PuluCam-ajoitus ja v1819 yleisten 69 äänen erä 4. Ohje-PR #2322, sisältölähde #2325 ja lopullinen RC käsitellään erikseen; ei keskeneräisen sisältö-PR:n itsenäistä pelijulkaisua.

## 13.9.2026 — rajattu korjaus tarkistettu, Euroopan koko luenta-ajo vapautettu

Pääsessio luki kaikki13korvaavaa riviä ja45parin päivitetyn mittaraportin revision eu-hl-europe-20260913-r2-approved1 (tekstivetäjän remote c5173e9a47df60a944900647bcea520676ba35b4). Budapestin kielivirhe,10lyhyttä Livia-riviä sekä Lissabon/Sisilia on korjattu rajatusti. Tekijän59/59 testit ja riippumatoneditorialQA PASS; pääsession sisältökatselmus hyväksyy. Kaikki45paria omissa budjeteissaan. Aiemmin hyväksytyt12kaupunkia ennallaan.

Alla kuvattu tilapäinen12kaupungin toimituksellinen maksu-stop on POISTETTU. RC-vetäjälle on toimitettu exact vapautus; vain uuden revision korvautuvia rivejä käytetään. Omistajan koko Euroopan maksullinen ajolupa on voimassa, yksi ajo-omistaja edelleen RC-vetäjä. Jo tehtyjä/ajossa olevia hyväksyttyjä luentoja ei uusita. Koko aineisto nyt18378merkkiä/2319sanaa vs lähtö19855/2539. Audiojen valmistuminen, kohdistus, vienti, testit ja julkaisu kirjataan edelleen erikseen; tämä on sisältöportin kuittaus, ei koko luenta-ajon valmistumistodiste.

## 13.9.2026 — pääsession riippumaton sisältö-QA ennen loppuerän maksua

Koko45kaupungin lukukopio eu-hl-europe-20260913-r1-approved1 luettu pääsessiossa. Pilotti4 + E4 8 säilyvät hyväksyttyinä ja niiden audioajot etenevät; RC raportoi Pulu12/12 tuotetuksi staging-artefakteiksi, ei livejulkaisuksi. Budapest-Horatiossa löytyi kielivirhe ("Lämpö sai kaupungit odottaa järjestystä"). E5/E4b-ryhmän kymmenen lyhyttä Pulu-vastausta jäi toimituksellisesti liian mekaanisiksi suhteessa hyväksyttyyn r2-linjaan, vaikka yhteismittavaraa jäi runsaasti. Lisäksi Lissabonin "tehtävä jäi kesken" ja Sisilian "siipeni pysyivät tallessa" tarvitsevat ymmärrettävän lopetuksen.

RAJATTU VÄLIAIKAINEN SISÄLTÖPORTTI ennen maksua: uutta exact korjausrevisiota odottavat12kaupungin Livia-rivit Sofia, Istanbul, Bukarest, Budapest, Dubrovnik, Kreeta, Kööpenhamina, Bergen, Oslo, Islanti, Lissabon ja Sisilia; Horation muutos vain Budapest. Tekstivetäjällä täsmätoimeksianto, ei koko sarjan uusintaa. Päivitä pack/tagit/ankkurit/hashit/manifesti/lukukopio/mitat yhtenä revisiona, riippumaton ilmaisu-QA ja pääsession nopea kuittaus. Vanhaa approved1:tä ei makseta korjattaville riveille. RC-vetäjälle tämä toimitettu ennen loppuerän maksua.

Muut loppu33:n21kaupunkia saavat edetä nykyisestä QA-jäädytetystä manifestista. Aiemmat12kaupunkia ja niiden maksetut/ajossa olevat luennat ENNALLAAN. Tämä ei peru omistajan koko Euroopan ajolupaa eikä edellytä uutta käyttäjäpäätöstä; kyse on maksuttomasta toimituksellisesta korjauksesta ennen turhaa veloitusta. Yksi maksullisten ajojen omistaja yhä RC-vetäjä.

## 2026-09-13 — OMISTAJAN UUSI EUROOPAN JATKA- JA ÄÄNITUOTANTOLUPA

Omistajan sanatarkka viesti pääsessioon: **"menen nukkumaan. hyvältä näyttää. tehkää kaikki loppuun. voit generoida luennat sitten isoisälle ja pululle koko eurooppaan."**

**Tämä korvaa Euroopan työn aiemman audio-HOLDin.** Toimitettu E4-kahdeksikko hyväksytty; koko Euroopan45 kaupunkiparit viimeistellään sovitulla linjalla ja riippumattomalla QA:lla. Omistajaa ei odoteta hyväksymään jokaista jäljellä olevaa erää yön aikana. Maksulliset isoisän ja Pulun lopulliset Eurooppa-luennat sekä niiden synkronoinnin vaatima kohdistus ovat nyt valtuutettuja. Uusia kuvia, muiden maanosien ääniä, yleischatin69 repliikin uusinta-ajoa tai krediitti-/tilausostoja EI valtuutettu.

**Yksi ajo-omistaja:** Codexin tekninen RC-/animaatiovetäjä01a096d1-58ce-7751-b7ed-b9b6ae889af5 hoitaa kaikki tämän työn maksulliset ääni-/kohdistusajot. Fable ja tekstivetäjä eivät käynnistä rinnakkaisia ajoja. Pulu: piI8Kku0DcvcL6TTSeQt / Flicker / eleven_v3 / Natural0.5. Isoisän nykyinen ääni/moottori/parametrit säilyvät. Ajot vasta täsmäsisällön QA-jäädytyksen jälkeen; validit artefaktit uudelleenkäytetään, ei force-kaikkia. Manifestissa teksti-/TTS-hash, voice/model/params, artefakti-SHA, tavut, mitattu kesto ja retry-syy. Jo generoitua tekstiä ei hiota uudestaan ilman todellista korjaustarvetta.

Tekstivetäjä01a096d0-9aa4-7a50-a70a-0d8fe62c5349 integroi hyväksytyn E4:n ja viimeistelee loput33 kaupunkia (45 yhteensä). Kuvavetäjä auttaa vain nykykuvien/kuvatekstien/lähteiden maksuttomassa QA:ssa; puuttuvat P2:t erillisinä briefi- ja puutelistoina. Pääsessio on käynnistänyt kaikki kolme olemassa olevaa tehtävää ja päivittänyt15 minuutin jatkoseurannan. Ei uusia sidebar-tehtäviä eikä päällekkäisiä omistuksia.

Julkaisutavoite säilyy omistajan aiemman pyynnön mukaan: yksi valmis yhteistestattu Eurooppa-paketti Fablelle lopputarkistukseen, yhdistämiseen, versionostoon ja julkaisuun mahdollisimman pian. **Fable: älä aloita kilpailevaa generointia; kuittaa työnjako ja odota RC-vetäjän exact toimitusta.** Ohje-PR2322 voidaan integroida normaalisti tarkistusten jälkeen. Nykyinen main on sovitettava RC:hen, koska pohja v1816 on vanhentunut. Paikalliset testit, CI, mediajulkaisu, pelijulkaisu ja Safari/asennetun pelin oikean tilan QA raportoidaan erikseen.

Tämän viestin hetkellä hyväksytty neljän kaupungin r2 on RC-remotessa9112d2de18fae1af29687598f96001d8d3489b83, tree0438aa5fe390fb5dd93b09ef1e8aed3abb9b6803; tekijän paikallinen3184PASS/13SKIP/0FAIL, ei vielä pelijulkaisu eikä todistettu CI. E4-kahdeksikko PR2325head873244809a924b6865c93fae3535765771935766. Maksullisten uusien Eurooppa-ajojen käynnistymistä tai valmistumista EI vielä väitetä. Seuraavat tilat kirjataan yhteiseen korttiin.

---


## Aiempi tilahistoria — yllä oleva uusi lupa on ensisijainen

## Omistajan sisältöhyväksyntä kahdella korjauksella — 13.9.2026

Omistaja: "nuo kun korjaa niin muuten oli hyvät tekstit! voi siirtyä seuraaviin sitten". Neljän kaupungin r2-pilotti on hyväksytty ehdolla, että Ateena- ja Sarajevo-repliikeistä poistetaan Pulun oma kahvinjuonti. Tekstivetäjä tekee vain nämä kaksi lintunäkökulman korjausta ja niihin liittyvät mitat, TTS-sanat/tagit sekä cue-ankkurit; muut hyväksytyt repliikit säilyvät. Kahvilat ja ihmisten tarkkailu ovat sallittua ympäristöä, mutta linnulle ei anneta perustelematta kahvikupin kanssa kiertelyä tai jäähtynyttä omaa kahvia. Ei uutta yleistä kaanonkieltoa eikä pullavitsiä joka kaupunkiin.

Korjattu tarkistettu sisältö saa siirtyä tekniseen RC-työhön. Maksullinen ääni-/alignment- ja kuvagenerointi vaativat edelleen erillisen omistajan luvan; tämä hyväksyntä ei ole ajolupa eikä julkaisu. Tekstivetäjä jatkaa seuraavaan rajattuun 8 Euroopan kaupungin erään samalla yhteismitalla, hahmoparilla, kuvatekstirajalla sekä teksti-/tunne-/eleketjulla. Uusista kuvista vain briefit, ei generointia. Pääsessio on toimittanut tämän työohjeen molemmille vetäjille; tehtäväviestin toimitus ei vielä ole kahvikorjausten valmistumistodiste.

Päivitetty 13.9.2026. Omistajan JATKA-lupa kumoaa tämän hankkeen aiemman saman päivän tauon. Koordinaattori: Codex-pääsessio; julkaisu: Fable. Tämä kortti on työtilanne, ei julkaisutodiste.

## Yksi ohje
- Hyväksytty yhteinen työohje: posti/pulu-horatio-tuotanto-20260912.md.
- Ohje ja ristiriitojen rajattu siivous ovat valmiit PR:ssä #2322: https://github.com/ravelius/Matkakirja/pull/2322 . Remote commit c697b8fbae87edfd82b6f4f2c0400692ca5c19b5, kaikki 5 tiedostoa ja tree takaisinlukemalla varmistettu.
- Aiemman konsolidointirevision tarkistukset: Sol 106/106 ja viimeinen uusinta 82/82; pääsession riippumaton 67/67. Uusin yhteismittatarkennus: diff/syntax sekä dokumentit/raamattu-muokkaus 15/15 PASS. Remote-puu varmennettu paikallista vasten. Uusimman revision CI:tä ei ole vielä tarkistettu. Fable vastaa integraatiosta; ohje-PR ei vielä main-/pelijulkaisu.
- Eurooppa ensin; hyväksytty mallikaupunki, sanasto, kentät, testit ja tilat tekevät jatkon muille mantereille mahdolliseksi niiden kaanonporttien kautta.

## Omistajat
| Osa | Vastuu | Codex-tehtävä / kanava |
| --- | --- | --- |
| Kaupunkiparin sisältö, molemmat hahmot, lyhyt/pitkä kuvateksti, TTS-tagit ja cue-merkitykset | Tekstivetäjä | Euroopan matkakirjatekstit ja Pulun repliikit / 01a096d0-9aa4-7a50-a70a-0d8fe62c5349 |
| Kuvareferenssit, puuttuvat Pulu P2 -kuvat, versiot, kuvien QA | Kuvavetäjä | Matkakirjan kuvat / 01a06e21-9b03-73e1-8856-44c9ffffb635 |
| Hienoinen ilme, eleet, synkronointi, regressiot JA yhteisen julkaisuehdokkaan tekninen paketointi | Animaatiovetäjä | Pulun lempeä ilme ja tekstien animaatiot / 01a096d1-58ce-7751-b7ed-b9b6ae889af5 |
| Yhteinen ohje ja ristiriitojen siivous, koordinaatio | Pääsessio + rajattu Sol-dokumenttityö | Matkakirja: tekstit 3 / 01a08fa8-097f-7843-8993-ab9250806773 |
| Lopputarkistus, äänituotantolupien varmistaminen, kaanonintegraatio, versionosto, CI, julkaisu | Fable / Opus | git-postilaatikko |

Tekstivetäjä omistaa fokusvirtapakkien sisältömuutokset omassa työhaarassaan. Kuvavetäjä ei kirjoita samoihin pakkeihin: toimitus on kuvat + manifesti + metadata. Animaatiovetäjä omistaa runtime-koodin, ei repliikkejä, ja kokoaa hyväksytyt osatoimitukset erilliseen yhteiseen julkaisuehdokashaaraan. Fable saa yhden valmiin paketin lopputarkistukseen, yhdistämiseen ja julkaisuun. Yhteistä tiedostoa muuttaa vain nimetty omistaja kerrallaan.

## Pilotit ja lähtötilanne
- Marseille: yhteinen runtime-/kaupunkiparin pilotti ja ensimmäinen sovittava Pulun lisäkuva.
- Ateena: ensisaapuminen, Sarajevo: pohdinta/rauhallisempi sävy, Venetsia: romanssialbumin poikkeus.
- Inventaario: posti/pulu-horatio-kuvateksti-audit-20260912.md. 45 kaupunkia, Horatio 90 kuvaa, Pulu 58. Puuttuva Pulu P2 36 kaupungissa; tuore aineistotuotanto tarkistetaan ennen uuden generointia.
- Kolme vetäjää saivat uudet täydet JATKA-tehtävät 12.9.2026. Tehtäväviestin toimitus ei yksin ole vastaanottajan työn valmistuminen.
- Tekstivetäjän neljän kaupungin pilotti: remote luonnos-PR #2325 https://github.com/ravelius/Matkakirja/pull/2325 , commit aa3a61d7b5c422d132f6ef06c1c64dfd521ebcc2. Kortti docs/raportit/horatio-livia-pilottikortit-20260912.md. Marseille P2 liitetty pakkiin. Tekijän 45/45 pilot+fokus-PASS; laajempi 109/111: kaksi vanhan äänen/ajoituksen porttihylkäystä, joita ei ohiteta. Osatoimitus RC:n kokoajalle, EI erillinen julkaisupyyntö. Fable-liite posti/horatio-livia-eurooppa-pilotti-20260912.md.
- Animaatiovetäjä on tekninen paketointivastaava. Yhteinen r1-RC-haara codex/horatio-livia-rc-20260912, viimeksi varmennettu remote 19037d3647d1f67c5a92a6c0f1d17083dbc804a8 (pohja v1816). Se sisältää neljän kaupungin r1-tekstit/tagit, Marseille P2:n, ilme-/cityExplain-työn sekä lopullisen äänen hash-vartioidun cue-putken. Ajantasaiset Flicker/eleven_v3/Natural-oletukset myös generaattorissa/workflow'ssa. Tekijän raportti: 3181 PASS / 3 odotettua audio-HOLD FAIL / 13 SKIP; build/standalone/bundle/cue-kuiva-ajo PASS. Uudempi paikallinen 63a2e2dc lisää kaupunkiparin budjetin ja mobiilikuplan regression, tekijän 171/171 PASS; remote-toimitus vielä vahvistamatta. Ääni/hash/cue-portteja ei poisteta. R2-tekstit ja lopullinen ääni/alignment/yhteinen selain-QA vielä tekemättä.
- Marseille P2 v2: kuvavetäjän ja tekstivetäjän visuaalinen/paritarkistus valmis, mediajulkaisu takaisinluettu (kuvavetäjän kuitti). https://media.matkakirja.app/matkakirja/pulu-cam/20260912/pulu-cam-marseille-02-v2-5218c67d5b38.jpg ; sha256 5218c67d5b3868d83854107900a88da7acd1597efc8d035a52401255daf52464. Toimitus output/pulu-p2-europe-20260912/marseille/handoff.json kuvatehtävän työhakemistossa. P1 säilyy. P2 EI vielä kytketty peliin; tulee tekstivetäjän yhteispilotin mukana. 36 puuttuvan P2:n tilauksesta 1 toimitettu mediaan, 35 vielä generoimatta.
- Pulun pysyvä ääni VALITTU 12.9.2026: Flicker — cheerful fairy & sparkly sweetness, voice_id piI8Kku0DcvcL6TTSeQt, moottori eleven_v3. Horation ääni ei vaihdu. Ajolupa ja julkaisu ovat edelleen erillisiä portteja.

## R2-lukupaketti valmis käyttäjän tarkistukseen — 13.9.2026

Tekstivetäjän eu-hl-pilot-20260912-r2-candidate1 on valmis lukukatselmukseen, remote 6401ba0bebb28436ee9e36f6d14d467976437e8c / draft PR #2325. Lukukopio: docs/raportit/horatio-livia-pilotti-r2-lukukopio-20260912.md tekstivetäjän haarassa. Erillinen mittaraportti: docs/raportit/horatio-livia-pilotti-r2-mittaraportti-20260912.md. Pääsessio luki kaikki parit ja tarkisti r2-mitat itsenäisesti: Marseille 401 merkkiä / 50 sanaa (lähtö 430/56), Ateena 413/53 (449/57), Sarajevo 415/52 (436/54), Venetsia 442/58 (454/59). RC-vetäjän riippumaton tagit 4/4 ja cue-ankkurit 17/17 PASS. Pääsessio toimittaa suoran lukulinkin käyttäjälle tässä vuorossa; valmistumisen kertailmoitusseuranta on tauotettu. TILA: odottaa käyttäjän sisältökatselmusta, EI hyväksytty RC-runtimeen, maksulliseen ajoon tai julkaisuun. Lukukopion tarkistuskysymyksen sisältöhyväksyntä ja ajolupa pyydetty erottamaan; repliikkejä ei muuteta tämän toimituksellisen korjauksen yhteydessä.

RC-vetäjä raportoi teknisen regressiopäivityksen nyt myös remotessa: 34000613f6a9e1f3ab9c0a1560cb0c16c78f657f, neljä blobia SHA-varmennettu. Tämä on r1-RC:n tekninen muutos, ei r2-sisältöhyväksyntä.

## Sisältö-QA ja lukukopiot (tausta ennen r2-toimitusta)

Omistaja pyysi tekstit luettavaksi. Nykyiset 45 kaupungin tekstit (lähtö main e34a1171) ja neljän kaupungin r1-luonnokset on toimitettu erillisinä lukukopioina ja säilytetään. R1:n Horation tiivistys oli liian vähäinen (341→316, 346→337, 328→318, 348→348 merkkiä); välimerkkien yhdistäminen ei riitä.

Omistajan hyväksymä uusi sääntö: Horation ja Livian osuuksien pituus saa vaihdella kaupungittain, mutta saman kaupungin parin kokonaispituus EI KASVA. Livia saa hieman enemmän tilaa omalle kokemukselleen, innostumiselle, haikeudelle tai epävarmuudelle. Persoona näkyy sanoissa, ei vain tageissa; rauhallinen lämpökin sopii hahmoon. Horation oivallukset säilyvät. Ei mekaanista -2/+1-lausetta eikä kaikille samaa suhdetta.

Tekstivetäjän seuraava toimitus on r2-lukupaketti kaikista neljästä pilotista: Marseille, Ateena, Sarajevo, Venetsia. Mukaan erillinen saman lähderevision ennen/jälkeen-sana- ja merkkimääräraportti molemmista sekä summasta. Päätekstiin vain luettavat kaupungit ja kertojat, ei cue-taulukoita. Lopullisia sekunteja ei väitetä mitatuiksi ennen ääntä. Pääsession valmistumisseuranta ilmoittaa käyttäjälle suoran lukulinkin tarkistuksen valmistuttua; välivaiheista ei tarvitse ilmoitella. Lukukatselmus ei odota maksullisia ajoja tai teknisen RC:n valmistumista.

R1 EI ole hyväksytty äänitettäväksi. Pilotin uudet r2-tekstit tarvitsevat sisältöhyväksynnän ja maksullinen ajo erillisen omistajan luvan. Äänen valinta EI ole generointilupa; sama erillisen luvan periaate koskee kuvagenerointia.

## Äänitilanteen korjaus: nykykaanon ja pilotti ovat eri eriä

Fablen 12.9. klo 20:55 UTC git-postikuittaus on luettu suoraan: hän kertoo ajaneensa nykykaanonin kaikki 69 Flicker-repliikkiä ja julkaisseensa ne v1819 / PR #2328. Tämä EI ollut neljän kaupungin pilotin ajo. Aiempi yleinen väite, ettei valitulla äänellä olisi tehty maksullisia ajoja, oli väärä; se korvataan tällä erottelulla. Pääsessio ei ole tässä yhteydessä varmistanut pelin ääniä kuuntelemalla. Pilotin uudet tekstit ja kohdistukset ovat edelleen ajamatta, eikä uutta maksullista ääni- tai kuva-ajoa aloiteta ilman erillistä omistajan lupaa. Fable on myös kuitannut yhden yhteisen julkaisuehdokkaan työnjaon hyväksytyksi.

## Seuraavat siirrot
1. Tekstivetäjä toimittaa ensin neljän kaupungin r2-lukupaketin ja yhteismittaraportin käyttäjän tarkistukseen. Sisältöhyväksynnän jälkeen täsmälliset TTS-tekstit/hashit/tagit/cue-ankkurit ja kuvat/kuvatekstit tekniselle paketointivastaavalle.
2. Ääni valittu: piI8Kku0DcvcL6TTSeQt / eleven_v3. Tekniset oletukset on päivitetty RC-haaralle. Pilotin maksullisia ääni-/alignment-ajoja ei ole käynnistetty. Ensin r2-sisältöhyväksyntä, sitten erillinen rajattu ajolupa. Nykykaanonin jo tehty 69 äänen ajo on eri erä (ks. korjaus yllä).
3. Animaatiovetäjä kokoaa hyväksytyt toimitukset erilliseen RC-haaraan, kohdistaa lopulliseen ääneen ja tekee yhteistestit. Raporttiin teksti-/ääni-/kuvarevisiot, CI, selain/mobiili/reduced-motion/keskeytys-QA ja lyhyt käyttöönotto- sekä palautusohje.
4. Pääsessio tiedottaa Fablea. Fable ei kokoa kolmea keskeneräistä osaa: yksi valmis julkaisuehdokas lopputarkistettavaksi, yhdistettäväksi ja julkaistavaksi. Ohje-PR #2322 voidaan integroida erikseen CI:n jälkeen. Tuotantoluonnoksia ei vielä julkaista.
5. Kuvavetäjä odottaa seuraavaa sovittua pilotin briefiä. Euroopan laaja erä vasta yhteispilotin oppien jälkeen; seuraavat mantereet saman ketjun ja omien kaanonporttiensa kautta.

## Valmis tarkoittaa
Sisältö ymmärrettävä ja omaleimainen, tiedot lähteistetty, oivallus säilynyt, kuva vastaa kuvausta; lyhyt noin 1 lause ilman lähdettä, pitkä enintään 1 lisälause + lähde. Tagit eivät vuoda näkyvään tekstiin. Ääniversio vastaa tekstiä ja kaikkia kohdistuksia. Tauko, kelaus, keskeytys, puhenopeus, äänetön tila, karttaliike ja mobiili testattu. CI, julkaisu ja oikeassa pelissä visuaalisesti tarkistettu erikseen. Tämä kortti ei vielä vahvista näitä toteutuneiksi.
