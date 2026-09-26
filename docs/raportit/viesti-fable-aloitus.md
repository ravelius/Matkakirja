# Fablen aloitusviesti (26.9.2026 klo 08.5x, tilinvaihto; luovutus -20260926-b)

Olet Fable, Matkakirjan päätoimittaja (malli Fable), checkout /Users/Shared/Claude/Matkakirja-fable, haara claude/bold-ride-vow4ki.
Aja ensin `git fetch origin && git checkout claude/bold-ride-vow4ki && git pull`. Lue CLAUDE.md, Raamatun Ydinajatus kohta 2
(TYÖNJOHTAJAN HARKINTA, JUMI → FABLE, HUOLTOKOMENNOT, SESSIOIDEN LUONTI ILMAN OMISTAJAA, KONTEKSTIN NOLLAUS) ja NATIIVI PELI ETUSIJALLE
(LÄMPÖ JA VIRRANKULUTUS, ELÄVÄ KARTTA, ESILATAUSPOLITIIKKA, PERUSKARTAN RESEPTI), docs/raportit/viesti-fable-luovutus-20260926-b.md KOKONAAN
(myös "Päivitys klo 08.3x"), docs/raportit/omistajan-loydokset-b13-20260925.md (löydökset 153–155 ja S6–S9) ja lokin viimeiset 40 otsikkoa
(docs/raamattu-loki/paatokset-2026-09.md). Muistikansio /Users/koodaus/.claude/projects/-Users-Shared-Claude-Matkakirja-fable/memory/ on käytössäsi
(MEMORY.md → fable-tila-20260926-aamu, sessioiden-luonti-appia-ohjaamalla).

## 1. Oma sessio
set_remote_control self päälle; get_session self → oma id talteen (kirjoita lokiin ja Postivahdille).

## 2. Roolisessiot — LUO ITSE (tili vaihtui, vanhat id:t eivät ole voimassa)
Tarkista `list_sessions`: jos roolisessioita ei ole, luo ne Raamatun kaavalla SESSIOIDEN LUONTI ILMAN OMISTAJAA (osascript + screencapture,
sallinnat ovat .claude/settings.local.json:ssa: Bash(osascript:*), Bash(screencapture:*), Bash(sleep:*)). Kuvakaappaus joka vaiheen jälkeen.
Järjestys: Postivahti ensin (tilataulu ja kiintiöseuranta), sitten Julkaisija, Natiiviseppä, Pelikoodari, Natiivi-UI, Linssiseppä, Siirtoseppä,
Karttaseppä, Sisältökirjuri, Laitetestaaja. Kaikki agentit Opus tai Sonnet — EI Fable.

| Rooli | Kansio (/Users/Shared/Claude/) | Malli | Aloitusviestin haara (docs/raportit/viesti-<rooli>-aloitus.md) |
|---|---|---|---|
| Postivahti | Matkakirja-posti | Sonnet | postivahti |
| Julkaisija | Matkakirja-julkaisija | Opus | julkaisija-luovutus-20260926 |
| Natiiviseppä | Matkakirja-3d-selvittaja | Opus | selvittaja-3d-luovutus (luovutus g 65d5349ac) |
| Pelikoodari | Matkakirja-pelikoodari | Opus | pelikoodari-tyo-20260923 |
| Natiivi-UI | Matkakirja-natiivi-ui | Opus | natiivi-ui-luovutus-m |
| Linssiseppä | Matkakirja-linssiseppa | Opus | linssiseppa-tyo-20260923 (luovutus e) |
| Siirtoseppä | Matkakirja-siirtoseppa | Opus | siirtoseppa-luovutus |
| Karttaseppä | Matkakirja-karttaseppa | Opus | karttaseppa-tyo-20260922 |
| Sisältökirjuri | Matkakirja-sisaltokirjuri | Sonnet | main (#3295) |
| Laitetestaaja | Matkakirja-laitetestaaja | Sonnet | laitetestaaja-savukierros-b13 |

Jos haara on epävarma: `git log --all -1 --format=%h -- docs/raportit/viesti-<rooli>-aloitus.md` ja `git branch -r --contains <sha>`.
Aloitusviesti kenttään yhdellä rivillä (ASCII, ei ä/ö): "Olet <rooli> (<malli>), checkout /Users/Shared/Claude/<kansio>, aja ensin git fetch origin
&& git checkout <haara> && git pull, lue docs/raportit/viesti-<rooli>-aloitus.md kokonaan ja toimi sen mukaan, Fablen session id <id>,
kuittaa Fablelle yhdella rivilla." Sen jälkeen `list_sessions` → id, `set_session_title` roolinimeksi, RC päälle. Kaikki id:t yhdellä lokirivillä
(tools/raamattu-kirjaa.mjs) ja Postivahdille tilatauluun. Effortit: kaikki high (Linssiseppä high, ei max).

## 3. Jono (luovutus -b, kohdat tarkennettuina)
1. Tuotannossa: build 19 = 1.0.19 TF 08.36 (proto 41dd79c7) — korvaa viallisen 1.0.18:n. Ei uutta buildia ennen build 20 -junan kokoamista.
2. Build 20 -juna 3f2db11b (Natiiviseppä): pohja-26, nosto-muste, offline-lepo (S8) sisässä; S7 todennettu; S9 Laitetestaajalla; S6 kierroksella.
   Lisää junaan: musiikin kytkentä (pelikoodari/musiikki-vaihe1), löydökset 153 (nostojen horisonttihäivytys), 154 (taivas sinisemmäksi → KUVAPARI
   omistajalle ennen), 155 (nostojen symbolit: Pelikoodari data, Natiiviseppä piirto). Sitten Laitetestaajan kierros → BUILD 1.0.20 → push omistajalle.
3. Web: pohja 26 #3301 (Pelikoodarin kuittaus) → Julkaisijan osoitinvaihto (2026-09-26-pohja + PALLO_LAATTAVERSIO). Siirtosepän #3303 (offline-sarja 26)
   pidossa 1.0.20:een asti.
4. Musiikki: vaihe 2 suunnitelman §5 mukaan (pelin kulku 3 + saapumistunnukset 8 + Välimeri + Pohjois-/Länsi-Eurooppa) → erä omistajalle
   kuunneltavaksi linkeillä; taso −11 LUFS (docs-PR #3302 mergeä kun vihreä).
5. Elävä kartta: kohta 2 (muste-jaljet + nosto-muste) junassa; kohta 4 (Pelikoodari reittihistoria, Linssiseppä kynäviiva, sopivat suoraan);
   kohta 5 viimeisenä. Kuvapari omistajalle jokaisesta.
6. Codex 503/504 -värikorjauserät suoraan Sisältökirjurille (Postivahti ilmoittaa); rivi Fablelle per PR.
7. Löydökset 156 → raporttiin ja rooleille. Omistajan ISS-idea (avaruuslinssi, aito rata + GIBS-kuvat) odottaa omistajan poikkeuspäätöstä linssikieltoon.

## Säännöt tiiviisti
Päätökset lokiin tools/raamattu-kirjaa.mjs:llä date-ajalla; omistajalle vain aidot kysymykset AskUserQuestion-korttina omassa sessiossa
(+ PushNotification "Fable: kysymyskortti auki — <aihe>"); ennen korttia jaa roolien jonot valmiiksi (kortti voi olla auki tunteja). Kuvat ennen videoita;
viestit lyhyitä. Fable ei mergeä koodi-/paketti-PR:iä (js/tools/packs, myös Raamattu-js) — vain docs; muu Julkaisijan junaan. SendMessage ~10/vuoro →
mcp send_message session id:llä. Huoltokomennot sanatarkasti yksin. Rooli hiljaa 30 min → list_events. Viikkokiintiö nollautuu ti 29.9. klo 02.
