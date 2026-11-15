# Grand Châtelet #2253: kolme osaa, rakenteellinen osaparannus

Piha säilyi avoimena, mutta kokonaisuus ei läpäise kuutta vaatimusta. Portti on umpinainen ja A-osan pääkatot poikkeavat lähteen harjakatoista. Ei peliin hyväksyntää eikä uusia ottoja: kolmen otoksen lupa on käytetty.

| Tarkistus | Tulos | Näyttö |
|---|---|---|
| 1. Lounainen neliöpaviljonki ja telttakatto | Osittain | 04 ja06: nelikulmainen paviljonki ja pyramidikatto ovat mukana. Tarkka mitta ja liittymä jäävät avoimiksi. |
| 2. Länsipiha avoin, ei kattoa tai täyttöä | Läpäisee rajatun tarkistuksen | 05 ja06 sekä neljä lähdekoordinaatteihin asetettua pystysädettä: 0/4 osumaa sekä tuotoksessa että lähteessä. Ei koko törmäysgeometrian varmennusta. |
| 3. Itä–länsi-harjat ja lähteen erilliset kattomassat | Ei läpäise | B säilytti kaksi rinnakkaista harjakattoa. A:n isot katot muodostavat leveitä auma- ja risteäviä pintoja, jotka eivät vastaa lähdemassoja. |
| 4. Läpi näkyvä portti | Ei läpäise | 01 näyttää kiviaineksella umpeutuneen portin. Kuusi lähdeportin sädelinjaa osuu A:han; lähteessä kaikki kuusi ovat vapaat. Kohdistus on likimääräinen, mutta myös kuvahavainto osoittaa sulkeutumisen. |
| 5. Koillistorni korkein pyöreä osa | Osittain | 01 ja03: iso pyöreä torni nousee pienempiä porttiturretteja korkeammalle. Alkuperäistä 25 m korkeussuhdetta ei ole varmennettu; A:n korkein kohta on tuotettu kattomassa. |
| 6. Porttiturrettien konsolit | Osittain | 01: alaspäin kapenevat tukirakenteet ovat mukana. Lähteen 6,5 m ±1 m kiinnityskorkeutta ja tarkkaa konsolimuotoa ei ole osoitettu. |

## Mitä tehtiin

Lähdeverkon `ae77525c30ffbbb31d215f29df9049e937f58aa2` ositus A/B/C säilyttää kaikki 666 lähdekolmiota pinta-alaltaan. Alkuperäistä RAW/OBJ/GLB-aineistoa ei muutettu. C:n johdettuun ohjaimeen lisättiin kaksi tasaista saumakantta, yhteensä yhdeksän kolmiota. A ei muuttunut osituksen tarkennuksissa. B:n maksettu kuvasyöte on jäädytetty v2-ohjaimesta; v3 siirtää siihen C:n irtofragmentit vain lähdeosituksessa.

Jokaiselle osalle tehtiin yksi kokonaan uusi kuvasyöte harmaaohjaimesta, käyttäen hyväksyttyä v4-sarjaa materiaali- ja yksityiskohtaviitteenä. Sen jälkeen yksi H3.1 Max -otto per osa: Ultra, Triangle, tavoite2M, 8K, PBR ja Remove Lighting päällä; AI Complete ja Parts pois. Kolme Tripo-ottoa, 195 krediittiä. Kolme ImageGen-kutsua, rahakustannus ei näy työkalun vastauksessa. Työtunnukset, aloitukset, arvioajat, asetukset ja tiivisteet ovat osa-kohtaisissa job-lokeissa.

## Alkuperäiset ja kooste

Muuttumattomat GLB:t ovat T7:llä kansiossa `output/grand-chatelet-2237-20261115/tripo-2253/`. Jokaisessa on 8192²-värikuva ja 4096²-normaali-/metalli-karheuskuvat; ulkoisia riippuvuuksia ei ole. Yhteensä 5 655 760 kolmiota ja 252 172 276 tavua. Näitä Max-alkuperäisiä ei ole kevennetty pelimalliksi.

`assembled-inspection.blend` on vain tarkistuskooste. Osat siirrettiin yhteiseen lähdekoordinaatistoon positiivisella tasaskaalauksella, Z-kierrolla ja siirrolla. Ei peilausta, eri akselien venytystä, muodonkorjausta, saumojen hitsausta tai geometrian leikkausta. Kohdistus perustuu osan korkeuteen, rajalaatikkoon ja 500 pintaotoksen lähde-etäisyyteen. Se ei todista puuttuvien lähderakenteiden säilymistä. C:n kierrolle löytyi kaksi lähes tasavahvaa sovitusta (33° ja214°); valittu33° näyttää yleissijainniltaan L-siiven suuntaiselta, mutta tarkka sijoittelu ja saumat ovat edelleen alustavia.

Kuvat01–04 ovat neljä sivua. 05 on tekstuuriton yläviisto;06 koko kooste ja `06-upper-oblique-full-guide.png` täsmälleen samasta kamerasta lähdeosat. Kuvaus käyttää kevyttä Workbenchiä, kahta säiettä ja8AA:ta, ilman varjoja, leivontaa tai raskasta renderöintiä. Seitsemän kuvan tarkistus valmistui noin neljässä sekunnissa. Katselukuvat eivät ole pelin PBR-valaistuksen hyväksyntä.

Oppi on rajattu mutta hyödyllinen: sisäpihan voi säilyttää osittamalla massat ennen Tripoa. Yhden kuvan tulkinta muuttaa silti kattoja ja aukkoja. Seuraavan vaiheen päätös kuuluu KK:lle; tämän luvan perusteella ei tehdä lisäottoa eikä peli-integraatiota.
