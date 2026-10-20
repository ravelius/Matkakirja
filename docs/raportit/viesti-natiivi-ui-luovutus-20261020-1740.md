# Natiivi-UI: luovutus 20.10.2026 klo 17.40 (kova raja)

Korvaa -1622:n. Historia: docs/raportit/viesti-natiivi-ui-luovutus-20261020-1622.md (Louvre 15.40 -erä) ja git log. Id:t
/Users/Shared/Claude/osoitekirja.md. SIMU HARVOIN: näihin eriin ei simua; automaattiset testit → NS runkoon → omistaja katsoo pelistä.
Proto-worktree /Users/Shared/Claude/wt/proto-natiivi-ui-museo-teoskortti-208 (repo proto-3d/Matkakirja-proto), nyt haarassa
natiivi-ui/siirto-pehmea-208, puhdas.

## TILA
1. SALANAPPI (omistaja 17.07) RUNGOSSA: natiivi-ui/salanappi-208 f8c0bc0ce → juna-208 202a17116. OSA II × 5 → testinäkymä
   (UI/Testinakyma.cs, puhdas Peli/Testihypyt.cs, testit Peli-testit TestihypytTestit). Linkki matkakirja://testi[/monalisa|sokkelo|
   peli/<id>|linssi/<id>], QA "ui testi [tunnus|lista]"; vain testiversiot (Kehitys/TestFlight/simu/editori). Valmis.
2. METROKARTAN PEHMEÄT TEKSTIT (omistaja 17.25, PT: juna 208 odottaa tätä) VALMIS JA LÄHETETTY NS:lle 17.3x:
   natiivi-ui/siirto-pehmea-208 63d0fe853 (pohja juna-208 e3f88ff4e). OpasMetrolinja.Siirtotila (vain nykyinen nimi + tekijärivi,
   ristiin merkin tahdissa, paino ei vaihdu, reunarivit häivyttäen, AsemanRivi-asettelukorjaus MuseoTaulu.PaivitaSiirros, Asetu alussa),
   perillä ristiin nimikyltin kanssa SiirtoRistiS 0,6 s, vaalean salin sävy color-siirtymällä. Ydin/Museo/SiirtokarttaRisti.cs + testit
   (Linssit-testit 2180/2180, tarkista.sh puhdas). NS 17.4x: vastaanotettu, yhdistyy puhtaasti e3cff21f6:n päälle, odottaa PT:n OK:ta
   seuraavaan kokoamiseen. → Uusi sessio: ei toimia, ellei NS kysy.
3. JUOKSUPELIN KUVATEKSTI RUNGOSSA (NS 17.4x: e3cff21f6, PT:n kiire-OK iPhonelle): natiivi-ui/juoksu-kuvateksti-208
   3cf7887fa (sisältää merge pelikoodari/avaus-208 088f99027). UI/Pelit/JuoksuKuvateksti.cs kuuntelee JuoksuAvaus.Tapahtui
   (LentoAlkaa esiin, KuvatekstiPois ulos, OhjausPelaajalle varmistus), teksti "Peking, kesä 1914 · Kielletty kaupunki" (omistaja 17.23),
   pohja mk-astroavaus__otsikko/__nimi + Latauskuva.Luettava, QA "ui juoksukuvateksti [pito|pois]". Näkyy vasta kun PK:n pelikytkentä
   kutsuu JuoksuAvaus.Laukaise. Jos PK:n avausaikoja muutetaan, nimet pysyvät (PK).

## SEURAAVA ERÄ (ei aloitettu; omistajan päätös 17.31 PT:n kautta, kaikki museot, junaan 208 jos ehtii, muuten seuraavaan, ei simua)
TAULUN TUTKIMINEN EI VAIHDA TILAA: zoomaus ja liikuttelu eivät koskaan vaihda tilaa (nyt ulos nipistys voi viedä vapaaseen kulkuun).
Ulos nipistäessä kuva pysähtyy pehmeästi koko tauluun. Kun pelaaja on pysähtynyt ja nipistää UUDELLEEN ulos (ei saman eleen aikana),
alareunaan pieni kysymys "Haluatko kulkea vapaasti museossa?" → Kyllä = saliin (vapaa kulku), Ei = takaisin tauluun. Kysymys olemassa
olevalla korttipohjalla; jos sopivaa ei ole, kysy ensin PT:ltä (UI-POHJAT). Aloituskohdat: MuseoEleet (Linssit/Unity/MuseoEleet.cs,
nipistys), MuseoKierros.Zoom / AutoZoom / Vapaa (Ydin/Museo/MuseoKierros*.cs), MuseoSovitin zoom-komennot, MuseoTaulu (napit).
Etsi ensin, missä nipistys ulos vaihtaa vapaaseen (grep "Vapaa(" ja "nipist" MuseoEleet/MuseoSovitin); kysymyskortille ehdokkaat
OlavinlinnaAlku (KORTTI tumma) tai Vahvistus.cs. Testit Ydin-puolelle (Linssit-testit), kameratesti/liikevahti ajossa tarkista.sh:ssa.

## Opit (uudet)
- Uudet tyypit Matkakirja.Peli-nimiavaruuteen: yksilölliset nimet (Askel/Hyppy törmäävät muualla) → TestiAskel ym.
- Peli-testien kääntäjä ei näe System.Uri:a (System.Private.Uri suodatettu) → vältä Uri puhtaassa koodissa.
- Liikevahti laskee jokaisen Mathf.Lerp:n: peitto- ja keskikohtalaskenta puhtaaseen Ydin-funktioon (testattavissa), ei poikkeusmerkintää.
- PK:n haarat eivät aina ole juna-208:n päällä: merge tuo mukanaan muut kommitit → kerro NS:lle riippuvuus.
- Tekstimuokkaukset .tmp + os.replace -skripteillä scratchpadista (ei sed -i).
