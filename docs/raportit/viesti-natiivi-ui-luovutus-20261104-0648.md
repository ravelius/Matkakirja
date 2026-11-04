# Natiivi-UI: luovutus 4.11.2026 klo 06.48 (konteksti 32 %)

Edellinen: viesti-natiivi-ui-luovutus-20261103-2357.md (haara natiivi-ui/luovutus-20261103-2357, PR 6236 auki; merge sopii). Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto.

## Tehty
- **Sauma A2:lla kiinni** isolla iPadilla (iso-a2-9528c1d53). Pieni iPad mittaamatta.
- **Esikatselu b116b65a5 OK:** JU cherry-pickaa pelkän commitin seuraavaan pakettiin (3176be95f jää pois). VS:lle ohje: kuvat aikaisintaan 85 s kamera-ajon jälkeen.
- **Juoksupelin muistipiikki:** vianhaku 4397cf20d (TULOS.md) → PK:n korjaus 9f8d2d13f (CPU-kopiot paloina) → oikea reitti 3935 Mt (ennen 4073), ulkoreitti ilman bottia 3920 Mt (ennen ≥ 4146), raja 4080. Kaksi ajoa puoltaa korjausta, mutta parannus on samaa luokkaa kuin hajonta. Tulokset: lokit/nui-lahizoom-20261103/iso-vianhaku-9f8d2d13f/TULOS.md ja iso-vianhaku-4397cf20d/TULOS.md.
- **Oikaisu, jonka tein PT:lle:** `palatsi alku` koskee vasta seuraavaa juoksua, joten ys3:n 4286 Mt ja osan 2 ≥ 4146 Mt EIVÄT olleet salissa, vaan ulkona. mittaa-sali-vianhaku.zsh:n osa 2 ei siis vie saliin; älä käytä sitä salimittaukseen ilman korjausta (PK:n salimittaukset ovat oma ajonsa).

## SEURAAJAN JONO
1. **Salin xf-muistivika (be5632bdb, juhlasali xf 4153 Mt, raja 4080; sali 1 ja 2 OK: 3845, 3878; lokit/pk-muistipiikki-219/sali-be5632bdb-1-xf):** ehdotin PK:lle, että PK hakee syyn, ja kerroin sen PT:lle. PK:n kuittaus puuttuu vielä tämän kirjoittaessa. Älä aloita rinnalla; jos PK sanoo, ettei ehdi, ota se (latauskoodi, MuistiTarkka) ja kerro PT:lle.
   - muisti-tarkka.log on 0 tavua sekä xf-ajossa että 9f8d2d13f-ajossa, mutta 4397cf20d:llä 768 kt. Syy selvittämättä, PK:lla. muistivahti.log on ehjä.
   - Lopullinen arvio Release-käännöksellä (Raamattu 9.4). Paketti seis PT:n päätöksellä, kunnes muisti on korjattu.
2. Soikiopari: jos KK hylkää, palauta VarjoKuva/0,5 (7f0ccc451:n TraileriLiike) ja kysy PT:ltä.
3. Elävä kartta vaihe 2 vasta KK:n/PT:n suunnitelman jälkeen.
4. Avoin (pohjat-tarkistus D6): TraileriLiike lisää yhä luokan mk-traileri__varjo ilman USS-sääntöä; siivous kun koskee tiedostoon.
5. Avoin: pitääkö `palatsi kopiot 1` poistaa Testihypyt.Salihypystä (PK tarvitsi sen `mika`-komennolle)? Kysy PK:lta, kun muistityö on ohi.

## Muuta
- `ui suora` toimii vain aloitusnäkymästä, ja sen "ok" tarkoittaa vain, että hyppy käynnistyi.
- devicectl --console kaatuu isolla iPadilla (CoreDeviceError 10002). Muistivahti `pois` lopettaa myös muistivahti.login. VIKA poistaa komennot lukematta, myös kuvakomennot, uudelleenkäynnistykseen asti.
- `hae` kopioi laitteelta edellisen ajon PNG:n, jos kuva ei synny; mittaa-*.zsh merkitsee sen KUVA VANHA. `vika/`-kansio voi olla vanha: tarkista ALKU-aika.
- JU:n pakettiin kuuluvat korjaukset menevät suoraan JU:lle (NS 3.11.).
