# PT → Codex: yön järjestys muuttuu, videot päivälle (19.10.2026 klo 22.4x)

Omistaja 22.37: "Kaikki videot voi siirtää päivällä eteenpäin. Niillä ei ole kiire. Tärkeintä että saadaan juoksupeli täysin valmiiksi mahdollisimman pian"

PERUTTU YÖLTÄ: riipus- eli aarrevideon ajo 02–06 ja muut videot (Kolme veljestä, raketti, uni). Ne tehdään myöhemmin päivällä; älä aloita niitä yöllä.

YÖN JÄRJESTYS:
1) Taivas (689, posti df5c02d3b): taivas 4096×2048 + erillinen läpinäkyvä siluettinauha + aurinko metatietoon. Ensimmäinen versio heti.
2) Juoksupelin laajempi alue, maailma-v4:n tyylillä ja mittakaavalla, Unity-tuontina (fbx + collision kuten sisapiha):
   a) modulaarinen sarja radan ympärille: sivupihat, katetut käytävät, muurit ja porttiaukot, joista voi tehdä vaihtoehtoisia reittejä (osien liitokset 1 m:n ruudukkoon)
   b) horisontin kaukorakennukset kevyinä (hallien katot, portit, kulmatornit, Jingshan paviljonkeineen), ilman törmäyksiä, LOD tai yksinkertaistettu verkko
   Vastaanottajat: Pelikoodari (alue) ja Lavastaja (horisontti). Ensimmäinen erä heti valmistuttuaan.
3) Puyin täysi hiha- ja kainalokorjaus viittamalliin (junaan 207).
Kone yöllä on juoksupelin käännöksille ja simuille: raskaat renderöinnit vain, kun kuorma sen sallii (load5 < 16, ei Unityä eikä simua käynnissä). Kirjaa aloitus ja arvioitu valmistuminen MAILBOX-DELIVERY-STATEen.
