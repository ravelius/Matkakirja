# Postivahdin luovutusraportti (28.9.2026 klo 01:09, 74 %:ssa)

Olet Postivahti. Lue CLAUDE.md ja tämä viesti kokonaan, jatka kiertoa suoraan — ei tarvitse kysyä omistajalta lupaa rutiinikiertoon. Tämä korvaa kaikki aiemmat aloitusviestit.

## Ensimmäinen kierros

1. `git fetch origin && git checkout postivahti && git pull` (upstream `origin/postivahti`).
2. Lue `docs/raportit/tilataulu.md` kokonaan — päivitetty klo 01:09.
3. Jatka normaali kierto heti (ks. alla) ja jatka `ScheduleWakeup`-ketjulla ~10 min välein.

## TÄRKEIN AVOIN ASIA: omistajan 23.58-rajaus voimassa

**Ilmoita Fablelle VAIN julkaisun jumista ja polton hälytyksistä** — ei rutiinikontekstiraporteista. Kaikki roolit paitsi julkaisu ja Karttasepän poltto ovat tauolla ja kirjoittavat luovutuksia ennen tilinvaihtoa. Kirjaa kaikki tilatauluun normaalisti, mutta lähetä Fablelle viesti vain kun on aito jumi/hälytys.

## Karttasepän yöpoltto — SEURATTAVA JOKA KIERROS

- Loki: `/Users/Shared/Claude/pyramidi-poltto/ajo-20260927y/aja.out` ja `vahti.out`.
- Vahti: **PID 82063** (v5e), käynnistänyt vaiheen 2 (syvä, T7) klo 00:51.
- Vaihe 1 valmis (koodi 1 klo 00:39 oli vain vientivartion ilmoitus, EI virhe — laatat/eheys 119495/119495 kunnossa).
- **Kun `aja.out`:iin ilmestyy "2 koodi" (mikä tahansa koodi) TAI vahti-PID 82063 kuolee → tarkista ensin `2.log`:n loppu ("eheystarkistus: laattojen määrä täsmää luetteloon" = OK) ja lähetä SITTEN yksi rivi Karttasepälle (`local_4bd7c316-55bc-423a-9da1-821fdd123cab`) ja Fablelle.**
- Tämä on ainoa seuranta — Karttasepän oma monitori on pois käytöstä.

## Juna-tauko — EI HÄLYTYSTÄ tänä yönä

`/tmp/matkakirja-juna-tauko` on päällä tarkoituksellisesti (Fable vahvisti 00:2x) — pysyy päällä polton loppuun ("2 koodi 0") ja purkuun aamulla. **Älä hälytä tästä.**

Julkaisulippu `/tmp/matkakirja-julkaisu` liikkuu normaalisti (striimiluenta-julkaisu käynnissä, polttovahti pysäyttää/jatkaa ytimiä sen mukaan). Hälytä VAIN jos raskas ajo käy ilman lippua yli 10 min TAI lippu on päällä yli 90 min (tämä koskee julkaisua, ei juna-taukoa).

## Normaali kierto (10 min välein)

1. `get_usage` itsellesi + kaikille roolisessioille listassa (ks. tilataulun kohta 1).
2. Oma kontekstisi: kun lähestyt 70–75 %, kirjoita luovutus (kuten tämä) + päivitä tilataulu, pushaa, ja pyydä Fablea nollaamaan sinut.
3. `sh .postivahti.sh` — uudet postilaatikkoviestit (ei-Fable-tiedostot) → ilmoita normaalisti tilatauluun (mutta ei erillistä Fable-viestiä 23.58-rajauksen aikana ellei aito jumi).
4. `sh /Users/Shared/Claude/Matkakirja-fable/tools/tarkista-tyotilat.sh` (tyhjä = kunnossa, exit 1 on normaali grep-tulos).
5. **Levy:** `df -h /System/Volumes/Data`. Ollut vakaa/hitaasti vaihteleva 70-90 Gi välillä koko yön, ei kriittinen.
6. **Muistipaine:** `sysctl kern.memorystatus_vm_pressure_level` — normaali koko yön.
7. `df -h /Volumes/NAS-Homes`, `xcrun simctl list devices booted`, `ls -d /Users/Shared/Claude/wt/*/ | wc -l`.
8. Juna: `tail /Users/Shared/Claude/proto-3d/lokit/kaannospalvelu/juna.log` — tauolla, ei hälytystä (ks. yllä).
9. **Karttasepän poltto — ks. yllä, tärkein seurantakohta.**
10. `/tmp/matkakirja-julkaisu` ja `/tmp/matkakirja-juna-tauko` — tarkista tila joka kierroksella.
11. `/Users/Shared/Claude/proto-3d/lokit/eheysvartija/VIKA.txt` — tyhjä = kunnossa (kuten varmuuskopio-VIKA.txt).
12. Päivitä `docs/raportit/tilataulu.md` ja pushaa haaraan `postivahti` (fetch+rebase ensin jos konflikti).
13. Ilmoita Fablelle **vain julkaisun jumista ja polton hälytyksistä** (23.58-rajaus voimassa kunnes toisin sanotaan).
14. `ScheduleWakeup` ~10 min, ketjuta AINA.

## Tila luovutushetkellä (28.9. klo 01:09)

- Viikkokiintiö (kaikki mallit) **93 %** — YLITTI ensimmäisen kynnyksen, nollautuu ma 28.9. klo 09:59 (07:00 UTC). Kynnykset 93/95/97 %.
- Viikko (Fable) 76 %.
- Kaikki roolikontekstit alle 70 %:n kynnyksen.
- Levy ~86 Gi vapaana, vakaa.
- Ei muita avoimia jumeja tai kortteja omistajalle.
- Täysi historia: `docs/raportit/tilataulu.md` git-loki (haara `postivahti`).

Jatka kiertoa itsenäisesti `ScheduleWakeup`-työkalulla ~10 min välein normaaliin tapaan.
