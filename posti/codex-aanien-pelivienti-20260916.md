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
