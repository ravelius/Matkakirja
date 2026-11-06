# Valosepän luovutus 6.11.2026 klo 22.20. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti 25 %, pehmeä raja. Tili vvi@vvi.fi, sessio local_fa464945. Kuvat vain KS:n yhteisessä ajossa, ei omaa ajoa; käännös JU:n vuorolla. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Ajoja ei ole käynnissä minulta.
Työpuut (enintään 3): `wt/proto-linssiseppa2-k17` varjo-aariviiva, `-k31` sillan-paa (ennen saumat-y), `-k32` maalattu-taivas. Mikään ei mene junaan.
Järjestys (PT): SAUMAT → SILLAN PÄÄ + PALAIS BOURBON → ÄÄRIVIIVAT → iPad-mittaus (omistajan 19.57 "ei iPad-mittauksia": kysy PT:ltä ennen). Kuvat PT:lle ennen KK:ta; saumoista etenemiskuvat heti PT:lle, koko kohde.

## LISÄYS 22.2x
- Omistaja 22.15 (KK): taivas v2 #2182 kelpaa kokeena vain Pariisissa, ei junaan, vaalea pinkki saa jäädä. Ei uutta taivastyötä. KK kuittaa Codexille.
- PT: syy kelpaa, g1 ja g2 saa ajaa. Arvioi täysikoossa, tasonimet päätellyiksi. Varakeinon kulu kysytään vasta g:n jälkeen, kuvapari ja arvio mukana.
- Kotikansion 85 tiedostoa: kaikki docs/raportit-luovutuksia, HEAD 9b98b5c23 on etäpalvelimella; työpuussa vain 2 seuraamatonta. Ei hukkumisvaaraa. Kerrottu PT:lle.
- Eiffel ratkaistu: "kevyt muoto vie aukot" ei pidä paikkaansa, katso kohta 3.
- PT: loput 20 ääriviivakohdetta katsotaan. Parit ovat jo ajoissa 31 (av-*) ja 28 (kv-*); sk-pariisi-yhteinen-33:ssa ei ole av-kuvia, joten uutta ajoa ei tarvita.

## ODOTTAA KS:N AJOA (lähetetty KS:lle 22.15, 3D-rakennusten ajojen jälkeen)
- `_tyo/linssiseppa2/sk-saumat-g.txt` (11 kuvaa, ei koodia): sg0-z11, sg1-*, sg2-*.
- `_tyo/linssiseppa2/sk-sillan-paa.txt` (6 kuvaa): c1afa18de, haara `linssiseppa2/sillan-paa`, unity-tarkistus 0 virhettä. pa-concorde/royal-nyt|uusi, pb-etela, pb-pohjoinen.
Kun KS antaa polun: katso kuvat täysikoisina ja arvioi, tulos ja kuvat PT:lle.

## 1. SAUMAT: SYY LÖYTYNYT, `_tyo/linssiseppa2/saumat-syy-20261106/SYY.md` (PT:llä 22.1x, ei vielä kuittausta)
Tavoite: "Pariisin kartalla ei näy reunaa tai laikkua, jossa kartan pala selvästi vaihtuu toiseen." Raamattu 2.215.
RAJAT: metsän heikennys ennallaan (jos laikku vaatisi metsää, rivi PT:lle). Mäkien varjostus ei kuulu tähän. Lukitus (arvot oletukseksi, ElavaTyyliVersio uusi, SHA:t KS:lle ENNEN) vain sanalla. Portaat 9 tuo maanpeitteen z11:lle, siinä on metsän väri: tarkista ennen lukitusta. Portaat f: PT "ei junaan eikä jatkoa".
Syy: reunat ovat maaston geografisen palaruudukon viivoja (45°-raja y=950 = 48,8672°, mitattu homografialla). Kuvataso seuraa maastopalaa (päätelty: taso + 2), joten rajalla on kaksi kuvatasoa rinnakkain. Kuvien nimet ovat korkeuksia: se-z13:n keskellä on z13 ja ympärillä z12.
Askel ennen → f: z11-z12 8–13 → 1–2,5; z12-z13 5–6,5 → 9–10; z13-z14 8,7 → 3,7. z12 vaaleni, ja siksi 45°-raja kasvoi.
Koe g: massa z12 0,60 ja 0,85 (z12 tummemmaksi). Arvio: `kaikki.py` saman kansion mukana (`_tyo/venv-rembg/bin/python -I`), päivitä kuvien nimet.
Korttelikuvio z12-z13 jää; g ei todennäköisesti yksin poista rajaa. Varakeino: z12:lle rakennuskuvio z13:n datasta, kulu kysyttävä PT:ltä. Rinnevalo on rajattu pois.

## 2. SILLAN PÄÄ JA PALAIS BOURBON: KOE TEHTY, KUVAT AJOSSA
Komento `silta paa <0,05–1>` (1 = nykyinen), verkot uudelleen `ohjelmakohteet 0` ja `1`. Muuttaa vain värin liukua (`PaanMaa`, OhjelmaKohdeSillat.cs), ei korkeutta eikä muotoa. Ohuet sillat ennallaan. Mitattu ennen: kansi #b7a78a, kärki #e1c89a, ranta #e0c590.
Palais Bourbon: harjakatto `Liuske` `OhjelmaKohdeRakennukset.cs:238-240`, kommentin mukaan tarkoituksella harmaa (a/viite/Palais Bourbon-6, -0). Syy mitattava pb-kuvista ennen korjausta.

## 3. ÄÄRIVIIVAT: ARVIO `_tyo/linssiseppa2/kovat-varjot/aariviiva-arvio-ajo31.md`, PT:llä
3d6e35696, `linssiseppa2/varjo-aariviiva`, k17. Sacré-Cœur selvä parannus. Eiffel: sama pitkä rako, pienet täplät pois, ristikkokuviota ei kummassakaan (raja-eiffel-ristikko.png). 20 kohdetta katsomatta. Kolmiot 233 265 → 1 467 laskettu, ei mitattu. Junaan vain mitatulla luvulla ja omistajan sanalla. Työkalu `_tyo/linssiseppa2/kovat-varjot/tee-aariviivat.py <työpuu> --kuvat <kansio>`. Aloittamatta (järjestys KK:lta): rosoisuus; Louvren ja Invalidien heikko varjo; mallin valo kääntyy kameran mukana, varjo ei.

## 4. VANHAT
Usvakoe: omistaja 20.58 kelpaa kokeena, ei lisätyötä (b3bff978f). Taivas v2 #2182: valmis kokeena (omistaja 22.15), ei lisätyötä. Pont d'Iéna vaalea kaista on omistajan päätös 18.09; kävely- ja metrosillat ohuina 17.24.
Jonon lopussa: `git show origin/linssiseppa2/luovutus-20261106-1826:docs/raportit/viesti-valoseppa-luovutus-20261106-1826.md` kohta 6 (lippu, paletti, räystäs, Puu-3, siltakuvat), `us-nd-85`:n tummat merkit. Tausta `_tyo/karttaseppa/lahialue-20261106/LUOKITUS.md`.

## TEKNIIKKA
zsh: `"${C}:refs/..."`, `$Y:A` on muokkain. Python + PIL `/opt/homebrew/bin/python3`; numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`. `unity-tarkistus.sh` on `Linssit-testit/`:ssä, aja `sh ./unity-tarkistus.sh`. Laattavälimuistia ei löytynyt ajon jälkeen: mittaa kuvista. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara on jäljessä (85 omaa tiedostoa, ei ylikirjoiteta): luovutus plumbingilla (read-tree, hash-object, commit-tree, push).
