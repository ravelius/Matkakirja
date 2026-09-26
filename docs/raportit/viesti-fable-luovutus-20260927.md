# Fablen luovutus 27.9.2026 klo 00.3x (tili C, sessio local_5df52e10, 26.9. klo 09.1x → 27.9. klo 00.3x)

Edellinen: viesti-fable-luovutus-20260926-b.md. Kaikki päätökset lokissa docs/raamattu-loki/paatokset-2026-09.md (26.9. klo 09.11 → 27.9. klo 00.2x; docs mainissa #3356 asti, loput Fablen haarassa claude/bold-ride-vow4ki).
Omistaja oli aktiivinen puhelimella koko illan ja on poissa Macilta 26.–27.9. Viikkokiintiö nollautuu ti 29.9. klo 02; 5 h nollautui 00.0x.

## Sessiot (tili C, kaikki luotu 26.9. aamulla; RC päällä)
Fable local_5df52e10-10e4-4b72-9554-0049db300dfe · Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044 · Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 ·
Natiiviseppä local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 · Pelikoodari local_7fcab04b-864c-4ec2-98bd-46e171326701 · Natiivi-UI local_44392b3c-86ee-4873-9d76-82f9aaa6b832 ·
Linssiseppä (Opus, max) = Mallinseppä local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4 · Siirtoseppä local_86d0c984-aeeb-430d-bc85-3112f27b9437 · Karttaseppä local_eec7f158-d9f3-4b93-9368-c50935bd19ab ·
Sisältökirjuri local_be1a3375-18cf-4068-94f3-887d55f0e196 · Laitetestaaja local_af48ba1e-41c2-4921-9068-28cf5cc71b0d.
Nollattu tänään: Karttaseppä (18.1x), Sisältökirjuri (19.4x ja 22.5x), Natiiviseppä (22.2x), Natiivi-UI (22.5x), Linssiseppä (23.1x). Pelikoodari 76 % ja Postivahti 77 % → nollaus seuraavaksi (Pelikoodari vasta avauskortti-PR:n ja xAI-kytkennän jälkeen).
Mallinseppä-session luonti EPÄONNISTUI (Open Folder -valitsimen Avaa harmaa kaikille kansioille; muisti sessioiden-luonti-appia-ohjaamalla) → omistaja päätti: Linssiseppä max-effortiin ja nimeen. Checkout /Users/Shared/Claude/Matkakirja-mallinseppa + docs/raportit/viesti-mallinseppa-aloitus.md (haara mallinseppa-tyo-20260926) jäävät odottamaan.

## Tuotannossa
- TF 1.0.25 (18.51, proto 31fd6d5f) ja TF 1.0.26 (22.30, proto 2c91a5d2, ajo 36265749506): 176 porttikorjaus (4 porttia, 6 → 24 yhteyttä), 175 nostojen koko/kynnys/kallistusehto, 171, 168, 172 lento, Pulun karttaväistö (Codex PR #1 + Sano-korjaus), laattaerä 2, Pariisin ilmapallo, ISS-SGP4, 174b-merkit, S10 (SSE 32 liikkeessä + 60 Hz), lipun piilotus Euroopan mittakaavassa, 177 uusi peli.
- Web: v2278 (174b merkit huuto/elain/hetki), v2279 (170 Eurooppa 27 kuvaa), v2280–v2281 (maakunta-erä 2 tekstit), v2282–v2284, v2286 (maakuntapikkukuvat erät A+B, 365 aluetta), v2285 (178 nähtävyyskartalla vain paikat, 70 tarinakohdetta kaupungin nostoihin), v2287 (Ouzel Galley), v2288 (178: 9 galleriaan + Santarém/Broome), #3352 merikohdat, #3347 puhevertailu (docs), #3356 Fablen docs.
- Natiivipaketti 1.x v189 (pikkukuvat 478 aluetta 29 maassa, 178 mukana) ja v187 merikohdat.
- Raamattu: #3308, #3310, #3338 mainissa; **#3361 AUKI** (perspektiivi, kategoriasymbolit 3D-esineinä, erikoismallit, meri, nostomerkit, lento v3, elävä kartta 168, avauskortti + 178/179, maakuntatyöt Eurooppa, Pulun vastauskaava, kuvamerkinnät) → Julkaisijan junaan.
- Z10: osa 1 (kaupungit + fokusmaat) 419/419 ämpärissä 20.00; osa 2 (maakuntamaat, 507 shardia) käy v4-vahdilla 8 ytimellä, 201/507 klo 23.43, valmis ~05; luettelo ketjun lopuksi koekansioon; osoitinvaihto vasta PELIN_SYVIN_TASO-muutoksen ja erillisen luvan jälkeen (Julkaisija tietää).

## Omistajan päätökset tänään (kaikki lokissa, useimmat Raamattu-PR:ssä #3361)
1. 3D-nostot = NOSTOT-paneelin kategoriasymbolit OIKEINA 3D-esineinä (reliefit hylätty 00.1x: "yhtä hyvät kuin 2D, oikeita 3D-elementtejä, ota oppia lipputangosta"), ei animaatiota; erikoismallit 2–3/maa animoituina (Tivoli), Opus max, 3 kerrallaan tarkastukseen; lista hyväksytty (34 maata, ensimmäinen erä 1/maa).
2. Liioiteltu perspektiivi (keskellä lähes näkymätön, tanko radiaalisesti ulos, alaosassa alaspäin) — Natiivisepän 9d6682d1 ei riittänyt, korjaus ennen 1.0.27-junaa.
3. Meren koristeanimaatiot 10 lajia hyväksytty; kokeilu höyrylaiva + valas Norja (merikohdat v187).
4. Lento v3 kaksitasolla hyväksytty: Tiger Moth seepiana, kuvauslinja, lasku renkaalle, utu; matkustaja = Fogg; 1.0.28.
5. Kaupungin avauskortti hyväksytty (kolme osaa; kartta 35 % iPhone ja iPad; kartan päältä tekstit pois; popup lähes kokoruutu; saapuessa ei automaattista avausta; miniatyyri kohdekaupungin ja pelaajan merkin vieressä; liuska pois; lehdestä pois Nähtävyydet/Turisti-info/Radio/Tapaa-nappi; osiohakemisto; maajutut maalehteen omistajan listan mukaan — raportti #3360: 302 kaupunki / 33 maa / 14 epäselvä → KORTTI OMISTAJALLE TEKEMÄTTÄ).
6. Nähtävyyskartalla vain paikat (178): 79 pois, 70 tarinakohdetta kaupungin nostoihin, 9 museon galleriaan, aukiot + luonto kevyellä merkillä.
7. Maakuntatyöt vain Eurooppaan; Euroopan pikkukuvat valmiit (erät A+B, erä C BLR+ROU PR #3358).
8. Pulun vastauskaava (pulu-avaus → asiantuntija → pulumainen yhteenveto) sitova; esigenerointisuunnitelma docs/raportit/pulu-vastausten-esigenerointi-20260926.md (Pelikoodari; 4 809 nostokysymystä, 1 220 piilossa; 7 avointa kysymystä → KORTTI OMISTAJALLE TEKEMÄTTÄ).
9. Striimipuhe: vertailu #3347; xAI Grok TTS toimii suomeksi (ttfb 0,16–0,39 s), omistaja kuunteli ja PÄÄTTI 00.3x: xAI ara kaikkeen striimiluentaan (web + natiivi; Pelikoodari worker-reitti, kytkin, varapolku; avain workerin/CI:n salaisuuksiin). XAI_API_KEY on Macin ympäristössä ~/.matkakirja-avaimet-koodaus.zsh (koodaus-käyttäjä; muisti avaimet-koodaus-tiedosto) — omistaja vaihtaa avaimen myöhemmin.
10. Esimerkkikuviin kulma ja versio suoraan kuvaan (00.2x, Raamattu + kaikki roolit).
11. Löydökset 168–179 raportissa docs/raportit/omistajan-loydokset-b13-20260925.md (kuvat kaappaukset/omistaja-20260926/). Avoinna: 175 jatko (oikeat 3D-esineet), 173/169/170b/174/170/179 1.0.27-junassa tai merge-pyynnössä.

## Roolien tila ja jonot (00.3x)
- Natiiviseppä: juna/b13 8a90b51f (rajapinta, 174, 169/170b/173); odottaa 178 (a69fad42), 177 (Pelikoodari 2769b6a8 + Natiivi-UI 5b7994a7/43ee8146), 170 (siirtoseppa + natiivi-ui sisalto-vaihtui), 179 (1287c7f7), elävät elementit (linssiseppa/hoyrylaiva b59c99b0), lipun perspektiivin korjaus, erikoismallien yhteiskäännös (mallinseppa/pohja 9bb99488 + ylhaalta-175). ylhaalta-175-merge: luokitin esti agentilta, omistajan kysymys Natiivisepän sessiossa VASTAAMATTA (kiertotie: patch junan päälle hoyrylaiva-mergen jälkeen). S11 WarmUp pahensi → ei mergetä. TF 1.0.27 kun juna koossa + Laitetestaajan kierros.
- Linssiseppä (Opus, max) = Mallinseppä: MSM + Stonehenge laitteella OK, Colosseum → Rooman kaupunkipisteen maamerkiksi (päätös A); käännös klo 01 → kuvat kulma+versio merkittynä → OMISTAJAN TARKASTUS; sitten kaari + vuori oikeina 3D-esineinä (aloitettu) → omistajalle; merikokeilu koodi valmis; lento v3 -speksi valmis (7f3d81cf8, ei pushattu polton takia).
- Pelikoodari (76 %): avauskortti + miniatyyri + lehtiuudistus webiin (PR tulossa, kuvapari ennen mergeä) → xAI ara -kytkentä (etusijalla) → 177 merge-pyyntö → nollaus. #3353 valmis (v2285). xAI-näytteet ämpäriin + raporttiin.
- Natiivi-UI: 179 tehty, 178 a69fad42, 177-UI; seuraavaksi 174 laitemittaus, 173/169 laitetodennus, 170-todennus; avauskortti natiiviin webin jälkeen.
- Sisältökirjuri: #3358 (erä C), #3359 (astronautti erä 2), #3360 (lehtiluokittelu) auki → astronautin erät 3–4; 33 maajutun siirto vasta kortin jälkeen.
- Siirtoseppä: v189; seuraavaksi delta kun #3358/#3359 mainissa; 170 todennettu.
- Karttaseppä: Z10 osa 2 (~05), sitten luettelo koekansioon ja GRC-kuvapari merkittynä (grc-z8-vs-z10-20260926-merkitty.png); maakunta-Z10-osoitin odottaa lupaa.
- Julkaisija: #3358/#3359/#3360/#3361 junaan kun vihreät; jono muuten tyhjä.
- Laitetestaaja: reseptit b6015c81f (176/177/ulkonäkö/kuvamerkinnät); odottaa 1.0.27-junaa.
- Postivahti (77 %): nollaus pian; hälytysraja levy < 100 Gt (nyt ~144 Gt, swap 30 Gt).

## Omistajalle avoimet kortit (tee heti kun aineisto valmis)
1. Erikoismallit MSM + Stonehenge + Colosseum (Linssisepän kuvat klo 01 jälkeen).
2. Kaari + vuori oikeina 3D-esineinä (Linssiseppä).
3. Kaupunkilehden 33 maajuttua maalehteen (raportti #3360) — hyväksyttävä lista.
4. Pulun esigeneroinnin 7 avointa kysymystä (Pelikoodarin raportti).
5. Avauskortin oikean toteutuksen kuvapari (Pelikoodari) ennen mergeä.
6. Lipun perspektiivin uusi kuusikko (Natiiviseppä).

## Opit
- Roolit pysähtyvät kun erä on valmis → jokaiselle aina seuraava erä valmiina (muisti roolit-levossa-jonot-tayteen); tarkista isRunning 20 min välein.
- Omistajalle kuvat isona rajattuna, kulma ja versio kuvaan; pienet kuvaparit eivät erotu puhelimella.
- Session luonti appia ohjaamalla voi pettää (Avaa harmaa) — varasuunnitelma: olemassa olevan Opus-session effort + nimi.
- Simulaattorin verhoajat eivät kelpaa polton aikana (load 350) — laitteella.
- Nollauksen jonoviestit valuvat tyhjään kontekstiin: aloitusviestiin "vanhat viestit käsitelty".
- Kuoren lainaus nested zsh -lc:ssä rikkoi avaimen välityksen (400) — testaa curl suoraan yhdessä zsh -lc:ssä.
