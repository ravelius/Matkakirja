# Horatio–Livia / Eurooppa — nykyinen tilannekortti

Päivitetty 12.9.2026. Omistajan JATKA-lupa kumoaa tämän hankkeen aiemman saman päivän tauon. Koordinaattori: Codex-pääsessio; julkaisu: Fable. Tämä kortti on työtilanne, ei julkaisutodiste.

## Yksi ohje
- Hyväksytty yhteinen työohje: posti/pulu-horatio-tuotanto-20260912.md.
- Sama ohje kirjataan docs/moduulit/horatio-livia-tuotanto.md:ksi Raamattu-PR:ään #2322.
- Vanhojen ristiriitaisten aktiiviohjeiden rajattu siivous on käynnissä samassa PR:ssä. Ei koske muiden ominaisuuksien ohjeita.
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
- Aiemmat kolmen kaupungin tekstiluonnokset ja 7 tiedoston animaatioluonnos olivat tauon alkaessa testaamatta. Ne arvioidaan uudestaan tätä speksiä vasten; eivät ole hyväksytty valmis erä.
- Pulun uusi iloisempi/suloisempi ääni: valintasuunnan kuvaus, voice_id ei lukittu. Ei uutta maksullista ääntä ilman tarvittavaa ajolupaa.

## Seuraavat siirrot
1. Teksti- ja animaatiovetäjä sopivat minimaalisen kaupunkikortin sekä yhteisen tunnetagi-/elerekisterin.
2. Tekstivetäjä lähettää Marseillen kuvan ajatuksen kuvavetäjälle; tämä tarkistaa nykyiset ja jonossa olevat kuvat sekä yhden kuvan arviointikäytännön.
3. Tekstivetäjä tuottaa puhtaan tekstin, TTS-version ja semanttiset ankkurit samassa toimituksessa. Animaation millisekunnit syntyvät lopullisen äänen kohdistuksesta.
4. Fable tarkistaa ja integroi ohjeen/siivouksen; koordinoi äänivaiheen ja pilotin hyväksynnän ennen laajaa monistusta.
5. Jokainen valmis siirto päivittää kaupungin version, todisteen, puutteen ja seuraavan tekijän. Ei sokkoa kaupunki-/mannerkohtaista yhtäaikaista massatuotantoa.

## Valmis tarkoittaa
Sisältö ymmärrettävä ja omaleimainen, tiedot lähteistetty, oivallus säilynyt, kuva vastaa kuvausta; lyhyt noin 1 lause ilman lähdettä, pitkä enintään 1 lisälause + lähde. Tagit eivät vuoda näkyvään tekstiin. Ääniversio vastaa tekstiä ja kaikkia kohdistuksia. Tauko, kelaus, keskeytys, puhenopeus, äänetön tila, karttaliike ja mobiili testattu. CI, julkaisu ja oikeassa pelissä visuaalisesti tarkistettu erikseen. Tämä kortti ei vielä vahvista näitä toteutuneiksi.
