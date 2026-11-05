# Natiivi-UI: luovutus 5.11.2026 klo 20.30

Korvaa -2002:n. Työhaara proto-repossa: `natiivi-ui/kyltit-219`, kärki 6bb2744d4, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219 (sama kärki). Ei omaa ajoa käynnissä.

## Ensin: odota KK:n vastausta kuviin
Omistaja 20.08: nimikylttien koko ja taso kelpaavat (013655981). KK 20.10: nimi siirtyy viereen esteen kohdalta; pohja ja pallo jäävät säännön ulkopuolelle. Omistaja 20.09: kuvia myös noin 45°:n kulmasta.

6bb2744d4 ajettu ja kuvat katsottu: /Users/Shared/Claude/proto-3d/lokit/julkaisija-pariisi-kyltit-6bb2744d4-45 (kuusi kuvaa, kerroin 0.465, skripti _tyo/natiivi-ui/sk-pariisi-kyltit-11.txt). Tulos viety KK:lle. Yhtään kirjainta ei näkynyt merkin, 3D-kohteen tai puun alla. Älä muuta koodia ennen KK:n sanaa.

Avoinna KK:lla: "embâcle" (uusi iso nimi, alkuperä tarkistamatta), keski-45-kuvan vaakasauma, Tuileries'n leike Louvren päällä Châtelet-45-kuvassa. PT:llä: Raamatun 2.215:n "nimi ei väisty" päivittämättä.

## Koodi
- `NimiLadonta.ValitsePaikka` ja `PaikanSiirto` (puhdas, testi `NimiValitseePaikanEsteenMukaan`): oma paikka, sitten edellinen väistöpaikka, sitten ensimmäinen vapaa `Merkittavat.Siirto`-paikka 1–12. Oma paikka palaa väljyydellä `VaistoPaluuPt` 4 pt.
- `Nimikerros`: `Rivi.vaisto` ja `vaistoTavoite`, `NimenKohta`. Vaihto tapahtuu näkymättömänä nimien tavallisella häivytyksellä. Sivupaikkarivit (`merkittavaSivu`, `perinto`) eivät väistä, koska ne valitsevat paikkansa itse.
- `Nahtavyysalue.Peittaa`: mallin ääriviiva (ennen rajauslaatikko), puut (`KeraaPuut`), kyltit ja pyöreät merkit (`KirjaaPyorea`).
- Jos vapaata paikkaa ei ole, nimi ei näy (syy "nähtävyys"). KK:n linja on "eikä katoa"; määrä ei näy lokissa. Lähempi-kuvassa jokainen 013655981:n nimi oli yhä mukana, muita näkymiä ei verrattu. Kauemmat paikat 13–18 ovat käytettävissä, jos KK näyttää kadonneen nimen.

## Tarkistukset
Pelikoodi kääntyy (0 virhettä), `sh Kartta-testit/kaanna.sh NimiLadonta` 42/42. `zsh tyokalut/tarkista.sh` pysähtyi valovahtiin (Komennot.cs, Nahtavyysalue.cs, NotreDameKirkko.shader; tämä muutos ei lisännyt värejä), joten sen jälkeiset tarkistukset jäivät ajamatta. Tarkistuksen jälkeen `git restore` Tyylikirja.uss, Tyylikirja.cs ja tyylikirja.json.

Mitattu: nimien määrä pysyi levossa samana 5 s välein kaikissa kuudessa näkymässä. Ei nähty: hyppiminen liikkeessä, iPad.

## Muu tila
- Musta pohja suljettu (KK ja PT 20.1x): täydellä piirrolla kartta näkyy (lokit/esikatselu-20261105-200135/kyltit-eurooppa-taysi.png). Syytä ElavaKameran kuvaan ei selvitetty; PT ja KK päättivät, ettei se ole tarpeen.
- Junaan: 627a664c4 ja web PR 6307 JU:n -1953b-linjalla, ks. -2002. Muu kyltit-219 on koe.
- Avoin: nappien kuvapari PT:lle ja KK:lle seuraavasta pallon ajosta, ks. -2002.
