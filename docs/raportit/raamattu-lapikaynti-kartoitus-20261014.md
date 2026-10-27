# Raamatun läpikäynti: kartoitus 14.10.2026

Tämä on lukeva kartoitus. Raamattuun ei ole tehty muutoksia eikä committeja.

- **Lähde:** `js/tyohuone-raamattu.js` haarasta fable-kirjaukset-1410 (PR #4599), 460 541 tavua, 4 091 riviä.
- **Mainin tilanne:** main (f05dd581f) on nyt 460 561 tavua. Siihen on tullut yksi lisäkirjaus, läpinäkyvyyden raja 21.42.
- **Raja:** testi `tests/raamattu-loki.test.mjs` sallii enintään 450 × 1024 = 460 800 tavua. **Väljää on 239 tavua.**
- **Tekijät:** kahdeksan Opus-agenttia kävi Raamatun läpi paloittain ja kaksi vertasi muistia Raamattuun (183 sääntömuistia). Päätoimittajan apuagentti kokosi tulokset.
- **Merkinnät:** alakohdan tunnus on muotoa osio.kohta.alakohta. Pilkonta tehtiin ISOILLA KIRJAIMILLA kirjoitettujen avainsanojen kohdalta (611 alakohtaa, kartta: scratchpad `alakohdat.tsv`). Rivinumerot (L) ovat lähdetiedoston rivejä.

## Tiivistelmä

| Löydös | Määrä (yhdistettynä, noin) |
|---|---|
| Päällekkäisyydet | 70 |
| Ristiriidat Raamatun sisällä | 80 |
| Vanhentuneet kohdat (kumotut, tauolla olevat, päivämäärään sidotut tilat) | 95 |
| Muistin ja Raamatun erot | 76: 51 puuttuu Raamatusta, 13 ristiriitaa, 12 vanhentunutta muistia |

Lisäksi 49 muistia on puhdasta tekniikkaa, eikä niitä kuulu kirjata Raamattuun.

**Arvioitu säästö:**
- **Sisältö:** noin 120–140 kt sisällön 399 kt:sta, eli noin 30–35 %. Tämä ei vaadi testimuutoksia.
- **Lokiviiterivit:** lisäksi noin 25 kt, jos "Loki: … #OTSIKKO, #OTSIKKO" -listat tiivistetään. Tämä vaatii testimuutoksen (ks. Rakenne, kohta 2).
- **Rivitys:** lisäksi noin 25–50 kt pelkästä rivityksestä, ilman sisältömuutoksia (ks. Rakenne, kohta 1).

## Rakennetta koskevat havainnot (ennen sisältöä)

1. **Rivinjatkot vievät 53 448 tavua (12 % tiedostosta).**
   - Syy: lähes jokainen rivi on muotoa `'\n          + '`, ja niitä on 3 566. Rivin pituuden mediaani on 81 merkkiä.
   - Jos rivit olisivat noin 200 merkin mittaisia, säästöä tulisi noin 25 kt. Jos jokainen kohta olisi yksi merkkijono, säästöä tulisi noin 50 kt.
   - Sisältö ei muutu lainkaan, ja `tests/raamattu-muokkaus.test.mjs` lukee kohdat oliosta, ei riveiltä.
   - **Tämä on nopein tapa saada väljyyttä rajaan.**
2. **Lokiviitteet vievät 27 338 tavua.**
   - Kohtia on 53 ja otsikkoviitteitä 399. Testi vaatii vähintään 300 otsikkoviitettä ("jako näyttää puretulta").
   - Ehdotus: viitelistan tilalle tulee yksi tiedostoviite per kohta, esim. "Loki: docs/raamattu-loki/paatokset-2026-09-03--09-14.md".
   - Tämä vaatii, että Päätoimittaja muuttaa testin rajan, esimerkiksi niin, että "jokainen viite osoittaa olemassa olevaan tiedostoon" riittää. Ilman muutosta osioiden 6, 10 ja 13 lokiviitteet on pidettävä.
3. **Kaksi jättikohtaa sisältää kymmeniä aiheita:**
   - 0.11 TYÖTAPA JA SESSIOT (L334, 71 kt, 85 alakohtaa)
   - 0.13 NATIIVI PELI ETUSIJALLE (L828, 51,6 kt, 55 alakohtaa)

   Lisäksi pilkonta on monessa kohdassa katkaissut virkkeitä tai liimannut aiheita yhteen, esim. 0.13.21 (6,8 kt) ja 0.5.9. Ensimmäinen ehdotus on jakaa nämä omiksi kohdikseen, jolloin aiheella on yksi otsikko ja yksi paikka.
4. **Osio 10 "Viisas Pöllö" (52 kt) on kaatoallas.**
   - Pöllöä koskee noin 5,6 kt, ja suurin osa siitä on kumoutunut, koska Pulu tuuraa.
   - Loput kuuluvat muihin osioihin: Mac Studio ja avaimet (10.20, 7,9 kt), äänet (10.9–10.11), linssit (10.5–10.8), web-karttapallo (10.3), Pulun kuplat ja kehittäjätila.
   - CLAUDE.md viittaa nimellä kohtaan "MAC STUDIO: UUDEN SESSION ALOITUS…". Siirron jälkeen viittaus pitää päivittää.
5. **Päivämäärän ja kellonajan etuliitteet** muodossa "(omistaja pp.kk.2026 klo hh.mx, kortti "…", sitova)" vievät noin 35 kt. Lisäksi sanatarkkoja lainauksia on arviolta 20–30 kt; regex-mittaus antaa ylärajaksi 185 kt, koska lainausmerkkiparit sekoittuvat. Kun kohtaan jää vain "(pp.kk.)", lainaukset siirtyvät lokiin.

## 1. Aihekartta (osio → rivi, koko, painavimmat kohdat)

| # | Osio | Rivi | Tavua | Painavimmat kohdat (koko) |
|---|---|---|---|---|
| 0 | Ydinajatus ja kohderyhmä | L27 | 169 371 | 0.11 TYÖTAPA (71 074), 0.13 NATIIVI (51 570), 0.8 HISTORIALLISET KOHTEET / Olavinlinna (9 512), 0.5 ÄÄNET, ostot, ämpäri (8 043), 0.9 PELIT, TALOUS JA LUENTA (6 665), 0.1 VAIN EUROOPPA (5 145), 0.12 TYÖSKENTELYTAVAT AINA RAAMATTUUN (2 515) |
| 1 | Perustuslaki | L1060 | 948 | |
| 2 | Tarina ja hahmot | L1085 | 9 109 | 2.0 Horatio ja vuoden 1873 todellisuus (3 507) |
| 3 | Kirjoittajan säännöt | L1241 | 2 807 | |
| 4 | Tekstien vetovoima | L1300 | 792 | |
| 5 | Pelin kulku | L1321 | 1 488 | |
| 6 | Fokusmoodi | L1354 | 31 611 | 6.19 KUVAT (3 393), 6.13–6.17 web-kartta (noin 8,6 kt), Pulu-chat 6.5–6.8 |
| 7 | Arkkikirjasto | L1744 | 6 312 | animaatiot 7.0–7.1, kohtaukset 7.2 |
| 8 | Aarteet | L1821 | 3 762 | 8.3 paljastus |
| 9 | Karttalinssit | L1896 | 40 798 | 9.0 ELÄVÄ OPAS / kuumailmapallo (25 597), 9.1 ISS (4 034), 9.2 Ajattelija |
| 10 | Viisas Pöllö | L2077 | 51 747 | 10.20 MAC STUDIO (7 861), 10.9 ÄÄNET (4 320), 10.7 IHMISEN MATKA (3 274), 10.3 KARTTAPALLO (3 189), 10.16 LUENTAKUVAT (3 081) |
| 11 | Tutki kätkö | L2817 | 461 | |
| 12 | Kohtaamiset | L2832 | 1 242 | |
| 13 | Kaupungit | L2860 | 38 079 | 13.11 SAAPUMINEN (7 274), 13.7 NOSTOT (4 080), 13.13 ASTRONAUTIN KAMERA (3 535), 13.10 MAAPANEELI (2 952), 13.12 LIIKKUMINEN (2 950) |
| 14–15 | Ihmeet, Maalehdet | L3330, L3365 | 2 728 | |
| 16 | Äänet ja luennat | L3398 | 6 930 | |
| 17 | Kuvat ja lähteet | L3469 | 11 244 | ämpäri 17.9–17.11, avaimet 17.18–17.19 |
| 18–23 | Lukijat, editori, talous, rajaukset, sanasto, moduulit | L3689–L3815 | 5 870 | |
| 24 | Jakelu ja iOS-kuori | L3845 | 1 424 | |
| 25 | Poistetut ideat | L3880 | 1 575 | |
| 26 | Ohjedokumenttien kartta | L3915 | 10 053 | |

### Aiheet, jotka ovat hajallaan monessa osiossa

| Aihe | Kohdat | Tavua (noin) |
|---|---|---|
| Junat ja TF | 0.11.1, .2, .21, .65–.68; 0.13.51–.52; 6.6.2; 10.18.1 | 9 |
| Äänimalli ja kertoja | 0.5.9–.11; 10.9.0; 16.0–16.8; 9.2.0 | 6 |
| Ämpäri | 0.5.5, 16.4, 17.9–17.11 | 3,2 |
| Kuvien tuotanto | 6.11, 6.18–6.20, 13.8–13.9, 14.3, 17.1–17.3, 0.5.7, 0.17.0 | 8 |
| Suojatut teokset ja panoraamavapaus | 0.5.6–.8, 9.0.6 | 2,5 |
| Kehittäjätila ja KOKEET | 0.13.3, 0.13.21, 10.18.0–.1 | 2,5 |
| Avaimet | 10.20.2–.6, 17.18–17.19, 0.13.27 | 3 |
| Aloituskaupungit ja avaus | 0.13.6–.9, 5.1.0, 13.11.1, 2.7.2, 2.14.0 | 5 |
| Pulu-chat | 6.5–6.8, 10.13–10.14, 10.31–10.33, 0.15.0 | 7 |
| Codexin työnjako | 0.16.0, 0.17.0–.1, 0.11.19, 0.11.30 | 4 |
| Peking ja Olavinlinna (tauolla 10.10.) | 0.1.3–.5, 0.5.9, 0.8.x, 0.9.1, 0.17.1, 0.13.14, 9.0.12, 0.11.66, 0.11.11 | 12 |

## 2. Päällekkäisyydet, ristiriidat ja vanhentuneet

Kunkin kohdan rakenne: kohdat, uusin päätös, ehdotettu yksi voimassa oleva muotoilu ja mitä siirtyy lokiin.

### 2.1 Ristiriidat (tärkeysjärjestyksessä)

| # | Asia ja kohdat | Arvot | Uusin | Ehdotettu yksi muotoilu | Lokiin |
|---|---|---|---|---|---|
| R1 | **Juna ja TF-rytmi.** 0.11.1 (7.10.), 0.11.21 KEHITYSTAHTI (6.10.), 0.11.67 (24.9.), 0.13.51 (24.9.), 0.11.66 (12.10.) | Viisi eri linjaa: "1–2 kertaa päivässä", "heti kun edellinen on TF:ssä", "automaattisesti jokaisesta BUILD-mergestä", "Fable käskee jokaisen merge-erän jälkeen" ja "vain omistajan pyynnöstä, enintään 2/vrk". | 12.10. (sekä 14.10.: muistiajokin jää pois, jos omistaja sanoo "ilman testejä", 0.11.22) | "TF-juna lähtee vain merkinnällä OMISTAJA PYYSI JULKAISUA, enintään kaksi päivässä. Ennen sitä ajetaan automaattiset testit ja käännös. Muistiajo jää pois vain omistajan erillisellä sanalla. Keskeneräinen siirtyy seuraavaan junaan." | 0.11.21 KEHITYSTAHTI, 0.11.67 TILATAULU, 0.13.51 sekä 0.13.52:n "Fable ilmoittaa jokaisesta buildista" |
| R2 | **Web vai natiivi mallina.** 13.0.0 ("web on malli, natiivi seuraa", 26.9.), 0.13.49, 7.1.1 ja webin mitat kohdissa 0.13.13/.28/.29/.32, 0.13.3 "EI WEBISSÄ → KYSY", 6.13–6.17, 10.3–10.8, 23.x, 24.x | Web on malli, vastaan natiivi on malli. | 29.9. (0.3.0), vahvistettu 5.10. (0.13.5) | Linja vain kohdassa 0.3.0: "Natiivi johtaa; mallina ovat natiivin UI-pohjat ja tyylikirja; webin käyttöliittymä on tauolla." Muut kohdat kirjoitetaan alustasta riippumattomiksi. Mitat siirtyvät moduulidokumentteihin. | Web-mitat ja tiedostopolut (arviolta 15–20 kt) |
| R3 | **Ostot.** 0.5.2 (7.10.: maksulliset sallittu, omistaja ostaa) ja CLAUDE.md, vastaan 0.5.3 (12.10.) | Osta, vastaan ei ostoja. | 12.10. | "Toistaiseksi ei ostoja eikä ostoehdotuksia (12.10.). Käytetään CC0-, CC BY- ja PD-aineistoja sekä omia aineistoja; niitä saa ladata aina." | 0.5.2 ja 0.8.10:n Character Creator -lause. **CLAUDE.md:n "Maksulliset äänilähteet…" -rivi on vanhentunut.** |
| R4 | **Äänimalli ja kertoja.** 0.5.9 ("aina v4", 30.9.), 16.0 ("v4-äänet"), 16.5 ja 16.8 (Viisas Kertoja lukee saapumiset, kohtaamiset, aarteet ja luennat), vastaan 0.5.11 | Kertoja ja malli vaihtelevat kohdittain. | 14.10. | "Uudet äänet: eleven_v4_turbo. Isoisä aina eleven_v3 (Viisas Kertoja, stability 0,5). Muut tekstit: William. Ei fi-merkittyjä ääniä; language_code fi. Generointi vain luvalla (0.5.0–0.5.1)." | 0.5.9:n ÄÄNIVALINTA, 10.9.0:n mallirivi. 16.5 ja 16.8 korjataan. |
| R5 | **Omistajan kanava ja kysymykset.** 0.11.72 ja 0.11.73 JUMI (25.9.: kortti PT:n omassa sessiossa, yöllä viesti), 0.11.28, 0.19.0 ("TEKSTINÄ VUORON LOPUSSA"), vastaan 0.11.30 ja 0.11.31 | PT:n kortti, vastaan kortti vain Keskustelukanavassa. | 14.10. | "Omistajalle kuuluva kysymys lähetetään Keskustelukanavalle (KYSYMYS <tunnus>, suositus ensin). Kortteja saa tehdä milloin vain. Yöllä PT jatkaa oletuksella. Rooli saa oletuksen ja jatkaa." | Vanhat kortti- ja JUMI-ketjut |
| R6 | **Tyhjäkäynnin raja.** 0.11.29 ("LEPÄÄ", yli 15 min, 8.10.), vastaan 0.11.30 TYHJÄKÄYNTIVAHTI | 15 min, vastaan 20 min (Codex 30 min) | 14.10. | 20 min, Codex 30 min | 15 min |
| R7 | **Postivahdin nollaus.** 0.11.40 kohta 3 ("PT nollaa Postivahdin", 11.10.; "ilman omistajan kyllä-vastausta"), vastaan muisti | PT nollaa, vastaan Postivahti nollaa itsensä | 14.10. (muisti: pysyvä lupa) | "Postivahti nollaa itsensä, kun PT pyytää ja luovutus on valmis. Roolien nollauksen tekee Postivahti NOLLAUS.md:n mukaan." Selvitettävä: vaatiiko roolin nollaus omistajan suoran vahvistuksen (muisti osoitekirja-ja-nollaukset)? | Kohta 0.11.40.3 |
| R8 | **Viikkokiintiö 99 %.** 0.9.7 kohta 5 (väärässä osiossa talouden alla: "Fable pysäyttää kaikki sessiot ja kirjoittaa siirtopromptin"), vastaan muisti ja 0.11.62 | Pysäytys, vastaan yksi rivi omistajalle | 9.10. | Kohtaan 0.11.62: "Koodaustilit 99 %: yksi rivi omistajalle, ei keventämistä; päätili 50 %. 5 tunnin kiintiö ei pysäytä ennen 98 %:a." | Kohta 0.9.7.5 |
| R9 | **Pulu-chat: live vai esigeneroitu.** 6.8.0 (26.9. "kaikki vastaukset live"), 10.31 ja 10.32 (lennossa), vastaan 6.7.0 (9.10. esigeneroitu) ja 6.6.x (10.10. live kaikille, alle 18-vuotiaille kuratoitu) | Kolme eri linjaa | 10.10. | **Päätoimittaja kirjoittaa yhden PULU-CHAT-kohdan osioon 6** (esigeneroitu peruspeli, live missä pakettia ei ole tai kaikille 10.10. mukaan, kuratoitu alle 18-vuotiaille). | 6.8.0:n viimeinen virke, 10.31–10.33 |
| R10 | **Worktreen poisto.** 0.11.19 B ("heti mergen jälkeen", yli 20 → hälytys), 0.11.20 ("heti kun PR avattu", enintään 3/rooli), CLAUDE.md ("mergen jälkeen"), muisti (vasta MERGED ja puhdas) | Neljä ajankohtaa | 24.9. ja 11.10. | "Enintään 3 per rooli, alle 20 yhteensä. Poisto, kun PR on mergetty tai suljettu ja tila puhdas; ennen poistoa grep viittauksista; proto-natiiviseppa-tyokaluja ei poisteta koskaan." **Päätoimittaja vahvistaa ajankohdan.** | Vanhat muotoilut |
| R11 | **Lokien siirto.** 0.11.20 (yli 2 vrk), vastaan 0.11.21 kohta 3 (NAS 1 vrk jälkeen); muistissa 48 h ja 30 Gt, 0.11.21 sanoo 100 Gi | 1 vrk / 2 vrk | 9.10. | 1 vrk, levyraja 100 Gi | 2 vrk |
| R12 | **Asemataulun id.** 0.11.42 (Rq5ajPU4…), vastaan 0.12.1 (EekZDPMu…), 0.11.43 (jokaisella tilillä oma kopio) | Kaksi id:tä | 14.10. | Id:tä ei kirjoiteta Raamattuun: "osoite tiedostossa tools/asemataulu/osoitteet.md". | Molemmat id:t |
| R13 | **Viestien välitys.** 0.11.69 (SendMessage ensisijainen), vastaan 0.11.82 OSOITEKIRJA | | 14.10. | "Viestit aina send_messagella session id:llä osoitekirjasta." | 0.11.69:n ensisijaisuus |
| R14 | **Italia.** 9.0.6 (7.–8.10.: Italian sisäkuvat ja kokoelmat pois), vastaan 0.13.20 ITALIA | Pois, vastaan mukaan | 14.10. klo 21.02 | "Sovellus ei ole Italian App Storessa (14.10.); Italian museot ja julkiset kohteet mukana PD-lähteistä; Vatikaani erikseen." | 9.0.6:n Italia-lause |
| R15 | **Bing.** 9.0.8 (9.10.: kielletty "edes laattojen takana"), vastaan 9.0.21 | Kielletty, vastaan sallittu varana | 11.10. | "Googlen kanssa samassa näkymässä ei muuta kuvaa; Bing Aerial vain Googlen 429-katkon varana." | 9.0.8:n kielto |
| R16 | **Kuumailmapallon ohjaimet ja kierros.** 9.0.4 (neljä nappia, TAPPI, Vaihda kohde, pallo joka kaupungissa, noin 8 pysähdystä), vastaan 9.0.3 ja 9.0.20 (11.10.) sekä 9.0.7 (12 kohteen lista) | | 11.10. | 9.0.4 kirjoitetaan uudelleen 9.0.3:n ja 9.0.20:n mukaan. **Päätoimittaja päättää kierroksen kohdemäärän** (enintään 12 lukitusta listasta, noin 8–10 pysähdystä). | Suurin osa 9.0.4:stä (noin 3 kt) |
| R17 | **Aloitus.** 5.1.0 (Lontoo aloituspaikka, 19 kaupunkia), vastaan 0.13.7 ja 13.11.1 (Ateena, Pariisi, Tukholma; Lontoo lähtöpaikka); avausteksti 2.14.0 "Vintiltä…", vastaan 0.13.8 "Ullakolta…"; 0.13.9 pallonäkymän avaus, vastaan 0.13.8 aloitusnäyttö | | 11.10. ja 24.9. | Kaupungit vain kohdassa 0.13.7. **Päätoimittaja päättää kanonisen avaustekstin.** | 5.1.0:n lista, 0.13.9:n pallokuvaus |
| R18 | **Lento ja ruudunpäivitys.** 0.13.6/.10 (24.9.), vastaan V3 (26.9. ja 7.10.); 0.13.25 satelliitti; fps: 0.13.37 (30 fps / ei piirtoa), 0.13.40 (lepo 10 Hz, pallo 40 fps, 11.10.), 0.13.44 ("animointi aina päällä"); grafiikka 0.13.39 (HDR pois), vastaan 0.13.41 (Ultra, SSAO, HDR, 8.10.), 0.13.15 museo | | 7.10. ja 11.10. | 0.13.10 = vain V3. Yksi FPS-taulukko (lepo 10 Hz, elävä kerros 30 fps vain kun jokin animoi, pallo 40 fps). 0.13.41 on yleissääntö, museo poikkeus. | 24.9.:n lentokuvaus, 0.13.39:n HDR-lause |
| R19 | **Animaatioiden kestot.** 7.1.0 (200–400 ms), 7.1.1 (320 ja 280 ms, "web on malli"), vastaan UI-raja ≤ 250 ms ja peitto ≤ 45 % (vain lokissa ja muistissa, ei Raamatussa) | | 1.10. ja myöhemmät | Kohtaan 0.11.8 UI-POHJAT: "UI-siirrot ≤ 250 ms, jatkuva sisältöliike rajan ulkopuolella, peitto ≤ 45 %, ei koristeita." **Omistaja päättää, ovatko 320 ja 280 ms poikkeuksia.** | 7.1.0:n vaihteluväli |
| R20 | **Pääaarteen paljastus.** 8.3.0 (diplomi, kehys, LÖYDETTY-leima), vastaan 6.2.0 (28.8. ilta: tumma, ei kehystä) | | 28.8. ilta | 8.3.0 = tumma paljastus, ei kehystä eikä leimaa | Diplomi |
| R21 | **Codexin työnjako ja julkaisulupa.** 0.15.0 (11.9.: "julkaiskaa heti"), 0.16.0 (Fable julkaisuvastaava), 0.17.0 (15.9.: Codex tekee äänet, Fable QA, WebKit), vastaan 0.11.19 ja 0.17.1 (11.10.) sekä 0.11.66 | | 11.–12.10. | Yksi noin 700 tavun kohta: "Codex: tekstit, animaatiot, havainnekuvat (fotorealistiset, PT hyväksyy), pääkaupungit; Claude: kaanon, Raamattu, koodi, kytkennät (Pelikoodari); äänet ja musiikki: Äänittäjä; toimitukset hakee Julkaisija." | 0.15.0, 0.16.0, 0.17.0 |
| R22 | **Kuvien generoija.** 14.3, 17.1.0 ja 17.3 (omistaja generoi ChatGPT:ssä), vastaan 0.17.0 ja 0.17.1 (Codex) | | 11.10. | Codex | ChatGPT-ikkuna |
| R23 | **Talouden yksiköt.** 20.0–20.1 ja 8.x (1000/2000 p), vastaan 0.9.4 ja 0.9.5 (aina £; alkuraha £300, lento £350) | | 11.10. | Osio 20 viittaa kohtaan 0.9. **Aarteiden summat punnissa tarkistetaan koodista, ja asia viedään Päätoimittajalle.** | p-summat |
| R24 | **Ansainta ja offline.** 15.6 (maksullinen, ei StoreKitiä), 25.2 (offline poistettu), vastaan 0.13.1 ANSAINTA (24.9.: ilmainen + lisäostot, alueiden offline-lataus) | | 24.9. | 0.13.1 | 15.6, 25.2 |
| R25 | **Unity.** 0.13.1 ("beetaan 6000.7.0b4, sitten LTS"), vastaan muisti ja loki 10.10. | | 10.10. | "Aina uusin 6.7-beeta (NS tarkistaa päivittäin klo 09); App Storeen vain lopullisella versiolla; paluupiste tagi unity63-viimeinen." | b4 |
| R26 | **Avainten kysyminen.** 10.20.4 kohta 3 ("kysytään omistajalta kortilla"), vastaan 10.20.1 ja CLAUDE.md (ei kysytä) | | 18.9. | "Etsitään; jos ei löydy → JUMI Päätoimittajalle." | Kohta 3 |
| R27 | **Rinnakkaisten agenttien raja.** 10.1.0 (noin 8), 10.20.1 (3), osio 0 (Mac-savukkeet 2), muisti (kevyt tila 2) | | 18.9. | Yksi luku osioon 0. **Päätoimittaja vahvistaa luvun.** | Muut luvut |
| R28 | **Suojatut teokset.** 0.5.8 ("peli on kaupallinen" → panoraamavapaus ei riitä), vastaan omistaja 13.10. ("ei kaupallista kuvaamista"); Espanjan 80 vuoden raja ja "ei omiksi 3D-malleiksi" puuttuvat | | 13.10. | 0.5.8 täsmennetään 13.10. linjan mukaan | Kaupallisuusperuste |
| R29 | **Ämpärivienti.** 10.20.x (`aws s3 cp`), vastaan muisti (vain vie-paketti.sh; ls sallittu) | | 10.10. | vie-paketti.sh | aws s3 cp |
| R30 | **Hiljainen tunti.** NICE-OLETUS (raskaat jatkuvat taskpolicy -b:llä), vastaan muisti (ei testejä eikä agentteja, kun omistaja käyttää Macia) | | 13.10. muistissa | **Päätoimittaja vahvistaa linjan**, ja se kirjataan kohtaan NICE-OLETUS | |

Muita ristiriitoja (pienempiä, korjataan samassa PR:ssä):
- 0.11.29 (3 riviä), vastaan CLAUDE.md "Lue ensin" (8 riviä). CLAUDE.md korjattiin 2cd664200:ssa, tarkistettava.
- 0.13.21 yläpalkki vaakatilassa, vastaan 10.18.0 (2.10. hampurilainen).
- KOKEET: 0.13.3 ja 0.13.21, vastaan 10.18.1 (7.10.).
- Kehittäjätila: 0.13.22 linssikielto ennen pariteettia, vastaan 0.3.0 ja 0.13.14 (museo tehdään nyt).
- Kreikka on kahdessa paikassa (9.0.7, 0.13.21).
- 13.2.0 ("kaupunkilehdestä luovutaan"), vastaan 13.0.0 (lehti säilyy).
- 13.20–13.22 kohdekartta, vastaan 13.3.0 ja 13.0.1.
- 13.18.0 ja 5.4.0 saapumiskortti, vastaan 13.0.0 ("ei avaudu mitään").
- 13.23.0 fokusvirta, vastaan FOKUSVIRTA_KORTIT = false.
- 3.9.0 merkkibudjetit, vastaan 2.0.2 ("pituudet elävät").
- 3.9 ja 3.10 aarreteksti joka kohteessa, vastaan 25.11.0 ja 13.11.2.
- 2.0.2 ja 3.1.0 "45 kaupunkia", vastaan 50.
- 6.19.0 "kaikki fotorealistisia", vastaan isoisän kynäluonnos (2.12.1, 13.11.2). Poikkeus puuttuu.
- 2.0.2 (Horatio sanoo kaupungin nimen), vastaan 13.11.2 (William introssa).
- 13.11.2 kohta 4 tuuraustervehdys, vastaan 13.11.1 ja 13.11.4 ("ei käytetä").
- 10.14.0 "alustukset pois", vastaan 6.5.1 (26.9. kumosi).
- 10.4.0 San Francisco ja Istanbul, vastaan VAIN EUROOPPA.
- 10.11.0 äänisivun ylläpito: Julkaisija, vastaan Äänittäjä.
- 10.23 ja 10.24 pöllö, vastaan Pulu-linja.
- 8.6.0 kauppa, vastaan 8.1.1 (linssit aarteina).
- 7.6.0 sulku ulkopuolelta napauttamalla, vastaan SULKUTAPA (11.10.).
- 7.1.0 "Fable tekee animaatiot oma-aloitteisesti", vastaan UI-POHJAT.
- 16.3.1, vastaan 16.3.2.
- 16.7, vastaan 16.3.0.
- 17.9 varareitti, vastaan 16.4.
- 17.4 (Commons, Finna, LoC, Flickr), vastaan "jatkossa vain Commons".
- 9.0.9 ja 9.0.12 mallijärjestys (työjono, ei sääntö).
- 9.5.0 ja 9.6.0 linssijärjestykset, vastaan linssikatalogi.
- 9.4.0 Keksinnöt, vastaan 10.6.0.
- 9.8.0 "linssit vain matkalaukusta", vastaan pallo, raketti ja aarre.
- 9.1.0, vastaan 13.13.0 (ISS:n ääni).
- 0.11.75 suomenkieliset valikot, vastaan 0.11.81 englanninkieliset koordinaatit.
- 0.11.3–.5 pilviapulaiset (opus vs. sonnet), vastaan 0.11.6 (krediitti käytetty).
- 10.20.3 ja 10.20.6 ANTHROPIC_API_KEY kahdessa paikassa.
- 0.8.4: ensimmäinen persoona, vastaan "takaa kuvattu kolmas persoona toissijaisena". Muistin mukaan ensimmäinen persoona, ei näkyvää hahmoa.

### 2.2 Päällekkäisyydet (suurimmat; yhdistetään yhteen kohtaan)

| Aihe | Kohdat | Pidetään | Säästö (noin) |
|---|---|---|---|
| Asemataulun kirjoittajat, vienti ja ulkoasu | 0.11.42–.61 | Sääntö noin 1 kt kohtaan 0.11. Ulkoasu tiedostoon docs/aloitusviestit/asemataulu.md tai uuteen docs/moduulit/asemataulu.md:hen (lisätään karttaan 26). ASEMATAULU-ROOLI.md:tä ei ole repossa. | 9–12 kt |
| Junasäännöt | ks. R1 | 0.11.66 | 2,5 kt |
| Codexin työnjako | 0.16–0.17.1, 0.11.19, 0.11.30 | yksi kohta | 1,9 kt |
| Ämpäri | 0.5.5, 16.4, 17.9–17.11 | 17.9 (noin 350 B) | 2,2 kt |
| Kuvaputket | 14.3, 17.1–17.3, 0.17.0, 13.9 | KUVAPUTKET (noin 500 B) ja 13.9 nostoille | 2,0 kt |
| Keksinnöt-linssi | 9.4.0 ja 9.17.0, vastaan 10.5.0 ja 10.6.0 | 10.6.0 ja 8.1.1 | 1,3 kt |
| Valmiskysymykset ja Pulu-chat | 6.5.1, 6.7.x, 6.8.0, 10.14, 10.31–.33 | PULU-CHAT osiossa 6 | 1,9 kt |
| Nollaus 50 % | 0.11.41, .62, .80, .83 | 0.11.83 (PT 65 %, Keskustelukanava vain kortilla) | 1,2 kt |
| Roolilista | 0.11.19 A, vastaan 0.11.82 | yksi taulukko kohtaan 0.11.82 (rooli, kansio, malli, effort) | 1,0 kt |
| Avaimet | 17.18–17.19, 10.20.2–.4, 0.13.27 | 10.20 (siirtyy osioon 0) | 1,0 kt |
| Peking ja Kielletty kaupunki | 0.1.3–.4, 0.5.9, 0.8.0, 0.8.12, 0.9.1, 0.17.1, 0.13.14 | yksi rivi: "tauolla 10.10.; Codex jatkaa 3D:tä" | 1,0 kt |
| Suojatut teokset ja panoraamavapaus | 0.5.6–.8, 9.0.6 | 0.5.8 | 1,1 kt |
| Googlen ehdot | 9.0.8–.12 | GOOGLEN EHDOT -kohta | 0,6 kt |
| Lukijan ohjaimet | 16.2.1, 16.3.x, 16.7, 25.7 | LUKIJAN OHJAIMET | 0,9 kt |
| Kysymykset omistajalle | 0.19.0–.1, vastaan 0.11.30–.31 | 0.11.30 | 0,6 kt |
| Lupaikkunat ja shell -c | 0.11.37–.40 | yksi kohta | 0,9 kt |
| Poistettujen luettelot | 6.22.0, 8.0.0, vastaan osio 25 | osio 25 | 0,7 kt |
| Natiivi on malli | 0.3.0, 0.13.0, 0.13.5, 0.11.27(3) | 0.3.0 | 0,5 kt |
| Kamera-ajot | 0.13.26, 9.16.0, 6.16.0, 7.2.1 | 0.13.26 | 0,4 kt |
| Kaanonin toistot | "Odottanut 150 vuotta", revitty sivu, ei ivaa, seuraaja, 2.12.0/.1 | yksi paikka kullekin | 0,4 kt |
| Muut, noin 50 pientä | | | 6–8 kt |

### 2.3 Vanhentuneet (siirretään lokiin)

| Ryhmä | Kohdat | Säästö (noin) |
|---|---|---|
| **Olavinlinna tauolla, mutta kirjoitettu voimassa olevaksi.** Videopelien yhteiset säännöt jäävät (1. persoona, ei opettamista, ei Pulua, ei väkivaltaa ihmisiä vastaan, vihjeet). | 0.8.1, 0.8.7–.12, 0.1.5 ("ensin Olavinlinna valmiiksi"), 0.11.11 KYLTIT, 0.11.14, 0.11.25, 0.11.66 (olavinlinna-vahti, simu), 9.0.12 pilottiseinä, 10.9.0 loppumusiikki | 5 kt |
| **Peking tauolla.** Tauko (10.10.) on vain muistissa; kirjataan Raamattuun yhdeksi KESKITYS-riviksi (Peking, pyörimislinssi, Olavinlinna tauolla; ei uusia sivuprojekteja). | 0.1.4, 0.5.9, 0.13.14 | 1,1 kt |
| **Pilvikrediitti käytetty.** Jää noin 600 B: "pilvisessiot vain omistajan päätöksellä…". | 0.11.3–.7 | 4,4 kt |
| **Pöllö (Pulu tuuraa 19.9. alkaen).** Jää yksi lause. | 10.22–10.33 | 4 kt |
| **Web-aikakauden toteutus.** | 10.3–10.8, 10.15–10.18, 6.13–6.17, 6.1, 6.10, 6.19 (js-polut), 9.4, 9.6, 9.7, 9.15, 13.4, 13.6, 13.11, 16.6–16.7, 23.x, 24.x, 26.25–26.28 Fablemax | 15–18 kt |
| **TILATAULU** (korvattu Asemataululla 10.10.). Sana esiintyy myös kohdissa .69, .74 ja .75. | 0.11.67, "Talon tila -lisäosa" | 0,9 kt |
| **Päivämäärään sidotut tilat:** junat 177/181/182/183/179, PR:t #3122/#3902/#4224/#4230/#4239/#2535, v1499/v1975/v1988, BUILD-numerot, "huomiseksi" (0.8.11), "kokeiluna Prahassa", "Bryssel… tehty, tulevat…" (13.7.1), inventaarioluvut (13.8.0), "AVOINNA"-listat (2.1.1, 8.3.0), "1. erä 16 kpl" (10.10.0), "siirrettiin 485 tiedostoa" (10.11.0), apurahakortti (0.13.9), "ensimmäinen 6.7-TF muistiajon jälkeen" (0.13.1), P-numerot P1–P53, löydösnumerot | eri kohdissa | 6–8 kt |
| **Kertatoimet ja tekniset ohjeet** (siirto moduulidokumentteihin): worktreen siirto roolinimelle (0.11.62), GUI-koordinaatit (0.11.81), Scarlett ja AudioServiceOutOfProcess (10.20.7–.8), zshrc-asennus (10.20.6), NAS-menettely (9.0.7), vertailuportin paluukoodit (9.0.11), ISS-julisteen mittaspeksi (9.1.0) | | 4 kt |
| **Rikkinäiset viittaukset:** `js/fokuskartta.js` puuttuu (24.2); `proto-3d/tyokalut/aaniportti.py` on natiivirepossa (16.1.1, polkuun repon nimi). Kartan 26 polut ovat olemassa. | | |
| **Vuotaneet karsintamerkinnät** "Loki: … #KARSINTA 11.10.2026" | 0.1.7, 0.5.11, 0.8.12, 0.19.1, 0.11.84, 0.13.54 | 0,7 kt |

## 3. Muisti ja Raamattu

Muistitiedostoja verrattiin 183 (type feedback tai project; tilaraportit jätettiin pois).

| Luokka | Määrä |
|---|---|
| Täsmää | 58 |
| Puuttuu Raamatusta, kirjattava | 51 |
| Ristiriidassa | 13 |
| Vanhentunut muisti | 12 |
| Teknistä, ei kuulu Raamattuun | 49 |

### 3.1 Ristiriidat (muisti ↔ Raamattu)

| Muisti | Raamattu | Ehdotus |
|---|---|---|
| julkaisu-vasta-omistajan-pyynnosta (muistiajo aina) | 0.11.22 (14.10. klo 20.1x: "älä tee muistiajoa", kun "ilman testejä") | Muisti päivitetään. Raamatun KEHITYSTAHTI poistetaan (R1). |
| osoitekirja-ja-nollaukset-postivahdille (nollaus vasta omistajan vahvistuksella) | 0.11.40.3 ("ilman omistajan kyllä-vastausta") | **Päätoimittaja päättää.** Linja kirjataan kohtaan 0.11.83. |
| postivahti-oma-nollaus-pysyva-lupa | 0.11.40.3 (PT nollaa Postivahdin) | Kirjataan Raamattuun (R7) |
| viikkoraja-97-siirtoprompti | 0.9.7.5 (pysäytä kaikki) | Raamattu korjataan (R8) |
| natiiviseppa-tf-sha-viesti | 0.13.51 | Raamattu korjataan (R1) |
| unity67-paivitysseuranta | 0.13.1 (b4) | Raamattu korjataan (R25) |
| max-effort-vain-tarpeeseen (max vain uuden kokonaisuuden suunnitteluun, toteutus high) | 0.11.79 ("keskeisiin hetkiin") | 10.10. tarkennus kohtaan 0.11.79 |
| codex-tilaus-ei-suojattuja-teoksia | 0.5.8 | Raamattu täsmennetään (R28) |
| google-oma-reitti-odottaa (suora reitti, kun ionin kiintiö loppuu) | 9.0.x ("aina Cesium ionin kautta") | **Päätoimittaja päättää.** Joko ODOTTAA-ehto Raamattuun tai muisti kumotuksi. |
| hiljainen-tunti-ei-testeja | NICE-OLETUS | **Päätoimittaja päättää** (R30) |
| levyn-vapautus-mergetyt-worktreet | 0.11.20 | R10. Lisäksi ALA-POISTA-poikkeus (proto-natiiviseppa-tyokalut). |
| ampari-vienti-vain-vie-paketti | 10.20.x (`aws s3 cp`) | Raamattu korjataan (R29) |
| lokikansiot-vain-kuvat-konsoli (48 h, 30 Gt) | 0.11.20 ja 0.11.21 (1 vrk ja 2 vrk, 100 Gi) | Muisti on vanhentunut. Raamatun kohdat yhtenäistetään (R11). |

### 3.2 Puuttuu Raamatusta (kirjattava; TYÖSKENTELYTAVAT AINA RAAMATTUUN, 14.10.)

**Tärkeimmät:**
- **omistajalle-vain-suomeksi.** Koko kielisääntö puuttuu. Kohtaan 0.11.34: "Kaikki omistajalle näkyvä suomeksi; ei selittämätöntä ammattisanastoa."
- **ui-kevyt-ei-koristeita.** Peitto ≤ 45 % ja animaatio < 250 ms puuttuvat. Kohtaan 0.11.8 (R19).
- **keskitys-ydinprojektit-20261010.** Peking, pyörimislinssi ja Olavinlinna tauolla; ei uusia sivuprojekteja. Uusi KESKITYS-rivi kohtaan 0.0 tai 0.12.
- **generointi-vain-omistajan-luvalla.** Pysyvä lupa kertojaäänille (PT:n hyväksymä käsikirjoitus, enintään noin 10 000 merkkiä, yksi otto). Kohtaan 0.5.1. Ristiriidassa 0.5.0:n "lupa koskee vain nimettyä erää" kanssa: **Päätoimittaja vahvistaa.**
- **lataukset-pysyva-lupa.** "Aina saa ladata" (CC0/CC BY/PD). Kohtaan 0.5.
- **kortti-pysayttaa-paatoimittajan.** Yöllä oletus ja kysymykset aamun korttiin. Kohtaan 0.11.30.
- **omistajan-toimet-korttina.** "TOIMI TARVITAAN", yksirivinen bash-lohko, read -s. Kohtaan 0.11.49.
- **fable-ei-mergea-koodia** ja **pr-palkki-pois-mergen-jalkeen.** PT mergeää vain raportit ja lokin, ei --delete-branchia, ja tekee unbind_pr heti. Kohtaan 0.11.35 tai julkaisusääntöihin.
- **agenttiohje-ei-lupakyselyja**, **ei-shell-c-eika-evalia**, **tiedostomuokkaus-valiaikaisen-kautta**, **ei-pkill-f-jaetulla-koneella**, **ei-simctl-shutdown-all.** Kootaan yhdeksi KOMENTOSÄÄNNÖT-kohdaksi 0.11.37–.40:n tilalle.
- **hiljainen-jumi-list-events** ja **laitetestaaja-tulokset-list-events** (TULOS-rivi, ei "jatka"-pyyntöjä). Kohtaan 0.11.69.
- **sha-vain-git-logista** ja **loydosrivit-fablelle-rivina.** Kohtaan 0.11.29.
- **tavoiteltu-kokemus-ei-parametreja** ja **omistajan-paatos-ei-valiaikaisia-poikkeamia.** Kohtaan 0.11.72.
- **omistajan-kuvat-rajattuna** ja **tarkistus-laitteella-aanen-kanssa.** Kohtaan 0.13.50.
- **juna-pr-ilman-versionostoa** ja **omistajan-palaute-junaan-ei-testikaannosta.** Kohtaan 0.11.66. Huom: myös CLAUDE.md:n versiosääntö on ristiriidassa tämän kanssa.
- **tarkista-sh-ennen-kaannospyyntoa**, **jaettu-kaannospalvelu-luokitin**, **nui-keskitysajot-l2-ilman-pyyntoa**, **poltot-rinnakkaisuus-paivalla.** Kohtiin 0.11.2 ja 0.11.66.
- **kone-jumissa-kevyt-tila**, **paistot-muistiraja**, **mac-gui-automaatio-omistajan-naytolla**, **aikarajalliset-liput-ajastettu-poisto.** Kohtaan NICE-OLETUS.
- **aariviiva-pienessa-tekstissa-sotkuinen** ja **natiivi-pohjavahti-ei-varivakioita.** Kohtaan 0.11.8.
- **musiikki-ei-savelkorkeuden-siirtoa**, **aanisivu-pelissa-merkit**, **aanisivu-arkistoon-vain-hylatyt.** Ääniosioon 16 (kun äänet siirretään sinne osiosta 10).
- **ei-googlen-3d-laattoja-codexille** ja **cesium-kysymys-ajonaikainen-korkeus.** Kohtaan GOOGLEN EHDOT.
- **pt-hyvaksyy-codex-kuvat-20261013** ("Voit hyväksyä puolestani"). Codex-kohtaan.

**Muut:** paatoimittajan-haara-jaa-jalkeen, push-laukaisee-cin-samalle-macille, puhemittaus-paivaraja, nayton-resoluutio-2560-oikea, worktree-poisto-tarkista-viittaukset, todennus-puhtaalla-asennuksella, oma-simu-sammuksiin-ajon-jalkeen, pitkat-ajot-setsid-irrotus, lisaysversio-kysy-natiivisepalta, osoitin-ei-kesken-linna-ajon, loki-merget-junan-aikana.

### 3.3 Vanhentuneet muistit (päivitetään tai arkistoidaan muistista)

isoisan-aanisuosikit, appikopion-poisto-tarkista-kaytto, juna-avaus-julkaisijan-kuittauksella, karttaseppa-elava-kartta-data, huonesiirtymat-napautuksin, ipad-testit-omistajan-lupa, testattavaa-yksi-rivi, natiiviseppa-oma-simulaattori, natiivi-csharp-ilman-editoria, testikaannos-ei-junan-edelle, maakunta-pr-yksi-kerrallaan, sim-detach-irrottaa-kaikki, simulaattori-erase-levy, lokikansiot-vain-kuvat-konsoli.

Perustelut:
- isoisan-aanisuosikit: vakaus 1,0 ja "ei valittu", kun Raamatussa on v3 ja 0,5.
- maakunta-pr-yksi-kerrallaan: erä 5 on Euroopan ulkopuolella.
- Simulaattorimuistit: T7-sarja 8.10. alkaen.

## 4. Ehdotettu PR-järjestys (yksi osio per PR)

Kussakin PR:ssä on oma lokikirjaus, eli `tools/raamattu-kirjaa.mjs "KARSINTA <osio>"`, jossa poistettu teksti on sanatarkasti tallessa. Lisäksi ajetaan `node --test tests/raamattu-loki.test.mjs tests/dokumentit.test.mjs`.

| # | PR | Sisältö | Säästö (noin) |
|---|---|---|---|
| 0 | **Rivitys** (valinnainen, riskitön) | Rivinjatkot noin 200 merkkiin. Sisältö ei muutu (diffin tarkistus: `JSON.stringify(RAAMATTU)` sama ennen ja jälkeen). Antaa heti väljyyttä rajaan. | 25 kt |
| 1 | **0.11 TYÖTAPA JA SESSIOT** | R1, R5–R8, R10–R13 ratkaistaan. Asemataulun ulkoasu siirretään dokumenttiin. Pilvi (.3–.7), TILATAULU ja kertatoimet lokiin. Puuttuvat työtavat (3.2) lisätään tiiviinä (noin +3 kt). UI-pohjat (.8–.18) jaetaan omaksi kohdakseen. | 30–35 kt (netto noin 28 kt) |
| 2 | **Osio 10 Viisas Pöllö → jako** | Mac Studio ja avaimet osioon 0, äänet osioon 16, linssit osioon 9, Pulu osioon 6, kehittäjätila osioon 24. Pöllö yhdeksi lauseeksi, web-aika lokiin. CLAUDE.md:n viittaus päivitetään. | 12 kt (28 kt, jos lokiviitetestiä muutetaan) |
| 3 | **0.13 NATIIVI PELI ETUSIJALLE** | 0.13.21 pilkotaan. R2 (web-viittaukset pois), R14, R17, R18 ja R25 ratkaistaan. 0.13.51 poistetaan. Italia ja Kreikka yhteen kohtaan. | 15–17 kt |
| 4 | **0 Ydinajatus, muut kohdat** (0.1–0.10, 0.12, 0.14–0.29) | R3, R4, R21 ja R28 ratkaistaan. Olavinlinna ja Peking yhdeksi tauko- ja KESKITYS-riviksi. 0.5.9 pilkotaan. 0.15–0.17 yhdeksi Codex-kohdaksi. CLAUDE.md:n ostorivi korjataan. | 15–17 kt |
| 5 | **Osio 9 Karttalinssit** | 9.0.x kirjoitetaan 6–8 aihekohdaksi (R15, R16). GOOGLEN EHDOT. Keksinnöt yhteen paikkaan. Ideapankki docs/linssikatalogi.md:hen. | 15–18 kt |
| 6 | **Osiot 6–8 Fokusmoodi, Arkkikirjasto, Aarteet** | R9, R19 ja R20 ratkaistaan. Web-kartan mitat moduulidokumentteihin. 6.6.2 TestFlight työtapaan. | 12–14 kt (17–20 kt lokiviitteineen) |
| 7 | **Osio 13 Kaupungit + 2–5, 11–12** | R17 jatkuu. 3.9 ja 3.10 päivitetään. 13.18–13.24 lokiin. "45" korjataan 50:ksi. Isoisän kynäluonnosten poikkeus lisätään. | 12–14 kt (20–22 kt lokiviitteineen) |
| 8 | **Osiot 14–26** | Ämpäri ja kuvaputket yhteen. R22–R24 ratkaistaan. 23 ja 24 viittauksiksi. Fablemax-rivit pois kartasta (samaan aikaan tests/dokumentit.test.mjs). | 14–16 kt |
| 9 | **Lokiviitetesti** (valinnainen) | tests/raamattu-loki.test.mjs: raja "≥ 300 otsikkoviitettä" muutetaan tiedostotasoiseksi. Otsikkolistat tiivistetään kaikista osioista. | 20–25 kt |

**Yhteensä:**
- PR:t 1–8: noin 120–140 kt.
- PR 0: lisäksi 25 kt.
- PR 9: lisäksi 20–25 kt.

Raamattu pienenisi noin 460 kt:sta noin 270–320 kt:hen.

**Ehdotettu ensimmäinen PR:** PR 0 (rivitys), jos väljyys tarvitaan heti. Se on riskitön ja tarkistettavissa koneellisesti, mutta sen diff on suuri, joten se kannattaa tehdä ennen muita PR:iä ja yksinään. Ensimmäinen sisältö-PR on **0.11 TYÖTAPA JA SESSIOT**:
- Se on suurin yksittäinen säästö.
- Sen ristiriidat (juna, kanavat, nollaus, kiintiö, worktreet) ohjaavat kaikkia sessioita juuri nyt.
- 14.10. päätökset ovat tuoreita.

### Päätöstä vaativat asiat ennen karsintaa

| Asia | Kuka päättää |
|---|---|
| R7 nollauksen vahvistus | Päätoimittaja, tarvittaessa omistaja |
| R9 Pulu-chatin yksi linja | Päätoimittaja |
| R10 worktreen poistoajankohta | Päätoimittaja |
| R16 kierroksen kohdemäärä | Päätoimittaja |
| R17 kanoninen avausteksti | Päätoimittaja |
| R19 320 ja 280 ms poikkeuksina | omistaja |
| R23 aarteiden summat punnissa | Päätoimittaja, kun luvut on tarkistettu koodista |
| R27 rinnakkaisten agenttien raja | Päätoimittaja |
| R30 hiljainen tunti | Päätoimittaja |
| Googlen oma reitti | Päätoimittaja |
| Kertojaäänten pysyvä lupa vs. 0.5.0 | Päätoimittaja |
| Tuuraustervehdys | Päätoimittaja |
| 0.8.4 kamera | Päätoimittaja |

Muut kohdat ovat mekaanisia: uusin päätös on yksiselitteinen.

## LISÄÄ PR 1:een (PT 14.10. klo 23.2x, agentin työn päälle)
- OMISTAJAN PÄÄTÖS 23.16 (kortti "Kyllä"): Keskustelukanavan välittämä "OMISTAJAN PÄÄTÖS" on omistajan päätös; rooli nollaa itsensä luovutuksen jälkeen. Lupa-asetukset, avaimet ja CLAUDE.md muuttuvat vain omistajan omalla viestillä. Kirjattu myös ~/.claude/CLAUDE.md:hen.
- Vastuukartta: Asemataululle kirjoittavat vain PT, Asemataulu, Julkaisija ja Natiiviseppä (talo/eteneminen); muilta rooleilta Artifact-työkalu estetty (KK:n työkalukevennys 23.14, 33,3 k → 23,8 k / kutsu).

## SEURAAVAAN RAAMATTU-PR:ÄÄN (PT 15.10. 00.5x)
- Lokin 00.07-kirjauksen oppi "tarkistetaan lokista (grep docs/raamattu-loki/)" → "node tools/loki-hae.mjs" (lokihaku #4605, 5dcb876da).
- Vanhan paatokset-2026-09.md:n jako kuukausitiedostoihin (2026-10.md) junan 192 lukituksen jälkeen.
