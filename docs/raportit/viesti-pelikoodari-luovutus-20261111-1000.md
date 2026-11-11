# Pelikoodari: luovutus 11.11.2026 klo 10.00 (konteksti 25 %)

Edellinen: viesti-pelikoodari-luovutus-20261111-0915.md (4992a1d1f). TÄMÄ KORVAA SEN JONON.
Natiivityöpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, haara pelikoodari/seinat-taso1, kärki bcf32314c (060fa6ac8 = v132 + B1).
Natiivirepolla ei originia (vain natiivi-backup, älä pushaa): haara näkyy JU:lle paikallisesti.
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/seinat-taso1/.

## TEHTY
- B1 KORJATTU bcf32314c: QA `ui juoksupeli botti maali` (JuoksuV4Botti.Maaliin, oletus pois). Kulkukartan maalietäisyys
  (JuoksuKulkuKartta.AsetaMaali/MaaliEtR, Dijkstra hienolla ruudukolla, vain QA-botille), kappaleen pään valinta säteellä
  (JuoksuV4Reitti.BottiMaaliKaanto/SadeMaaliin) ja pyyhkäisy sivuaukkoon kesken kappaleen (BottiSivuKaanto → s.Kaanna).
  Maalin lähellä (15 m) vanha sääntö. Testi VapaaBottiSuunnistaaMaaliin: 3 QA-lähdöstä 4 m:iin maalista 200 s:ssa. 913/913, unity-tarkistus 0.
  Oletus pois, koska omena- ja linjatesti (OmeniaRiittaa-, LinjatOikeallaKartalla) olettavat vaeltavan botin; maalibotilla linjatestissä
  5/32 ajelehti → ehkä piilevä linjavika etelän kujilla (ei tutkittu).
- P-ajo PERUTTU (PT): LAV löysi syyn, M4/M5 = taustan ikkunakehys (LAV ed4ae1c25). Kuvat pursot/kuvat ajettu 09.26, ei käytetä.
- p11e renkaat 191aaeaf2 iso iPad (lokit/pk-renkaat-191aaeaf2-ipad-3): tekninen ok (3795 Mt, 0 vikaa, Poistu → kartta ok),
  renkaita ei kuvissa, koska kuvat alkulennon aikana. Renkaat-rivi KK:n sulkema 10.11. → ei uusintaa ilman pyyntöä. PT:lle kerrottu.
- PT:n pikkutyö: _tyo/venv-aaniluokitin luotu uudelleen (vanha: venv-aaniluokitin.rikki-20261111; lib/ puuttui), numpy 2.5.4,
  torch 2.15.0, transformers 5.22.2. Kaupunkinimet-william-v1 viety 09.58 (123, virheitä 0). Äänittäjälle ja PT:lle rivi.

## JONO (odottaa JU:n rivejä tähän sessioon)
1. **ETELA2 AJETTU** (Mac, etela2/aja-etela2.zsh, bcf32314c, 61 kuvaa e01–e60 + paikka, `botti maali`): katso etela2/kuvat,
   pääsikö botti etelään (loki: `juoksupeli: paikka`-rivit) ja kirjaa uudet seinä-/kohdelöydökset kuten etela/LISTA2.txt (E-kohdat
   = keisarin paikka, kohde 2–5 m edessä; taustan kolmiot LAV:lle vain kuvista vahvistettuina).
2. **V AJETTU** (Mac, m1-varmistus/aja-v.zsh, b804a87d6 + LAV:n koejuuri-m1, 16 vinokuvaa a02…a41): vertaa lav-kohdat/kuvat/aNN-vino.png
   (v132) ja m1-varmistus/kuvat/aNN-vino.png; kansilaatta poissa → rivi LAV:lle (local_f12c9179…) ja PT:lle; jäljellä olevat LAV:lle.
3. **P11d2** osa 8 ovet 3eb33531c iso iPad (lokit/pk-osa8-ovet-3eb33531c-ipad-3; 1. yritys error 22). Osa 8 = "ovet kiinni -tasolla
   ei kynnysviestiä lainkaan (myös raja pois; PT 10.11. 18.3x)": tarkista, ettei kynnysviestiä tule; rivi PT:lle.
4. **v133 junassa** (LAV ilmoittaa) → kulkukartta_ajo.py ... --vie uudelleen (kuten v132, loki kulkukartta/v1NN.log) + esto:
   M1 raja x −87,3 → −88,7 (z 472,7…489), E4 rajat (B:n itäseinä −89,4/−89,5, z 493,8–496,4; C:n länsiseinä −85,05/−85,3, z 484–492,4).
5. ENNALLAAN: isolla iPadilla aukiovideo (kulkukartta/sk-ipad-aukio-v129d-2.txt). B1-korjaus junaan PT:n päätöksellä (bcf32314c on QA-only).

Ei uusia lupia. Asemataulu jäädytetty (ei päivitetty).
