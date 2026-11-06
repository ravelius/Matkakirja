# Valosepän luovutus 6.11.2026 klo 13.22

Korvaa -1310:n kohdan 2 (Pompidou). Sen kohdat 1 (usva, ajo 16), 3 (LAV:n pari3) ja MUUTA pätevät. Syy: konteksti 25 % (pehmeä raja), työ odottaa KS:n ajoa.
HUOM: tämäkään sessio ei lukenut 7.47:n listaa loppuun. Luettu: periaatteet, 7.4, 7.23–7.25, 9.5, 11.8, 2.213, 2.215, 4.40. Lukematta: 9.1–9.3, luku 2 (linssit), luku 6, luvun 12 komentosäännöt. Lue ne nyt.

## POMPIDOU: KOODI VALMIS, AJO KS:LLÄ
KK 13.10 (korvaa X-jäykisteiden poiston, väri-sana 12.53 pysyy): 1. ristikko takaisin länteen ilmavana teräsrunkona, tummat kerrokset takana, ei toimistoikkunoita, ei entistä vyyhtiä. 2. katto tummaksi ja putket erilleen, värit palettirajassa. 3. liukuportaat yhdeksi selväksi punaiseksi nousevaksi siksakiksi katutasolta yläkertaan, ei aaltonauhaa eikä irrallisia paloja. Seuraavaan yhteiseen ajoon, ei omaa ajoa, ei junaan.

Koodi: haara `linssiseppa2/pompidou-varit` (natiivi-backup, worktree k30):
- 474ebf7d5 KK:n kolme kohtaa. 3 794 → 2 876 kolmiota.
- f26fed3af oma lisäys, EI KK:n pyytämä: päädyt ristikoksi nauhojen tilalle. 3 156 kolmiota. KK:lle kerrottu; jos KK ei halua, kääntö on yksi commit.
Geometriatestit 19/19 (`_tyo/linssiseppa2/ohjelmakohteet/aja-pompidou.sh`). Unityssä kääntämättä, EI nähty pelissä. Esikatselu `ohjelmakohteet/rak-po/kk1310/` (oma piirto, ei taloja eikä varjoja). Tulos `ohjelmakohteet/TULOS-pompidou-kk1310.md`.

Viesti KS:lle 13.2x perillä: sha ja `ohjelmakohteet/sk-pompidou-sama.txt` (6 kuvaa, ui pois / ui paalle). Tarkista, että KS otti ne seuraavaan ajoon. Kuvarivit ovat kääntämättä; suunta 285 (itä) on arvio.

## PARI KK:LLE AJON JÄLKEEN (KK:n ehdot sellaisinaan)
"uuteen pariin sama kohde kokonaan, sama kulma ja rajaus, mittakaava kirjattuna kummallekin puolelle (m/px), kyltti ei peitä kohdetta. Jos piilotat kyltin parissa, kerro se. Mukaan kolmiomäärä ennen ja jälkeen."
- Viite `a/viite/pompidou-0.jpg` | `po-sama`, `po-sama-lahi`; viite `pompidou-pano.jpg` | `po-ita-sama-lahi`. Pohja: `kuvat/yhteinen15-b4dcbdeb3/tee-pari.py`.
- Kulma laskettu: Montparnasse → Pompidou suunta 47, 3,0 km, korkeuskulma noin 3°; pelin raja 85 eli 5°. Tarkistus: viitekuvassa länsisivu 270 px ja pääty 185 px eli 1,46; laskettu 1,43 (akseli 20°, sivut 168 m ja 60 m).
- Viitteen m/px noin 0,28 (laskettu 76 m / 270 px, ei mitattu erikseen). Pelin m/px samalla tavalla kuvasta; ajon 15 po-la oli noin 0,68 (arvio). Lähikuva 0,0013 arvioitu noin 0,3 m/px, ei todennettu.
- Kerro: kyltit piilotettu (`ui pois`). Kolmiot edeltä. Jos talot tai Tour Saint-Jacques peittävät 85:ssä, `po-sama-70`, ja kerro poikkeava kulma.

## KK:LLE JO KERROTTU, TARKISTA KUVISTA
X:t kahden jännevälin ja kerroksen kokoisia (oikeassa yksi): yhden ruudun X oli 0,68 m/px:ssä tiheä ritilä. Portaat 40° (oikeassa noin 30°): loivempi kumoutui suunnasta 85. Siksak on esikatselussa selvä viitekuvan kulmasta, mutta `po-la`:ssa matala; siitä oma rivi KK:lle, jos näkyy samoin pelissä. Kerrosten käytäväputket poistettu (irralliset palat). Väri PoPunainen jää rajan takia tiilenpunaiseksi: tarkista, riittääkö "selvä punainen" tummaa taustaa vasten. Valkoinen laski portin mukaan #D1CEC6:een.

## SEURAAVAKSI
1. KS:n seuraava ajo: usva (-1310 kohta 1) ja Pompidou-pari. 2. LAV:n s--185p9 ja s--81p1. 3. Siltakuvat ja palettikuvat -1105:n mukaan. 4. Lippu (-1153) KK:n sanaa.
