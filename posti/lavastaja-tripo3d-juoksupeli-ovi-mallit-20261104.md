# Lavastaja → Codex / TRIPO 3D -sessio: juoksupelin pariovi, mallit (4.11.2026 klo 14.47)

Vastaanottaja: Codexin Tripo 3D -sessio. Lähettäjä: Lavastaja.

OMISTAJAN PÄÄTÖS klo 14.46 (kortti "Tehdäänkö ovimalli näistä kuvista?", Keskustelukanava): Kyllä. Omistaja näki kuvat edessa-kiinni.png ja pelikulma.png, ja hänelle kerrottiin, että ristikko on hieman epäsäännöllinen.
Tripo pysyvällä luvalla, ei ostoja, krediitit raporttiin. Ei junaan. Enintään 3 ottoa mallia kohden ilman Keskustelukanavan sanaa.

## Hyväksytyt lähdekuvat (tilaus #2026, commit 5d8a07662)
`/Users/Shared/Claude/proto-3d/_tyo/codex/juoksupeli-ovi-20261104/_review-v2/`: `edessa-kiinni.png`, `pelikulma.png`, `auki.png`, `lehti.png`. Muoto, kuvio ja väri näiden mukaan, paitsi kaksi korjausta alla.

## Kaksi korjausta kuviin nähden
1. Rengas on molemmissa lehdissä vapaassa reunassa, oven keskellä kiinni ollessa. Kuvissa auki.png ja pelikulma.png oikean lehden rengas on saranareunalla, ja se on väärin.
2. Lehdet ovat toistensa peilikuvat, myös ristikko. Kuvissa pystylistat ovat molemmissa lehdissä vasemmassa reunassa, ja se on väärin.

## Käyttö ja tavoite
Sama ovi kaikissa Kielletyn kaupungin rakennuksissa ensimmäisellä tasolla. Kevyt, koska ovia on noin 220. Lehdet kääntyvät erikseen saranoillaan. Ristikko erottuu etäältä karkeana kuviona, kun kamera on 10–30 m:n päässä: mieluummin harvemmat ja paksummat rimat kuin tiheä kuvio. Tee ristikosta säännöllinen, koska lähdekuvassa se on hieman epäsäännöllinen.

## Mallit
1. `ovi-karmi.glb`: karmi ja kynnys.
2. `ovi-lehti-vasen.glb`: vasen lehti, rengas vapaassa reunassa.
3. `ovi-lehti-oikea.glb`: vasemman lehden peilikuva.

Mitat: aukko 2,4 × 2,65 m, lehti 1,2 × 2,65 m. Peli skaalaa oven noin kaksinkertaiseksi, joten kuvion pitää kestää se.
Lehden origo saranalinjalla maan tasolla, jotta kääntö onnistuu kiertämällä Y-akselin ympäri. Karmin origo aukon keskellä maan tasolla. Kiinni ollessa kolme mallia osuvat yhteen samassa origossa, kun lehdet siirretään ±1,2 m.

## Tekniset
Metrit, Y ylös, skaala sovellettu geometriaan, staattinen, ei läpinäkyvyyttä: ristikon väli maalataan tai mallinnetaan tummaksi, ei alfaa. Tripon kevennys: enintään noin 6 000 kolmiota per malli, mutta mieluummin paljon vähemmän, koska ovia on paljon. Yksi 1024² -tekstuurisarja per malli; jos lehdet voivat jakaa saman, kerro se. Takapinta näkyy, kun ovi on auki, joten kaikkien sivujen pitää kelvata.

## Toimitus
`/Users/Shared/Claude/proto-3d/_tyo/codex/juoksupeli-ovi-20261104/mallit-v1/` pohjan `docs/moduulit/tuotantopohjat/codex-3d-toimitus.md` mukaan ja `node tools/codex-3d-tarkistus.mjs` läpi. Esikatselut todellisista GLB:istä: kiinni edestä, pelikulma (60° yläviisto), molemmat lehdet auki 90°, 15 m:n etäisyyttä vastaava pieni kuva ja rinnakkaiskuva hyväksytyn kuvan kanssa samassa kulmassa ja mittakaavassa. Kerro kolmiot ja koot tiedostosta mitattuna. Kevyt tarkistus, ei raskaita ajoja eikä videoita ilman vuoroa.

Viesti vain claude/postilaatikko-haaraan: `posti/tripo3d-keskustelukanava-ovi-mallit-*.md`. Keskustelukanava katsoo mallit, sitten Pelikoodari kytkee ne laatikon tilalle. Ei uutta kuvakierrosta.
