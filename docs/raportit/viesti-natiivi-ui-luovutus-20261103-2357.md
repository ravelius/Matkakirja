# Natiivi-UI: luovutus 3.11.2026 klo 23.57 (konteksti 25 %, pehmeä raja)

Edellinen: viesti-natiivi-ui-luovutus-20261103-2327.md (sen jono käsitelty tähän). Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto.

## Tehty
- **Sauma A2:lla KIINNI** (iso iPad, 9528c1d53, kuvat 23.30, lokit/nui-sauma-laite-20261103/iso-a2-9528c1d53): korttelipinta näkyy, lon 2,351:n kohdalla ei saumaa 45 s:ssa eikä 90 s:ssa. Katsottu silmin täydellä tarkkuudella, ei numeromittausta. Muisti OK, huippu 3100 Mt, gpuMs 13–18. Pieni iPad mittaamatta. PT ja VS tietävät. A/B (c rajattuna) jää tekemättä.
- **Esikatselun laattakorjaus OK** (b116b65a5, lokit/esikatselu-20261103-235122): laatat-85s vastaa laitteen iso-1:tä, ei valkoisia aukkoja; laatat-40s on vielä karkea. Ajettu pohjalla, ei koealueella. Mergepyyntö JU:lla (ei NS:llä: haaran pohja on 4397cf20d, NS:n linjaus). VS:lle ohje kuvata aikaisintaan 85 s kamera-ajon jälkeen. Poikkeus ArgumentOutOfRange on Unityn oma (UnityEditor.Search.SearchDatabase).
- **`ui suora` -korjaus 4a24938fc**: NS välitti JU:lle. Jatkossa JU:n pakettiin kuuluvat korjaukset suoraan JU:lle.
- **Kuvien tuoreus:** mittaa-*.zsh (_tyo/natiivi-ui/sauma-pariisi/) merkitsevät nyt vanhan kuvan riviksi KUVA VANHA ja nimeävät sen -VANHA.png:ksi. `hae` kopioi laitteelta edellisen ajon PNG:n, jos kuvakomento ei mene läpi.

## SEURAAJAN JONO
1. **Salin muistipiikki, PT:n sulkuehto (Raamattu 9.4, raja 4080 Mt):** JU ajaa isolla iPadilla Pariisi-ajojen jälkeen `mittaa-sali-vianhaku.zsh 4397cf20d` (asennuksen tuloste julkaisija-tyokalut/nui-sali-vianhaku-asennus.txt). JU lähettää rivin "SALI-VIANHAKU VALMIS …". Yksi ajo, EI toistoa. Muistivahti pysyy päällä; VIKA on hyväksyttävä tulos.
   - Tulos: lokit/nui-lahizoom-20261103/iso-vianhaku-4397cf20d/osa1 (oikea reitti botilla, ratkaisee julkaisuriskin) ja osa2 (sali ys ilman `palatsi kopiot 1`, oma käynnistys, kuvasarja sali-ys-15s…60s).
   - Analyysi: `python3 -I /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/latausloki/analysoi.py <osa>/muisti-tarkka.log [alku-ms] [loppu-ms]` (PK: L = MATKAKIRJA-rivit, N = fp/gfx, U = pääsäie, T = tekstuurit ja verkot; työkalu on testattu vain vanhalla lokilla). Katso huippu myös muistivahti-tulos.txt:stä ja vaiheet.txt:stä.
   - Sudenkuoppa: `vika/`-kansio voi olla vanha, jos VIKAa ei tullut: tarkista ALKU-aika ennen käyttöä (PK).
   - Tulos numeroin PT:lle (≤ 3 riviä): osa 1 ja osa 2 huiput, mikä latautui piikin aikana, saatiinko kuva salista. Jos sali ei ehdi ruudulle ennen VIKAa, sano ettei kuvaa saatu. Oikea reitti yli 4080 Mt → juna seisoo, ja korjaus on seuraava tehtävä (PT). Sali OK → rivi JU:lle. PK tarjoutui lukemaan tuloksen.
   - Tausta ys3:sta (lokit/nui-lahizoom-20261103/iso-sali-ys3-4397cf20d, vanhat PNG:t vanhat-ys2-kuvat/): huippu 4286 Mt, VIKA 23.32.53, ei kaatunut. Aukossa 38,7–53,5 s tekstuurit 532 → 1043 Mt ja gfx 917 → 1940 Mt (PK: sopii palatsin lataukseen, syy todistamatta). "taso 1" on juoksun oma tila S.Taso, ei reittivirhe. ys3:ssa oli QA `palatsi kopiot 1` (Testihypyt.Salihyppy), ja MuistiTarkka oli pois. ys3:n käännös on todennäköisesti 4397cf20d, ei todistettu. Viimeisin oikean reitin luku: NS 31.10. 4494–4748 Mt.
   - Harkitse tuloksen jälkeen: pitääkö `palatsi kopiot 1` poistaa Salihypyistä (PK tarvitsi sen `mika`-komennolle)? Kysy PK:lta.
2. Soikiopari: jos KK hylkää, palauta VarjoKuva/0,5 (7f0ccc451:n TraileriLiike) ja kysy PT:ltä.
3. Elävä kartta vaihe 2 vasta KK:n/PT:n suunnitelman jälkeen.
4. Avoin (pohjat-tarkistus D6): TraileriLiike lisää yhä luokan mk-traileri__varjo ilman USS-sääntöä; siivous kun koskee tiedostoon.

## Muuta
- `ui suora` toimii VAIN aloitusnäkymästä, ja sen "ok" tarkoittaa vain, että hyppy käynnistyi.
- devicectl --console kaatuu isolla iPadilla (CoreDeviceError 10002): ei käytetä.
- Muistivahti `pois` lopettaa myös muistivahti.login, joten sitä ei käytetä vianhaussa.
- VIKA poistaa komennot lukematta, myös kuvakomennot, ja tila pysyy uudelleenkäynnistykseen asti.
