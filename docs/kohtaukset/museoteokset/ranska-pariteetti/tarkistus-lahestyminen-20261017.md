# Faktantarkistus: Louvre, Orsay, Rodin (17.10.2026)

Merkinnät: OK / KORJAA / EPÄVARMA. "Sivu" = sivu haettu WebFetchillä ja luettu; "tiiviste" = vain hakutuloksen tiivistelmä.

## Robots.txt ja käytetyt sivustot
- en.wikipedia.org: robots tarkistettu, /wiki/-artikkelit sallittuja. Käytetty vain /wiki/-sivuja (ei api.php).
- louvre.fr: robots sallii /en/; arvattu historiasivu palautti 404 -> ei käytetty.
- musee-orsay.fr: robots sallii /en/, mutta sivu (/en/node/60) palautti 403 -> EI KÄYTETTY, ei kierretty. Orsayn viralliseen sivuun viitataan vain hakutiivisteen kautta (tiiviste).
- musee-rodin.fr: robots sallii /en/ (paitsi /en/node/*); Hôtel Biron -sivu haettu OK; Helvetin portit -sivu 404.
- Britannica, UNESCO, DANS: ei haettu. Mitään ei ladattu tiedostoina.

## 1. LOUVRE-PUHE

| # | Väite | Tulos | Perustelu / lähde |
|---|---|---|---|
| 1.1 | Louvre on Pariisin vanha kuninkaanlinna | OK | Palatsi alkoi linnoituksena, myöhemmin kuninkaiden asuinpalatsi. https://en.wikipedia.org/wiki/Louvre (sivu) |
| 1.2 | Filip II rakennutti linnoituksen noin vuonna 1190 | OK | Kaupunginmuurin rakentaminen alkoi 1190, linnoitus sen osana; keskitorni noin 1200. Päättymisvuosi (n. 1202) vain Wikipedian luokittelusta, ei tekstistä -> älä väitä loppuvuotta. https://en.wikipedia.org/wiki/Medieval_Louvre_Castle (sivu); https://en.wikipedia.org/wiki/Louvre (sivu: "late 12th century", ei tarkkaa vuotta) |
| 1.3 | Myöhemmät kuninkaat tekivät siitä palatsin | OK | Linnoitus menetti puolustustehtävän 1300-luvulla ja purettiin vaiheittain 1528-1660 palatsin tieltä (tiiviste, History.com/Wikipedia). https://en.wikipedia.org/wiki/Medieval_Louvre_Castle (sivu) |
| 1.4 | Vuonna 1793 ovet avattiin kansalle, palatsista tuli museo | OK (pieni tarkennus) | Avattiin 10.8.1793 nimellä Muséum central des Arts de la République. Alussa pääsy ilmainen mutta taiteilijoilla etusija, suuri yleisö vain osan viikosta (tiiviste); museo oli suljettuna 1796-1801. "Avattiin kansalle" on silti kohtuullinen kertojan tiivistys. https://en.wikipedia.org/wiki/Louvre (sivu) |
| 1.5 | Sisällä Mona Lisa | OK | https://en.wikipedia.org/wiki/Louvre (sivu) |
| 1.6 | Sisällä Kaanaan häät | OK | Veronesen teos on Louvressa (otettu 1797, jäi Pariisiin 1815). https://en.wikipedia.org/wiki/The_Wedding_at_Cana_(Veronese) (sivu) |
| 1.7 | "satoja muita mestariteoksia" | OK | Epämääräinen mutta turvallinen (kokoelmassa kymmeniätuhansia esillä olevia teoksia; ei tarkistettu luvulle). |

Ehdotus: ei muutoksia. Valinnainen tarkennus: "Vuonna 1793 palatsi avattiin yleisölle museona."

## 2. LOUVRE-INFOLAPPU

| # | Väite | Tulos | Perustelu |
|---|---|---|---|
| 2.1 | Pariisin entinen kuninkaanlinna ja yksi maailman suurimmista taidemuseoista | OK | Wikipedia kuvaa Louvren maailman suurimmaksi taidemuseoksi (sivu: https://en.wikipedia.org/wiki/Louvre). |
| 2.2 | Alkoi noin 1190 Filip II:n linnoituksena | OK | Ks. 1.2. |
| 2.3 | Kuninkaat rakensivat siitä palatsin | OK | Ks. 1.3. |
| 2.4 | "Museona Louvre on avoinna vuodesta 1793" | KORJAA (lievä) | Museo oli suljettuna 1796-1801 (tiiviste: https://en.wikipedia.org/wiki/Louvre). Ehdotus: "Museona Louvre on toiminut vuodesta 1793." |
| 2.5 | Mona Lisa ja Kaanaan häät tunnetuimpia teoksia | OK | Ks. 1.5, 1.6. |

## 3. ORSAY-PUHE

| # | Väite | Tulos | Perustelu |
|---|---|---|---|
| 3.1 | Edessäsi entinen Gare d'Orsay | OK | https://en.wikipedia.org/wiki/Gare_d%27Orsay (sivu) |
| 3.2 | Victor Laloux suunnitteli aseman | OK (nyanssi) | Paris-Orléans-yhtiö kuuli kolmea arkkitehtia (Laloux, Magne, Bénard); Laloux'n ehdotus valittiin, asema ja hotelli kuvataan hänen työkseen. Wikipedia luettelee kaikki kolme. Laloux yleisesti tunnustettu suunnittelijaksi. https://en.wikipedia.org/wiki/Gare_d%27Orsay (sivu) |
| 3.3 | Avattiin vuonna 1900 | OK | Asema avattiin matkustajille 28.5.1900 Maailmannäyttelyn alla (rakennus 1898-1900). https://en.wikipedia.org/wiki/Gare_d%27Orsay (sivu); https://en.wikipedia.org/wiki/Mus%C3%A9e_d%27Orsay (sivu) |
| 3.4 | Vuonna 1986 asemasta tuli museo | OK | Museo avattiin yleisölle 9.12.1986; Mitterrand vihki sen 1.12.1986 (tiiviste Orsayn virallisesta historiasivusta; itse sivu 403 -> ei käytetty). Wikipedia: "December 1986". |
| 3.5 | "sen suuren kellon alla asuvat impressionistit" | EPÄVARMA | Iso asemakello on pääsalin (veistoshallin) päädyssä; Wikipedia: veistokset ovat entisessä junahallissa kellon alla, maalaukset entisessä hotellissa ja yläkerroksissa. Impressionistit eivät aivan kirjaimellisesti "kellon alla". Ehdotus: "ja nyt sen holvien alla asuvat impressionistit" tai "ja nyt sen suuren kellon katveessa ..." (https://en.wikipedia.org/wiki/Gare_d%27Orsay, sivu). |
| 3.6 | Monet, Renoir, Degas, Cézanne Orsayssa | OK | Wikipedia (https://en.wikipedia.org/wiki/Mus%C3%A9e_d%27Orsay, sivu): maailman suurin impressionistien ja jälki-impressionistien kokoelma; mainitsee Monet, Renoir, Degas. Cézanne vain matkailusivujen hakutiivisteessä (Korttipelaajat, Omenat ja appelsiinit) -> OK, mutta suoraa lähdettä Wikipedian sivutekstistä ei lukenut. |

Ehdotus: korvaa kohta 3.5 yllä olevalla sanamuodolla.

## 4. ORSAY-INFOLAPPU

| # | Väite | Tulos | Perustelu |
|---|---|---|---|
| 4.1 | Pariisin museo Seinen rannalla | OK | Rakennus Seinen vasemmalla rannalla (yleistieto, ei erillistä sivulähdettä luettu). |
| 4.2 | Rakennus oli alun perin rautatieasema; Laloux suunnitteli; avattu 1900 | OK | Ks. 3.1-3.3. |
| 4.3 | Museona vuodesta 1986 | OK | Ks. 3.4. |
| 4.4 | Ydin 1800-luvun taide, erityisesti impressionistit | OK (tarkennus) | Kokoelma kattaa pääosin ranskalaista taidetta 1848-1914 (tiiviste matkailusivuista; Wikipedia: impressionistit ja jälki-impressionistit). Ehdotus: "1800-luvun puolivälin ja vuosisadan vaihteen taide" vain jos halutaan tarkka. |
| 4.5 | Monet, Renoir, Degas, Cézanne ja Van Gogh | OK | Wikipedia listaa 24 Van Goghin maalausta (esim. Tähtikirkas yö Rhône-joen yllä). https://en.wikipedia.org/wiki/Mus%C3%A9e_d%27Orsay (sivu). Huom.: Cézanne ja Van Gogh ovat teknisesti jälki-impressionisteja; "erityisesti impressionistit: ... Cézanne ja Van Gogh" on hieman löyhä. Ehdotus: "impressionistit ja jälki-impressionistit: Monet, Renoir, Degas, Cézanne ja Van Gogh". |

## 5. RODIN-PUHE (uusi luonnos)

| # | Väite | Tulos | Perustelu |
|---|---|---|---|
| 5.1 | Hôtel Biron on Pariisin 1700-luvun kartano | OK | Rakennettu 1727-1732 rue de Varennelle (Wikipedia-sivu), valmistui 1732 arkkitehti Jean Aubertin työnä (Musée Rodin -sivu). https://en.wikipedia.org/wiki/Mus%C3%A9e_Rodin ; https://www.musee-rodin.fr/en/museum/musee-rodin/hotel-biron (molemmat sivu) |
| 5.2 | Rodin piti siellä ateljeetaan vuodesta 1908 | OK | Vuokrasi 1908 neljä pohjakerroksen huonetta ateljeekseen, koko rakennuksen käyttöön vuodesta 1911. Sama kaksi lähdettä. |
| 5.3 | Hän lahjoitti teoksensa valtiolle | OK | Lahjoitus 1916; parlamentti hyväksyi lain 15.12.1916 (Wikipedia-sivu; tiiviste muista lähteistä). |
| 5.4 | Museo avattiin vuonna 1919 | OK | Avattiin yleisölle 4.8.1919 (Wikipedia-sivu ja Musée Rodin -sivu). |
| 5.5 | Puutarhassa Ajattelija ja Helvetin portit | OK (lähde heikko Helvetin porteille) | Wikipedia (Musée Rodin -sivu): puutarha esittelee tunnetuimmat pronssit, mm. Helvetin portit ja Ajattelija. Musée Rodinin oma sivu mainitsi vain Ajattelijan puutarhassa. Pariisin pronssivedos (1917) on Musée Rodinissa (https://en.wikipedia.org/wiki/The_Gates_of_Hell, sivu: ei kerro sijaintia puutarhassa). Yleistietona Helvetin portit ovat puutarhassa, mutta suoraa virallista varmistusta ei saatu. |
| 5.6 | "pronssi ja marmori" | OK | Yleinen kuvaus; museossa pronssia ja marmoria. |

Ehdotus: ei pakollisia muutoksia. Pieni epäilys vain 5.5:ssä, jos halutaan varmistaa Helvetin porttien sijainti (voi sanoa "Puutarhassa seisovat mm. Ajattelija").

## 6. LISÄTARKISTUS: LOUVRE-TEKSTI (linssin infolappu, ~400 mrk)

| # | Väite | Tulos | Perustelu |
|---|---|---|---|
| 6.1 | Louvre on Ranskan kansallismuseo Pariisissa | EPÄVARMA / KORJAA | Wikipedia: "national art museum in Paris"; ranskaksi "musée national". "Ranskan kansallismuseo" suomeksi antaa vaikutelman, että se olisi Ranskan kansallismuseo yleensä (historiamuseo tms.). Ehdotus: "Louvre on Pariisin suuri valtion taidemuseo" tai "Louvre on yksi maailman suurimmista taidemuseoista" (https://en.wikipedia.org/wiki/Louvre, tiiviste). Juridista termiä (établissement public) ei varmistettu. |
| 6.2 | Entinen kuninkaanlinna | OK | Ks. 1.1. |
| 6.3 | Filip II rakennutti linnoituksen noin 1190 | OK | Ks. 1.2. |
| 6.4 | "palatsi avattiin kansalle museona vuonna 1793" | OK | Ks. 1.4. |
| 6.5 | Mona Lisa | OK | Ks. 1.5. |
| 6.6 | Veronesen Kaanaan häät | OK | Ks. 1.6. |
| 6.7 | Davidin Horatiusten vala Louvressa | OK | Maalaus 1784-85, "now on display in the Louvre in Paris". https://en.wikipedia.org/wiki/Oath_of_the_Horatii (sivu). Suomeksi yleinen nimi "Horatiusten vala" (nimen vakiintuneisuutta ei tarkistettu). |
| 6.8 | Orsayn museon impressionistit Monet, Renoir, Degas ja Cézanne | OK | Ks. 3.6 ja 4.5. Cézannen osalta lähde tiiviste. Cézanne on tarkemmin jälki-impressionisti. |
| 6.9 | Rodinin veistokset | OK (sisältö) | Rodinin veistokset ovat Musée Rodinissa, ei Louvressa; lause "Pelin saleissa..." kuvaa peliä, ei todellista Louvrea, ja on rakenteeltaan selvä. Varmista, ettei lukija ymmärrä Orsayn ja Rodinin olevan Louvressa. Ehdotus: "Pelin saleissa ovat Louvren mestariteosten lisäksi myös muita Pariisin museoita: Orsayn impressionisteja ja Rodinin veistoksia." |

## Mitä en pystynyt varmistamaan
- Orsayn virallinen historiasivu: 403 -> ei luettu; 1.12./9.12.1986 vain hakutiivisteen kautta.
- Louvren virallinen sivu: ei saatu (404); tiedot Wikipediasta ja hakutiivisteistä.
- Linnoituksen valmistumisvuosi (n. 1202): vain Wikipedian luokittelu, ei tekstiä; ei väitetä.
- Helvetin porttien tarkka sijainti nykyisin puutarhassa (suora virallinen vahvistus puuttuu).
- Cézanne Orsayssa: vain matkailusivujen tiivisteet, ei Orsayn omaa sivua.
- Suuren kellon sijainti suhteessa impressionistisaleihin: vain Wikipedian yleiskuvaus.
- "Satoja muita mestariteoksia" -määrä: ei tarkistettu.
- Mona Lisan ja Kaanaan häiden sijainti samassa salissa (yleistieto, ei tässä tarkistettu).
