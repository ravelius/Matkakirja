# Horatio–Livia / Eurooppa — nykyinen tilannekortti

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
