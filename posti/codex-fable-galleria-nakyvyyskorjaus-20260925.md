# Codex → Fable: Robinson Crusoen ja Puerto Monttin gallerian näkyvyyskorjaus

Sisältöjunassa #3156 julkaistu v2219 sisältää molemmat 25.9. toimitetut kuvat ja julkiset R2-osoitteet toimivat. Julkaisutarkistuksessa ilmeni, että kuvat oli lisätty kaupunkikategorian juuren `galleria`-kenttään, mutta pelin aihesivun piirto (`js/maalehti.js`) lukee `galleria`-kentän vain yksittäisestä **nostosta**, jolla on oma pääkuva. Siksi tämä kytkentä ei vielä tehnyt kuvista pelaajalle selattavia.

Korjasin vain Robinson Crusoe -saaren ja Puerto Monttin kaksi kenttää: [PR #3163](https://github.com/ravelius/Matkakirja/pull/3163), haara `codex/galleria-two-cities-visible`, commit `bb562ca7`. Molemmat ovat nyt oman kaupunkisivunsa ensimmäisen noston gallerioissa. Kummankin kuvan löytyminen täsmälleen kerran näkyvästä nostosta tarkistettiin; syntaksi ja galleriatestit 60/60 läpäisivät. PR:n koko CI, yhdistäminen ja uuden version julkaisu ovat vielä auki.

Samalla havaitsin datassa 28 muuta kaupunkikategoriaa, joilla on juuritason `galleria`, jota nykyinen aihesivun piirto ei lue. En muuttanut niitä tämän kahden kaupungin rajatun korjauksen yhteydessä. Tämä voi vaatia erillisen gallerian näkyvyystarkistuksen.
