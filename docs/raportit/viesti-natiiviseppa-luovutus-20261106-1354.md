# Natiivisepän luovutus 6.11.2026 klo 13.54 (konteksti 30 %, 7.37)

Korvaa -1339:n Tila- ja SEURAAVA TYÖ -kohdat. -1339:n "Mitä tässä sessiossa nähtiin" ja "Työkalut", -1301:n "Mitä tässä sessiossa nähtiin" ja "Opit" sekä -1247:n kohta 6 pätevät. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja.
ENSIN: set_remote_control self true, sitten cron "4 9 * * *" (session-only, Raamattu 7.41). Skripti: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä.

## Tila
- Haara natiiviseppa/palikka-koe 46578a534 (peilissä), työpuu wt/proto-natiiviseppa-palikka puhdas. Kartta-testit Palikka 14/14.
- Sisältää omistajan 13.41 puupäätöksen (4477405d4), VS:n puu-3-80:n ja puu-3-300:n (a0c4a9576, f716ca8f7) ja PalikkaData-v5:n (29a3bd80c60355b2, P/poista-omat-sillat.py).
- MAC-9 46578a534 on JU:n jonossa L2:lla NUI:n kahden lyhyen ajon jälkeen: P/sk-mac-9.txt, lokit lokit/natiiviseppa-palikka-mac9-46578a534, 6 kuvaa ja 2 csv:tä. Tulos tulee viestinä, älä pyydä uudelleen.
- Skenaariota muutettiin pyynnön jälkeen (s2-kamera, hv3-kuvat), JU:lle kerrottu. Tarkista lokista, että hv3 on mukana. Viestin perillemeno on varmistettu, lukemista ei.
- Iso iPad on vapaa viimeisen tiedon mukaan (-1339); tarkista ennen iPad 3:a.

## LISÄYS 13.5x, KK:n viesti luovutuksen jälkeen (menee kohtien 2–3 edelle)
- TOLPAT VEDESSÄ: KK: omistajalle on sanottu, että ne korjataan. Selvitä syy paikkatiedosta ILMAN omaa ajoa. Jos paikka on väärä, korjaa. Mac-9:ään se ei enää ehdi: kärki 46578a534 on JU:lla ja JU kielsi muuttamasta sk-mac-9.txt:ää, joten korjaus menee seuraavaan ajoon. Kerro KK:lle, kuinka monta tolppaa vika koskee koko Pariisissa.
- Alku, ei tulos: tee-palikat.py:455–457 pudottaa alle 5 m:n päässä OSM-vedestä (relaatio 2191006) olevat tolpat, mutta pitää ne, jotka pk_sillalla (rivi 442) laskee sillan kaistalle; v4:n lokissa "sillalla jäi 241". Epäilys, ei todistettu: osa näistä on vedessä ilman oikeaa siltaa kohdalla. Toinen mahdollisuus: näkyvä vesi (OpenFreeMap Z14) eroaa OSM-vedestä, jolloin suodatin ei näe tolppaa vedessä (ero mittaamatta, -1247/-1301; OFM:ää ei haeta, PT). Tolpat P/palikat-osm.json valot, data P/PalikkaData-v5.bytes, kuva P/selvitys-mac8/rajaus-c-b2-ranta.png. Korjaus kuten poista-omat-sillat.py: v5:stä uusi versio, muu aineisto tavulleen ennallaan.
- KK: näyttää puut omistajalle vasta Mac-9:n parista, jossa on siltakorjaus ja Hôtel de Villen ranta. Jos hv3 ei osu, kerro se KK:lle; EI omaa ajoa sitä varten.

## SEURAAVA TYÖ, järjestyksessä
1. MAC-9-TULOS, kuvat täysikokoisina. Katso:
   - Pont Neuf: Mac-7:n r4-loppu-b2 | uusi r4-loppu-b2, sama rajaus kuin P/selvitys-mac7/rajaus-silta.png (P/parit-mac7.py). Laatan pitää olla poissa.
   - Toinen silta (KK:n pyyntö): s2-nyt | s2-b2, Pont au Change ja Pont Notre-Dame. Kamera on arvio.
   - puu-3-300: l-b2. Mac-8:n l-b2:ssa puita oli vähän eikä yksikään lähellä, joten tämä voi jäädä todistamatta; sano se silloin suoraan.
   - Hôtel de Villen ranta: hv3-nyt | hv3-b2. Kamera on arvio (suunta 340, aja 48.8605 2.3501). Jos se ei osu, kerro se KK:lle, älä väitä nähdyksi.
   - 847 ms:n katko: r4-b2-jäljen dt max (skripti ei tallessa: python CSV:stä, sarakkeet t, dt, lat, lon, z, nayte, silea). KK: kerrotaan tuloksessa, jos toistuu. Mac-7:n r4-jäljessä dt max 23 ms.
   Tulos KK:lle, tiivistys PT:lle (≤ 3 riviä).
2. IPAD 3 vasta kohdan 1 jälkeen (KK 13.49): P/ajopyynto-ipad-3.md, lisää sha (uusin kärki, lokit natiiviseppa-palikka-ipad3-<sha>) ja poista LUONNOS. Ehdot -1339:n kohdassa 4 ja -1301:n kohdassa 4. Tripo-puiden hinta suoraan; suhde muuttui (kapeita joka 10.), mutta kolmiomäärä lajia kohti on sama.
3. C1 ja D2 -1247:n kohdan 6 mukaan. Forward-kopio pois listalta ennen C1:tä (RD vaatii Forward+:n kaikilla renderöijillä). Ilman renderöijän vaihtoa (KK).

## Mitä tässä sessiossa tehtiin ja nähtiin
- MAC-7 9669e48bf katsottu, tulos KK:lla ja PT:llä (P/selvitys-mac7): r4 kelpaa. z-askel 0,000, nostossa 0/1193, nopeus 60 m/s, nykäys 95 % 0,045 m, suunnan vaihtoja vain radan päässä. CSV:n "taaksepäin"-luku on radan paluuosuus, ei vika: katso etumerkin vaihdot. Kolmessa kuvassa ei rakennuksen läpi, Louvren julkisivu lähellä; väliä ei kuvattu. r4-b2-jäljessä yksi 847 ms:n kehys alussa.
- TRIPO-PUIDEN VÄRI JA SUHDE tehty: kapea tumma on puu-4 (latvuksen luminanssi 0,16–0,18, muut 0,25–0,38; scratchpad-skripti ei tallessa). PalikkaPuut PalikkaYdin.cs:ssä: Laji(tiiviste) kapea joka 10., pyöreät tasan; KarkiVari kapealle × 1,5 / 1,25 / 1 kärjen rgb:n kautta. Palikka.shader kertoo Tripo-polun kahdella, 128 = ennallaan.
- MAC-8 4477405d4 katsottu, tulos KK:lla (P/selvitys-mac8, P/parit-mac8.py, rajaus-mac8.py): puut asettuvat kartan väreihin, kapeita harvassa, kapea yhä rivin tummin. Ero näkyy lähinnä c-b2:ssa. Puu-3:n laikkuja ei näy tällä etäisyydellä. PT:n ja KK:n arvio puista odottaa, omistajalta ei ole sanaa.
- hv- ja hv60-kuvissa Notre-Dame peittää Hôtel de Villen, koska suunta 20 katsoo sen läpi. Aja-piste on ruudun keskellä; valitse suunta niin, ettei Notre-Damea ole välissä.
- KK 13.49: palikkasillat pois omien mallien kohdilta, kaikki omat sillat. Tehty: 643 palikkaa pois, muut lajit tavulleen ennallaan. Omat: 18 KeskustanSillat, Pont Neufin 2 vartta, Pont Alexandre III. Concordella ja Alexandrella ei ollut palikoita (200 sillan raja). Akseli: kompassisuunta = 90 − Akseli, täsmää OSM-tiehen alle 2,5°; Petit Pontille ei samannimistä tietä. tee-palikat.zsh tekisi v4:n uudelleen: aja poista-omat-sillat.py sen jälkeen. Palikat jäävät sillat ilman omaa mallia (mm. Austerlitz, Bercy).
- KK:lla auki: kaksi tolppaa vedessä c-b2:n vasemmassa reunassa molemmissa ajoissa (P/selvitys-mac8/rajaus-c-b2-ranta.png), syy tutkimatta, ei korjausta ilman sanaa. Tolpat näkyvät osin katkoviivoina (Mac-7:n r4-loppu-b2), ei tutkittu.
- Ei tehty: palikkavalot omilla silloilla (tee-palikat pitää silloilla olevat tolpat). Mac-7:n kuvassa ero ei erottunut, mittaamatta.

## Opit
- JU aloitti Mac-8:n ennen sha-korjausta. Älä lupaa kärkeä, jos korjaus on tulossa; JU ei vaihda käynnissä olevaa.
- VIESTIRAJA: SendMessage pysähtyi 10 viestin jälkeen ("Not delivered … Paused"). Varakanava mcp__ccd_session_mgmt__send_message session-id:llä, Raamattu 12.20 ja CLAUDE.md.
- Älä kirjoita "kuten aiemmin mainittu" tarkistamatta: jouduin korjaamaan KK:lle.

## Huomiot
- NS:n työpuita wt/-kansiossa 8 (raja 3): kerro PT:lle ennen poistoja.
- Canopéen välke liikkeessä edelleen katsomatta.
- P/:n skriptit ovat git-haaran ulkopuolella, kuten aiemmatkin.
