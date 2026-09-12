# Horatio–Livia / Eurooppa — nykyinen tilannekortti

Päivitetty 12.9.2026. Omistajan JATKA-lupa kumoaa tämän hankkeen aiemman saman päivän tauon. Koordinaattori: Codex-pääsessio; julkaisu: Fable. Tämä kortti on työtilanne, ei julkaisutodiste.

## Yksi ohje
- Hyväksytty yhteinen työohje: posti/pulu-horatio-tuotanto-20260912.md.
- Ohje ja ristiriitojen rajattu siivous ovat valmiit PR:ssä #2322: https://github.com/ravelius/Matkakirja/pull/2322 . Remote commit 347aaee90f0a06ab88e20d1625c8cc77827a1763, kaikki 5 tiedostoa ja tree takaisinlukemalla varmistettu.
- Paikalliset tarkistukset PASS: Sol 106/106 ja viimeinen uusinta 82/82; pääsession riippumaton 67/67. GitHubin Testit käynnissä viimeisellä tarkistuksella. Fable vastaa integraatiosta; ei vielä main-/pelijulkaisu.
- Eurooppa ensin; hyväksytty mallikaupunki, sanasto, kentät, testit ja tilat tekevät jatkon muille mantereille mahdolliseksi niiden kaanonporttien kautta.

## Omistajat
| Osa | Vastuu | Codex-tehtävä / kanava |
| --- | --- | --- |
| Kaupunkiparin sisältö, molemmat hahmot, lyhyt/pitkä kuvateksti, TTS-tagit ja cue-merkitykset | Tekstivetäjä | Euroopan matkakirjatekstit ja Pulun repliikit / 01a096d0-9aa4-7a50-a70a-0d8fe62c5349 |
| Kuvareferenssit, puuttuvat Pulu P2 -kuvat, versiot, kuvien QA | Kuvavetäjä | Matkakirjan kuvat / 01a06e21-9b03-73e1-8856-44c9ffffb635 |
| Hienoinen ilme, eleet, prioriteetit, ääni-/kuva-/elesynkronointi, regressiot | Animaatiovetäjä | Pulun lempeä ilme ja tekstien animaatiot / 01a096d1-58ce-7751-b7ed-b9b6ae889af5 |
| Yhteinen ohje ja ristiriitojen siivous, koordinaatio | Pääsessio + rajattu Sol-dokumenttityö | Matkakirja: tekstit 3 / 01a08fa8-097f-7843-8993-ab9250806773 |
| Äänituotanto olemassa olevilla luvilla, kaanonintegraatio, versionosto, CI, julkaisu | Fable / Opus | git-postilaatikko |

Tekstivetäjä omistaa fokusvirtapakkien sisältömuutokset omassa työhaarassaan. Kuvavetäjä ei kirjoita samoihin pakkeihin: toimitus on kuvat + manifesti + metadata. Animaatiovetäjä omistaa runtime-koodin, ei repliikkejä. Fable yhdistää toimitukset. Yhteistä tiedostoa muuttaa vain nimetty omistaja kerrallaan.

## Pilotit ja lähtötilanne
- Marseille: yhteinen runtime-/kaupunkiparin pilotti ja ensimmäinen sovittava Pulun lisäkuva.
- Ateena: ensisaapuminen, Sarajevo: pohdinta/rauhallisempi sävy, Venetsia: romanssialbumin poikkeus.
- Inventaario: posti/pulu-horatio-kuvateksti-audit-20260912.md. 45 kaupunkia, Horatio 90 kuvaa, Pulu 58. Puuttuva Pulu P2 36 kaupungissa; tuore aineistotuotanto tarkistetaan ennen uuden generointia.
- Kolme vetäjää saivat uudet täydet JATKA-tehtävät 12.9.2026. Tehtäväviestin toimitus ei yksin ole vastaanottajan työn valmistuminen.
- Tekstivetäjän neljän kaupungin pilotti: paikallinen commit ef17029a, codex/europe-texts-20260912, pohja dd7154a3. Kortti docs/raportit/horatio-livia-pilottikortit-20260912.md. Tekijän raportoima oma pilottitesti 3/3 PASS, yhteisajo 109/111: kaksi vanhan äänen/ajoituksen porttihylkäystä. Ne estävät julkaisun; ei ohiteta testejä. Tekstivetäjä toimittaa GitHub-connectorilla oman luonnos-PR:n ja tarkan äänityötarpeen Fablelle.
- Animaatiovetäjä jakoi työn perusilmeeseen, ohjaimeen/synkronointiin ja riippumattomaan QA:han. Semanttinen cue-sopimus sovittu tekstivetäjän kanssa. Animaatioparin nykyinen viite tekstivetäjältä ca091023; lopullinen audioalignment ja yhteinen pelitesti vielä tekemättä.
- Marseille P2 v2: kuvavetäjän ja tekstivetäjän visuaalinen/paritarkistus valmis, mediajulkaisu takaisinluettu (kuvavetäjän kuitti). https://media.matkakirja.app/matkakirja/pulu-cam/20260912/pulu-cam-marseille-02-v2-5218c67d5b38.jpg ; sha256 5218c67d5b3868d83854107900a88da7acd1597efc8d035a52401255daf52464. Toimitus output/pulu-p2-europe-20260912/marseille/handoff.json kuvatehtävän työhakemistossa. P1 säilyy. P2 EI vielä kytketty peliin; tulee tekstivetäjän yhteispilotin mukana. 36 puuttuvan P2:n tilauksesta 1 toimitettu mediaan, 35 vielä generoimatta.
- Pulun uusi iloisempi/suloisempi ääni: valintasuunnan kuvaus, voice_id ei lukittu. Ei uutta maksullista ääntä ilman tarvittavaa ajolupaa.

## Seuraavat siirrot
1. Tekstivetäjä lisää hyväksytyn Marseille P2:n ja lopulliset kuvatekstit yhteiseen kaupunkikorttiin; toimittaa oman tekstiluonnos-PR:n ja äänen muutostarpeet Fablelle. Äänipuutetta ei kierretä testien poistolla.
2. Fable tarkistaa ohje-PR #2322:n ja integroi CI:n jälkeen. Pilotin ääni valitaan/äänitetään voimassa olevien lupien mukaisesti; uuden Pulu-äänen voice_id on yhä avoin.
3. Animaatiovetäjä kohdistaa lopulliseen äänitteeseen, toteuttaa ilme-/elesopimuksen ja testaa elinkaaren. Yhteinen tekstin, kuvan, äänen ja eleen pilotti tarkistetaan oikeassa pelissä ennen laajaa monistusta.
4. Kuvavetäjä odottaa seuraavaa sovittua pilotin kuvakohtaista briefiä, ei tee irrallista 35 kuvan massasarjaa. Hyväksytyt nykyiset kuvat ja Venetsian albumi säilyvät.
5. Jokainen valmis siirto päivittää kaupungin version, todisteen, puutteen ja seuraavan tekijän. Eurooppa ensin, sitten sama koeteltu ketju seuraavan mantereen omien kaanonporttien kautta.

## Valmis tarkoittaa
Sisältö ymmärrettävä ja omaleimainen, tiedot lähteistetty, oivallus säilynyt, kuva vastaa kuvausta; lyhyt noin 1 lause ilman lähdettä, pitkä enintään 1 lisälause + lähde. Tagit eivät vuoda näkyvään tekstiin. Ääniversio vastaa tekstiä ja kaikkia kohdistuksia. Tauko, kelaus, keskeytys, puhenopeus, äänetön tila, karttaliike ja mobiili testattu. CI, julkaisu ja oikeassa pelissä visuaalisesti tarkistettu erikseen. Tämä kortti ei vielä vahvista näitä toteutuneiksi.
