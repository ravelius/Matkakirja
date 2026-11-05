# Louvre21f — seitsemän uuden kuvan arviointitoimitus

Lännen lyhyt siipi on poistettu. Kuusi paviljonkia säilyvät, länsipää on avoin ja kiveys jatkuu suoraan avoimeen reunaan. Läntisessä julkisivussa iso pyramidi näkyy ilman edessä olevaa seinää; takana näkyy itäsiiven sisäseinä. Pohjoisjulkisivu on etelän kanssa samanarvoinen. Yhtenäiset tummat siipikatot ilman piippuja/kattoikkunoita, paviljonkien tasaiset huiput ja enintään yksi iso kattoikkuna per sivu. Kolme hillityn siniharmaata pyramidia samassa keskinäisessä järjestyksessä ja kokohierarkiassa.

## Otokset ja valinnat

Yhteensä18kokonaista uutta sisäisellä ImageGen-työkalulla tuotettua kuvaa; seitsemän valittu. Vanhoja kuvia ei korvattu tai poistettu. Ei osittaista pikselikorjausta, skaalausta eikä tuotantokuvien koostamista.

- viisto-lounas.png: viisto-lounas-otto03 (3 ottoa).
- viisto-koillinen.png: viisto-koillinen-otto06 (6 ottoa).
- ylhaalta.png: ylhaalta-otto01 (1 ottoa).
- etela.png: etela-otto02 (2 ottoa).
- pohjoinen.png: pohjoinen-otto01 (1 ottoa).
- ita.png: ita-otto02 (2 ottoa).
- lansi.png: lansi-otto03 (3 ottoa).

Uusin lounaiskuva oli viistojen julkisivukorjausten mittari. Koilliskuva uusittiin aidoksi koilliskameraksi, jossa näkyvät idän ja pohjoisen ulkoseinät. Pitkien siipien osissa on9arkadia, paviljongeissa ground-kerroksen keskikaari ja sivuilla kivipaneelit sekä kaksi täyttä ikkunariviä ja attic niiden yläpuolella. Julkisivujen keskinäiset pääerot korjattiin ennen toimitusta. Lounas1 ja koillinen1 säilyvät historiassa mutta eivät kuulu toimitukseen.

## QA ja käytännön rajat

Seitsemän1536×1024RGBPNG:tä. Natiivien tiedostojenSHA256 varmennettu; kaikki31aiempien toimitusten tiedostoa ennallaan ja11lähdemanifestin tiedostoa edelleen samoja.

Oma sisällön ja näkymien visuaalinen QA: PASS. **Tämä ei ole tarkasti kamerakalibroidusta3D-mallista renderöity kuvasarja.** Piiloon jääviä pintoja, jokaisen koristeen perspektiiviprojektiota, kattokaltevuuksia tai pyramidien täsmällistä3D-pohja-alaa ei ole voitu metrimitoin varmentaa. Pyramidien paikat, koot ja väri on verrattu visuaalisesti lähdereferensseihin. Karttaseppä/KK tarkistaa tämän ennen Tripoa.

Suorien julkisivujen värirajaus (R-B>16 jaR-G>4, sisältää kiviprofiilit, ei harmaata kattoa/sinistä lasia):

|Näkymä|Leveys×korkeus px|Maaviiva y|Leveyden ero noin1,6px/yksikkö nimellismittaan|
|---|---:|---:|---:|
|etela|1415×474|881|+2.83%|
|pohjoinen|1416×473|880|+2.91%|
|ita|594×476|880|+3.12%|
|lansi|595×476|880|+3.3%|

Rajausten korkeus on0,21–0,85%yli noin472px:n kulmapaviljonkitavoitteen. Erot ovat pieniä mutta eivät nollia. Arvot ovat2D-värimaskin mittauksia, eivät todistettu3D-mittakaava. Lounas- ja koillisviistojen kuvarajaukset poikkeavat katselusuunnan vuoksi.

Mukana QA.json, QA-yhteiskuva.jpg ja PROMPTS.json. Yhteiskuva on vain pienennetty arviointiarkki; seitsemänvarsinaistaPNG:tä ovat natiivikoossa ja muuttamattomina.

Toimitus vain claude/postilaatikko-haaraan. **Ei lähetetty Tripo-sessiolle.** Karttasepän vastaanottohyväksyntä, KK:n käyttöpäätös, runtime-integraatio ja julkaisu ovat erillisiä ja avoimia.
