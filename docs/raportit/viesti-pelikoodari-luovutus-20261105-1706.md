# Pelikoodari: luovutus 5.11.2026 klo 17.06 (tilinvaihto): ovilehdet seinää vasten ja kameran kuvakenttä korjattu, katseluajo käynnissä L2:lla

Korvaa -1638:n tilan. -1638:n kohdat 2.3, 2.4 ja 2.5 sekä kohta 3 pätevät edelleen, samoin -1602:n kohta 3, -1413:n kohdan 3 kohdat 3–4, -1337:n kohta 3 ja -1225:n kohdat 1, 2 ja 5. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `4c4cf9d8d` (pushattu natiivi-backupiin). Juoksutestit 197/197, unity-tarkistus 0 virhettä. Ei iPad-ajoja, ei junaan mitään.

## 0. AJO KÄYNNISSÄ, EI UUDELLEEN
JU antoi vuoron L2:lle (`PROTO_LINJA=2`) ja `4c4cf9d8d`:lle, kaksi ajoa peräkkäin. Käynnistetty 17.0x skriptillä `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/b28cbd84-bfd7-4a65-86b4-d9be442b4ad9/scratchpad/ajot.sh`, skriptin pid 76844.
1. Katselu: `tyokalut/esikatselu.sh 4c4cf9d8d .../vapaa-1/sk-g.txt`, loki `proto-3d/_tyo/pelikoodari/vapaa-1/aja-i.log`, kuvat `proto-3d/lokit/esikatselu-20261105-170630`.
2. Ovi: `tyokalut/tarkastelu_kuvat.sh 4c4cf9d8d tyokalut/koekuvat-ovimalli-yihe.txt`, loki `vapaa-1/aja-j.log`.

**Rivi JU:lle (`local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`), kun vuoro vapautuu.** Sitä ei ole vielä lähetetty. Valmis, kun `aja-j.log` on päättynyt eikä pid 76844 ole enää käynnissä. Jos ajo kuoli tilinvaihdossa, pyydä uusi vuoro JU:lta.

## 1. Tehty, ei vielä nähty pelistä
- `f24fccc6b` ovilehdet: mitattu kartasta ja `JuoksuOvet.json`:sta, lehti osui kuljettavalle 163 ovella 245:stä, ja 122 ovella se oli 90 asteessa ja ulottui 1,37 m. Kuvien e22, e24, e27 ja e32 kuja on 绥寿殿:n (−138,74; 357,14) ja 益寿斋:n (−134,36; 383,78) edessä, edusta 5,5 m. E22:ssa keisarin kaapu puhkaisee lehden. Nyt kaikilla ovilla 11 astetta, ulottuma 0,40 m (`JuoksuKulkuKartta.OviLehtiKulma`). Testi `OvilehtiEiTorrotaKujalla`.
- **Kerro KK:n rivillä:** tämä muuttaa ovien ulkonäköä, ja omistaja sanoi 5.11., että ovet kelpaavat. Aiemmin noin puolet ovista oli 90 asteessa, muut 11–90 asteessa.
- `4c4cf9d8d` kuvakenttä, luovutuksen ulkopuolinen löydös: `ui juoksupeli paikka` -rivit ajossa 162628 näyttivät kentän 18–60°. Vanhan kameran tele ja etäisyyskorjaus ajoivat yhä kuvakenttää vapaan kameran alla. Kujalla 21–30°, joten ovilehti täytti kuvan. Vapaalla kameralla on nyt yksi kenttä, `DroneNosto.KujaKenttaan(…, 1f)`, vaakakuvassa 60° (`KujaKentta`, jolle kameran matalat arvot on mitoitettu). Sekoitus samalla painolla kuin kameran paikka. `kenttä` QA-rivillä näyttää nyt todellisen kentän (`kuvaKentta`).
- **-1638:n kohta 2.2 (keisari alareunassa, e13, e37)** selittyy luultavasti samalla kentällä, mutta sitä ei ole todennettu: e13:n ja e37:n omaa kenttää ei kohdistettu lokista. Testi `KeisarinJalatPysyvatKuvassaKaannoksenJalkeen` (90 asteen käännökset) mittaa vain uutta kenttää; se ei toista alkuperäistä kuvaa.

## 2. Seuraavaksi, järjestyksessä
1. **Katso ajon kuvat täysikokoisina (Raamattu 9.5):** ainakin e22, e24, e27, e32 (ovi ei peitä), e13, e37 (keisari kokonaan kuvassa), `kenttä` lokista 60°. Ovikuva `ovi-颐和轩` ja `ovi-颐和轩-sivu` verrattuna `vapaa-1/ovi-yihe.png`:hen. Katso erityisesti, puhkaiseeko seinää vasten oleva lehti ikkunan kehyksen, pilarin tai poikkiseinän. Sitä ei voitu mitata kartasta: 49 oven sivukaistalla on ei-kuljettavaa, mutta se on enimmäkseen jalustaa.
2. Laajempi kenttä muuttaa kuvaa kaikkialla, joten katso myös keisarin koko ja pitääkö korkeuden käyrä säätää.
3. **Ympärikäännös, uusi, ei korjattu:** mitattu testissä aukiolla 60°:n kentällä: noin 0,4 s:n kohdalla kamera on keisarin kohdalla 1,2 m:n korkeudella, ja jalat ovat kuvan ulkopuolella noin 0,4–0,8 s:n aikana. Syy: jälki katkeaa käännöksessä, ja kamera lentää keisarin läpi uudelle puolelle. Ei katsottu pelistä. Katso kuvat ja korjaa, jos se näkyy.
4. -1638:n kohta 2.3 (kynnysviesti, esineen rikkoutuminen, kiinniotto, omenan heitto, eunukit e23 ja e28) ja kohta 2.5 (rivi ja kuvat KK:lle).

## OPIT
Lue myös lokin muut arvot kuin se, jota etsit: `kenttä 27°` oli rivillä, jota luin paikan takia, ja se selitti kaksi eri vikaa. Testi kaatui ensin vain ympärikäännöksessä eikä toistanut e13:a, joten alkuperäinen selitys (käännös + katse eteen) oli väärä. Sisältyvä vanhan koodin arvo, jota ei käytetä paikkaan, voi yhä ajaa jotain muuta kuvassa.
