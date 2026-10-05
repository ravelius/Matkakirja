# Olavinlinnan kappelin puhujakuvien koe

Päätoimittajan tilaus 5.10.2026: neljä ilmekuvaa kappelin dialogiin. Tämä on kokeiluerä; loput 22 kuvaa odottavat omistajan hyväksyntää.

## Tiedostot

- `kappalainen-1500-neutraali.png`: rauhallinen, lempeä kappalainen.
- `kappalainen-1500-vakava.png`: vakava ja lämmin, nuhteleva kappalainen.
- `vouti-1500-neutraali.png`: jämäkkä ja rauhallinen vouti.
- `vouti-1500-huolestunut.png`: huolestunut ja hajamielinen vouti.

Kaikki ovat 1024 × 1024 px:n sRGB PNG-kuvia. Tausta on läpinäkymätön, maalattu lämmin kappelin hämärä. Kuvissa ei ole kehystä tai valmista reunahäivytystä: pelin PUHUJAKUVA-pohja tekee häivytyksen.

## Lähde ja referenssit

Alkuperäinen tilaus: `posti/fable-codex-puhujakuvat-kappeli-20261005.md`, haarassa `claude/postilaatikko`, commit `defed13282a09b00cb6491dc971c28cd4410bbc7`.

Referenssit ovat samassa posticommitissa hakemistossa `posti/liitteet/puhujakuvat-kappeli/`:

- `kappalainen-1500-edesta.png`, `kappalainen-1500-kolmeneljannes.png`, `kappalainen-1500-pelikulma.png`
- `vouti-1500-edesta.png`, `vouti-1500-kolmeneljannes.png`, `vouti-1500-pelikulma.png`

Pelikulmat ohjaavat pään suuntaa, kameraa ja kappelin kynttilänvaloa. Etu- ja kolmivartalokuvat ohjaavat kasvomuotoa, tukkaa, partaa, pukua ja värejä. Hahmot ovat pelin omia fiktiivisiä henkilöitä; valokuvia tai nimettyjä todellisia ihmisiä ei käytetty referensseinä.

## Menetelmä ja työkalu

Oma tekoälykuvitustuotanto Matkakirjaa varten. Työkalu: Codexin sisäänrakennettu OpenAI `image_gen`, ilman erillistä API- tai CLI-ajoa. Maalauksellinen guassi-/öljytyyli, ei valokuva eikä sarjakuvatyyli.

Kummallekin hahmolle generoitiin ensin neutraali peruskuva. Ilmeversio generoitiin kokonaan uutena kuvana peruskuvan ja pelin referenssien avulla. Sama identiteetti, pään suunta, kuvakoko, puku, tausta ja valaistus pidettiin mukana kaikissa ilmeissä. Kappalaisen neutraalista ilmeestä valittiin toinen kokonainen generointi, jotta rauhallisuus erottuu vakavasta ilmeestä; ensimmäinen versio säilyy tuotantopaketissa.

Jälkikäsittely: vain koon muuttaminen 1024 × 1024 px:iin, sRGB-profiilin liittäminen ja häviötön PNG-vienti. Kasvoja tai ilmeitä ei paikattu käsin. Generointiohjeet ovat tiedostossa `generointiohjeet.json`, mitat ja SHA-256-tunnisteet manifestissa.

## Tarkistus ja hyväksyntä

Kasvojen ilmeet, yhtenäisyys, pelikulma, asut ja kynttilänvalo on katsottu pareittain sekä suurempina kuvina että 90 px:n esikatseluina. Näytteessä kokeiltiin myös pehmeää pyöreää maskia; maskia ei ole lopullisissa tiedostoissa, eikä esikatselu ole todiste varsinaisesta pelikytkennästä.

Kuvat toimitetaan päätoimittajan pelitarkistukseen. Omistajan taiteellinen hyväksyntä, natiivin integraatio, hyväksyntävideo ja julkaisu ovat erillisiä avoimia vaiheita.

