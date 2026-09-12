# Horatio–Livia / Eurooppa — nykyinen tilannekortti

Päivitetty 12.9.2026. Omistajan JATKA-lupa kumoaa tämän hankkeen aiemman saman päivän tauon. Koordinaattori: Codex-pääsessio; julkaisu: Fable. Tämä kortti on työtilanne, ei julkaisutodiste.

## Yksi ohje
- Hyväksytty yhteinen työohje: posti/pulu-horatio-tuotanto-20260912.md.
- Ohje ja ristiriitojen rajattu siivous ovat valmiit PR:ssä #2322: https://github.com/ravelius/Matkakirja/pull/2322 . Remote commit e4546fb5e11ad3359f7b4c8e9d89e3aa7582130b, kaikki 5 tiedostoa ja tree takaisinlukemalla varmistettu.
- Paikalliset tarkistukset PASS: Sol 106/106 ja viimeinen uusinta 82/82; pääsession riippumaton 67/67. GitHubin Testit käynnissä viimeisellä tarkistuksella. Fable vastaa integraatiosta; ei vielä main-/pelijulkaisu.
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
- Animaatiovetäjä KUITTASI teknisen paketointivastuun. Paikallinen animaatiocommit 032d60da; tekijän puhtaassa worktreessä raportoima 3167 PASS / 0 fail / 13 skip, standalone ja niputus vihreät. Remote-toimitus connectorilla valmistelussa. Kokoaa tekstipilotin, kuvahandoffin ja animaation erilliseen RC-haaraan; lopullinen ääni/alignment ja yhteinen selain-QA vielä tekemättä.
- Marseille P2 v2: kuvavetäjän ja tekstivetäjän visuaalinen/paritarkistus valmis, mediajulkaisu takaisinluettu (kuvavetäjän kuitti). https://media.matkakirja.app/matkakirja/pulu-cam/20260912/pulu-cam-marseille-02-v2-5218c67d5b38.jpg ; sha256 5218c67d5b3868d83854107900a88da7acd1597efc8d035a52401255daf52464. Toimitus output/pulu-p2-europe-20260912/marseille/handoff.json kuvatehtävän työhakemistossa. P1 säilyy. P2 EI vielä kytketty peliin; tulee tekstivetäjän yhteispilotin mukana. 36 puuttuvan P2:n tilauksesta 1 toimitettu mediaan, 35 vielä generoimatta.
- Pulun pysyvä ääni VALITTU 12.9.2026: Flicker — cheerful fairy & sparkly sweetness, voice_id piI8Kku0DcvcL6TTSeQt, moottori eleven_v3. Horation ääni ei vaihdu. Ajolupa ja julkaisu ovat edelleen erillisiä portteja.

## Sisältö-QA ja lukukopiot

Omistaja pyysi tekstit luettavaksi. Pääsessio teki puhtaan 45 nykytekstin kopion (main e34a1171) sekä erillisen neljän pilottiluonnoksen r1-kopion. Havainto: Horation tiivistys on toistaiseksi liian vähäinen (341→316, 346→337, 328→318, 348→348 merkkiä); moni virke on vain yhdistetty välimerkillä. Tekstivetäjää pyydetty valmistamaan yksi aidosti lyhyempi pari paritarkistukseen, ei hiljaista koko sarjan uudelleenkirjoitusta. Nykyistä r1-tekstiä EI vielä äänitetä. Tämä on äänenvalinnasta erillinen sisältöportti.

## Seuraavat siirrot
1. Tekstivetäjä toimittaa hyväksytyn pilotin, kuvat/kuvatekstit ja täsmällisen TTS-ajopaketin/hashit/tagit/cue-ankkurit tekniselle paketointivastaavalle.
2. Ääni valittu: piI8Kku0DcvcL6TTSeQt / eleven_v3. Animaatiovetäjä päivittää pysyvät tekniset oletukset ja TTS-ajopaketin RC-haaralle. Maksullisia ääni-/alignment-ajoja ei ole käynnistetty. Ensin korjataan alla oleva sisältö-QA-puute, sitten ratkaistaan rajattu ajolupa.
3. Animaatiovetäjä kokoaa hyväksytyt toimitukset erilliseen RC-haaraan, kohdistaa lopulliseen ääneen ja tekee yhteistestit. Raporttiin teksti-/ääni-/kuvarevisiot, CI, selain/mobiili/reduced-motion/keskeytys-QA ja lyhyt käyttöönotto- sekä palautusohje.
4. Pääsessio tiedottaa Fablea. Fable ei kokoa kolmea keskeneräistä osaa: yksi valmis julkaisuehdokas lopputarkistettavaksi, yhdistettäväksi ja julkaistavaksi. Ohje-PR #2322 voidaan integroida erikseen CI:n jälkeen. Tuotantoluonnoksia ei vielä julkaista.
5. Kuvavetäjä odottaa seuraavaa sovittua pilotin briefiä. Euroopan laaja erä vasta yhteispilotin oppien jälkeen; seuraavat mantereet saman ketjun ja omien kaanonporttiensa kautta.

## Valmis tarkoittaa
Sisältö ymmärrettävä ja omaleimainen, tiedot lähteistetty, oivallus säilynyt, kuva vastaa kuvausta; lyhyt noin 1 lause ilman lähdettä, pitkä enintään 1 lisälause + lähde. Tagit eivät vuoda näkyvään tekstiin. Ääniversio vastaa tekstiä ja kaikkia kohdistuksia. Tauko, kelaus, keskeytys, puhenopeus, äänetön tila, karttaliike ja mobiili testattu. CI, julkaisu ja oikeassa pelissä visuaalisesti tarkistettu erikseen. Tämä kortti ei vielä vahvista näitä toteutuneiksi.
