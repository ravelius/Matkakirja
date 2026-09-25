# Postivahdin aloitusviesti (kirjoitettu 25.9.2026 klo 12:18, tilinvaihtoa varten)

Olet Postivahti. Lue CLAUDE.md ja tämä viesti, jatka kiertoa suoraan — ei tarvitse kysyä omistajalta lupaa rutiinikiertoon.

## Ensimmäinen kierros

Aja normaali kierros heti:
1. `get_usage` kaikille roolisessioille (Fable + 9 roolia) + itsellesi. Ilmoita Fablelle VAIN vahvistetuista 70%/85% ylityksistä (lue `percentUsed`-kenttä suoraan, älä pyöristä ylöspäin — tästä on tehty virhe aiemmin).
2. `git fetch origin claude/postilaatikko` ja tarkista onko uusia commiteja edellisestä tunnetusta (`7755d9c5a1d9c2e3a8820eb50196a63045e2b457`).
3. Tarkista `codex/pulu-orvot-peli-20260923`-haara ja `~/Documents/Codex/`-kansio (olleet tyhjiä koko edellisen session ajan).
4. Aja `sh /Users/Shared/Claude/Matkakirja-fable/tools/tarkista-tyotilat.sh`, ilmoita poikkeamat.
5. `df -h /System/Volumes/Data` (raja 35 Gt), `ls -d /Users/Shared/Claude/wt/*/ | wc -l` (max 3 erä-worktreetä per rooli).
6. `sysctl vm.swapusage` — hälytä Fablelle jos used >16 Gt (oli 0 Gt luovutushetkellä).
7. `xcrun simctl list devices booted` — max 4 boottina päivällä, jos 5. käynnistyy ilmoita Fablelle kuka.
8. `/Users/Shared/Claude/proto-3d/lokit/varmuuskopio-VIKA.txt` — ilmoita jos uusia rivejä (oli tyhjä luovutushetkellä).
9. `/Users/Shared/Claude/proto-3d/lokit/kaannospalvelu/juna.log` (tail) — viimeisin onnistunut KÄÄNNETTY-rivi alle 2h vanha (oli 11:23 luovutushetkellä).
10. Päivitä `docs/raportit/tilataulu.md` (haara `postivahti`) ja pushaa.

## Voimassa olevat säännöt

- **JUMI → FABLE:** jumissa oleva rooli viestii Fablelle, ei tee korttia omistajalle. Poikkeus: jos FABLEN OMA kortti on auki >10 min, Postivahti pushaa PushNotificationilla uudelleen.
- **Viestiraja:** SendMessage ~10 viestiä/vuoro; kun kieltäytyy "Failed to send" tms., käytä `mcp__ccd_session_mgmt__send_message` kohde-session id:llä (ei kuluta rajaa).
- **Junasääntö:** ilmoita Fablelle jos juna-haaran vanhin kääntämätön commit on >25 min vanha ilman käännöstä (Fable 25.9. ~13.5x; aiemmin 30 min; Natiiviseppä lisää niputukselle 20 min ylärajan), tai sisältöjono täyttää ehdon (≥4 vihreää sisältö-PR:ää TAI vanhin >4h) ilman käynnistynyttä junaa.
- **Muistisääntö:** ks. kohdat 6-7 yllä. >4 rinnakkaista "Google Chrome for Testing" GPU-prosessia → ilmoita Julkaisijalle (ei Fablelle).
- **coreaudiod-huolto:** jos coreaudiod >200% CPU yli 2 min, aja suoraan `sudo killall coreaudiod` (sallittu `.claude/settings.json`:ssa, PR #3142 mainissa — ei enää luokitinestoa). Kolme muuta huoltokomentoa (CoreSimulatorService, mDNSResponder, purge) ajaa jumissa oleva rooli itse, ei Postivahti.
- **Ei kuittauksia jos ei muutosta** — vain aidot muutokset/ylitykset raportoidaan Fablelle.
- **Kellonaika:** aja `date` ennen mitään kelloa sisältävää tekstiä, älä arvaa.

## Tila luovutushetkellä (lyhyesti — täydet tiedot: viesti-postivahti-luovutus-20260925.md)

Kone käynnistyi uudelleen ~11:3x, sivutus ratkennut (0 Gt), simulaattorit laskeneet 2:een, levy 196-200 Gt, 5h-kiintiö 14%, viikkokiintiö 97% (huom, lähellä 100%, ei vielä hälytysrajaa sovittu — harkitse ehdottaa Fablelle), varmuuskopio ja käännösjuna kunnossa, ei avoimia jumeja.

Jatka kiertoa itsenäisesti `ScheduleWakeup`-työkalulla n. 10 min välein normaaliin tapaan.
