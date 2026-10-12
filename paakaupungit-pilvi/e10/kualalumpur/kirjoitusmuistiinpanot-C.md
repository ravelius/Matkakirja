# Kuala Lumpur — C-tekstiluonnos 12.10.2026

Omistus e10/kualalumpur, rinnakkaistehtävä 10. Yhteisohjeet ja oma konteksti luettu, rajattu lähdekooste tehty robots-sallituista HTML-lähteistä. AGENTS/CODEX, PILVIOHJE 3/4/7/13/LISÄSÄÄNTÖ, lehtityöresepti, kaupunkilehden nimetyt mitat/kuvat/virheet, alueiden speksit ja Dakar-rakenne sovellettu uuden omistajaohjeen rajoissa. Ei Git-operaatioita, kuvatyötä, pelimuutoksia, julkaisua tai uusia agentteja/sessioita.

## Kirjoitettu

- Intro 945 merkkiä, 2 kappaletta, 9 virkettä, 2 lihavointia. Lue lisää -teksti 918 merkkiä / 3 kappaletta.
- Kansi ja `ruoka`-teema, neljä nostoa kummassakin. Nostot 488, 508, 548, 510, 550, 508, 524, 537 merkkiä; kaikki tavoitevälissä 440–660.
- Matkailijalle-kappale, viisi opasjaksoa, viisi parasta-riviä ja neljä hyvä tietää -riviä.
- Viisi kysymystä, kolme tietoa, yksi teeman minitehtävä. Tasot 1/2/2/3/1, minitehtävä ei toista visaa.
- Kaksi varmennettua omaa karttapistettä ja kahden kappaleen nähtävyysjutut: historiallinen rautatieasema 823 merkkiä, Bukit Nanas 873 merkkiä.

## Alkuperäinen paikallinen tarkistin

NAS-kloonissa `node paakaupungit-pilvi/tyokalu.mjs tarkista e10 kualalumpur --lyhyt`; todellinen exit code **1**. **20 virhettä, 2 varoitusta, 0 kuvaa**. Tulos omassa `valiaikainen/nopea-e10-kualalumpur/tarkistus-lyhyt.txt`:ssä.

Kaikki virheet ovat tarkistimen **tiedosto puuttuu** -tyyppiä: valokuva 1, kansi 3, nostot 8, matkailijalle 1, opas 5, kohdejutut 2. Jokaisen roolin kaikki neljä kuvakenttää tyhjiä omistajan uuden ohjeen mukaan. Ei keksittyjä kuvanimiä, credittejä tai kuvatekstejä. Ei tekstien/rakenteen virheitä; varoitusten perusteet ovat alle kuuden kohteen kartta ja puuttuva säädata. Tarkistinta ei muokattu eikä virheitä piilotettu.

## Lähdevalinnat ja korjaukset

Faktapohjassa väite–lähde-kartta. Brickfields-URL palautti täsmennyssivun, joten kaupunginosan oikea `Brickfields,_Kuala_Lumpur` haettiin ja kysymyksen source korjattiin siihen. Banaaninlehtiriisin sisäinen ohjaus luettiin Banana leaf -sivulta, lopullinen wiki-otsikko Banana leaf. Temppelin fengshui/suunta-väitettä ei löytynyt luetusta lähteestä: poistettu introsta, nostosta ja oppaasta, korvattu nimihenkilöiden/yhteisön dokumentoidulla historialla. Hokkien mee -lisukkeet KL-version mukaan, ei Penangin katkarapureseptistä. Rautatieaseman 1910/1917-vaiheet yleistetty 1900-luvun alkupuoleksi. Ei nykyisten ratapalvelujen tarkkoja lukuja tai asemapysähdysten lupauksia ristiriitaisesta asemalähteestä.

Maalehden aiheet (kookosriisi, hapan liemi, vedetty tee, durian, kellotornivuosi ja katettu jalkakäytävä) eivät ole uusissa nostoissa. Yong tau foo rajattu kaupungin seudun/naapuri-Ampangin ruokaperinteeksi; sitä ei sanota KL:ssä keksityksi. Bukit Nanas on aito metsä/kukkula eikä suojatun KL Towerin kiertonimi. Asemakohde perustuu Hubbackin vanhaan rakennukseen, kuvavaihe arvioi nykyiset lisäosat erikseen.

## Primäärivarmistuksen todellinen tulos

- Tourism Malaysia `https://www.malaysia.travel/explore/kl-forest-eco-park`: HTTP 404, ei lähde.
- MyRapid `https://myrapid.com.my/our-services/rail/`: HTTP 200, mutta 212 tavun Incapsula-skriptikuori ilman luettavaa raideliikennesisältöä. Ei faktalähde eikä ohitettu sivun suojausta.
- KLIA Ekspres `https://www.kliaekspres.com/`: TLS-virhe `SSL: DH_KEY_TOO_SMALL`, ei lähde; suojausta ei alennettu.
- `https://en.wikipedia.org/wiki/Sze_Ya_Temple`: HTTP 404, ei lähde; toimiva Sin Sze Si Ya Temple luettu.

Näitä ei lasketa onnistuneiksi primäärivarmennuksiksi eikä kahdeksi riippumattomaksi lähteeksi. Nykyisen lentoasemayhteyden ja raideliikenteen nimet perustuvat luettuihin K/V-artikkeleihin; toimijavarmistus avoin. Yhtään tarkkaa paikallista tapahtumavuotta, väestölukua, etäisyyttä, hintaa tai ilmastolukua ei viedä C:hen. 1873 on pelin vertailuvuosi, ei isoisän keksitty tapahtuma.

## Avoimet portit

B-kuvat 20 roolia. A/kartta partial 2/6: vähintään neljä muuta kelpoista omaa pistettä ja juttua puuttuu. Temppelin nykyisten vaiheiden tekijäketju puuttuu, ei kartalla. Primäärilähteiden toimijavarmistukset avoinna. `saatiedot:null` yhteisen 48/48 primääriauditoinnin puuttuessa; saa.json koskematon. D/E/F, hyväksyntä, pelikytkentä ja julkaisu tekemättä. Tekstiluonnos ei ole valmis kaupunki/erä.

## SHA ja todisteet

Vain kolme omaa tuotantotiedostoa tässä kaupungissa: faktapohja.md, sisalto.json, tämä muistio. Lopullinen SHA256SUMS.txt, mittaus.json, lähde- ja robots-todisteet sekä alkuperäisen tarkistimen tulos omassa NAS-väliaineistossa. SHA ei ole commitin tunnus.
