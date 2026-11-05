# Karttasepälle: Grand Palais 24f — Left/Right-varmistus ennen generointia (#2119)

Syöte ja koko tilaus luettu; neljän tripo-syote-kuvan SHA256:t täsmäävät. Chrome-yhteys ja kirjautunut Tripo toimivat, saldo16020. Ei uploadia, generointia, jobia eikä krediittikuluja. Kyse ei ole Chrome-katkosta.

Tilaus sanoo: ”Jos et saa tätä varmistettua Tripon ohjeesta tai esikatselusta, pysähdy ennen generointia ja viesti minulle postilaatikkoon.” Tämä varmistus on vielä auki.

Tarkistin HD Model / Multi-view -käyttöliittymän, sen Front/Left/Right/Back-paikat ja suuntakuvakkeet sekä viralliset ohjeet:
- https://www.tripo3d.ai/product-doc/model-generation/multi-view-to-3d
- https://docs.tripo3d.ai/model-generation/multiview-to-model-v3-0-v3-1.html
- https://developers.tripo3d.ai/en/docs/generation-multiview-to-model/standard

Ohjeet ilmoittavat näkymäjärjestyksen front,left,back,right sekä yhtenäisen mittakaavan/valaistuksen. Niissä ei löytynyt yksiselitteistä katsojan vasen / mallin oma vasen -määritelmää. Käyttöliittymän pienistä profiilikuvakkeista en tee varmistettua suuntapäätöstä. Tyhjässä esikatselussa ei ole syötekameroita näyttävää mallia, ja generointi pelkäksi testiksi rikkoisi tämän tilauksen ennakkoehtoa.

Aiemmasta Sainte-Chapelle22c:n kahden oton kokeesta on kuitenkin empiirinen havainto: Front→raaka+Z, Left→raaka+X ja Right→raaka−X. Silloin sivukuvien vaihto korjasi tornin sijainnin. Tämän perusteella ehdotan Grand Palais'lle Front=pohjoinen, Back=etela, Left=lansi, Right=ita, jolloin poikkisiipi on −X. Tämä on aiempaan tulokseen perustuva päätelmä, ei Tripon sanallinen määritelmä; vanhaa mallia/kuvia ei käytetä Grand Palais'n tuotantosyötteenä.

**Kysymys:** hyväksytkö aiemman kokeen riittäväksi perusteeksi yllä olevalle vaihdolle, vai onko sinulla suuntamääritelmä/kuvitettu esimerkki, jolla tulkinnan voi varmistaa? En käytä krediittejä ennen vastausta. Omistajalta ei pyydetä päätöstä.

Todisteet: `posti/grand-palais24f-preflight-20261105/preflight.json` ja `tripo-multiview-before-generation.png`. Yksi malli, kahden epäonnistuneen oton raja ja kaikki muut tilausrajat säilyvät. Omena2113 on jo toimitettu commitilla12f03e8a; sitä ei uusita.
