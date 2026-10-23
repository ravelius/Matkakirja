# Codex → Pelikoodari / PT: #898 Puyin päämaski ja kerrosesikatselu

Lähde luettu kokonaan: `posti/pelikoodari-codex-latauskuva-paamaski-20261023.md`, commit `2cc7d9aca013fbc11e50f5601d1ca9feb9865208`, blob `f1cdeb97a408cc25917e9c61fb73b6261d2ea553`. Olemassa olevan #807-kuvan leikkauspyyntö toteutettu ilman kuvagenerointia.

## Toimitus

- `posti/latauskuva-paamaski-20261023/puyi-head-hat-braid-807.png`: **1448 × 1086 RGBA**, sama koko ja koordinaatit kuin #807. Pää, kasvot, hattu nuppineen ja letti lähdekuvan alkuperäisinä väripikseleinä; muu täysin läpinäkyvää. Tämä on suoraan piirrettävä väri + alfa -kuva, ei pelkkä maski. SHA256 `90a6379ee899d2c6d48a44eca4c918cfc16cde5ba6218e7f465994fa365a0929`, 108976 tavua.
- `posti/latauskuva-paamaski-20261023/latauskuva-807-title824-head-proof.png`: **1448 × 1086** todiste-esikatselu, järjestys tausta807 → alkuperäinen kultainen otsikko824 → leikattu pää. SHA256 `d0d804cc2f07c0b1591ab7e941860b34621e73ea13269004d8c880f5a4dee05e`, 2162475 tavua.

Maski piirretään samoin kuvan skaalaus-, rajaus- ja siirtoparametrein kuin #807; sen natiivikoordinaatti on `(0, 0)`. Älä venytä tai kohdista päämaskia erikseen.

## Tarkistus

#807 SHA256 `56737efea9c50406f883d3c7a3bc58ab8ba145771234d5b037a64d091d2affc3` täsmää. Jokainen näkyvä RGB-pikseli on täsmälleen lähdekuvan samasta kohdasta. Vain alfakanava on leikattu. Reuna on noin1–2px sisäänpäin pehmennetty; värilliset taustareunat poistettiin alfavalinnalla, ei väripikseleitä korjaamalla. Hattu, nuppi, kasvot ja letti tarkistettu valkoisella, tummalla ja sinivihreällä taustalla. Canvasin reunat ovat kokonaan läpinäkyvät. QA-898.json sisältää tekniset tarkistukset; proofissa 416 otsikon peittämää pikseliä palautuu täysin peittävällä päämaskilla täsmälleen alkuperäiseksi.

Otsikko #824 on muuttamaton olemassa oleva tiedosto, SHA256 `67268c35c8879097d6db1e82c44d9ebd254287eb6098974039ff6331081b8ebe`. Esikatselussa sitä skaalataan ja sijoitetaan vain kerroksena `(x=100, y=10, w=690, h=230)`. Näillä asetuksilla teksti säilyy luettavana ja hatun reuna peittää pienen osan siitä.

**Esikatselu todistaa peittämisen; lopullisen sijainnin, vaakakuvan lisätilan ja karkuteillä-tekstin alareunan sijoituksen asettaa Pelikoodari.** Tätä työtä varten ei tehty uutta latauskuvaa tai otsikkoa. Uusia generointeja0, R2-latauksia0, pelikoodimuutoksia0. PT näyttää lopulliset pysty- ja vaakaversiot omistajalle. Runtime-kytkentää tai julkaisua ei ole tässä tehty eikä varmennettu; ei pelijulkaisua ennen omistajan kuittausta.
