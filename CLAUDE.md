# !!! AGENTIT VAIN OPUS JA SONNET — FABLE-MALLIA EI KOSKAAN AGENTTINA !!!

Omistajan sitova sääntö (1.9. ja 7.9.2026): jokainen ali-agentti, parvi ja
workflow ajetaan Opuksella tai Sonnetilla. Ei poikkeuksia, ei kysymällä.
Parvina saa ajaa. Fablemax-agenttityyppi on poistettu. Sama sääntö on
Raamatun ja docs/roolitus.md:n ensimmäisellä rivillä.

Täsmennys (omistaja 11.9.2026, tekstisession kautta): tämä sääntö koskee
Clauden agentteja. Peliä kehittää myös ChatGPT/Codex, joka saa käyttää
Solia, Terraa ja Lunaa (kevyemmät agenttimallit); molemmat pääsessiot delegoivat
rajatut tehtävät kevyimmälle riittävän kyvykkäälle mallille (Raamattu,
luku 7: CLAUDEN JA CHATGPT/CODEXIN AGENTTISÄÄNNÖT ERIKSEEN).

PÄÄTOIMITTAJA = FABLE (omistaja 28.9.2026): päätoimittajan rooli on nimeltään Päätoimittaja (malli vaihtelee);
"Fable" on sama rooli vanhalla nimellä kaikissa ohjeissa. Raamattu, luku 7.

# Matkakirja ja unohdettu aarre

Suomenkielinen seikkailupeli, jossa samalla oppii (kohderyhmä
13 vuotta täyttäneet ja aikuiset — EI lastenpeli): nuori Fogg,
isoisänsä perillinen, matkustaa
isoisänsä vuoden 1873 matkapäiväkirjan jäljillä ja etsii Aarnin
luettelon unohdettuja aarteita. Selainpeli ilman build-vaihetta
(ES-moduulit, service worker; yhden tiedoston versio rakennetaan
Pages-julkaisussa — dist/-kansiota EI committoida, historia paisuisi).

AIKA (omistaja 26.9.2026, sitova): kartassa eletään NYKYAJASSA, vain estetiikka
on vanhaa — nykyajan kohteet (maailmanpyörä, Korintin kanava) ovat sallittuja;
älä hylkää ideaa "koska sitä ei ollut 1873". Raamattu, luku 1, AIKA.

MUUT MAANOSAT (omistaja 19.10.2026 klo 13.39): VAIN EUROOPPA -esto on poistettu kokonaan.
Muita maanosia aletaan tehdä vähitellen, mutta työtä ei aloiteta vielä: aloitus omistajan
päätöksellä (linssit kattavat edelleen koko maailman). Raamattu, luku 1.

UI-POHJAT (omistaja 1.10.2026, sitova): jokainen uusi ominaisuus, linssi, ikkuna, kortti,
nosto ja paneeli käyttää olemassa olevia tyylimäärittelyjä ja pohjia. Jos jotain tarvittavaa
puuttuu, omaa ratkaisua ei tehdä: kysy ensin Päätoimittajalta, joka kysyy omistajalta,
miten se toteutetaan. Raamattu, luku 4, UI-POHJAT JA TYYLIMÄÄRITTELYT.

LATAUS SAMA KAIKILLA VERKOILLA (omistaja 25.9. ja 4.10.2026, sitova): Wi-Fiä ja mobiilidataa
EI erotella missään latauksessa, esilatauksessa tai päivityksessä; ei verkkotyyppiehtoja, ei
kokorajoja, ei "vain Wi-Fillä", eikä sellaisia ehdotuksia omistajalle. Raamattu, luku 6,
LATAUS ON SAMA KAIKILLA VERKOILLA.

## Lue ensin

- **Raamatun luku 7 "Tuotantoputki ja roolit" (ent. Ydinajatus kohta 2 "TYÖTAPA JA SESSIOT")** (sitova
  20.9.2026): roolisessiot (nykyiset roolit, mallit ja kansiot:
  docs/tilinvaihto.md:n roolitaulukko ja /Users/Shared/Claude/osoitekirja.md),
  worktreet, viestisäännöt Päätoimittajalle (vain valmis erä, jumi tai
  kysymys; enintään 3 riviä, omistaja 14.10.2026), lukusääntö (ei koko
  Raamattua), kanavat ja kirjaus lokiin. Tämä korvaa docs/roolitus.md:n
  vanhan kolmen session työnjaon.

- **docs/roolitus.md** — julkaisusäännöt ja versionumerokäytäntö
  ("Julkaisusäännöt"); sen kolmen session työnjako on vanhentunut (roolit
  ja kanavat: Raamatun luku 7). Omistaja kehittää neljällä tilillä ja
  ohjaa kaikkea Keskustelukanavan kautta; Päätoimittaja orkestroi roolit.
- **js/tyohuone-raamattu.js (RAAMATTU)** — koko pelin idea ja
  kaikki oleelliset linjaukset YHDESSÄ tiiviissä paketissa (omistajan
  linjaus 15.8.2026: uudet oleelliset linjaukset kirjataan VAIN tänne;
  tekniset toteutusohjeet saavat asua muualla). JAKO 20.9.2026: Raamatussa
  on vain voimassa oleva linjaus per aihe; koko päätöshistoria on
  sanatarkasti kansiossa docs/raamattu-loki/. Lokia haetaan VAIN
  `node tools/loki-hae.mjs <hakusana> [--alkaen pp.kk]` -työkalulla
  (enintään 8 osumaa uusimmasta alkaen; koko kirjaus `--kirjaus
  tiedosto:rivi`), ei grepillä: lokin rivit voivat olla kymmeniä
  tuhansia merkkejä (omistaja 15.10.2026 klo 00.09). Uudet päätökset kirjataan
  `node tools/raamattu-kirjaa.mjs "OTSIKKO" "teksti"` -työkalulla lokiin;
  Raamatun linjausta muutetaan vain kun sääntö muuttuu. Vain Fable kirjoittaa;
  ristiriidassa hyväksytty Raamattu-osio voittaa muut dokumentit.
  Raamatun luku 13 (Sanasto ja ohjekartta) on TÄYDELLINEN KARTTA kaikkiin muihin
  ohjedokumentteihin — jos dokumenttia ei ole kartalla, se ei ole
  ohje (tests/dokumentit.test.mjs valvoo tätä koneellisesti).
- docs/tarina.md ja docs/isoisan-raamattu.md — tarinan kaanon
  (sitova kaikessa sisällössä; vain Fable kirjoittaa näihin).
- docs/moduulit/siirtoraportti.md — mitä siirtoraportin pitää sisältää
  ja mihin se tallennetaan, kun sessio päättyy tai rooli siirtyy.
- docs/moduulit/tarinakaari.md — miten uuden laudan kaaritekstit
  kirjoitetaan (prosessi, kiintiöt, tarkistuslistat).
- Perustuslaki (viisi pilaria) on Raamatun luvussa 3, kohta "Perustuslaki";
  tekniset jatkeet (laudan hyväksyminen, etukäteispuskuri) CONTRIBUTING.md:ssä.
- docs/moduulit/kaupunkilehti.md, docs/moduulit/maalehti.md ja
  docs/tyolista-opukselle.md — lehtimalli ja lehtityön ohjeet.
- **docs/tilinvaihto.md** — LUE ENSIMMÄISENÄ, KUN TILI VAIHTUU (omistaja
  sanoo "tilinvaihto" tai "uusi tili", tai sessio aloittaa uudella tilillä).
  TILINVAIHTO uudelle Claude-tilille: järjestys
  (tili ja omistajan toimet ensin), roolitaulukko, aloitusviestit
  (docs/aloitusviestit/), Macin vain-paikallisten ohjeiden peili
  (tools/tyotavat/) ja VOIMASSA OLEVA ARVO -taulu ristiriitoihin.

## Työtilat (omistaja 23.9.2026, sitova)

Kaikki Clauden kansiot ovat /Users/Shared/Claude/ -kansiossa (yhteinen kaikille
Macin käyttäjille): roolien checkoutit /Users/Shared/Claude/Matkakirja-<rooli>
ja erä-worktreet /Users/Shared/Claude/wt/<rooli>-<aihe>. Ei koskaan suoraan
käyttäjän kotihakemistoon. Worktree luodaan `tools/uusi-worktree.sh <rooli>
<aihe>` -työkalulla ja poistetaan mergen jälkeen `--poista`-lipulla. Postivahti
ajaa `tools/tarkista-tyotilat.sh` kierroksellaan ja ilmoittaa poikkeamat Fablelle.

## Mac Studio (18.9.2026 alkaen)

Fable ja agentit ajavat omistajan Mac Studiolla. Uuden session aloitus
ilman omistajan ohjetta ja kaikkien avainten sijainti (Macin ympäristö,
GitHub Actions secrets, gh-token) on Raamatun luvussa 12, kohta "MAC STUDIO: UUDEN
SESSION ALOITUS ILMAN OMISTAJAN OHJETTA, JA MISSA AVAIMET OVAT".
Avaimia ei kysytä omistajalta.

## Tärkeimmät säännöt

- VIESTIRAJA (omistajan kortti 18.10.2026 klo 05.40, sitova): kun sovellus pysäyttää viestit toisille
  sessioille (esim. "Not delivered: this session has already messaged Claude Desktop sessions 10 times …
  Paused until your user's next message in this session." tai "Failed to send"), lähetä ne heti
  varakanavalla `mcp__ccd_session_mgmt__send_message` session-id:llä (lataa ToolSearchilla). Älä jää
  odottamaan omistajaa tai nollausta. Raamattu, luku 7, kohta 7.23 VIESTIT.
- Julkaisukaava ja versionumerokäytäntö: docs/roolitus.md
  ("Julkaisusäännöt"). `git fetch origin main` aina juuri ennen
  versionumeron valintaa — sessiot julkaisevat rinnakkain.
- Kuvat vain PD/CC, tarkistettuina Commonsista. Maksulliset äänilähteet,
  liitännäiset ja 3D-mallit sallittuja, kun ne nopeuttavat olennaisesti tai
  parantavat laatua; omistaja ostaa (7.10.2026, Raamattu, luku 11, MAKSULLISET LÄHTEET). API-avaimia
  ei koskaan repoon eikä lokiin.
- Konttiympäristössä Noden fetch tarvitsee `NODE_USE_ENV_PROXY=1`;
  Chromium on Macilla ~/Library/Caches/ms-playwright (konttipolku /opt/pw-browsers/chromium oli vanha ympäristö).

## Arkisto

docs/arkisto/ sisältää vanhentuneita suunnitelmia ja kertaraportteja.
Älä lue sieltä ohjeita — voimassa olevat ohjeet ovat tässä tiedostossa
ja docs/roolitus.md:ssä.
