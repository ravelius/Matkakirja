# Sisältökirjurin luovutus 15.10.2026 klo 11.5x (Postivahti, tilinvaihto; täydentää ...-20261014-ilta.md ja ...-aamu.md)

Rooli: Sisältökirjuri (Sonnet 5.5, high), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri, haara sisalto-pelikatalogi-20260927 (älä `git pull --rebase origin main`; työt omissa main-pohjaisissa worktreissä `tools/uusi-worktree.sh sisaltokirjuri <aihe>`, poista mergen jälkeen `--poista`). Agentit vain Sonnet/Opus. Viestit AINA `send_message` session id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md): PT = local_74630a27-8c1b-4ac3-9143-538efab8cbcd (≤ 3 riviä, tulos ensin); PK local_97810d35-a79c-484b-8573-660a4c40eaa6, LS1 local_45a869de-4d6b-4ed6-a6c9-30fd8442587e, KS local_37708e68-5a58-45ca-8dee-c13620993531, Äänittäjä local_846757a4-5dce-40d7-b43b-12bfa7008396, NUI local_33ba1387-d688-4e44-8e05-10951e61efc0, KK local_593b89a1-2514-4d74-b956-2a73db862382, Postivahti local_e6d70b5a-fc8a-430c-a2a2-8c8da7f3fcc7.
Ajastus: Codex-posti-cron POISTETTU (PT/KK 15.10.: Postivahti lukee Codex-postin) – ÄLÄ luo uudelleen. Remote control: set_remote_control session_id "self", enabled true.

## Valmista 15.10.
- **Pysäkit, juna 193 (8 pääkaupunkia):** Minsk, Chișinău, Belgrad, Vaduz, Monaco, Skopje, Tirana, Zagreb (PT:n rajaus; Bern, Bratislava, Podgorica, San Marino, Andorra la Vella, Reykjavík pois). Sisältö: js/packs/fokusvirta-<id>.js (matkakirja + Livian kuplat ≤125 merkkiä), europe-questions.js (3 kysymystä + 3 tiesitkö), pollo-kysymykset.js (2 saapumiskysymystä, ≤70 merkkiä), europe-artikkelit.js 'Monaco'. Haara sisaltokirjuri-pysakit-193 (PK:n sha 1804baadc; PK on rekisteröinyt ja avaa PR:n, pelikoodari-pysakit-193). Lähteet ja huomiot: proto-3d/_tyo/sisaltokirjuri/pysakit-193/tulos-A/B/C.json (+OHJE.md). Kohtaamisia ja ääniä ei tehty.
- **ISS-kameran kertoja (PT hyväksyi, Äänittäjä generoi):** proto-3d/_tyo/sisaltokirjuri/iss-kamera-kertoja-20261015/iss-kamera-kertoja.json (kolmas loppukysymys + kertomus 559 merkkiä + vastaus + uusintakysymys). Ilmoita Äänittäjälle/PT:lle jos kuittaus puuttuu.
- **ISS-skannerin tiedot (PT hyväksyi, NUI kytkenyt 74239a480):** proto-3d/_tyo/sisaltokirjuri/skanneri-faktat-20261015/ – skanneri-tiedot-v2.json (lähde per arvo), data.json (rivit + keskilampo, 46 avainta, KS:n lämpö/korkeus/meren syvyys yhdistetty; edellinen data-ennen-ks.json), faktat.json (1 lause ≤60 merkkiä). NUI ei ollut vielä ottanut KS-päivitystä (lämpö, uusi korkeus, meren syvyys) 74239a480:ssä; data.json:n uusin versio on valmiina hänelle.
- Ranska: LS1 kysyi kolmen teoksen (louvre-inv-7340, louvre-inv-3834, orsay-rf-2020) tekstejä; niitä ei ole minulla → LS1 poistaa paikat ellei PT tilaa.

## Keskeneräistä / seuraavalle
1. Ei omia työjonoja; PT antaa erät. Tarkista list_events PK:n/PT:n kuittaukset (pysäkit PR, KS-päivitys NUI:lle).
2. Aiemmat: Äänittäjän kuittaus Ranska 51 / ISS-loppu / pallokierrokset → rivi PT:lle; Julkaisija vie #4588:n sisällön vasta julkaisupyynnöstä. Heikot: Lappi 8, Barcelona 8, Praha 8. Minskin lehden "Moskova–Brest 1871": PT päätti ettei korjata.
3. Worktreet: wt/sisaltokirjuri-pysakit-193 (poista kun PK:n PR mergattu), wt/sisaltokirjuri-posti-paakaupunkikorjaus (cron poistettu → voi poistaa `--poista`).

## Tekniikka
- Skanneri/pysäkit-skriptit: scratchpad (kytke.py, wd_data.py); tulokset ja syötteet proto-3d/_tyo/sisaltokirjuri/ -kansioissa. Wikidata API User-Agent `MatkakirjaSisaltokirjuri/1.0 (sami@valokuvaamoklik.fi)`; Britannica/UNESCO/Orsay antavat 403 (ei kierretä).
- Tarkistus: `node --test tests/dokumentit.test.mjs tests/fokusvirta.test.mjs tests/pollo-valmiskysymykset.test.mjs tests/vanha-maailma.test.mjs`; kaupunkien lisäys kaataa rules.test "tiesitkö-tietoja kaupungeille joita ei laudalla" kunnes kaupungit laudalla.
