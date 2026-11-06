# Valosepän luovutus 6.11.2026 klo 23.25. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti 30 %, pehmeä raja. Tili vvi@vvi.fi, sessio local_fa464945. Kuvat vain KS:n yhteisessä ajossa, ei omaa ajoa; käännös JU:n vuorolla. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Ajoja ei ole käynnissä minulta.
Työpuut (enintään 3): `wt/proto-linssiseppa2-k17` varjo-aariviiva, `-k31` nyt `linssiseppa2/sillan-paa`, `-k32` nyt `linssiseppa2/saumat-z12`. Mikään ei mene junaan.
OMISTAJA 23.07, YÖN SÄÄNTÖ: kun vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa, kokeen osa pois tai edellinen toimiva tilalle. Sitten rivi KK:lle (vika, mitä kokeiltu, suositus) ja seuraavaan työhön. KK kokoaa kysymykset aamuun.
Järjestys (PT): ÄÄRIVIIVAT (odottaa ajoa 35) → iPad-mittaus (omistajan 19.57 "ei iPad-mittauksia": kysy PT:ltä ennen). Kuvat PT:lle ennen KK:ta.

## ODOTTAA KS:LTÄ (Karttaseppä local_740947d7; polut tulevat tähän sessioon; yhteinen ajo Y = wt/proto-karttaseppa-yhteinen)
KS 23.2x: sm- ja ua-listat ovat ajossa 35 (Y 00dea49d1); sk-pb-piha ja sk-sillan-valo menevät ajoon 37, ajon 36 jälkeen:
- `_tyo/linssiseppa2/sk-saumat-siirto.txt`: sm-z13-lansi, sm-z13-ita. Kun tulevat: rivi ja kuva PT:lle omistajan se-z13-kysymykseen (dataa ei puutu: z13-paloissa rakennuksia 143/143, z12-lähdepaloissa 0/42).
- `_tyo/linssiseppa2/sk-usva-a-45.txt` (vaatii 074dc595e, `linssiseppa2/usva-kauas`): vertaa Louvre-pari pikseleittäin (Louvre 45° pitää pysyä) ja katso ua-85, että oletus kytkeytyy. Tulos PT:lle.
- `_tyo/linssiseppa2/sk-pb-piha.txt` (vaatii dac44e3d9): kohta 2.
- `_tyo/linssiseppa2/sk-sillan-valo.txt` (vaatii 386945015): kohta 2.
- AJO 35: `sv-*` 6 kuvaa, korjatut ääriviivat (kohta 3), lista `lisa-varjo-peili-35.txt`, Y 772cb9670.

## 1. SAUMAT: VALMIS, EI RATKENNUT. Rivi KK:lle lähetetty 23.19 (yön sääntö)
Arviot: `_tyo/linssiseppa2/saumat-g-20261106/ARVIO.md`, `_tyo/linssiseppa2/saumat-z12-koe/ARVIO.md`. Oletus ennallaan, ei lukitusta. PT: metsä rajauksen sisällä, älä heikennä; g:tä ei lukita.
Tulos: väri siirtää askelta rajalta toiselle, ja askel riippuu rakennustiheydestä. Rakennukset z12:lle z13:n datasta (ef901fc5b, `linssiseppa2/saumat-z12`, vain ajuri, ei peliin): raja siirtyy z12-z13:lta z11-z12:lle (kuvio 3,44 → 4,38). Data 3,6-kertainen palaa kohden. Mitattu ajurilla, ei pelikuvana. Ei jatkoa ilman omistajan linjausta.
Taivaan "portaat" 45-laaja-kuvissa: ei vikaa, oma havaintoni oli väärä (pienennetty näkymä).

## 2. SILLAN PÄÄ JA PALAIS BOURBON: ODOTTAA PELIKUVAA (`_tyo/linssiseppa2/sillan-paa-ajo34/ARVIO.md`)
PT: sillan pää 0,35 EI kuitattu: haalean pään tilalle tumma vyö ja terävä kärki. Saatu yksi mittaus laskun valosta: laskun normaali tuli kaltevasta pinnasta (Rakentaja.Kolmio), koe 386945015 `silta tasavalo 1`, oletus pois. Katso pv-concorde, pv-royal samalla rajauksella kuin pa-*-uusi (`sillan-paa-rajaukset.py`). JOS VYÖ JÄÄ: oletus ennallaan ja rivi KK:lle, ei lisäyrityksiä. Jos vyö poistuu, kärki voi silti jäädä terävänä: arvioi ja vie PT:lle.
Palais Bourbon: harmaa pinta on kunniapiha (#9c927e), ei harjakatto; koe dac44e3d9 PbPiha 0xD8CDB6, Hôtel de Villen Piha ennallaan. PT: "hyvä, kuittaus vasta pelikuvasta". Katso pc-etela, pc-pohjoinen; vertailu pb-* ajossa 34. Nurmipyörää ja palloa ei lisätty (a/viite/Palais Bourbon-piha0, -piha1).

## 3. ÄÄRIVIIVAT: VARJO OLI PEILISSÄ, KORJATTU. `_tyo/linssiseppa2/kovat-varjot/aariviiva-arvio-peili.md` (PT:llä)
Oma virhe 3d6e35696:ssa: `tee-aariviivat.py` luki GLB:n raakana, GlbLukija tekee z → −z. Työkalu korjattu. eb92b5e44 (`linssiseppa2/varjo-aariviiva`, k17), Y:ssä KS:n ajo 772cb9670 (myös ND #2184). "Sacré-Cœur selvä parannus" PERUTTU. Peili näkyy: Sacré-Cœur, Invalidit, Panthéon, ND, Opéra. Korjausta ei ole nähty pelikuvassa, vain siluetti (`aariviivakuvat2/`).
Katso sv-kuvista: Invalidit (ei varjoa molemmin puolin; onko varjo silti heikko), Sacré-Cœur mäen päällä, ND, Panthéon, Opéra. HUOM (PT): älä sano "malli umpinainen" Eiffelistä: X-ristikko on näkyvissä; umpinainen on maassa oleva varjo ja mallin siluetti.
Läpikäynti: ääriviivatiedosto vain 12 mallilla; 10 kohteella ei ole, joten ääriviiva ei koske niitä. Louvre-180 ja -yla katsomatta. Parit: `parit-av-keski/`, `parit-av-20/`. ND:n kolmiot 150 → 221 (Y): odotettua, KS:lle kerrottu; Y:n versiota ei katsottu erikseen.
Kolmiot 234 648 → 1 447 laskettu, ei mitattu. Junaan vain mitatulla luvulla ja omistajan sanalla; ennen junaa testi, joka vertaa ääriviivaa pelin lukemaan malliin. Aloittamatta (järjestys KK:lta): rosoisuus; mallin valo kääntyy kameran mukana, varjo ei.

## 4. USVA: OMISTAJA 22.54 VALITSI a, OLETUS KOKEESSA 074dc595e (`_tyo/linssiseppa2/usva-kauas-ajo34b/ARVIO.md`)
Pariisin kokeeseen, EI junaan. Haara `linssiseppa2/usva-kauas`, testit 21/21, unity-tarkistus 0 virhettä. Kulmat 55° ja alle täsmälleen ennallaan testillä; pelikuva puuttuu (lista yllä).
AUKI (PT): 65°:n yläreunan vyö, kaukaisen kaupungin raidoitus, La Défensen läpikuultavat tornit 85°:ssä, maan viivan syy (75°, b ja avoin), muisti (iPad vain luvalla).

## 5. MERI: LÄHDE SELVITETTY, VALMIS (`_tyo/linssiseppa2/meri-ruudukko/ARVIO.md`)
PT 23.2x: saa selvittää lähteen, ei koodia eikä muutosta muihin maihin. Tulos: ruudukko on jo pohjasarjan JPEG-lohkoissa; pelin väritys vahvistaa eroja (vaihetta ei paikannettu). Merikorjaus ei auta tähän. Korjaus koskisi koko maailmaa: omistajan päätös. PT:lle lähetetty; ei jatkoa ilman sanaa.

## 5b. KADUN KATKOS (KS, PT pyysi): jonossa, ei aloitettu
Kuva `_tyo/karttaseppa/parit-yhteinen-34/rajaukset/katkos.png`, r1b-eiffel-092-nyt|uusi, rivi noin y=1700, x 880-1070. KS:n arvio: pituus noin 2,2907°, palaraja 2,29065° (z16/z17), ei varmistettu toiselta kameralta. KS:lle sanottu, että Valoseppä ottaa tämän järjestyksessä äärivivojen jälkeen. Yön sääntö koskee: enintään 2 yritystä tai noin 30 min.

## 6. VANHAT
Taivas v2 #2182: kokeena vain Pariisissa (omistaja 22.15), ei lisätyötä. Usvakoe b3bff978f (45°): kelpaa kokeena, ei junaan. Pont d'Iéna vaalea kaista on omistajan päätös 18.09; kävely- ja metrosillat ohuina 17.24.
Jonon lopussa: `git show origin/linssiseppa2/luovutus-20261106-1826:docs/raportit/viesti-valoseppa-luovutus-20261106-1826.md` kohta 6 (lippu, paletti, räystäs, Puu-3, siltakuvat), `us-nd-85`:n tummat merkit. Tausta `_tyo/karttaseppa/lahialue-20261106/LUOKITUS.md`.

## TEKNIIKKA
zsh: `"${C}:refs/..."`, `$Y:A` on muokkain. Python + PIL `/opt/homebrew/bin/python3`; numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`. `unity-tarkistus.sh` on `Linssit-testit/`:ssä, aja `sh ./unity-tarkistus.sh`. Kartta-ajuri: `SAUMAKOE=<ulos> sh ./kaanna.sh SaumaZ12Koe` (k32, Kartta-testit). Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara on jäljessä (85 omaa tiedostoa, kaikki luovutuksia, HEAD 9b98b5c23 etäpalvelimella): luovutus plumbingilla (väliaikainen GIT_INDEX_FILE, read-tree origin/main, hash-object, update-index, write-tree, commit-tree, push). Palaparit `/private/tmp/*/Matkakirja/*/laatat/elava/mvt/<z>/<x>/<y>.pbf`. Kuvat täysikoossa rajauksina: Read-työkalun pienennys tekee vääriä portaita.
