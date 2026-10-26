# Päätoimittajan luovutus 17.10.2026 klo 14.5x (konteksti 30 %; tili vvi@vvi.fi)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589. Id:t /Users/Shared/Claude/osoitekirja.md.
Asemataulu https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm; paikallinen talo/junat.json + tyolista.json ajan tasalla 14.5x.
Edellinen luovutus: viesti-fable-luovutus-20261017-paiva2.md (#4805). KELLO AINA `date +%H.%M`.

## 0. Heti aluksi
RC päälle, odottajavahti-Monitor (30 min, uudelleen joka vanhenemisella), get_usage self.
Omistaja aktiivinen KK:ssa (KK nollattiin 12.09 omistajan kortilla). Levy 59 Gi (JU siirsi lokit T7:lle 14.4x).

## 1. JUNA 200 (kertyy; lukitus vain "OMISTAJA PYYSI JULKAISUA")
Runko ddbc71745 VIHREÄ (NS 13.14): + aamukaista 0cd7ae1a7, LS Rodin-veistokset 252553536 + testikorjaus c56975ec3, NUI kaaro-rajat 288035f99
(ÄLÄ c2a052bfa). EI junassa (tarkoituksella): Tivoli ed50dceeb/v8 (hylätty), kamerapöytä (odottaa nappeja), Kiina (vain kokonaisena).
Odottaa kuittausta:
- LS Nike + Venus (louvre-veistokset-200 43e01449c; kertojat ÄÄ bda689ef0 ämpärissä) → uusinta-simu JU ~15.20 → kuvat PT:lle → kuittaa NS:lle.
- PK cupola-ohita-200 64b347452 (PohjaLahde-korjaus) → yhdistetään kamerapöydän kanssa.
- Kamerapöytä (NUI yhteis-pariisi-200, app d 3256e5f1d): KK:n 4 löydöstä korjattu 327d4af21, lasigalleria 6d034cc5e (#4811 mergetty),
  laitenapit v1 26a3cbc9a. Simu NUI:lla 14.4x → arkki + kuvapari nykyinen|uusi (iPhone+iPad) PT → KK. Junaan VASTA uusien nappien kanssa.

## 2. OMISTAJAN PÄÄTÖKSET TÄNÄÄN (iltapäivä, sanatarkasti KK:n viesteissä)
- 12.13 + 12.20 TIVOLI: ei omia 3D-malleja, ei lentoa; vain kuvat esitykseen. 14.16 "Kyllä, 6 kuvaa (Suositus)": Codex tekee 6 havainnekuvaa
  CC-pohjista (järvi, portti, Nimb, käytävä, Rutschebanen, Glyptotek/Fatamorgana suihkulähteen tilalle – 24 § ei ok) + erä A 2 = yht. 8.
  Tilaus 42e58111f (erä C) + 7f5456025. Codex EI ole kuitannut erää A (10.01) eikä muistutusta d77eb4d11 → KK:lle kerrottu.
  CC-arkki v4 omistajalla ok. Paketti g (v10/v12) ämpärissä, #4808 → v10 AUKI, merge vasta omistajan kuittauksella.
  Pelikuva: kuvanosto todistettu testillä (järvi 0,00 / Carstensen 12,40 / Pierrot 31,04; litografia irrotettu); kortin pyyhkäisyajo v12 JU ~15.15 → arkki PT → KK.
- 12.24 "tehdään dynastiat ensin ja sen jälkeen uni": uni v3 jonossa, ei unityötä ennen dynastioiden valmistumista.
- 13.27 ISS-galleria "Kyllä, lasi linsseihin (Suositus)": tehty (#4811).
- 13.30 "Tee omat oikeat napit kameran ohjauspöydälle…": NUI, v1 26a3cbc9a; generointia vain luvalla.
- 14.46 KIINA väestö "Matalampi ja pehmeämpi (Suositus)": KS madaltaa (seinämät pois, kartta/rajat/valot aina näkyvissä), PK sovittaa kameran.
  Samaan videoon iso vuosi + dynastian nimi yläpalkkiin (11.55) ja kesto ~5 min (KS tahti 324ebca0a). KS ja PK nollattu → viesti lähetetty uusille.
  KK:lle näytetty v3-video (6:41). Williamin v2-äänet ämpärissä (aanet/kiina-william-v2, 4007 mrk).

## 3. MUUT
- Raketin meri sävy 2 (PK 36723c5f8) sinivihreä OK, KK:lle lähetetty; iPhone-mittaus JU:n kanssa (omistajan iPhone kytkettävä).
- VS: Louvren altaat = LR:n vesimesh liian tumma → k72 (vesi ×2,5) simu JU:lla; paketti omistajalle vasta vaaleana.
  Valas k7 hylätty (yhä hiutalepilvi) → k8 5065d4acd (läpikuultava patsas) kuvaus JU ~14.30 → vertailu k6|k8 PT:lle, omistajalle vain jos ei pilveä.
- Kertojaluvan jälki-ilmoitukset KK:lle tehty: Kiina William v2 (4007 mrk), Nike+Venus (1159 mrk).
- KS:n luovutuskommittiin tarttui .claude/settings.local.json (deny-lista) → poistettu f3ec5feb4, ei mainiin. Tarkista, ettei mikään PR tuo sitä.
- Lepo ilman erää: SS (omat erät valmiit), ÄÄ, SK (jono tyhjä), NS (odottaa kuittauksia).
