# Laitetestaaja: Olavinlinnan uusinta 3 (katse reittipaikan suuntaan, v48o / b03c72a06), 12.10.2026

**Tulos: EI LÄPI. 8 osasta + pako: 0 läpi, 3 etenee/osittain (muurikäytävä, tyrmä, sisäpihat), 5 ei etene (kirkkotorni, tott-kammio, komero, paluu, ampumakäytävä); pako: köysilasku käynnistyy ja kuuluu, mutta ei etene eikä valmistu.** Muurikäytävä on uusi paras: kamera on käytävässä, vartija edessä ja puuovi saavutetaan. Kirkkotornin munkki on poissa, mutta tilalla seinä. Köysilaskussa näkyy kolmannen persoonan hahmo.

Ajo: kaksi simua rinnakkain Julkaisijan SIMU NYT:llä, 11.15–11.33 (A `3622D89D` iPad Pro 13", B `864EAA12` iPad Air 13" M4). App `proto-3d/lokit/olavinlinna-auto-1012-1058` (käännös b03c72a06 = linnahaara 95f30c4c3 + v48o). Mac mykistetty, oikeat HID-kosketukset, kehittäjätila, Pelaa → laituri, sitten `poikki seikkailu aloitus <kohta>` + 8 askelta eteen + kuva. Appi ei pudonnut, ei Exception-rivejä. **Videota ei tällä kierroksella**: `recordVideo`-tiedostot jäivät 0 tavuun (tallenne ei kirjoittanut); todisteena kuva-arkit ja lokit.

Kuva-arkit: `docs/raportit/kuvat/laitetestaaja-olavinlinna-uusinta3-20261012/` (`kuva-arkki-A.jpg`: kirkkotorni, muurikaytava, tott-kammio, tyrma, komero; `kuva-arkki-B.jpg`: sisapihat, paluu, ampumakaytava; kolme kuvaa/osa = askeleet 1, 4, 8; `pako-koysilasku.jpg` (kuvat 0–6), `pako-koysilasku-lopussa.jpg`). Kaikki kuvat, lokiotteet ja `linssi-loki-kaikki.txt`: `proto-3d/lokit/laitetestaaja-olavinlinna-uusinta3-20261012/{A,B}/`.

## Osat (vapaus / reittipaikka / suunta lokista)
| Sim | Osa | Aiemmin → nyt | Havainto | Loki |
|---|---|---|---|---|
| A | kirkkotorni | OSITTAIN → EI | Munkki pois reitiltä, mutta kamera seinässä: harmaa tiiliseinä, sitten kiviseinä (4, 8). | vapaus 1,0 m; → reitti:pelaaja-16; suunta 23° (reittipaikan mittaama) |
| A | muurikaytava | EI → ETENEE | Kuva 1 kapea käytävä, vartija edessä; 4 ja 8 iso puuovi (rauta-niitit) lähellä, ovi ei avaudu 8 askeleessa. | vapaus 0,45 m; → aloituspaikka; suunta −85° (reittipaikan mittaama, ensiaskel ok) |
| A | tott-kammio | EI → EI | Seinä kaikissa kuvissa. | vapaus 1,6 m; → aloituspaikka; suunta 63° (vapain, näkymä 4,3 m, "ensiaskel päättyy seinään") |
| A | tyrma | EI → OSITTAIN | Tyrmän holvi, oviaukko ja kynttilä näkyvät kuvissa 1 ja 4; 8. kuva seinä. | aloitus sisäpihoilta kiinniotolla: vapaus 0,78 m → siirto 1,1 m, vapaus 1,59 m; → aloituspaikka; suunta 180° |
| A | komero | EI → EI | Seinä (1, 4, 8). Aloitus pelaaja-94:ltä (-51.71, 14.83, 5.71). | reittipaikka komero: eteen 0,0 ja 1,0 sivut 1,5/0,2 → reitti:pelaaja-94; suunta 94° (sisään linnaan, kiipeilyn loppu) |
| B | sisapihat | EI → OSITTAIN | 1. kuvassa MetaHuman-vouti (hupullinen mies, suu auki) + hoitaja oviaukossa (kamera ovella), 4 ja 8 seinä. | vapaus 0,78 → 1,59 m (siirto 1,1 m); → aloituspaikka; suunta 180° |
| B | paluu | EI → EI (parantunut) | **Pata ei enää täytä ruutua**: tulisija, tuli, pata ja tarjotin näkyvät 1/4/8; kamera tulisijan edessä, ei etene. | sama kuin sisäpihat |
| B | ampumakaytava | OSITTAIN → EI | Seinä; 4. ja 8. kuvassa ikkuna-aukko järvelle ja sininen verho; ei käytävää. | vapaus 0,45 m; → reitti:pelaaja-77; suunta −34° (reittipaikan mittaama) |
| B | pako | EI → KÖYSILASKU KÄYNNISTYY, EI VALMIS | Aloitus komerossa (kiipeilyn lopussa), kuva 0: kiviseinän kulma. Painoin käsi/ote-nappia (oikea alakulma): loki "soundly koysi-kiinnitys → köysi kramppiin → köysilasku (14 m)" (664 s), "koysi-lasku" -ääni 736 s. Kuvissa kamera siirtyy tornin ulkopuolelle ikkunan viereen: **hupullinen hahmo roikkuu seinällä (kolmas persoona)**, kamera ei laskeudu 2,5 min:ssä; loppua/"ulos"-riviä ei kirjattu. Kävely ei vaikuta. | reittipaikka pako: eteen 0,9 sivut 1,5/1,3 → aloituspaikka; suunta 94° (sisään linnaan, kiipeilyn loppu) |

Yhteenveto: 0 läpi; etenee tai osittain 3 (muurikäytävä, tyrmä, sisäpihat); ei etene 5 (kirkkotorni, tott-kammio, komero, paluu, ampumakäytävä); pako: köysilasku käynnistyy, ei valmistu.

## Köysilasku (pako)
- Toimiiko: **käynnistyy** (kiinnitysääni, lasku-ääni 72 s myöhemmin, lokissa "köysilasku (14 m)"), mutta **laskeutumista ei näy**: kamera pysyy tornin ulkopuolella paikoillaan ja hahmo seinällä; ei valmistumisriviä, ei siirtymää veneelle 2,5 min aikana.
- Käynnistys vaatii oikean alakulman käsinapin; ilman sitä ruudulla on vain seinä, joten pelaajalle ei ole ohjetta, mitä tehdä (ei kehotetta tai köyttä näkyvissä alussa).
- **Kolmannen persoonan hahmo** köysilaskussa (hupullinen, seinällä) rikkoo 1. persoonan säännön, jos hahmo on pelaaja.

## Löydökset (tärkeysjärjestyksessä)
1. **Köysilasku ei valmistu** (14 m, 2,5 min), ei visuaalista laskua, näkyvä hahmo kolmannessa persoonassa · pako-koysilasku*.jpg · Siirtoseppä.
2. **Kirkkotorni, tott-kammio, komero: seinä** (komero aloittaa nyt reitiltä pelaaja-94, silti seinä) · A/v11-*.
3. **Paluu: pata pois ruudulta (parannus), mutta ei etene**; tulisijan edessä · v11-paluu.
4. **Muurikäytävä saavuttaa oven**, ei avaudu (vartija edessä); sisäpihat näkevät vouti+hoitaja oviaukossa (NPC lähellä) · v11-muurikaytava, v11-sisapihat.
5. Ampumakäytävä huonontui (osittain → seinä, suunta −34°).

## Rajaukset
- Ei videota (tallenne 0 tavua), ääntä ei mitattu, koko läpipeluuta ei ajettu.
- Pako: köysilaskun valmistumista seurattu vain 2,5 min; "kiipeilyn lopussa" -aloituksessa oletettu Siirtosepän kuvaus.

Ei korjattu mitään (PT:n ohje).
