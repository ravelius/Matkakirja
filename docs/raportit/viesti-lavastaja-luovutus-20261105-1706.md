# Lavastajan luovutus 5.11.2026 17.06 (tilinvaihto, PT 17.0x) — LUE TÄMÄ, sitten muuri/KORJAUS.md loppu

Korvaa -1625:n. Ei vientejä. Y = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen; L = Y/lattiakoe. Juoksupelin taso 1 (Raamattu 2.209: ei iPad-ajoja eikä toistosarjoja).

## Nyt
Lattiakoe palassa 2-4 on PT:n hyväksymä (16.5x: "selvä parannus"). PT:n käsky: 1) vaihto muihin paloihin samalla kaavalla, 2) V4_wood-särmiöt pois, kun lähipuu alle 1 m (loput 42 jäävät, luettele), 3) reunakivi -14-reunakivi-ulko-2 pois vain tästä kohdasta, ei koko sarjan siivousta. Pari PT:lle: saumat naapuripalojen välillä ja pk-e58 ja e12 mukana, samoilla rajauksilla, täysikoossa saumat. "Harmaa väri (ennen lämmin) mainittava." Ei vientiä.
Kaikki kolme on tehty juureen katot-v125/koejuuri-lattia13 (L/tee13.py). EI OLE NÄHTY PELISSÄ.

## Keskeneräinen ajo
L/aja13.zsh JU:lla, käynnistetty 16.5x: ensin koe (L/kuvat13-koe, 26 kuvaa + loki, valmis 17.06 mennessä), sitten verrokki koejuuri-yhd3 (L/kuvat13-verrokki) yhä käynnissä 17.06 (pid 69010, 77936). Odota JU:n riviä LATTIA13 AJETTU. Jos tilinvaihto katkaisi ajon: kuvat13-verrokki puuttuu, pyydä JU:lta uudelleen; koeajoa ei tarvitse toistaa (kopioi sk-verrokki-rivi erikseen).

## Seuraavaksi
1) Katso kuvat13-koe ja -verrokki täysikoossa: 22 saumaa s-*, lt-ningxiang, pk-e58, pk-e12, pk-e30. Tarkista loki: osasarja 1108 polkua, 976 pursotusta, PUUTE-rivit.
2) Tarkista erityisesti:
 - Palkki pk-e58:ssa poissa? Tunnistus on vain pituudesta ja paikasta. Jos palkki jää, tunnistus oli väärä.
 - Kaukopuut: lähipuut piirretään vain 40 m:iin (loki "raja 40 m"), kauempana näkyvät ristikortit, nyt ilman särmiötä lod0:ssa. Onko korteissa runko? Jos puut leijuvat, kerro PT:lle heti: PT:n sääntö ei silloin kelpaa sellaisenaan.
 - Lod0/lod1-raja 150 m: särmiöt lod1/2:ssa ennallaan, lattia lod1/2:ssa jo V4_lattia (UV 1 m useissa paloissa).
3) Pari PT:lle (≤ 3 riviä), harmaa väri mainiten: uusi lattia on harmaa, ennen lämmin. Vienti vasta PT:n sanalla ja PK:n vahvistuksella.

## Tila
Lod0, 12 palaa (0-0…0-4, 1-4, 2-4, 3-0…3-4): 165 505 m² V4_lattiaksi, UV0 (x/8, -z/8), UV1 ja normaali säilyvät. "13 palaa" oli laskuvirhe; 2-4 mukaan lukien palat ovat 12. PT kirjoitti "12 muuhun", tehty 11 muuta. Palassa 1-1 on 9 kolmiota, 2 m², jätetty. 2-4:ssä jää noin 1 500 m² y < -0,3 sokkeli_ylaa, ei kaavassa, sijaintia ei katsottu.
Rungot: 538 pois lod0:sta, 42 jää: L/jaavat-rungot.txt (lista on PT:lle kerrottava). Lattia ja rungot ovat kopioina vain muuttuneista tiedostoista, muu symlinkkejä.
Reunakivi: 1109 → 1108 polkua, oma ladonta.json. Laatta V4_kivireunus x -223,6…-220,4 sen edessä jää.
Saumat: 0-2|0-3, 3-1|3-2 ja rengas länsi: ei lattiaa molemmin puolin, ei kuvaa. Rengasmittaus tehty lod2:sta (paketissa vain se).
Lattiakoe 2-4:n ajosta (koejuuri-lattia24): vasemman rakennuksen seinäpinta, ikkunaristikot ja friisi erosivat verrokista; ei selvitetty, lattian vaihto ei selitä.
Työkalut: L/mittaa.py, uv.py, mittaa13.py, saumat.py, rajaus.py, pari.py; L/tyokalut/etsi.py (kaikki pinnat pisteen ympärillä: x z säde ymax), rungot.py. Python /opt/homebrew/bin/python3. zsh: echo ==== ei toimi (glob).

## Jonossa, ei aloitettu
Yhä auki: KORJAUS.md:n lista; PT:n isot kultakolmiot; h07:n keskiovi eri asennossa yhd:n ja yhd3:n välillä. Jäävät viat: kaistan kyljen juovat, friisin vaihtelu (PT: ei jahdata), 110ala:n seinän alaosa, LOD1/2 ilman levykorjausta.
