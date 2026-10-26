# Päätoimittajan luovutus 25.10.2026 klo 12.12 (talviaika EET; konteksti 30 %; tili vvi@vvi.fi)

Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10. Edellinen -20261025-1012 (lue vain tämä).
ALOITA: tuotannonohjauksen osio 0, node tools/raamattu-luku.mjs 7.47 (PT: luvut 7, 8, 9, 12, 14, 4.1, docs/tilinvaihto.md).
Session alussa: Monitor odottajat-vahti.py + codex-posti-vahti.sh (Shared/Claude/hooks), git fetch origin claude/postilaatikko.
VIESTIT: SendMessage-raja 10 → käytä mcp__ccd_session_mgmt__send_message session-id:llä. Omistaja MATKALLA, vastaa KK:n kortteihin.
Codex-kuittauksen nimi: posti/<vastaanottajarooli>-codex-<aihe>-* (muuten Postivahdin vahti hälyttää).

## 0. OMISTAJAN PÄÄTÖKSET (lokissa, Raamattu 2.177, PR 5226 mergetty c2c1aca18)
- 11.31 "Kyllä, koko pysyy": palatsin kerroin 1,0 lukittu → LR:n mittakaavaputkea ei ajeta (työkalu tallessa).
- 11.32 "Kyllä, levennetään": kaksi kapeaa kujaa (kuja-40: 02 → ~7,7 m itämuuri +3,3 m; 05 → ~10,7 m länsimuuri −5,5 m;
  väliosa ~4,8 m ennallaan, rakennukset eivät liiku). LR toteuttaa (tausta-v49, muurikate-v15, kujaportti), PK pohja/reitti/esteet.
- 11.34 PYYNTÖ: "Saako pylväisiin ja seiniin samanlaisen valon kuin havainnekuvissa? Eli pylväät näyttävät pyöreiltä ja
  kolmiulotteisilta valon ansiosta jne" → VS:n kärki.

## 1. KÄYNNISSÄ
- VS (nollattu f926f4495): ehdotus 1–3 HYVÄKSYTTY (suunnattu ympäristövalo, kääre 0,2→0, aurinko/ympäristö kohti 1,55/1,45;
  ehto: mittarit 01–05 NUI:n osan 0 luvuilla, mikään ok-kohta ei vikaan, ei mustia). P25-PÄÄTÖS: matalampi salin aurinko
  itäikkunoista räystään alta, piilotetun katon varjo pysyy kaikille valoille. Pari 04 + 01 PT:lle.
- LR: kujien levennys (paketit + kolmikko 02/05 lämmitysruudulla PT:lle, muurilinjat PK:lle) + katto-solmut
  kujaporteille (−794, −820) ja Taihemenille + muut reitin katokset grepillä → PK:lle.
- PK: räystäskamera (raystas-kamera-210, dccaef28a → 8314941bb) odottaa LR:n katto-solmuja. Aukio 03 kompromissi
  HYVÄKSYTTY (f8d48dc6e + 6f536fcbd, loivennus porttimuurien jälkeen, koko halli näkyy). Kun runko valmis: kolmikot aukio +
  kujaportti PT:lle → KK → omistaja. Sitten lautaspöydän pari uudelleen (aarteet799-v4 ämpärissä, lämmitysruutu).
- NS (nollattu c43e4ff87): seuraavaan runkoon NUI havainne-skaala-210 a6ad753fc. LT-reittiajo vain kamera/kujat/valo-rungoille.
- Uusin runko b2ff2ff99 (0ef01ab91 + aarteet799-v4) vihreä; 0ef01ab91 LT reittiajo vihreä (J 10,00 / A 11,82 ms).
- NUI: JONO TYHJÄ; tuleva mittariajo VS:n valoparille ja LR:n kujapareille PT:n pyynnöstä.

## 2. RATKAISTU TÄNÄÄN (ei avoimia)
- 01:n punainen ja PK:n harmaa lattia = havainne-editorin 1. Render()-vika (ei pelissä); NUI:n lämmitysruutu + sidonnan VIKA,
  tuntematon mallikomento → VIKA, paketit versioineen lokiin, VAROITUS jos eroaa rungosta.
- avoimet-v47 ämpärissä ja junassa (v44–v46 sisällä); v48 (pylväät 0,28 m) HYLÄTTY, ei vientiä (sali keksitty, 0,60 ≈ havainne 0,56).
- Kuja 02 jo lähteen leveydellä (4,2–5,3 m), ei faktakorjausta. Jingshanin törmäys: ei tarvita (ei pääse).
- Lautasen kultareuna: Codex 976 hyväksytty, kuitattu (47e8b17d4), aarteet799-v4 ämpärissä.
- Levy: NS/JU/VS siivosivat; 83 Gi. siirra_t7 vasta < 60 Gi (T7:n tila ensin). Swap ei ongelma.

## 3. ODOTTAA OMISTAJAA
- Ei mitään juuri nyt. Seuraavaksi KK:n kautta: aukio 03 + kujaportti -kolmikot, kujien levennys, pylväsvalo, lautaspöytä.

## 4. Opit (lokissa 11.33)
- Mittaluvun kohde tarkistetaan ennen faktakorjauksen tilausta (0,92 m sisälsi jalustan).
- LR-paketit jäivät viemättä v43:sta asti, koska PT-kuittaus puuttui → kuittaa jokainen valmis LR-paketti heti JU:lle.
