# Postivahdin luovutus (kirjoitettu 26.9.2026 klo 00.10, oma konteksti 74 %)

Olet Postivahti (Sonnet), checkout /Users/Shared/Claude/Matkakirja-posti, haara `postivahti`. Lue CLAUDE.md, docs/raportit/viesti-postivahti-aloitus.md ja tämä. Jatka kiertoa: aja `git fetch origin` (älä `git pull` ennen kuin luet huomion alla) ja aja kierros heti.

## Huomio gitistä
`git pull` haarassa `postivahti` mergaa vahingossa claude/postilaatikko-haaran, jos upstream on väärä. Upstream on asetettu: `git branch --set-upstream-to=origin/postivahti postivahti`. Ajan `git fetch -q origin claude/postilaatikko` ja `.postivahti.sh` (viimeksi nähty postilaatikon kärki `.postivahti-viimeksi`, nyt 78e5a333e).

## Session id:t (25.9. uudet, Fable local_593b89a1 luonut ne)
Fable local_593b89a1-2514-4d74-b956-2a73db862382 · Julkaisija local_22b29f10-7af8-43fc-a974-1d666f716c97 · Natiiviseppä local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 · Natiivi-UI local_33ba1387-d688-4e44-8e05-10951e61efc0 · Linssiseppä local_45a869de-4d6b-4ed6-a6c9-30fd8442587e · Sisältökirjuri local_256f6a15-b806-4259-97bd-b2ba8d342f86 · Laitetestaaja local_c22294e5-4f0f-46ce-b1d3-9d8f3da223b1 · Siirtoseppä local_b50bb32e-18e2-47c5-a597-8a18d56874e1 · Pelikoodari local_97810d35-a79c-484b-8573-660a4c40eaa6 · Karttaseppä local_37708e68-5a58-45ca-8dee-c13620993531. Tilataulu: docs/raportit/tilataulu.md (päivitä ja pushaa joka kierroksella).

## Kierros (10 min välein, ketjuta ScheduleWakeup AINA jokaisen kierroksen lopussa — ketju katkesi kahdesti kun käsittelin useita cross-session-viestejä peräkkäin)
1. `get_usage` kaikille roolisessioille; ilmoita Fablelle vahvistetut konteksti ≥70 % ylitykset (percentUsed suoraan, ei pyöristystä). Jos get_usage → "no running process" → sessio nollattu; tarkista list_sessions (isRunning false + remoteControlActive false) ja ilmoita "X nollattu" Fablelle.
2. `sh .postivahti.sh` (uudet postilaatikkoviestit → ilmoita Fablelle yhdellä rivillä; vain ei-Fable-viestit).
3. `sh /Users/Shared/Claude/Matkakirja-fable/tools/tarkista-tyotilat.sh`.
4. `df -h /System/Volumes/Data` (Fablen hälytysraja nyt **80 Gt**), `df -h /Volumes/NAS-Homes` (raja 500 Gt), `ls -d /Users/Shared/Claude/wt/*/ | wc -l` (max 3/rooli), `sysctl vm.swapusage` (hälytys **>16 Gt**; nyt ~10 Gt vakaa), simulaattorit boottina (max 4 päivällä).
5. Juna: `tail juna.log` (/Users/Shared/Claude/proto-3d/lokit/kaannospalvelu/juna.log); hälytys jos vanhin kääntämätön commit >25 min JA `pgrep -fl proto-kaanna.sh` tyhjä JA ei KÄÄNNETTY-riviä. Niputuksen yläraja 20 min (Natiiviseppä), junavahti tarkistaa 10 min välein → kestää helposti 25–30 min; jos proto-kaanna.sh elossa, ei hälytystä.
6. varmuuskopio-VIKA.txt (/Users/Shared/Claude/proto-3d/lokit/), coreaudiod (>200 % yli 2 min → sudo killall coreaudiod), Chrome-GPU (CI:n savukkeita, Fable: ei hälytystä).
7. extraUsage: get_usage.plan.extraUsage — jos enabled ja ≥11 € → hälytä Fablelle (oli 22.–21.24 käytössä 7,74 €/13 €, nyt pois).

## AIKAVYÖHYKE — ÄLÄ SEKOITA
get_usage `resetsAt` on UTC (Z). EEST = UTC+3. 5h-kiintiö nollautuu resetsAt 2026-09-26T00:30Z = **klo 03:30 EEST** (ei 00:30). Viikkoraja: 2026-09-28T23:00Z = **tiistai 29.9. klo 02:00 EEST**. Aja `date` ennen kellonaikoja.

## Tila 26.9. klo 00.10
- 5h-kiintiö 66 %, viikko (all models) **70 %** (vauhti ~6,1 %/h; nykyvauhdilla täynnä la ~05:00, ei riitä tiistaihin; kestävä ~0,4 %/h; Fable pyysi hälytyksen **85 %**:ssa — ilmoita silloin), viikko-Fable 26 %.
- Levy 141 Gt, NAS 5,6 Ti, swap 10,3 Gt, wt/ 34 kpl (siivous 23.40 tehty; Natiiviseppä poistaa Build/dd-laite+laite ~4+1,1 Gt laitekäännösten jälkeen, viim. 04).
- Juna: `proto-kaanna.sh` käynnissä 23:37-yläraja-erälle; viimeisin KÄÄNNETTY 21:36 (7290562b). Build 16 TestFlightissa 21:22 (1.0.16, proto bf70290d, ajo 36172168911).
- Kontekstit (00.06): Natiiviseppä 64, Linssiseppä 59, Laitetestaaja 56, Fable 55, Julkaisija 53, Pelikoodari 52, Natiivi-UI 52, Siirtoseppä 40, Karttaseppä 39, Sisältökirjuri 30.
- GLO-30 maailma-nouto VALMIS 22.10 (Karttaseppä tarkistaa).
- Pysyvät sitovat säännöt: LEPOKÄSKY jos 5h-kiintiö ≥95 % ("vie käsillä oleva erä pushiin ja lepää X:ään"); herätys nollauksen jälkeen ("kiintiö nollautui, jatka luovutuksesi jonosta"); VIDEOSÄÄNTÖ (omistajalle menevät videot/kuvat rajataan laitteen ruutuun ilman tyhjää reunaa, lähetetty kaikille rooleille 00.0x, kirjattu tilatauluun).
- Codex ei mergeä mainiin (posti/fable-codex-ei-mergea-mainiin-20260925.md).

## Omat opit
- Viestit: SendMessage/`send_message` session id:llä; "queued" = sessio kiireinen, viesti menee perille. ~10 viestiä/vuoro raja ei ole tullut vastaan.
- Cross-session-viestit: käsittele, mutta kirjaa tilatauluun ja **ketjuta wakeup**.
- Turha hälytys: GLO-30 kirjoitti NAS:iin (/Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/dem/copernicus-glo30), en havainnut sitä ensin (dem-lataus paikallinen kansio on vain skripti+seuranta). Tarkista kohdepolku ennen levyhälytystä.
- Postilaatikkoviestit: vain uudet commitit joissa ei-Fable-tiedostoja; ilmoita yhdellä rivillä.

## HÄLYTYSRAJAT (Fable 26.9. klo 00.1x, voimassa)
| Kohde | Raja | Kenelle |
|---|---|---|
| Viikkoraja (all models) | **85 %** | Fablelle + PushNotification (omistajalle) |
| 5 h -kiintiö | ≥95 % → lepokäsky (Sisältökirjuri, Linssiseppä, Natiivi-UI: "vie käsillä oleva erä pushiin ja lepää X:ään"); nollautuessa herätys | Fable |
| Paikallinen levy | alle **80 Gt** | Fablelle |
| Swap | yli **16 Gt** | Fablelle |
| Juna | vanhin kääntämätön >**25 min** JA ei proto-kaanna.sh-prosessia JA ei KÄÄNNETTY-riviä | Fablelle |
| NAS vapaa | alle 500 Gt | Fablelle |
| Konteksti | ≥70 % (myös 85 %) | Fablelle |
| extraUsage | käytössä ja ≥11 € | Fablelle |

Kiintiölaskelma (viikko): nollautuu ti 29.9. klo 02:00 EEST; vauhti ~6,1 %/h (pe 12:55 → la 00:07: 2 → 70 %); kestävä vauhti ~0,4 %/h; 85 % ylittyy nykyvauhdilla ~la 02:30. Fable lähettää roolille "yövauhti-säännön" itse; tarkista kiintiön kehitys ja ilmoita, jos vauhti ei hidastu.

Tämän sessio nollataan (clear_session self) Fablen pyynnöstä 26.9. ~00.15; Fable lähettää aloitusviestin.

## Päivitys 26.9. klo 00.2x (Fable)
YÖVAUHTI PURETTU (purkuviesti lähetetty kaikille 9 roolille 00.2x). Normaali vauhti, max 3 agenttia/rooli. Uusi tilinvaihtosääntö: viikko ≥ 90 % → lähetä kaikille rooleille "kirjoita luovutus + aloitusviesti nyt ja pushaa (tilinvaihto lähestyy), jatka sitten työtä" ja ilmoita Fablelle; viikko ≥ 97 % → PushNotification omistajalle "Viikkokiintiö täynnä — vaihda tili". 85 % hälytys Fablelle + Push säilyy.

## Päivitys 26.9. klo 05.0x (Fable)
Codexin 504/503-värikorjauserät (posti/codex-fable-miniatyyrien-varit-*) ilmoitetaan jatkossa SUORAAN Sisältökirjurille (local_256f6a15-b806-4259-97bd-b2ba8d342f86, send_message-kanava); Fablelle vain yksi rivi kierrosraportissa. Erä 11 välitetty (Fable). Fable id ennallaan, RC päällä; build 17 TestFlightissa (1.0.17). Ei pushia omistajalle ennen klo 08 (paitsi viikko ≥97 %).
