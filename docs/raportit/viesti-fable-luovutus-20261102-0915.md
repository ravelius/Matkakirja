# PT:n luovutus 2.11.2026 klo 09.15

Edellinen: viesti-fable-luovutus-20261102-0740.md (säännöt voimassa). Osoitteet: /Users/Shared/Claude/osoitekirja.md.
Syy: konteksti 26 % (pehmeä raja; luonteva tauko suunnitelman jaon jälkeen). `date` ennen aikaleimoja.

## OMISTAJAN PÄÄTÖKSET 2.11. (lokissa; Raamattu)
- 08.14 kyltit kiinteinä → b7b45fef0 junassa 218. 08.17 veneet Seinellä kokeiluna. 08.22 vieritys, nipistys, Temple-tornin nosto,
  Karikatyyrikartta-kytkin, suoristus. 08.31 kadonneet ihmeet leikkeinä + ★ + kytkin (loki 9f5ceb12d). 08.40 piirroskaupunki korvaa
  nähtävyyskartan (9b126b426). 08.42 nykyrakennuksen paikalla vain toinen ★-kyltti + nostoruutu (2f5cdcac9). 08.44 kortit + 08.45 zoom
  aina keskustaan → RAAMATTU 2.204 (30d8a2570, 8f393bb9b, cd5817b73; 2.137/2.140 vain piirroksettomille). 08.47 → RAAMATTU 7.48
  ISOT MUUTOSPYYNNÖT: KK SUUNNITTELEE ENSIN (56f6b0aab). 09.12 uuden pelin aloituslento → yleisnäkymä → erillinen zoom keskustaan.
- KK:n 7.48-suunnitelma: scratchpad/keskustelukanava/suunnitelmat/20261102-pariisi-piirroskaupunki.md (osat A–I). JAETTU 09.1x:
  NUI A → B → D → F → E → G → C → H; KS C, G, myöhemmin I.

## JUNAT
- TF 217 testaajilla. Juna 218 runko e8f948102 (NS): + eunukit f691d2e2d, palatsin LOD a70ef8f41, Pariisin kyltit b7b45fef0,
  pariovet alkulennossa 4a2a0658f. Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA".
- Asemataulu: junat 216/217 muutettu TF-riveiksi (tarkistin: Juna N -tilaan ei "valmis/TestFlight", aika ≤ 20, edistys ≤ 5);
  aja AINA `python3 -I scratchpad/asemataulu/tarkista-junat.py --kansio scratchpad/asemataulu/data/talo` ennen vientipyyntöä.

## ROOLIT (kaikki tuoreita aloitusviesteineen)
- NUI (local_43962c89, nollattu 09.0x): jono yllä; haarat piirros-eleet-218 (nipistyskorjaus 629ff9da9 simuamatta) ja
  piirros-tahti-218 8ee9492b9 (tähti, kytkimet, suoristus, leikekerros) → simutodistus PT:lle → NS.
- KS (local_740947d7, nollattu 09.0x): Codexin 5 leikettä (e2060d21b) ja kioski+info (4757f6a5d, paikka Hôtel de Ville 3b537739e)
  → vertailukuvat PT:lle → KK. Veneettömät Seine-palat viety (JU 08.56, TasoVersio veneet-20261102; vaihto samaan junaan NUI:n veneiden kanssa).
- PK (local_91a1bc27): pariovet valmiit; seuraavaksi bugi 2 ristikko-ovi LAV:n kanssa ja 214-reitin leveydet.
- LAV (local_16f6f272, nollattu 09.1x): 214 Yangxindian n-v1 mallinnettu (pari n-v1/pari-*.jpg); ulkokuori tarkistettava hyväksyttyä
  julkisivua vasten, muuten entinen; pinnat, leivonta; reitti valtaistuimen länsipuolelta (PT hyväksyi).
- NS (local_99130238): rungon ylläpito; PT:n kuittaamat SHA:t. JU: viennit.

## Säännöt, jotka opin
- Ennen JU-kuittausta katso pari itse; KS:n polut voivat olla lyhennettyjä → pyydä täysi polku.
- Roolin luovutus-PR voi saada lisäyksen mergen jälkeen (NUI ca18a36c6) → tarkista mainista ja täydennä aloitusviestiin.
- SendMessage-raja 10 → varakanava mcp__ccd_session_mgmt__send_message (toimii).
