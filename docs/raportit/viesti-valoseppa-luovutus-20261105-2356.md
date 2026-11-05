# Valosepän luovutus 5.11.2026 klo 23.56

Korvaa luovutuksen -2340. Syy nollaukseen: konteksti 26 %, pehmeä raja (kontekstivahti).

## KK 23.56: ENSIN TÄMÄ
KK: 18 siltaa kelpaavat kokeena, ei junaan; jatka rakennuksiin, Madeleine ensin. Omistaja näkee sillat aamulla, viat kerrottuina. Tee nämä SAMAAN seuraavaan ajoon Madeleinen kanssa, ei omaa ajoa:
1. SILLAN PÄÄ: kansi laskee rannalla loivasti kadun tasoon. KK:n sanoin pystyseinä ja sen varjo saavat sillan näyttämään lankulta kartan päällä, varsinkin Pont Neufissa. Kartta pysyy tasaisena; vain sillan oma pää laskee. Koskee myös Pont Neufia ja Pont Alexandre III:a, joilla on oma rakentajansa, ei vain `Silta`-funktiota. EI ALOITETTU.
2. NIMI: Pont Neuf -nimi katkeaa sillan alle (s-et). Nimi kokonaan tai ei ollenkaan. NS:llä sama asia taloissa 30e34cc9e (nimet päällä): käytä samaa tapaa, jos sopii. EI KATSOTTU.
3. KAIDE: sahalaita vain, jos korjaus on helppo.
Pont au Double: selvitä syy vain, jos selviää samalla. Omistajan linja on oikeat mitat (21.49).

## TILA
Koodi bdc211ab8, haara `linssiseppa2/ohjelmakohteet`, viety natiivi-backupiin (etä `natiivi-backup`, ei origin), worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan.
- Sillat 9cb6435e4 katsottu ajosta /Users/Shared/Claude/proto-3d/lokit/esikatselu-20261105-234043, kuvat ja havainnot lähetetty KK:lle ja rivi PT:lle 23.5x. KK:n vastaus on ylinnä.
- bdc211ab8: `LuoSeuraava` luo yhden kohteen per ruutu, kohteet piilossa kunnes kaikki valmiina, keskeneräinen luonti vapautetaan kun poistutaan alueelta. EI KÄÄNNETTY EIKÄ AJETTU: OhjelmaKohteet.cs ei ole testikäännöksessä. Tarkista seuraavassa ajossa `grep "pitkä ruutu" unity.log`: Ohjelmakohteet oli 63 ja 59 ms, 22 verkkoa, "luotu" 2 kertaa.
- Älä pyydä JU:lta vuoroa vain tätä varten; ajetaan Madeleinen kanssa samalla.

## HAVAINNOT SILLOISTA (lähetetty KK:lle)
Kunnossa: kaaret ja pilarit vedessä, päät rannalla, väri sopii, kannessa ei saumaa, karttaan piirrettyjä siltoja ei näy rinnalla.
Puutteet, ei vielä korjattu (mitä korjataan: ylin kohta):
- Kaiteen reuna sahalaitainen lähellä, eniten Pont Neuf (s-et).
- Sillan pää on pysty päätyseinä, ei lasku kadulle (Concorde, Sully).
- Pont au Double: vain noin kolmannes veden päällä, kartan joki on siinä kapea (s-lp, s-pohj). Arvio kuvasta silmämääräisesti, syy ei selvitetty.
- Notre-Damen tornit peittävät siltoja osasta suuntia (s-pohj).
Kiila: ei näy rajatuissa ruuduissa 186–231 (cac1b61ae toimii tässä otoksessa). Kaiteen reunassa on yksittäisiä tummia pikseleitä: rajauksen (720, 550) 90×90 alin arvo 32, ruudussa yleensä yksi alle 45.
Kartan kirkkaushyppy näkyy tässäkin ruuduissa 192–193; kerrottu aiemmin KS:lle.

## SEURAAVAKSI (järjestyksessä)
1. Tee ylimmän kohdan korjaukset 1–3. Muuta siltoja ei hiota ilman pyyntöä (edellisen luovutuksen kohta 5 pysyy: Tournellen pylväs, Pont Notre-Damen keskikaari, Sullyn sivukaaret vasta rakennusten jälkeen).
2. Madeleine (osa A; OMISTAJAN KORTTI 22.09, suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261105-pariisi-rakennukset-ohjelmalla.md). Kuvat on haettu, EI KATSOTTU: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/a/viite/Madeleine-{0,1,2,3,7}.jpg. Katso ensin (muisti: oikea rakennus ensin), sitten rakenna. OSM way/54180046: 12 kärkeä, 128×43 @-116°, keskipiste 48.869911 2.324353, height 36; fr.wikipedia 108×43, 30 m. Ristiriita ratkaistaan kuvasta ja jalanjäljestä; 128 m voi sisältää portaat, tarkista. Jalanjäljen kärjet on vielä purkamatta (`osm-a.json`, ks. `analysoi-a.py`).
3. Rakentaja: funktio samaan tapaan kuin `HotelDeVille`/`Silta` (partial OhjelmaKohdeGeometria), kohde listaan `OhjelmaKohteet.KaikkiKohteet` (`Lat/Lon/Akseli/Tee`). Akseli: x = itä·cos a + pohjoinen·sin a. Työkalut: `Rakentaja.Pyora` (pylväät), `Puristus`, `Katto`, `Seina.Laatta/Rivi/Ikkuna`. Testit ja offline-kuva kuten -2340:ssa: `sh /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/aja-geometria.sh`, `OHJELMAKOHTEET_VIENTI=<D>/obj`, `python3 <D>/esikatsele.py <D>/obj <tulos> <nimi> 45 30 1000`.
4. Ajo JU:lta: yksi kysymys, pieni kuvalista. Kuva KK:lle, kopio PT:lle. Sama ajo todistaa bdc211ab8:n ja korjaukset 1–3 (myös Pont Neuf kuvakulmasta s-et).
5. Sitten Palais Bourbon (relation/1019368, jäsenet haettava `lisaTiet`), Pompidou, Tour Saint-Jacques, Saint-Eustache, Saint-Sulpice. Mitat luovutuksessa -2340, kohta AINEISTO OSALLE A.

## AINEISTO
Kaikki kohdassa AINEISTO OSALLE A ja RAKENTAJA luovutuksessa docs/raportit/viesti-valoseppa-luovutus-20261105-2340.md (lue nekin; OhjelmaKohdeSillat.cs:n tee-sillat-cs.py kirjoittaa tiedoston kokonaan uudelleen).
Uusi: `a/hae-viite.py listaa <kohde>` ja `a/hae-viite.py hae <kohde> <i> ...` lataavat Commonsista 10 s:n välein vain lupalistan lisenssit; aja `python3 -I`. Kohde on osa nimeä (`Madeleine`, `Pompidou`, ...), tiedostot `a/viite/<kohde>-<i>.jpg`. Lisenssit: Madeleine-0 CC0, muut CC BY-SA 4.0; pelkkiä vertailukuvia, ei pelin sisältöä.
Kuvarajaukset: `arkki-rajaa.py` tai pieni oma skripti; saumat täysikoossa ennen "ei näy" -arviota.

## MUUTA
- Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut.
- `kierra 20 2` ei liikuta kameraa, `kierra 40 1` liikuttaa. Ei selvitetty.
- Työlistahookin Pariisi-rivit eivät ole Valosepän kirjaamia; en päivittänyt niitä.
