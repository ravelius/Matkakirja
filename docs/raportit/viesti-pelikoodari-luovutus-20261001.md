# Pelikoodarin luovutus 1.10.2026 (n. klo 05.30, viikkokiintiö 95 %)

## 0. Kärki ja odottavat

- **TF-todennukset (Pulu):** BUILD 88–90 sisältävät Pulun yhteisen chatin ja maakuntakortin. Simulaattorissa todentamatta
  (TF:ssä omistajalta tai Laitetestaajalta): (a) Ihmisen matkan kysymys ILMAN valmista vastausta avaa chatin kortin
  aiheella; (b) kartan chat palaa paperiteemaan, kun linssi suljetaan chatin ollessa auki. Todennuskuvat:
  `proto-3d/lokit/pelikoodari-yhdistetty-20261001/` (ennen/jälkeen iPhone + iPad) ja `…/pelikoodari-tarkistus88-20261001/`.
  Uusin käännös todennukseen: uusin `proto-3d/lokit/juna-1.1.<n>-*/` (Natiiviseppä poistaa vanhat; 1.10. 05.4x: 91 = 23041f6f PASS).
- **Äänimikseri TF 89:ssä** (juna-mikseri 6d3bd51f): vain kehittäjätilassa, Olavinlinna ja Cupola. Omistajan 5 rivin ohje on
  Päätoimittajalla. Laitetodennus keittiön kaikustemmeillä, kun ne ovat ämpärissä (#3727 + apulaisen v2-vienti
  `lokit/pelikoodari-keittio-aanet-20261001/vienti/`, odottaa omistajan "Jauhosäkki"-kuuntelua). Omistajan Tallenna-JSON tulee
  palautekanavaan (sivu "Äänimikseri") → poltto: lopulliset kaiut (v2-kansio) ja taustatasot sisältöön (aanimiksaus.json).
- **Linnan puheet** PR #3742 (106 riviä, kertoja = isoisä eleven_v3): vienti `lokit/pelikoodari-linna-puheet-20261001/vienti/`
  ämpärin juureen (omistaja ajaa). Siirtosepän soittokoukut pulu.aani ja kertoja.jaksot[].aani ovat natiivissa.
- **Web-PR:t auki:** #3742 linna, #3740 apulainen C, #3731 web-ikonit (omistaja hyväksyi; luonnostila — luokitin esti minulta
  tilamuutoksen, omistaja/Päätoimittaja hoitaa), #3723 Cupola web (kun mergetty: poista natiivin Tietoja.cs:n päällekkäinen
  "Cupolan äänimaisema" -rivi), #3730 Pulu-konteksti web.

## 1. Valmiit tänä yönä

- Pulun kontekstivuoto: natiivi 59117878 (juna 81) + web #3730; kehotelause #3737 (Päätoimittaja), laaja otos 0/20 vuotoa
  (`lokit/pelikoodari-pulu-kehote-20260930/laaja-jalkeen.json`).
- Maakuntakortti (juna 88): kysymykset → PuluChat.VastaaValmiilla, kuva nostokortin mitoilla + kuva2, MaakuntaMinikartta.
- Pulun yhteinen chat (juna 88): PuluChat.AvaaLinssissa (mk-chat--linssi), MinipulunKortti sovittimena, Pulun taulun Kysy
  Pululta paikallaan, Esc-järjestys (Nappaimisto 90), linssissä vain nykyisen kohteen kysymykset.
- Cupolan väistö mitattu (humina ×0,7, radio ×0,15); Cupola-tekijätieto natiiviin (juna 84).
- Keittiön äänet: apulainen → C (Adam - Engaging, Friendly and Bright), kokki ja vesipoika ennallaan (omistajan poikkeus).
- tools/hahmonaytteet.mjs: rivikohtainen malli (v4 | v3 kertojalle) ja stability.

## 2. Säännöt, jotka opin (muistissa)

- Hahmoäänet: eleven_v4, ei fi-merkattuja, eniten käytetyt; kertoja = isoisä (Viisas Kertoja) eleven_v3.
- proto-kaanna.sh "VIKA merge" jättää vanhan .appin: kopioi vain "KÄÄNNETTY <oma SHA>" -rivin jälkeen.
- Simulaattori: aina uninstall + shutdown omalla UDID:llä; yksi simulaattori kerrallaan; ei kuuluvaa ääntä (mykistys päällä,
  mittaus tavoitetasoista). Oma iPad CD526454 (pelikoodari-iPad13), iPhone A2FD9C9F.
- Luokitin estää: PR-tilamuutokset ja workerin julkaisupolun ilman omistajan lupaa tässä sessiossa — ei kiertoteitä.

## 3. Työkalut

`proto-3d/tyokalut/pelikoodari-ajot/`: ajo-yhteinen.sh (VAIHE, LAITE, UDID, APPPOLKU, MD5), ajo-mikseri.sh,
ajo-tarkistus88.sh, ajo-kaikki.sh. Worktreet: `/Users/Shared/Claude/wt/proto-pelikoodari-*` (juna-mikseri,
juna-pulu-maakunta, testi-yhdistetty, pulu-yhteinen, maakuntakortti, aanimikseri, cupola-*) — poista mergettyjen haarojen
worktreet levyn säästämiseksi.
