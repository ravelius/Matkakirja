# Pelikoodarin luovutus 25.10.2026 klo 10.00 (Postivahdin kova raja 35 %)

Edellinen: viesti-pelikoodari-luovutus-20261025-0901.md (lisäykset 09.45 asti). Tausta-v48, hyppysuoja ja GC kuitattu junaan 210;
varjokoe peruttu (Valoseppä); salikamera ja sisäkattoehdotus HYLÄTTY (PT 10.2x), haarat pelikoodari/sali-kamera 05ae0f8c6 ja
pelikoodari/sali-sisakatto-ehdotus 95f3ac452 talteen, ei junaan.

## KESKEN: lautaspöydän pelikuva omistajalle (PT 10.3x, palautettu 11.1x)

PT:n tilaus: kuvapari kupla #949 | pelin pöytä länsiväylällä keisarin lähestyessä + yksi kuva rikkoutumisesta, rungosta a28be3c7e,
iPadin ruutu, ei tekstiä. Tarkista itse: tumma puu, kolme matalaa pinoa, kontakti, sirpaleet. Pari PT:lle → PT vie omistajalle.

- Kupla #949: /Users/Shared/Claude/wt/fable-posti-0945/posti/codex-fable-muistokupla4-lautaspoyta-20261025/04-lautaspino.jpg
- Ensimmäinen pari (04b, a28be3c7e): proto-3d/lokit/lautaspoyta-04-pari-20261025/ (pari-kupla949-lahestyy.jpg, -rikki.jpg;
  koostaja scratchpadissa: PIL, korkeus 1200, kupla vasemmalle, 16 px musta väli). PT 11.1x HYLKÄSI:
  1) pöydällä "yksi korkea pino" → kolme matalaa (syy: pöytä on pitkittäin, takaa matalalta pinot osuvat päällekkäin; 04a lp-6
     ylempää näyttää kolme pinoa), 2) toinen pöytä seinän vieressä = tupla, 3) kuva pelin kameralla (810), ei matalalta.
- Tupla: lautaspoyta on RikkoMallit-arvonnassa → arvottu väistöeste lähtökujan kääntöön. Korjaus proto-haarassa
  pelikoodari/lautaspoyta-yksi dda5bdcc6 (a28be3c7e + ArvoVaistot pois-lista, sokkelossa JuoksuV4Reitti.RekvisiittaIdt; testi
  JuoksuArvontaTestit läpi). Worktree /Users/Shared/Claude/wt/proto-pelikoodari-sali-kamera on nyt tällä haaralla.
- Kamera: kuvat OVAT pelikamerasta (JuoksupeliV4Kamera); länsiväylällä seinän räystään alla kamera laskee ~2,4 m:iin. Siksi 04c:
  lähestymiskuva itäväylältä (z26, kamera ylempänä), sitten `ui juoksupeli kaista` → törmäys länsiväylän pöytään (v0 z30).
- SEURAAVA ASKEL: JU:lta pyydetty ESIKATSELU NYT (jonossa 10.00, molemmat linjat varattuina):
  `zsh /Users/Shared/Claude/wt/proto-pelikoodari-sali-kamera/tyokalut/esikatselu.sh pelikoodari/lautaspoyta-yksi
  /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lautaspoyta-04/skenaariot/sk-lautaspoyta-04c.txt` (taustalle, ~3 min).
  Tarkista: lokissa "rikkoi kulttuuriaarteen lautaspoyta … v0 z30", vain YKSI pöytä kuvassa, kolme pinoa erottuvat, kamera ylhäällä.
  Jos z26-kuvassa kamera on matala, ota kuvat ilman väylänvaihtoa ennen pöytää (04a lp-6:n hetki s ≈ 29, kamera 6,5 m / 34°).
  Kokoa parit samoin, vie PT:lle 3 rivillä (polut), vapauta linja JU:lle.
- Skenaariot: proto-3d/_tyo/pelikoodari/lautaspoyta-04/skenaariot/sk-lautaspoyta-04{a,b,c}.txt. Ajot: esikatselu-20261025-0948 (04a),
  -0953 (04b). Reitti: `palatsi alku -147.5,420` + `maali -139,480`, siemen 11 → etelään, itään, käännös vasen z20 lähtökujalle
  pohjoiseen (x ≈ −138,5), pöytä z30. Botti ei vaihda väylää kujan solmuissa (KaantoIkkunassa) → kaista käsin.
- NUI:lle ja LR:lle välitetty PT:n huomio (räystäiden vihreä alapinta, tiilenpäät kiekkoina lähikujalla) 10.00.

## Avoimet
- Tuplapöytäkorjaus dda5bdcc6 tarvitsee junaan pääsyn PT:n kuittauksella (pari ensin).
- 10.0x: JU antoi ESIKATSELU NYT ajolle 04c (L2 vapautui 10.00; esikatselu.sh käyttää linjan 1 lukkoa ja odottaa sitä itse, NUI L1:llä).
  Ajoa EI käynnistetty ennen nollausta (nollaus katkaisi edellisen taustaajon 09.04). Aloita heti ja kerro JU:lle.
- 10.0x KORJAUS: JU perui vuoron (VS ehti L2:lle). Odota JU:n seuraavaa ESIKATSELU NYT -viestiä ennen 04c:tä.
- 10.11 JONOSSA lautaspöydän jälkeen (PT 10.1x, Raamattu 2.177 PALATSIN MITTAKAAVA): palatsi skaalataan yhdellä kertoimella (NUI hakee).
  Valmistele lista: mitkä PK:n osat seuraavat kerrointa (pk2-reitit, rasteri, kameran etäisyydet, taustan leivonta/atlas, esteiden paikat)
  ja miten skaalataan kerralla. EI toteutusta ennen kerrointa.
- 10.1x LR tiedoksi: räystäät/tiilenpäät korjattu avoimet-v46 df879721a (muoto-210 2890d422f).
- 10.5x: 04c (esikatselu-20261025-1032) PT:n käskystä: kaista myöhästyi (z31 > pöytä z30) → ei rikkoa. Kuvassa YHÄ KAKSI pöytää: syy ei arvonta
  vaan LisaaRekvisiitat lisäsi pöydän myös risteyksen poikkikujalle (länteen salin ovelle). Korjaus e806ef4bd (Rekvisiitat + kujan suunta, KujanSuuntainen,
  testit 107/107). Ajo 04d (sk-lautaspoyta-04d.txt: aika seis kuvan ajaksi, kaista ennen jatkoa) taustalla, JU:lle kerrottu.
- Mittakaavalista valmis: docs/raportit/pelikoodari-palatsin-mittakaava-20261025.md (f64aa2bb8); lähetetään PT:lle lautaspöytäparin kanssa.
- 10.5x VALMIS PT:lle: pari 04e proto-3d/lokit/lautaspoyta-04e-pari-20261025/ (pari-kupla949-lahestyy.jpg, -rikki.jpg), ajo esikatselu-20261025-1046,
  haara pelikoodari/lautaspoyta-yksi e806ef4bd (paikallinen proto-haara). Lähestyy: YKSI pöytä, tumma puu, kolme matalaa pinoa pitkittäin, kamera 7,2 m / 41°
  (itäväylä, kaista z26). Huomiot: lähestymiskuvassa lattia tasaisen harmaa (ei laattoja; 04c sama, 04d/04a laatat) — selvitettävä, jos PT haluaa;
  rikki: kontakti ja sirpaleet näkyvät, mutta kamera matala 3,1 m / 13° (pelikamera länsiväylän räystään alla) ja sirpaleet näyttävät suurilta
  (SirpaleSkaalat paisuttaa pieniä paloja). 04d (jäädytys ennen kuvaa) zoomasi kameran → hylätty.
