# Kamjanets #2344 — päätarkistus

**WARNING — yksi valtuutettu alkuperäinen valmis KK:n katsottavaksi. Ei KK-hyväksyntä tai peli-integraatio.**

Tarkastettu sama hyväksytty natiivisyöte, kaikki neljä paikallista sivuakselia ja yläviisto Tripo-selaimesta. Ei paikallista raskasta renderöintiä tai alkuperäisen GLB:n muutoksia.

- Pitkä kivinen muurimassa, korkeat teräväkattoiset tornit, punertavat ylävyöt ja nelikulmainen porttipää ovat tunnistettavia. Yhteen matalaan sivukuvaan peittyviä torneja ei lasketa puuttuviksi; päädyistä ja yläviistosta näkyy enemmän erillisiä massoja.
- Yläviistossa näkyy kattamaton kivinen keskialue ja porrastettu kehä sekä sen sivussa matalamuurinen avoin alue. Piha on siis tämän mallin visuaalisessa tuloksessa avoin, mutta sen mittoja ja pohjaa ei ole lähdevarmistettu.
- Syötteen matala katselukulma ei määrittänyt pohjoispuolta tai pihan pohjaa. Tripo jakaa tornit ja muurit syvyyssuunnassa; tämä on tuotettu tulkinta, ei tarkka rekonstruktio. Ilmansuuntia ei ole rekisteröity GLB-akselistoon.
- a/b-välin pieni epävarma tornimainen osa ja vaalea pohja säilyvät. Alustaa ei poisteta tästä alkuperäisestä; se kuuluu myöhempään kevennykseen.
- Pienet ikkuna-/kivipinnat ovat paikoittain karkeita. Alkuperäisen maksimiresoluution säilyttäminen ei tarkoita mobiilikäyttöön optimointia.

**Tekninen tarkistus PASS:** GLB2-pituus ja rakenne luettu; 1 978 467 kolmiota vastaa Tripo-näkymää. 8192×8192 baseColor sekä 4096×4096 normal ja metallicRoughness on upotettu tiedostoon. Ei ulkoisia riippuvuuksia tai vaadittuja laajennuksia. SHA256 tarkistettu T7-siirron jälkeen. Syötekuvan SHA256 säilynyt.

Viisi sivu-/yläkuvaa ja 1000×1000 kooste kattavat koko mallin, kaikki liput/huiput ja alustan. Kuvat ovat samasta jobista; uudelleengenerointia ei ole tehty. Kaikki painetut akselikirjaimet tarkistettiin myös tallennetun JPEG:n pikseleistä.

Yksi sallittu kutsu käytetty: 65 krediittiä. Ei uutta tiliä, tilausta, jälkikutsua tai automaattista uusintaa.
