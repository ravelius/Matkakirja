# !!! AGENTIT VAIN OPUS JA SONNET — FABLE-MALLIA EI KOSKAAN AGENTTINA !!!

Omistajan sitova sääntö (1.9. ja 7.9.2026): jokainen ali-agentti, parvi ja
workflow ajetaan Opuksella tai Sonnetilla. Ei poikkeuksia, ei kysymällä.
Parvina saa ajaa. Fablemax-agenttityyppi on poistettu. Sama sääntö on
Raamatun ja docs/roolitus.md:n ensimmäisellä rivillä.

Täsmennys (omistaja 11.9.2026, tekstisession kautta): tämä sääntö koskee
Clauden agentteja. Peliä kehittää myös ChatGPT/Codex, joka saa käyttää
Solia, Terraa ja Lunaa (kevyemmät agenttimallit); molemmat pääsessiot delegoivat
rajatut tehtävät kevyimmälle riittävän kyvykkäälle mallille (Raamattu,
Ydinajatus: CLAUDEN JA CHATGPT/CODEXIN AGENTTISÄÄNNÖT ERIKSEEN).

# Matkakirja ja unohdettu aarre

Suomenkielinen seikkailupeli, jossa samalla oppii (kohderyhmä
13 vuotta täyttäneet ja aikuiset — EI lastenpeli): nuori Fogg,
isoisänsä perillinen, matkustaa
isoisänsä vuoden 1873 matkapäiväkirjan jäljillä ja etsii Aarnin
luettelon unohdettuja aarteita. Selainpeli ilman build-vaihetta
(ES-moduulit, service worker; yhden tiedoston versio rakennetaan
Pages-julkaisussa — dist/-kansiota EI committoida, historia paisuisi).

## Lue ensin

- **Raamatun Ydinajatus-osion kohta 2 "TYÖTAPA JA SESSIOT"** (sitova
  20.9.2026): kuusi roolisessiota (Fable, Julkaisija, Karttaseppä,
  Pelikoodari, Sisältökirjuri, Laitetestaaja), worktreet, viestisäännöt
  Fablelle (vain valmis erä, jumi tai kysymys; enintään 8 riviä),
  lukusääntö (ei koko Raamattua), kanavat ja kirjaus lokiin. Tämä
  korvaa docs/roolitus.md:n vanhan kolmen session työnjaon.

- **docs/roolitus.md** — TYÖNJAKO KOLMEN SESSION KESKEN (Fable =
  tarina + koordinaatio, Opus = lehdet + koodi, Sonnet = QA).
  Omistaja kehittää kahdella tilillä ja ohjaa kaikkea Fablen kautta;
  katso dokumentista oma roolisi, viestintäkanava ja julkaisusäännöt
  ennen kuin teet mitään.
- **js/tyohuone-raamattu.js (RAAMATTU)** — koko pelin idea ja
  kaikki oleelliset linjaukset YHDESSÄ tiiviissä paketissa (omistajan
  linjaus 15.8.2026: uudet oleelliset linjaukset kirjataan VAIN tänne;
  tekniset toteutusohjeet saavat asua muualla). JAKO 20.9.2026: Raamatussa
  on vain voimassa oleva linjaus per aihe; koko päätöshistoria on
  sanatarkasti kansiossa docs/raamattu-loki/ (PAATOKSET-, TARKENNUS- ja
  TILA-otsikot löytyvät sieltä grepillä). Uudet päätökset kirjataan
  `node tools/raamattu-kirjaa.mjs "OTSIKKO" "teksti"` -työkalulla lokiin;
  Raamatun linjausta muutetaan vain kun sääntö muuttuu. Vain Fable kirjoittaa;
  ristiriidassa hyväksytty Raamattu-osio voittaa muut dokumentit.
  Raamatun viimeinen osio on TÄYDELLINEN KARTTA kaikkiin muihin
  ohjedokumentteihin — jos dokumenttia ei ole kartalla, se ei ole
  ohje (tests/dokumentit.test.mjs valvoo tätä koneellisesti).
- docs/tarina.md ja docs/isoisan-raamattu.md — tarinan kaanon
  (sitova kaikessa sisällössä; vain Fable kirjoittaa näihin).
- docs/moduulit/siirtoraportti.md — mitä siirtoraportin pitää sisältää
  ja mihin se tallennetaan, kun sessio päättyy tai rooli siirtyy.
- docs/moduulit/tarinakaari.md — miten uuden laudan kaaritekstit
  kirjoitetaan (prosessi, kiintiöt, tarkistuslistat).
- Perustuslaki (viisi pilaria) on Raamatun osiossa "Perustuslaki";
  tekniset jatkeet (laudan hyväksyminen, etukäteispuskuri) CONTRIBUTING.md:ssä.
- docs/moduulit/kaupunkilehti.md, docs/moduulit/maalehti.md ja
  docs/tyolista-opukselle.md — lehtimalli ja lehtityön ohjeet.

## Mac Studio (18.9.2026 alkaen)

Fable ja agentit ajavat omistajan Mac Studiolla. Uuden session aloitus
ilman omistajan ohjetta ja kaikkien avainten sijainti (Macin ympäristö,
GitHub Actions secrets, gh-token) on Raamatun osiossa "MAC STUDIO: UUDEN
SESSION ALOITUS ILMAN OMISTAJAN OHJETTA, JA MISSA AVAIMET OVAT".
Avaimia ei kysytä omistajalta.

## Tärkeimmät säännöt

- Julkaisukaava ja versionumerokäytäntö: docs/roolitus.md
  ("Julkaisusäännöt"). `git fetch origin main` aina juuri ennen
  versionumeron valintaa — sessiot julkaisevat rinnakkain.
- Kuvat ja media vain PD/CC, tarkistettuina Commonsista. API-avaimia
  ei koskaan repoon eikä lokiin.
- Konttiympäristössä Noden fetch tarvitsee `NODE_USE_ENV_PROXY=1`;
  Chromium on polussa /opt/pw-browsers/chromium.

## Arkisto

docs/arkisto/ sisältää vanhentuneita suunnitelmia ja kertaraportteja.
Älä lue sieltä ohjeita — voimassa olevat ohjeet ovat tässä tiedostossa
ja docs/roolitus.md:ssä.
