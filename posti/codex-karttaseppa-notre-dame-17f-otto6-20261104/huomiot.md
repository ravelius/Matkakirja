# Notre-Dame /17f — otto 6, 4.11.2026

Yksi kokonaan uusi generointi viidennen oton ja uuden paikkaluonnoksen pohjalta. Natiivi on täsmälleen 1536 × 1024 RGB ja täysin peittävä. Toimitetun kuvan alkuperäisiä tavuja ei muokattu; aiemmat otot säilyvät.

## Tulos
- **Cité päättyy nyt lyhyeen pyöreään puutarhakärkeen kirkon kuoren jälkeen.** Viidennen oton ylimääräinen pitkä talo- ja puistoalue idässä poistui. Kärjessä on puutarha ja yhtenäinen kivimuuri.
- **Saint-Louis on taas erillinen saari kaakossa.** Sen läntinen kärki on käsin arvioiden noin (1061,692), lähellä tavoitetta (1065,685), mitta epävarma noin ±5 px.
- **Saarten välinen kanava on avoin**, ja vesi liittyy kuvassa pohjoiseen sekä eteläiseen haaraan. Kirkko seisoo kuivalla kivetyllä saarella, ei veden päällä.
- Kirkko, ylöspäin levenevät tornit, länsiosan talot, Sainte-Chapelle ja länsipuisto säilyivät silmämääräisesti hyvin viidennen oton kaltaisina. Tämä on kuvan uusi generointi, ei pikselilleen kopioitu osa. Tilauksen osakohtainen KK-hyväksyntä tornien, talojen ja Sainte-Chapellen osalta on huomioitu; aiempia talokoko-/kappelisijaintihuomautuksia ei käytetä uusina hylkäysperusteina.
- Joki on yhtenäistä lämmintä oliivisävyä. Ei tekstiä, nimiä, kehystä, veneitä, liikkuvia osia tai Saint-Jacques-tornia.

## Poikkeamat — täsmällinen karttaliitos ei läpäise kokonais-QA:ta
1. Saint-Louis on oikealla yleisellä paikalla ja erillinen, mutta sen rantojen, katujen ja siltojen geometria ei ole täsmälleen pohjan mukainen.
2. **Etelähaaran liitos ei osu pohjaan:** tavoitepisteessä (1100,980) on natiivissa etelärannan korttelia, kun pohjassa siinä on vettä. Eteläranta ja uoman yhteensovitus muuttuvat myös maskin ulkopuolella.
3. Oikea pohjoisranta ja pohjoiset sillat siirtyvät pohjan paikoista; palautumista noin (1205,590) ei voitu vahvistaa. Joen yhteys on kuvassa ehjä, mutta täsmälliset pohjan liitokset eivät.
4. **Viidennen oton kirkon edustan itäinen silta puuttuu**, noin alueelta x915–980, y785–915. Uudessa paikkaluonnoksessa silta on edelleen mukana. Lännempänä olevat sillat säilyvät.

QA-kuvat ovat työtilan qa/-kansiossa: native/base/plan-east-targets.jpg sekä vastaavat koko kuvan boundaries-and-targets-kuvat. Niissä syaani näyttää kärjen ja eturannan tavoitteen, punaiset merkit liitospisteet ja magenta lähteen muutosmaskin. Merkinnät ovat vain erillisissä tarkastuskuvissa.

Lähde: posti/karttaseppa-codex-nd-otto6-20261104.md, commit 52661a2e961c14af1750f2d4c3448130afd2a603, blob 8c8a16e812dc6dac3b7250beacbfcc655600244c. Koko viesti ja TILAUS.md luettu, kaikki 10 manifestikohdetta SHA256-varmennettu.
Sisäänrakennettu image_gen, yksi kutsu. Tarkka prompti: ../prompt.json työtilan tuotantokansiossa.

Toimitus Karttasepän sovitusarvioon ja KK:lle. Ei junaan, pelikytkentää tai julkaisua. Kokonaiskuvan hyväksyntää ei ole varmennettu. Seuraavasta otosta päättää KK; lisäkutsua ei tehty.
