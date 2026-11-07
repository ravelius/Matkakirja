# Lavastajan luovutus 7.11.2026 03.54 — riittää yksin (korvaa -0230)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. Luovutus kontekstirajan takia (27 %).

## Seuraava työ (PT 03.5x, ei aloitettu)
"Juoksupelin taso 1, seinät ja koristeet havainnekuvien tasolle: kaksi näkyvintä vikaa kuvista, kaksi yritystä, ei leivontaa, ei vientiä, parit PT:lle."
- Ulkoasu, ei paikkoja eikä mittoja. Parin alle vain muoto- ja pintaerot, ei lattiakirkkautta, varjoja eikä valoa.
- Mallikuva kujasta: _tyo/linnanrakentaja/havainne-kuja40/02-havainne-nyt-uusi.png (vasen havainne; oikeat kuvat ovat 25.10:ltä). Muita: wt/lavastaja-postilaatikko/posti/*havainne*.
- Pelikamera 7p:ssä: A/kuvat-levyt7p/peli-A.png, peli-B.png.
- Ehdokkaat, arkilta nähty, EI mitattu, valitse kuvista itse:
  1. peli-A: friisin yläpuolella tasaiset sini- ja vihreät laatat ilman kuviota; havainnossa räystään alla yhtenäinen maalattu nauha.
  2. peli-B (noin 450-575; 645-700): irrallinen vihreä laatikko seinän päässä, tai peli-A:n ja B:n laikukas punainen seinä; havainnossa tasainen hieno rappaus. Laikut voivat olla valokarttaa (VS:n alue, ei tämän työn asia): mittaa ensin.
- Materiaalit: V4_red ja V4_teal ovat tasavärejä ilman tekstuuria (mittaa76.py). Kuvat ja 3D kuuluvat Codexille: uusi tekstuuri tai malli tilataan, ei tehdä itse.

## Odottaa PT:tä
- Rivi PT:lle lähetetty: kartan sana PK:lle on annettu, EI VIELÄ, koska lopullista leivottua juurta ei ole. PT päättää, mitkä kokeet (7n, 7p, 7w) menevät leivontaan; sitten annat PK:lle juuren nimen.

## Valmista
- Leijuvat jalustat: yli5 ja jalusta1-2 katsottu, 7w jää kokeeksi eikä mene yhteen (PT 03.5x). Lod1/2: KK päätti, ei jalkaa; kaukokuva valmiista kartasta pelikameralta. Rivi KK:lle jalustoista lähetetty (jonossa 03.5x); vastausta ei vielä ollut. Koko muuria EI saa sanoa korjatuksi.

## Varo
- Tarkista nimi vapaaksi ENNEN kirjoitusta, omana komentonaan: find, ei glob (zsh kaatuu). Tänä yönä korvautuivat aja-levyt7s ja sk-levyt7s; palautettu lokista, odotusrivit arvioita. Varatut: 7w, jalusta1-2, yli5; levyt7z on käytössä.
- `palatsi lodkerroin` (0,2-20) vaihtaa tason samalta kameralta; säteet eivät tunne rakennuspaketteja, joten katto tai puu voi peittää.
- Lokissa ei ole kaikkia kuvia katsottu täysikoossa: ks. merkintä 03.5x.
- numpy/scipy: /opt/homebrew/bin/python3 ilman -I:tä. Vuoro JU:lta.
