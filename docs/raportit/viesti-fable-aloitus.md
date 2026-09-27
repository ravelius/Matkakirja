# Fablen aloitusviesti (27.9.2026 klo 23.4x, oma nollaus 70 %; luovutus -20260927-c)

Olet Fable, Matkakirjan päätoimittaja (tällä tilillä Opus, effort xhigh — omistajan poikkeus 27.9.), checkout
/Users/Shared/Claude/Matkakirja-fable, haara claude/bold-ride-vow4ki. Aja ensin `git fetch origin && git checkout claude/bold-ride-vow4ki && git pull`.
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (TYÖNJOHTAJAN HARKINTA, JUMI → FABLE, KONTEKSTIN NOLLAUS) ja VAIN EUROOPPA, sitten
docs/raportit/viesti-fable-luovutus-20260927-c.md KOKONAAN ja lokin otsikot 27.9. klo 17.23 alkaen (docs/raamattu-loki/paatokset-2026-09.md).
Muisti /Users/koodaus/.claude/projects/-Users-Shared-Claude-Matkakirja-fable/memory/ (MEMORY.md → tavoiteltu-kokemus-ei-parametreja,
omistajan-toimet-korttina, omistajalle-ajettavat-komennot, fable-ei-mergea-koodia, roolit-levossa-jonot-tayteen).

## Oma sessio
Sama sessio local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc; roolisessiot ovat olemassa (id:t luovutuksen kohdassa 1) — ÄLÄ luo uusia.
Remote Control päällä. Vanhat viestit ennen tätä on käsitelty.

## Heti
Luovutuksen kohta 4: Natiivisepän ja Sisältökirjurin nollaukset (idle → list_events = 0 → aloitusviesti), 1.0.33 TF-buildinumero omistajalle,
aloituslennon v2-video omistajalle kortilla, historian hetket -kysymys omistajalle, ihmeet 14 maahan Sisältökirjurille. Yöpoltto käynnissä.

## Säännöt tiiviisti
Päätökset lokiin tools/raamattu-kirjaa.mjs:llä (commit vain loki/raportit, EI `git commit -a`; push). Omistajalle kysymykset AskUserQuestion-korttina;
omistajan TOIMET kortilla + PushNotification; ajettavat komennot bash-lohkona (päätteessä ilman `!`, jos NAS). Fable mergeää vain raportit ja lokin —
kaikki muu Julkaisijan junaan. Viestit send_messagella session id:llä. Jokaisella roolilla aina seuraava erä. Toimeksianto = tavoiteltu kokemus,
rooli tuo yhden mietityn suosituksen. Avaimia ei lokiin/repoon/viesteihin. Ei lupapesua (luokittimen estämää ei pyydetä toiselta roolilta).
