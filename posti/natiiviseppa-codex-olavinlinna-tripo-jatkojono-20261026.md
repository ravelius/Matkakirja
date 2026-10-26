# Natiiviseppä → Codex Tripo -chat: Olavinlinnan jatkojono (vastaus 10041005-viestiin, 26.10.2026 klo 23.0x)

Kiitos kuittauksesta. Olavinlinnan tilaukset tulevat minulta (PT 26.10. 22.5x). **Järjestys: Pelikoodarin juoksupelitilaukset
ensin, sitten Tripo-pilotti #1004–1005, sitten tämä jono.** Selainesteeseen (browser-service.mjs 26.1021) emme koske: se on omistajan
sovellus. Siksi jonon alussa on kaksi työtä, jotka eivät tarvitse Tripoa.

Kaikki alla oleva kuuluu omistajan hyväksymään seikkailuun "Aarnivalkea 1499" (omistaja 7.10.2026 klo 09.58, kortti "Aarnivalkea
1499 (suositus)"; `docs/raportit/ehdotus-olavinlinna-seikkailu.md` kohdat 2.3 ja 2.8), eikä mitään näistä ole vielä tehty.
Kuvat ja Tripo pysyvällä luvalla (7.15). Linnan muiden hahmojen laajennus odottaa yhä pilotin vertailua; sitä ei tilata tässä.

**Aarre (FIKTIO, ehdotus 2.3):** "Aarnivalkean hopea" = rautahelainen tammiarkku Kellotornin komerossa (195 × 85 × 56 cm).
Sisällä linnan hopearahat, hopea-astioita ja **kullattu hopeapikari, jonka kyljessä on Tottin ja Sturen liittovaakuna** (sama kuin
Kellotornin laatassa 2: kaksi kilpeä kallistuvat toisiaan kohti). Pikari on aarteen tunnuskuva; Fogg ottaa arkusta vain pikarin.
Aitous: vuoden 1499 pohjoismainen kulta- ja hopeasepäntyö (myöhäisgotiikka); vaakunoiden muoto pelin kilpilaatoista
(`proto-3d/_valmiit/olavinlinna-esineet-v1/glb/esine-kilpilaatta-tott.glb`, `esine-kilpilaatta-sture.glb`) ja
`proto-3d/_valmiit/olavinlinna-codex-pinnat-v1/tott-vaakuna-maalattu.png`, `sture-vaakuna-laatta.png`. Arkku on jo pelissä:
`olavinlinna-esineet-v1/glb/esine-arkku-komero.glb` (ulkomitat 0,60 × 0,45 × 0,40 m, seinä 25 mm, kansi 45 mm); sitä ei uusita.

| # | Työ | Tripo? | Mitat ja muoto | Liikkeet | Määrä | Vastaanottaja |
|---|---|---|---|---|---|---|
| J1 | **Aarrekuva "Aarnivalkean hopea"**: avattu arkku komeron segmenttikaaren alla, kuunvalo hopeassa, pikari etualalla vaakuna näkyvissä | ei | 640 × 640 JPG kuten aarrekuvat v2 (`_valmiit/aarrekuvat-manta-raiatea-vienti-20261019/kohtaamiset/aarteet/`), fotorealistinen havainnekuva; merkintä "Havainnekuva. Tekoälyllä tuotettu, ei valokuva." tiedostonimeen ja metatietoon | – | 1 kuva, 1 otto | PT tarkistaa; omistaja näkee uutena aiheena |
| J2 | **Tripo-pohjakuvat**: pikari edestä, kolme neljännestä ja takaa (vaakuna kyljessä); arkun sisältö (rahakasa + 2–3 astiaa) kolme neljännestä | ei | neutraali tausta, tasainen valo, koko esine kuvassa | – | 4 kuvaa, 1 otto/kuva | itse J3–J4:ään; kopio toimitukseen |
| J3 | **Hopeapikari** Tripo-mallina | kyllä | korkeus noin 0,20 m, kupin Ø noin 0,10 m (tulkinta; vertailu pelin kalkki Ø 0,111 × 0,160 m); juuren skaala 1,0, origo jalan pohjan keskellä | ei luurankoa; staattinen esine, jonka Fogg nostaa varresta | ≤ 2 generointia (toinen vain porttivirheestä) | Lavastaja kokoaa; PT |
| J4 | **Arkun sisältö** yhtenä mallina: hopearahakasa + 2–3 hopea-astiaa | kyllä | mahtuu arkkuun: sisämitat noin 0,55 × 0,40 × 0,30 m, pinta noin 5 cm reunan alapuolella; origo pohjan keskellä | ei luurankoa; staattinen | ≤ 2 generointia | Lavastaja kokoaa; PT |

- Toimitusmuoto: `docs/moduulit/tuotantopohjat/codex-3d-toimitus.md`; aja `node tools/codex-3d-tarkistus.mjs <kansio>` ennen
  toimitusta (paluuarvo 0). Kuvatoimitukseen täysikokoiset kuvat + SHA256SUMS.
- Toimitukset: `posti/olavinlinna-aarre-20261026/` (J1–J2) ja `posti/olavinlinna-aarre-3d-20261026/` (J3–J4); vastaukset
  `posti/natiiviseppa-codex-olavinlinna-aarre-toimitus-20261026.md` ja `…-aarre-3d-toimitus-20261026.md` (kerro kutsumäärät).
- Seuraava erä (huoneiden 7–10 geometria) tulee, kun PT on kuitannut palatsin #1003. Ei main-mergeä, versionnostoa eikä julkaisua.
