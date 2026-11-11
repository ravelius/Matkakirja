# Valosepän luovutus 11.11.2026 klo 11.33. Itsenäinen: vanhoja ei tarvitse lukea (korvaa 20261111-1054:n)

Syy: konteksti (pehmeä raja 25 %). Päivitetty 11.4x: KK:n päätökset 11.38 (kynä hyväksytty, maa A). Tili sami.reivinen@vvi.fi. Kotikansio /Users/Shared/Claude/Matkakirja-linssiseppa-2 on originin mainissa (irrallisena, 2665e9565). Vanha koti-HEAD 9b98b5c23 on talletettu haaraan linssiseppa2/koti-tallennus-20261111. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup` (natiivin "main" = `julkaisija/juna-224`). Ainoa worktree k33 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k33`, nyt haarassa `linssiseppa2/pilvivarjo-pehmea` 51e33fb4f, puhdas ja pushattu. Kuvat ja ajot vain JU:n vuorolla. Id:t: PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; KK `local_d5f31591-21fa-4cb0-bab3-bcd3435d075a` (nollautui 11.3x); JU `local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; Postivahti `local_1f31f830-9df5-41c1-8992-172e100af57f`. Viestit mcp__ccd_session_mgmt__send_message id:llä. JU:n jonoloki `/Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt`.

## LINJAT
- Näkyvä työ (3D, merkit, ilme, valikot, VALO): kuva ensin KK:lle, PT kopiona; junaan vasta KK:n sanalla. KK katsoo itse ja vaatii todisteen, joka näyttää itse asian; kerro puutteet suoraan.
- JU:n RUUTUVIKA (11.11.) KORJATTU juna-224 17fbf3e35: jos Mac-kuvia otetaan tallenteen jälkeen, yhdistä f2511a80f omaan haaraan. Ennen sitä tallenteen jälkeen otetut kuvat ovat epäluotettavia (lista julkaisija-tyokalut/tallenne-ruutuvika-20261111.txt). Todiste-5:n uusinta (1851ecf69) pyydetty peruttavaksi, koska 51e33fb4f korvaa sen.

## 1. PILVIEN VARJOT: levossa seis, iPad-todiste JU:lla
- KK 11.31: kello seis koko levon ajan. Ehto: varjot jatkavat samasta kohdasta, ja liike lähtee ja pysähtyy pehmeästi (~0,5 s:n liuku). Todiste iPadilta: lepo 10 s (varjot paikallaan) + liikutus + pysäytys, ilman tallennetta. Sitten MR JU:lle PT:n kuittauksella (pt-ok PT:ltä).
- Haara `linssiseppa2/pilvivarjo-pehmea` (juna-224 494595623 + 5, unity 0): 75ab1c7de jatkuva paikka · 2813294de harva piirto seis · 13c211af8 kello lokiin · fa0978bad tuuli 6,3 m/s · 51e33fb4f UUSI: kello käy vain kameran liikkuessa (KameraKirjoittaja.ViimeLiike < 0,1 s), vauhti 0 ↔ 1 smoothstepillä 0,5 s:ssa, harvassa piirrossa ja kuumana seis heti. Loki: "kello seis (lepo|Kerros|Paikallaan|kuuma)" / "jatkuu".
- ODOTTAA: JU, iso iPad: `_tyo/linssiseppa2/pilvivarjo/sk-ipad-pilvivarjo-todiste-2.txt` → lokit/linssiseppa2-pilvivarjo-todiste-ipad-2-51e33fb4f (pyydetty 11.32). Tarkista: i2-lepo-0 = i2-lepo-10 (ero.py ~0 maassa, kello sama tila-riveillä), i2-liike-1/2 (kello nousee), i2-jalkeen-0 = i2-jalkeen-10 (kello seis samaan arvoon), konsolissa seis/jatkuu-rivit ilman tiheää vuorottelua, kehysajat. Erokuvat: `/opt/homebrew/bin/python3 _tyo/linssiseppa2/pilvivarjo/tyokalut/ero.py a b ulos 6` ja `pari.py a b ulos x0 y0 x1 y1 "teksti a" "teksti b"` (numpy, ilman -I). Lähetä KK:lle polut + puutteet; KK:n sanalla MR JU:lle.
- Aiempi: edellinen iPad-todiste fa0978bad (_tyo/linssiseppa2/pilvivarjo/todiste-ipad/LUE.md) johti tähän päätökseen. Mac-todiste-5:n korvaava pari on concorde-0/20 (ennen tallennetta): 137 m 20 s:ssa. KK kirjasi korjauksen.

## 2. KYNÄ v4: HYVÄKSYTTY (KK 11.38), MR JU:lla
- `linssiseppa2/kyna-v4` ea0bee3ce: neula saa jäädä, iPad-hinta ei mitattavaa. MR JU:lle 11.4x, pt-ok PT:ltä pyydetty. Varmista, että se on junassa.
- Kynä (_KynaPois, asettamatta = päällä) on oletuksena päällä kaikissa koodimalleissa (RK, ND, Panthéon). Vanha kaukoviiva _KoodiViiva on oletuksena pois ja on eri asia. ND-pari: _tyo/linssiseppa2/kyna/v4/rajaukset/rajaus-nd-lahin.png.

## 3. MAAN PIIRROS LÄHELTÄ: KK 11.38 VALITSI A:n → TOTEUTA (kärki Kaupungit)
- KK:n ohje: tavoitekuva A (paperi + terävä muste), EI B:tä (viivoitus levoton, kilpailee talojen kanssa). Kadun reunat ja aukion kehät ohuina terävinä kynänvetoina. Muste HIEMAN KEVYEMPI kuin tavoitekuvassa (ei tummempi kuin talojen varjopuoli), jotta talot pysyvät pääosassa. Paperin kuitu juuri ja juuri havaittava. KAUEMPAA kuva ei muutu nykyisestä. Viiva EI SAA VÄRISTÄ EIKÄ VILKKUA kameran liikkuessa (terävöinti fwidth-pohjaisesti ja maailmaan kiinnitetty kuitu; ei ruutukoordinaatteja).
- Todiste KK:lle: parit nyt | A samoista kohdista (ND, RK) lähimmällä ja keskietäisyydellä + 10 s liiketallenne lähimmästä + iPadin ruutuaikarivi. Mac-kuvat ennen tallennetta tai yhdistä f2511a80f omaan haaraan.
- Pohja: tavoitekuvat `_tyo/linssiseppa2/maapiirros/kk-1/` (LUE.md). Lähteet lokit/linssiseppa2-maa-lahella-2-a61a98089 (sk-maa-lahella-2:n kamerat: ND 48.8530 2.3499, RK 48.8738 2.2950, `aja … 0.0012 3`, kallista 35, suunta 20). Tavoiteskriptin muste: smooth(-0.018, -0.055, d), väri (0.33, 0.24, 0.16) × 0.85, kuitu 0.026/0.02/0.025 → pelissä kevyemmin.
- Piirto: lähitason laatat piirtää PiirrosKerros.shader (Assets/Matkakirja/Kartta/Resources, 77 riviä, _MainTex + _Maski, ZTest Always; PiirrosKerros.cs), 2,48 m/px (TasoVersio isoisa4-20261103). Lähellä häivytys etäisyyden mukaan, jotta kauempaa kuva pysyy ennallaan.
- Uusi haara juna-224:n kärjestä (17fbf3e35 tai uudempi) natiivirepossa. Unity-tarkistus ennen JU:ta.
- Saumat (506) odottavat edelleen KK:n suunnitelmaa.

## 3b. VESITÄYTTÖ (erä B) 0829caa4e: ennallaan JU:lla
- Ajo 3 JU:n luovutuksessa: asenna 0829caa4e, lue UUID konsolista, vasta sitten Documents/kaupunki-vesi.txt; kansio lokit/linssiseppa2-vesitaytto-ipad-3-0829caa4e; lopuksi txt tyhjäksi. Hyväksyntä: "pilarireiät täytetty" pääsäikeessä ≤ 20 ms, ei > 100 ms ruutua → PT + MR. Ohje `_tyo/linssiseppa2/vesitaytto/LUE.md`.

## MUUT (ennallaan)
- Mäkien varjostus (KK:n tavoite). Merenpohjan puristus 97b4f29a9 KS:n koelaatoilla. Kohokartan aurinko cd74573cd: syvyyskuva laiteajossa.

## TEKNIIKKA
PIL `/opt/homebrew/bin/python3 -I`; numpy- ja scipy-skriptit ilman -I. Mac-skenaariot: `kallista` + `suunta` ennen `aja`; koko ipad, ESIKATSELU_PISTEKERROIN=0.465; Pariisin talot: `talot kansio /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/palat-v20-ryhma4` + `talot 1`. Lähin kamera: `aja <lat> <lon> 0.0012 3` + `pallo kerros pakota taysi`. iPad: `komento …` + `odota 3` väleihin, kuva = `komento kuva X`. iPadin levossa tila vaihtelee lepo 30 fps ↔ Kerros (paikallaan 0). `sh Peli-testit/unity-tarkistus.sh` worktreessa. Ajon lopun "POIKKEUS ArgumentOutOfRangeException" Mac-esikatselun alussa on vanha (myös NUI:n ajoissa). Luovutus plumbingilla origin/mainin päälle omaan haaraan.
