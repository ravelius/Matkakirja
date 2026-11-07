# Pelikoodari: luovutus 07.11.2026 klo 11.21

Korvaa kaikki aiemmat. Nollaus kontekstin kovasta rajasta (36 %). Työkalut ja vanhat opit: `git show 13d0ce6c9:docs/raportit/viesti-pelikoodari-luovutus-20261107-0956.md` kohdat 2, 4, 5. Lontoon poistotyökalut: `git show ee5465047:docs/raportit/viesti-pelikoodari-luovutus-20261107-0326.md` kohta 5.

**Lisäys 11.2x: k1 ajettu ja katsottu: kortti keskellä, botti ei rikkonut mitään, joten ruudukkokuva jää seuraavaan juoksuajoon; kerrottu PT:lle. Kohta B on tehty. i5 ajossa JU:lla.**

**Työ nyt: kaksi ajoa odottaa JU:ta. Katso kuvat, vie rivit. Ei uutta työtä ilman PT:tä.**

## 1. Avoinna, tee nämä
**A. Ajo i5, sha `832e5d24e`** (`pelikoodari/lontoo-isot`, proto `/Users/Shared/Claude/wt/proto-pelikoodari-lod-diag`). Skenaario `_tyo/pelikoodari/lontoo/sk-i5.txt`, 5 kuvaa, lokit `lokit/pelikoodari-lontoo-i5-832e5d24e`. Pyyntö jonossa JU:lla 11.20; JU:n kuittausta ei vielä ole.
Ratkaisee: väistääkö "Lontoon kaupungintalo" nyt Tower Bridgen tornit (silta sai `NimiEste`n, koska PT:n havainto: nimi kulki tornien yli). Katso `i5-tb` ja `i5-tb-matala`; vertaa `lokit/pelikoodari-lontoo-i3-cbfb96542/`. Kerro PT:lle yksi rivi. Jos kuvat kelpaavat, korvaa parit `tb`, `tb-matala`, `kaukaa-45` ja `kaukaa-tb` kansiossa `lokit/pelikoodari-lontoo-isot-parit` (8 rivin PIL: `i1-e` vasen, `i5` oikea, puolikkaaksi) ja kerro KK:lle sha. Jos nimi katoaa vääristä paikoista tai väistö pahentaa, palauta rivi ja kerro.
Huom: nimieste koskee sillan kuperaa kuorta, joten nimet voivat väistää myös joen päältä sillan vierestä. Katso `HMS Belfast`.

**B. Ajo k1, sha `f86344e8f`** (`pelikoodari/kortti-keskelle`, proto `/Users/Shared/Claude/wt/proto-pelikoodari-kortti`). Skenaario `_tyo/pelikoodari/vapaa-1/sk-k1.txt`, 2 kuvaa, lokit `lokit/pelikoodari-juoksu-k1-f86344e8f`. Juoksun lataus voi ylittää VIKA-rajan; pyysin kuvan silti lokikansioon. JU ei ole kuitannut.
- Omistaja (PT 11.0x): Taso läpi -kortti keskelle pohjan mukaan, vaikka peittää keisarin pään ja hartiat. Poistin sekä sivuunsiirron (`4aa9ec365`) että noston (`3ba5bb57e`), koska muuten kortti ei ole keskellä. Oma pieni commit seuraavaan junaan; junavuoro PT:ltä.
- Kerro PT:lle sha ja Mac-kuva kortista.
- Samalla omistajan 11.11 pyyntö (PT): yksi kuva nykyisestä ruudukosta Taso läpi -reitiltä rikotuilla esineillä, seuraavan juoksuajon yhteydessä, ei omaa ajoa. Jos jotain rikottiin, `k1-taso-lapi` on ruudukko ja `k1-taso-lapi-jatka` kortti. Tarkista `unity.log`: `rikotut-galleria`. Jos botti ei rikkonut mitään, kerro se PT:lle: ruudukko jää todentamatta, kuva seuraavasta juoksuajosta. Jos rikottiin eikä ruudukko aukea, se on vika: rivi PT:lle.

## 2. Lontoo isommaksi, tila
Viety KK:lle ja PT:lle 11.18, sha silloin `cbfb96542`. Ei junaan, ei korttia "Pariisi valmis" ennen. KK ei ole vielä vastannut.
- Parit `lokit/pelikoodari-lontoo-isot-parit` (10). PT katsoi kaksi ja esitti kohdan 3 havainnot.
- Oletuskertoimet `OhjelmaKohteet.cs` (`Kohde.Koko`, `KiintoX/Z`), kytkin `ohjelmakohteet isot 0|1`, `Koot`-komennot voittavat. Pituus/korkeus/leveys: St Paul's 3,2/4,2/3,2; Big Ben 4/4/4; palatsi 2/3/1,8 kiinto (128,−68); Abbey 2,2/3/2,2 kiinto (230,0), siirtyy noin 140 m länteen; Tower Bridge 1,5/4,5/2,6.
- Iso iPad i4 (`lokit/pelikoodari-lontoo-i4-cbfb96542`, ennen nimiestettä): huippu 3 844 Mt (JU:n luku 3 847; raja 4 080; F3 3 695), vapaa väh. 1 275 Mt (F3 1 424), liike p95 28,4 ms (F3 24,9), lämpö Normaali, ei kaatumista. Pohja eri kuin F3:ssa, joten eroa ei voi laittaa kokonaan mallien piikkiin. GPU-lukua ei saatu (`gpu [-1]`). Laitteella `Documents/talopalat-lontoo-d10`. Kuvanimet ovat `f3-*`, koska skenaario on kopio F3:sta.
- Työkalut `_tyo/pelikoodari/lontoo`: `a/tee-isot.py` (jalanjäljet OBJ:ista, vesi, poistot, puut; ajo ilman `-I`, numpy on käyttäjäkirjastossa), `a/isot.json`, `a/siisti-d10.json`, `osm/puut-d10.json`, `a/poistot-d10.json`, `palat-d10`. `TaloPoistotLontooIsot.cs` on generoitu erikseen; levyvälimuistin avain `TaloAlue.PoistoAvain` (`-poisto-isot2`): nosta, jos taulu muuttuu. OBJ:t: `OHJELMAKOHTEET_VIENTI=<kansio> sh Kartta-testit/kaanna.sh OhjelmaKohde`.
- Geometriatestit 21/21 ajettu vain ennen koodimuutoksia; `unity-tarkistus` 0 virhettä kärjessä.
- Vanhentunut: KK:lle kerrottu kyltit-maininta koskee yhä Newgaten vankilaa St Paul'sin päällä ja Vanhaa Westminsterin palatsia palatsin päällä; korjaamatta, odottaa KK:ta.

## 3. PT:n havainnot, vastattu 11.20
1. Kaupungintalon nimi: sivuvaikutus. Kyltti siirtyi isomman sillan alle ja vapautti nimen paikan (päätelty koodista ja kuvista, ei lokista). Haalea 72° kallistuksesta (`KallistusPeitto`), vakaa kahden peräkkäisen kuvan välillä, ei häivytys kesken. Korjaus `832e5d24e`.
2. "Lontoo" Tate Britainin alla: väistää isoa palatsia saman säännön mukaan (KK ja PT 6.11.), ei vika, ei korjausta.

## 4. Peruttu, älä tee
Rikottujen rivi Taso läpi -kortilla: omistaja perui 11.11. `pelikoodari/kortti-rikotut` (`a0efa8c39`, ei ajettu) jää käyttämättä, haara saa jäädä, ei junaan. Automaattinen avaus pysyy (omistaja 29.10.), kysymystä ei viedä KK:lle. Muihin loppukortteihin ei kosketa ilman sanaa. `sk-k2.txt` ei käytössä; JU:lle peruttu.

## 5. Juna 220
Ennallaan: `pelikoodari/ulkoesine-kuplat` `067210c0f`, odottaa ääniä (0956 kohta 2). Seuraavaan junaan tulee myös `f86344e8f`, kun PT antaa vuoron.

## 6. Opit
- Korjaa peräkkäiset muokkaukset yhdellä skriptillä vasta, kun se on ajettu loppuun: `assert` kaatoi puolivälissä, ja komentoketju committasi vajaan tiedostojoukon (`f031bbe7b`). Älä ketjuta committia kaatuvan skriptin perään.
- Avoimet vesiketjut piirtyvät jänteinä maan yli: kelpuuta vain suljetut renkaat, muuten mittaus näyttää palatsin vedessä.
- NUI antoi ensin ruudukko-ohjeen ja korjasi sen sitten: odota lopullinen sana ennen kuin pyydät ajon.
- Työlistan hook mainitsee Lontoon rivin: rivi on PT:n, älä päivitä kysymättä.
