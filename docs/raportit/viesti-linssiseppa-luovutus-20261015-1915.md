# Linssisepän luovutus 15.10.2026 klo 19.15 (KOVA RAJA 36 %, Postivahti)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/
(Julkaisija antaa käännöksen ja lipun `simu-<nimi>.nyt`). Testit `sh Linssit-testit/kaanna.sh [suodatin]`, `zsh tyokalut/tarkista.sh`,
`python3 tyokalut/pohjavahti.py` (Julkaisijan käännös pysähtyy siihen: ei `new Color` UI-C#:ssa, käytä Tyylikirja/Kuviot.Alfalla).
Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832, PK local_7fcab04b-864c-4ec2-98bd-46e171326701,
Valoseppä local_c238f4af-ae73-44e7-81f1-92848acd9217, SK local_72d15713-eb20-402b-95f7-87bdaaf91b74. Simu iPad 00CF62C2.
SITOVA: EI simuajoja junaa varten; omistajan kuvapari (PT 18.3x: omistaja pyysi) on sallittu.

## 1. KESKEN: ISS-YÖTAIVAS (PT kuittasi suunnitelman 18.3x), worktree /Users/Shared/Claude/wt/proto-linssiseppa-yotaivas
Haara linssiseppa/yotaivas-196 (juna-195 427fcfa77 päällä, merge juna-195:een puhdas). Kaikki KYTKIMEN `KyydinTaivas.Yotaivas` takana
(oletus pois; `linssi astro kyyti yotaivas 0|1|tila`). Kärki 62aab166f:
- 9e0dceb5d `KyydinTaivas.Varjossa` 0…1 (Valosepän rajapinta, hän käyttää kupolin hehkuun); 85dab2d9f planeetat; f8356c576 Linnunrata
  (NASA SVS Deep Star Maps 2020, PD, Resources/Taivas/linnunrata-2k.jpg + KyydinLinnunrata.shader); fb00dbd49 + 1cbeb50d4 + eea4f5b8c
  ohjaamon himmennys (IssKyytiNakyma.PaivitaSisavalo, PT:n ja PK:n lupa, PK:lle kerrottu).
- 386a5e03d + 48a6c5c51 TaivasKohteet (Ydin, 20 kohdetta, SK:n tarkistamat kansannimet: Pohjannaula, Kalevan miekka, Seitsentähtinen),
  AsemaVarjossaYlla (Pulun kesäyön ehto), testit TaivasKohteetTestit 6/6.
- eef42dd4f SK:n tekstit skannerin faktat.json/data.json avaimilla taivas-<tunnus> (main 3f478ae4c).
- 7c481545c TaivasNimet (nimet Cupolan taivaalle, napautus → IssSkanneri.TaivasNapautettu).
- acc176a67 + 62aab166f skannerin taivastila NUI:n ehdoin (sama kehys/ajoitus/luokat, kuva maastoverkon tilalle ilman pyörähdystä,
  LCD-vihreä, KUVA-rivillä tekijä; ilman kuvaa pelkät tekstit). Kuvat ämpärissä taivas/kuvat/ (Julkaisija vei 11/11, kaikki 200).
  Testikomento `ui linssi skanneri taivas-<tunnus>`. NUI haluaa SHA:n + asettelukuvan katselmoitavaksi (EI vielä lähetetty).
- KUVAPARIAJO KÄYNNISSÄ 19.11 (ajo-yotaivas196.zsh, loki ajo-yotaivas196-2.log, käännös 7ac561a9f ⊇ eea4f5b8c; skanneri EI mukana,
  joten C1/C2-kuvat tyhjiä). Tulos: proto-3d/lokit/todistus-yotaivas196-ipad-20261015-19xx/. Ensimmäinen ajo 18.45 epäonnistui
  (väärä komento `linssi raketti ohita`, oikea `linssi linssi raketti ohita`). SEURAAJA: kun ajo päättyy → SIMU VAPAA Julkaisijalle,
  katso kuvat A1/B1/B2/A2; jos hyvät, kuvapari omistajalle PT:n kautta (polku + 3 riviä). Sitten uusi käännös acc176a67+ ja C-kuvat NUI:lle.
- AVOIMET: Pulun kesäyön opetuslause on SK:lla äänisivun Tekstit-osastossa omistajan hyväksyttävänä → kun hyväksytty, kytkentä
  (TaivasKohteet.AsemaVarjossaYlla + Pulun repliikki kesäyönä Suomen yllä). Revontulet: Valosepän `Revontulet.Havainto`
  (struct Voimakkuus/Suunta/Nakyy, haara linssiseppa2/revontulet-196 02db50acc) → skanneriin kohde "Revontulet" myöhemmin.
  Teleobjektiivi: nykyinen 475 mm:n kuvaputki (Valoseppä) – ei vielä taivaskohteeseen.

## 2. VALMIIT TÄNÄÄN (tämä sessio)
- 6f27c5ad6 NS:n testilöydös (CupolanEnnakkoOnAvautuvaAsento, yö myös ennakon hetkeltä) – yotaivas-196:ssa, ei vielä junassa.
- 4354305a4 Hefaistos-lentosääntö JUNAAN 195 (haara linssiseppa/hefaistos-195, worktree wt/proto-linssiseppa-kierrokset195):
  kääntö venyttää enintään 35 s, nopeus 1 s:n keskiarvona, panorointi hiipuu 90–150°:n käännöillä. Akropolis 53,5 → 35,0 s, Greenwich
  44,4 → 35,0 s, Linssit 1872/1872. PT:lle ilmoitettu, kuittaus odottaa.

## 3. MUUT
- Worktreet: yotaivas (työ), kierrokset195 (nyt haaralla hefaistos-195), historia194, puutomat191.
- tools/gpu-vapaa.sh ja .claude/settings.local.json* checkoutissa eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261015-1915.md).
Ensin kuvapariajon tulos (kohta 1): SIMU VAPAA Julkaisijalle, kuvat PT:lle; sitten skannerin C-kuvat NUI:lle uudella käännöksellä.
