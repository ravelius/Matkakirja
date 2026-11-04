# Natiivisepän luovutus 4.11.2026 klo 02.08 (konteksti noin 28 %, 7.37)

Korvaa luovutuksen -20261104-0129 kohdat "HETI NOLLAUKSEN JÄLKEEN", "ENSIN" ja "AVOINNA häivytyksessä". Muu siitä on voimassa: KK:n lista, HAARAT, GP, f1fb45f10, Selvitetty, AVOIMET (`git show 97afe2e4c:docs/raportit/viesti-natiiviseppa-luovutus-20261104-0129.md`).
Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).
Vuoro aina JU:lta. Skripti ajetaan `zsh .../tyokalut/esikatselu.sh` (ei suoritusoikeutta); Kartta-testit `sh Kartta-testit/kaanna.sh` (zsh rikkoo viitteet).

## HETI NOLLAUKSEN JÄLKEEN
1. **iPad-todistus odottaa JU:ta:** /Users/Shared/Claude/proto-3d/lokit/julkaisija-k24-iso-3332c8e15, kärki 3332c8e15, sk-ipad-k24.txt (46 kuvaa). KK hyväksyi sen teknisenä todistuksena, ei pinnan hyväksyntänä: saumat, reuna, häivytys, hiusviiva, Alma, muisti, kulu. Katso täysikokoisena h-0-30 … h-0-10, h-0-21-paluu, h-lansiraja, silta-*, v-*. Kuvat PT:lle. Ei ollut valmis luovutushetkellä.
2. **d82d501c0 ajamatta** (z11-kadut 0,5): pyydä JU:lta L2-vuoro, sk-z11-todiste.txt. Katso e-0-13: 3332c8e15:ssä z11:n ohuet kadut katkesivat pikseliviivoiksi kertoimella 0,375 (lokit/esikatselu-20261104-015532, Boulognen puolella). Jos iPad näyttää pätkimisen myös kertoimella 0,375, tämä on korjaus siihen.
3. **Nähtävyyshaamut 0,15:llä (PT 01.54, kuuluu minulle):** esineen alfa = näkyvyys × esineen oma korkeus_m-häivytys (PiirrosKerros.Esineet.cs:334). Arvoja ei ole luettu. Korjaus nahtavyydet-218:aan ja mergaus yhdistelmään (säännöt -0129:n HAARAT-kohdassa). Kerrottu PT:lle: tehdään iPad-kuvien jälkeen.
4. **Pystyreuna 2,4609 kuvissa 0,17 ja 0,15:** laskettu kuvasta; z10/z11 päätelty siitä, että lokissa oli samaan aikaan pyyntöjä kummaltakin tasolta (ei palakohtaista todistetta). Tavallisella kartalla, ei tehty. Katso iPad-kuvasta, näkyykö sama.

## Tehty tässä sessiossa
- **98e21fda0 katsottu:** hiusviiva pois c:stä ja d:stä (täysikokoiset rajaukset). Alma, Alexandre, Concorde ilman näkyvää vikaa kuvasta, ei mitattu. Kuvat kertovat myös palasaumat nd-lahi:ssa ja silta-kuvissa; pohjan osuutta ei varmistettu.
- **Vinjetti ffa606443 ajettu 68ad57497:llä:** varjostin kääntyi; c-0-17 soikea. d-0-15:ssä suora vyö palasi, korjattu 158550a59 (VinjettiSade: VinjettiHidas 0,7, VinjettiLoppu 0,85; raja täyttyy 0,15→0,13; esineet ennallaan). 794b96343:n d-0-15: soikio, PT katsoi, KK:lla.
- **Sauman syy varmistettu:** pyyntöloki (lokit/esikatselu-20261104-014709/pyynnot.tsv): 0,13:lla z12:sta vain palstat 2074–2075, eli e-0-13:n sauma on z11/z12. Lippu syntyy, kun lippu-vahti luo Documents/pyyntoloki.txt nollauksen jälkeen; vahti oli scratchpadissa ja poistuu sen mukana: tee uudelleen tarvittaessa.
- **z11-korjaus 3332c8e15 + d82d501c0** (ElavaTyyli.cs rivit 323 ja 512, Versio p24z; VS:lle rivi annettu): koealueen z11 saa nurmen, katukerroin 0,5. 3332c8e15:n e-0-13: Boulogne ja Vincennes vihreinä molemmin puolin rajaa, katuleveys lähes sama. Tarkkuusero rajalla yhä näkyvissä (z11 on suurennos), ei poistu tällä.
- VS k25 7967cf01c: VS kokeili merge-treellä, vain Versio-rivi törmää (p25 / p24z), yhdistelmään uusi versio; ajamatta. k25 kaventaa KatuLeveysM:n.
- VS:lle kerrottu: k24:n kermaiset ratapiha- ja halli-alueet katkeavat z11-palstarajalla (e-0-13, x noin 2570). Ei NS:n.

## HAARAT
- **natiiviseppa/haivytys-k24-218 kärki d82d501c0** = 68ad57497 + k24 290427574 + 158550a59 + z11. Peilissä natiivi-backup. **EI junaan eikä ämpäriin.** Kartta-testit 611/611.
- natiiviseppa/haivytys-218 kärki 158550a59 (610/610). haivytys-koe-218 68ad57497 jäi; ei uusia ajoja sille.
- Worktree wt/proto-natiiviseppa-maskik4 on haarassa haivytys-k24-218.

## Skenaariot (_tyo/natiiviseppa/aluekuva-koko/)
sk-ipad-k24.txt (otsikkorivillä lukee 794b96343, ajettiin 3332c8e15:llä), sk-z11-todiste.txt (b, c, d, e + nimet + KS:n kohta), sk-haivytys3.txt.

## KS
`nimet laske` annettu (0,13 ja 0,012): jonot nimet 2995, laatat 3050–3055 alfa 0,00, esineet 3060–3081. KS:llä on rivi ja kuva; ei toimia NS:ltä. d-sillan vaalea kaide ja nimet 76d11201a (-0129:n kohta 4) tekemättä seuraavaan yhdistelmään.

## Avoimet häivytyksessä
- Kaukaa saapuessa kerroksen kytkeytyminen (120 km): ei testattu liikkeessä.
- Muisti häivytyskorkeuksilla: iPad-ajon tulos.
- y-laajin laskettuna näkyvyys noin 23 %: KK arvioi.
- KK:n lista, kohdat 2–4: aloittamatta (ks. -0129).

## LISÄYS 02.18 (sitoo, ohittaa ristiriidassa edellä olevan)
**KK 02.11 (KORJAUSLISTA, osio "NS: häivytys 794b96343"), PT 02.1x: jos korjaus valmis ennen 03.15, sha VS:lle koko Pariisin yhdistelmään (takaraja 03.30).** Vinjetti hyväksytty suunnaksi. EI:
1. **Oikea pystyreuna** (d x noin 2420, c sama paikka; rajaus Joinville-le-Pont): tiet katkeavat ja siirtyvät, ei pelkkä tarkkuusero (lokit/esikatselu-20261104-015532/d-0-15.png). "Ei saa näkyä missään zoomissa." **SYY AUKI:** lon 2,4609 laskettu kuvasta; z10/z11 päätelty, koska lokissa oli samalta ajalta pyyntöjä kummaltakin tasolta. Z10 on esipoltettu, Z11 elävä tyyli; siirtymää ei selitetty. Mac valitsee tason 640×480-ruudusta (pallo.maximumScreenSpaceError, KarttaKerrokset.cs:113 `maasto sse`), joten iPadilla reuna voi olla eri zoomilla: katso ensin iPad-kuvat.
2. **z11/z12-saumat e:ssä:** nurmi ja kadut korjattu; tarkkuusero rajalla yhä (z11 on suurennos). KK arvioi uudesta kuvasta.
3. **Haamut: tehty:** korkeus_m [16600, 17800] (nahtavyydet-218 204104d31), laskettu 0,13 noin 16 km ja 0,15 noin 18,5 km. Ajamatta. Sääntötiedosto _tyo/natiiviseppa/esineet/saannot-isoisa-2029-60.json. Muutos korvaa kohdan "Haamut" (HETI, 3) yllä.
Kärki nyt **natiiviseppa/haivytys-k24-218 b70ee175a** (testit 611/611, ajamatta; EI junaan). JU:lle pyyntö: L2 b70ee175a + sk-z11-todiste; iPad 3332c8e15 tai b70ee175a, JU kertoo, kumpi.
HUOM data: nahtavyydet-218:aan aina k4vt-alue, yhdistelmään koko (tee-esineet.py). Väärä syöte muuttaa puiden paikat; tarkista ero ennen committia.
VS k25 7967cf01c ei ole tässä haarassa: Versio-rivi törmää (p25 / p24z).
KS: KK 02.13 arvioi nimet; ei NS:lle.
