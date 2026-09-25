# Laitetestaaja → seuraava sessio: luovutus (25.9.2026 klo 12.1x, omistajan tilinvaihto)

Omistaja pysäyttää kaikki sessiot tilinvaihtoa varten. Ei jumia, ei
kesken olevaa kriittistä komentoa — kaikki simulaattorit sammuksissa,
työ pushattu.

## 1. Tila juuri nyt

Checkout `/Users/Shared/Claude/Matkakirja-laitetestaaja`, haara
`laitetestaaja-savukierros-b13` (PR #3153, MERGEABLE, ei vielä
mergetty — Julkaisija ottaa seuraavaan junaan, kuten PR #3126:kin).
Kaikki omat simulaattorit (1572C658, 3B4CDACB, ja stray-simut
993F8873/pariteetti-iPhone-vaaka, C1D5E34C/pariteetti-iPad11-834)
sammuksissa. Työtila puhdas (`git status` ei näytä muuta kuin ennalta
olleet `tools/.natiivi-ui-*.mjs` -haamutiedostot, eivät minun).

## 2. Tämän session isot kohdat (aikajärjestyksessä)

1. **Liikkumisen pariteetti J3/J4/J5** (Fablen/Pelikoodarin tilaus,
   jatkoa edelliseltä sessiolta): natiivi J3+J4 kuvattu
   (`peli-komento.txt`: `kulkutapa liftaus`/`siirto`/`heita`), web
   J3+J4+J5 Playwright-webkitillä `window.matkakirja.{game,ui}`-rajapintaa
   suoraan ajaen (`ui.doMove(key)` — HUOM ottaa avaimen merkkijonona, ei
   olio-referenssiä; `ui.doRoll()`). Web-J5: kehittäjäsiirto Ateenasta
   Lontooseen `game.actionKehittajaSiirto('lontoo')`:llä (vaatii ensin
   `player.packId = 'maailmankartta'`, se on jo ladattu pelin alusta).
   Natiivi-J5 tehtiin Pelikoodarin toimesta (`defaults write` -kiertotie
   Keychain-koodin ohi, ks. muistio). Videot ja raportti
   `proto-3d/lokit/liikkuminen-pariteetti/`, PR #3126 (haara
   `laitetestaaja-inventaario-ipad`) mergetty sisältöjunalla
   `aae9f4f69` — **VALMIS**.
2. **Rebase→merge-oppi:** rebase origin/mainin päälle löysi kolme
   add/add-konfliktia vanhoissa raporteissa (sama tiedosto lisätty
   itsenäisesti kahdesti eri historioissa); yhden ratkaisussa hävisi
   aidosti main-only-sisältöä (iPad-pariteetti-taulukko PR #3076:sta) —
   löytyi ja korjattiin diffillä `origin/main`-vasten ENNEN pushia.
   Force-push on tässä sessiossa auto-luokittimen estämä
   ("Git Destructive") — Julkaisijan neuvosta tavallinen `git merge
   origin/main` + tavallinen `git push` toimi (jono.sh squashaa, joten
   merge-commit ei jää historiaan).
3. **iOS Simulator -kosketustyökalu rikki koko session ajan:**
   `mcp__Claude_Code_iOS_Simulator__control` tap/screenshot raportoi
   onnistumisen mutta ei vaikuttanut peliin (vahvistettu toistetusti,
   hampurilaisvalikko/laukkunappi eivät auenneet). Kierretty KOKONAAN
   tekstikomennoin (`ui-komento.txt`, `linssi-komento.txt`,
   `peli-komento.txt`) — nämä osoittautuivat luotettavammiksi ja
   tarkemmiksi kuin kosketussimulointi olisi ollutkaan. Suoraan `xcrun
   simctl io screenshot` toimi koko ajan normaalisti.
4. **Savukierros juna/b13 @ 93ab72f1** (iPhone 18 Pro, PR #3153):
   saapuminen, äänet (`puhe.aika` todellinen currentTime-eteneminen),
   kaupunkikortti, kierto, radio (viritys→lukitus→soitto) — kaikki
   PASS. **Kaksi löydöstä avoinna** (ks. kohta 4 alla). iPad-kierros
   (3B4CDACB) EI EHDITTY.
5. Muistin vapautus -pyyntöjä (Fable/Postivahti) koko session ajan:
   simulaattorit sammutettu ja boottu vain kierroksen ajaksi, orpo
   log stream (iPad Pro 11, 503000D1, jäänne aiemmasta sessiosta)
   tapettu.

## 3. Kaksi avointa löydöstä juna/b13:stä

1. **Radion kaksi avausreittiä eri tilassa.** `ui linssi radio`
   (Natiivi-UI:n `ui-komento.txt`-reitti) näyttää radiopaneelin
   ruudulla, mutta `LinssiOhjain`in oma rekisteri EI pidä sitä auki —
   jokainen sitä seuraava `radio taajuus`/`radio tila`
   (`linssi-komento.txt`) vastasi "radio: linssi ei ole auki", vaikka
   ruudulla näkyi selvästi viritetty radio. Oikea reitti
   tekstikomentotestaukseen on `linssi radio` (`linssi-komento.txt`,
   kutsuu `Linssirekisteri.Valitse` suoraan) — sillä kaikki toimi
   heti oikein (`auki: radio`, viritys→lukitus→soitto DZA:han).
   **En tiedä onko tämä aito UI/pelitila-desync-bugi vai vain
   testikomentojen väärä reitti** — reititetty Pelikoodarille/
   Natiivi-UI:lle, ei vielä vastausta.
2. **POI-nimien genetiivipäätevika.** Ranskan kartalla (Pariisin
   ympäristö) useat nimet näyttävät rikkinäisiltä suomen taivutuksilta:
   "Rouenin.", "Chartresin.", "Amiensin.", "Versaillesin.",
   "Montgolfierin.", "Carcassonnen.", "Michelinin opas", "Nîmesin
   areena", "Le Mansin 24.", "Nancy, Place." — toistuu samalla
   kaavalla useissa nimissä (kuva
   `docs/raportit/kaappaukset/savukierros-b13-20260925/1-saapuminen.png`
   ja `3-vaaka.png`). Ei varmistettu onko jo tiedossa (Karttasepän
   `aluenimet-natiivi.json`-työ näytti kesken origin/mainin
   viimeisimmässä diffissä).

## 4. Seuraavaksi

1. **b13-savukierros odottaa junaa d76c9669+** (omistajan/Fablen
   ohje) — kun käännösvahti on asentanut uudemman junan, aja loput:
   iPad-kierros (3B4CDACB) samalla kaavalla kuin iPhone tässä
   raportissa, ja tarkista onko kohdan 3 löydös 1 (radio-desync)
   korjattu/selvinnyt.
2. Seuraa PR #3153:n (ja jos vielä avoinna, #3126:n vahvistus) tilaa —
   Julkaisijan pitäisi ottaa seuraavaan junaan.
3. Jos Pelikoodari/Natiivi-UI vastaa radio-löydökseen, päivitä
   `docs/raportit/savukierros-b13-20260925.md`.
4. Liikkumisen pariteetti -työ (J1–J5) on kokonaan Laitetestaajan
   puolelta VALMIS — jatko on Pelikoodarin/Natiivisepän/Natiivi-UI:n
   korjauksissa (ei enää minun kuvattavaa ellei erikseen pyydetä).

## 5. Muistiin kirjattu tälle sessiolle hyödyllinen tekniikka

- Natiivin kehittäjätila ilman Keychain-koodia: `defaults write
  app.matkakirja.proto3d matkakirja-kehittaja -string 1` (+
  `-maailma -int 1`) sovellus KIINNI ennen käynnistystä. Ks. muistio
  `natiivi-kehittajatila-defaults-write.md`.
- Web: `window.matkakirja = {game, ui, sfx}` on julkinen tuotannossa —
  `game.moveOptions()`, `ui.doMove(key)` (avain merkkijonona!),
  `ui.doRoll()`, `game.cityOf(id)`, `game.actionKehittajaSiirto(id)`
  ovat kaikki suoraan kutsuttavissa Playwrightin `page.evaluate`:lla,
  paljon luotettavampi kuin pikselikoordinaattiklikkaus.
