# Julkaisijan luovutus 6.10.2026 klo 23.4x (tilinvaihto, omistaja 23.4x)

Kirjoittaja: Julkaisija (Opus 5.5, high). Juokseva loki: /Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt
(kaikki TF-, juna-, vienti- ja vuorotapahtumat). Pitolista: julkaisija-tyokalut/pidossa.txt.

Päätoimittajan session nimi on **"PÄÄTOIMITTAJA (Opus, max)"**.

## Tila 23.4x

- Lukko vapaa, ei simuja käynnissä. Levy 46 Gi, swap 16 Gt. Kaikki roolit ovat lopettaneet ajot tilinvaihdon vuoksi.
- Ei taustalla olevia Julkaisijan ajoja (vientien taustaajot valmiita).

## Junarytmi (omistaja 6.10. 17.4x)

Kiinteät VIE-ikkunat 12/20 poistuivat. Juna lähtee aina, kun kuitattua sisältöä on ja edellinen juna on TF:ssä
(yksi kerrallaan; käännös ja savu ainoa raja). Kaava: Natiiviseppä kokoaa rungon → KÄÄNNÖS NYT → savu (Laitetestaaja,
tulos luetaan **list_eventsillä** session local_36a45147-8407-4cfb-bbdb-c20d5f684735 istunnosta, ei odoteta viestiä) +
roolien todisteet → Päätoimittaja VIE → JUNAN AVAUS NYT Natiivisepälle → BUILD-SHA → TF.

## TestFlight

- 6.10. testaajilla: **150** (muistioikeus, 16.55), **151** (18.13), **152** (19.46), **153** (21.36), **154** (22.32).
- 154 = proto master 8878ab70 (juna/b13 286e8f34), käännös 787db464, muutosloki #4079.
- Kaikissa 150→ allekirjoituksessa `com.apple.developer.kernel.increased-memory-limit = 1` (tarkista TF-lokista grep).
- TF-kaava: muutosloki-PR (≤ 3 lausetta / 280 mrk; Päätoimittajan teksti; `node --test tests/vienti.test.mjs` väliaikaisessa
  worktreessä) → squash-merge → `gh workflow run proto3d-testflight.yml --ref main -f vie_unitysta=true -f versio=1.1
  -f ordinaali=N -f proto_ref=<master> -f build_numero=N -f sisainen_ryhma=false` → kun "Vie sisältöpaketti" (muutosloki-
  commitin SHA) on success → `testflight-sisainen.yml -f build_numero=N` → `testflight-ulkoinen.yml -f build_numero=N`.
  Muutosloki ENNEN TF:ää (muuten TF kaatuu "Muutoslokin rivi" -askeleeseen). Build-numero on aina kokonaisluku.
- TF odottaa lukkoa max 45 min. Sisäinen ryhmä voi odottaa ASC-käsittelyä ~30 min.

## Juna 155 (Päätoimittaja 23.4x)

- Runko **eb951c97** (Natiiviseppä). Mukaan: **NUI natiivi-ui/ylarivi-155** (PAKOLLINEN, omistajan TF 154 iPad-vaaka;
  Päätoimittajan listassa 241fb080, NUI:n uusin **b2b3eae5** = 241fb080 + suojarivi, testikäännös 2fadc15c ja mykkä simu
  23.28–23.38 tehty) ja **LS2 640eb7b4** (gibs-pehmea + opas-vapaa-lataus; LS2:n hiljainen ajo 3ac7ce47 23.12–23.27,
  poikkeuksia 0). Varmista NUI:lta, kumpi SHA junaan.

## Käännös- ja simujono (tilinvaihdon jälkeen tässä järjestyksessä)

1. **Mac v1** (Natiiviseppä, natiiviseppa/mac + korjaus f5d0e029; edellinen 62f6b368 VIKA 22.53 Burst AOT -linkki /
   suoritusbitti). ~15–30 min, irrallisena (perl setsid). Rinnalla enintään 1 mykkä simu, ei muita käännöksiä.
   Natiiviseppä odottaa KÄÄNNÖS NYT -viestiä.
2. **LS1 linssiseppa/koe-156, käännä haaran kärki** (70f0bca62 = 03b569d3 + pehmeät lennot ja lentomittari; master 8878ab70 + yövalot v5 + juna 156 esilataus/Seuraava/latauskuva): käännös + ~20 min
   3A3E4671: (a) BUILD 154 -appi natiiviseppa-app-154lopullinen-787db464 Pariisi+Sydney (ennen), (b) koe-156 sama (jälkeen),
   (c) koe-156 yövalot v5 (iPad, sitten D0D2CD1E iPhone ~5 min). Päätoimittajan ennen/jälkeen-esilatausmittaus.
   **Lupa annettu käyttää 154-appia** (vain asennus simuun, ei muokkausta).
3. **LS1 iPad-yövalomittaus** (fyysinen 00008103): laitekäännös d78bd96e asennettu 23.10, mutta mittaus 23.11–23.18
   MITÄTÖN (iPadilla ei verkkoa, HTTP 0; Natiivisepälle ilmoitettu). Uusinta ~7 min, kun verkko kunnossa; swap < 12 Gt,
   ei junan/TF:n aikana.
- Säännöt: SIMU NYT → odota "simu vapaa" (älä päättele simun sammumisesta, roolit vaihtavat laitteita); yöllä 1 simu;
  hiljainen = ei käännöksiä eikä muita simuja; swap > 40 Gt tai levy < 40 Gi → ei uusia ajoja (Päätoimittaja 20.1x).
- Monitor-komento (re-arm 30 min välein): simut + lukko + levy + swap, ks. lokin malli.

## Ämpäri (vie-paketti.sh, lue LAHTEET.md ensin)

- 6.10. viety: opas-nimet (431), opas-kuittaukset (73), opas-kuvat pilotti (99), kaupunki-yovalot (1554),
  **opas-kuvat-vienti-20261006b** (1461 = 1363 + 98 jo; kuvat-v2/kuvat.json 200, 23.09),
  **kartta-tiet-vienti-20261006** (7 kaupunkia kartta/tiet-v1/, OSM ODbL; kaikki 200, 23.27).
- vie-paketti EI ylikirjoita: samaan polkuun ei voi viedä uutta versiota (immutable-välimuisti) → uusi polku + worker-PR.

## Pöllö

- Julki 6.10.: #4049, #4054, #4055, #4058, #4060, #4063, #4062, #4064, #4067, #4068, #4071, #4075, #4076, #4077,
  **#4080** (kuvat-v2; merge 05d8f43b, julkaisu 37524385705 success 23.12).
- **PIDOSSA: #4081** (Pelikoodari, GET /opas/aineistot + tiet-lista). tiet-v1 (7 kaupunkia, 4 km) on jo ämpärissä, mutta
  LS1 pyysi Pariisille, Lontoolle ja Roomalle 6 km:n säteen (Eiffel jäi ulos). Pelikoodari tekee ne uuteen pakettiin
  **kartta/tiet-v2/** ja päivittää #4081:n listan. VALMIS 23.41: paketti
  `/Users/Shared/Claude/proto-3d/_valmiit/kartta-tiet-vienti-20261006b` (pariisi, lontoo, rooma; 1,4–2,4 Mt), #4081 head
  **ee9dc402f570f6d32e800f24f4a492f551dbe469** (aineistot.js tiet_polut). Ei viety tilinvaihdon vuoksi (Päätoimittaja: ei uusia
  töitä). Järjestys: (1) vie-paketti.sh tämä tiet-v2-paketti
  (lue LAHTEET.md, SHA256SUMS) ja tarkista 200 `?t=`-parametrilla, (2) vasta sitten merge #4081 uudella headilla, kun testit
  vihreät (`--match-head-commit <uusi head>`), ja `gh workflow run pollo-julkaisu.yml --ref main`, (3) ilmoita Pelikoodarille.
- Merge-skriptit (merge-sitkea3.sh, pollo-karki.sh) olivat scratchpadissa ja katoavat; mergeä käsin yllä olevalla kaavalla.
- Kustannus- ja rajamuutokset Pöllöön vain Päätoimittajan suoralla kuittauksella.

## Avoimet

- **#4072** Päätoimittajan loki-PR (fable-loki-20261006c, täydennetty 1e952617a, head d28921b94; illan kirjaukset
  20.2x–23.3x + Raamattu: linssien 3D-mallit myös Euroopan ulkopuolelle, oppaan lennot pehmeät ja kierros lyhin reitti).
  Mainista yhdistetty; **mergeä kokonaisena, kun testit vihreät ja junatilanne sallii** (testit pending 23.38).
- **Muistioikeus**: ASC-API ei tue INCREASED_MEMORY_LIMITia (409); omistaja lisäsi sen portaalissa. testflight-muistioikeus.yml
  jäi repoon (kuiva-ajo näyttää tilan). Kehityskäännökset (.kehitys) ilman oikeutta (Natiiviseppä f3a48802).
- Appikopiot: 154lopullinen-787db464 säilytetään (LS1:n vertailu); 150-ea457278 kunnes Siirtoseppä kuittaa.
- Omia worktreeitä ei ole jäljellä.
