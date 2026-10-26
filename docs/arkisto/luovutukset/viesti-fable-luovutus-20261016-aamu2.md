# Päätoimittajan luovutus 16.10.2026 klo 06.0x (konteksti 29 %; tili vvi@vvi.fi)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589. Id:t /Users/Shared/Claude/osoitekirja.md. Asemataulu https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm; talo/junat v38 ja talo/tyolista v10 (PT vie itse, paikalliset kopiot scratchpad/asemataulu/data/talo/).

## 0. Heti aluksi
RC päälle, odottajavahti-Monitor, get_usage self. KK on odottanut omistajaa klo 00.46 lähtien; PT:n viestit KK:lle ovat jonossa (alla kohta 2). Levy 52 Gi (siivous 04.43, ks. kohta 3). Asemataulun mittarit seis 01.58 (hoitaja odottaa KK:n riviä); Postivahtia pyydetty lopettamaan muistutukset KK:lle ennen omistajan vastausta.

## 1. JUNA 196: OMISTAJA PYYSI JULKAISUA klo 00.31 (ehdollinen, "Ei testejä")
Runko 196 = 0206fca97 VIHREÄ (testit 1904/590/495). Lukitus vain PT:n "LUKITSE 196" Natiivisepälle, kun lista kuitattu.
Tämän vuoron kuittaukset NS:lle (kaikki rungossa): vareily-196 fe5046c27 ⊃ iss-efektit (kytkimet false), kerros28-196 2d99623a5, NUI nimet-196 14c98baa5 + aloitus-195 bb85d1808 (IssKohokohdat, Sijaintipallo.KulmaIso, IsoisanUni = false), PK taidemuseo-196 87abe30c3 (TaukoVapauttaa TRUE = omistajan 00.17 suora pyyntö; KavelyV2 + AutoZoom false), LS1 korostus-pieni-196 a620885a9, kelaus-196 9fee43b2d + kelaus-esihaku 6458eb0fb, kelaus-rajaus-196 ca8aad04e, peking-ion-196 343666486 + testikorjaus 982b0b1f9, LS1 kehys-lahdekuva-196 dfca09fa7 (museokehykset taas puuta, vika junasta 189; Orsay-otto orsay-rf-2027b).
EHDOLLINEN: PK maxq-jaatyminen-196 bdeb1bceb (Esilataajan tiedosto-operaatiot taustasäikeeseen) → PK vie NS:lle itse, kun L2-ajo ok.
AUKI ☐ (kaikki odottavat omistajan korttia KK:ssa, paitsi neliöt):
- ISS-efektit: raketti v5b -video (väreily) + salamat/perseidit/auringonnousu-videot → kortti "Kytketäänkö raketin väreily päälle?".
- 9 kortin kohokohdat: kuvat KK:lla 02.2x.
- Minipallo: kuvat + kortti "Kytketäänkö minipallo päälle junaan 196?" (04.3x); "Kuva tarkentuu…" on valmis ja aina päällä (ei kytkintä).
- Taidemuseo: video 5c4a2265a + kortti "Kytketäänkö uusi kävely ja Auto Zoom päälle?" (04.5x; Kuuntele/tauko jo päällä).
- Reitin esilataus: kortti KIPPI-ESILATAUS (suositus "seuraavaan pysähdykseen asti").
- Peruskartan neliöt: KS b8167585d odottaa Julkaisijan maastovientiä (2,26 milj. laattaa, lataus 05.00 →, arvio valmis ~08.00) → KS vie NS:lle Julkaisijan kuittauksen jälkeen (PT:n kuittaus annettu).
- Intro-fps: hyväksytään koodina (simulla ei mitattavissa).
Kun omistaja vastaa: välitä kytkinpäätökset NS:lle (true/false), päivitä ☐ → ☑, ja kun kaikki ☑ → LUKITSE 196.

## 2. Omistajalle jonossa KK:ssa (PT:n viestit 03.5x–06.0x)
Raketti v5b + korjaus (väreily kytkimen takana), minipallo-kortti + "Kuva tarkentuu" -kuva, taidemuseo-kortti + tarkennus (vain kävely + Auto Zoom), LOUVRE-kortti "Otetaanko Louvren oma malli Pariisin kierrokselle Googlen tilalle (seuraavaan junaan)?" (kuva _tyo/linssiseppa2/louvre1/louvre-v2f-k31s-pari-kulmaB.jpg, suositus kyllä). Aiemmat: PULU-MERET-2, KIPPI-ESILATAUS, ISS-efektivideot, kohokohtakuvat.

## 3. Muuta tältä vuorolta
- Levy: L2 kaatui 04.41 (24 Gt) → Postivahdin kierros: roolit poistivat omat .app-kopiot ja yhdistetyt worktreet → 50–53 Gi. Äänittäjän pulu-merivastaukset 572M + venv 923M jätetty; Julkaisijan unity67/175-proto-worktreet jätetty (ei mainissa).
- Valoseppä "simut kadonneet" = väärä komento: simut ovat T7-sarjassa, `zsh proto-3d/tyokalut/simusarja.sh simctl list devices` (pelkkä xcrun simctl näyttää tyhjän sisäisen sarjan).
- Pelikoodarin vuoro pysäytetty 05.3x (41 %, ei luovuttanut 12 min) → luovutti c1a0f9981/25b291458; luovutukseen korjattu "05.29 keskeytys = PT, ei omistaja; ajot sallittu". HUOM PK:n luovutukset ovat haarassa pelikoodari-luovutus-20261014-paiva (ei mainissa; haarassa myös .claude/settings.local.json → PT ei mergeä).
- Nollattu tällä vuorolla (Postivahti): Valoseppä ×2 (ddd129351, 32c780eac), Linssiseppä (8d79b85d1), Natiivi-UI (7b893b372), Pelikoodari (25b291458).
- Peking p344v4 viety ämpäriin 06.00 (Julkaisija, CDN 200); Codex-posti: reunaverho + saumat (f99d9bbac), V4-hyväksyntä (e81e898fe). Ion-malli 5–16 m oman pinnan yläpuolella = Codexin korjattava.
- Äänittäjä: Ranskan 51 kertomusta Whisper-tarkistettu (ka 0,845); vain orsay-rf-2027 uusittu (2027b, Lautrec yhä "Lothric" Whisperissä).
- Työlista: "Kaikki maat ja pääkaupungit" ja "Aarretehtävät" tilanteet päivitetty (pääkaupunkitekstit 93 kytketty, esittelyt valmiit, Kreeta valmis).

## 4. Roolit nyt
- Natiiviseppä: odottaa seuraavia / LUKITSE 196.
- Valoseppä: S2-esihaun nopeutus (kelaus 10,5 s → < 4 s) omana haarana; Peking p344v4 lennot + Ion-korkeudet Codexille; ISS-efektien laatukierrokset (tulivuoret EI, perseidit/hurrikaani/vanat LÄHES).
- Linnanrakentaja: Louvre hienosäätö (kiveyksen kuluma, Sullyn kupoli, valo/varjot Valosepän kanssa).
- Linssiseppä: Lontoon kierrosajo kuormattomana (tai Praha/Ateena); portin pito -korjaus vain jos sumeus näkyy.
- Natiivi-UI: aloitusvihjeet iPhone vaaka (kortit hipovat) + iPad (ruudun ulkopuolella), kytkin pois → kuvat PT:lle → omistajalle.
- Pelikoodari: maxq-jaatyminen-196 L2 → NS; muuten jono tyhjä (työlistan PK-rivit tehty, kappaleet odottavat omistajan soittolistavalintaa).
- Karttaseppä: odottaa Julkaisijan maastovientiä (~08.00) → b8167585d NS:lle; hionnan osa valmis.
- Julkaisija: maastovienti 2026-10-16-maailma (~08.00).
- Lepäävät (syy): Siirtoseppä, Sisältökirjuri, Äänittäjä (PULU-MERET-2); Sisältökirjurilla ei konkreettista tekstierää.
