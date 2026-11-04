# Keskustelukanava → Codex / TRIPO 3D -sessio: juoksupelin kala-allas ja kukkaruukku, mallit (4.11.2026 klo 12.2x)

Vastaanottaja: Codexin Tripo 3D -sessio. Lähettäjä: Keskustelukanava.

OMISTAJAN PÄÄTÖS klo 12.23 (kortit): "Kelpaako kala-allas Tripon malliksi?" = Kelpaa. "Kelpaako kukkaruukku Tripon malliksi?" = Kelpaa.
Tripo pysyvällä luvalla, ei ostoja, krediitit raporttiin. Ei junaan. Enintään 3 ottoa mallia kohden ilman KK:n sanaa.

## Hyväksytyt lähdekuvat (tilaus #2017–2018, commit cb9a3d4c4)
`/Users/Shared/Claude/proto-3d/_tyo/codex/juoksupeli-ulkoesineet-20261104/_review/kala-allas/` ja `/kukkaruukku/`: `pelikulma.png`, `sivu.png`, `rikki.png`. Muoto, kuviot ja värit näiden mukaan. Omistajalle kerrottu: kuvien kamerakulma ja koko eivät ole tarkkoja, ne tarkistetaan mallista.

## Käyttö
Kielletty kaupunki 1914, ensimmäinen taso, ulkoaukiot ja portinpielet. Vapaa maailma: kamera voi katsoa esinettä mistä suunnasta tahansa, joten kaikkien sivujen pitää kelvata. Pelaaja väistää, ja törmäyksessä esine rikkoutuu. Kamera on korkealla takana, noin 10–30 m:n päässä, ja esine pitää tunnistaa ajoissa.

## Mallit
1. `kala-allas-ehja.glb`: sinivalkoinen posliiniallas matalalla kivijalustalla, noin 0,9 m korkea ja 1,0 m leveä. Tumma vesi läpinäkymättömänä pintana ja 3–4 kultakalaa.
2. `kala-allas-rikki.glb`: `rikki.png`:n lopputila: sirpaleet, ehjä jalusta, lätäkkö ja kalat.
3. `kukkaruukku-ehja.glb`: keltainen lasitettu ruukku noin 0,7 m, granaattiomenapuu, yhteensä noin 2 m. Pidä oksat niin paksuina ja lehdet niin isoina ryhminä, että puu erottuu 15 m:n päästä; sama siluetti kuin kuvassa. Muutos kuvan puuhun kerrotaan toimituksessa.
4. `kukkaruukku-rikki.glb`: `rikki.png`:n lopputila: sirpaleet, multa, juuripaakku ja kaatunut puu.

Rikki-mallit: sirpaleet erillisinä nimettyinä osina, jos Tripon jako onnistuu siististi; muuten yksi kiinteä malli, ja kerro se toimituksessa. Ehjän ja rikkinäisen koko ja paikka täsmäävät, koska peli vaihtaa ne samalle paikalle.

## Tekniset
Metrit, Y ylös, origo pohjan keskellä maan tasolla, skaala sovellettu geometriaan, staattinen. Ei läpinäkyvyyttä. Tripon kevennys: enintään noin 6 000 kolmiota per malli, ja yksi 1024² -tekstuurisarja per malli. Muisti on pelissä tiukalla, joten älä ylitä tätä kysymättä.

## Toimitus
`/Users/Shared/Claude/proto-3d/_tyo/codex/juoksupeli-ulkoesineet-20261104/mallit-v1/` pohjan `docs/moduulit/tuotantopohjat/codex-3d-toimitus.md` mukaan ja `node tools/codex-3d-tarkistus.mjs` läpi. Esikatselut todellisista GLB:istä: 60° yläviisto neljästä suunnasta, suora sivu, 15 m:n etäisyyttä vastaava pieni kuva ja rinnakkaiskuva hyväksytyn kuvan kanssa samassa kulmassa ja mittakaavassa. Kevyt tarkistus, ei raskaita ajoja eikä videoita ilman vuoroa. Mittaa kolmiot ja koot tiedostosta.

Viesti vain claude/postilaatikko-haaraan: `posti/tripo3d-keskustelukanava-ulkoesineet-mallit-*.md`. Keskustelukanava katsoo mallit, sitten Pelikoodari vastaanottaa, kytkee ja voi täsmentää rikkoutumisen sopimusta. Omistaja näkee pelikuvan.
