# Lontoo-pilotin pysähdykset (Linssiseppä 5.10.2026, kertojatekstin pohjaksi)

Omistajan linja 11.45: kaikki Lontoon data Cesium ionista (World Terrain 1, Bing Maps Aerial 2, OSM Buildings 96188).
Esikatselu CesiumJS 1.146:lla (arviointitoken vain esikatseluun), 1180 × 820 ≈ iPad Air vaaka, rakennukset yhdellä
pergamenttisävyllä. Kuvat: `proto-3d/lokit/linssiseppa-lontoo-tutkimus-20261005/lontoo-pysahdykset-kooste.png` ja
`pysahdykset/<n>-<kohde>.png`, mitat `pysahdykset/pysahdykset.json`. Työkalu `proto-3d/tyokalut/linssiseppa-ajot/lontoo-koe/`
(`KUVA=bing node stillit.mjs`, kehystys `index.html`:n kohteet-taulukossa).

Seitsemän pysähdystä: suunnitelman Charing Cross ja Reform Club yhdistettiin (400 m toisistaan; omana pysähdyksenä Pall Mallin
klubit ovat tunnistamattomia LOD1-laatikoita, yhdessä kuvassa näkyvät Trafalgar Square, Charing Cross ja Pall Mallin alku).

Kamera: katsesuunta asteina pohjoisesta (0 = katsoo pohjoiseen), kallistus alaspäin, etäisyys kohteeseen; kohde on maaston
korkeus + nosto (rakennuksen keskikorkeus). Kameran korkeus on maanpinnasta.

| # | Kohde | Kohde lat, lon | Kamera lat, lon | Korkeus | Katse / kallistus / etäisyys | Lähestyminen + pysähdys | Kuvassa näkyy |
|---|---|---|---|---|---|---|---|
| 1 | Greenwich: Royal Observatory, nollameridiaani, Old Royal Naval College | 51.4800, −0.0035 | 51.4880, −0.0024 | 345 m | 185° (etelään) / −20° / 950 m | alku 6 s + 22 s | Greenwich Park, Queen's House ja laivastokoulu edessä, observatorio mäellä |
| 2 | Tower of London ja Tower Bridge | 51.5068, −0.0760 | 51.5021, −0.0813 | 305 m | 35° (koilliseen) / −24° / 700 m | 14 s (5,5 km) + 24 s | Tower Bridge torneineen, Towerin muurit, Thames, City taustalla |
| 3 | St Paul's Cathedral | 51.5138, −0.0984 | 51.5106, −0.1008 | 251 m | 25° / −28° / 450 m | 9 s + 22 s | kupoli ja länsitornit keskellä, City ympärillä (kiertävä kamera sopii) |
| 4 | Somerset House ja Victoria Embankment (1860-l.) | 51.5106, −0.1172 | 51.5060, −0.1166 | 221 m | 355° (pohjoiseen joelta) / −22° / 550 m | 9 s + 20 s | Waterloo Bridge, Somerset Housen jokijulkisivu, Embankmentin rantamuuri |
| 5 | Charing Cross, Trafalgar Square ja Pall Mall (Reform Club) | 51.5072, −0.1290 | 51.5054, −0.1370 | 279 m | 70° (itään Pall Mallia pitkin) / −24° / 650 m | 8 s + 26 s | Trafalgar Square, Charing Crossin asema ja Hungerford Bridge, Pall Mallin klubikorttelit etualalla |
| 6 | Westminster: parlamenttitalo, Big Ben, Westminster Abbey | 51.4997, −0.1250 | 51.5001, −0.1180 | 208 m | 265° (länteen joen yli) / −20° / 520 m | 8 s + 24 s | parlamenttitalon jokijulkisivu, Big Ben sillan vieressä, Victoria Tower, Abbey takana |
| 7 | Buckingham Palace (loppu, kamera nousee) | 51.5014, −0.1419 | 51.5024, −0.1358 | 210 m | 255° (länteen The Mallia pitkin) / −24° / 480 m | 8 s + 20 s + nousu 6 s | Victoria Memorial, palatsin julkisivu, St James's Park ja Green Park |

**Kesto:** lennot ~55 s + pysähdykset ~158 s + alku ja nousu 12 s ≈ **3 min 45 s**. Kertojalle 2–4 lausetta per pysähdys
(20–26 s ≈ 45–60 sanaa suomeksi); pysähdys venyy äänen mittaiseksi (linnan jaksomalli), joten pidempi teksti ei riko rataa.
Lähestymisten aikana ei puhetta tai vain siirtymälause (laatat latautuvat silloin; kertoja odottaa kameraa).

**Havaintoja kertojalle (kuvan perusteella, ei kaanonia):** Tower Bridgeä ei ollut 1873 (valmis 1894); Embankment oli
1873 vasta muutaman vuoden vanha; Charing Crossin asemalta Fogg lähti; Westminsterin kuvassa Big Ben (Elizabeth Tower) näkyy oikealla sillan
vieressä, Victoria Tower vasemmalla ja Westminster Abbey keskellä takana; taustalla jo Buckingham ja St James's Park (loppukohde).

**Bingin ehdot (Karttaseppä):** Lontoo-näkymässä ei omaa S2-palloa eikä pergamenttikarttaa samassa kuvassa → siirtymä
pallolta häivytyksenä; Bingin logo ja tekijätiedot ruudulle. Rakennusten yksi sävy ei ole kartta, joten se sopii ehtoihin
(**EPÄVARMA**, Karttaseppä tarkistaa).
