# Pelikoodari → Codex: KORJAUSPYYNTÖ jump_robe – vasen käsi ei pidä helmaa (KK 28.10. klo 03.1x)

Tämä tulee viittakorjauksen 082c66e50 rinnalle. Kaavun nosto pysyy pelissä pois, kunnes molemmat ovat kunnossa.

**Havainto (KK ja PK, sama sekä pelissä että Codexin omissa kuvissa):** jump_robe-hypyssä helma nousee morfilla, mutta mikään
käsi ei pidä sitä. Sivulta vasen käsi on ojennettuna eteen rinnan–kasvojen korkeudella koko 0,30–0,74 s, ja edestä se on irrotuksessa
lonkalla. Codexin `robe-motion-review-v1/qa/perus-jump_robe-0.png` ja `-90.png` (0,30 / 0,46 / 0,62 s) sekä
`perus-final-release-check.png` näyttävät saman: nostetun helman reunassa ei ole kättä. VISUAL-REVIEW.json:n "hem visibly lifts with
left hand" ei siis toteudu kuvissa. Omistajan linjaus: keisarin KÄSIEN liikkeet, niistä yksi kaavun nosto – käsi tekee noston.

Pelin puoli on tarkistettu: mikään ei ohita kättä (ei IK:ta; pelin käsikerros vain rikkoreaktiossa), luut ja morfi kulkevat samalla
kellolla, ja morfin paino seuraa käyrääsi (pelissä 0,69 s → 0,38). Pelikuvat vastaavat Codexin kuvia, joten korjaus tarvitaan liikkeeseen.

**Vaatimus:**
1. Vasemman käden sormet helman reunan ympärillä koko pidon ajan (0,30–0,62 s); käsi tarttuu helmaan ennen kuin helma nousee.
2. Helma nousee käden mukana: morfin painokäyrä ja käden korkeus samassa tahdissa, helman reuna käden otteessa joka hetkellä.
3. Irrotuksessa (0,62 → ~0,72 s) helma laskee sitä mukaa kuin käsi lähtee; ei hetkeä, jolloin helma on ylhäällä ilman kättä.
4. Sama perus- ja viitta-Puyille (viittaversioon samalla 082c66e50:n viittakorjaus). stairs_robe samalla periaatteella, jos sama puute.

**Tarkistuskuvat:** edestä ja käden puolelta (vasen) hetkillä 0,30 / 0,46 / 0,62 / 0,69 s, sekä pelin kuvien rinnalla.
Pelin nykytila: `posti/pelikoodari-codex-kaapu-kasi-pito-20261028/` (SHA256SUMS): `peli-40-*`, `peli-50-*`, `peli-689-*`
(-vasen = kamera hahmon vasemmalla puolella, -edesta = edestä; jump_robe 0,403 / 0,516 / 0,693 s, perus-Puyi).

Toimitus kuten v2: liikepaketit (sama rigi, solmunimet ja morfin nimi robeHemLiftLeft; jos morfi muuttuu, myös apply_robe_morph-aineisto)
+ SHA256SUMS + tarkistuskuvat. Vastaanotto PK (asetus peliin ja pelikuvat), hyväksyntä KK/omistaja.
