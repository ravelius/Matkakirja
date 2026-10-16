# Peking #361 ja #362: aloitus V6:n päälle, yksi ruutu

Luin lähdepostisi `addcc8ac14ddc4c2aeaef16261ba81fbbfa6a34b` kokonaan ja varmennin blobin `607a0c51bea367fef8a0d7c62b9259da17f946f1` sekä 2968 tavua. Kirjaan V6:n vastaanottokuittauksen ja pelitestin aloituksen, en vielä pelituloksen hyväksyntää. Aloitan #361:n ja #362:n V6:n päälle odottamatta #360:n pelitulosta. Vaikutus rajataan ruutuun `peking_2_3`; koko kaupunkiin ei laajenneta ennen pelikuvan hyväksyntää. Tämä on aloitusviesti, ei #361/#362-toimitus.

## Seuraava konkreettinen koe

Teen V7:ään ensin #361:n: uuden yhtenäisen albedo/normal/karheus-kokonaisuuden, jonka kivijako ei toista vanhaa 4,8 m:n kuviota. Pihat rajataan olemassa olevasta geometriasta, suunta sidotaan viereisiin muureihin, keskikäytävä ja sivukaistat erotetaan hillitysti ja kuluma kohdistetaan lähdegeometrian portti–halli-yhteyksiin. Kiveyksen suunnittelu on koemateriaalin ratkaisu, ei väite historiallisesti mitatusta ladonnasta.

LOD0:n värikartta on noin 0,25 m/pikseli, alemmat LOD:t pienempiä. Normal enintään 1024 px, kohdistettu samaan uuteen kivijakoon; mukana huomioidaan ETC1S-laatu192:n vaatima kontrasti. AO säilyy erillisenä lineaarisena occlusion-kuvana ja byteilleen V6:n mukaisena. Sitä ei leivota albedoon. Alkuperäiset RGB-tiedostot säilyvät; uudet materiaalikartat tehdään kokonaisina uusina sukupolvina/leivontoina. Tarvittava primitiivien yhdistäminen säilyttää alkuperäisten kolmioiden kulma-POS/NORMAL/UV0-arvot; sama teksturoitu materiaali ei saa jäädä jaetuksi uusissa pinnoissa. Raportoin toteutuneen koon ja erillisen muistiarvion suhteessa V6:een.

#362:n punaseinät ja kuluma valmistelen erillisenä V8-kokeena, jotta #361:n vaikutus näkyy pelivertailussa selvästi. Astran visuaalinen arvio ja Solin tekninen tarkistus jatkuvat erillisissä raportointirooleissa. Olen ainoa mallien kirjoittaja ja renderöijä.

## Kattokullan303 täsmennys ennen sitomista

Lähdepostisi ohje on: “Jos 303-suojaus estää tämän, kysy minulta ennen kuin ohitat sen.” Nykyinen työ pitää hyväksytyn303-perusvärin, materiaalin ja alkuperäiset RGB:t lukittuina. En ohita tätä hiljaa.

Konkreettinen ehdotus on kuusi erillistä, rakennuskohtaista koemateriaalia: suhteelliset sävy-/kirkkauspoikkeamat −7,5 %, −4,5 %, −1,5 %, +1,5 %, +4,5 % ja +7,5 %, rakennusten kattopinta-alalla painotettu keskiarvo täsmälleen nykyisessä303:ssa. Lasitteen/saumojen karheusvariantit olisivat nykyisen noin0,53-tason ympärillä. Alkuperäinen kuva ja perusmateriaali säilyvät, mahdolliset uudet kuvat tehdään kokonaisina materiaalileivontoina. Ehdotusta ei ole sidottu GLB:hen.

Vahvistatko, että tällaiset erilliset variantit sallitaan ruudussa2_3, kun pinta-alapainotettu303-keskiarvo ja alkuperäiset bitit säilyvät? Jos suojaus koskee myös jokaista yksittäistä katon materiaalifaktoria, teen ensin vain karheus-/kulumatestin ilman kattosävyn muutosta. Jatkan #361:tä ja punaseinien valmistelua tämän täsmennyksen aikana.

Lähdevastaanotto ja sitomaton303-ehdotus ovat viestin mukana JSON:na. Kaikki omat tuotanto- ja välitiedostot T7/NAS. Ei Unity-, R2-, main- tai julkaisumuutoksia; Pekingin piilotettu peliversio on vastaanottajan vastuulla. Uusi paketti toimitetaan erikseen vasta toteutuneen kokeen ja tarkistusten jälkeen.
