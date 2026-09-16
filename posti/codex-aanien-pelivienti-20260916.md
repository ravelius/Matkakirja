# 16.9.2026 — omistaja pyytää nimi–iskulauseäänet peliin nyt

Omistajan uusi pyyntö: lisää tekstityöpöydälle painike, jolla voi viedä joko yhden kaupungin tai kaikkien kaupunkien uudet generoidut puheet peliin; lisäksi kaikki valmiit kaupunginnimet ja iskulauseet nyt peliin, jos puuttuvat.

## Heti kytkettävä valmis erä

- PR https://github.com/ravelius/Matkakirja/pull/2535 on edelleen avoin 16.9. aamun tarkistuksessa. CI vihreä, lähde `faf1ca50c81ba7bb3dc05f464af3db6c43943826`.
- 45/45 hyväksyttyä yhtenäistä Horation nimeä + iskulausetta, puhe yhdessä otossa luonnollisine taukoineen. Pulu ei puhu eikä näy näissä. Ei uusia äänityksiä.
- Täysi toimitus: `posti/codex-horatio-saapumisaanet-eurooppa-20260915.json` ja sama `.md`. URL:t, raakatavujen SHA:t, kestot ja hyväksytty sanamuoto lukittu; 45 GET/hash/decode-tarkistusta tehty.
- PR lisää ääniaineiston ja `haeSaapumispuhe`-haun. Varsinainen saapumistrailerin kytkentä ja julkaisu puuttuvat; tätä ei saa kuitata valmiiksi pelkällä aineisto-PR:n mergellä. Toisto odottaa ended/error, ohitus/kaupunginvaihto katkaisee, mykistys toimii ja päiväkirjan puhe ei mene päällekkäin.

## Työpöydän vientipainike (Codex työn alla)

Oman sivun / kaikkien sivujen valinta; muuttumaton hyväksytty erä ja takaisin näkyvä toimitustila. Vain uusin valmis ääni, joka vastaa nykyistä tekstiä ja Livialla myös tageja. Jo pelissä oleva URL ei lähde uudelleen. Puheiden sanat seuraavat ääntä; vanhoja eleaikoja ei saa käyttää uuden äänen kanssa. Ei maksullista generointia, kanonin muutoksia tai muiden muokkausten ylikirjoitusta.

Pelin kytkentä/julkaisu on nykyisessä työnjaossa Fablella. Codex kysyi omistajalta, annetaanko rajattu äänien pelivienti myös Codexille; vastausta ei ole tässä vaiheessa. Älä tee päällekkäistä työtä: kuittaa tänne, jos otat saapumisten kytkennän. Täydennän käyttöliittymän toimitussopimuksen, kun se on toteutettu.

## Vientisopimus toteutettu 16.9. klo 06.22 UTC

Tekstityöpöydän lähde 6be3903d03bfe002092d2246b94d18e09016fa04; yksityinen Sites-julkaisu käynnissä. Painike **Vie uudet äänet peliin** kysyy yhden kaupungin / kaikki ja erillisen vahvistuksen. Ei generointia tai automaattista game-mergeä. Vahvistettu muuttumaton erä ja sen push tallennetaan atomisesti; ilmoitus saapuu Codexille, joka toimittaa täsmällisen manifestin Fablelle.

- Palvelin vertaa uusimman puheen tarkkaa tekstiä/tageja omistajan nykyversioon ja tarkistaa julkaistun pelin media.js/liviapuhe.js/saapumispuheet.js-viitteet. Keskeneräiset muokkaukset, vanhat otot ja jonossa olevat ohitetaan. 45 hyväksyttyä saapumisottoa ovat myös työpöydän vientiluettelossa; vanhoja Pulun slogan-ottoja ei viedä.
- Codex lukee vahvistetun erän työpöydän `scripts/game-export-return.mjs read <pelivienti-id>` -komennolla. Vastauksessa muuttumaton payload, nykyiset kaupunkiversiot ja keskeneräiset kaupungit. Käsittely vaatii yhä täsmällisen uuden tekstin ja äänen yhteensopivuuden. Kyseessä ei ole lupa muokata muita kaupunkeja.
- Kuittaus samalle työpöydälle `status <kuitti.json>`: id, status (preparing / awaiting-release / published / blocked), lyhyt message ja valinnainen releaseUrl. Codex palauttaa nämä Fable-kuittauksen perusteella. `published` hyväksytään vasta kun erän täsmälliset MP3-viitteet löytyvät julkaistusta pelistä. Tämä ei korvaa pelisovelluksen toisto-/ele-QA:ta.
- Yksityinen Barcelona-tuonti on poikkeus: alkuperäiset hyväksytyt tavut pitää peilata pelin R2:een `audio/editor-approved/<sha>.mp3` ennen game-viitteen vaihtoa. Ei Site-yksityisosoitetta peliin, ei uudelleenkoodausta. Muut textdesk-äänet ovat jo julkisessa R2:ssa.
- Saapumisääniluettelo luetaan tällä hetkellä rajatulla JSON-rakenteella ja trailerin `haeSaapumispuhe(...)`-kutsulla; pelkkä aineistopaketti ei merkitse käyttökytkentää. Jos muutat tätä rakennetta, ilmoita Codexille, jotta vientitarkistus päivittyy eikä ohita tarkistusta.

Omistajan välitön 45 saapumisäänen pelivientipyyntö ei odota painikkeen painamista: yllä oleva PR ja valmis manifesti ovat tämän erän toimitus. Odotan edelleen kytkentä/julkaisukuittausta.
