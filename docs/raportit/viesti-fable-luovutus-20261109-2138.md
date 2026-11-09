# PT:n luovutus 9.11.2026 klo 21.38 (PT local_8d8ebf72; konteksti 30 %)

Korvaa -1800:n JUNA-, AJOSSA- ja LOKI-kohdat; -1400:n LINJAT ja -1005:n TILINVAIHTO/OPIT voimassa.
ENSIN: set_remote_control self true. Vahdit (30 min, uusi joka vanhenemisella): Monitor `python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py`,
`sh /Users/Shared/Claude/hooks/codex-posti-vahti.sh` ja postilaatikko (git ls-remote origin claude/postilaatikko minuutin välein).
Omistaja poissa studiolta (iPhone käytössä): ei iPad-avauksia. Junarivit vain tools/asemataulu/juna.py:llä, työlista tyolista.py:llä.

## JUNAT
- 223 LUKITTU, TF 224 testaajilla. 224 AUKI = b804a87d6 (natiivi-backup julkaisija/juna-224), testit vihreät. LUKITUS JA TF VAIN OMISTAJAN PYYNNÖSTÄ
  (ei PT:n käskystä; JU tietää). Mukana: Lontoo-Pulu v4, Pariisin nimiäänet eb4318b15, luennat v9 f043860b7 + 6cd7efcdc + 6a27206b2 + 7cf4f1f10
  (Kensington uudelleenavaus), KS nostot 9be5c8e2e (ND ei sieppaa, SC kiinteä kierto; tarkistettu yhdistettynä 39204416d:llä), pelitila 774e61032,
  NUI Temple-tähti + kuvaotsikko 0e4db4471 (omistaja 19.06 Kelpaa), NS huippunimet 68ee7187e, PK drone-lahelle 7227a9788 (vasen tappi 5× lähemmäs,
  tähtäin viipyy 2,5 s, kierto tähtäimen ympäri; omistaja 21.03 + 21.11).
- Asennuslinkki (MK kehitys) = 7227a9788. Omistaja testaa iPhonella; palaute KK:n kautta → PK korjaa samaan haaraan pelikoodari/drone-lahelle.
  HUOM: drone-kuvat olivat Mac-esikatselu ILMAN talot-kansiota – lähikuviin aina talot-kansio.
- Lisämuisti: odottaa omistajan Xcode-tiliä (19.1x "Ei nyt"; KK muistuttaa).

## PELIN KOKO (omistaja 21.14; KK:n suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261109-pelin-koko.md) – JAETTU 21.5x
- Osa 1 siivous: JU (KS vahvistaa poistolistan). Osa 2 talot palvelimelle: KS vetää, NS lukija, JU vienti, NUI Offline-kartat. Rinnakkain.
- PT:n linjaukset: talot ämpäriin (korvaa 7.11. "talot sovellukseen"); ISS:n kuvat sisältöä → palvelimelle osassa 3, valmiiksi taustalla;
  ODbL: OSM-tunnustus näkyviin pelissä ja jakosivulla ennen ensimmäistä vientiä (KS). Vienti vain versioituihin polkuihin. Osat 3–4 NS:lle myöhemmin.
- Vaiheriviit (ladattava/asennettu/päivitys ennen-jälkeen) KK:lle; pienen iPadin tallenne osan 2 jälkeen, kun omistaja studiolla.

## KOKEET
- VS FPV-vuoret: omistaja 19.46 maalaus pois, 20.05 it. 13 0809231b9 (oranssi + valokuvio) Kelpaa, jää kokeeseen. Maalaus talteen fpv-vuoret-maalaus-it12.
  VS lepää; filmi 22e601e76 odottaa Pariisi-korttia.
- NS kattokuvio 59f2443f3: kuvio näkymätön → PT päätti rivit 2–3 m + vahvempi patina, lähietäisyys ~320 m (drone), talot-kansio. NYT TAUOLLA
  pelin koon ajan (ellei iteraatio jo ajossa).

## MUUT
- Temple: CDN näytti 31.10. torikuvaa; PT valitsi torikuvan -v2 + uuden vaatetoritekstin (PR 6521, sisältö v1032), omistajan 19.06 mukainen.
- Työlistalla vanhentuneet rivit käyty 20.0x–21.3x (intro, kumpu, kyltit, häivytys valmiiksi; muut tilanne).
- Lepäävät: LAV (ovipaikat), VS, PK (palautetta odottaen).

## LOKI (kirjaa seuraavassa loki-PR:ssä; 14.07–19.46 jo PR 6522)
20.05 FPV it. 13 kelpaa (koe); 20.44 iPhonelle versio kahdella tapilla; 21.03 vasemmalla tapilla lähemmäs; 21.11 tähtäin viipyy + kierto tähtäimen ympäri;
21.14 pelin koko: Kyllä, suunnittele.
