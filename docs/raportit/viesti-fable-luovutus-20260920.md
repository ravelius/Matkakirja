# Fablen luovutus 20.9.2026 klo 17.50 (sessio 19.9. klo 15.54 – 20.9. klo 17.50)

## Tila
- Tuotannossa **v1980** (17.46). Tänä vuorokautena julkaistu v1956–v1980.
- Työhaara **v1973-prep** (= main + Raamattu + valmiit erät). Fablen haara `claude/bold-ride-vow4ki` synkattu.
- Raamattu (js/tyohuone-raamattu.js) sisältää kaikki yön ja päivän päätökset aikaleimoin; viimeiset osiot PAATOKSET 53:n jälkeen ovat vapaamuotoista TILA-tekstiä.
- Apusessiot: Opus 1, Opus 2, Sonnet 1, Sonnet 2, Sonnet 3 (SendMessage-nimet). Sonnet 1–3 pysähtyneet jonon tyhjennyttyä. Omistaja: tokenit vähissä, vain välttämättömimmät.

## Kesken (sessioilla)
- **Opus 1:** maan polygonin täyttö kehän alle (Gironde, haara opus-local-maan-taytto) → astropulun teksti pysyy alussa + ikkuna korkeampi → lentonäkymä (liftauskaaret piiloon, lentokohteet näkyviin).
- **Opus 2:** kartuscha 3 (pienessä ei lippua, isossa lippu otsikon korkuinen, iso pienenee kun karttaan kosketaan) → keskeneräiset varusteet harmaana omalle riville (vertailulinssi, maidentiedot, vesistölinssi) → Astronautin kameran kuvake (astronautti + kamera, 3 ehdokasta, Fable hyväksyy).
- Kun erä valmistuu: merge origin/v1973-prepiin, testit 0 fail, versio (uusi-versio.mjs ≤ 60 merkkiä), PR, merge vihreänä (perf-savukkeet flakkaavat kun simulaattorit käyvät → --admin jos vain suorituskykyrivi punainen).

## Laitetarkistukset (Sonnet 1, kun jatketaan)
- v1980: joet Ranskan kartalla (Seine, Loire, Rhône), topografialinssin meret ja järvet, raja 3 px, huntu 80 %, kartuscha (radiovalo, lippu, vilkku), astro (kypärä, inforuutu, karttaselitenappi pois), saapumisen piilot, liftauksen kantaman kaaret.
- iPad-epäilyt joita Chromium ei toista: lennon jälkeen kahden kaupungin luenta (Bryssel→Amsterdam→Berliini→lento Roomaan) ja Ihmisen matkan kuvat puuttuvat – molemmat sopivat hitaaseen/epäonnistuvaan lataukseen; ensimmäinen katsottava kohta: luenta vapautuu error-tapahtumassa ennen viivästettyä käynnistystä (js/luenta.js ~979/1018).

## Jono (ei aloitettu)
- Himmeät kaaret pallolaudalle liftatessa (411 kaarta isoympyröinä; owner halusi, Opus 1 ehdotti omaa erää).
- Nimiöiden reunasiirto maalehdissä (Biskajanlahti, Dune du Pilat ym.) – Sonnet.
- CYP/ITA/POL nostotaso; savuke-nostoklikkaus loppuajo; savuke-pulun-kuplat leveämmälle; savuke-pollon 11 punaista; savuke-ihmisen-esityksen 9 punaista; kartuschan vajaat maat (BGR, EST, ROU, FIN, HRV, LTU, LVA, POL, DNK) ja ei-EU-maat; äänet Brysselille/Ljubljanalle/Košicelle (ei nyt); ämpärin vanhojen versioiden siivous (omistaja).

## Säännöt ja opit tältä vuorokaudelta (kaikki myös Raamatussa)
- Pohjan TAI viivatason versionvaihto → pallosarja perään → luettelo ämpäriin vasta kun osoitinkoodi on mainissa (muuten lepokerros sammuu). Nostotaso aina ilman hahmotelmia; pallosarja ilman nostoja (skriptin oletukset nyt oikein).
- Luettelon kokoaja säilyttää varitasot ja erat (korjattu). Reliefin luettelo on versiokansiossa.
- CI-savukkeet lukevat ämpärin luettelon; simulaattorit vievät ~80 % CPU:sta → perf-rivit flakkaavat.
- play()-kutsu ≠ ääni: mittaa currentTime; ämpärin mp3:t välitettävä Noden kautta.
- Codexin toimitukset ovat pushaamattomina kansiossa ~/Documents/Codex/<pvm>/.
- Kuvissa ei poltettuja aikaleimoja/vesileimoja; otsikkokortti = kartan nimi, isoisän tekstit = ajan nimi (Christiania).
- Saapumiskuvien aikana kartta terävä, matkakirja ja pulun kupla piilossa.
- Ehdotus omistajalle: erillinen Sonnet-"julkaisija"-sessio hoitamaan merge/versio/PR/CI/luettelo säästäisi Fablen tokeneita huomattavasti; Fable pitää päätökset ja Raamatun.
