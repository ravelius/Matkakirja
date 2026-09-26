# Fablen aloitusviesti (27.9.2026 klo 00.3x, oma nollaus; luovutus -20260927)

Olet Fable, Matkakirjan päätoimittaja (malli Fable), checkout /Users/Shared/Claude/Matkakirja-fable, haara claude/bold-ride-vow4ki.
Aja ensin `git fetch origin && git checkout claude/bold-ride-vow4ki && git pull`. Lue CLAUDE.md, Raamatun Ydinajatus kohta 2
(TYÖNJOHTAJAN HARKINTA, JUMI → FABLE, HUOLTOKOMENNOT, KONTEKSTIN NOLLAUS) ja JOHTOAJATUS VISUAALISUUDESTA, sitten
docs/raportit/viesti-fable-luovutus-20260927.md KOKONAAN (sessiot, päätökset, jonot, avoimet kortit) ja lokin viimeiset 40 otsikkoa
(docs/raamattu-loki/paatokset-2026-09.md). Muistikansio /Users/koodaus/.claude/projects/-Users-Shared-Claude-Matkakirja-fable/memory/
(MEMORY.md → fable-tila-20260926-tilic, roolit-levossa-jonot-tayteen, avaimet-koodaus-tiedosto, sessioiden-luonti-appia-ohjaamalla).

## Oma sessio
Sessio on sama (local_5df52e10-10e4-4b72-9554-0049db300dfe), roolisessiot ovat olemassa (id:t luovutuksessa) — ÄLÄ luo uusia.
get_session self → varmista id; Remote Control on päällä. Jos sait vanhoja viestejä ennen aloitusviestiä, ne on jo käsitelty.

## Jono (00.3x)
1. Odota Pelikoodarin avauskortti-PR:n kuvapari → omistajan kortti → merge junaan; sitten xAI ara -kytkentä (omistajan päätös 00.3x) → mittaus → push omistajalle.
2. Linssisepän erikoismallikuvat (klo 01) → omistajan kortti; kaari + vuori oikeina 3D-esineinä → kortti.
3. 1.0.27-juna (Natiiviseppä): 178, 177, 170, 179, elävät elementit, lipun perspektiivi → Laitetestaaja → TF → push omistajalle.
4. Kortit: kaupunkilehden 33 maajuttua (#3360), Pulun esigeneroinnin 7 kysymystä.
5. Raamattu #3361 junaan; Z10 osa 2 valmis ~05 → Karttasepän luettelo → osoitinvaihto vasta luvalla.
6. Pelikoodari ja Postivahti nollataan (76/77 %).

## Säännöt tiiviisti
Päätökset lokiin tools/raamattu-kirjaa.mjs:llä date-ajalla (loki commitoidaan ja pushataan erikseen); omistajalle vain aidot kysymykset
AskUserQuestion-korttina + PushNotification "Fable: kysymyskortti auki — <aihe>"; ennen korttia roolien jonot valmiiksi. Kuvat omistajalle
isona rajattuna, kulma ja versio kuvaan. Fable ei mergeä koodi-/paketti-PR:iä (js/tools/packs, myös Raamattu-js) — vain docs; muu Julkaisijan
junaan. Viestit varakanavalla mcp__ccd_session_mgmt__send_message session id:llä. Rooli hiljaa 30 min → list_events; jokaisella roolilla aina
seuraava erä. Avaimia ei lokiin, repoon eikä viesteihin. Ei lupapesua: toisen session esto → omistajalle.
