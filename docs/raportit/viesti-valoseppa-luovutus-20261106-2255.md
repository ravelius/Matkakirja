# Valosepän luovutus 6.11.2026 klo 22.55. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti 27 %, pehmeä raja. Tili vvi@vvi.fi, sessio local_fa464945. Kuvat vain KS:n yhteisessä ajossa, ei omaa ajoa; käännös JU:n vuorolla. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Ajoja ei ole käynnissä minulta.
Työpuut (enintään 3): `wt/proto-linssiseppa2-k17` varjo-aariviiva, `-k31` sillan-paa (ennen saumat-y), `-k32` maalattu-taivas. Mikään ei mene junaan.
Järjestys (PT): SAUMAT → SILLAN PÄÄ + PALAIS BOURBON → ÄÄRIVIIVAT → iPad-mittaus (omistajan 19.57 "ei iPad-mittauksia": kysy PT:ltä ennen). Kuvat PT:lle ennen KK:ta; saumoista etenemiskuvat heti PT:lle, koko kohde.

## ODOTTAA KS:LTÄ (KS antaa polut tähän sessioon; yhteinen ajo Y = wt/proto-karttaseppa-yhteinen)
Kun polku tulee: katso kuvat täysikoisina ja arvioi, tulos ja kuvat PT:lle.
- AJO 34 (loki `karttaseppa-yhteinen-34-b8-02546574c`, ei vielä valmis 22.52): `sg0-z11`, `sg1-*`, `sg2-*` (kohta 1) ja `pa-concorde/royal-nyt|uusi`, `pb-etela`, `pb-pohjoinen` (kohta 2).
- AJO 35: `sv-*` 6 kuvaa, korjatut ääriviivat (kohta 3), lista `lisa-varjo-peili-35.txt`, Y 772cb9670. Lisäksi `sm-z13-lansi`, `sm-z13-ita` (kohta 1, `_tyo/linssiseppa2/sk-saumat-siirto.txt`). Tarkista, että KS on ottanut sm-listan mukaan.

## 1. SAUMAT: `_tyo/linssiseppa2/saumat-syy-20261106/SYY.md`
Tavoite: "Pariisin kartalla ei näy reunaa tai laikkua, jossa kartan pala selvästi vaihtuu toiseen." Raamattu 2.215.
RAJAT: metsän heikennys ennallaan (jos laikku vaatisi metsää, rivi PT:lle). Mäkien varjostus ei kuulu tähän. Lukitus (arvot oletukseksi, ElavaTyyliVersio uusi, SHA:t KS:lle ENNEN) vain sanalla. Portaat 9 tuo maanpeitteen z11:lle, siinä on metsän väri: tarkista ennen lukitusta. Portaat f: PT "ei junaan eikä jatkoa".
Syy: reunat ovat maaston geografisen palaruudukon viivoja (45°-raja y=950 = 48,8672°, mitattu homografialla). Kuvataso seuraa maastopalaa (päätelty: taso + 2), joten rajalla on kaksi kuvatasoa rinnakkain. Kuvien nimet ovat korkeuksia: se-z13:n keskellä on z13 ja ympärillä z12.
Askel ennen → f: z11-z12 8–13 → 1–2,5; z12-z13 5–6,5 → 9–10; z13-z14 8,7 → 3,7. z12 vaaleni, ja siksi 45°-raja kasvoi.
Koe g: massa z12 0,60 ja 0,85 (z12 tummemmaksi). Arvio: `kaikki.py` saman kansion mukana (`_tyo/venv-rembg/bin/python -I`), päivitä kuvien nimet. PT: arvioi täysikoossa, tasonimet päätellyiksi. Korttelikuvio z12-z13 jää; g ei todennäköisesti yksin poista rajaa.
Varakeino: z12:lle rakennuskuvio z13:n datasta. Kulu kysytään PT:ltä vasta g:n jälkeen, kuvapari ja arvio mukana.
OMISTAJAN KYSYMYS se-z13:sta (PT:n kautta 22.5x), vastattu PT:lle: dataa ei puutu. z13-paloissa rakennuksia 143/143 koko kuvan alueella (`data-vs-kuva-z13.jpg`, `data-z13-rakennukset.png`), z12-lähdepaloissa 0/42 (ei building-tasoa). Paloja luettu koneen välimuistista: `/private/tmp/*/Matkakirja/*/laatat/elava/mvt/`, ei verkkohakua. Tiheä alue seurasi kameraa 5.11. (`kamera-siirto-tikkaat3.jpg`, korkeus 0,13, ei sama kuin se-z13); sm-kuvat täydentävät samalla korkeudella. Kun sm-kuvat tulevat, rivi ja kuva PT:lle.

## 2. SILLAN PÄÄ JA PALAIS BOURBON: KOE TEHTY, KUVAT AJOSSA 34
Komento `silta paa <0,05–1>` (1 = nykyinen), verkot uudelleen `ohjelmakohteet 0` ja `1`. c1afa18de, haara `linssiseppa2/sillan-paa`. Muuttaa vain värin liukua (`PaanMaa`, OhjelmaKohdeSillat.cs). Ohuet sillat ennallaan. Mitattu ennen: kansi #b7a78a, kärki #e1c89a, ranta #e0c590.
Palais Bourbon: harjakatto `Liuske` `OhjelmaKohdeRakennukset.cs:238-240`, kommentin mukaan tarkoituksella harmaa (a/viite/Palais Bourbon-6, -0). Syy mitattava pb-kuvista ennen korjausta. KS odottaa ehkä lisää kameroita.

## 3. ÄÄRIVIIVAT: VARJO OLI PEILISSÄ, KORJATTU. `_tyo/linssiseppa2/kovat-varjot/aariviiva-arvio-peili.md` (PT:llä)
Oma virhe 3d6e35696:ssa: `tee-aariviivat.py` luki GLB:n raakana, GlbLukija tekee z → −z. Työkalu korjattu. eb92b5e44 (`linssiseppa2/varjo-aariviiva`, k17), Y:ssä KS:n ajo 772cb9670 (myös ND #2184). "Sacré-Cœur selvä parannus" PERUTTU. Peili näkyy: Sacré-Cœur, Invalidit, Panthéon, ND, Opéra. Korjausta ei ole nähty pelikuvassa, vain siluetti (`aariviivakuvat2/`).
Katso sv-kuvista: Invalidit (ei varjoa molemmin puolin; onko varjo silti heikko), Sacré-Cœur mäen päällä, ND, Panthéon, Opéra. HUOM (PT): älä sano "malli umpinainen" Eiffelistä: X-ristikko on näkyvissä; umpinainen on maassa oleva varjo ja mallin siluetti.
Läpikäynti: ääriviivatiedosto vain 12 mallilla; 10 kohteella ei ole, joten ääriviiva ei koske niitä. Louvre-180 ja -yla katsomatta. Parit: `parit-av-keski/`, `parit-av-20/`. ND:n kolmiot 150 → 221 (Y): odotettua, KS:lle kerrottu; Y:n versiota ei katsottu erikseen.
Kolmiot 234 648 → 1 447 laskettu, ei mitattu. Junaan vain mitatulla luvulla ja omistajan sanalla; ennen junaa testi, joka vertaa ääriviivaa pelin lukemaan malliin. Aloittamatta (järjestys KK:lta): rosoisuus; mallin valo kääntyy kameran mukana, varjo ei.

## 4. USVA: VALMIS PT:LLÄ, ODOTTAA PÄÄTÖSTÄ `_tyo/linssiseppa2/usva-kauas-ajo34b/ARVIO.md`
Omistaja 22.17 ja 22.18. Ajo 34b, a64444662, haara `linssiseppa2/usva-kauas`. Suositus a (1,5/12 km). b:ssä maa loppuu 75°:ssä viivaan, syy selvittämättä. 45° nyt = b (0,00). Muisti mittaamatta; iPad vain luvalla. Ei junaan ilman sanaa. La Défensen tornit läpikuultavat 85°:ssä, syy tutkimatta.

## 5. MERI, JONOSSA SAUMOJEN JÄLKEEN (PT), ei aloitettu
Meren ruudukko näkyy Ranskan tasolla Kanaalilla ja Keltienmerellä, `/Users/Shared/Claude/proto-3d/lokit/natiiviseppa-liiku-lento-a68c82983/l2-ranska.png`, täysikoossa. Merikorjaus 5b9eb8cb4 ei ole yhteisessä pohjassa (ei 43a2fa300:ssa eikä ajossa 33), on merkitty kesken ja koskee tasoja z10–z13, joten ei välttämättä auta tällä tasolla. Mittaa ensin, kuuluuko tämä siihen, sitten rivi PT:lle: syy ja esitys.

## 6. VANHAT
Taivas v2 #2182: kokeena vain Pariisissa (omistaja 22.15), ei lisätyötä. Usvakoe b3bff978f (45°): kelpaa kokeena, ei junaan. Pont d'Iéna vaalea kaista on omistajan päätös 18.09; kävely- ja metrosillat ohuina 17.24.
Jonon lopussa: `git show origin/linssiseppa2/luovutus-20261106-1826:docs/raportit/viesti-valoseppa-luovutus-20261106-1826.md` kohta 6 (lippu, paletti, räystäs, Puu-3, siltakuvat), `us-nd-85`:n tummat merkit. Tausta `_tyo/karttaseppa/lahialue-20261106/LUOKITUS.md`.

## TEKNIIKKA
zsh: `"${C}:refs/..."`, `$Y:A` on muokkain. Python + PIL `/opt/homebrew/bin/python3`; numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`. `unity-tarkistus.sh` on `Linssit-testit/`:ssä, aja `sh ./unity-tarkistus.sh`. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara on jäljessä (85 omaa tiedostoa, kaikki luovutuksia, HEAD 9b98b5c23 etäpalvelimella): luovutus plumbingilla (väliaikainen GIT_INDEX_FILE, read-tree origin/main, hash-object, update-index, write-tree, commit-tree, push). Palaparit `/private/tmp/*/Matkakirja/*/laatat/elava/mvt/<z>/<x>/<y>.pbf`; lukijat: scratchpadin mvt-skriptit eivät säily, tee uudelleen tarvittaessa (pbf: Tile.layers = 3, Layer.name = 1, features = 2, extent = 5, Feature.geometry = 4).
