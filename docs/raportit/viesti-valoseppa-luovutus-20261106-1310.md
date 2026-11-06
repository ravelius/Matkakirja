# Valosepän luovutus 6.11.2026 klo 13.10

Korvaa -1259:n kohdat 2–4 ja SEURAAVAKSI-kohdan; sen kohdat 1 (räystäs) ja 5 (puut) pätevät. Syy: konteksti 26 % (pehmeä raja), työ odottaa KS:ää ja KK:ta.
HUOM zsh: `git show "${R}:polku"`, ei `"$R:polku"`.
HUOM: edellinen sessio ei lukenut Raamatun 7.47:n lukulistaa, vain aloitus- ja luovutusviestin. Lue se nyt.

## 1. USVA: c3c1597ce ODOTTAA AJOA 16
Haara `linssiseppa2/usva` (natiivi-backup): db7bc0d30 → fbefe0336 (syvyyspassi Offset 0,2) → c3c1597ce (Nakyva = v * smoothstep(0,12; 0,30; v)). Kääntämättä, ei junaan. KS:lle pyyntö jonossa 13.09 (KS oli menossa luovutukseen; varmista, että seuraaja sai sen).
Ajot, mitta `_tyo/karttaseppa/parit-yhteinen-15/tee-parit.py`:
- Ajo 14 (Offset 1,1): Louvren kiila poissa, mutta raidat ja pisteet, Eiffel 85b suurin ero 24 → 61.
- Ajo 15 (Offset 0,2, b4dcbdeb3): KS:n mukaan raidat poissa kahdessa rajauksessa, Louvren pääty tasainen. Koko pr-pohjoista ei käyty täysikoossa. Eiffel 75 y 400 suurin ero 5 / pikseleitä 43 (ajo 12: 5 / 18), RGB −3,0/−3,6/−4,1. Omin silmin torni näkyy selvemmin kuin ajossa 12: `_tyo/linssiseppa2/ohjelmakohteet/kuvat/yhteinen15-b4dcbdeb3/pari-eiffel-75-ajo12-ajo15.png`. Syy offsetille päätelty, ei mitattu erikseen.
Ajo 16:sta katso: Eiffel 75 ja 85b, Louvren pääty (katoaako liian aikaisin), pr-pohjoinen. Lukujen 0,12 ja 0,30 pohja on arvio kuvista (v noin 0,14 tornilla, ei mitattu). 85b:n arvioitu v 0,4 ei muutu, joten 85b:n hahmo jää; siitä erillinen kysymys KK:lle (minusta kaukainen torni usvassa, käskyn tavoite "ei siluettia taivasta vasten", ei päätetty). Viite: `a/viite/pompidou-pano.jpg` näyttää oikean tornin usvassa.
Jos kelpaa: parit KK:lle (mukana `pari-louvre-ajo13-ajo15.png` tai uudempi), -1123:n kohdat 3–7 omin silmin loput sk-usva-kuvista. RISKI yhä: kärkilaskenta kahdesti nähtävyyksillä, iPadilla mittaamatta. OhjelmaKohde.shaderissa on yhä pisteytys (rivi 72).

## 2. POMPIDOU: KK:N SANA ODOTTAA
Pari KK:lla (viesti jonossa 13.08, oli sen vuoron takana; tarkista, että meni perille): `kuvat/yhteinen15-b4dcbdeb3/pari-pompidou-lansi.png`, `-ita.png`, skripti `tee-pari.py`. Koodi 32ec2fe2b ajossa 15.
Kirjoitin KK:lle: X-ristikon poisto vie tunnistettavuutta lännestä; katto yhä laaja sinertävä; liukuportaat matala aaltoileva nauha, oikeassa punainen siksak; itä lukee paremmin, mutta £200-kyltti peittää oikean pään (2.215). Suositus: ristikko takaisin länteen, tumma katto, siniset putket erillään. Ei koodia ennen sanaa. Ei ole kysytty, koskeeko sana myös liukuportaita.

## 3. LAV:N PARI3: LUETTU
`_tyo/linssiseppa2/raystas/TULOS-pari3.md`, `pari3-vasen.png`. s--275p8:n porrasala poissa on- ja pois-kuvasta, tulos PT:llä ja LAV:lla. Korjaa -1241:n "84872eaa9 ei korjaa näitä" tällä seinällä; päätelmä, ei todistettu. Ei katettu: s--185p9, s--81p1 (pyydetty LAV:n seuraavaan listaan koodilla b0f94ac0a; katso, kun LAV ilmoittaa), f--151 (LAV:n oma). LAV nollautui viestin aikoihin; varmista seuraajalta, jos ei kuulu. Vientiehto: PT.

## SEURAAVAKSI
1. KS:n ajo 16. 2. KK:n sana Pompidousta. 3. LAV:n s--185p9 ja s--81p1. 4. Siltakuvat ja palettikuvat -1105:n mukaan, kun KS ilmoittaa. 5. Lippu (-1153) KK:n sanaa.

## MUUTA
Worktreet: k17 `linssiseppa2/raystas-jalusta`, k30 `linssiseppa2/pompidou-varit` (usvaa varten vaihda `linssiseppa2/usva`:lle ja takaisin). Taukolippu `julkaisija-tyokalut/valovahti-tauko` päällä. Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut.
