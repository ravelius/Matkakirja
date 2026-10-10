# Laitetestaaja: karttakierros TF 180 (04c2af36), iPad-simu, 11.10.2026

**Tulos: 31/31 kohdekaupunkia avautuu ja Ohita toimii; 4 kaupungissa (Wien, Vilna, Luxemburg, Marseille) esittely ei käynnisty ilman Ohitaa (VIKA); maakorttia ei näy natiivikartalla (HUOM).** Pulun avaus ja sulkeminen OK, kehittäjätilan kaupunkivalinta OK.

Ajo: iPad Pro 13" -simu `3622D89D` (T7), `Data/Raw/kaannos.txt` = 04c2af36 (`proto-3d/lokit/juna-1.1.180-04c2af36`), Julkaisijan SIMULAATTORI NYT 00.22, ajo 01.07–02.45. Aloitus uusi peli → Lontoo (todistusajon vakio; Pariisiin siirryttiin oppaan kautta, koska kehittäjätilan kaupunkivalinta = ☰ › Vaihda kohde). Mac mykistetty (`aani mykistys` OK). Kone kuormassa (load 53–528) → vain toimintatesti, ei fps/laatu/A-V. Kuva-arkki: `docs/raportit/kuvat/laitetestaaja-karttakierros-180-20261011/kuva-arkki.jpg`; kaikki kuvat + tulokset `proto-3d/lokit/laitetestaaja-karttakierros-180-20261011/` (kuvat/*.jpg, tulos.tsv, kaupunki.sh).

## Askeleet
| # | Askel | Tulos | Todiste |
|---|---|---|---|
| 1 | Uusi peli → kartta (Lontoo) | OK | 50-kartta |
| 2 | Linssit › Kuumailmapallo › Aktivoi → opas auki (Aasia/Afrikka/Eurooppa + Suosikit) | OK | 51-kuumailma, 52-opas |
| 3 | Pariisi oppaan kautta (Eurooppa › Ranska › Pariisi): siirtoruutu + Poistu, esittely alkaa 4 s, lento 18 s, kohdelista, ⏭ Ohita → Notre-Dame | OK | 55-pariisi-*, 56, 57-* |
| 4 | Kaikki 31 kohdekaupunkia (☰ › Vaihda kohde › maanosa › maa › kaupunki), kussakin: valinta, siirtoruutu, esittely, saapuminen, ⏭ Ohita, Kysy/Liiku-napit | 27 OK, 4 VIKA | kaupungit-tulos.tsv, c-<kaupunki>-1/2/3 |
| 5 | Maakortti ja pääkaupunkipisteet | HUOM (ks. alla) | 72-eurooppa-*, 73-* |
| 6 | Pulun avaus ja sulkeminen | OK | 71-pulu-1, 71-pulu-2 |
| 7 | Kehittäjätilan kaupunkivalinta (☰ › Vaihda kohde; kehittäjätila `kehittaja 1`) | OK | 58-valikko, kaupungit-tulos.tsv |

### Kaupungit (31 ajettu: oppaan kaikki kohdekaupungit kaikissa 21 maassa)
OK (esittely alkoi 2–11 s valinnasta, saapuminen ~30–48 s, ⏭ Ohita siirsi seuraavaan kohteeseen, kohdelistan 7–10 riviä, 0 virhelokiriviä): Sofia, Pariisi, Amsterdam, Bryssel, Madrid, Barcelona, Sevilla, Granada, Dublin, Reykjavík, Lontoo, Edinburgh, Rooma, Firenze, Sisilia, Venetsia, Ateena, Kreeta, Valletta, Oslo, Bergen, Lissabon, Krakova, Bukarest, Tukholma, Berliini, Košice.

## Vikalista PT:lle (vika · kuva · todennäköinen rooli)
1. **Wien, Vilna, Luxemburg, Marseille: esittely ei käynnisty.** Opas kysyy ensin kysymyksen (loki: `kysyy "Mitä haluat nähdä …?" [Esittele kaupunki | …]`, Luxemburgissa "vanhan linnoituksen, Euroopan instituutiot vai jotain muuta?"), mutta ruudulla EI näy valintanappeja eikä tekstiä; kamera jää korkealle ilmakuvaan. Yli 190 s odotuksen jälkeen (ja 25 s uusinta Luxemburgilla, d-lux-*) esittely käynnistyi vasta ⏭ Ohita -napilla ("seuraava (ohitettiin ) → kohdelistan kierros, ensin Stephansdom"). Pelaaja jää jumiin ilman ohjetta. · c-Wien-2, c-Luxemburg-2, c-Vilna-2, c-Marseille-2, d-lux-3…25 · Natiivi-UI (kysymysvalinnat) / Linssiseppä (oppaan aloituskysymys).
2. **Maakortti puuttuu natiivikartalta**: Euroopan yleiskuvassa (`aja … 25°`, 12°, 40°) ei näy maan perustietokorttia, ei maiden nimiä; napautus maan päälle (73-tap-maa) ei avaa mitään. Pääkaupunkipisteet ovat (40°: rajat + pienet pisteet + pienet nimet), mutta nimet eivät ole luettavia (erittäin pienet) ja mikään ei ole napautettavissa. Ison-Britannian lähikuvassa (70-kartta-lopussa) ei pääkaupunkipistettä eikä maakorttia. · 72-eurooppa-25/12, 73-eurooppa-40, 73-crop · Karttaseppä + Natiivi-UI (maapaneeli on web-puolella: `js/pallolauta/maapaneeli.js`, natiivissa ei vastinetta?). Pariteettikysymys, ei oletuksella vika.
3. **Kehittäjäkonsoli + punainen shader-virherivi joka kuvassa** ("multisampled texture … Texture2DMS", alareunassa, myös karttanäkymässä ja ☰:n takana); kehittäjätila päällä, mutta shader-varoitus on myös oikeassa viassa. · jokainen kuva · Linssiseppä (shader).
4. **Oppaan kohdelista (vasen yläkulma) himmeä ja pieni**: Pariisin "Kaupunkikierros"-lista on luettavissa vain valittu rivi (59-tila): muut rivit hailakat. Huom/ulkoasu, ei toimintavika. · 59-tila, 57-ohita-3 · Natiivi-UI.

## Hyvää
- Pariisin siirtoruutu "PARIISI" + Poistu, lento 18 s, kohdelista ja ⏭ Ohita toimivat joka kaupungissa; esittelyn alku 2–11 s (kaupungissa ei jäänyt yhdessäkään latausjumiin).
- Saapumiskuvat (Colosseum, Akropolis, Belémin torni, Hlavná-katu, Amsterdam, Barcelona) näyttävät hyviltä; valokorostus kohteessa toimii.
- Pulun chat avautuu Pulua napauttamalla (tervehdys, 2 valmiskysymystä, näppäimistö + mikrofoni) ja sulkeutuu napautuksella tyhjään kartta-alueeseen; kartta palaa ennalleen.
- ☰-valikko oppaassa selkeä: Vaihda kohde, Kuvat: päällä, Näytä teksti, Mikseri, Lähteet, Poistu linssistä.

## Ei testattu / rajaukset
- Maakortin avausta ei saatu esiin natiivissa yhdelläkään tavalla (zoomit 12°–40°, maanapautus); ei tiedossa, onko ominaisuus tarkoitettu natiiviin.
- Kone kuormassa → fps/lataus ei mitattu; ääntä ei kuunneltu (Mac mykistetty).
- Pulun chatiin ei lähetetty kysymyksiä (generointi vain omistajan luvalla).
- Todistusajon vakiosarjaa (01–12) ei ajettu; ajo omilla skripteillä (`kaupunki.sh`), oikeat HID-kosketukset.
- Esittelyn "-2"-kuvat otettiin heti saapumisen jälkeen; osassa (Pariisi, Tukholma, Krakova) kamera on vielä laskeutumassa, joten kuvat eivät ole lopullisia saapumiskuvia.

SIMU VAPAA kun tämä raportti on kuitattu.
