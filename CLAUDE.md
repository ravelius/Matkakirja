# Matkakirja ja unohdettu aarre

Suomenkielinen seikkailupeli, jossa samalla oppii (kohderyhmä
13 vuotta täyttäneet ja aikuiset — EI lastenpeli): nuori herra
Fogg matkustaa
isoisänsä vuoden 1873 matkapäiväkirjan jäljillä ja etsii Aarnin
luettelon unohdettuja aarteita. Selainpeli ilman build-vaihetta
(ES-moduulit, service worker; yhden tiedoston versio rakennetaan
Pages-julkaisussa — dist/-kansiota EI committoida, historia paisuisi).

## Lue ensin

- **docs/roolitus.md** — TYÖNJAKO KOLMEN SESSION KESKEN (Fable =
  tarina + koordinaatio, Opus = lehdet + koodi, Sonnet = QA).
  Omistaja kehittää kahdella tilillä ja ohjaa kaikkea Fablen kautta;
  katso dokumentista oma roolisi, viestintäkanava ja julkaisusäännöt
  ennen kuin teet mitään.
- **js/tyohuone-raamattu.js (RAAMATTU)** — koko pelin idea ja
  kaikki oleelliset linjaukset YHDESSÄ tiiviissä paketissa (omistajan
  linjaus 15.8.2026: uudet oleelliset linjaukset kirjataan VAIN tänne;
  tekniset toteutusohjeet saavat asua muualla). Vain Fable kirjoittaa;
  ristiriidassa hyväksytty Raamattu-osio voittaa muut dokumentit.
  Raamatun viimeinen osio on TÄYDELLINEN KARTTA kaikkiin muihin
  ohjedokumentteihin — jos dokumenttia ei ole kartalla, se ei ole
  ohje (tests/dokumentit.test.mjs valvoo tätä koneellisesti).
- docs/tarina.md ja docs/isoisan-raamattu.md — tarinan kaanon
  (sitova kaikessa sisällössä; vain Fable kirjoittaa näihin).
- docs/kaariteksti-sapluuna.md — miten uuden laudan kaaritekstit
  kirjoitetaan (prosessi, kiintiöt, tarkistuslistat).
- Perustuslaki (viisi pilaria) on Raamatun osiossa "Perustuslaki";
  tekniset jatkeet (laudan hyväksyminen, etukäteispuskuri) CONTRIBUTING.md:ssä.
- docs/tutki-aiheet.md ja docs/tyolista-opukselle.md — lehtimalli
  ja lehtityön ohjeet.

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
