# Laitetestaaja: luovutus 25.10.2026 klo 06.00 (Postivahti: KOVA RAJA 65 %)

Korvaa luovutuksen 22.10. 00.10. Voimassa oleva tila. Tili: vvi@vvi.fi (vaihtui 23.10.).

## Tila: LEPO, iPad Pro 13 vapaa
Ei ajoja käynnissä. iPad Pro 13 (00008103-001819421413401E, fi.matkakirja.peli.kehitys): rungossa eeaa1a4db (+ PK reittikorjaus 965d67df1), asennettu 05.43. NS asentaa seuraavat ja kuittaa "ASENNETTU <sha>" – älä käynnistä ajoa ennen kuittausta (ajo + asennus samaan aikaan = "failed to launch" / väärä runko). Tarkista aina konsolin ensimmäisen rivin aikaleima vs. kuittauksen aikaleima (app 8–20 s asennuksen jälkeen).

## Viimeisin tulos: eeaa1a4db VIHREÄ (reittiajo 05.44)
J 9,58 / A 10,58 ms (raja 14), J 0 > 20 ms (max 16,97). Aukio 180 s: käännösnykäykset 3, pysähdyksiä 0; sisätila 120 s: 3 / 0; kamerahyppyjä 0. Edellinen 029bb8aa1 oli punainen (pysähdyksiä 13/11, käännösnykäyksiä 12/9) → korjattu. Aineisto proto-3d/_tyo/linssiseppa2/varjot-koko/kierros211l-eeaa-*/.

## Juna 210: viimeisin täysi kierros (4bbdc3e89, kierros210ag, 24.10.): VIHREÄ
A 9,59 / J 9,43, Lähi 9,48/9,54, käännösnykäykset 0/0, kamerahypyt 0/0, alkulento puhdas, kylmät 0/5, loppukortti ok, värinä 0,29/0,14/0,27 %; saapumislento vanha vika (siirretty junaan 211; askeleet 1–19 dokumentoitu syyt-riveillä kansioissa kierros210ah…kierros210bb-saapumis/).

## Seuraajan tehtävät (PT 05.5x)
1. Runko 14359846b (lahipuut-v4, pihapuut pois juoksuväyliltä) ja sitä seuraava runko (v4-puut, v43-sali, PK 57a44b422): reittiajo samoin kuin eeaa1a4db: `bash ja_reitit.sh <nimi>` (J+A puhdas + aukio 180 s + sisätila 120 s).
2. 217 ms:n ensiruudun tarkistus nykäysrivin uusista merkinnöistä (ensimmäinen ruutu 59–108 ms on aina testiajon komentotiedoston luku "testiajo: komentotiedosto luettu").
3. Muuten vain: yöjunan täysi kierros kerralla, kun NS lukitsee (`ketjuFull.sh`), ja omistajan pyytämät kuvat/videot. Muut iPad-välimittaukset on lopetettu (omistaja 24.10. 01.31; raketti on videota, GPU-puolitukset peruttu).

## Skriptit (kopio repossa: docs/raportit/laitetestaaja-pelaaja-tyokalut-20261025/, polut S=scratchpad vaihdettava)
ja_reitit.sh (J+A + reitit), ketjuFull.sh (täysi kierros; sisältää yoC J/A, alku.zsh alkulento, saap-skripti, yoR reitit, yo34 maali, kylmät, yoK latauskuvat, ajoJK2 Lähi, yoVar värinä viimeisenä), kamera.sh, saap.sh + anaSaap.sh (saapumislento 2× NLD, syyt-rivit ≥ 40 ms), raketti4.zsh (vain historiaa), ajoJ.sh/yoJ.zsh (vanha: sisältää värinäsarjan ennen J:tä → ÄLÄ käytä J:n vertailuun).

## Opit (voimassa)
- Mittausjärjestys: J/A ENNEN värinä-/kuva-/jäädytyssarjaa; värinäsarjan jälkeen mitattu J on artefakti (d97bca990: perus 19,5 vs 9,7).
- Värinämittari tarvitsee numpyn: /opt/homebrew/bin/python3 (ilman -I).
- iPad Pro 13 on M1 (iPad13,8, RAM 7519 Mt); MSAA 4 -muistiajo: vapaa min 1513 Mt, huippu 3606 Mt, jetsam 0.
- Käynnistys: `devicectl device process launch --console` voi antaa "failed to launch" (Invalid argument), jos asennus on kesken tai laite nukkuu → tarkista konsolitiedosto ennen ajoa (konsoli ≥ 400 tavua).
- SendMessage-raja ~10 viestiä/käyttäjän viesti: varakanava mcp__ccd_session_mgmt__send_message session-id:llä (ToolSearch select).
- Id:t (24.10.): PT local_5df52e10-10e4-4b72-9554-0049db300dfe; NS local_8254cd90-9a85-4d61-8a06-085e7562f05f; PK local_4b3286ad-3ff4-4ca0-9d8f-feab0680bef6; VS luovuttanut (kova raja) – PT välittää; Postivahti local_cbc0dff7-2598-4ade-9106-0901f2e70478.
- Kierroksen lukitus: PK:n mittarit (käännösnykäykset ≤ 8/reitti, alkunykäykset 0, kamerahypyt 0, pysähdyksiä 0), GPU ≤ 14 ms, kylmät 0/5; saapumislento on vanha vika (211).
