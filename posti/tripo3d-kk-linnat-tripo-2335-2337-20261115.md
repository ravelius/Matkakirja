# Codex → KK: Neuschwanstein ja Turku A/B #2335–2337

KK:n arvioitavaksi. Kolme Max/8K-alkuperäistä on arkistoitu T7:lle. Jokaisesta mukana viisi katselukuvaa ja yksi kooste, kaikki enintään 1000 px: **15 yksittäiskuvaa + 3 koostetta**, kolme QA:ta, kolme GLB-metriikkaa sekä Turun A/B-vertailu. Ei kevennystä tai peli-integraatiota; mallit eivät ole KK:n hyväksymiä. KK valitsee Turun vaihtoehdon.

Tilaus: päätös `b308b8a2d9b653808eceb11571c609ed9e5cf802`. Neuschwanstein käyttää vain hyväksyttyä v4-kuvaa. Turku A käyttää v2 **Front** + kuvaa 2323 **Left side**, ei Back; Turku B käyttää v2:ta yksin. Kustakin yksi sallittu otto käytetty, 65 krediittiä/tapaus, yhteensä 195. Ei uusia kuvia tai ottoja tässä valmistelussa.

| Kohde | Kolmiot | Koko tavua |
|---|---:|---:|
| neuschwanstein-v4 #2335 | 1 875 874 | 77 900 520 |
| turku-A-multiview #2336 | 1 976 029 | 82 131 820 |
| turku-B-single #2337 | 1 956 389 | 85 379 932 |

Kussakin GLB:ssä upotetut JPEG-tekstuurit: baseColor 8192×8192, normal 4096×4096 ja metallicRoughness 4096×4096. Ei ulkoisia tiedostoriippuvuuksia tai vaadittuja laajennuksia. Metriikat ovat rakenneinventaario, eivät täydellinen glTF-validointi tai pelikameratesti. Alkuperäiset säilytetty muuttamattomina; ei kevennystä ennen 18.11.

## QA ja Turun valintavaraus

- **Neuschwanstein #2335 — WARNING:** Palasin näkyvän eteläseinän eteen ei palaudu v3:n väärää suurta tornirunkoa. Portti, puolipyöreä etuvarustus, neliötorni ja alempi avoin piha säilyvät. Pohjoisen porrastornin koko runkoliittymä, ylemmän pihan rajaus ja piilopuolen loggia-/aukotusaiheet jäävät vahvistamatta. Ei erillistä toteuttamatonta 90 m kappelitornia.
- **Turku A #2336 — WARNING:** kaksi vihreäkattoista päätornia ja vihreä päämassa ovat B:tä yhtenäisemmät. Esilinnan pitkät valkoiset tummakattoiset osat jatkuvat kuitenkin päälinnan molemmilla sivuilla; täysi kehämäinen pohja ja laajan avoimen pihan ratkaisu eivät varmistu. Etu-/Left-syöteparin oikea lokerojako on dokumentoitu. KK:n sallima piha-/joenpuoleinen tulkinta ei tee tätä pohjaa historiallisesti lähdevarmaksi.
- **Turku B #2337 — FAIL näkyvän päämassan jatkuvuudelle:** kaksi vihreäkattoista tornia säilyy, mutta pitkä korkea vihreäkattoinen runko katkeaa kahdeksi ryhmäksi ja niiden välissä on matalampi tumma kattovyöhyke. Ero näkyy kahdessa sivukuvassa ja yläkuvassa, joten se ei ole vain yhden kameran peitto. Laajaa avointa esilinnan pihaa ei erotu. **FAIL on visuaalinen syötevastaavuuden arvio, ei tekninen GLB-vika.**

Riippumaton vertailu pitää **A:ta näkyvän päämassan perusteella parempana ehdokkaana**, mutta kummankaan koko pohjaa ja pihaa ei ole vahvistettu. Tämä ei ole KK:n valinta tai automaattinen hyväksyntä. Molemmissa päädyn pelkistetty ovi säilyy eikä suuri koristeportaali palaudu.

Katselukuvat näyttävät neljä **paikallista akselisivua** (+X, +Z, −X, −Z) ja yläviiston. Maantieteellisiä ilmansuuntia tai metrimittoja ei ole kalibroitu. Kuvista ei hyväksytä aukkojen läpäisevyyttä, sisätiloja tai teknistä verkkolaatua.

## Alkuperäisten polut

**neuschwanstein-v4 #2335**

T7: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/linnat-tripo-2335-2337-20261115/neuschwanstein-v4/neuschwanstein-v4-2335-max-original-8k.glb`

SHA256: `37ca269a1ab8dded70a126bb64b156261c675474fe5f5e7fd0d8222c15f4a369`

**turku-A-multiview #2336**

T7: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/linnat-tripo-2335-2337-20261115/turku-A-multiview/turku-A-multiview-2336-max-original-8k.glb`

SHA256: `a6b3c5dca93734ec902c174cdad4df55e9c8a84c2abc4b1fd5b74c752b134455`

**turku-B-single #2337**

T7: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/linnat-tripo-2335-2337-20261115/turku-B-single/turku-B-single-2337-max-original-8k.glb`

SHA256: `85c5fec695044d0b376df8da54be321ceca00f3b69eb39c90baae8534fda156f`

## Liitteet

`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/linnat-tripo-2335-2337-20261115/delivery-review`

Sieltä löytyvät 15 yksittäiskuvaa, kolme `*-5views-1000.jpg`-koostetta, kolme `*-QA.md`:tä, kolme `*-glb-metrics.json`:ia ja `turku-AB-comparison.md`. `manifest.json` sisältää kaikkien liitteiden tarkisteet ja alkuperäisten metatiedot. GLB:t ovat yllä olevissa T7-poluissa. Kuvapaketit on rajattu valmiista Tripo-selainkuvista, ei renderöity uudelleen. Kokonaiset kohteet, huiput ja pohjat mahtuvat rajauksiin; tekstit tarkistettu mallikohtaisissa prosesseissa.

PT:n kuittaus #2338 (`6a7dcb705413ee8b4e77f2afc3e971a72b2e169a`) luettu: #2324–2328 koosteet välitetty KK:lle; hyväksyntä auki, ei uusia ottoja/Kamjanets-Tripoa.

## Katselulinkit

- [neuschwanstein-v4: viisi suuntaa](codex-linnat-tripo-2335-2337-20261115/neuschwanstein-v4-5views-1000.jpg)
- [turku-A-multiview: viisi suuntaa](codex-linnat-tripo-2335-2337-20261115/turku-A-multiview-5views-1000.jpg)
- [turku-B-single: viisi suuntaa](codex-linnat-tripo-2335-2337-20261115/turku-B-single-5views-1000.jpg)
- [Turun A/B-vertailu](codex-linnat-tripo-2335-2337-20261115/turku-AB-comparison.md)

Saldo erän alussa 14320, kolmen rajatun oton jälkeen 14125. Ei lisäottoja; seuraava vaihe odottaa KK:n päätöstä.
