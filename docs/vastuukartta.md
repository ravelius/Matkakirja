# Vastuukartta — aineisto ja koodialue → omistava rooli

Omistajan päätös 14.10.2026 klo 10.4x (Raamattu, TYÖTAPA JA SESSIOT: ROOLIEN KANSIOT JA MALLIT;
loki ROOLITYÖN PARANNUKSET). Ylläpitäjä: Päätoimittaja. Session id:t: /Users/Shared/Claude/osoitekirja.md.
Kun muutat toisen roolin alueen tiedostoa, kerro omistavalle roolille yhdellä rivillä.

Tila 14.10.2026 klo 11.0x: roolien omat vastaukset ("ALUEET <rooli>: …"); Äänittäjä ja Postivahti vielä alustavina.

| Aineisto tai koodialue | Omistava rooli |
|---|---|
| Raamattu (js/tyohuone-raamattu.js), päätösloki (docs/raamattu-loki/), tarinan kaanon, osoitekirja, tämä kartta | Päätoimittaja |
| Web-merget mainiin (junat, docs/Raamattu-PR:t pyynnöstä), natiivin muutosloki tools/vienti/muutosloki-natiivi.json, TF-ketjut (julkaisija-tyokalut/tf-kaynnista.sh, tf<N>.sh, muistiajo-<N>.txt), ämpärivienti (vie-paketti.sh, CDN-tarkistus), käännöslinja- ja simujono (lukkovahti, tf-jono), Asemataulun talo/eteneminen vaihe 5, .github/workflows TF-/testflight-*.yml | Julkaisija |
| Natiivijunat (runko natiiviseppa/juna-N, wt/proto-natiiviseppa-ehdokas, yhdistys, lukitus, BUILD-merge, peilit natiivi-backup), käännöspalvelu (proto-kaanna.sh, mac-kaanna.sh, laite-sha.sh, juna-ajo.sh, varmuuskopioi-natiivi.sh, L1/L2/Mac-kopiot T7:llä), Mac-TF (proto3d-mac-testflight.yml), iPad-muistiajot ja muistiportti, Unity-versio ja beetaseuranta (unity-julkaisut.py), renderöintiputki (Savytoisto AgX/HDR, DioraamaNayttamo-kuva, URP-assetit), proto-3d/tyokalut/natiiviseppa-skriptit/ | Natiiviseppä |
| Natiivin UI Toolkit -käyttöliittymä Assets/Matkakirja/UI/** (näkymät, Linssit-UI: Kuvanakyma, MuseoTaulu, AstronautinNakyma, IssKohdevalikko, Pulu-, galleria-, lukija- ja ohjausnapit, Kosketusvieritys, UiKerros), UI-pohjat ja tyylikirja UI/Resources/MatkakirjaUI, UI-tekstit UI/Resources/Tekstit/ui.fi.json, AsetteluTesti + ui-asettelutesti.sh, web-tyylikirjan pohja-PR:t | Natiivi-UI |
| Pelilogiikka ja linssien kytkennät: ISS (RakettiLaukaisu/RakettiAanet, telakoinnin kytkentä, KupoliAanet/KupolinKelaus/KupolinValinta/Ylilento, AstronauttiLinssi-ydin, testikomennot), pääkaupunkien kytkentä (tools/paakaupungit/kytke-pilvisisalto.mjs, esittelyt maakartat.js:ään), Linssit-testit | Pelikoodari |
| Taidemuseo natiivissa (MuseoSovitin*, MuseoNayttamo/Askeleet/Eleet, Ydin/Museo/*, Resources/Museo/{alankomaat,ranska}, kertojan manifest aanet/taidemuseo-kertoja-*), opas ja kuumailmapallo (OpasSovitin*, Pallokierros, PalloKori, kippi, PallokisaPiirto), alueellinen piilotus (kohde-säännöt), vesi-indeksin valinta, Museo*/Opas*-testit | Linssiseppä |
| Valo, ilmakehä, vesiväri, korostus, materiaalit, avaruuskohtaukset (RakettiRunko, telakoinnin valo), teosvalotus, kaupunkien kehitys- ja korkeuskytkennät: proto-haarat linssiseppa2/*, _tyo/linssiseppa2/, lokit/todistus-{lp*,lontoo*,telakointi*,teosvalo*} | Valoseppä |
| Kartat ja maasto: laattapyramidi, pallolauta, kohdekartat (tools/piirra-kaupunkikartta.mjs, tools/paakaupungit/kohdekartat.mjs, karttavarat.mjs, kohdekarttavarojen tarkistus/korjaus, assets/kartat/*-keskusta/), natiivikaupunkien data (T7 vesimaski/: maa- ja korkeusmallit, vesi, puut, kadut, reitit, yövalot, elävä kaupunki, ilmakehä, vesiväri; ämpärin kartta/, vesi/, ilmakehä/), pallokierrosten kamera- ja sijaintidata (opas/pallokierros-v*), js/lahteet.js:n kartta- ja korkeusrivit | Karttaseppä |
| 3D-mallien tuotanto Blenderissä (Olavinlinna, kaupunkimallit, museosalit ja karttaesineet, raketti, lähtöalusta, ISS-asema): proto-3d/_valmiit/<malli>/, _tyo/linnanrakentaja/, linnanrakentaja-ajot/; ei pelikoodia | Linnanrakentaja |
| Olavinlinnan historiamoottori ja pelattava pala natiivissa (linnahaara, linnapakettien kiinnitys), siirtobotti (17 pistettä), taidemuseon kehysten pinnat ja rae (MuseoValaistu _Pinta/_Rae, Resources/Museo/pinnat) | Siirtoseppä |
| Tekstit ja faktat: js/packs/maakartat.js:n esittelyt, nahtavyysjutut.js, kulttuuri-kategoriat.js, oceania-artikkelit.js, kaupunki- ja maalehdet, pääkaupunkipaketit e01–e14, aarretehtävät, saapumisintron kuvatekstit, pallokierrosten kerronta/historia/faktat (docs/kohtaukset/pallokierros/), äänitysten käsikirjoitukset, kuvalähteet; Codex-posti-cron | Sisältökirjuri |
| Musiikki ja äänet, ääni-manifestit, äänisivu (alueet tarkentuvat Äänittäjän vastauksesta) | Äänittäjä |
| iOS-simulaattorit (T7-laitesarja, vain SIMU NYT -vuorolla), laite- ja savukierrokset, pelaajapolut; docs/raportit/laitetestaaja-*, savukierros-*; proto-3d/lokit/laitetestaaja-*; ei koodi- tai sisältöalueita | Laitetestaaja |
| Mittarit, hälytykset, roolien nollaukset (Matkakirja-posti/KIERROS.md, NOLLAUS.md) | Postivahti |
| Asemataulun vienti: mittarit, roolit, laitteet ja tehtävät | Asemataulu |

## Lukulistat ja työkalut (omistaja 14.10.2026 klo 22.4x, kortit "Aloitus" ja lukulistat)

Jokaisen roolin aloitus: LUE ALUSSA enintään 5 kohtaa (oma luovutus, omat Raamatun osiot otsikoittain, oma
pääohje), ÄLÄ LUE koko Raamattua, muiden luovutuksia eikä kokonaisia lokeja. Kaikille yhteinen Raamatun luku on
osion 0 kohdan TYÖTAPA JA SESSIOT osat A (oma roolirivi), D (viestintä) ja G (komentosäännöt); taulukko kertoo
lisäksi luettavat. Työkalut-sarake ohjaa deny-rivejä roolin .claude/settings.local.json:ssa (Keskustelukanava
kokeilee ensin yhdellä roolilla ja mittaa get_usagen System tools- ja MCP tools -osuudet ennen ja jälkeen;
sitten muille). Tavoite: aloitus enintään 8 % kontekstista.

**Asemataululle kirjoittavat vain PT, Asemataulu, Julkaisija ja Natiiviseppä** (talo/eteneminen: Natiiviseppä vaiheet 1–4,
Julkaisija vaihe 5); Postivahdilla on Artifact-työkalu taulun vientiin ja talo/boost-dokumentin lukuun (omistaja 14.10. klo 23.39). Muilta rooleilta Artifact- ja ArtifactData-työkalut on estetty (KK:n työkalukevennys 14.10.2026 klo 23.14,
33,3 k → 23,8 k tokenia / kutsu); niiden VAATII TOIMIA -asiat menevät PT:lle rivinä, ja PT kirjoittaa toimi-<rooli>-dokumentin.
Keskustelukanava saa vain avata taulun (Artifact open). Äänittäjällä on Artifact vain äänisivun (Matkakirjan äänet) julkaisuun; se ei kirjoita Asemataululle (PT 14.10.).

| Rooli | Lukulista (Raamattu + oma pääohje) | Tarvittavat työkalut (muut pois) |
|---|---|---|
| Päätoimittaja | TYÖTAPA JA SESSIOT kokonaan, TYÖSKENTELYTAVAT AINA RAAMATTUUN, UI-POHJAT; muut osiot kohdennetusti; docs/tilinvaihto.md | kaikki (session_mgmt, Artifact, ArtifactData, Cron, Monitor, gh, Agent) |
| Keskustelukanava | TYÖTAPA JA SESSIOT osat E ja I; docs/aloitusviestit/keskustelukanava.md | AskUserQuestion, session_mgmt, Artifact (vain open), Agent; ei simu-, selain- eikä tietokonetyökaluja |
| Julkaisija | TYÖTAPA JA SESSIOT osat B, C ja F; osio Jakelu ja iOS-kuori; viesti-julkaisija-aloitus.md | Bash, gh, session_mgmt (send_message, list_events), iOS-simu, ArtifactData (talo/eteneminen vaihe 5); ei selain-, tietokone- eikä dokumenttityökaluja |
| Natiiviseppä | TYÖTAPA JA SESSIOT osat B ja C; NATIIVI PELI ETUSIJALLE; viesti-natiiviseppa-aloitus.md | Bash, iOS-simu, send_message, Agent, ArtifactData (talo/eteneminen vaiheet 1–4); ei selain- eikä tietokonetyökaluja |
| Natiivi-UI | UI-POHJAT JA TYYLIMÄÄRITTELYT, NATIIVI PELI ETUSIJALLE, osio Arkkikirjasto; viesti-natiivi-ui-aloitus.md | Bash, iOS-simu, send_message, Agent |
| Pelikoodari | UI-POHJAT, NATIIVI PELI ETUSIJALLE, osiot Karttalinssit ja Fokusmoodi; viesti-pelikoodari-aloitus.md | Bash, iOS-simu, send_message, Agent |
| Linssiseppä | osio Karttalinssit, NATIIVI PELI ETUSIJALLE; viesti-linssiseppa-aloitus.md | Bash, iOS-simu, send_message, Agent |
| Valoseppä | osio Karttalinssit, NATIIVI PELI ETUSIJALLE; docs/aloitusviestit/valoseppa.md | Bash, iOS-simu, send_message, Agent |
| Karttaseppä | osiot Kaupungit ja Karttalinssit (pallo), NATIIVI PELI ETUSIJALLE; viesti-karttaseppa-aloitus.md | Bash, send_message, Agent; ei simu- eikä tietokonetyökaluja |
| Linnanrakentaja | HISTORIALLISET KOHTEET SEIKKAILUINA, osio Kuvat ja lähteet; docs/aloitusviestit/linnanrakentaja.md | Bash, send_message, Agent; ei simu- eikä tietokonetyökaluja |
| Siirtoseppä | HISTORIALLISET KOHTEET SEIKKAILUINA, NATIIVI PELI ETUSIJALLE; viesti-siirtoseppa-aloitus.md | Bash, iOS-simu, send_message, Agent |
| Sisältökirjuri | osiot Tarina ja hahmot, Kirjoittajan säännöt, Tekstien vetovoima, Kaupungit, Maalehdet ja lukeminen, Kuvat ja lähteet; viesti-sisaltokirjuri-aloitus.md | Bash, WebFetch, send_message, Agent; ei simu- eikä tietokonetyökaluja |
| Laitetestaaja | TYÖTAPA JA SESSIOT osat B (simulaattorit) ja C (testaus); viesti-laitetestaaja-aloitus.md | Bash, iOS-simu; ei selain- eikä tietokonetyökaluja |
| Äänittäjä | osio Äänet ja luennat, UUSIA ÄÄNIÄ EI GENEROIDA; docs/aloitusviestit/aanittaja.md | Bash, send_message; ei simu-, selain- eikä tietokonetyökaluja; Artifact vain äänisivun (Matkakirjan äänet) julkaisuun, ei Asemataululle (PT 14.10.) |
| Postivahti | TYÖTAPA JA SESSIOT osat I ja J; KIERROS.md ja NOLLAUS.md | session_mgmt, ScheduleWakeup, Bash, Artifact ja ArtifactData (taulun vienti, talo/boost); ei simu-, selain- eikä tietokonetyökaluja |
| Asemataulu | TYÖTAPA JA SESSIOT osa J; ASEMATAULU-ROOLI.md, docs/moduulit/asemataulu.md | Artifact, ArtifactData, Cron, Bash, send_message; ei simu-, selain- eikä tietokonetyökaluja |
