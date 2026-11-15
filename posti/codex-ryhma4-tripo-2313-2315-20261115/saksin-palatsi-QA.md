# Saksin palatsi #2315 — riippumaton mallin QA

**Verdict: WARNING / KK:n malliarvioon.** Molemmat siivet, yhdyskolonnadi ja ala-arkadi ovat mukana, mutta pylväs-/aukkomäärä harvenee selvästi syötteestä. Malli ei ole hyväksytty tai integroitu peliin.

Luettu `../../saksin-palatsi/source-preparation.md`. Katsottu hyväksytty `../../saksin-palatsi/saksin-palatsi-model-v1.png` ja kaikki viisi paikallista QA-kuvaa: `qa-browser/01-plusX-full.png`, `02-plusZ-full.png`, `03-minusX-full.png`, `04-minusZ-full.png`, `05-upper-oblique-full.png`. Syöte- ja arkisto-SHA256:t tarkistettu kirjauksiin. Ei selainta tai uusia kuvia.

- **Kaksi siipeä ja yhdistävä osa: PASS syötekuvan yleismassalle.** Kolonnadi liittää molemmat siivet, eikä kokonaisuus supistu pelkäksi nykyiseksi kolmen kaaren muistomerkiksi. Siipikatot ovat matalia yhtenäisiä pintoja eikä uusia korkeita torneja tai mansardikattoja ilmesty.
- **Kolonnadin aukot: PARTIAL, selvä uusi harveneminen.** Ylemmissä pylväsväleissä näkyy katselimen tausta myös vastapuolen suunnasta: yhdysosa ei ole muuttunut umpiseinäksi. Syötteen tiheä, ohutpylväinen kaksoisrivivaikutelma kuitenkin harvenee mallissa muutamaksi suureksi suorakaiteiseksi aukoksi ja paksummiksi tukipilareiksi. Säilyvää avointa rytmiä ei pidä raportoida täsmälleen säilyneeksi pylväsjaoksi. Täsmäkolumnimäärää ei mitattu näistä UI-kuvista.
- **Alempi arkadi: PARTIAL.** Kaariaukot näkyvät taustaan aukeavina sekä+X- että-X-kuvassa; arkaditasoa ei poistettu. Myös kaarijako on silmin harvempi/leveyksiltään suurempi kuin tiheässä syötekuvassa. Kulkukorkeutta, pilaripoikkileikkauksia tai täydellistä geometrista läpäisevyyttä ei testattu. Kuvallinen avoimuus on selvästi parempi näyttö kuin pelkkä maalattu tumma ikkuna, mutta ei korvaa verkkotestiä.
- **Katot ja pihat: WARNING/rajattu hyväksyntä.** Oikean siiven laaja kattamaton keskus ja vasemman osan pitkä muoto säilyvät lähdekuvan tulkinnan mukaisina. **KK hyväksyi lähdekuvan oikean pihan ja vasemman pituuden varauksin; niitä ei tässä korjata eikä julisteta historiallisesti oikeiksi.** Yläkuvassa avoimilla alueilla näkyy katselimen tausta, joten erillistä pihapintaa tai sen materiaalia ei vahvisteta. Kattoliitokset, piiput ja piilopäädyt jäävät generaattorin sovituksiksi.
- **Julkisivut ja pinta:** ikkunarytmi, vaalea neutraali väri ja matalat kattolinjat seuraavat hyväksyttyä kuvaa yleisesti. Vastakkaiset julkisivut ovat säännöllistä täydennystä; yksityiskohtia ja siipien tarkkoja pituuksia ei hyväksytä yhden syötteen perusteella. Ei patsaita, puistoa, suihkulähdettä tai naapurirakennuksia. Pienet listat/ikkunat ovat paikoin sulautuneita.

**Suunnat ja tila:** dokumentoidut neljä sivua ovat katselimen paikalliset+X,+Z,-X,-Z sekä yläviisto. Ei maantieteellistä ilmansuuntarekisteröintiä, mittakaava- tai pelikamerahyväksyntää. Vuoden1939 identiteetti säilyy syötteen ehjän klassistisen palatsin tasolla, ei täydellisenä historiallisena pohjatodistuksena.

**Metadata:**1 926 397 kolmiota,1 083 791 POSITION-verteksialkiota,74 732 384 tavua. Upotetut JPEG:t: baseColor8192², normal4096², metallicRoughness4096². Ei ulkoisia riippuvuuksia tai vaadittuja laajennuksia. SHA täsmää. Metriikka on inventaario, ei täysi glTF-validointi.

**KK-rivi:** Molemmat siivet ja avoimilta näyttävät kolonnadi/ala-arkadi säilyvät, mutta pylväs- ja kaarijako harvenee syötteestä; oikean pihan ja vasemman pituuden ennestään hyväksytyt varaukset jäävät voimaan.

Ei korjausta, generointia, renderöintiä, selainta, lähetystä tai checkpoint/ledger-muutoksia. Vain glb-metrics.json ja tämä QA kirjoitettu; alkuperäinen GLB säilyi.
