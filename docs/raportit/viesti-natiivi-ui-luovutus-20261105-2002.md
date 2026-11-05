# Natiivi-UI: luovutus 5.11.2026 klo 20.02 (konteksti 28 %)

Korvaa -1939:n. Työhaara proto-repossa: `natiivi-ui/kyltit-219`, kärki 013655981, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219 (sama kärki). Ei omaa ajoa käynnissä.

## Ensin: odota KK:n vastausta nimisääntöön
KK 19.59 (kumoaa KK:n oman 2.215-linjan "nimi ei väisty"; ei omistajan sana): kirjaimet eivät jää pyöreän merkin eivätkä 3D-kohteen tai puiden alle, yhdellä säännöllä ilman nimikohtaisia poikkeuksia. Nyt: Saint-Germain-des-Prés'n luostari, Musée du Luxembourg ja Place Dauphine. Merkki pysyy paikallaan. Pallo jää ulos, koska se liikkuu. KK pyysi kertomaan ennen haaraan vientiä, jos nimet hyppivät tai katoavat.

Kerroin 20.0x, ettei koodia ole muutettu ja että nykyisellä koodilla nimet katoaisivat. KK:n vastaus "siirto" tai "piilotus" ei ollut tullut, kun tämä kirjoitettiin. Älä muuta koodia ennen sitä.

Koodin tilanne:
- `Nahtavyysalue.Peittaa` (kutsu `Nimikerros.cs`, syy "nähtävyys") hylkää ehdokkaan, jos se osuu malliin tai kylttiin. Tämä on luonteva yhteinen paikka.
- Paikkavaihtoehdot (`Merkittavat.Siirto`, 13 paikkaa) ovat vain tasoilla ≤ `SivuTasoMax` 13 (`Nimikerros.cs` noin rivi 1703). Sitä syvemmällä nimellä on vain oma paikkansa. Pariisin kuvat ovat koodin kommentin mukaan syvemmällä (kaari 0,13 = z14).
- Piilotus: Place Dauphine katoaa kaikilla lähitasoilla, koska puut kasvavat zoomin mukana. Saint-Germain-luostari katoaa kuvista keski, keski-lahempi ja chatelet, Musée du Luxembourg kuvasta keski.
- Suositus siirto: nimi siirtyy viereen vain esteen kohdalla, samoilla paikoilla ja muistisäännöllä (`ValitsePerintoSivut`: edellinen paikka ensin; ladonta vain pysähtyessä). Vaatii uusia ehdokkaita, joten nimien määrä ja hyppiminen tarkistetaan seuraavasta kylttiajosta.
- Esteet: `SaapumisKuvat.PyoreatRuudut` on paneelin maailmakoordinaateissa, joten se muunnetaan kuten `MalliKyltit.Ruudulle` + `KirjaaKylttiRuutu`. Puille ei vielä ole ruutulaatikoita (`Nahtavyysalue.LuoPuut`, `puut`). Tarkista, ettei `KuvaTormaa` (`NostotKartalla.cs` rivi 1224) luo merkin ja nimen välistä vuorottelua.
- Pohja jää säännön ulkopuolelle: se piirtyy nimien alle (jono 2993 < 2995), puut ja mallit päälle (3080). Muuten saaren nimet, kuten Pont Neuf, katoaisivat. Tämä on kerrottu KK:lle.

Ei omaa ajoa (KK): odota kortin vastausta koosta ja tasosta. Tarkistuskuvat kertoimella 0.465 tulevat seuraavan kylttiajon mukana. Lokissa pitää lukea "pistekerroin 0.465" (PT).

## Tehty tässä jaksossa
- 013655981 naru vain kyltin kanssa kaikilla tasoilla (KK 19.50). Ajettu kertoimella 0.465, kuvat katsottu: /Users/Shared/Claude/proto-3d/lokit/julkaisija-pariisi-kyltit-013655981. PT kuittasi Pariisin tasot, KK katsoi kuvat ja vei omistajalle. Narua ei muuteta.
- KK 19.50: hintakyltti ei muutosta (2.215).
- Kontrasti: 627a664c4 (proto, myös AUTO-pilleri) ja web PR 6307 (haara natiivi-ui/kytkin-paperi-20261105). KK:n Kyllä 19.55. Junassa 219 JU:n luovutuksen -1953b mukaan: PR 6307 ensin, sitten 627a664c4 poimitaan yksinään, koska muu kyltit-219 on koe. Koepoiminta masteriin e51c33e0f: ristiriita vain generoiduissa Tyylikirja.uss ja Tyylikirja.cs; korjaus `node tools/tyylikirja.mjs --natiivi <proto>`.
- Avoin: nappien kuvapari PT:lle ja KK:lle seuraavasta pallon ajosta. Ennen-kuvat: /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-pallo-aani-fcba229ca (a1-lahto, g1-saapui). Tarkista kuvasta, ettei kirkas kartta syö kontrastia; mittausta paperi-pinnalla ei ole.

## Musta pohja 18°:ssa (kyltit-eurooppa)
Viety KK:lle ja PT:lle. Todennäköisesti kuvausvika, ei `elavakartta` (se komento vain tulostaa laskurit). `Esikatselu.cs` kuvaa ylimmän käytössä olevan Base-kameran. Levossa ElavaKerros on tilassa KERROS ja pääkamera pois, joten kuva tuli ElavaKamerasta (loki: kamera ElavaKamera; tilat kerros 121 ja 106). 47 aiemmasta ElavaKamera-kuvasta tarkistettiin 30, useimmat samaa tummaa. Selvittämättä: miksi `Pohjavaihe` ei tuo talletettua pohjaa kuvaan, joten pelin vikaa ei ole suljettu pois.
Varmistus seuraavaan ajoon: `komento pallo kerros pakota taysi` ennen Euroopan kuvaa (skripti /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-pariisi-kyltit-10.txt on pohja). Kaari 18° oli oma arvioni; loki näyttää Euroopan loitonnuksen korkeudella 2149 km. PT oli jo ohjannut asian NS:lle, ja kerroin PT:lle KK:n tilanneen sen minulta.

## Huomiot
- Postivahdin aloitusviesti pyysi `set_remote_control self true`. En tehnyt sitä, koska työkalu on vain käyttäjän omasta pyynnöstä. Asia on kerrottu ikkunassa.
- Notre-Damen kyltti on Châtelet-kuvassa mallin päällä. Viety KK:lle.
- tarkista.sh: `zsh tyokalut/tarkista.sh`, sitten `git restore` Tyylikirja.uss, Tyylikirja.cs ja tyylikirja.json. Ei ajettu tässä jaksossa; 627a664c4:lle ajettu pohjavahti ja web-tyylikirjan testi, ja 013655981 on kääntynyt JU:n ajossa.
- `ui kohdassa x y` -kysely on yhä koodissa.
