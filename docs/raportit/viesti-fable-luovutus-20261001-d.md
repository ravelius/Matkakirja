# Päätoimittajan luovutus 1.10.2026 klo 17.0x (konteksti ~60 %)

Sessio "Päätoimittaja (Opus, max)" local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, haara claude/bold-ride-vow4ki (pushattu), RC päällä.
Edellinen: viesti-fable-luovutus-20261001-c.md. Päivän päätökset lokissa (grep "1.10.2026" docs/raamattu-loki/paatokset-2026-09.md).
Haara on 25 committia mainista jäljessä → `git merge origin/main` ennen Raamattu-muokkausta.

## Roolit (kaikki RC päällä; SendMessage nimellä voi pettää uudelleenkäynnistyksen jälkeen → mcp send_message id:llä)

| Rooli | Session id | Kärki nyt |
|---|---|---|
| Julkaisija | local_1325b8e8 | web-juna: kortit #3788/#3789/#3791/#3795/#3796/#3798/#3799/#3800, sumu #3790, kuva2 E #3792; KARTAN OSOITIN: kun Karttaseppä merkitsee #3787 valmiiksi → merge → Pages 2498 → `gh workflow run vaihda-pyramidi-osoitin.yml --repo ravelius/Matkakirja -f sarja=2026-09-30` → UKR-väritaso kuivana ja oikeana (generoi-varitaso.yml, parametrit tf/viesti) ; TF 2.10. ~12.15 YKSI koottu build (≥ 100), 96-rivi pois muutoslokista |
| Natiiviseppä | local_04e2850b | BUILD 100 = e1699839 (TF huomenna), 101 = +30-sarja (natiiviseppa/sarja-20260930), 102 = +matkamittari 8b590fba; käännöspalvelun .DS_Store-uusinta KÄYTÖSSÄ 17.0x |
| Natiivi-UI | local_e9fdc695 | UI-pohjat erä 2 junassa 101; visa B + tk-kentta natiiviin Pelikoodarin perässä; sitten PANEELI-määrittely |
| Pelikoodari | local_242febe9 | visa B (tiimalasi poikkeuksena, 50:50 (80 p), onnistuminen #2f6b3f / virhe #b03a2b) + tk-kentta + palautelomake, kukin omana PR:nään; sitten PANEELI web. Minipopupit odottavat kohdekorttikokeilun ✕-tulosta; Lue lisää -karuselli → KUVANÄKYMÄ myöhemmin |
| Linssiseppä | local_4b4b976c | S2 ämpäristä toimii → merge-pyyntö (muistiraja 683ce774, simumittaus); vuorokausi iss-vuodenaika-3; Cupola iso ikkuna (omistaja: vaaka 2,0, pysty 1,25) + iPad-arvo; sitten yövalojen hehku lähizoomissa (möykyt → pisteet) |
| Linssiseppä 2 | local_ee961a2d | juliste E v2 (siluetti yläkulmaan, voimakas sininen hehku vain kuvaputkeen, kontrasti, tähdet 0, aukko/aika/ISO + Helsingin pikselit JSONiin) + 400 mm sumea siluettikoe ja vertailu; 50 mm kaukoalueet S2-mosaiikista; ISS-haku ≤ ~100 Mt |
| Linnanrakentaja | local_2cf16574 | kuori v23 (venymäkorjaus + .astcm detaljit/maasto) irrotettuna PGID 18386 → kuvapari Päätoimittajalle → vienti → Siirtoseppä; ISS v4 -paneeli (VUOROKAUSI, asteikko sisemmäs) → Linssiseppä |
| Siirtoseppä | local_c264506b | natiivin ASTC-lukija 5238055d; Dev-mittaus ennen 4014 / jälkeen v23-paketti (ruudut > 50 ms) |
| Karttaseppä | local_4bd7c316 | pallo/pohja-vienti (irrotettu, delta/vienti.log) → #3787 valmiiksi Julkaisijalle; viikonloppu: S2-maailma P-Afrikka+Lähi-itä → Amerikka → Aasia+Australia → tropiikki (+ indeksi), sitten vuodenaika-S2 (kevät/syksy/talvi), z11 Eurooppa levylle (EI vientiä ennen web+natiivi-tukea), S2 z11 jos aikaa |
| Sisältökirjuri | local_0c172ea0 | kuva2 E #3792 junassa, F valmis; G, H … kaikki Euroopan maat yksi PR kerrallaan |
| Laitetestaaja | local_3509b4ba | savukkeet junista |
| Postivahti | local_63227b57 | kierto 10 min (käynnistetty uudelleen 15.1x) |

## ODOTTAA OMISTAJAA (kanna eteenpäin)

1. **EHDOTUS_AVAIN-vaihto** heti kun TF (≥ 100, sisältää 0beb31d4) on ladattu 2.10. ~12.15 (Julkaisija lähettää rivin). Yksirivinen komento omistajalle: uusi avain `openssl rand -hex 24` → `gh secret set EHDOTUS_AVAIN --repo ravelius/Matkakirja` → `gh workflow run ehdotukset-worker.yml --repo ravelius/Matkakirja --ref main` → `pbcopy`; omistaja liittää avaimen webin ja iPadin Lukijoilta-kenttään.
2. **Juliste E v2**: omistaja haluaa uuden kuvan vasta kun KAIKKI lisät ovat mukana. Pohja proto-3d/lokit/paatoimittaja-juliste-20261001/kehys3x4.html (koko 4:5, näkyvä kuva ≈ 0,86, musta raja + heikko kultaviiva kiinni kuvassa, tekniset tiedot alarajalla, nimi+koordinaatit+leima kuvan päällä) + `node tee-kehys.mjs <kuva> <nimi>`; datarivit JSONista (polttoväli · f/ · s · ISO, aika, korkeus, etäisyys, aurinko). Merkintäkoe: ohut kultarengas Helsingin kohdalle (+ versio ilman).
3. **Kohdekorttikokeilu webissä**: kun #3788 on tuotannossa (Pelikoodari/Julkaisija ilmoittaa) → kerro omistajalle: Ateenassa vain Kysy, Visa esim. Zugspitze, `?kohdekortti=vanha` palauttaa vanhan. Palaute ✕:n poistosta ratkaisee myös minipopupit.
4. **Talven S2** (omistajan linja talvi = BMNG): kuvapari kun Karttaseppä polttaa vuodenaikamosaiikit.
5. **Webin jokiviivataso natiiviin?** Natiivisepän Wien/Tonava z10 -kuvapari, kun 30-sarja on ämpärissä.
6. **Vuorokausi + iso ikkuna** valmistuu (Linssiseppä) → näytä lopulliset kuvat.

## Päivän päätökset (lokissa)

UI-pohjat 9 kohtaa (11.17) ja 250 ms vain siirtymiin (11.37); matkamittari natiiviin webin mukaisena + sumu webiin; kohdekortti kokeiluun (12.40);
linna ok → osoitin 4014a574 (12.57, todennettu); kartta ok (12.41); ISS-haku ≤ ~100 Mt; TF ≤ 8/vrk (12.14); maapallo ok + poltot täysillä maanantaihin
5.10. (13.22); ISS vuorokausi + LIVE (13.26); Cupolan ikkuna vaaka 2,0 / pysty 1,25 (17.03); käännöspalvelun uusinta (17.04); visa B + lomakekenttä (17.06).

## Huomiot

- **Sessioiden uudelleenkäynnistys 13.35 tappoi taustaprosessit** → pitkät ajot `nohup perl -MPOSIX -e 'fork and exit; setsid; exec @ARGV' <komento> > <loki> 2>&1`
  (muistio sessioiden-uudelleenkaynnistys-taustaajot). Viennit irrotettuina lukoilla: pyramidi-poltto/ajo-20260930/delta/ajossa.lukko,
  pyramidi-poltto/kerma-s2.lukko, pyramidi-poltto/viikonloppu.lukko (poistuvat ajon jälkeen). Uudelleenkäynnistyksen jälkeen tarkista
  list_sessions: lastActivity samassa hetkessä + RC false → herätysviesti + RC päälle.
- Omistajan Run-rivit: lisää mkdir-lukko (omistaja painoi kerran saman rivin kahdesti → tuplavienti, pysäytetty).
- Levy 61 Gt (Pelikoodari siivosi 15 worktreetä). `tools/uusi-worktree.sh --poista <rooli>-<aihe>` (lippu ensin; .DS_Store → rm + rmdir).
- Ämpäri R2: vienti 4,5 $/milj. PUT, lukeminen 0,36 $/milj. (CDN-osumat ilmaisia), ei siirtomaksuja — omistaja tietää.
- Kävijälaskuri 14 ulkopuolista (Postivahti raportoi).
