# Linssisepän luovutus 16.10.2026 klo 08.56 (KOVA RAJA 35 %, Postivahti)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/.
Tarkistus `zsh tyokalut/tarkista.sh`, testit `sh Linssit-testit/kaanna.sh` worktreessa (komento `</dev/null`).
Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, Valoseppä local_c238f4af-ae73-44e7-81f1-92848acd9217.
Simu iPad 00CF62C2 vain Julkaisijan SIMU NYT -vuorolla (A26BC7D0 on Valosepän). Taustaodottajat kuolevat nollauksessa → käynnistä uudelleen.

## 1. KESKEN A: ISS-TELAKOINNIN ALILUUPPI (juna 196 odottaa; Valosepän ISS-havainnekuvaluupin osa, Valoseppä antoi d1/d2 08.2x)
- Haara linssiseppa/telakointi-havainne-196 (worktree /Users/Shared/Claude/wt/proto-linssiseppa-telakointi, pohja Valosepän raketti-liekki-196 fda1ac8f3):
  5907a65d1 k1 (IssTelakka.shader, IssValopiste.shader, IssTelakkaValo.cs; RakettiMalli AsetaLahella 2 riviä, RakettiLaukaisu telakka-komento,
  IssMalli portin valot alfa 254 – Valoseppä tietää rivit), 51edfb52a k2 (heitin 1, auringossa ×0,3, kartio 18°, kulkuvalot isommiksi).
  Säädöt simulla: `linssi raketti telakka kaytossa 0|1 | paneeli | reuna | mli | hehku | heitin | aurinko | kantama | kulma | kenno | valotus | piste | pistekoko | pistemin | tila`.
- k1-ajo lokit/todistus-telakka1-ipad-20261016-0835 (kuva-arkki): auringossa heitin ylivalotti Harmonyn, kulkuvalot pikseleitä → k2.
- k2: L2-käännös → _tyo/linssiseppa/telakka2-app, lippu simu-telakka2.nyt. KÄYNNISTÄ ODOTTAJA (ensin `pgrep -fl ajo-telakka2`; jos lippu
  jo kulutettu eikä ajo käynnissä, pyydä Julkaisijalta SIMU NYT):
  `zsh /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/ajo-telakka2.zsh > …/ajo-telakka2.log 2>&1` (run_in_background).
  Skenaario sk-telakka2.txt (oleta-uusi; kaksi laukaisua: kello pois = aurinko 50°, +0.75; kuvat d1 +5/+9 s, d2 +1/+3 s, d2c VANHA valo telakka 0).
- Havainnekuvia d1/d2 EI vielä ole: Valoseppä tilaa Codexilta (TILAUS-LUONNOS _tyo/linssiseppa2/havainne9/, pelikulmat siellä).
  Kun ne tulevat, iteroi niitä kohti (kuvapari peli vs. havainne). Valmis → Valosepälle haara + rivit yhdistettäväksi (se omistaa luupin).
- Havainto: Telakointi-vaihe kestää lyhyessä lennossa (laukaise 0 auto) vain ~5 s.

## 2. KESKEN B: PEKING PELIPUOLI JUNAAN 197 (PT 08.4x; omistaja 08.2x, KK:n kirje posti/kk-codex-peking-palaute-20261016.md "Pelin puolella")
- Haara linssiseppa/peking-pelipuoli-197 (worktree /Users/Shared/Claude/wt/proto-linssiseppa-peking197, pohja Valosepän peking-ion-196 982b0b1f9):
  32fde9a45 k1 + 3568c2c64 k1b. PiiloValo.cs (vain piilokaupungissa; muut kaupungit ennallaan, globaalit nollassa):
  lähiutu 1,5–7 km (Ilmakeha.hlsl IlmLahiUtu, OmaMalli + IlmakehaLaatat), lämmin heijastusvalo (OmaMalli _OmaPomppu), taivasheijastus
  sileille katoille (_OmaLuotain, IlmTaivas, ei luotainkameraa), ionin peitto omien mallien alta (ortokamera kerros 31 → _IonPeitto,
  IlmakehaLaatat IonPeittoLeikkaa kaikissa 3 passissa, aukot ±15 m), omien mallien heittovarjot piilossa (OmatVarjot ← PiiloValo.VarjotNyt;
  NS kuittasi 09.0x: vain kehittäjäkoodin takana, simun GPU = Mac → vain 0/1-suhde). Säädöt `linssi opas piilovalo … | tila`.
  unity-tarkistus 0; Linssit-testejä EI ajettu tällä haaralla (aja ennen NS:lle vientiä).
- Vakiotesti: tyokalut/linssiseppa-ajot/peking-vakiotesti.zsh (klo 16.30, 5 kiinteää kulmaa ennen/jälkeen = piilovalo 0/1, varjot 0/1 ×2,
  parit.png peking-parit.py:llä). Odottaja ajo-peking1.zsh (lippu simu-peking1.nyt, app _tyo/linssiseppa/peking1-app, paketti
  _tyo/linssiseppa2/peking284/p344v4/ktx, loki lokit/linssiseppa-peking-vakio1). KÄYNNISTÄ UUDELLEEN kuten yllä.
- Julkaisija kuittasi vielä 32fde9a45:n; päivitys 3568c2c64 lähetetty 08.5x. TARKISTA appin kaannos.txt – jos 32fde9a4, pyydä uusi käännös.
- Ajon jälkeen: SIMU VAPAA Julkaisijalle; parit.png + ruutuaika (tapahtumat.txt piilovalo-rivit) → _valmiit/peking-pelipuoli-197-…/ (LUE.md);
  PT:lle rivi. Hyväksynnällä Linssit-testit → NS junaan 197.
- Kulmien koordinaatit arvioita (keskiakseli 116,3908 WGS84, Taihedian 39,9163); korjaa, jos kuvat osuvat ohi.

## 3. VALMIIT TÄSSÄ VUOROSSA
- praha197b OK (portit 196n 9–13 s → 2,4–3,9 s; Kaarlensilta 3,3 s ilman kattoa; Vyšehrad 7,1 s = aitoa latausta) → PT hyväksyi →
  portti-tasanne-197 90cb8733b NS:lle "junaan 197 (ei 196)". Kuvat _valmiit/praha-portti-197b-20261016/.
- Omistajan 07.51 KIPPI-ESILATAUS: linssiseppa/reitti-edella-196 b68e0351e (reittikamerat liukuvat pallon edellä, eivät koskaan seuraavan
  pysähdyksen yli; koko reitin esilatausta ei ollut koodissa), Linssit 1904/1904, L2 OK 08.14 → NS junaan 196 (PT tietää).
- telakka1-app poistettu.

## 4. AVOIMET (ennallaan edellisestä)
- Worktreet: kierrokset195 (todistusajo.sh, älä poista), korostusmaa ja kehysvari (poista kun juna 196 yhdistetty), puutomat191,
  porttitasanne (NS:llä junaan 197), reittiedella (NS:llä junaan 196), telakointi ja peking197 (työssä).
- MuseoKavelyTestit.JatkuvaSuurennus kaatuu jo Valosepän fda1ac8f3:ssa (kerrottu Valosepälle).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* checkoutissa eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261016-0856.md).
Ensin: käynnistä odottajat ajo-telakka2.zsh ja ajo-peking1.zsh (tarkista ensin pgrep ja lokit), sitten tulokset (kohdat 1 ja 2).
