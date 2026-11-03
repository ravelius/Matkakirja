# Julkaisija: luovutus 31.10.2026 klo 23.35 (uusi tili, konteksti 31 %)

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261031-2205.md.

## Tila nyt
- Juna 216 EI lukittu; lukitus ja TF vasta PT:n merkillä. TF 215 ulkoisilla.
- Linjat 1 ja 2 vapaat (L2:lla PK:n/VS:n esikatseluja). "juna/b37"-lukko käy ~10 min välein minuutin ajan (jaksollinen tarkistus, ei toimia).
- Levy 99 Gi. Linjan 1 kopion Build/dd-sim ja iOS-sim poistettu PT:n luvalla (laite/yo jäivät).

## Cloudflare-säästöpaketti (PT:n kuittaama, raportti cloudflare-kayttamattomat-20261031.md, PR 5767)
1. KARTTAVERSIOIDEN POISTO KÄYNNISSÄ irrotettuna: poista-kartta-ketju-20261031.zsh (pid 88598, lukko /tmp/matkakirja-kartta-poisto.lukko),
   ajaa poista-karttaversiot-20261031.zsh (16 kansiota, grep ennen jokaista) ja sitten poista-26s-20261031.zsh (KS: kyllä).
   Loki poistot-cloudflare-20261031.log (rivi per kansio + VALMIS). Nopeus ~19 000 obj/min (aws-config-nopea, 100 rinnakkain) → arviolta ~4 h.
   Kaatuessa: aja ketju uudelleen (idempotentti): python3 -I julkaisija-tyokalut/irrota-ketju.py <ketju.zsh> <ketju.out>.
2. OLAVINLINNA: omistaja ajaa poista-r2-olavin-20261031.zsh (alkoi 23.17; loki poista-r2-olavin-20261031.log, 44/314 klo 23.31).
   Kun valmis: tarkista 314/314 ja että uusin.json-hash 1a1857e06ec1386f säilyi → rivi KK:lle ja PT:lle.
3. Kun 1 ja 2 valmiit: ämpäriluettelon uudelleenrakennus (PT kuittasi): zsh julkaisija-tyokalut/rakenna-luettelo.zsh (yksinään).
4. maasto 2026-09-24-maailma EI poisteta ennen KS:n työkaluvaihto-PR:ää (offline.mjs, tee-maasto, vie-rajakorkeudet → 10-29-maailma).
5. KS selvittää pyramidi.json:n rantatason 2026-09-30-ranta (kansio puuttuu ämpäristä).

## Tänään (uusi tili)
- Mergetty: 5766, 5768, 5769. Viety: LAV tausta-v89c (100/100, SHA256SUMS e33e6f85d607) → PK kytkee.
- NS:n käännösvuorot: ks-fps-d-216 51415e442 ja juna 216 runko ca536d93e (molemmat Isolle iPadille, valmiit 23.06/23.26).

## Opit
- `aws s3 rm --recursive` oletuksella ~4 200 obj/min; isoille poistoille AWS_CONFIG_FILE=aws-config-nopea (max_concurrent_requests 100).
- Hash-grepissä git grep -o -F -f monella mallilla antaa vääriä osumia; kommentit (//) pois ja vain merkkijonoarvot.
- Ämpäriluettelo vanhenee, kun poltot/poistot ohittavat vie-paketti.sh:n → uudelleenrakennus aina isojen poistojen jälkeen.
