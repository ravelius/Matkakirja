# #361 C6 — kaikkien 28 kuvan riippumaton arvio

**Kelpuutan C6:n visuaalisesti rajattuun yhden ruudun yksityiseen, mitattuun V6/V7-koeajoon.** Näissä kuvissa ei jää sitä estävää #361-vikaa. Tämä on lupa siirtyä testiin visuaalisen arvioinnin osalta, ei pelitestin läpäisy, toimitustoimi tai omistajan/kaupungin lopullinen laatuhyväksyntä. Solin tekninen muuttumattomuus- ja budjettiauditointi jää erilliseksi ehdoksi.

Katsoin kaikki 28 natiivikuvaa: kuusi jäädytettyä kameraa, ground-contact-1…3, rejected-probe2-contact-1…3 sekä flight-350m-65deg ja flight-500m-78deg, kummastakin vaiheesta before-v6 / after-groundPBR6. Kaikki SHA256:t ja resoluutiot vastaavat vaiheproofeja; kameroiden metatiedot täsmäävät vaiheiden välillä. Juuren proof on yksilöity JSONissa. Kaikki C3/C4-raporttien kymmenen erillistä ROI-rajausta tarkistettiin uudelleen.

Yksittäisten limittäisten kivien päät ja pinnat ovat palautuneet. Kivikohtainen sävyvaihtelu katkaisee pitkät rivit, joten aiempi hallitseva puu-/betonijuovaisuus ei enää määrää materiaalitulkintaa. Muuttunut puoli näyttää nyt kiveykseltä myös T1:ssä ja 350/500 m -diagnostiikoissa. Vanha tunnistettava sävyryhmä ei erotu samalla tavalla uutena kopioituna toistomerkkinä; tämä ei ole matemaattinen todistus jaksottomuudesta.

**Jäljellä oleva ero on todellinen:** uusi pinta on vanhaa pehmeämpi ja sen sävymosaiikki näkyy lähietäisyydellä suurempina kivikohtaisina alueina. Vanhan/uuden raja ei ole näkymätön. Molemmat puolet kuuluvat kuitenkin nyt samaan kivimateriaaliperheeseen; aiempi kiveyksen vaihtuminen lauta- tai massapinnaksi on poistunut. Siksi nämä ovat rajatun pelitestin tarkastuskohteita, eivät peruste jatkaa offline-kierrosta ennen mitattua vertailua.

## ROI-tulos

| Alue | Kuva / natiivirajaus | C6:n tulos ja jäljellä oleva tarkistus |
|---|---|---|
| G1 | contact-3 [90,500,410,690] | Kivien päät ja limitys luettavia; pehmeys ja suurempi sävymosaiikki pelitestiin. |
| G2 | contact-3 [700,355,850,440] | Jalustojen välissä kiveys, ei laajaa likapilveä. |
| G3 | contact-3 [200,375,540,520] | Vanhat pitkät tummat linjat säilyvät, mutta eivät enää yksin määritä jättilaattoja. |
| T1 | taihedian [1000,815,1270,890] | Oikea etuala tunnistuu kivipinnaksi keskietäisyydellä. |
| T2 | taihedian [760,865,950,899] | Portaiden alla ero pehmeydessä ja sävyvaihtelun koossa jää näkyviin; ei uutta voimakasta käytäväkaistaa. |
| Reuna A | contact-1 [170,360,470,520] | Pehmeä tiheydenmuutos näkyy; sama materiaaliperhe, ei jyrkkää kivi→betoni-vaihtoa. |
| Reuna B | regression contact-1 [760,180,1090,400] | Diagonaaliraja lähempänä lähdettä, mutta uuden puolen pehmeys erottuu. |
| Kivipinta | regression contact-1 [1120,430,1550,680] | Kivikohtainen vaihtelu katkaisee aiemmat nauhat. |
| F350 | flight-350m-65deg [680,445,1100,615] | Hieno kivimäinen vaihtelu; ei hallitsevia rivejä tai suuria pilviä. |
| F500 | flight-500m-78deg [720,455,1040,585] | Rauhallinen kivipinta säilyy korkeammalla; still ei ratkaise mip-välkettä. |

Koordinaatit [vasen,ylä,oikea,ala], nollasta, oikea/ala pois lukien. Contact-kuvat 1280×720; muut taulukon kuvat 1600×900. Vastaavat vanhat ROI-tunnisteet ja lisäkontrollit ovat JSONissa.

Contact-1:n avoin piha ja contact-2:n muurinjalkakaista lukevat jälleen kiveyksenä. Contact-1:n valkoiset aukot ja kulmikas pitkä tumma linja näkyvät jo V6:ssa. Kaikissa kolmessa kontakti- ja kolmessa regressiokuvassa ei näy uutta vastaavaa suurta mustaa läiskää. Erityisesti regression contact-2:n aiempi ongelmakohta **[690,405,840,540]** pysyy ilman suurta mustaa polygonia. Sen etualan **[400,700,780,870]** sävymosaiikki on kuitenkin vanhaa näkyvämpi ja pehmeämpi. Regression contact-3:n avoin kenttä ja käytävät säilyttävät kivimateriaalin lukunsa.

Ilma/aukio/beihai/jingshan/hutong-kontrolleissa en havainnut uutta merkittävää ympäristöongelmaa. Ne eivät korvaa lähikuvien tai vastaanottajan pelitestien tarkistusta. Kattokullan ja puiden visuaalinen yleisilme säilyy; bittitason muuttumattomuutta tämä katselmus ei auditoinut.

## V6/V7-koeajon ehdot

1. Solin auditointi läpäisee täsmälleen testattavan ehdokkaan muuttumattomuus- ja budjettiehdot. Koe pysyy ruudussa **peking_2_3**, V6:n ja C6:sta muodostetun V7:n pakettihashit yksilöidään.
2. Vastaanottaja todentaa esikäsittelyn jälkeen todellisen LOD:n, paving-rendererin/materiaalin ja albedo/normal/karheus/AO-kytkennät. **Uuden pavingin on todistettavasti tuotettava näkyvät maapikselit ennen laatuvertailua.** Käytä objektin/materiaalin tunnistusta tai palautettavaa eristettyä näkyvyysdiagnostiikkaa samalla kameralla ja valotuksella. Pelkkä latautunut tiedosto ei riitä.
3. Oma pinta / Ion / LOD / shader pysyvät vaihtoehtoisina hypoteeseina, kunnes näkyvä pinta on tunnistettu. Aiemmat pelikuvat eivät yksin todista peittymistä. Blender- ja pelikuvia ei käytetä rekisteröitynä before/after-parina.
4. Tee saman pelin V6/V7-vertailu samoilla kameroilla, kellonajalla ja valotuksella: lähikivet, T1/T2, raja sekä 350/500 m vastaavat näkymät. Tarkista erikseen liike, LOD, klo 13/18 -valo ja toteutuneet suorituskykymittaukset.

Pelitesti hylkää materiaalin jatkokäyttöön, jos pehmeys muuttuu sumeiksi ylisuuriksi värilohkoiksi, reunasta tulee häiritsevä kaista/halo/hyppy tai riveistä syntyy välkettä ja nauhoja. Näiden mahdollisuutta ei hyväksytä pois nykyisillä still-kuvilla. Testi saa myös osoittaa, että nykyinen taso riittää; uutta offline-muutosta ei tarvitse tehdä tämän raportin vuoksi ennen sitä.

Vaiheproofit ilmoittavat saman erillisen AO-kuvan ja strength 0,6. Esikatselussa AO on Blenderin diagnostisessa base-color-kytkennässä ja normalbasis poikkeaa pelistä. En ennusta tästä pelin AO-, normaali- tai kiiltovastetta. Parentin ilmoittama zone 90→0, 0,95×0,50 m, lähde14:n lineaarinen 24×24-paletti per kivi ja g31-rae ovat materiaalidesignin lähtötietoja, eivät historiallisia faktoja. Arvio koskee yhdistelmän näkyvää tulosta; yksittäistä juurisyytä ei eristetty.

Vain annettu MD/JSON-pari kirjoitettiin T7:lle. C6, aiemmat raportit, kuvat ja muu aineisto säilyivät muuttumattomina. Ei Blenderiä, Gitiä, kuvanmuokkausta, generointia, asset-/generaattorimuutoksia tai delegointia. Ei koko kaupungin, humanownerin, fyysisen laitteen, KTX2:n, liikkeen, tehosteiden, veden tai runtimen hyväksyntää.
