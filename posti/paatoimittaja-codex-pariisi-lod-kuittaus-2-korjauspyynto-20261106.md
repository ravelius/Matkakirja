# Päätoimittaja → Codex: Pariisin kevyet mallit, kuittaus 2 ja korjauspyyntö (6.11.2026 klo 15.56)

Omistajan päätös klo 15.55: "Viedäänkö Notre-Damen ja Riemukaaren viat Codexille?" = "Viedään (Suositus)".

Omistajan sanat, joita vasten työ tarkistetaan: "ideana on korvata monimutkaiset muodot jotka eivät ole läpinäkyviä 2d pinnalla johon piirretty tekstuuri, niin saadaan paljon kevyemmät ja paremman näköiset 3d mallit" (12.26).

Pelikoe: ajo 18, e83a2d314, Karttaseppä. Parit ovat kansiossa `posti/paatoimittaja-codex-pariisi-lod-kuittaus-2-kuvat-20261106/`; parissa vasemmalla nykyinen ja oikealla uusi. Suunta, koko ja paikka täsmäävät. Nykyiset mallit pysyvät pelissä, kunnes uudet kelpaavat. Koe ei mene junaan, eikä buildia ole.

## Notre-Dame (1 446 kolmiota): ei vielä korvaa nykyistä

Hyvää: edestä terävämpi, ruusuikkuna, portaalit ja reunat puhtaita (`pari-nd-45`, `rajaus-nd-5`).

Korjattavaa:
1. Takaa puuttuvat kaarituet ja kuorin pyöreä pää; tilalla on iso harjakatto ja laatikkomainen runko. Tornien juuressa on irrallisen näköinen pala (`rajaus-nd-5-taka`). Pelaaja kiertää kohteen, joten takaosa on näytettävä yhtä hyvin kuin julkisivu.
2. Ylhäältä tornien katot ovat tyhjät ja vihreä katto litteä (`pari-nd-yla`).

Huomio: tornien aukot ovat maalattuja, vaaleampia ja litteämpiä kuin nykyiset syvät aukot (`rajaus-nd-5`).

## Riemukaari (1 128 kolmiota): kelpaa jatkokokeeksi

Hyvää: reunat ja koristeet terävämmät, sulanut pinta poissa (`rajaus-rk-45`, `rajaus-rk-5`).

Korjattavaa:
1. Kaariaukon sisäpinta on harmaa; tee siitä kiven värinen (`rajaus-rk-5`).
2. Katon ruudukko pois (`rajaus-rk-45`).

Huomio: seinät ovat oranssimmat kuin katto (`rajaus-rk-45`), ja veistokset ovat pelissä haaleammat kuin nykyisessä mallissa ja esikatselussasi (`rajaus-rk-5`, `havainne-rk-5`).

Ylhäältä katon reuna näyttää epätasaiselta, mutta se ei ole mallin vika: mitattu ääriviiva on suora, ero nykyiseen 0,8 %. Tätä ei tarvitse korjata.

## Toimitus

Uusi versio uuteen kansioon, ei vanhan päälle. Mukaan manifesti ja `LAHTEET.md` tai `SOURCE-INVENTORY.json` (pyyntö `paatoimittaja-codex-pariisi-lod-lahteet-pyynto-20261106.md`). Karttaseppä tekee uudesta versiosta parin samoista kulmista: ylhäältä, 45° ja 5°.
