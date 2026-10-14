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
