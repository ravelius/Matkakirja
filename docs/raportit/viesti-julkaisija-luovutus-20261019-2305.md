# Julkaisijan luovutus 19.10.2026 klo 23.05

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -150). Edellinen: `viesti-julkaisija-luovutus-20261019-2005.md`.
Osoitekirja /Users/Shared/Claude/osoitekirja.md. Viestit `mcp__ccd_session_mgmt__send_message` id:llä.

## 0. TILA
- **Juna 206 VIIVÄSTETTY** (OMISTAJAN PÄÄTÖS 21.38: "Viivytetään ennemmin junaa. Sanon sitten kun julkaistaan"). TF 206 vasta kun KK välittää "OMISTAJA PYYSI JULKAISUA" + PT LUKITSE. Ei TF-ajoja käynnissä.
- Pysäytetty 206 (21.32): BUILD 766aa47fa EI lähtenyt TF:ään. `muistiajo-206.txt` = NS:n muistiajo 766aa47fa:lla (PT 21.3x: tulos kelpaa uuteen 206:een, mallit samat). Tarkista tiedoston 1. rivi OK ennen tf-kaynnista.sh 206. `muistiajo-206-ohitettu-kumottu.txt` = NS:n alkuperäinen ohitus, jonka PT kumosi.
- TF 204 ja 205: iOS + Mac + sisäinen + ulkoinen ✓ (204 ulk. 20.25, 205 ulk. 20.51), vanhemmat vanhennettu. Asemataulu "Juna 205 5/5 Testaajilla" (v65).
- Valovahti TAUOLLA edelleen (`/tmp/matkakirja-valovahti-tauko`). Kuorma 5 min ~40.

## 1. KÄYNNISSÄ (irrotettu nohup, kestää nollauksen)
| linja | sha | kenelle | app | loki |
|---|---|---|---|---|
| L1 | 6c734412f | Valoseppä jälki + taivas v2 | _tyo/linssiseppa2/jalki4-app | julkaisija-tyokalut/vs-jalki5-206.log |
| L2 | 5b8e6cc13 | Lavastaja kaukomaisema-v2 | _tyo/linnanrakentaja/kaukomaisema-207-app | julkaisija-tyokalut/lr-kaukomaisema-207.log |
Valmistuvat ~23.10. Kun "L? VAPAA" näkyy lokissa: KÄÄNNETTY-viesti erän tekijälle (sha, polku).

## 2. SIMUJONO (ENSIN)
1. **PK** ajaa nyt (SIMU NYT 23.02): kamera+ympäristö 319044008, kamera-206e-app, ~12 min → odota SIMU VAPAA.
2. **Valoseppä** (local_e675f86d): 6c734412f jalki4-app iPhone + iPad (jos ei valmis → f86a988f7 jalki3-app).
3. **Lavastaja** (local_cd402541): kaukomaisema-v2 5b8e6cc13, iPhone 484B130B + iPad 18932B67 (vienti v2 tehty 23.00).
4. **Valoseppä tulivuoret**: pimennys-lauta 5126cff3d, _tyo/linssiseppa2/tulivuoret-app, iPad ~25 min.
5. **PK raketti-auto 8eb6e1945** (c8494c7db, raketti-auto-204-app) – raketti-Pulu ajettu jo 22.31 OK; kysy PK:lta tarvitaanko vielä.

## 3. Valmiina, ei toimenpiteitä
Tänä iltana käännetty: NUI aarnin-kolme(2), aarrevideo, palsta-haku 03deb7b16, varjostimet 28ef55f1e; LS opas-kuvaraita 4a4869c25; VS juoksuvalo 0654b1763, pimennys-k6, lattiat k1–k5; PK juoksupeli 620227d37, viitta-207 b3a5cfc65, raketti 8eb6e1945, kamera 319044008; NS rungot 36615863b … 930142989 (runko-206c-app, simu 23.02).
Viety tänään (0 virhettä): hahmot-v3, ymparisto-v1, kaukomaisema v1+v2, taivas-codex v1+v2.
Pidossa-lista tyhjä paitsi VS rakettivideo 88f708220 (simu vain yöllä).

## 4. Opit
- Kun sha vaihtuu kesken käännöksen: anna valmistua (Burst-riski), käännä uusi ERILLISEEN app-kansioon tai saman linjan perään, ettei vanhempi kopio ylikirjoita uudempaa.
- Kaksi skriptiä samalle linjalle → proto-kaanna odottaa lukkoa (turvallista, mutta toinen linja jää tyhjäksi).
- vie-paketti hylkää kansion, jossa on SHA256SUMS:ista puuttuvia tiedostoja (esikatselu/) → pyydä tekijää siirtämään.
- Viennit aina ennen simua (CDN ei saa välimuistittaa 404:ää).
