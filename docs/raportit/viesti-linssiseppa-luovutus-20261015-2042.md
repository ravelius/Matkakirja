# Linssisepän luovutus 15.10.2026 klo 20.42 (KOVA RAJA 39 %, Postivahti)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/
(Julkaisija antaa käännöksen ja lipun `simu-<nimi>.nyt`). Tarkistus `zsh tyokalut/tarkista.sh` worktreessa (unity-tarkistus, pohjavahti,
kielivahti). Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
Valoseppä local_c238f4af-ae73-44e7-81f1-92848acd9217, SK local_72d15713-eb20-402b-95f7-87bdaaf91b74. Simu iPad 00CF62C2. Ei testejä junaan.
HUOM (PT 20.4x): VAIN EUROOPPA EI koske linssejä (ISS on linssi) – omistaja 28.9. ja 13.10.

## 1. KESKEN: SIMUAJOT ODOTTAVAT JULKAISIJAN KÄÄNNÖSTÄ (~21.05) – KÄYNNISTÄ UUDELLEEN HETI
Taustaskriptit kuolevat nollauksessa. Käännös: haara linssiseppa/kuvat-196 = 482e894a4 (yotaivas-196 22b433bf4 + NUI nimet-196 c7b7f7653,
EI junaan) → _tyo/linssiseppa/yotaivas-196-app, lippu simu-yotaivas6.nyt. Käynnistä kaksi taustaa (run_in_background):
  zsh proto-3d/tyokalut/linssiseppa-ajot/ajo-yotaivas196f.zsh > …/ajo-yotaivas196f.log 2>&1      (odottaa lippua)
  zsh proto-3d/tyokalut/linssiseppa-ajot/ajo-kohokohdat196.zsh > …/ajo-kohokohdat196.log 2>&1   (odottaa f-lokin "SIMU ALAS")
Jos lippu on jo olemassa, f alkaa heti. Kun kohokohdat päättyy → SIMU VAPAA Julkaisijalle (yksi vuoro, ~10 min).
- f (sk-yotaivas-196-f.txt, PT:n uusi kuvasarja): Pariisi yöllä (kohdevalikko oma + vrk 3): N1/N0 ikkuna nimet päällä/pois, V0/V1
  kohdevalikko auki NIMET-nappi, C1 Jupiter omin värein (Hubble, Iso punainen pilkku), C2 Pohjantähti (TYYPPI "Kolmoistähti" kirjoitettu
  loppuun, odota 14). Katso kuvat → yhdistelmät (nimet-paalla-vs-pois, valikko, skannerin-taivastila) PT:lle polkuna. PT kuittasi
  korjaukset 1, 2, 4; valot ok Euroopassa tähän kuvaan.
- kohokohdat (sk-kohokohdat-196.txt): K1/K2 revontulet Lappi (kohdevalikko hetki 1 + taivas lappi, laaja + `astro kyyti etsin tele`),
  K3/K4 Kiinan muuri (kohdevalikko kohde Peking + vrk 1, laaja + TELE). Kiinan muuria EI ole kohteissa eikä hetket.json:ssa. Jos komento
  epäonnistuu (katso ajo.log), korjaa skenaario ja aja uudelleen. Rajaa 3:2 → NUI:lle polku + tiedostonimet (NUI bd2285c04: kohokohdat.json
  "kuva" = tiedostonimi/osoite → Kuvat.Hae; NUI + Siirtoseppä vievät dataan). PT:n järjestys: kohokohdat ennen Black Marblea.

## 2. VALMIIT TÄNÄÄN (haara linssiseppa/yotaivas-196, worktree /Users/Shared/Claude/wt/proto-linssiseppa-yotaivas)
- 00415ef29 omistajan päätös 19.28: taivas mustana (KyydinLinnunrata musta taso), Linnunrata tähtijuovana (PCG3D-mikrotähdet), Pulu-väistö
  Cupolan nimille (Pulu.Ruudulla), skannerin taivastilassa kaikki nimet himmeiksi. Omistaja 19.55 "Kyllä, junaan 196".
- d1c29c4f3 yötaivas oletuksena päällä; 65a53dd40 juna-195 yhdistetty (IssSkanneri PiirraKulmat -ristiriita ratkaistu PK:n kanssa).
- 5449241b9 taivaskuvat pyöreällä pehmeällä reunalla (tyokalut/taivaskuva.py, ämpärissä); 124185350 NIMET-napin tila KupoliNimet.Piilossa
  (NUI:n nappi käyttää, testikomento astro kyyti nimipiilo); 5a606a633 skannerin taivastila kytkimen takana (AstronauttiKerros.TaivasSkanneri,
  oletus POIS, PT: omistaja ei ole nähnyt; testikomento astro kyyti taivasskanneri 1).
- 22b433bf4 taivaskuvat omin värein (LCD-sävytys pois, NUI:lle kerrottu), Jupiter → Hubble PD (ämpärissä 484dfd1400274cec.png).
  NS:LLÄ JUNAAN 196: 22b433bf4 (viimeksi annettu).
- 8686dcbf1 KOKO MAAILMAN TARKAT YÖVALOT (PT 20.4x, Brasilian neliövalot): tyokalut/yovalot-maailma.py → Black Marble 2016 500 m (NAS) →
  Web Mercator Z3 4096² valomaskatut tiilet, 30 kpl 12 Mt, ÄMPÄRISSÄ linssit/astronautin-kamera/iss-yovalot-maailma-v1/ (Julkaisija 31/31).
  Yokuori.cs PaivitaMaailma/HaeMaailma (2 paikkaa, Euroopan ulkopuolella), Yokuori.shader _ValotW0/1 + _MaailmaTiili0/1 (derivaatat ennen
  haaraa). Testikomento astro kyyti maailmavalot <juuri>|oletus|pois. unity-tarkistus 0; VARJOSTINKÄÄNNÖS EI VIELÄ TARKISTETTU.
  SEURAAVAKSI (kohokohtien jälkeen): käännös 8686dcbf1:stä (+ nimet-196 kuvahaaraan tarvittaessa), simukuva Euroopan ulkopuolelta yöllä
  (esim. kohdevalikko kohde Peking + vrk 3, tai Brasilia) ennen/jälkeen (maailmavalot pois/oletus) → PT; vasta sitten sha NS:lle junaan.

## 3. AVOIMET
- Pulun kesäyön opetuslause SK:lla omistajan hyväksyttävänä → kytkentä TaivasKohteet.AsemaVarjossaYlla.
- Revontulet skanneriin (Valosepän Revontulet.Havainto), taivaskohteet teleobjektiiviin.
- Kun omistaja kuittaa skannerin taivastilan → AstronauttiKerros.TaivasSkanneri = true (oletus) ja uusi sha NS:lle.
- Kohokohdat myöhemmin: auringonnousu, lentokoneet, keijut, pimennys, tähdenlennot, hurrikaani (NUI pyytää kuvat samaan tapaan).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* checkoutissa eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261015-2042.md).
Ensin kohta 1: käynnistä kaksi taustaskriptiä heti (odottavat Julkaisijan lippua simu-yotaivas6.nyt), sitten kuvat PT:lle ja NUI:lle.
