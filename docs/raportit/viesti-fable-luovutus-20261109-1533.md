# PT:n luovutus 9.11.2026 klo 15.33 (PT local_8d8ebf72; konteksti 29 %, pehmeä raja 30)

Korvaa -1400:n JUNA-, AJOSSA-, LOKI- ja PAIKALLISET-kohdat; -1400:n LINJAT ja -1005:n TILINVAIHTO/OPIT voimassa.
ENSIN: set_remote_control self true. Vahdit (30 min, uusi joka vanhenemisella): Monitor `python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py`,
`sh /Users/Shared/Claude/hooks/codex-posti-vahti.sh` ja postilaatikko (git ls-remote origin claude/postilaatikko minuutin välein).
Sisältökirjurin sessio local_b9ca71c7 on PÄÄTTYNYT (viesti ei mene) → Pulun pistokokeet Sonnet-agentilla (Agent model sonnet).

## JUNA 223 AUKI, kärki 6a2f044b7 (ei julkaisua ennen omistajan pyyntöä)
Tällä vuorolla: 108246c2f = c11314ade + kohokartan aurinko cd74573cd (OMISTAJA 14.12); 6a2f044b7 = + PK napit-kuulto 620425fb7 (+1e88eda16 tappi ei syki
kamera-ajossa). Testit vihreät (Kartta 729, Linssit 2276, Peli 882). PIENI iPAD = 6a2f044b7 (14.57), KK:lle kerrottu.

## AJOSSA (kuvat PT:lle ennen KK:ta)
- NOSTOKORJAUKSET = yksi kokonaisuus KK:lle → junaan → pieni iPad (OMISTAJA kysyi 15.2x, KK vastasi "ei vielä"): paikkapalkki + p-5a NS fb77e12b1
  (PT katsoi, NS: p-5a terävä, yksi laattasauma jatkokohta), maisemakaari 7a560e725, palkki aina NUI natiivi-ui/palkki-aina ed65f5b34 (4 kokoa PT
  katsoi, arkki lokit/nui-palkki-aina-3-ipad-ed65f5b34/). PUUTTUU: OMISTAJA 15.23 "jos pelaaja klikkaa nostosta pois kartalle ja nosto pienenee
  yläreunaan niin kartan orbit pitää jatkua" → NUI tekee ed65f5b34:n päälle (skenaario 2 kuvaa) → PT → koko kokonaisuus KK:lle + JU junaan + pieni iPad.
  Avoimet pienet (NUI ottaa mukaan jos pieniä): palkissa ei selausta/kaupunkinimeä nähtävyyden aikana; laskuri 1/4 vs 2/4.
- SAUVA/PULU: PK tappi-kierto (keskikohde) korjattu 8841fd32f + pulu-lähteet 35b47ea3e → JU-ajot → uusi PK katsoo → junarivi PT:lle. 35b47ea3e EI junaan ennen.
- PULUN KAUPUNKI/MAA-ERÄ (OMISTAJA 13.51): 2 pistokoetta (10/30 → 7/30), korjaukset 199 + 113 lausetta, v3 PK 1e8360ecc
  /Users/Shared/Claude/proto-3d/_valmiit/pulu-kaupungit-maat-vienti-20261109-3 → JU:lle vienti annettu (tarkistus: ämpärin nykyiset = PK:n pohja 14.0x,
  muuten ei vientiä). Odota JU:n riviä → KK:lle lyhyesti (108 kohtaa × 5 + linkit, LIE+MCO uusina).
- FPV (KOE, ei junaan; KK:lla kuvat 15.0x): OMISTAJA 14.59 vihreät suositellut paikat pallolle (NUI, palkin jälkeen) ja huiput vähemmän teräviksi +
  15.03 "vuoria tuunata lähietäisyydeltä": NS k15 → k2 541089e8a (suositus), liuku c8963e7eb JU:lla (DZ); PT vaati parin SAMASTA kamerasta (k15|k2|k2+liuku)
  ennen KK:ta. VS lumi/kallio/kasvillisuus 7ebd3e7c0, 3. iteraatio seuraajalla (luovutus c50ab2a4a). NS merikallio iPadille e0e61df24 JU:lla.
  Codexin merikalliodrone ba5e33ec3 kuitattu e123c0b10.
- NS huippunimet: 31b609027 ei kelpaa (nimet kasvavat), korjaus 1f89f4f0d JU:lla → parit PT.
- VS kevyt filmi 22e601e76: iso iPad +26…+37 Mt (ennen +288/+450), huippu 3960 < 4080 → koe valmis, odottaa omistajan Pariisi-korttia. LÖYDÖS: Pariisin kartta
  ylittää 4080 Mt jo ilman filmiä Pariisiin lennettäessä (rivi Pariisin muistin kevennys).
- KS: Lontoon palat ilman puita valmiina aineistona (palat-d7-kumpu-oikea-eipuut, PT katsoi); bussit+taksit OMISTAJA 14.07 kaikki 4 sellaisinaan, Routemaster v2
  PERUTTU (eebfd7d85). Kytkentä vasta Pariisin elämän kuittauksen jälkeen → KS lepää (TYHJÄKÄYNTI-rivit: syy tämä).
- LAV lepo (muuri valmis ja junassa, ovet odottavat PK:n ovipaikkoja). JU nollautuu (GO annettu 15.1x, luovutus 991b841e2), Postivahti aloittaa.

## LOKI (kirjaa seuraavassa loki-PR:ssä, -1400:n LOKI-kohdan lisäksi)
14.07 Lontoon bussit+taksit kelpaavat sellaisinaan (Routemaster v2 peruttu, KK 14.08); 14.12 kohokartan aurinko kelpaa → juna 223; KK nollautui 14.12;
14.34 vuoret lennoilla "Ei, kuten nyt" (koe pois); 14.59 FPV vihreät pisteet + huiput + sukellusvene ideaksi; 15.03 vuoret lähietäisyydeltä;
15.23 orbit jatkuu nostosta kartalle klikatessa.

## PAIKALLISET
PT:n checkout main (b2634dfd4). Peilin tyolista.json/osoitteet.md-erot paikallisesti; scratchpad/pt-loki-odottaa.txt = lokin muistilista.
