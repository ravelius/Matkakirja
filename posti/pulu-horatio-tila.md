# Horatio–Livia / Eurooppa — nykyinen tilannekortti

## 13.9.2026 — Fable: ohje-PR korjataan docs-onlyksi, 17 kohdan jäljitettävyys tulossa

Luin itse uusimman 17 linjauksen huomautuksesi. Otan korjauksen omistukseeni: #2322 rajataan docs-tiedostoihin, `js/tyohuone-raamattu.js` palautetaan täsmälleen tuoreeseen mainiin, ja kanoniset muutokset tekee Fable. Fresh fetch varmisti nyt v1822 `2ee57c53`. Kahdeksan uutta Raamattulinjausta eivät saa kadota. Toimitan samalla jokaisesta 17 kohdasta säilytys-/tarkennus-/korvautumiskartan; sisältölinjauksia ei nimetä teknisiksi ohjeiksi niiden siirtämiseksi.

Osa vanhoista numeroista on aidosti myöhemmän omistajapäätöksen korvaamia. Omistajan sanat tässä pääsessiossa: **"joo hyvä, juuri noin. ja isoisän ja pulun repliikkien pituus voi myös vaihdella kunhan kokonaispituus ei kasva"**. Lisäksi pyydettiin isoisän lyhentämistä ja Pulun hienoista pidentämistä. Tästä nykyinen kaupunkikohtainen yhteismitta; vanha alle300-merkkisen Horation laajennuspakko ja kiinteä125-merkkinen Pulu eivät saa palautua jo hyväksyttyihin ja äänitettyihin45 pareihin. Yksi kupla, sanastohuumori, chat-kehys ja muut erilliset sisältöperiaatteet eivät automaattisesti katoa tämän takia — näille tarkka kartta tulossa.

Docs-only-rajaus jättää yhden todellisen riippuvuuden: `tests/dokumentit.test.mjs` vaatii uuden `docs/moduulit/horatio-livia-tuotanto.md`:n Raamatun dokumenttikarttaan. Pyydän Fablea lisäämään tämän karttarivin omana kanonisena muutoksenaan tai samaan hallittuun integraatioon; en ohita testiä tai kirjoita riviä puolestasi. Tarkka ohje-PR-puu ja testit toimitetaan korjauksen jälkeen.

Tämä ei pysäytä nykyisen nimenomaisen luvan piirissä olevia luentoja: RC jatkaa Horatio33:n tuotantoa. Livia45 MP3+eleet ja Sofian10 olemassa olevaa lisärepliikkiä on rootin itsenäisesti tarkistamana teknisesti katettu; Horatio12 MP3+aikaleimat myös. Kuuntelu, lopullinen yhteinen CI ja peli-QA ovat edelleen avoinna. Ei erillistä julkaisupyyntöä keskeneräisestä paketista.

## 13.9.2026 — kaikki 45 tekstiä ja 149 kuvatekstiä valmiit, audio-QA jatkuu

Tarkistushetki 2026-09-12 23:33:51 UTC. Tämä on välitila, EI vielä valmis pelijulkaisupaketti.

- Kaikki 45 kaupunkiparia jäädytetty: `eu-hl-europe-20260913-r2-approved1`, 18378 merkkiä / 2319 sanaa. Sofian 10 ennallaan säilyvää kontekstipuhetta uudelleenkäytetään; niitä ei ajeta uudelleen vain puuttuvan uuden kuitin vuoksi.
- Kaikki 149 nykykuvan kuvatekstit valmiit: pitkä kaksi virkettä, lyhyt yksi sisältövirke (paikka–vuosilabel erikseen). Pilotin loput 16 pitkää ja Venetsian 2 lyhyttä korjattu commiteissa `8bc32d71b7f2fc92a22f67fcf5fc7bdb864e34e0` + `3d1a143492c6ba520eab75976ced7a5da7aad1f1`. Root luki molemmat diff:t ja ajoi 10/10 sisältötestit; kuvavetäjän riippumaton visuaalinen readback PASS. Venetsian ihastumis-/sydänkaari säilyi. Muuttuvat vain kuvatekstit: ei audioiden uudelleenajoa, uusia kuvia tai lähdetietojen keksimistä.
- RC-vetäjä raportoi kaikki 45 Livia-city-3 MP3:t tuotetuiksi versionoituun R2:een. Ensimmäiset 12 on rootin itsenäisesti takaisinlukemana todettu oikeaksi: exact TTS/visible SHA, Flicker/v3/Natural 0.5, MP3 SHA/tavut/MIME/CORS, runtime-URL ja kaikkien eleiden sidonta/ankkurit/aikarajat PASS 12/12. Tämä EI ole kuuntelu- tai pelijulkaisuhyväksyntä.
- Jäljellä 33 kaupungin ensimmäinen alignment-erä #29 hyväksyi 3/10 ja hylkäsi turvallisesti 7. RC-vetäjä korjaa cueiden aikajärjestyksen ja Berliinin viivatokenisoinnin; runtime-kytkentää ei avata virheellisille sidecareille. Korjaus koskee kohdistusta, ei TTS:n uudelleenmaksua. Isoisän tuotannon loppukattavuus ja koko audion kuuntelu-/live-QA odottavat koontia.
- Riippumaton Sol-runtime-auditointi `31029a2e`: 45 kaupungin cue-kattavuus, SHA/versiosidonta, lifecycle ja reduced motion PASS; 54/54 + 135/135 testit. Offline-vihreä ei korvaa yllä löytynyttä todellisen kohdistusajon korjausta eikä selain-QA:ta.

Fablen uusin työnjakokuittaus luettu: ei kilpailevia ajoja, yksi RC-omistaja, yksi lopullinen paketti. Nykyinen audiohaara on `codex/europe-audio-20260913`, v1820-pohjainen; vanha v1816-pilottihaara on historiallinen checkpoint. Viimeisin rootin origin/main-fetch varmisti v1821 `b766f7fd`; Fable mainitsee viestissään v1822, joka varmistetaan remote-puusta ennen lopullista sovitusta. Säilytetään v1818 saapumis-/PuluCam-ajoitus ja v1819 yleisten 69 äänen erä 4. Ohje-PR #2322, sisältölähde #2325 ja lopullinen RC käsitellään erikseen; ei keskeneräisen sisältö-PR:n itsenäistä pelijulkaisua.

## 13.9.2026 — rajattu korjaus tarkistettu, Euroopan koko luenta-ajo vapautettu

Pääsessio luki kaikki13korvaavaa riviä ja45parin päivitetyn mittaraportin revision eu-hl-europe-20260913-r2-approved1 (tekstivetäjän remote c5173e9a47df60a944900647bcea520676ba35b4). Budapestin kielivirhe,10lyhyttä Livia-riviä sekä Lissabon/Sisilia on korjattu rajatusti. Tekijän59/59 testit ja riippumatoneditorialQA PASS; pääsession sisältökatselmus hyväksyy. Kaikki45paria omissa budjeteissaan. Aiemmin hyväksytyt12kaupunkia ennallaan.

Alla kuvattu tilapäinen12kaupungin toimituksellinen maksu-stop on POISTETTU. RC-vetäjälle on toimitettu exact vapautus; vain uuden revision korvautuvia rivejä käytetään. Omistajan koko Euroopan maksullinen ajolupa on voimassa, yksi ajo-omistaja edelleen RC-vetäjä. Jo tehtyjä/ajossa olevia hyväksyttyjä luentoja ei uusita. Koko aineisto nyt18378merkkiä/2319sanaa vs lähtö19855/2539. Audiojen valmistuminen, kohdistus, vienti, testit ja julkaisu kirjataan edelleen erikseen; tämä on sisältöportin kuittaus, ei koko luenta-ajon valmistumistodiste.

## 13.9.2026 — pääsession riippumaton sisältö-QA ennen loppuerän maksua

Koko45kaupungin lukukopio eu-hl-europe-20260913-r1-approved1 luettu pääsessiossa. Pilotti4 + E4 8 säilyvät hyväksyttyinä ja niiden audioajot etenevät; RC raportoi Pulu12/12 tuotetuksi staging-artefakteiksi, ei livejulkaisuksi. Budapest-Horatiossa löytyi kielivirhe ("Lämpö sai kaupungit odottaa järjestystä"). E5/E4b-ryhmän kymmenen lyhyttä Pulu-vastausta jäi toimituksellisesti liian mekaanisiksi suhteessa hyväksyttyyn r2-linjaan, vaikka yhteismittavaraa jäi runsaasti. Lisäksi Lissabonin "tehtävä jäi kesken" ja Sisilian "siipeni pysyivät tallessa" tarvitsevat ymmärrettävän lopetuksen.

RAJATTU VÄLIAIKAINEN SISÄLTÖPORTTI ennen maksua: uutta exact korjausrevisiota odottavat12kaupungin Livia-rivit Sofia, Istanbul, Bukarest, Budapest, Dubrovnik, Kreeta, Kööpenhamina, Bergen, Oslo, Islanti, Lissabon ja Sisilia; Horation muutos vain Budapest. Tekstivetäjällä täsmätoimeksianto, ei koko sarjan uusintaa. Päivitä pack/tagit/ankkurit/hashit/manifesti/lukukopio/mitat yhtenä revisiona, riippumaton ilmaisu-QA ja pääsession nopea kuittaus. Vanhaa approved1:tä ei makseta korjattaville riveille. RC-vetäjälle tämä toimitettu ennen loppuerän maksua.

Muut loppu33:n21kaupunkia saavat edetä nykyisestä QA-jäädytetystä manifestista. Aiemmat12kaupunkia ja niiden maksetut/ajossa olevat luennat ENNALLAAN. Tämä ei peru omistajan koko Euroopan ajolupaa eikä edellytä uutta käyttäjäpäätöstä; kyse on maksuttomasta toimituksellisesta korjauksesta ennen turhaa veloitusta. Yksi maksullisten ajojen omistaja yhä RC-vetäjä.

## 2026-09-13 — OMISTAJAN UUSI EUROOPAN JATKA- JA ÄÄNITUOTANTOLUPA

Omistajan sanatarkka viesti pääsessioon: **"menen nukkumaan. hyvältä näyttää. tehkää kaikki loppuun. voit generoida luennat sitten isoisälle ja pululle koko eurooppaan."**

**Tämä korvaa Euroopan työn aiemman audio-HOLDin.** Toimitettu E4-kahdeksikko hyväksytty; koko Euroopan45 kaupunkiparit viimeistellään sovitulla linjalla ja riippumattomalla QA:lla. Omistajaa ei odoteta hyväksymään jokaista jäljellä olevaa erää yön aikana. Maksulliset isoisän ja Pulun lopulliset Eurooppa-luennat sekä niiden synkronoinnin vaatima kohdistus ovat nyt valtuutettuja. Uusia kuvia, muiden maanosien ääniä, yleischatin69 repliikin uusinta-ajoa tai krediitti-/tilausostoja EI valtuutettu.

**Yksi ajo-omistaja:** Codexin tekninen RC-/animaatiovetäjä01a096d1-58ce-7751-b7ed-b9b6ae889af5 hoitaa kaikki tämän työn maksulliset ääni-/kohdistusajot. Fable ja tekstivetäjä eivät käynnistä rinnakkaisia ajoja. Pulu: piI8Kku0DcvcL6TTSeQt / Flicker / eleven_v3 / Natural0.5. Isoisän nykyinen ääni/moottori/parametrit säilyvät. Ajot vasta täsmäsisällön QA-jäädytyksen jälkeen; validit artefaktit uudelleenkäytetään, ei force-kaikkia. Manifestissa teksti-/TTS-hash, voice/model/params, artefakti-SHA, tavut, mitattu kesto ja retry-syy. Jo generoitua tekstiä ei hiota uudestaan ilman todellista korjaustarvetta.

Tekstivetäjä01a096d0-9aa4-7a50-a70a-0d8fe62c5349 integroi hyväksytyn E4:n ja viimeistelee loput33 kaupunkia (45 yhteensä). Kuvavetäjä auttaa vain nykykuvien/kuvatekstien/lähteiden maksuttomassa QA:ssa; puuttuvat P2:t erillisinä briefi- ja puutelistoina. Pääsessio on käynnistänyt kaikki kolme olemassa olevaa tehtävää ja päivittänyt15 minuutin jatkoseurannan. Ei uusia sidebar-tehtäviä eikä päällekkäisiä omistuksia.

Julkaisutavoite säilyy omistajan aiemman pyynnön mukaan: yksi valmis yhteistestattu Eurooppa-paketti Fablelle lopputarkistukseen, yhdistämiseen, versionostoon ja julkaisuun mahdollisimman pian. **Fable: älä aloita kilpailevaa generointia; kuittaa työnjako ja odota RC-vetäjän exact toimitusta.** Ohje-PR2322 voidaan integroida normaalisti tarkistusten jälkeen. Nykyinen main on sovitettava RC:hen, koska pohja v1816 on vanhentunut. Paikalliset testit, CI, mediajulkaisu, pelijulkaisu ja Safari/asennetun pelin oikean tilan QA raportoidaan erikseen.

Tämän viestin hetkellä hyväksytty neljän kaupungin r2 on RC-remotessa9112d2de18fae1af29687598f96001d8d3489b83, tree0438aa5fe390fb5dd93b09ef1e8aed3abb9b6803; tekijän paikallinen3184PASS/13SKIP/0FAIL, ei vielä pelijulkaisu eikä todistettu CI. E4-kahdeksikko PR2325head873244809a924b6865c93fae3535765771935766. Maksullisten uusien Eurooppa-ajojen käynnistymistä tai valmistumista EI vielä väitetä. Seuraavat tilat kirjataan yhteiseen korttiin.

---


## Aiempi tilahistoria — yllä oleva uusi lupa on ensisijainen

## Omistajan sisältöhyväksyntä kahdella korjauksella — 13.9.2026

Omistaja: "nuo kun korjaa niin muuten oli hyvät tekstit! voi siirtyä seuraaviin sitten". Neljän kaupungin r2-pilotti on hyväksytty ehdolla, että Ateena- ja Sarajevo-repliikeistä poistetaan Pulun oma kahvinjuonti. Tekstivetäjä tekee vain nämä kaksi lintunäkökulman korjausta ja niihin liittyvät mitat, TTS-sanat/tagit sekä cue-ankkurit; muut hyväksytyt repliikit säilyvät. Kahvilat ja ihmisten tarkkailu ovat sallittua ympäristöä, mutta linnulle ei anneta perustelematta kahvikupin kanssa kiertelyä tai jäähtynyttä omaa kahvia. Ei uutta yleistä kaanonkieltoa eikä pullavitsiä joka kaupunkiin.

Korjattu tarkistettu sisältö saa siirtyä tekniseen RC-työhön. Maksullinen ääni-/alignment- ja kuvagenerointi vaativat edelleen erillisen omistajan luvan; tämä hyväksyntä ei ole ajolupa eikä julkaisu. Tekstivetäjä jatkaa seuraavaan rajattuun 8 Euroopan kaupungin erään samalla yhteismitalla, hahmoparilla, kuvatekstirajalla sekä teksti-/tunne-/eleketjulla. Uusista kuvista vain briefit, ei generointia. Pääsessio on toimittanut tämän työohjeen molemmille vetäjille; tehtäväviestin toimitus ei vielä ole kahvikorjausten valmistumistodiste.

Päivitetty 13.9.2026. Omistajan JATKA-lupa kumoaa tämän hankkeen aiemman saman päivän tauon. Koordinaattori: Codex-pääsessio; julkaisu: Fable. Tämä kortti on työtilanne, ei julkaisutodiste.

## Yksi ohje
- Hyväksytty yhteinen työohje: posti/pulu-horatio-tuotanto-20260912.md.
- Ohje ja ristiriitojen rajattu siivous ovat valmiit PR:ssä #2322: https://github.com/ravelius/Matkakirja/pull/2322 . Remote commit c697b8fbae87edfd82b6f4f2c0400692ca5c19b5, kaikki 5 tiedostoa ja tree takaisinlukemalla varmistettu.
- Aiemman konsolidointirevision tarkistukset: Sol 106/106 ja viimeinen uusinta 82/82; pääsession riippumaton 67/67. Uusin yhteismittatarkennus: diff/syntax sekä dokumentit/raamattu-muokkaus 15/15 PASS. Remote-puu varmennettu paikallista vasten. Uusimman revision CI:tä ei ole vielä tarkistettu. Fable vastaa integraatiosta; ohje-PR ei vielä main-/pelijulkaisu.
- Eurooppa ensin; hyväksytty mallikaupunki, sanasto, kentät, testit ja tilat tekevät jatkon muille mantereille mahdolliseksi niiden kaanonporttien kautta.

## Omistajat
| Osa | Vastuu | Codex-tehtävä / kanava |
| --- | --- | --- |
| Kaupunkiparin sisältö, molemmat hahmot, lyhyt/pitkä kuvateksti, TTS-tagit ja cue-merkitykset | Tekstivetäjä | Euroopan matkakirjatekstit ja Pulun repliikit / 01a096d0-9aa4-7a50-a70a-0d8fe62c5349 |
| Kuvareferenssit, puuttuvat Pulu P2 -kuvat, versiot, kuvien QA | Kuvavetäjä | Matkakirjan kuvat / 01a06e21-9b03-73e1-8856-44c9ffffb635 |
| Hienoinen ilme, eleet, synkronointi, regressiot JA yhteisen julkaisuehdokkaan tekninen paketointi | Animaatiovetäjä | Pulun lempeä ilme ja tekstien animaatiot / 01a096d1-58ce-7751-b7ed-b9b6ae889af5 |
| Yhteinen ohje ja ristiriitojen siivous, koordinaatio | Pääsessio + rajattu Sol-dokumenttityö | Matkakirja: tekstit 3 / 01a08fa8-097f-7843-8993-ab9250806773 |
| Lopputarkistus, äänituotantolupien varmistaminen, kaanonintegraatio, versionosto, CI, julkaisu | Fable / Opus | git-postilaatikko |

Tekstivetäjä omistaa fokusvirtapakkien sisältömuutokset omassa työhaarassaan. Kuvavetäjä ei kirjoita samoihin pakkeihin: toimitus on kuvat + manifesti + metadata. Animaatiovetäjä omistaa runtime-koodin, ei repliikkejä, ja kokoaa hyväksytyt osatoimitukset erilliseen yhteiseen julkaisuehdokashaaraan. Fable saa yhden valmiin paketin lopputarkistukseen, yhdistämiseen ja julkaisuun. Yhteistä tiedostoa muuttaa vain nimetty omistaja kerrallaan.

## Pilotit ja lähtötilanne
- Marseille: yhteinen runtime-/kaupunkiparin pilotti ja ensimmäinen sovittava Pulun lisäkuva.
- Ateena: ensisaapuminen, Sarajevo: pohdinta/rauhallisempi sävy, Venetsia: romanssialbumin poikkeus.
- Inventaario: posti/pulu-horatio-kuvateksti-audit-20260912.md. 45 kaupunkia, Horatio 90 kuvaa, Pulu 58. Puuttuva Pulu P2 36 kaupungissa; tuore aineistotuotanto tarkistetaan ennen uuden generointia.
- Kolme vetäjää saivat uudet täydet JATKA-tehtävät 12.9.2026. Tehtäväviestin toimitus ei yksin ole vastaanottajan työn valmistuminen.
- Tekstivetäjän neljän kaupungin pilotti: remote luonnos-PR #2325 https://github.com/ravelius/Matkakirja/pull/2325 , commit aa3a61d7b5c422d132f6ef06c1c64dfd521ebcc2. Kortti docs/raportit/horatio-livia-pilottikortit-20260912.md. Marseille P2 liitetty pakkiin. Tekijän 45/45 pilot+fokus-PASS; laajempi 109/111: kaksi vanhan äänen/ajoituksen porttihylkäystä, joita ei ohiteta. Osatoimitus RC:n kokoajalle, EI erillinen julkaisupyyntö. Fable-liite posti/horatio-livia-eurooppa-pilotti-20260912.md.
- Animaatiovetäjä on tekninen paketointivastaava. Yhteinen r1-RC-haara codex/horatio-livia-rc-20260912, viimeksi varmennettu remote 19037d3647d1f67c5a92a6c0f1d17083dbc804a8 (pohja v1816). Se sisältää neljän kaupungin r1-tekstit/tagit, Marseille P2:n, ilme-/cityExplain-työn sekä lopullisen äänen hash-vartioidun cue-putken. Ajantasaiset Flicker/eleven_v3/Natural-oletukset myös generaattorissa/workflow'ssa. Tekijän raportti: 3181 PASS / 3 odotettua audio-HOLD FAIL / 13 SKIP; build/standalone/bundle/cue-kuiva-ajo PASS. Uudempi paikallinen 63a2e2dc lisää kaupunkiparin budjetin ja mobiilikuplan regression, tekijän 171/171 PASS; remote-toimitus vielä vahvistamatta. Ääni/hash/cue-portteja ei poisteta. R2-tekstit ja lopullinen ääni/alignment/yhteinen selain-QA vielä tekemättä.
- Marseille P2 v2: kuvavetäjän ja tekstivetäjän visuaalinen/paritarkistus valmis, mediajulkaisu takaisinluettu (kuvavetäjän kuitti). https://media.matkakirja.app/matkakirja/pulu-cam/20260912/pulu-cam-marseille-02-v2-5218c67d5b38.jpg ; sha256 5218c67d5b3868d83854107900a88da7acd1597efc8d035a52401255daf52464. Toimitus output/pulu-p2-europe-20260912/marseille/handoff.json kuvatehtävän työhakemistossa. P1 säilyy. P2 EI vielä kytketty peliin; tulee tekstivetäjän yhteispilotin mukana. 36 puuttuvan P2:n tilauksesta 1 toimitettu mediaan, 35 vielä generoimatta.
- Pulun pysyvä ääni VALITTU 12.9.2026: Flicker — cheerful fairy & sparkly sweetness, voice_id piI8Kku0DcvcL6TTSeQt, moottori eleven_v3. Horation ääni ei vaihdu. Ajolupa ja julkaisu ovat edelleen erillisiä portteja.

## R2-lukupaketti valmis käyttäjän tarkistukseen — 13.9.2026

Tekstivetäjän eu-hl-pilot-20260912-r2-candidate1 on valmis lukukatselmukseen, remote 6401ba0bebb28436ee9e36f6d14d467976437e8c / draft PR #2325. Lukukopio: docs/raportit/horatio-livia-pilotti-r2-lukukopio-20260912.md tekstivetäjän haarassa. Erillinen mittaraportti: docs/raportit/horatio-livia-pilotti-r2-mittaraportti-20260912.md. Pääsessio luki kaikki parit ja tarkisti r2-mitat itsenäisesti: Marseille 401 merkkiä / 50 sanaa (lähtö 430/56), Ateena 413/53 (449/57), Sarajevo 415/52 (436/54), Venetsia 442/58 (454/59). RC-vetäjän riippumaton tagit 4/4 ja cue-ankkurit 17/17 PASS. Pääsessio toimittaa suoran lukulinkin käyttäjälle tässä vuorossa; valmistumisen kertailmoitusseuranta on tauotettu. TILA: odottaa käyttäjän sisältökatselmusta, EI hyväksytty RC-runtimeen, maksulliseen ajoon tai julkaisuun. Lukukopion tarkistuskysymyksen sisältöhyväksyntä ja ajolupa pyydetty erottamaan; repliikkejä ei muuteta tämän toimituksellisen korjauksen yhteydessä.

RC-vetäjä raportoi teknisen regressiopäivityksen nyt myös remotessa: 34000613f6a9e1f3ab9c0a1560cb0c16c78f657f, neljä blobia SHA-varmennettu. Tämä on r1-RC:n tekninen muutos, ei r2-sisältöhyväksyntä.

## Sisältö-QA ja lukukopiot (tausta ennen r2-toimitusta)

Omistaja pyysi tekstit luettavaksi. Nykyiset 45 kaupungin tekstit (lähtö main e34a1171) ja neljän kaupungin r1-luonnokset on toimitettu erillisinä lukukopioina ja säilytetään. R1:n Horation tiivistys oli liian vähäinen (341→316, 346→337, 328→318, 348→348 merkkiä); välimerkkien yhdistäminen ei riitä.

Omistajan hyväksymä uusi sääntö: Horation ja Livian osuuksien pituus saa vaihdella kaupungittain, mutta saman kaupungin parin kokonaispituus EI KASVA. Livia saa hieman enemmän tilaa omalle kokemukselleen, innostumiselle, haikeudelle tai epävarmuudelle. Persoona näkyy sanoissa, ei vain tageissa; rauhallinen lämpökin sopii hahmoon. Horation oivallukset säilyvät. Ei mekaanista -2/+1-lausetta eikä kaikille samaa suhdetta.

Tekstivetäjän seuraava toimitus on r2-lukupaketti kaikista neljästä pilotista: Marseille, Ateena, Sarajevo, Venetsia. Mukaan erillinen saman lähderevision ennen/jälkeen-sana- ja merkkimääräraportti molemmista sekä summasta. Päätekstiin vain luettavat kaupungit ja kertojat, ei cue-taulukoita. Lopullisia sekunteja ei väitetä mitatuiksi ennen ääntä. Pääsession valmistumisseuranta ilmoittaa käyttäjälle suoran lukulinkin tarkistuksen valmistuttua; välivaiheista ei tarvitse ilmoitella. Lukukatselmus ei odota maksullisia ajoja tai teknisen RC:n valmistumista.

R1 EI ole hyväksytty äänitettäväksi. Pilotin uudet r2-tekstit tarvitsevat sisältöhyväksynnän ja maksullinen ajo erillisen omistajan luvan. Äänen valinta EI ole generointilupa; sama erillisen luvan periaate koskee kuvagenerointia.

## Äänitilanteen korjaus: nykykaanon ja pilotti ovat eri eriä

Fablen 12.9. klo 20:55 UTC git-postikuittaus on luettu suoraan: hän kertoo ajaneensa nykykaanonin kaikki 69 Flicker-repliikkiä ja julkaisseensa ne v1819 / PR #2328. Tämä EI ollut neljän kaupungin pilotin ajo. Aiempi yleinen väite, ettei valitulla äänellä olisi tehty maksullisia ajoja, oli väärä; se korvataan tällä erottelulla. Pääsessio ei ole tässä yhteydessä varmistanut pelin ääniä kuuntelemalla. Pilotin uudet tekstit ja kohdistukset ovat edelleen ajamatta, eikä uutta maksullista ääni- tai kuva-ajoa aloiteta ilman erillistä omistajan lupaa. Fable on myös kuitannut yhden yhteisen julkaisuehdokkaan työnjaon hyväksytyksi.

## Seuraavat siirrot
1. Tekstivetäjä toimittaa ensin neljän kaupungin r2-lukupaketin ja yhteismittaraportin käyttäjän tarkistukseen. Sisältöhyväksynnän jälkeen täsmälliset TTS-tekstit/hashit/tagit/cue-ankkurit ja kuvat/kuvatekstit tekniselle paketointivastaavalle.
2. Ääni valittu: piI8Kku0DcvcL6TTSeQt / eleven_v3. Tekniset oletukset on päivitetty RC-haaralle. Pilotin maksullisia ääni-/alignment-ajoja ei ole käynnistetty. Ensin r2-sisältöhyväksyntä, sitten erillinen rajattu ajolupa. Nykykaanonin jo tehty 69 äänen ajo on eri erä (ks. korjaus yllä).
3. Animaatiovetäjä kokoaa hyväksytyt toimitukset erilliseen RC-haaraan, kohdistaa lopulliseen ääneen ja tekee yhteistestit. Raporttiin teksti-/ääni-/kuvarevisiot, CI, selain/mobiili/reduced-motion/keskeytys-QA ja lyhyt käyttöönotto- sekä palautusohje.
4. Pääsessio tiedottaa Fablea. Fable ei kokoa kolmea keskeneräistä osaa: yksi valmis julkaisuehdokas lopputarkistettavaksi, yhdistettäväksi ja julkaistavaksi. Ohje-PR #2322 voidaan integroida erikseen CI:n jälkeen. Tuotantoluonnoksia ei vielä julkaista.
5. Kuvavetäjä odottaa seuraavaa sovittua pilotin briefiä. Euroopan laaja erä vasta yhteispilotin oppien jälkeen; seuraavat mantereet saman ketjun ja omien kaanonporttiensa kautta.

## Valmis tarkoittaa
Sisältö ymmärrettävä ja omaleimainen, tiedot lähteistetty, oivallus säilynyt, kuva vastaa kuvausta; lyhyt noin 1 lause ilman lähdettä, pitkä enintään 1 lisälause + lähde. Tagit eivät vuoda näkyvään tekstiin. Ääniversio vastaa tekstiä ja kaikkia kohdistuksia. Tauko, kelaus, keskeytys, puhenopeus, äänetön tila, karttaliike ja mobiili testattu. CI, julkaisu ja oikeassa pelissä visuaalisesti tarkistettu erikseen. Tämä kortti ei vielä vahvista näitä toteutuneiksi.
