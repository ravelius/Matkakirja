# Sisältökirjurin luovutus 17.10.2026 yö 2 (Postivahdin kova raja 35 %, klo 01.5x)

Rooli, checkout (/Users/Shared/Claude/Matkakirja-sisaltokirjuri), agenttisäännöt (vain Opus/Sonnet) ja muistutukset kuten edellisessä luovutuksessa
(`git show a5abf7543:docs/raportit/viesti-sisaltokirjuri-luovutus-20261017-yo.md`). Viestit AINA `send_message` (parametri `session_id`) id:llä
(osoitekirja /Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä, yksi rivi per PR), Karttaseppä local_eec7f158-d9f3-4b93-9368-c50935bd19ab,
Linssiseppä local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4, Natiivi-UI local_44392b3c-86ee-4873-9d76-82f9aaa6b832, Äänittäjä local_16ee69c8-b917-4dcd-9060-3542c5e03e67,
Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044. Uusi haara aina `git switch -c <nimi> origin/main`. Docs-PR: `gh pr create`, odota ~6 s, `gh pr merge --squash --admin`.
Proto-gitiin (Matkakirja-proto) EI kirjoiteta. **Älä aloita vertaispyynnöistä** (PT 17.10. 01.5x): seuraava erä tulee PT:ltä.

## Valmista tässä vuorossa (kaikki mainissa)
- **Ranskan i-kortti, avainkorjaus** #4745: `taiteilijat.json`:iin neljä aliasavainta (Girodet, Watteau, Rembrandt, Tiziano; nimet = Ranskan `teokset.json`:n `tekija`). Ranskan lyhyt (51/51), elinvuodet ja 27 muotokuvaa olivat jo mainissa; vain La Tourilla ei kuvaa. Linssiseppä välitti NUI:lle (haara natiivi-ui/museo-ikortti-198).
- **Seitsemän tuotantopohjaa** (docs/moduulit/tuotantopohjat/, luonnoksia; omistajan TUOTANTOPOHJAT 23.41): `paakaupungin-avaus.md` #4752 (+ Pulun toisinto #4753: sanatarkka toisinto ilman rastia, muu muutos rasti), `taidemuseon-maa.md` #4754 (PARITEETTITESTI ja askelääni kuuluvat Linssisepälle PT:n luovutuksesta), `kuumailmapallokierros.md` #4755 (+ #4756: omistajan 23.16 historiaosio omassa paikassaan, 23.18 vain paikan nimi ilman selitettä kartalla ja kohdelistassa), `historiapeli.md` #4757 (+ #4758: tietokerros lopussa tai pyydettäessä, avausnappi TÄYDENTÄÄ: Pelikoodari, ei reunakuvaa). Ei vielä dokumenttikartalla (PT/Päätoimittaja lisää).
- **Isoisän uni**: jo tehty ja hyväksytty 15.10. (#4650); ei työtä.
- **Kiinan dynastiat -linssin tekstit** (omistajan päätös 01.25), #4765: docs/kohtaukset/kiinan-dynastiat/kertojatekstit-20261017.md ja .json (lähteineen). 19 kertoriviä (riippumaton tarkistus: 12 OK, 5 KORJAA korjattu, 2 EPÄVARMA pehmennetty), 5 taistelukorttia (Karttasepän valinta: Changping, Punainen kallio, Fei-joki, Yamen, Shanhain sola; koordinaatit KS:lle), keksinnöt (paperi, kirjapaino, kompassi, ruuti), Zheng He, Marco Polo. Äänisivun Tekstit-osastossa 30 tekstiä (tunnukset kiinan-dynastiat-*; varmuuskopio index.html.ennen-kiina-20261017; julkaistu `zsh tools/tyotavat/julkaisija/aanisivu-julkaise.zsh`, suojaus ok). PT kuitannut.
- **Levy**: omissa kansioissa ei yli 100 Mt tiedostoja (ilmoitettu Postivahdille).

## AVOINNA seuraajalle
1. Kiinan tekstit odottavat KK:n hyväksyntää (Tekstit-osasto); sen jälkeen Äänittäjä saa äänet vain luvalla (numerot sanoiksi; "eaa." on kirjoitettu "ennen ajanlaskun alkua"). Riippumaton tarkistus tehtiin vain 19 riville; taistelu- ja keksintökorttien faktat tarkisti kirjoittava tutkija (Wikipedia usein ainoa lähde, Britannica 403): tee niille riippumaton tarkistus, kun PT pyytää.
2. Ranskan kohdat.json (#4743): PT hyväksyy luonnoksen, Linssiseppä vie (LS:llä dcac520d2); ääniä ei ennen KK:n korttia (puhe 17 456 mrk > ~10 000 lupa).
3. Äänittäjä uusii 6 Ranskan kohtakertomusta (korjatut-tekstit-20261016.json) ja NUI vaihtaa 3 kuvatekstiä.
4. Reykjanes ISS070 -kuva: Gateway yhä "SQL failed" 17.10. 00.0x (docs/kohtaukset/iss-yotaivas/tulivuoret-astro/LAHTEET.md).
5. PR #4685 (web-pack fin/swe/ukr): yhä auki, Julkaisijan lukituksessa.
6. Euroopan seuraavat pääkaupungit: EI auki (Varsova, Tallinna, Sarajevo, Vaduz eivät läpäisseet 3D-laatua).
7. Tuotantopohjista puuttuvat 3D-maamerkki ja uusi linssi (muiden roolien; Sisältökirjuri ei ole saanut tilausta). Kertojan teksti ja ääni on Äänittäjän.

## Huomiot
- Committoimaton: .claude/settings.local.json.*, .wrangler/ (ei omia, jätä).
- Äänisivun julkaisuskripti ei ole suoritettava: aja `zsh tools/tyotavat/julkaisija/aanisivu-julkaise.zsh`. Wrangler 4.125.0 on npx-välimuistissa (ei latausta).
- Ali-agentit (Sonnet, taustalla) kirjoittavat vain omaan tiedostoonsa scratchpadiin; tulokset luetaan JSON:sta, ei transkriptista.
- Riippumaton tarkistaja ("oleta että jotain on pielessä", omat haut ennen aineiston lukua) löytää virheet, joita kirjoittajan oma tarkistus ei löydä (19 rivistä 7 vaati korjausta).
- Levyhätä 01.4x oli ohi ennen tätä luovutusta; ali-agentteja ei saanut käynnistää sen aikana (yksi jo käynnissä oleva sai valmistua).
