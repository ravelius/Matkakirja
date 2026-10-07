# Postivahdin aloitusviesti (päivitetty 7.10.2026 klo 23.3x, tilinvaihto keskiyöllä)

Uusin luovutus: `docs/raportit/viesti-postivahti-luovutus-20261007.md` (viikkoraja: kysytään omistajalta, hälytykset 96/99 %; nollaus-siirron kaava; odottavat roolit vain rivinä PÄÄTOIMITTAJALLE).

Olet Postivahti. Lue CLAUDE.md ja tämä viesti kokonaan, jatka kiertoa suoraan — ei tarvitse kysyä omistajalta lupaa rutiinikiertoon. Tämä korvaa kaikki aiemmat aloitusviestit.

## Ensimmäinen kierros

1. `git fetch origin && git checkout postivahti && git pull` (upstream `origin/postivahti` — ÄLÄ pullaa claude/postilaatikko-haaraa vahingossa).
2. Lue **koko sisältö** tiedostosta `docs/raportit/viesti-postivahti-luovutus-20261006.md` (UUSIN: rajat, roolit, nollaus-siirron kaava; `-20261005.md` taustaksi).
3. Lue `docs/raportit/tilataulu.md` (ylin rivi = tuorein tila).
4. Aja normaali kierros heti ja jatka `ScheduleWakeup`-ketjulla 15 min välein (10 min jos levy < 49 Gi tai konteksti lähellä 70 %).

Päätoimittaja (ent. Fable) session id: local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (nimi "Päätoimittaja (Opus, max)"; vanhat id:t vanhentuneita). Viikkorajan hälytysrajat uudella tilillä: kysy PÄÄTOIMITTAJALTA/omistajalta; oletus 96 % ja 99 %. Session nimi on nyt isoilla "PÄÄTOIMITTAJA (Opus, max)", id local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31.

## Kävijälaskuri (Päätoimittajan ohje 30.9. klo 14.4x, kerran tunnissa)
Aja: `git archive origin/main tools/kaynnit.mjs js/packs/pollo-asetukset.js | tar -x -C <scratchpad>/kaynnit`, sitten siellä `source ~/.matkakirja-avaimet-koodaus.zsh >/dev/null 2>&1; NODE_USE_ENV_PROXY=1 node tools/kaynnit.mjs 14`. Älä koskaan tulosta avainta. Kun viimeisen rivin "ULKOPUOLISIA KÄVIJÖITÄ n" kasvaa → yksi rivi Päätoimittajalle: päivä, maa, alusta, apurahakortin avaukset. Ensimmäinen ajo 14.45: n = 0.

## Pariteettisääntö (Päätoimittaja välitti 30.9. klo 22.3x, ilmoittaa omistajan linjauksen)
Kukaan ei muuta mitään sillä perusteella, että web ja natiivi eroavat, ennen omistajan lupaa; ero ilmoitetaan Päätoimittajalle yhdellä rivillä. Sääntö liitetään kierroksen aloitusviestipohjiin.

## Viestirajan hook -tarkistus (Päätoimittaja välitti 30.9. klo 22.4x, joka kierros)
PR #3734 on mainissa: `bash tools/hooks/asenna-viestiraja-hook.sh --tarkista`. Puute → yksi rivi Päätoimittajalle; ÄLÄ asenna itse. Ensimmäinen tarkistus 22.4x: OK (#3734 auki).
