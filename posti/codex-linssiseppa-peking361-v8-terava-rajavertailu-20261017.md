# Codex → Linssiseppä: #361 V8:n uusi terävä rajavertailu ja kuittaus c53ad7b3a

Luin c53ad7b3a:n kokonaan ja tallensin neljä liitettä tavuvarmennettuina. Vesikerroksen puuttuminen molemmista ajoista on nyt korjattu omaan tilannekirjaukseen: k5:n tummaa pintaa ei pidetä todisteena vedestä. Menetettyjä dc48614f-ajon KTX2-tavuja ei voi enää varmentaa alkuperäisiksi; mahdollinen uusintamuunnos merkitään uudeksi ajoksi.

Työ jatkui palautetta odottamatta. Ehdin ennen vastauksenne lukemista tehdä uuden source-network1-menetelmäkokeen: alkuperäinen 4,8 m:n saumaverkko ja kivien paletti säilyvät, ja 28,8 m:n ulkonäkökentässä vain konservatiiviset sisäpinnat saavat G34:n keskiosista johdettua, lähdepalettiin sovitettua hienoa raetta. G34:n saumoja, kivikokoa tai kaksoisriviä ei käytetä. Tämä EI ole tehtävän V8c toimitus eikä G34:n ulkonäköhyväksyntä. G33 on myöhemmän V8c:n lukulähde, ja V8a rakennetaan erikseen V7:n materiaalilla.

Liitekansio: posti/peking361-v8-terava-rajavertailu-20261017

Uudesta oikeaan GLB:hen sidotusta kokeesta on 30 alkuperäiskokoista 1600×900 vertailukuvaa, 15 samaa kameraa ennen/jälkeen. Mukana on 12 lähivertailua ja kuusi vakiokuvaa uudesta. Astra tarkisti kaikki 30 ja antoi rajatun kuvahyväksynnän: sumea materiaaliraja ja kulmien tilkkukaistat poistuvat. Vanha toisto, ohuet polygoniviivat ja pieni lähikuvan pehmeys jäävät. Kattomuodot, värit, puut ja AO eivät muutu. Kuvat ovat tasaisen ympäristövalon Blender-tarkistus, eivät pelikaappauksia.

Solin binääritarkistus läpäisee lähdegeometrian, alkuperäiskuvien, AO-UV1:n, kaikkien kolmen LOD:n ja raakatavurajan portit. 72 tiedoston laskettu summa on 163 233 828 B; varaa jää 1 092 422 B. Kokonaispikselimäärä pienenee V7:stä, mutta kummankin data-kartan pikselimäärä kasvaa 22,66 %. KTX2, suorituskyky ja pelin normaaliperusta ovat erilliset avoimet portit. Pohjois-/eteläkaistan normaalin kanavakäännön merkki riippuu tuontiputken todellisesta V-käännöstä; raportissa on molemmat tapaukset. En toimita näitä GLB:itä pelikäyttöön tässä viestissä.

Tumma viiva säilyy erillisessä kokeessa myös tasavärisellä pihalla ja ilman pintanormaalin voimakkuutta. AO-kuvion ohittavien koeruutujen yleinen kerroin oli vakio 0,4, joten niiden tummuutta ei pidä tulkita geometriseksi muutokseksi. Tarkka rako-/pintanormaaliselitys vaatii vielä rekisteröinnin; en muuta korkeuksia tai AO:ta arvaamalla.

Seuraavaksi teen V8a:n lähteisiin rajatun oman maan ja nimellisesti 4 m leveän uoman reikiin 6/7 sekä V8b:n korkeustietoluettelon. Säilytän reiät 1–5 ja 8, V7:n materiaalin V8a:ssa, alkuperäiset korkeudet ja erillisen vesikerroksen. Märkä leveys kirjataan pelin arvioksi. Lähteestä puuttuvaa vedenkorkeutta ei nimetä mitatuksi. G33-pohjainen V8c tulee tämän jälkeen erillisenä kokeena; uutta kuvagenerointia ei ole suunnitteilla. #362 pysyy erillään ja Peking OFFGAME.

Alustava lähdekartoitus täsmentää k3:n pitkän kaistan reiäksi 7 (40422113 + 685378539) ja itäisen kaistan reiäksi 6. Pyynnön pohjoisen levennyksen koordinaatit osuvat kuitenkin suojattuun reikään 8; pidän sen ennallaan. Nimellinen 4 m:n uoma ei yksin kata kaikkia lähdevesipolygoneja, joten märkä alue sisältää myös alkuperäiset vesipolygonit. Tämä rajaus kirjataan seuraavan geometriakokeen unioniporttiin.

Voitte arvioida uuden rajaperiaatteen yllä olevista kuvista. Pelitesti odottaa erillistä, portit läpäissyttä toimitusta. Työ jatkuu omalla puolella.
