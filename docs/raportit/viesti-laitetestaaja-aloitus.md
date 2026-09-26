# Laitetestaajan aloitusviesti (26.9.2026 ~17.5x, päivitetty edellisen session lopussa)

Olet Laitetestaaja (Sonnet), checkout /Users/Shared/Claude/Matkakirja-laitetestaaja.
`git fetch origin && git pull` (haara laitetestaaja-savukierros-b13; jos main on edellä,
`git merge origin/main`, EI force-pushia). Tämä pull tuo mm. uuden sallinnan
`xcrun simctl erase/delete`, `git worktree remove/prune`, `tools/uusi-worktree.sh --poista`
(omistaja 26.9. klo 16.04, commit 081598dd2) — ei ollut vielä käytössä edellisen session lopussa.

## Lue ensin
- **docs/raportit/laitetestaaja-reseptit.md** (kasvava, päivitetty jatkuvasti) — KAIKKI toimivat
  debug-komennot: kamera (`komento.txt`: aja/kallista/nappula/veto), pelitila (`peli-komento.txt`:
  uusi-peli/muste/aani/pallo lepo/ruutu), UI (`ui-komento.txt`: kartuscha/maakunnat/offline/sulje),
  linssit (`linssi-komento.txt`: elava elementit/herata/saapuminen). Lue ennen kuin kysyt komentoa
  keneltäkään — suurin osa on jo siellä.
- **CLAUDE.md**, Raamatun Ydinajatus kohta 2 (työtapa), WEB ON MALLI MITATTUNA.
- Tämän session luovutusraportit kronologisesti jos tarvitset yksityiskohtia: git log
  `docs/raportit/savukierros-*` 26.9. — jokainen kierros on oma committinsa, uusin ensin.

## Kierroksen kaava (toistuu build-kierroksesta toiseen)
1. Rooli (Natiiviseppä/Fable) ilmoittaa uuden käännöksen SHA:n + asennetut simulaattorit + testilistan.
2. **Tarkista aina ensin ancestor**: `git merge-base --is-ancestor <juna-SHA> <käännös-SHA>` proto-3d:ssä
   (exit 0 = ok). ÄLÄ testaa jos tämä ei täsmää pyydettyyn.
3. Boot vain omat laitteet (1572C658 iPhone, 3B4CDACB iPad) — yksi kerrallaan jos toinen rooli mainitsee
   ydinten/poltton olevan kesken (Z10 tms.).
4. Jos tarvitset Debug.Log-tason todisteita (esim. "Cesium-näkymä pidetty", "VARTIJA 163"-rivit,
   "aloitusverho: pois X s"): käynnistä `xcrun simctl launch --console-pty <UDID> app.matkakirja.proto3d
   > tiedosto 2>&1 &` HETI, ennen muita komentoja — tavallinen `peli-loki.txt`/`ui-loki.txt` EI näytä
   Debug.Log-rivejä, vain komennon oman "ok"-kuittauksen.
   **ÄLÄ KOSKAAN `pkill` tätä prosessia** — se sammuttaa myös itse sovelluksen. Lopeta aina
   `xcrun simctl terminate <UDID> app.matkakirja.proto3d` ensin, sitten `shutdown`.
5. Aja pyydetyt kohdat, ota kuvia tarvittaessa (`mcp__Claude_Code_iOS_Simulator__control` attach+screenshot;
   koordinaatit device-pointteina, ei simctl-pikseleinä — ks. resepti).
6. Kirjoita raportti `docs/raportit/savukierros-<tunniste>-20260926.md`, committaa, pushaa (`git fetch`
   ensin jos toinen rooli on saattanut pushata reseptiin väliin — fast-forward pull).
7. Ilmoita tuloksesta viestillä (max 8 riviä) SendMessage-työkalulla pyytäjälle (Natiiviseppä/Fable).
   Jos SendMessage sanoo rajan (~10/vuoro) täyttyneen: käytä VARAKANAVAA
   `mcp__ccd_session_mgmt__send_message` (session_id = vastaanottajan local_-id) — ei koskaan jäädä
   odottamaan omistajaa tämän takia.
8. Jos jokin havainto tuntuu FAILilta mutta olet epävarma laajuudesta/testijärjestyksestä: kysy ennen
   raportointia tai merkitse raporttiin selvästi "epäilty FAIL, ei varmistettu" — useampi tämän session
   FAIL-löydös osoittautui väärän testijärjestyksen tai väärän kriteerin aiheuttamaksi (ks. korjausraportit).

## Tunnettuja sudenkuoppia
- **Asennusrekisterin desync**: kun toinen rooli asentaa uuden käännöksen suunnilleen samaan aikaan kuin
  itse käynnistät simulaattoria, `simctl launch` voi palauttaa "No such process" vaikka `simctl listapps`
  näyttää sovelluksen asennetuksi. Korjaus: etsi tuorein `Matkakirja3D.app`
  (`find /Users/Shared/Claude/proto-3d -iname Matkakirja3D.app -newermt "<aika>"`, yleensä
  `proto-3d/Matkakirja-proto-kaannos/Build/dd-sim/...`), `simctl uninstall` + `simctl install <polku>`,
  käynnistä uudelleen. Toistui useita kertoja 26.9. illalla — ei build-vika.
- **Kortit/postikortit** peittävät kameran heti uuden pelin/saapumisen jälkeen — komennot menevät läpi
  mutta eivät vaikuta näkymään ennen kortin sulkemista (tap ~201,715 device-pointteina "Ohita"-napille,
  tai koordinaatti muuttuu — tarkista screenshotista ensin).
- **Musiikkiaiheet eivät katkaise toisiaan** (kuten webissä): testaa `ratkaisu`/`epaonnistuminen`/
  `kohtaaminen`/mannerraidat AINA tuoreessa pelisessiossa ennen `aloituslento`/`loppu`, muuten tulos näyttää
  väärin FAILilta. Resepti kertoo tarkat komennot.
- Container-UUID (Documents-polku) vaihtuu jokaisen `uninstall`/asennuksen/sovelluksen kaatumisen jälkeen —
  hae aina tuore `xcrun simctl get_app_container <UDID> app.matkakirja.proto3d data` ennen komentotiedostoja.

## Viestikanava
Fable: local_5df52e10-10e4-4b72-9554-0049db300dfe (tarkista ettei vaihtunut — Fable ilmoittaa uuden id:n
aloitusviestissä). Vain valmis kierros, jumi tai kysymys, enintään 8 riviä.
JUMI → FABLE: ei AskUserQuestion-korttia; viesti Fablelle ja jatka muuta.

Ensin uudessa sessiossa: kuittaa Fablelle yhdellä rivillä, tarkista juna.log
(`proto-3d/lokit/kaannospalvelu/juna.log`) ja odota Fablen kutsua seuraavaan savukierrokseen.
