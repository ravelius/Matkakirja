# Neuschwanstein v4 #2321 — riippumaton visuaalinen QA

**Verdict: WARNING — tilattu tornikorjaus toimii näkyvässä kuvassa; lähdekollaasin pienet ja peittyvät rakennusosat jäävät varauksiksi. Ei KK-hyväksyntä tai Tripo-lupa.**

Katsottu natiivi `neuschwanstein-model-v4.png`; verrattu tämän erän valmistelussa katsottuun alkuperäiseen kuusiruutuiseen `output/linnat-mallikuvat-2276-2280-20261115/neuschwanstein/neuschwanstein.jpg`-kollaasiin sekä v3-esikatseluun `output/linnat-jatko-20261115-2222/neuschwanstein-v3/neuschwanstein-model-v3-1000.jpg`. Vertailu uusimpaan KK-päätökseen (commit `efe45884bbaa58fefd7a30331d221134f415149d`) ja tämän hakemiston lähdevalmisteluun.

- **Korkea pyöreä torni: korjaus PASS.** V3:n näkyvän eteläseinän edessä kallioon asti laskenut suuri pyöreä runko on poissa. V4:ssä pitkä eteläseinä jatkuu ehjänä, ja vain tornin yläosa/huippu näkyy Palasin katonharjan takaa. Tämä vastaa kollaasin1 sekä KK:n nimenomaista pohjoispuolen sijoitusohjetta. Kuvan peitto tukee tavoitetta; yhden2D-kuvan perusteella ei todisteta piilossa olevan tornin täsmällistä pohjapaikkaa.
- **Pääjärjestys säilynyt.** Punainen itäportti ja kaksi porttitornia ovat oikealla edessä, puolipyöreä etuvarustus niiden edessä, suuri neliötorni niiden takana ja Palas vasemmalla kauempana. Kallioperusta, vaalea kivirakenne ja harmaat katot säilyvät. Ei havaittavaa kokonaisuuden peilausta tai portin siirtoa eteläjulkisivun jatkeeksi.
- **Pihat ja yksi kamera.** Alemman pihan avoin alue sekä ylemmäs Palasin suuntaan jatkuva rakennusjakso erottuvat. Massat ovat v3:n kanssa samassa yleisessä järjestyksessä ja ESE/kaakkoisessa kameraperheessä. Molempien pihojen tarkkaa pohjaa, kulkuyhteyksiä tai tasokorkeuksia ei silti voi vahvistaa. Ei erillistä toteuttamatonta90m kappelitornia.
- **Jäljelle jäävä lähderiski.** Palasin portinpuoleisten päätyjen kaari-/loggia-aiheet, pienet kattoturretit, aukotus ja siipiliittymät eivät varmennu pienestä ruudusta5. V3:n QA:ssa mainittu päätydetaljien tulkintavaraus säilyy. Kuva ei anna selvää näyttöä kokonaisen länsipäädyn kääntämisestä tähän kameraan, mutta kaikkia loggia-aiheita ei myöskään hyväksytä lähdevarmoiksi. Tarkat suhteet ja piilopinnat jäävät avoimiksi.

**KK-puuterivi:** Korkean tornin runko on nyt poissa eteläjulkisivulta ja huippu katon takana; portti–pihat–neliötorni–Palas-järjestys säilyy, mutta pienet pääty-/loggia-aiheet ja peittyvät pihaliittymät ovat edelleen lähdekoonnin rajoittamia tulkintoja.

Ei uutta generointia, korjausta, mallia, selainta, lähetystä tai yhteistilan muutosta. Yksi sallittu v4-kutsu on käytetty.
